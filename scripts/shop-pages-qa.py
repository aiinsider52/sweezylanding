"""Validate built shop content and metadata. Does not exercise browser layout."""
from pathlib import Path
from bs4 import BeautifulSoup
import json
import xml.etree.ElementTree as ET

root = Path('.next/server/app')
pages, products = [], []
for lang in ['uk', 'en', 'de']:
    files = [root / lang / 'shop.html', *sorted((root / lang / 'shop').glob('*.html'))]
    assert len(files) == 10, (lang, len(files))
    for file in files:
        soup = BeautifulSoup(file.read_text(), 'html.parser')
        route = '/' + file.relative_to(root).with_suffix('').as_posix()
        pages.append(route)
        assert len(soup.find_all('h1')) == 1, route
        assert soup.select_one('link[rel="canonical"]')['href'] == 'https://www.sweezy.world' + route
        assert len(soup.select('link[rel="alternate"][hreflang]')) == 4
        assert soup.select_one(f'a[href="/{lang}/shop"]'), route
        assert all(img.get('alt', '').strip() for img in soup.select('main img')), route
        if file.name == 'shop.html':
            assert len(soup.select('article')) == 9, route
            assert not soup.select('#my-selection a[href^="mailto:"]'), 'Empty selection must not generate an enquiry'
        else:
            nodes = []
            for script in soup.select('script[type="application/ld+json"]'):
                data = json.loads(script.string)
                nodes.extend(data.get('@graph', [data]))
            product = next(node for node in nodes if node.get('@type') == 'Product')
            products.append(product)
            assert not any(key in product for key in ['offers', 'aggregateRating', 'review', 'brand', 'manufacturer']), route
            assert product['image']['contentUrl'].endswith('-original.webp')
            assert any('-original.webp' in img.get('src', '') for img in soup.select('main img')), route
            request = soup.select_one('main a[href^="mailto:"]')
            assert request and 'support@sweezy.world' in request['href'], route
            assert soup.select_one('a[href^="https://www.temu.com/goods.html?goods_id="]'), route
            for node in soup.select('a[hreflang]'):
                assert node['href'].endswith('/shop/' + file.stem), node['href']
xml = ET.fromstring((root / 'sitemap.xml.body').read_bytes())
urls = {node.text for node in xml.iter() if node.tag.endswith('}loc')}
assert all('https://www.sweezy.world' + route in urls for route in pages)
print(f'Shop page checks passed: {len(pages)} localized pages, {len(products)} product schemas, canonical/hreflang, original images, enquiry links and sitemap.')
