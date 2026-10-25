# Informational PDF and city release

All seven download types were rebuilt in Ukrainian, English and German: 21 PDFs, 111 pages. Business guides have four pages, starter guides five, and the eight-destination travel guide ten. Stable download filenames and API routes are preserved. No PDF contains AcroForm fields, checkboxes or blank worksheets. Existing interactive website tools remain separate.

The shared renderer uses local Noto fonts, a forest-green/cream palette, large cover imagery, readable prose, primary-source links and actual first-page previews. Travel pages include each place's description, visit season, duration, arrival and practical tip. Every PDF stays below 2 MB.

Rebuild: `npm run pdf:build`. Verify: `npm run test:pdf`. Legacy growth/travel generation scripts use the same renderer; the starter QA exporter no longer prints the web checklist over the editorial PDFs.

Added Berlin and Vienna city guides in all three languages, linked from country hubs, sitemap and llms.txt. Each has four substantive sections, three visible/schema FAQs, official city sources and a country-matched PDF. StartWien eligibility restrictions are distinguished from Ukraine-specific support.

Community posts and a provider invitation are prepared in `docs/dach-community-drafts-2026-10-23.md`; nothing was sent.

## External dependencies

Production publication and analytics provisioning remain blocked by hosting access: the connected Vercel team lists 12 projects, none named Sweezy; the Render connection returns UNAUTHORIZED and requests reauthentication. No unrelated hosting project was changed. A persistent analytics destination has not been configured. Local analytics continues to work; production downloads remain independent of metrics availability.

The newest GSC performance data in the repository ends 25 September 2026. No fresh October export or live GSC connection was available; the historical candidates were not relabelled as current opportunities. Browser layout testing is unavailable in this sandbox; static/HTTP checks do not substitute for it.
