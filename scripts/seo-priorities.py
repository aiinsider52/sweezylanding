"""Build a review queue from an actual GSC export, never from invented demand.

python3 scripts/seo-priorities.py /path/to/export.xlsx
The export's page/query tables remain independent aggregates; no query-to-page join.
"""
import argparse
from datetime import date
import importlib.util
import json
from pathlib import Path
from urllib.parse import urlsplit

spec = importlib.util.spec_from_file_location('gsc_report', Path(__file__).with_name('gsc-report.py'))
gsc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gsc)
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('export', type=Path)
parser.add_argument('--limit', type=int, default=10)
args = parser.parse_args()
if not 1 <= args.limit <= 50:
    parser.error('--limit must be between 1 and 50')
report = gsc.build_report(args.export)
tables = gsc.read_xlsx(args.export) if args.export.suffix.lower() == '.xlsx' else {'Страницы': gsc.read_csv(args.export / 'Страницы.csv')}
queue = []
for row in tables['Страницы']:
    url = row.get('Популярные страницы') or row.get('Страницы') or ''
    parsed = urlsplit(url)
    if parsed.hostname not in ['www.sweezy.world', 'sweezy.world'] or parsed.scheme != 'https':
        continue
    impressions = gsc.count(row['Показы'])
    clicks = gsc.count(row['Клики'])
    position = float(row['Позиция'] or 0)
    if impressions < 30 or not 1 <= position <= 30:
        continue
    ctr = clicks / impressions
    queue.append({'url': url, 'clicks': clicks, 'impressions': impressions, 'ctrPercent': round(ctr*100, 2), 'position': position, 'reviewScore': round(impressions*(1-min(ctr, .15)) / max(1, position/10), 2), 'nextAction': 'Inspect recent page-filtered queries, snippet promise and search intent; preserve accurate metadata until reviewed.' if position <= 10 else 'Review intent, answer quality, internal links and selected canonical before creating another URL.'})
queue.sort(key=lambda row: row['reviewScore'], reverse=True)
age = (date.today() - date.fromisoformat(report['to'])).days
print(json.dumps({'exportPeriod': {'from': report['from'], 'to': report['to']}, 'ageDays': age, 'freshness': 'needs_refresh' if age > 7 else 'recent_export', 'note': 'Ranking uses the full exported page period, not the latest 28-day chart. Scores are review heuristics, not predicted traffic. Query and page aggregates are not joined. Fresh page-filtered queries and URL Inspection are required before snippet experiments.', 'selected': queue[:args.limit], 'eligibleCount': len(queue)}, ensure_ascii=False, indent=2))
