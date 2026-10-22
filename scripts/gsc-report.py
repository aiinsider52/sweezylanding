"""Compare Russian Search Console XLSX or CSV exports without treating clicks as users."""

import argparse
import csv
from datetime import date, timedelta
import json
from pathlib import Path
import posixpath
import re
import xml.etree.ElementTree as ET
from zipfile import ZipFile

NS = {"s": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}


def count(value):
    result = float(value)
    if result < 0 or not result.is_integer():
        raise ValueError("Clicks and impressions must be non-negative integers")
    return int(result)


def read_xlsx(path):
    """Read text/numeric GSC tables without executing formulas or requiring Excel."""
    with ZipFile(path) as source:
        strings = []
        if "xl/sharedStrings.xml" in source.namelist():
            strings = ["".join(item.itertext()) for item in ET.fromstring(source.read("xl/sharedStrings.xml"))]
        relationships = {
            item.attrib["Id"]: item.attrib["Target"]
            for item in ET.fromstring(source.read("xl/_rels/workbook.xml.rels"))
            if item.attrib.get("TargetMode") != "External"
        }
        tables = {}
        workbook = ET.fromstring(source.read("xl/workbook.xml"))
        for sheet in workbook.findall("s:sheets/s:sheet", NS):
            relationship = sheet.attrib["{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"]
            target = relationships[relationship]
            member = target.lstrip("/") if target.startswith("/") else posixpath.normpath("xl/" + target)
            rows = []
            for row in ET.fromstring(source.read(member)).findall("s:sheetData/s:row", NS):
                cells = {}
                for cell in row.findall("s:c", NS):
                    column = re.match(r"[A-Z]+", cell.attrib["r"]).group()
                    raw = cell.findtext("s:v", default="", namespaces=NS)
                    kind = cell.attrib.get("t")
                    if kind == "s":
                        raw = strings[int(raw)]
                    elif kind == "inlineStr":
                        raw = "".join(cell.find("s:is", NS).itertext())
                    cells[column] = raw
                if cells:
                    rows.append(cells)
            if rows:
                headers = {column: value.replace("Kлики", "Клики") for column, value in rows[0].items()}
                tables[sheet.attrib["name"]] = [
                    {header: row.get(column, "") for column, header in headers.items()}
                    for row in rows[1:]
                ]
        return tables


def read_csv(path):
    with path.open(encoding="utf-8-sig", newline="") as source:
        return [
            {key.replace("Kлики", "Клики"): value for key, value in row.items()}
            for row in csv.DictReader(source)
        ]


def metrics(rows):
    clicks = sum(count(row["Клики"]) for row in rows)
    impressions = sum(count(row["Показы"]) for row in rows)
    return {
        "days_present": len(rows),
        "clicks": clicks,
        "impressions": impressions,
        "ctr_percent": round(100 * clicks / impressions, 2) if impressions else None,
        "approximate_position": round(sum(
            float(row["Позиция"] or 0) * count(row["Показы"]) for row in rows
        ) / impressions, 2) if impressions else None,
    }


def build_report(folder):
    tables = read_xlsx(folder) if folder.suffix.lower() == ".xlsx" else {
        name: read_csv(folder / (name + ".csv")) for name in ["Диаграмма", "Страницы", "Запросы"]
    }
    missing = {"Диаграмма", "Страницы", "Запросы"} - tables.keys()
    if missing:
        raise ValueError("Missing required sheets: " + ", ".join(sorted(missing)))
    rows = sorted(tables["Диаграмма"], key=lambda row: row["Дата"])
    if not rows:
        raise ValueError("Daily chart is empty")
    dates = [date.fromisoformat(row["Дата"]) for row in rows]
    if len(set(dates)) != len(dates):
        raise ValueError("Duplicate daily dates in export")
    start, end = dates[0], dates[-1]
    if len(dates) != (end - start).days + 1:
        raise ValueError("Missing daily dates: do not compare incomplete windows")

    def window(offset):
        last = end - timedelta(days=offset)
        first = last - timedelta(days=27)
        selected = [row for row in rows if str(first) <= row["Дата"] <= str(last)]
        return {"from": str(first), "to": str(last), "complete": len(selected) == 28, **metrics(selected)}

    current, previous = window(0), window(28)
    growth = {}
    for key in ("clicks", "impressions"):
        growth[key] = (
            round((current[key] / previous[key] - 1) * 100, 1)
            if current["complete"] and previous["complete"] and previous[key] else None
        )
    months = {}
    for month in sorted({row["Дата"][:7] for row in rows}):
        selected = [row for row in rows if row["Дата"].startswith(month)]
        last = date.fromisoformat(selected[-1]["Дата"])
        complete = selected[0]["Дата"].endswith("-01") and (last + timedelta(days=1)).month != last.month
        months[month] = {"complete": complete, **metrics(selected)}

    pages = tables["Страницы"]
    opportunities = sorted(
        [row for row in pages if count(row["Показы"]) >= 100 and float(row["Позиция"]) <= 20],
        key=lambda row: count(row["Показы"]), reverse=True,
    )
    queries = tables["Запросы"]
    query_opportunities = sorted(
        [
            row for row in queries
            if count(row["Показы"]) >= 15
            and 4 <= float(row["Позиция"]) <= 30
            and "sweezy" not in row["Популярные запросы"].lower()
        ],
        key=lambda row: (count(row["Показы"]), -float(row["Позиция"])),
        reverse=True,
    )
    return {
        "from": str(start), "to": str(end),
        "measurement_note": "GSC clicks are not site visits or unique visitors. Position is impression-weighted from rounded daily data. Page and query opportunities use the full export period, not the last 28 days. Separate page and query exports cannot identify which queries generated a page's impressions.",
        "visitor_goal": {"monthly_site_visits_range": [2000, 3000], "measured_site_visits": None, "achieved": None},
        "total": metrics(rows), "months": months,
        "last_28_days": current, "previous_28_days": previous,
        "growth_percent": growth,
        "search_click_goal": {"rolling_28_day_milestones": [60, 100, 200, 500], "target_achieved": current["clicks"] >= 500 if current["complete"] else None},
        "query_coverage": {
            "visible_clicks": sum(count(row["Клики"]) for row in queries),
            "visible_impressions": sum(count(row["Показы"]) for row in queries),
            "note": "Visible query rows are incomplete; do not classify missing clicks as non-brand. Brand-like queries may include another Sweezy product.",
        },
        "page_opportunities": opportunities,
        "non_brand_query_opportunities": query_opportunities,
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("export_folder", type=Path, help="Russian GSC .xlsx export or extracted CSV directory")
    args = parser.parse_args()
    print(json.dumps(build_report(args.export_folder), ensure_ascii=False, indent=2))
