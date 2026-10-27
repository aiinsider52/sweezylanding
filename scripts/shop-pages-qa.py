"""Validate built shop content and metadata. Does not exercise browser layout."""
from pathlib import Path
from bs4 import BeautifulSoup
import json
import re
import xml.etree.ElementTree as ET
from urllib.parse import urlsplit, parse_qs

root = Path('.next/server/app')
pages, products = [], []
for lang in ['uk', 'en', 'de']:
    files = [root / lang / 'shop.html', *sorted((root / lang / 'shop').glob('*.html'))]
    assert len(files) == 29, (lang, len(files))
    for file in files:
        soup = BeautifulSoup(file.read_text(), 'html.parser')
        route = '/' + file.relative_to(root).with_suffix('').as_posix()
        pages.append(route)
        assert len(soup.find_all('h1')) == 1, route
        assert soup.select_one('link[rel="canonical"]')['href'] == 'https://www.sweezy.world' + route
        assert len(soup.select('link[rel="alternate"][hreflang]')) == 4
        assert soup.select_one(f'a[href="/{lang}/shop"]'), route
        assert all(img.get('alt', '').strip() for img in soup.select('main img')), route
        image_sources = {parse_qs(urlsplit(img['src']).query).get('url', [urlsplit(img['src']).path])[0] for img in soup.select('main img[src]')}
        assert not any('-original.webp' in src or '/shop/source/' in src for src in image_sources), route
        assert all('original.webp' not in node.get('content', '') for node in soup.select('meta')), route
        assert not soup.select('a[href*="temu.com"]'), route
        assert not re.search(r'"(?:goodsId|shareCode|sourceUrl)"', file.read_text()), route
        if file.name == 'shop.html':
            assert len(soup.select('article')) == 28, route
            assert not soup.select('#my-selection a[href^="mailto:"]'), 'Empty selection must not generate an enquiry'
        else:
            nodes = []
            for script in soup.select('script[type="application/ld+json"]'):
                data = json.loads(script.string)
                nodes.extend(data.get('@graph', [data]))
            product = next(node for node in nodes if node.get('@type') == 'Product')
            products.append(product)
            assert not any(key in product for key in ['offers', 'aggregateRating', 'review', 'brand', 'manufacturer']), route
            shots = ['studio', 'lifestyle', 'detail']
            if file.stem in ['switzerland-calling-black-shirt', 'swiss-burgundy-ringer-shirt', 'swiss-sky-blue-polo', 'switzerland-calling-black-hoodie', 'lugano-pink-long-sleeve']:
                shots.append('model')
            assert len(product['image']) == len(shots), route
            assert len(soup.select('[data-views] button')) == len(shots), route
            for shot, image in zip(shots, product['image']):
                assert image['contentUrl'].endswith(f'-{shot}.webp'), route
                assert urlsplit(image['contentUrl']).path in image_sources, route
                assert image['caption'].strip(), route
            assert len(soup.select('dialog')) == 1, route
            request = soup.select_one('main a[href^="mailto:"]')
            assert request and 'support@sweezy.world' in request['href'], route
            assert re.fullmatch(r'SW-\d{3}', product['sku']), route
            for node in soup.select('a[hreflang]'):
                assert node['href'].endswith('/shop/' + file.stem), node['href']
xml = ET.fromstring((root / 'sitemap.xml.body').read_bytes())
urls = {node.text for node in xml.iter() if node.tag.endswith('}loc')}
assert all('https://www.sweezy.world' + route in urls for route in pages)
print(f'Shop page checks passed: {len(pages)} localized pages, {len(products)} product schemas, canonical/hreflang, 89 generated gallery views, zoom dialogs, enquiry links and sitemap.')

for trace in Path(".next").rglob("*.nft.json"):
    assert not any("private/shop/" in name for name in json.loads(trace.read_text()).get("files", [])), trace
print("Supplier privacy checks passed: no public supplier links, IDs or bundled private sourcing files.")
