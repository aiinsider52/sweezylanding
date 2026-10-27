"""Check built image discovery, localized alternatives and visible schema evidence.
Does not measure rankings or exercise browser layout.
"""
import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlsplit
from bs4 import BeautifulSoup

ROOT = Path('.next/server/app')
BASE = 'https://www.sweezy.world'

def original_src(img):
    url = urlsplit(img['src'])
    return parse_qs(url.query).get('url', [url.path])[0] if url.path == '/_next/image' else img['src']

def schemas(soup):
    result = []
    for script in soup.select('script[type="application/ld+json"]'):
        data = json.loads(script.string or script.get_text())
        for node in data if isinstance(data, list) else [data]:
            result.extend(node.get('@graph', [node]))
    return result

pages = {}
image_count = 0
john_alts = {'uk': set(), 'en': set(), 'de': set()}
for file in ROOT.rglob('*.html'):
    route = '/' + file.relative_to(ROOT).with_suffix('').as_posix()
    soup = BeautifulSoup(file.read_text(), 'html.parser')
    pages[route] = soup
    for img in soup.select('img'):
        assert img.has_attr('alt'), (route, 'Missing alt', img.get('src'))
        if img['alt'].strip():
            assert len(img['alt']) <= 240, (route, 'Overlong alt', img['alt'])
            image_count += 1
    locale = route.split('/')[1]
    if locale not in john_alts:
        continue
    for node in soup.select('[data-companion="john"]'):
        img = node.find('img')
        alt = img['alt'].strip()
        assert alt and not node.find_parent(attrs={'aria-hidden': 'true'})
        assert not node.get('aria-hidden') == 'true'
        assert ('Джон' in alt) == (locale == 'uk'), (route, alt)
        assert 'Sweezy' in alt
        john_alts[locale].add(alt)
    for link in soup.select('a[data-download]'):
        if link.find('img'):
            assert link.img['alt'].strip(), route
    for node in schemas(soup):
        image = node.get('primaryImageOfPage')
        if isinstance(image, dict):
            assert image['@type'] == 'ImageObject' and image['caption'].strip()
            assert image['contentUrl'].startswith(BASE + '/')
    robots = soup.select_one('meta[name="googlebot"]')
    if robots and not soup.select_one('meta[name="robots"][content*="noindex"]'):
        assert 'max-image-preview:large' in robots['content'].replace(' ', ''), route

for locale, alts in john_alts.items():
    # The service directory exists in Ukrainian; its dedicated pose therefore
    # appears only there. All other scenes have pages in all three languages.
    assert len(alts) == (21 if locale == 'uk' else 20), (locale, len(alts))

xml = ET.fromstring((ROOT / 'image-sitemap.xml.body').read_bytes())
ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9', 'i': 'http://www.google.com/schemas/sitemap-image/1.1'}
seen_pages, seen_images, count = set(), set(), 0
for entry in xml.findall('s:url', ns):
    page_url = entry.find('s:loc', ns).text
    assert page_url.startswith(BASE + '/') and page_url not in seen_pages
    seen_pages.add(page_url)
    route = urlsplit(page_url).path
    soup = pages[route]
    assert soup.select_one('link[rel="canonical"]')['href'] == page_url, route
    assert not soup.select_one('meta[name="robots"][content*="noindex"]'), route
    visible_images = {original_src(img): img for img in soup.select('img[src]')}
    unique = set()
    for item in entry.findall('i:image', ns):
        assert len(item) == 1 and item[0].tag.endswith('}loc'), 'Deprecated sitemap image tags'
        url = item.find('i:loc', ns).text
        assert url not in unique, (route, url)
        unique.add(url)
        assert url.startswith(BASE + '/') and not urlsplit(url).query
        src = urlsplit(url).path
        assert (Path('public') / unquote(src).lstrip('/')).is_file(), url
        assert src in visible_images, (route, 'Sitemap image absent from rendered HTML', src)
        assert visible_images[src]['alt'].strip(), (route, 'Sitemap image has no description', src)
        seen_images.add(src)
        count += 1
    assert unique, route

assert all('/brand/companion/' + pose + '.webp' in seen_images for pose in json.loads(Path('generated_images/john-scenes.json').read_text()))
assert len([src for src in seen_images if src.startswith('/editorial/posts/')]) >= 44
assert len([src for src in seen_images if src.startswith('/downloads/')]) == 21
print(f'PASS: {len(pages)} built HTML pages, {image_count} described image placements, localized John descriptions; {len(seen_pages)} canonical image-sitemap pages, {count} image references, {len(seen_images)} distinct files. Every sitemap image exists on its page and has descriptive alt text.')
