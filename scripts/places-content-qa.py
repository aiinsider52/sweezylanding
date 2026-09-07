"""Local production QA for destination depth and travel-planning pages."""

import json
import re

from playwright.sync_api import sync_playwright


BASE = "http://127.0.0.1:3017"
PRIORITY_DESTINATIONS = {
    "oeschinen-lake": {
        "en": "Choose the right level",
        "uk": "Оберіть правильний рівень",
        "de": "Das passende Niveau wählen",
    },
    "rhine-falls": {
        "en": "Two banks, two perspectives",
        "uk": "Два береги — два ракурси",
        "de": "Zwei Ufer, zwei Perspektiven",
    },
    "ruinaulta": {
        "en": "Read the gorge from below",
        "uk": "Побачте ущелину знизу",
        "de": "Die Schlucht von unten lesen",
    },
    "mount-rigi": {
        "en": "Choose the access corridor",
        "uk": "Оберіть напрям підйому",
        "de": "Den Zugang wählen",
    },
    "creux-du-van": {
        "en": "Understand the amphitheatre",
        "uk": "Зрозумійте скельний амфітеатр",
        "de": "Den Felskessel verstehen",
    },
    "lavaux-vineyards": {
        "en": "Read Lavaux as a living landscape",
        "uk": "Побачте в Лаво живий ландшафт",
        "de": "Lavaux als lebendige Landschaft lesen",
    },
    "lake-murten": {
        "en": "Start with Murten's compact old town",
        "uk": "Почніть із компактного старого міста Муртена",
        "de": "Mit Murtens kompakter Altstadt beginnen",
    },
    "bern-old-town": {
        "en": "Why Bern became a UNESCO city",
        "uk": "Чому Берн став містом UNESCO",
        "de": "Warum Bern UNESCO-Stadt wurde",
    },
}
CANTON_LINKS = {
    "lavaux-vineyards": "vaud",
    "lake-murten": "fribourg",
    "bern-old-town": "bern",
}
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
                    for slug, canton in CANTON_LINKS.items():
                        assert page.locator(f'a[href="/{locale}/places/{slug}"]').count() >= 1, (path, slug)
                        assert page.locator(f'a[href="/{locale}/guides/{canton}"]').count() >= 1, (path, canton)
                else:
                    assert "TouristAttraction" in types, (path, types)
                    assert page.locator(f'a[href="/{locale}/planning"]').count() >= 1, path

                if width == 1440:
                    totals[path] = len(re.findall(r"\b[\wÀ-žА-Яа-яІіЇїЄєҐґ'-]+\b", body))

            for slug, labels in PRIORITY_DESTINATIONS.items():
                path = f"/{locale}/places/{slug}"
                response = page.goto(BASE + path, wait_until="load")
                page.wait_for_timeout(150)
                assert response and response.ok, (path, response.status if response else None)

                body = page.locator("main").inner_text()
                assert labels[locale].casefold() in body.casefold(), (path, labels[locale])
                assert "2026-09-07" in body, (path, "missing review date")
                assert page.locator('section[aria-labelledby="destination-depth-title"]').count() == 1, path
                assert page.locator('section[aria-labelledby="destination-sources-title"] a[href^="https://"]').count() >= 2, path
                assert page.locator(f'a[href="/{locale}/planning"]').count() >= 1, path
                if slug in CANTON_LINKS:
                    assert page.locator(f'a[href="/{locale}/guides/{CANTON_LINKS[slug]}"]').count() >= 1, path

                overflow = page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
                assert overflow <= 1, (path, width, overflow)
                assert page.locator('link[rel="canonical"]').get_attribute("href") == f"https://www.sweezy.world{path}"

                types = schema_types(schemas(page))
                assert {"WebPage", "FAQPage", "TouristAttraction"}.issubset(types), (path, types)

                if width == 1440:
                    words = len(re.findall(r"\b[\wÀ-žА-Яа-яІіЇїЄєҐґ'-]+\b", body))
                    assert words >= 700, (path, words)
                    totals[path] = words

        assert not console_errors, console_errors
        page.close()

    page = browser.new_page(viewport={"width": 1440, "height": 1000})
    page.goto(BASE + "/en/places/aletsch-glacier", wait_until="load")
    page.screenshot(path="/private/tmp/sweezy-aletsch-depth.png", full_page=False)
    page.locator('section[aria-labelledby="destination-depth-title"]').screenshot(path="/private/tmp/sweezy-aletsch-guide-section.png")
    page.goto(BASE + "/en/planning", wait_until="load")
    page.screenshot(path="/private/tmp/sweezy-planning-hub.png", full_page=False)
    for slug in PRIORITY_DESTINATIONS:
        page.goto(BASE + f"/en/places/{slug}", wait_until="load")
        page.locator('section[aria-labelledby="destination-depth-title"]').screenshot(
            path=f"/private/tmp/sweezy-{slug}-depth.png"
        )

    sitemap = page.request.get(BASE + "/sitemap.xml")
    assert sitemap.ok
    sitemap_text = sitemap.text()
    for locale in LOCALES:
        assert f"https://www.sweezy.world/{locale}/planning" in sitemap_text
        assert f"https://www.sweezy.world/{locale}/places/lake-murten" in sitemap_text

    llms = page.request.get(BASE + "/llms.txt")
    assert llms.ok
    assert "/en/places/aletsch-glacier" in llms.text()
    for path in [
        "/uk/places/oeschinen-lake",
        "/uk/places/rhine-falls",
        "/uk/places/mount-rigi",
        "/en/places/ruinaulta",
        "/en/places/creux-du-van",
        "/en/places/lavaux-vineyards",
        "/en/places/lake-murten",
        "/en/places/bern-old-town",
        "/uk/places/lavaux-vineyards",
        "/uk/places/lake-murten",
        "/uk/places/bern-old-town",
    ]:
        assert path in llms.text(), path
    assert "/en/planning" in llms.text()
    assert "/uk/planning" in llms.text()

    for slug, canton in CANTON_LINKS.items():
        for locale in LOCALES:
            path = f"/{locale}/guides/{canton}"
            response = page.goto(BASE + path, wait_until="load")
            assert response and response.ok, (path, response.status if response else None)
            assert page.locator(f'a[href="/{locale}/places/{slug}"]').count() >= 1, (path, slug)
            assert page.locator(f'a[href="/{locale}/planning"]').count() >= 1, path

    browser.close()

print("Places content QA passed.")
for path, words in sorted(totals.items()):
    print(f"{path}: {words} rendered words")
