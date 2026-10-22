"""Check the built SEO sprint routes without launching a browser.

Run after npm run build. This verifies prerendered markup, not interaction,
responsive layout, print pagination or Google's current index.
"""
from html.parser import HTMLParser
import json
from pathlib import Path


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.headings = []
        self.canonicals = []
        self.robots = []
        self.links = []
        self.ids = []
        self.schemas = []
        self.visible = []
        self.inputs = []
        self.in_h1 = False
        self.in_script = False
        self.in_schema = False
        self.in_style = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "h1":
            self.in_h1 = True
            self.headings.append("")
        if tag == "script":
            self.in_script = True
            self.in_schema = attrs.get("type") == "application/ld+json"
            if self.in_schema:
                self.schemas.append("")
        if tag == "style":
            self.in_style = True
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonicals.append(attrs.get("href"))
        if tag == "meta" and attrs.get("name") == "robots":
            self.robots.append(attrs.get("content", ""))
        if tag == "a":
            self.links.append(attrs.get("href", ""))
        if tag == "input":
            self.inputs.append(attrs)
        if attrs.get("id"):
            self.ids.append(attrs["id"])

    def handle_endtag(self, tag):
        if tag == "h1":
            self.in_h1 = False
        if tag == "script":
            self.in_script = self.in_schema = False
        if tag == "style":
            self.in_style = False

    def handle_data(self, data):
        if self.in_schema:
            self.schemas[-1] += data
        if not self.in_script and not self.in_style:
            self.visible.append(data)
        if self.in_h1:
            self.headings[-1] += data


routes = [
    "/de/guides/appenzell-ausserrhoden", "/de/guides/fribourg",
    "/en/guides/zurich/registration", "/en/guides/zurich",
    "/en/guides/zug", "/uk/guides/zug", "/de/guides/zug",
    "/en/guides/st-gallen", "/en/blog/swiss-tax-return-2026",
    "/en/blog/swiss-tax-system-expats", "/en/community",
    "/uk/blog/status-s-shveytcariya-povnyy-gid",
    "/uk/blog/poshuk-roboty-shveytcariya-2026",
    "/uk/blog/medychne-strakhuvannya-shveytcariya",
]

for route in routes:
    markup = Path(".next/server/app" + route + ".html").read_text()
    page = Page()
    page.feed(markup)
    assert len(page.headings) == 1, (route, page.headings)
    assert page.canonicals == ["https://www.sweezy.world" + route], route
    assert all("noindex" not in value for value in page.robots), route
    assert len(page.ids) == len(set(page.ids)), (route, "duplicate IDs")
    visible = " ".join(" ".join(page.visible).split())
    for raw in page.schemas:
        schema = json.loads(raw)
        nodes = schema if isinstance(schema, list) else schema.get("@graph", [schema])
        for node in nodes:
            if node.get("@type") == "FAQPage":
                for item in node["mainEntity"]:
                    for value in [item["name"], item["acceptedAnswer"]["text"]]:
                        assert " ".join(value.split()) in visible, (route, value)
    if route in ["/de/guides/fribourg", "/de/guides/appenzell-ausserrhoden"]:
        assert "migration-office-contact" in page.ids and "unabhängig" in visible, route
        assert markup.index('id="migration-office-contact"') < markup.index("Kantonsüberblick"), route
    if route.endswith("/registration"):
        assert len([item for item in page.inputs if item.get("type") == "checkbox"]) == 8
        assert not any(item.get("type") in ["email", "file"] for item in page.inputs)
        assert "Print checklist / Save as PDF" in visible
        assert "request a deadline extension" in visible
        assert "/en/starter-kit" in page.links
    if "/guides/zug" in route:
        assert "https://stadtzug.ch/de/leben/wohnen-umziehen/umziehen/zuzug" in page.links
    print("PASS", route)

print("14 prerendered routes passed: H1, canonical, robots, unique IDs, visible FAQ/schema, contact order, checklist and official links. Browser/print QA still required.")
