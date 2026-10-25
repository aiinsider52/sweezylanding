"""node scripts/export-pdf-guides.cjs | python3 scripts/generate_pdf_guides.py

Selectable prose, clickable sources and photographic covers. No forms, task
lists, empty note areas or silently truncated paragraphs.
"""
import io
import json
import sys
from pathlib import Path
from xml.sax.saxutils import escape
import fitz
from PIL import Image, ImageOps
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/downloads'
W, H = A4
M = 42
INK, GREEN, PAPER, MUTED, LIME = map(HexColor, ['#142c23', '#244b3d', '#f7f5ee', '#596b61', '#d9ee9b'])
for name, file in [('Noto', 'NotoSans-Regular.ttf'), ('NotoBold', 'NotoSans-Bold.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(ROOT / 'public/fonts' / file)))
COPY = {
 'uk': {'edition':'ПРАКТИЧНИЙ МІНІГІД', 'inside':'У цьому гіді', 'read':'Варто знати', 'sources':'Джерела та корисні посилання', 'faq':'Поширені запитання', 'online':'Більше інформації на Sweezy', 'updated':'Редакція · 23.10.2026', 'scope':'Процедура залежить від документа про перебування, діяльності та місця проживання. Першоджерела нижче допоможуть уточнити ваш випадок.', 'season':'КОЛИ ЇХАТИ', 'duration':'ТРИВАЛІСТЬ', 'place':'Відкрити гід про місце', 'primary':'Офіційна інформація', 'travelTitle':'Подорож, яка вам підходить', 'travelBody':'Ці вісім місць — ідеї для окремих поїздок, а не маршрут на один день. Міські прогулянки, виноградники та високогірні стежки потребують різної підготовки. Час у дорозі додається до тривалості відвідування.', 'transportTitle':'Транспорт і доступність', 'transportBody':'Умови канатних доріг, гірських стежок і судноплавства залежать від сезону та погоди. Проїзний не завжди покриває кожну ділянку. Офіційний сайт місця пояснює доступ, актуальний розклад і можливі закриття.', 'credits':'Фотографії: автори й ліцензії в онлайн-гідах Sweezy. Умови відвідування перевіряйте перед поїздкою.'},
 'en': {'edition':'THE PRACTICAL MINI GUIDE', 'inside':'Inside this guide', 'read':'Good to know', 'sources':'Sources and useful links', 'faq':'Common questions', 'online':'Explore more on Sweezy', 'updated':'Editorial edition · 23 Oct 2026', 'scope':'The procedure depends on residence documentation, activity and location. The primary sources below help clarify the requirements for your circumstances.', 'season':'WHEN TO GO', 'duration':'VISIT LENGTH', 'place':'Read the destination guide', 'primary':'Official visitor information', 'travelTitle':'Find your kind of day out', 'travelBody':'These eight places are ideas for separate trips, rather than a single-day itinerary. City walks, vineyards and high-mountain paths require different preparation. Journey time comes in addition to time spent at the destination.', 'transportTitle':'Transport and access', 'transportBody':'Mountain lifts, trails and boat services depend on the season and weather. A travel pass does not necessarily cover every part of the journey. The destination’s official website explains access, current timetables and possible closures.', 'credits':'Photography: author and licence details in the linked Sweezy destination guides. Check visiting conditions before travelling.'},
 'de': {'edition':'DER PRAKTISCHE KOMPAKTGUIDE', 'inside':'In diesem Ratgeber', 'read':'Gut zu wissen', 'sources':'Quellen und hilfreiche Links', 'faq':'Häufige Fragen', 'online':'Mehr entdecken auf Sweezy', 'updated':'Redaktion · 23.10.2026', 'scope':'Das Verfahren hängt von Aufenthaltsdokument, Tätigkeit und Wohnort ab. Die folgenden Primärquellen helfen, die Voraussetzungen für den eigenen Fall einzuordnen.', 'season':'BESTE REISEZEIT', 'duration':'AUFENTHALTSDAUER', 'place':'Zum ausführlichen Ortsguide', 'primary':'Offizielle Besucherinformation', 'travelTitle':'Der passende Ausflug für Sie', 'travelBody':'Die acht Orte sind Ideen für einzelne Ausflüge und keine Route für einen einzigen Tag. Stadtspaziergänge, Weinberge und hochalpine Wege erfordern unterschiedliche Vorbereitung. Die Anreise kommt zur Aufenthaltsdauer am Ziel hinzu.', 'transportTitle':'Verkehr und Zugänglichkeit', 'transportBody':'Bergbahnen, Wanderwege und Schiffe sind von Saison und Wetter abhängig. Ein Abonnement deckt nicht automatisch jede Teilstrecke ab. Die offizielle Website des Ortes erklärt die Anreise, aktuelle Fahrpläne und mögliche Sperrungen.', 'credits':'Fotos: Urheber und Lizenzen stehen in den verlinkten Sweezy-Ortsguides. Besuchsbedingungen vor der Reise prüfen.'},
}

def text(c, value, x, top, width, size=11, bold=False, color=INK, leading=None):
    p = Paragraph(escape(value), ParagraphStyle('editorial', fontName='NotoBold' if bold else 'Noto', fontSize=size, leading=leading or size*1.5, textColor=color))
    _, height = p.wrap(width, H)
    assert top-height >= 57, ('Text overflow', value[:100], top, height)
    p.drawOn(c, x, top-height)
    return top-height

def photo(c, path, x, y, width, height):
    with Image.open(ROOT / 'public' / path.lstrip('/')) as original:
        im = ImageOps.fit(original.convert('RGB'), (int(width*2), int(height*2)))
        stream = io.BytesIO()
        im.save(stream, 'JPEG', quality=87, optimize=True)
        stream.seek(0)
        c.drawImage(ImageReader(stream), x, y, width, height)

def base(c, data, page, total, dark=False):
    fg = PAPER if dark else INK
    c.setFillColor(GREEN if dark else PAPER)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    text(c, 'Sweezy', M, H-30, 180, 17, True, fg)
    text(c, f'{data["countryName"].upper()} / {data["locale"].upper()}', W-230, H-37, 188, 7.5, color=fg)
    c.setStrokeColor(HexColor('#668172') if dark else HexColor('#d6ded0'))
    c.line(M, 44, W-M, 44)
    # Footer text uses its own baseline; body helpers enforce the content margin.
    c.setFillColor(fg)
    c.setFont('Noto', 7)
    c.drawString(M, 27, COPY[data['locale']]['updated'])
    c.drawRightString(W-M, 27, f'{page:02} / {total:02}')

def link(c, label, url, x, top, width, size=10, color=GREEN):
    bottom = text(c, label, x, top, width, size, True, color)
    c.linkURL(url, (x, bottom-2, x+width, top+2), relative=0)
    return bottom

def cover(c, data, total):
    cp = COPY[data['locale']]
    base(c, data, 1, total, dark=True)
    top = text(c, cp['edition'], M, H-103, W-2*M, 8.5, True, LIME)
    top = text(c, data['title'], M, top-16, W-2*M, 33, True, PAPER, 40)
    top = text(c, data['description'], M, top-17, W-2*M, 11, color=PAPER)
    image_top, image_bottom = top-27, 163
    assert image_top-image_bottom > 185, (data['filename'], 'Cover image too small')
    photo(c, data.get('places', [{}])[0].get('image', data['image']), M, image_bottom, W-2*M, image_top-image_bottom)
    titles = [p['title'] for p in data.get('places', [])] or [s['title'] for s in data['sections']]
    text(c, cp['inside'], M, 142, W-2*M, 9, True, LIME)
    text(c, '  /  '.join(titles[:3]), M, 121, W-2*M, 9.2, color=PAPER, leading=13)
    c.showPage()

def chapter(c, data, page, total, sections, offset):
    base(c, data, page, total)
    text(c, COPY[data['locale']]['read'].upper(), M, H-96, W-2*M, 8, True, MUTED)
    for index, section in enumerate(sections):
        top = H-133-index*313
        c.setFillColor(LIME)
        c.roundRect(M, top-30, 35, 30, 7, fill=1, stroke=0)
        text(c, f'{offset+index+1:02}', M+8, top-5, 27, 11, True)
        bottom = text(c, section['title'], M+51, top, W-2*M-51, 18, True, leading=24)
        bottom = text(c, section['body'], M, bottom-24, W-2*M, 12.5, leading=20)
        assert bottom > top-285, (data['filename'], section['title'], 'Chapter overlap', bottom)
        if index == 0:
            c.setStrokeColor(HexColor('#d6ded0'))
            c.line(M, top-285, W-M, top-285)
    c.showPage()

def destinations(c, data, page, total, places, offset):
    base(c, data, page, total)
    cp = COPY[data['locale']]
    place = places[0]
    top = text(c, f'{offset+1:02} / {place["region"]}', M, H-96, W-2*M, 8, True, MUTED)
    top = text(c, place['title'], M, top-12, W-2*M, 26, True, leading=32)-22
    photo(c, place['image'], M, top-230, W-2*M, 230)
    top = text(c, place['description'], M, top-250, W-2*M, 11.5, leading=17)-20
    text(c, cp['season'], M, top, 235, 7.5, True, MUTED)
    text(c, cp['duration'], M+270, top, 225, 7.5, True, MUTED)
    left = text(c, place['season'], M, top-18, 235, 11)
    right = text(c, place['duration'], M+270, top-18, 225, 11)
    top = text(c, place['arrival'], M, min(left,right)-19, W-2*M, 10.5, True)-12
    top = text(c, place['tip'], M, top, W-2*M, 10.5)-17
    top = link(c, cp['place']+' →', 'https://www.sweezy.world'+place['href'], M, top, W-2*M)-10
    link(c, cp['primary']+' ↗', place['source']['url'], M, top, W-2*M, 9)
    c.showPage()

def references(c, data, page, total):
    base(c, data, page, total)
    cp, top = COPY[data['locale']], H-96
    if data.get('places'):
        for title, body in [(cp['travelTitle'], cp['travelBody']), (cp['transportTitle'], cp['transportBody'])]:
            top = text(c, title, M, top, W-2*M, 18, True)-13
            top = text(c, body, M, top, W-2*M, 10.5)-25
    elif data['faq']:
        top = text(c, cp['faq'], M, top, W-2*M, 24, True)-22
        for faq in data['faq']:
            top = text(c, faq['q'], M, top, W-2*M, 11, True)-8
            top = text(c, faq['a'], M, top, W-2*M, 10, leading=14.5)-18
    else:
        top = text(c, cp['read'], M, top, W-2*M, 26, True)-20
        top = text(c, data['summary'], M, top, W-2*M, 12, leading=19)-24
    top = text(c, cp['read'] if data.get('places') else cp['sources'], M, top-3, W-2*M, 17, True)-14
    for source in ([] if data.get('places') else data['sources']):
        top = link(c, source['name']+' ↗', source['url'], M, top, W-2*M, 9)-12
    top = text(c, cp['credits'] if data.get('places') else cp['scope'], M, top, W-2*M, 9, color=MUTED)-18
    link(c, cp['online']+' →', data['guide'], M, top, W-2*M, 11)

def build(data):
    OUT.mkdir(exist_ok=True)
    path = OUT / data['filename']
    travel = bool(data.get('places'))
    content = data['places'] if travel else data['sections']
    chunk_size = 1 if travel else 2
    chunks = [content[i:i+chunk_size] for i in range(0, len(content), chunk_size)]
    total = len(chunks)+2
    c = canvas.Canvas(str(path), pagesize=A4, pageCompression=1, lang={'uk':'uk-UA', 'en':'en-GB', 'de':'de-DE'}[data['locale']])
    c.setTitle(data['title']); c.setAuthor('Sweezy editorial team'); c.setSubject(data['description'])
    cover(c, data, total)
    for i, chunk in enumerate(chunks):
        (destinations if travel else chapter)(c, data, i+2, total, chunk, i*chunk_size)
    references(c, data, total, total)
    c.save()
    with fitz.open(path) as document:
        assert len(document) == total
        assert not any(list(page.widgets() or []) for page in document)
        for page in document:
            assert len(page.get_text()) > 170
            for block in page.get_text('blocks'):
                assert block[0] >= 0 and block[1] >= 0 and block[2] <= W+1 and block[3] <= H+1, (path.name, block)
        pix = document[0].get_pixmap(matrix=fitz.Matrix(1.2, 1.2), alpha=False)
        preview = f'sweezy-{data["id"]}-cover-{data["locale"]}.webp'
        Image.frombytes('RGB', (pix.width, pix.height), pix.samples).resize((714, 1010), Image.Resampling.LANCZOS).save(OUT / preview, 'WEBP', quality=87)
    print(f'Built {path.name}: {total} pages, information only, {path.stat().st_size:,} bytes')

if __name__ == '__main__':
    for guide in json.load(sys.stdin):
        build(guide)
