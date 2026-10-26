"""Verify built DACH pages, semantic metadata, links, sources and downloadable assets.
Run after npm run build. Does not claim browser interaction or layout verification.
"""
import json
from pathlib import Path
from urllib.parse import urlsplit, parse_qs
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
import fitz
from PIL import Image

BASE = 'https://www.sweezy.world'
ROOT = Path('.next/server/app')
LOCALES = ['uk', 'en', 'de']
COUNTRIES = ['switzerland', 'germany', 'austria']
TOPICS = ['registration', 'work', 'business']
cities = json.loads(Path('data/dach-cities.json').read_text())
routes = []
for locale in LOCALES:
    routes += [f'/{locale}/countries', f'/{locale}/resources']
    routes += [f'/{locale}/countries/{country}' for country in COUNTRIES]
    routes += [f'/{locale}/countries/{country}/{topic}' for country in ['germany', 'austria'] for topic in TOPICS]
    routes += [f'/{locale}/countries/{item["country"]}/cities/{city}' for city,item in cities.items()]
routes += ['/uk/services/city/zurich', '/uk/services/category/photography']
sitemap = ET.fromstring((ROOT/'sitemap.xml.body').read_bytes())
ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls = [node.text for node in sitemap.findall('s:url/s:loc', ns)]
assert len(urls) == len(set(urls)), 'Duplicate sitemap URLs'

for route in routes:
    soup = BeautifulSoup(Path(str(ROOT)+route+'.html').read_text(), 'html.parser')
    assert len(soup.select('h1')) == 1, route
    assert soup.select_one('main')['lang'] == route.split('/')[1], route
    assert soup.select_one('link[rel="canonical"]')['href'] == BASE+route, route
    assert BASE+route in urls, route
    assert not any('noindex' in tag.get('content','') for tag in soup.select('meta[name="robots"]')), route
    ids = [node['id'] for node in soup.select('[id]')]
    assert len(ids) == len(set(ids)), (route,'duplicate IDs')
    if '/services/' not in route:
        for locale in LOCALES:
            target = BASE+'/'+locale+'/'+route.split('/',2)[2]
            assert soup.select_one(f'link[rel="alternate"][hreflang="{locale}"]')['href'] == target, route
    schemas = []
    for tag in soup.select('script[type="application/ld+json"]'):
        data = json.loads(tag.string)
        schemas.extend(data.get('@graph',[data]))
    visible = ' '.join(soup.get_text(' ',strip=True).split())
    for schema in schemas:
        if schema.get('@type') == 'FAQPage':
            for item in schema['mainEntity']:
                assert item['name'] in visible and item['acceptedAnswer']['text'] in visible, route
    if '/countries/' in route and route.rsplit('/',1)[-1] in TOPICS:
        assert len(soup.select('article section[id^="step-"]')) == 4, route
        article = next(item for item in schemas if item.get('@type')=='Article')
        assert len(article['citation']) >= 3 and article['inLanguage'] == route.split('/')[1], route
        assert len(soup.select('article')[0].get_text(' ',strip=True).split()) > 400, route
    for link in soup.select('a[href]'):
        parsed = urlsplit(link['href'])
        if parsed.netloc and parsed.netloc != 'www.sweezy.world': continue
        if not parsed.path.startswith('/'): continue
        if parsed.path.startswith('/api/download/'):
            assert link.has_attr('download') and link.has_attr('data-download'), route
            assert (Path('public/downloads') / link['download']).exists(), (route,link['download'])
        elif parsed.path not in ['/privacy','/terms','/cookies','/support']:
            target = Path(str(ROOT)+parsed.path+'.html')
            assert target.exists(), (route,parsed.path)
            if parsed.fragment:
                assert BeautifulSoup(target.read_text(),'html.parser').find(id=parsed.fragment), (route,parsed.path,parsed.fragment)

for country in ['germany','austria']:
    with Image.open(f'public/editorial/countries/{country}.webp') as picture: assert picture.size == (1440,960)
    with Image.open(f'public/editorial/countries/{country}-social.jpg') as picture: assert picture.size == (1200,630)
with Image.open('public/social/sweezy-dach-v1.jpg') as picture: assert picture.size == (1200,630)
for locale in LOCALES:
    for asset in ['business-ch','starter-germany','business-germany','starter-austria','business-austria']:
        with fitz.open(f'public/downloads/sweezy-{asset}-{locale}.pdf') as pdf:
            assert len(pdf) in [4,5]
            assert not any(list(page.widgets() or []) for page in pdf)
            assert all(len(page.get_text()) > 170 for page in pdf)
print(f'PASS: {len(routes)} DACH/resource/service/city pages, locale/canonical/hreflang, visible FAQ/schema, citations, links/anchors, informational PDFs and image assets')
