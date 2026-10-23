"""Build the three travel PDFs and their real first-page previews.

From the repository root:
  node scripts/export-travel-kit.cjs | python3 scripts/generate-travel-kit.py
Requires ReportLab, Pillow and PyMuPDF; uses the existing local fonts/photos.
"""
import io
import json
import sys
from pathlib import Path
from xml.sax.saxutils import escape

import fitz
from PIL import Image, ImageOps
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, Color
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.utils import ImageReader
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public/downloads"
OUT.mkdir(exist_ok=True)
pdfmetrics.registerFont(TTFont("Noto", str(ROOT / "public/fonts/NotoSans-Regular.ttf")))
pdfmetrics.registerFont(TTFont("NotoBold", str(ROOT / "public/fonts/NotoSans-Bold.ttf")))
W, H = A4
INK = HexColor("#112116")
MUTED = HexColor("#54644f")
PAPER = HexColor("#f1f3ec")
LIME = HexColor("#adff00")
WHITE = HexColor("#ffffff")
M = 34


def paragraph(c, text, x, top, width, size=10, leading=None, bold=False, color=INK, maximum=None):
    content = text
    while True:
        style = ParagraphStyle("copy", fontName="NotoBold" if bold else "Noto", fontSize=size, leading=leading or size * 1.4, textColor=color)
        p = Paragraph(escape(content), style)
        _, height = p.wrap(width, H)
        if maximum is None or height <= maximum:
            break
        if size > 7.5:
            size -= .25
            leading = size * 1.35
        else:
            words = content.rstrip("…").split()
            if len(words) < 2:
                break
            content = " ".join(words[:-1]) + "…"
    p.drawOn(c, x, top - height)
    return height


def image(c, path, x, y, width, height):
    with Image.open(ROOT / "public" / path.lstrip("/")) as source:
        photo = ImageOps.fit(source.convert("RGB"), (int(width * 2.5), int(height * 2.5)))
        stream = io.BytesIO()
        photo.save(stream, format="JPEG", quality=83, optimize=True)
        stream.seek(0)
        c.drawImage(ImageReader(stream), x, y, width, height)


def label(c, text, x, y, size=8, color=MUTED, bold=False):
    c.setFillColor(color)
    c.setFont("NotoBold" if bold else "Noto", size)
    c.drawString(x, y, text)


def background(c, locale, page):
    c.setFillColor(PAPER)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(INK)
    c.roundRect(M, H - 59, 25, 25, 5, fill=1, stroke=0)
    label(c, "S", M + 8, H - 51, 14, LIME, True)
    label(c, "Sweezy / SWISS WISHLIST", M + 36, H - 50, 9, INK, True)
    label(c, "{} / 03   ·   {}".format(str(page).zfill(2), locale.upper()), W - 120, H - 50, 8)
    c.setStrokeColor(HexColor("#c7d1be"))
    c.line(M, 43, W - M, 43)
    label(c, "sweezy.world/{}/swiss-bucket-list".format(locale), M, 27, 7)
    label(c, "SWITZERLAND / 2026", W - 138, 27, 7)


def checkbox(c, name, x, y, size=11):
    c.acroForm.checkbox(name=name, tooltip=name, x=x, y=y, size=size, checked=False, buttonStyle="check", borderWidth=.7, borderColor=MUTED, fillColor=WHITE, textColor=INK)


def card(c, locale, p, index, x, top, width, height, copy):
    bottom = top - height
    c.setFillColor(WHITE)
    c.setStrokeColor(HexColor("#d0d9c8"))
    c.roundRect(x, bottom, width, height, 8, fill=1, stroke=1)
    image(c, p["image"], x + 10, top - 114, width - 20, 104)
    c.setFillColor(INK)
    c.roundRect(x + 18, top - 40, 26, 22, 4, fill=1, stroke=0)
    label(c, str(index + 1).zfill(2), x + 23, top - 33, 9, WHITE, True)
    paragraph(c, p["region"], x + 12, top - 125, width - 24, 7.1, 10, color=MUTED, maximum=12)
    paragraph(c, p["title"], x + 12, top - 141, width - 24, 12.5, 16, True, maximum=34)
    paragraph(c, p["summary"], x + 12, top - 178, width - 24, 8.6, 12, color=MUTED, maximum=35)
    half = (width - 32) / 2
    label(c, copy["season"], x + 12, top - 225, 6.5)
    label(c, copy["duration"], x + 20 + half, top - 225, 6.5)
    paragraph(c, p["season"], x + 12, top - 231, half, 7.9, 10, True, maximum=22)
    paragraph(c, p["duration"], x + 20 + half, top - 231, half, 7.9, 10, True, maximum=22)
    checkbox(c, "want-" + p["slug"], x + 12, bottom + 12, 10)
    label(c, copy["select"], x + 28, bottom + 13, 7.2, INK)
    guide_width = pdfmetrics.stringWidth(copy["pdfLink"], "NotoBold", 7.5)
    link_x = x + width - guide_width - 12
    label(c, copy["pdfLink"], link_x, bottom + 13, 7.5, INK, True)
    c.linkURL("https://www.sweezy.world" + p["href"], (link_x, bottom + 8, x + width - 8, bottom + 27), relative=0)


