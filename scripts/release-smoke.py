"""Read-only HTTP/HTML checks, not a browser/layout/interaction test.

Checks all sitemap pages, their internal page/fragment links and local images.
Use --base only for a server that you own. Never submits forms or analytics.
"""
import argparse
import concurrent.futures
import json
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from collections import Counter
from bs4 import BeautifulSoup

parser = argparse.ArgumentParser()
parser.add_argument("--base", default="http://localhost:3032")
args = parser.parse_args()
base = args.base.rstrip("/")
base_parts = urllib.parse.urlsplit(base)
if base_parts.scheme not in ("http", "https") or not base_parts.netloc or base_parts.path:
    parser.error("--base must be an HTTP(S) origin without a path")
hosts = {"www.sweezy.world", "sweezy.world", base_parts.netloc}

# Python 3.9's urllib does not follow the permanent 308 redirects used by Next.
class RedirectHandler(urllib.request.HTTPRedirectHandler):
    http_error_308 = urllib.request.HTTPRedirectHandler.http_error_302

opener = urllib.request.build_opener(RedirectHandler())

def fetch(target):
    try:
        with opener.open(base + target, timeout=20) as response:
            return target, response.status, response.headers.get_content_type(), response.read()
    except Exception as error:
        return target, 0, "", str(error).encode()

_, status, _, xml = fetch("/sitemap.xml")
if status != 200:
    raise SystemExit("Sitemap unavailable")
pages = sorted({urllib.parse.urlsplit(node.text).path for node in ET.fromstring(xml).findall("{*}url/{*}loc")})
documents, errors = {}, []
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    for target, status, kind, body in pool.map(fetch, pages):
        if status != 200 or kind != "text/html":
            errors.append(f"Page {target}: HTTP {status} ({kind})")
            continue
        soup = BeautifulSoup(body, "html.parser")
        documents[target] = soup
        if len(soup.find_all("h1")) != 1:
            errors.append(f"Page {target}: expected one H1")
        if not soup.find("link", rel="canonical"):
            errors.append(f"Page {target}: missing canonical")
        duplicate_ids = [value for value, count in Counter(node["id"] for node in soup.select("[id]")).items() if count > 1]
        if duplicate_ids:
            errors.append(f"Page {target}: duplicate IDs {duplicate_ids}")

links, assets = set(), set()
for target, soup in documents.items():
    for node in soup.select("a[href], img[src]"):
        value = node.get("href") if node.name == "a" else node.get("src")
        url = urllib.parse.urlsplit(urllib.parse.urljoin(base + target, value))
        if url.scheme not in ("http", "https") or url.netloc not in hosts:
            continue
        path = url.path or "/"
        if node.name == "img":
            # Original local assets are checked separately from Next's optimiser.
            if path == "/_next/image":
                original = urllib.parse.parse_qs(url.query).get("url", [""])[0]
                if original.startswith("/") and not original.startswith("//"):
                    assets.add(original)
            else:
                assets.add(path)
            if not node.has_attr("alt"):
                errors.append(f"Image on {target}: missing alt attribute")
        elif not path.startswith("/api/") and not path.endswith(".pdf"):
            links.add((path, urllib.parse.unquote(url.fragment), target))

additional = sorted({path for path, _, _ in links if path not in documents})
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    for target, status, kind, body in pool.map(fetch, additional):
        if status != 200:
            errors.append(f"Internal target {target}: HTTP {status}")
        elif kind == "text/html":
            documents[target] = BeautifulSoup(body, "html.parser")
for path, fragment, source in sorted(links):
    if fragment and path in documents and not documents[path].find(id=fragment) and not documents[path].find("a", attrs={"name": fragment}):
        errors.append(f"Broken fragment {source} → {path}#{fragment}")
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    for target, status, _, _ in pool.map(fetch, sorted(assets)):
        if status != 200:
            errors.append(f"Local image {target}: HTTP {status}")
print(json.dumps({"sitemapPages": len(pages), "otherInternalTargets": len(additional), "internalLinks": len(links), "localImages": len(assets), "errors": errors, "limit": "HTTP/HTML only; no browser screenshots, computed styles or user interactions."}, ensure_ascii=False, indent=2))
raise SystemExit(bool(errors))
