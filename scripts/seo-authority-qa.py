"""Local production smoke test. Set QA_BASE_URL to override port 3015."""

import os
from playwright.sync_api import sync_playwright

BASE = os.environ.get("QA_BASE_URL", "http://127.0.0.1:3015").rstrip("/")

checks = [
    ("/en/guides/zurich", ["Swiss Tax Return 2026", "How to Find a Job", "Your Zurich moving checklist", "Zürich Süd", "Places to visit"]),
    ("/en/guides/zurich/registration", ["Register in Zurich", "Within 14 days", "Zurich South", "Personenmeldeamt and Migrationsamt"]),
    ("/uk/guides/zurich", ["Чекліст переїзду", "Zürich Süd"]),
    ("/uk/blog/status-s-shveytcariya-povnyy-gid", ["Від статусу до життя у Швейцарії", "Реєстрація", "Спільнота"]),
    ("/uk/blog/yak-zareyestruvatysya-v-shveytcariyi", ["Коротка відповідь", "RegisterMe", "Від статусу до життя у Швейцарії"]),
    ("/uk/blog/poshuk-roboty-shveytcariya-2026", ["Від статусу до життя у Швейцарії", "Усний трудовий договір також може бути чинним", "щонайменше 8 годин"]),
    ("/uk/blog/medychne-strakhuvannya-shveytcariya", ["Від статусу до життя у Швейцарії", "470 CHF", "1530 CHF", "лише з дати вступу"]),
    ("/en/blog/swiss-tax-return-2026", ["at least CHF 120,000", "voluntary"]),
    ("/en/guides/appenzell-ausserrhoden", ["Short answer", "Official source", "Where do I register my address?"]),
    ("/de/guides/appenzell-ausserrhoden", ["Migrationsamt Herisau und Appenzell Ausserrhoden", "Offizielle Quelle"]),
    ("/en/guides/fribourg", ["Short answer", "Official source", "Which region does this office serve?"]),
    ("/en/community", ["Sweezy Community for Newcomers in Switzerland", "Join Telegram", "Join Facebook group"]),
    ("/uk/places/oeschinen-lake", ["Коротка відповідь", "Офіційне джерело про місце", "FAQ"]),
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for width, height in [(1440, 1000), (390, 844)]:
        page = browser.new_page(viewport={"width": width, "height": height})
        errors = []
        page.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
        for path, texts in checks:
            response = page.goto(BASE + path, wait_until="load")
            page.wait_for_timeout(250)
            assert response and response.ok, (path, response.status if response else None)
            body = page.locator("body").inner_text()
            for text in texts:
                assert text.casefold() in body.casefold(), (path, text)
            assert page.locator("h1").count() == 1, path
            assert page.locator('link[rel="canonical"]').get_attribute("href") == "https://www.sweezy.world" + path
            robots = page.locator('meta[name="robots"]').get_attribute("content") if page.locator('meta[name="robots"]').count() else ""
            assert "noindex" not in robots, path
            if path.endswith("/guides/zurich"):
                for anchor in ["registration", "permit", "housing"]:
                    assert page.locator(f"#{anchor}").count() == 1, anchor
            overflow = page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
            assert overflow <= 1, (path, width, overflow)
        assert not errors, errors
        page.close()

    page = browser.new_page()
    for slug in ["poshuk-roboty-shveytcariya-2026", "medychne-strakhuvannya-shveytcariya"]:
        page.goto(BASE + "/uk/blog/" + slug, wait_until="load")
        for href in set(page.locator('article a[href^="/uk/"]').evaluate_all("links => links.map(link => link.getAttribute('href'))")):
            linked = page.request.get(BASE + href)
            assert linked.ok, (slug, href, linked.status)
        structured = page.locator('script[type="application/ld+json"]').all_text_contents()
        assert any('"BlogPosting"' in item and '2026-09-24' in item for item in structured), slug

    redirect = page.request.get(BASE + "/en/blog/moving-to-zurich-guide", max_redirects=0)
    assert redirect.status == 308, redirect.status
    sitemap = page.request.get(BASE + "/sitemap.xml")
    assert sitemap.ok and "/en/blog/moving-to-zurich-guide" not in sitemap.text()
    assert "/en/guides/zurich/registration" in sitemap.text()
    unavailable = page.request.get(BASE + "/de/guides/zurich/registration")
    assert unavailable.status == 404, unavailable.status
    response = page.goto(BASE + "/en/blog/moving-to-zurich-guide", wait_until="load")
    assert response and response.ok
    assert page.url == BASE + "/en/guides/zurich", page.url
    assert page.locator('link[rel="canonical"]').get_attribute("href") == "https://www.sweezy.world/en/guides/zurich"

    page.goto(BASE + "/en/guides/zurich", wait_until="load")
    assert page.locator('a[href="/en/guides/zurich/registration"]').count() >= 1

    page.goto(BASE + "/en/guides/zurich/registration", wait_until="load")
    json_ld = page.locator('script[type="application/ld+json"]').all_text_contents()
    assert any('"FAQPage"' in item for item in json_ld)
    assert any('"WebPage"' in item and '"citation"' in item for item in json_ld)

    page.goto(BASE + "/en/community", wait_until="load")
    assert page.title() == "Sweezy Community: Telegram & Facebook Switzerland"

    page.goto(BASE + "/uk/blog/status-s-shveytcariya-povnyy-gid", wait_until="load")
    json_ld = page.locator('script[type="application/ld+json"]').all_text_contents()
    assert any('"ItemList"' in item and '"numberOfItems":5' in item for item in json_ld)

    page.goto(BASE + "/en/guides/appenzell-ausserrhoden", wait_until="load")
    json_ld = page.locator('script[type="application/ld+json"]').all_text_contents()
    assert any('"FAQPage"' in item for item in json_ld)
    assert any('"GovernmentOffice"' in item for item in json_ld)

    page.goto(BASE + "/uk/places/oeschinen-lake", wait_until="load")
    json_ld = page.locator('script[type="application/ld+json"]').all_text_contents()
    assert any('"WebPage"' in item and '"citation"' in item for item in json_ld)
    browser.close()

print("AI SEO browser QA passed: desktop/mobile, redirect, schema, text, overflow, console.")
