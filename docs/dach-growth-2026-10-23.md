# DACH growth implementation — 23 October 2026

Prepared in the existing Next.js checkout. Production release and performance outcomes have not been established by this task.

## Country structure and content

- `/{locale}/countries`: country choice, independent of website language.
- `/{locale}/countries/{switzerland,germany,austria}`: three country hubs in Ukrainian, English and German. Switzerland links to its existing articles rather than duplicating their canonical URLs.
- Germany and Austria each have registration, work/insurance and business guides in all three languages: 18 source-backed localized guides, roughly 560–650 words each.
- Pages distinguish nationality, residence rights, address registration, employment permission and professional qualifications. Each guide shows applicability, a short answer, official sources, the source-check date, editorial ownership and visible FAQs matching structured data. No external expert review is implied.
- Home positioning, navigation, footer, homepage metadata and the default social card now describe DACH. Country illustrations are editorial artwork, not photographs of providers or documentary street records.
- Hreflang maps only verified translated country/resource pages. Sitemap, image sitemap and discovery links include the new country structure.

## Useful services

The seven existing Swiss provider profiles retain their contact and language evidence. New curated pages cover Zurich and photography, each with at least two actual profiles. Country hubs add four distinct resources: Germany4Ukraine, BAMF-NAvI, Interface Wien MALVA and the ÖIF Vienna centre. Online directories are distinguished from physical consultation services; Vienna eligibility and language qualifications remain visible.

Provider photographs and external expert quotations have not been fabricated. No provider outreach, rating verification or external posting was performed. New commercial listings need first-party contact, language and service evidence; actual provider photos need an appropriate source and usage permission.

## Downloads and measurement

Seven PDF types in three languages are registered: existing first-week and Swiss travel kits, plus Swiss business and Germany/Austria starter/business kits. Fifteen new two-page PDFs contain 12 checkboxes, three note fields and clickable source/guide links. Business articles receive the Swiss business kit; country guides receive the matching country/topic kit. `/{locale}/resources` offers all 21 downloads.

Usage measurements require an explicit opt-in. A random tab-session identifier connects measured page paths, a source category and actions without storing IP addresses, query strings, full referrer URLs or message contents in event records. This is a consenting-tab funnel, not a count of all visitors or unique people. Choice expiry is 180 days; declining/withdrawing stops future usage events and removes the tab identifier.

Events:

| Event | Meaning |
| --- | --- |
| `page_view` | Measured page after consent |
| `download_requested` | PDF link activated |
| `download_served` | Allowlisted PDF read and prepared by the server; not proof of complete transfer |
| `download_received` | Full PDF response read and validated by browser JavaScript; not proof of disk save or opening |
| `download_failed` | Browser request or validation failed |
| `app_click` | App Store link activated; not an install |
| `service_contact` | Provider phone/email/site/map link activated; not a completed contact or booking |
| `community_click` | Community link activated |

All three download stages share a request identifier. The report separately counts receipts corroborated by the server. Without JavaScript or consent, downloads still work. Modified clicks retain normal browser behaviour; those native downloads do not produce a browser-receipt event.

## Persistent storage setup

Local Node preview stores private JSONL under `.local/analytics`, excluded from Git. On a long-lived production Node service, set `SWEEZY_ANALYTICS_DIR` to a mounted persistent directory. Daily event files older than the 90-day retention window are pruned during writes. Hosting access logs are independent.

For serverless hosting, configure `SWEEZY_ANALYTICS_SINK` to an actual HTTPS ingestion endpoint and optionally `SWEEZY_ANALYTICS_TOKEN` for its bearer authentication. Configure retention and access controls at that destination. The app rejects missing serverless storage rather than pretending console output is persistent analytics. Metrics failures cannot prevent a PDF download. No production sink or hosting volume was provisioned in this task.

Run `npm run analytics:report -- --days 28` for a JSON report of sources, pages, PDF request/receipt counts and subsequent app/provider clicks. Use `--dir` for a different mounted directory. No sample traffic is presented as real traffic.

## Search Console evidence and next ten pages

The newest performance evidence found in the checkout covers **17 March–25 September 2026**. It is historical evidence, not current October performance. No fresh GSC export, URL Inspection response or live GSC connection was available. Existing useful article titles remain stable; the homepage title change is specifically required by the DACH repositioning.

Historical review candidates, using the full export period recorded in the September reports:

| Page | Impressions | Clicks | Review scope |
| --- | ---: | ---: | --- |
| `/en` | 5,103 | 57 | DACH positioning and country-choice discovery |
| `/en/guides/zurich` | 5,600 | 38 | Municipal intent, selected canonical, first-week engagement |
| `/de/guides/appenzell-ausserrhoden` | 564 | 11 | Local authority/registration intent |
| `/en/blog/swiss-tax-return-2026` | 1,151 | 1 | Recent page-filtered queries before another title experiment |
| `/en/blog/swiss-tax-system-expats` | 236 | 0 | Overview versus filing-guide intent |
| `/de/guides/fribourg` | 129 | 0 | Correct migration-office contact and postal procedure |
| `/en/guides/fribourg` | 52 | 0 | Registration versus migration-office intent |
| `/en/places/blausee` | 72 | 0 | Visit planning and travel-kit engagement |
| `/de/places/blausee` | 30 | 0 | Visit planning and internal discovery |
| `/de/places/rhine-falls` | 204 | 0 | Historical position 72.16: longer-term relevance work, not a quick CTR win |

These ten are **not** a newly ranked top ten. Their source is `seo-gsc-2026-09-28.md` and `seo-secondary-pages-2026-09-28.md`. Export current chart/pages/queries before choosing ten current opportunities. Run `npm run seo:priorities -- /path/to/export.xlsx`: it ranks actual eligible pages, reports the export period/age and never joins separate aggregate query and page tables. Page-filtered queries and URL Inspection remain needed for individual snippet experiments.

## AI visibility

The new country guides provide citable text, scope, source links, real check dates and matching visible/schema FAQs. Existing crawler access and verified Swiss content remain. `reports/ai-dach-2026-10-23.csv` contains 20 unbranded prompts across five systems, all marked `not_tested`. Expected URLs are targets, not observed citation results. Run matched live checks after publication; no ranking, citation or traffic increase is claimed.

## Verification

Run the growth-analytics lifecycle/integration tests, GSC reporting/queue tests, existing theme/image/service regressions, production build, `scripts/dach-static-qa.py` and HTTP checks. The DOM harness tests consent and complete/truncated PDF responses; it is not a browser layout test. Browser automation was unavailable in this session. Record the actual production release date separately from source-check dates before comparing matched 28-day windows.

Validation completed locally: production build generated 396 routes; all 35 new country/resource/service pages passed static QA; all 43 existing article image/alt/social/JSON-LD checks passed; seven GSC reporting/priority tests and the growth-analytics lifecycle/storage suite passed. Existing theme contrast, related-post and seven-provider regressions passed. Sixty-four HTTP page/asset/PDF requests succeeded, six invalid routes returned 404 and a consented PDF funnel persisted requested/served/received events. The deployment trace includes all 21 PDFs. Synthetic HTTP events were isolated under a temporary QA directory; the final preview uses normal local storage.

The Codex browser handoff was unavailable; the working preview URL is http://localhost:3032/uk/countries. Browser layout/interaction QA remains unverified.
