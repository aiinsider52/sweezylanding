"""Verify built travel pages and PDF downloads; not a browser interaction test."""
import json
import re
import subprocess
from html.parser import HTMLParser
from pathlib import Path

import fitz
from PIL import Image
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
data = json.loads(subprocess.check_output(["node", "scripts/export-travel-kit.cjs"], cwd=ROOT))


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.h1 = 0
        self.links, self.canonical, self.ids, self.boxes = [], [], [], []
        self.schemas, self.schema = [], False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "h1": self.h1 += 1
        if tag == "a": self.links.append(attrs.get("href"))
        if tag == "link" and attrs.get("rel") == "canonical": self.canonical.append(attrs.get("href"))
        if attrs.get("id"): self.ids.append(attrs["id"])
        if tag == "input" and attrs.get("type") == "checkbox": self.boxes.append(attrs)
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self.schema = True
            self.schemas.append("")

    def handle_endtag(self, tag):
        if tag == "script": self.schema = False

    def handle_data(self, text):
        if self.schema: self.schemas[-1] += text


for locale, value in data.items():
    copy, places = value["copy"], value["places"]
    assert len(places) == 8 and len({p["slug"] for p in places}) == 8
    route = "/{}/swiss-bucket-list".format(locale)
    html = (ROOT / ".next/server/app" / (route.lstrip("/") + ".html")).read_text()
    page = Page(); page.feed(html)
    assert page.h1 == 1 and page.canonical == ["https://www.sweezy.world" + route]
    assert len(page.ids) == len(set(page.ids))
    assert len(page.boxes) == 8
    assert all(box.get("aria-label") for box in page.boxes)
    collection = next(json.loads(raw) for raw in page.schemas if json.loads(raw).get("@type") == "CollectionPage")
    assert collection["mainEntity"]["numberOfItems"] == 8
    assert len(collection["mainEntity"]["itemListElement"]) == 8
    for place in places:
        assert place["href"] in page.links and place["source"]["url"] in page.links
        assert (ROOT / "public" / place["image"].lstrip("/")).exists()
        assert (ROOT / ".next/server/app" / (place["href"].lstrip("/") + ".html")).exists()
    pdf_path = "/downloads/sweezy-travel-kit-{}.pdf".format(locale)
    assert pdf_path in page.links
    home = (ROOT / ".next/server/app/{}.html".format(locale)).read_text()
    assert 'id="swiss-travel-kit"' in home and pdf_path in home and route in home
    assert '/{}/starter-kit'.format(locale) in page.links
    assert (ROOT / "public/downloads/sweezy-first-week-{}.pdf".format(locale)).exists()
    with Image.open(ROOT / "public/downloads/sweezy-travel-kit-cover-{}.webp".format(locale)) as preview:
        assert preview.size == (714, 1010)
    reader = PdfReader(ROOT / "public" / pdf_path.lstrip("/"))
    assert len(reader.pages) == 10
    fields = reader.get_fields()
    assert not fields
    uris = [str(item.get_object().get("/A", {}).get("/URI", "")) for pdf_page in reader.pages for item in pdf_page.get("/Annots", [])]
    for place in places:
        assert "https://www.sweezy.world" + place["href"] in uris
        assert place["source"]["url"] in uris
    with fitz.open(ROOT / "public" / pdf_path.lstrip("/")) as document:
        text = " ".join(" ".join(p.get_text() for p in document).split())
        assert all(" ".join(place["title"].split()) in text for place in places)
        for pdf_page in document:
            assert len(pdf_page.get_text()) > 170
            for block in pdf_page.get_text("blocks"):
                assert block[0] >= -1 and block[1] >= -1 and block[2] <= 597 and block[3] <= 844
    print("PASS", locale, "8 places, 8 web checkboxes, 10 informational PDF pages, no PDF fields, real previews, links and metadata")

print("Travel kit checks passed. Browser layout, check/uncheck and persistence still need browser QA.")
