"""Compare Russian Search Console CSV exports without treating clicks as users."""

import argparse
import csv
from datetime import date, timedelta
import json
from pathlib import Path


def read_csv(path):
    with path.open(encoding="utf-8-sig", newline="") as source:
        return [
            {key.replace("Kлики", "Клики"): value for key, value in row.items()}
            for row in csv.DictReader(source)
        ]


def metrics(rows):
    clicks = sum(int(row["Клики"]) for row in rows)
    impressions = sum(int(row["Показы"]) for row in rows)
    return {
        "days_present": len(rows),
        "clicks": clicks,
        "impressions": impressions,
        "ctr_percent": round(100 * clicks / impressions, 2) if impressions else None,
        "approximate_position": round(sum(
            float(row["Позиция"] or 0) * int(row["Показы"]) for row in rows
        ) / impressions, 2) if impressions else None,
    }


def build_report(folder):
    rows = sorted(read_csv(folder / "Диаграмма.csv"), key=lambda row: row["Дата"])
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

    pages = read_csv(folder / "Страницы.csv")
    opportunities = sorted(
        [row for row in pages if int(row["Показы"]) >= 100 and float(row["Позиция"]) <= 20],
        key=lambda row: int(row["Показы"]), reverse=True,
    )
    queries = read_csv(folder / "Запросы.csv")
    query_opportunities = sorted(
        [
            row for row in queries
            if int(row["Показы"]) >= 15
            and 4 <= float(row["Позиция"]) <= 30
            and "sweezy" not in row["Популярные запросы"].lower()
        ],
        key=lambda row: (int(row["Показы"]), -float(row["Позиция"])),
        reverse=True,
    )
    return {
        "from": str(start), "to": str(end),
        "measurement_note": "GSC clicks are not unique visitors. Position is impression-weighted from rounded daily data. Page opportunities use the full export period, not the last 28 days.",
        "visitor_goal": {"monthly_unique_visitors": 500, "measured_unique_visitors": None, "achieved": None},
        "total": metrics(rows), "months": months,
        "last_28_days": current, "previous_28_days": previous,
        "growth_percent": growth,
        "page_opportunities": opportunities,
        "non_brand_query_opportunities": query_opportunities,
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("export_folder", type=Path)
    args = parser.parse_args()
    print(json.dumps(build_report(args.export_folder), ensure_ascii=False, indent=2))
