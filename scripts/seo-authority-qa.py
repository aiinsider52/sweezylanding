"""Local production smoke test. Start Next.js on port 3015 before running."""

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3015"

checks = [
    ("/en/guides/zurich", ["Swiss Tax Return 2026", "How to Find a Job", "Health insurance", "Status S", "Places to visit"]),
    ("/uk/blog/status-s-shveytcariya-povnyy-gid", ["Від статусу до життя у Швейцарії", "Реєстрація", "Спільнота"]),
    ("/uk/blog/yak-zareyestruvatysya-v-shveytcariyi", ["Коротка відповідь", "RegisterMe", "Від статусу до життя у Швейцарії"]),
    ("/uk/blog/poshuk-roboty-shveytcariya-2026", ["Від статусу до життя у Швейцарії"]),
    ("/uk/blog/medychne-strakhuvannya-shveytcariya", ["Від статусу до життя у Швейцарії"]),
    ("/en/blog/swiss-tax-return-2026", ["at least CHF 120,000", "voluntary"]),
    ("/en/guides/appenzell-ausserrhoden", ["Short answer", "Official source", "Where do I register my address?"]),
    ("/en/guides/fribourg", ["Short answer", "Official source", "Which region does this office serve?"]),
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
            overflow = page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
            assert overflow <= 1, (path, width, overflow)
        assert not errors, errors
        page.close()

    page = browser.new_page()
    redirect = page.request.get(BASE + "/en/blog/moving-to-zurich-guide", max_redirects=0)
    assert redirect.status == 308, redirect.status
    sitemap = page.request.get(BASE + "/sitemap.xml")
    assert sitemap.ok and "/en/blog/moving-to-zurich-guide" not in sitemap.text()
    response = page.goto(BASE + "/en/blog/moving-to-zurich-guide", wait_until="load")
    assert response and response.ok
    assert page.url == BASE + "/en/guides/zurich", page.url
    assert page.locator('link[rel="canonical"]').get_attribute("href") == "https://www.sweezy.world/en/guides/zurich"

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