def planner(c, locale, places, copy):
    background(c, locale, 3)
    paragraph(c, copy["planner"], M, H - 89, W - 165, 27, 32, True, maximum=70)
    paragraph(c, copy["plannerBody"], M, H - 163, W - 165, 10, 15, maximum=45)
    url = "https://www.sweezy.world/{}/swiss-bucket-list".format(locale)
    qr = QrCodeWidget(url)
    x1, y1, x2, y2 = qr.getBounds()
    drawing = Drawing(68, 68, transform=[68 / (x2 - x1), 0, 0, 68 / (y2 - y1), 0, 0])
    drawing.add(qr)
    renderPDF.draw(drawing, c, W - M - 68, H - 155)
    c.linkURL(url, (W - M - 68, H - 155, W - M, H - 87), relative=0)
    paragraph(c, copy["online"], W - M - 79, H - 163, 88, 7, 10, maximum=32)
    top = 620
    for i, task in enumerate(copy["tasks"]):
        y = top - i * 33
        checkbox(c, "plan-{}".format(i + 1), M, y - 13, 12)
        paragraph(c, task, M + 23, y, W - 2 * M - 23, 10, 14, maximum=28)
    c.setStrokeColor(HexColor("#bbc9b1"))
    label(c, copy["myTrip"], M, 403, 10, INK, True)
    c.line(M, 378, W - M, 378)
    label(c, copy["date"], M, 354, 8)
    label(c, copy["budget"], W / 2 + 12, 354, 8)
    c.line(M, 332, W / 2 - 12, 332)
    c.line(W / 2 + 12, 332, W - M, 332)
    label(c, copy["notes"], M, 309, 8)
    c.line(M, 288, W - M, 288)
    paragraph(c, copy["note"], M, 268, W - 2 * M, 8, 11, color=MUTED, maximum=47)
    label(c, copy["sourceLabel"], M, 195, 9, INK, True)
    col = (W - 2 * M) / 2
    for i, place in enumerate(places):
        x = M + (i % 2) * col
        y = 175 - (i // 2) * 21
        text = "{}. {}".format(str(i + 1).zfill(2), place["title"])
        paragraph(c, text, x, y, col - 14, 7.4, 9, maximum=18)
        c.linkURL(place["source"]["url"], (x, y - 18, x + col - 14, y + 2), relative=0)
    label(c, copy["reviewed"], M, 70, 7)


def build(locale, data):
    copy, places = data["copy"], data["places"]
    assert len(places) == 8
    filename = OUT / "sweezy-travel-kit-{}.pdf".format(locale)
    c = canvas.Canvas(str(filename), pagesize=A4, pageCompression=1)
    c.setTitle(copy["title"])
    c.setAuthor("Sweezy")
    c.setSubject("Eight Swiss destinations and a personal trip checklist")
    for page in range(2):
        background(c, locale, page + 1)
        paragraph(c, copy["title"] if page == 0 else copy["nextFour"], M, H - 86, W - 2 * M, 28, 33, True, maximum=70)
        paragraph(c, copy["pdfIntro"], M, H - 166, W - 2 * M, 9.5, 14, color=MUTED, maximum=34)
        gap, width, height = 14, (W - 2 * M - 14) / 2, 285
        for position in range(4):
            index = page * 4 + position
            x = M + (position % 2) * (width + gap)
            top = 650 - (position // 2) * (height + gap)
            card(c, locale, places[index], index, x, top, width, height, copy)
        c.showPage()
    planner(c, locale, places, copy)
    c.save()
    with fitz.open(filename) as document:
        assert len(document) == 3
        pix = document[0].get_pixmap(matrix=fitz.Matrix(1.2, 1.2), alpha=False)
        preview = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        preview.resize((714, 1010), Image.Resampling.LANCZOS).save(OUT / "sweezy-travel-kit-cover-{}.webp".format(locale), "WEBP", quality=88)
        for i, pdf_page in enumerate(document):
            assert len(pdf_page.get_text()) > 400, (locale, i, "Missing selectable text")
            for block in pdf_page.get_text("blocks"):
                assert block[0] >= -1 and block[1] >= -1 and block[2] <= W + 1 and block[3] <= H + 1, (locale, i, "Text outside page")
    print("Built {}: 3 pages, {} bytes".format(filename.name, filename.stat().st_size))


if __name__ == "__main__":
    for locale, data in json.load(sys.stdin).items():
        build(locale, data)
