"""Generate country-specific interactive two-page PDFs from checked website content.

node scripts/export-growth-kits.cjs | python3 scripts/generate-growth-kits.py
"""
import json
import sys
from pathlib import Path
from xml.sax.saxutils import escape
import fitz
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/downloads'
pdfmetrics.registerFont(TTFont('Noto', str(ROOT / 'public/fonts/NotoSans-Regular.ttf')))
pdfmetrics.registerFont(TTFont('NotoBold', str(ROOT / 'public/fonts/NotoSans-Bold.ttf')))
W, H = A4
INK, GREEN, LIME, PAPER = map(HexColor, ['#142015', '#294d35', '#adff00', '#f2f3ed'])
COPY = {
 'uk': {'plan': 'Мій план дій', 'sources': 'Перевірте актуальні умови', 'notes': 'Мої запитання та наступний крок', 'guide': 'Відкрити повний гід Sweezy', 'date': 'Джерела перевірено: 23.10.2026', 'note': 'Це організаційний чек-лист. Умови залежать від статусу, діяльності та місця проживання. Звірте свою ситуацію з відповідальною установою. Поля можна позначати в PDF.', 'field': 'Контакт / питання / наступна дія'},
 'en': {'plan': 'My action plan', 'sources': 'Check the current requirements', 'notes': 'My questions and next step', 'guide': 'Open the full Sweezy guide', 'date': 'Sources checked: 23 October 2026', 'note': 'This is a planning checklist. Requirements depend on status, activity and place of residence. Confirm your circumstances with the responsible authority. Boxes can be checked in the PDF.', 'field': 'Contact / question / next action'},
 'de': {'plan': 'Mein Aktionsplan', 'sources': 'Aktuelle Voraussetzungen prüfen', 'notes': 'Meine Fragen und der nächste Schritt', 'guide': 'Vollständigen Sweezy-Ratgeber öffnen', 'date': 'Quellen geprüft: 23. Oktober 2026', 'note': 'Dies ist eine Planungscheckliste. Voraussetzungen hängen von Status, Tätigkeit und Wohnort ab. Kläre deinen Fall mit der zuständigen Stelle. Die Kästchen lassen sich im PDF markieren.', 'field': 'Kontakt / Frage / nächster Schritt'},
}

def text(c, value, x, top, width, size=10, bold=False, color=INK):
 p = Paragraph(escape(value), ParagraphStyle('copy', fontName='NotoBold' if bold else 'Noto', fontSize=size, leading=size*1.4, textColor=color))
 _, height = p.wrap(width, H)
 p.drawOn(c, x, top-height)
 return height

def frame(c, data, page):
 c.setFillColor(PAPER); c.rect(0, 0, W, H, fill=1, stroke=0)
 c.setFillColor(GREEN); c.roundRect(32, H-64, 31, 31, 7, fill=1, stroke=0)
 text(c, 'S', 41, H-37, 20, 17, True, LIME)
 text(c, 'Sweezy / DACH', 76, H-39, 220, 10, True)
 text(c, f'{data["country"].upper()} / {data["locale"].upper()} / 0{page}', W-220, H-39, 188, 8)
 c.setStrokeColor(HexColor('#c7d1be')); c.line(32, 40, W-32, 40)
 text(c, 'sweezy.world', 32, 29, 160, 7)
 text(c, COPY[data['locale']]['date'], 230, 29, W-262, 7)

def build(data):
 copy = COPY[data['locale']]
 path = OUT / data['filename']
 c = canvas.Canvas(str(path), pagesize=A4, pageCompression=1)
 c.setTitle(data['title']); c.setAuthor('Sweezy editorial team')
 frame(c, data, 1)
 top = H-95
 top -= text(c, data['title'], 32, top, W-64, 25, True) + 15
 top -= text(c, data['description'], 32, top, W-64, 10) + 22
 for group_index, section in enumerate(data['sections']):
  top -= text(c, f'0{group_index+1} / {section["title"]}', 32, top, W-64, 11, True, GREEN) + 11
  for task_index, task in enumerate(section['tasks']):
   c.acroForm.checkbox(name=f'task-{group_index}-{task_index}', tooltip=f'Task {group_index+1}.{task_index+1}', x=33, y=top-13, size=11, borderWidth=.7, borderColor=GREEN, fillColor=HexColor('#ffffff'), textColor=INK, buttonStyle='check')
   height = text(c, task, 55, top, W-87, 9.1)
   top -= max(height, 14) + 10
  top -= 10
 assert top >= 65, (data['filename'], 'Checklist overflow', top)
 c.showPage()
 frame(c, data, 2)
 top = H-97
 top -= text(c, copy['sources'], 32, top, W-64, 24, True) + 20
 top -= text(c, copy['note'], 32, top, W-64, 10) + 23
 for source in data['sources']:
  height = text(c, source['name']+'  ↗', 32, top, W-64, 10, True, GREEN)
  c.linkURL(source['url'], (32, top-height-4, W-32, top+3), relative=0)
  top -= height+17
 text(c, copy['guide']+'  →', 32, top, W-64, 11, True, GREEN)
 c.linkURL(data['guide'], (32, top-21, W-32, top+3), relative=0)
 top -= 57
 top -= text(c, copy['notes'], 32, top, W-64, 18, True) + 23
 for index in range(3):
  text(c, f'0{index+1} / {copy["field"]}', 32, top, W-64, 8, color=GREEN)
  top -= 44
  c.acroForm.textfield(name=f'notes-{index}', tooltip='Notes', x=32, y=top-12, width=W-64, height=30, borderWidth=.6, borderColor=GREEN, fillColor=HexColor('#ffffff'), textColor=INK, fontSize=10)
  top -= 34
 assert top >= 58, (data['filename'], 'Notes overflow', top)
 c.save()
 with fitz.open(path) as document:
  assert len(document)==2
  assert sum(len(list(page.widgets() or [])) for page in document)==15
  for page in document:
   assert len(page.get_text())>350
   for block in page.get_text('blocks'):
    assert block[0]>=0 and block[1]>=0 and block[2]<=W+1 and block[3]<=H+1, (data['filename'], block)
 print(f'Built {path.name}: 2 pages, 15 interactive fields')

for item in json.load(sys.stdin): build(item)
