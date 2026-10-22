# SEO implementation: 22 October 2026

Status: first implementation batch complete locally. No production deployment, GSC indexing request or external outreach performed. Release date: not yet recorded.

## Implemented

- German Herisau and Freiburg: specific visible headings, independent-guide introductions, contact cards before the generic canton overview. Existing titles, canonical URLs and translations retained. Contact labels and the official-source link are localized; German editorial copy uses proper umlauts.
- Zurich registration: eight-item document checklist, print / save-as-PDF action and scoped print styles. No account, upload, new storage or analytics dependency. Added the city's instructions when the first appointment is after the reporting deadline, official-source link, FAQ and existing starter-kit link. The content review date is October 22; the title remains unchanged.
- Zug, all three locales: corrected the previously overgeneralized arrival route. The City of Zug directs foreign nationals arriving from abroad or another canton to the cantonal Migration Office; the city receives the registration from that office. Added the official city source. These instructions are scoped to the city, not all Zug municipalities.
- English St. Gallen: distinguishes city Population Services from other canton municipalities, points to the city's arrival/residence procedure and clarifies the route by previous residence.
- Reporting: `scripts/gsc-report.py` accepts a Russian GSC XLSX export as well as an extracted CSV folder. Standard-library XML parsing supports shared/inline strings and decimal-formatted integer counts. Preserves equal 28-day comparisons, validates counts and dates, reports incomplete visible-query coverage and search-click milestones without equating clicks with visitors.
- Distribution: `docs/seo-distribution-2026-10-22.md` contains 20 publicly researched candidates and ten tailored drafts, with sources and UTM links. These are potential contacts, not existing partnerships.
- Inspection worksheet: `docs/seo-index-inspection-2026-10-22.csv` contains five priority URLs. Their locally built canonicals were checked; Google index status, selected canonical and crawl dates remain unknown.

The working tree already contained Fribourg and destination work before this batch. It has been preserved. The implementation is layered onto that state; a full working-tree diff includes those earlier changes.

## Validation

- `npm run build`: passed, all 340 pages generated; TypeScript checks included.
- `python3 scripts/test_gsc_report.py`: six tests passed, including XLSX/CSV parity, sparse/mixed cells and invalid metric values.
- `node scripts/test-related-posts.cjs`: passed.
- `python3 scripts/seo-sprint-static-qa.py`: 14 prerendered routes passed H1, canonical, robots, unique IDs, visible FAQ/schema, contact placement, checklist markup and source-link checks.
- `git diff --check`: passed.
- The existing desktop/mobile browser suites could not launch Chromium: the execution environment denied the browser's macOS Mach-port registration. They did not reach the pages. Responsive layout, checkbox/print interaction and PDF pagination are still unverified. This is not recorded as a browser-test pass.
- Existing build warning: Browserslist's local data is old. Dependencies were not changed.

For browser verification after release or in an environment that permits Chromium:

```sh
QA_BASE_URL=http://127.0.0.1:3031 python3 scripts/seo-authority-qa.py
QA_BASE_URL=http://127.0.0.1:3031 python3 scripts/seo-secondary-pages-qa.py
```

Additionally open `/en/guides/zurich/registration` at desktop and 390px widths, tick a checkbox, use the print button, and verify that only the full checklist prints with its checked state and source URL. Check light/dark theme, keyboard focus and overflow. This print interaction is not covered by the two older suites.

## Scheduled review

Four weekly reviews are scheduled for Thursday mornings in Europe/Zurich, starting October 29. They read fresh Library exports and the updated plan; missing new data is reported explicitly. They do not log in to GSC or publish changes.

## Pending evidence

1. Inspect the five URLs in GSC, then record actual index verdict, selected canonical and last crawl in the worksheet. Do not treat local indexability as proof of Google indexing.
2. Export queries with an exact page filter for Zurich, registration, Fribourg, Herisau and the tax-return article, comparing equal 28-day periods. Global tables cannot establish query-to-page ownership.
3. Record actual release and confirmed recrawl dates before measuring the effect. Current baseline from the supplied workbook: 31 clicks / 4,726 impressions, September 23–October 20; preceding 28 days: 46 / 6,359.
4. Existing first-party telemetry logs performance/errors and AI referrals. No configured business-conversion reporting or consent-aware analytics integration was found in the inspected source. No new tracker was installed. App Store clicks, visits and installs are not currently established by this work.
5. Send outreach only through confirmed appropriate recipients/channels after the target pages are live. Draft preparation is complete; no partner outcome is claimed.

Tax snippets, homepage/community titles and new article production remain conditional on evidence in the approved plan. The current owners and existing internal links already cover many proposed topics, so no competing URLs were added.

## Primary sources checked

- Zurich arrival, document requirements and delayed appointments: https://www.stadt-zuerich.ch/zuzug
- Freiburg BMA: https://www.fr.ch/de/sjsd/bma
- Herisau division contact: https://staatskalender.ar.ch/organization/kantonale-behoerden/kantonale-verwaltung/departement-inneres-und-sicherheit/amt-fuer-inneres/abteilung-migration
- City of Zug nationality/previous-residence routes: https://stadtzug.ch/de/leben/wohnen-umziehen/umziehen/zuzug
- Zug cantonal Migration Office: https://zg.ch/de/sicherheitsdirektion/amt-fuer-migration
- St. Gallen city arrival/residence guidance: https://www.stadt.sg.ch/home/gesellschaft-sicherheit/leben-schweiz/aufenthalt-niederlassung-bewilligung.html

The Staatskalender footer's cantonal-chancellery address/hours are not used as the Herisau Migration Division's street address/hours.
