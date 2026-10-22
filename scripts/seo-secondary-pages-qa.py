"""Check the Blausee, Rhine Falls and Fribourg SEO batch against a local server."""
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = os.environ.get("QA_BASE_URL", "http://127.0.0.1:3024").rstrip("/")
OUTPUT = Path("/tmp/sweezy-secondary-seo")
OUTPUT.mkdir(exist_ok=True)
CASES = {
    "places/blausee": {"en": "Tickets, Bus", "uk": "квитки", "de": "Eintritt"},
    "places/rhine-falls": {"en": "Opening Hours", "uk": "години", "de": "Öffnungszeiten"},
    "guides/fribourg": {"en": "Appointments", "uk": "біометрія", "de": "Termine"},
}

with sync_playwright() as p:
    browser = p.chromium.launch()
    checked_links = set()
    for width, height in [(1440, 1000), (390, 844)]:
        page = browser.new_page(viewport={"width": width, "height": height})
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
        for route, locales in CASES.items():
            for locale, title_part in locales.items():
                path = f"/{locale}/{route}"
                response = page.goto(BASE + path, wait_until="networkidle")
                assert response.status == 200, (path, response.status)
                assert page.locator("h1").count() == 1, path
                assert title_part in page.title(), (path, page.title())
                description = page.locator('meta[name="description"]').get_attribute("content")
                assert 60 <= len(description) <= 170, (path, description)
                assert page.locator('meta[property="og:title"]').get_attribute("content") == page.title(), path
                assert page.locator('link[rel="canonical"]').get_attribute("href") == "https://www.sweezy.world" + path
                for language in ["en", "uk", "de"]:
                    assert page.locator(f'link[rel="alternate"][hreflang="{language}"]').get_attribute("href") == f"https://www.sweezy.world/{language}/{route}"
                robots = page.locator('meta[name="robots"]').get_attribute("content")
                assert "noindex" not in robots, path
                assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1"), path

                nodes = []
                for raw in page.locator('script[type="application/ld+json"]').all_text_contents():
                    item = json.loads(raw)
                    nodes.extend(item.get("@graph", [item]))
                faq = next(node for node in nodes if node.get("@type") == "FAQPage")
                questions = faq["mainEntity"]
                assert len(questions) >= 3
                assert len({item["name"] for item in questions}) == len(questions)
                body = page.locator("body").text_content()
                for question in questions:
                    assert question["name"] in body
                    assert question["acceptedAnswer"]["text"] in body
                reviewed = "2026-10-22" if route == "guides/fribourg" and locale == "de" else "2026-09-28"
                assert any(node.get("dateModified") == reviewed for node in nodes), path

                if route.startswith("places/"):
                    hero = page.locator('main header img').first
                    assert hero.evaluate("image => image.complete && image.naturalWidth > 0"), path
                if route == "places/blausee":
                    assert page.locator(f'a[href="/{locale}/places/oeschinen-lake"]').count() >= 1
                    assert page.locator('a[href="https://www.blausee.ch/en/welcome/faq/"]').count() >= 1
                    assert "Blausee BE" in body
                if route == "places/rhine-falls":
                    assert "CHF 5" in body and "CHF 3" in body
                    assert page.locator('a[href="https://rheinfall.ch/informieren/oeffnungszeiten-preise/liste"]').count() >= 1
                if route == "guides/fribourg":
                    assert "SPoMi" in page.locator("h1").inner_text()
                    assert "Granges-Paccot" in body and "+41 26 305 14 92" in body
                    assert page.locator('a[href="https://www.fr.ch/de/sjsd/bma"]').count() >= 1

                for href in set(page.locator('main a[href^="/"]').evaluate_all("items => items.map(item => item.getAttribute('href'))")):
                    if href not in checked_links:
                        assert page.request.get(BASE + href).ok, (path, href)
                        checked_links.add(href)
                if locale == "de":
                    target = '#destination-depth-title' if route.startswith("places/") else '#office-short-answer'
                    page.locator(target).scroll_into_view_if_needed()
                    page.screenshot(path=str(OUTPUT / f"{route.replace('/', '-')}-{width}.png"))
        assert not errors, errors
        page.close()

    page = browser.new_page()
    for locale in ["en", "uk", "de"]:
        page.goto(f"{BASE}/{locale}/places/oeschinen-lake", wait_until="networkidle")
        assert page.locator(f'a[href="/{locale}/places/blausee"]').count() >= 1
    sitemap = page.request.get(BASE + "/sitemap.xml").text()
    for route in CASES:
        for locale in ["en", "uk", "de"]:
            assert f"https://www.sweezy.world/{locale}/{route}" in sitemap
    browser.close()

print("Secondary-page QA passed: 9 localized pages, desktop/mobile, metadata, visible FAQ/schema, images, internal links and sitemap.")
