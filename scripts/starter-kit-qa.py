"""Check starter-kit UX and optionally export the three printable PDFs."""
import argparse
import json
import subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument("--base", default="http://127.0.0.1:3026")
parser.add_argument("--export", action="store_true")
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
output = root / "public" / "downloads"
shots = Path("/tmp/sweezy-starter-kit-qa")
shots.mkdir(exist_ok=True)
if args.export:
    from generate_pdf_guides import build
    guides = json.loads(subprocess.check_output(["node", "scripts/export-pdf-guides.cjs"], cwd=root))
    for guide in guides:
        if guide["id"] == "first-week":
            build(guide)

with sync_playwright() as p:
    browser = p.chromium.launch()
    for locale in ["uk", "en", "de"]:
        context = browser.new_context()
        page = context.new_page()
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        url = f"{args.base}/{locale}/starter-kit"
        for width in [390, 768, 1440]:
            page.set_viewport_size({"width": width, "height": 1000})
            response = page.goto(url, wait_until="networkidle")
            assert response.ok
            assert page.locator("h1").count() == 1
            assert page.locator('link[rel="canonical"]').get_attribute("href") == f"https://www.sweezy.world/{locale}/starter-kit"
            assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1")
            page.locator('[data-pose="reader"] img').evaluate("(img) => img.decode()")
            boxes = page.get_by_role("checkbox")
            assert boxes.count() == 14
            boxes.first.check()
            page.reload(wait_until="networkidle")
            assert page.get_by_role("checkbox").first.is_checked()
            assert "1 / 14" in page.get_by_role("status").inner_text()
            page.locator("main button").click()
            assert page.get_by_role("checkbox").count() == 14
            assert page.locator('input:checked').count() == 0
            if locale == "uk" and width != 768:
                page.evaluate("window.scrollTo({top: 0, behavior: 'instant'})")
                page.wait_for_timeout(300)
                page.screenshot(path=str(shots / f"kit-{width}.png"))
        if not args.export:
            download = page.request.get(f"{args.base}/downloads/sweezy-first-week-{locale}.pdf")
            assert download.ok and download.body().startswith(b"%PDF"), locale
        page.goto(f"{args.base}/{locale}", wait_until="domcontentloaded")
        assert page.locator(f'a[href="/{locale}/starter-kit"]').count() >= 1
        link = page.locator(f'a[href="/{locale}/swiss-bucket-list"]').first
        link.scroll_into_view_if_needed()
        if locale == "uk":
            page.locator('section#swiss-travel-kit').screenshot(path=str(shots / "home-banner.png"))
        assert not errors, errors
        context.close()
    assert "/uk/starter-kit" in browser.new_page().request.get(args.base + "/sitemap.xml").text()
    browser.close()
print("Starter kit passed: 3 locales, 3 widths, persistence, reset, homepage links, canonical and sitemap.")
print("PDFs exported; restart server to check downloads." if args.export else "PDF downloads passed.")
