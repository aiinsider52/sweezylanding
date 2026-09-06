"""Local production QA for destination depth and travel-planning pages."""

import json
import re

from playwright.sync_api import sync_playwright


BASE = "http://127.0.0.1:3016"
LOCALES = {
    "en": {
        "aletsch": ["In-depth guide", "Choose your version of the day", "Sources and review", "Plan the whole trip"],
        "planning": ["A four-check planning method", "Official tools worth opening", "What this planner does not promise"],
    },
    "uk": {
        "aletsch": ["Детальний путівник", "Оберіть свій формат дня", "Джерела й перевірка", "Сплануйте всю поїздку"],
        "planning": ["Метод чотирьох перевірок", "Офіційні інструменти", "Чого цей планувальник не обіцяє"],
    },
    "de": {
        "aletsch": ["Ausführlicher Guide", "Passenden Tagesplan wählen", "Quellen und Prüfung", "Ganze Reise planen"],
        "planning": ["Planung mit vier Prüfungen", "Offizielle Werkzeuge", "Was dieser Planer nicht verspricht"],
    },
}


def schemas(page):
    return [json.loads(item) for item in page.locator('script[type="application/ld+json"]').all_text_contents()]


def schema_types(items):
    found = set()
    for item in items:
        if isinstance(item, dict):
            if "@type" in item:
                found.add(item["@type"])
            for node in item.get("@graph", []):
                if isinstance(node, dict) and "@type" in node:
                    found.add(node["@type"])
    return found


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    totals = {}

    for width, height in [(1440, 1000), (1024, 768), (768, 1024), (390, 844)]:
        page = browser.new_page(viewport={"width": width, "height": height})
        console_errors = []
        page.on("console", lambda message: console_errors.append(message.text) if message.type == "error" else None)

        for locale, expected in LOCALES.items():
            for key, path in [("aletsch", f"/{locale}/places/aletsch-glacier"), ("planning", f"/{locale}/planning")]:
                response = page.goto(BASE + path, wait_until="load")
                page.wait_for_timeout(250)
                assert response and response.ok, (path, response.status if response else None)

                body = page.locator("main").inner_text()
                for text in expected[key]:
                    assert text.casefold() in body.casefold(), (path, text)

                overflow = page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
                assert overflow <= 1, (path, width, overflow)
                assert page.locator('link[rel="canonical"]').get_attribute("href") == f"https://www.sweezy.world{path}"

                types = schema_types(schemas(page))
                assert "WebPage" in types and "FAQPage" in types, (path, types)
                if key == "planning":
                    assert "ItemList" in types, (path, types)
                else:
                    assert "TouristAttraction" in types, (path, types)
                    assert page.locator(f'a[href="/{locale}/planning"]').count() >= 1, path

                if width == 1440:
                    totals[path] = len(re.findall(r"\b[\wÀ-žА-Яа-яІіЇїЄєҐґ'-]+\b", body))

        assert not console_errors, console_errors
        page.close()

    page = browser.new_page(viewport={"width": 1440, "height": 1000})
    page.goto(BASE + "/en/places/aletsch-glacier", wait_until="load")
    page.screenshot(path="/private/tmp/sweezy-aletsch-depth.png", full_page=False)
    page.locator('section[aria-labelledby="destination-depth-title"]').screenshot(path="/private/tmp/sweezy-aletsch-guide-section.png")
    page.goto(BASE + "/en/planning", wait_until="load")
    page.screenshot(path="/private/tmp/sweezy-planning-hub.png", full_page=False)

    sitemap = page.request.get(BASE + "/sitemap.xml")
    assert sitemap.ok
    sitemap_text = sitemap.text()
    for locale in LOCALES:
        assert f"https://www.sweezy.world/{locale}/planning" in sitemap_text

    llms = page.request.get(BASE + "/llms.txt")
    assert llms.ok
    assert "/en/places/aletsch-glacier" in llms.text()
    assert "/en/planning" in llms.text()
    assert "/uk/planning" in llms.text()

    browser.close()

print("Places content QA passed.")
for path, words in sorted(totals.items()):
    print(f"{path}: {words} rendered words")
