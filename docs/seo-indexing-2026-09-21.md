# Indexing investigation: September 21, 2026

## Evidence

User exports `https___www-16`, `https___www-17`, `https___www-18` contain 33 crawled/unindexed, 203 discovered/unindexed and six duplicate URLs respectively. Chart ends September 18; individual crawl dates include September 19. Treat 1970-01-01 as missing crawl-date data, not an actual crawl date.

Current public HTTP checks completed for all 242 supplied URLs with four concurrent requests. All returned 200 without curl errors. There are 241 HTML pages and one PNG Open Graph resource. All 241 HTML pages appear in the current 324-URL sitemap and have one H1 and no noindex in the parsed robots meta tags. This does not prove Googlebot access, rendering, indexing or absence of HTTP-header restrictions.

All six URLs classified as duplicates currently have one self-referencing canonical in their HTML. Do not redirect them, point translations to English, or remove them from the sitemap without inspecting Google's selected canonical and crawled HTML.

Three audited HTML pages lack canonical: `/privacy`, `/terms`, `/support`. Added route-level metadata layouts for these and the equivalent client-rendered `/cookies` page. The cookies route was found through the source review, not the supplied issue export. This is a limited metadata correction, not an explanation for the 203-URL discovery queue.

## Where the queue is concentrated

Discovered/unindexed: 105 places pages, 56 guides pages, 26 blog pages, six jobs pages and ten other pages. Of the 33 crawled/unindexed entries, 27 show a crawl date before August 2026. The report may describe older content or metadata. The Open Graph image is not a landing page and needs no HTML-indexing fix.

## Priority inspection queue

| URL path | Export status | Next evidence needed |
| --- | --- | --- |
| `/uk/blog/poshuk-roboty-shveytcariya-2026` | Duplicate | Google-selected canonical, user canonical in crawled HTML, last crawl |
| `/uk/blog/status-s-shveytcariya-povnyy-gid` | Duplicate | Same; compare with redirected legacy Status S article |
| `/en/guides/geneva` | Duplicate | Same; identify actual competing URL before changing content |
| `/en/guides/zurich/registration` | Discovered | Live URL Inspection and request indexing after a successful check |
| `/en/blog/how-to-register-switzerland` | Discovered | Crawl availability and live rendered content |
| `/en/blog/how-to-find-job-switzerland-foreigner` | Discovered | Crawl availability and live rendered content |
| `/uk/blog/yak-zareyestruvatysya-v-shveytcariyi` | Discovered | Crawl availability and live rendered content |
| `/uk/blog/medychne-strakhuvannya-shveytcariya` | Discovered | Crawl availability and live rendered content |
| `/en/blog/swiss-tax-return-2026` | Crawled, June 25 | Whether Google has recrawled the revised content |
| `/uk/guides/zurich` | Crawled, May 15 | Whether Google has recrawled the revised content |

Editorial/team profiles are lower acquisition priority. Keep them available for readers and attribution. Do not pursue 100% indexing as the business metric.

## Next decisions

1. Inspect the three commercial/content duplicate cases above before changing URL ownership. Self-canonical is already present on production; adding it again cannot resolve this evidence gap.
2. Request indexing for the most important eligible pages through the owner's Search Console. No owner-level action was performed in this run.
3. Use server crawler logs and URL Inspection to distinguish a crawl queue from content selection. Public HTTP 200 alone cannot make that distinction.
4. Recheck priority URLs after Google recrawls. Track indexed priority pages, non-brand clicks and actual site sessions separately. More indexed pages do not imply proportional traffic growth.

## Reproduce

`python3 scripts/audit-gsc-indexing.py <export-16> <export-17> <export-18> --output /tmp/sweezy-indexing-audit.json`

The script preserves export status and crawl date beside current response, canonical, robots meta, H1 and links. Network errors are recorded rather than treated as indexing problems.

Sources: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls and https://support.google.com/webmasters/answer/7440203
