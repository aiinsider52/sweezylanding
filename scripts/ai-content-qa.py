"""Check built content and linked evidence. This does not measure AI citations or browser layout."""
import json
import xml.etree.ElementTree as ET
from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path('.next/server/app')
BASE = 'https://www.sweezy.world'
TEAM = BASE + '/en/authors/sweezy-team#editorial'
sitemap = ET.fromstring((ROOT / 'sitemap.xml.body').read_bytes())
dates = {entry.find('{*}loc').text: entry.find('{*}lastmod').text if entry.find('{*}lastmod') is not None else None for entry in sitemap}

def schemas(soup):
    nodes = []
    for script in soup.select('script[type="application/ld+json"]'):
        parsed = json.loads(script.string or script.get_text())
        for item in parsed if isinstance(parsed, list) else [parsed]:
            nodes.extend(item.get('@graph', [item]))
    return nodes

def page(route):
    return BeautifulSoup((ROOT / (route.lstrip('/') + '.html')).read_text(), 'html.parser')

articles, links, files = 0, 0, set()
for path in ROOT.rglob('*.html'):
    soup = BeautifulSoup(path.read_text(), 'html.parser')
    for node in schemas(soup):
        if node.get('@type') in ['Article', 'BlogPosting']:
            articles += 1
            assert node['author']['@id'] == TEAM, path
            assert node['publisher']['@id'] == BASE + '/#organization', path
            assert node['isPartOf']['@id'] == BASE + '/#website', path
    for link in soup.select('a[data-download]'):
        links += 1
        expected = f'/downloads/sweezy-{link["data-download"]}-{link["data-locale"]}.pdf'
        assert link['href'] == expected, path
        assert (Path('public') / expected.lstrip('/')).read_bytes().startswith(b'%PDF-'), path
        files.add(expected)
assert articles >= 67 and len(files) == 21, (articles, files)

for locale in ['uk', 'en', 'de']:
    for country in ['germany', 'austria']:
        route = f'/{locale}/countries/{country}/business'
        soup = page(route)
        section = soup.select_one('#business-contacts')
        assert section and len(section.select('tbody tr')) == 2, route
        article = next(x for x in schemas(soup) if x.get('@type') == 'Article')
        assert article['dateModified'] == '2026-10-27' and article['datePublished'] == '2026-10-23'
        assert dates[BASE + route].startswith('2026-10-27'), route
        assert section.select_one('time')['datetime'] == '2026-10-27'
        for link in section.select('tbody a'):
            assert link['href'] in article['citation'], (route, link['href'])
        assert len(soup.select('[id^="faq-"]')) >= 2

catalog = page('/uk/services')
rows = catalog.select('#service-evidence-title + p + div tbody tr')
assert len(rows) == 17, len(rows)
for row in rows:
    assert row.select_one('time[datetime]') and row.select_one('td a[href^="https://"]')
comparison = page('/uk/blog/biznes-dach-dlya-ukrayintsiv')
article = next(node for node in schemas(comparison) if node.get('@type') == 'BlogPosting')
assert len(article['citation']) >= 8 and article['datePublished'] == '2026-10-27'
assert comparison.select_one('article table') and comparison.select_one('article img[alt]')
for country, count in [('switzerland', 7), ('germany', 5), ('austria', 5)]:
    route = '/uk/services/country/' + country
    hub = page(route)
    collection = next(node for node in schemas(hub) if node.get('@type') == 'CollectionPage')
    assert collection['mainEntity']['numberOfItems'] == count, route
    assert len(hub.select('tbody tr')) == count, route
    assert comparison.select_one(f'a[href="{route}"]'), route
for slug in ['biznes-u-shveytcariyi-dlya-ukrayintsiv', 'ukrayinski-posluhy-shveytcariya', 'ukrayinski-posluhy-zurich', 'ukrayinskyy-avtoservis-thurgau']:
    soup = page('/uk/blog/' + slug)
    article = next(x for x in schemas(soup) if x.get('@type') == 'BlogPosting')
    assert article['dateModified'] == '2026-10-27'
    assert soup.select_one('link[rel="canonical"]')['href'] == BASE + '/uk/blog/' + slug
    for link in soup.select('a[href^="/uk/services#"]'):
        assert catalog.find(id=link['href'].split('#', 1)[1]), link['href']
print(f'PASS: {articles} article identities; {links} direct PDF links to {len(files)} documents; 6 sourced business tables; {len(rows)} service evidence rows; 4 updated blog posts.')
