"""Check current public responses for URLs in GSC indexing exports."""

import argparse
from concurrent.futures import ThreadPoolExecutor
import csv
from html.parser import HTMLParser
import json
from pathlib import Path
import subprocess


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonicals = []
        self.robots = []
        self.links = []
        self.h1_count = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonicals.append(attrs.get("href"))
        if tag == "meta" and attrs.get("name", "").lower() in ("robots", "googlebot"):
            self.robots.append(attrs.get("content", ""))
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
        if tag == "h1":
            self.h1_count += 1


def check(row):
    result = dict(row)
    fetched = subprocess.run(
        ["curl", "-sS", "-L", "--max-time", "30", "--max-redirs", "5",
         "-w", "\n%{json}", row["URL"]], capture_output=True,
    )
    if fetched.returncode:
        result["error"] = fetched.stderr.decode(errors="replace")
        return result
    body, metadata = fetched.stdout.rsplit(b"\n", 1)
    info = json.loads(metadata)
    result.update(status=info["http_code"], final_url=info["url_effective"],
                  content_type=info.get("content_type"), bytes=len(body))
    if "text/html" in (info.get("content_type") or ""):
        page = Page()
        page.feed(body.decode(errors="replace"))
        result.update(canonicals=page.canonicals, robots=page.robots,
                      h1_count=page.h1_count, links=sorted(set(page.links)))
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("folders", type=Path, nargs="+")
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    rows = []
    for folder in args.folders:
        with (folder / "Таблица.csv").open(encoding="utf-8-sig") as source:
            rows.extend({**row, "export": folder.name} for row in csv.DictReader(source))
    with ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(check, rows))
    args.output.write_text(json.dumps(results, ensure_ascii=False, indent=2))
    print(json.dumps({"checked": len(results), "errors": sum("error" in r for r in results),
                      "statuses": {str(code): sum(r.get("status") == code for r in results)
                                   for code in sorted({r["status"] for r in results if "status" in r})}}, indent=2))
