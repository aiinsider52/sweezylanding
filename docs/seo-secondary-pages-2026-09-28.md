# Secondary-page SEO batch: 28 September 2026

## Selection

Search Console export `https___www-20`, full export period 17 March-25 September. These are not latest-28-day figures and not page-filtered query joins.

| Existing page | Impressions | Clicks | Position |
| --- | ---: | ---: | ---: |
| `/de/guides/fribourg` | 129 | 0 | 8.57 |
| `/en/guides/fribourg` | 52 | 0 | 9.17 |
| `/en/places/blausee` | 72 | 0 | 19.61 |
| `/de/places/blausee` | 30 | 0 | 23.17 |
| `/de/places/rhine-falls` | 204 | 0 | 72.16 |

Independent query signals include `migrationsamt fribourg` (26 impressions), `spomi fribourg` (17), `blausee` (54), and `rheinfall` (43). The export does not establish the matching page for each query. The Rhine Falls page is a longer-term content experiment, not a quick CTR win at position 72.

## Implementation

- Blausee: original visit-planning content, an optional-activity route instead of a mandatory boat stop, operator links, admission/swimming/seasonal-boat FAQs, specific metadata in English, Ukrainian and German.
- Oeschinensee and Blausee: reciprocal contextual recommendations; existing canonical URLs retained. Missing/self/duplicate preferred destinations are excluded.
- Rhine Falls: specific entry/opening-hours/transport metadata; updated admission answer distinguishes the free basin from Schloss Laufen; general access does not imply round-the-clock boat or attraction operation. Price check is explicitly dated.
- Fribourg: postal procedures and biometric invitations distinguished from municipal registration; sector-specific hours sent to the official source. Municipality is the actual place of residence, not automatically the canton capital. Added FAQs share their content with structured data.
- Three destinations/topics, nine localized pages; no new competing URL, redirect or fabricated popularity claim.

## Sources checked

- [Blausee directions and hours](https://www.blausee.ch/en/welcome/)
- [Blausee visitor FAQ](https://www.blausee.ch/en/welcome/faq/)
- [Blausee nature park](https://www.blausee.ch/en/nature-park/)
- [Rheinfall admission and hours](https://rheinfall.ch/informieren/oeffnungszeiten-preise/liste)
- [Freiburg BMA procedures and contact](https://www.fr.ch/de/sjsd/bma)
- [Cantonal welcome brochure: municipal registration](https://www.fr.ch/sites/default/files/2024-01/brochure-de-bienvenue-allemand.pdf?v=1706032621)

The older welcome brochure's personal-appearance instructions must not override the current BMA page, which permits many procedures by post/email. No unsupported fixed appointment promise is made.

## Measurement and release

Changes prepared locally; deployment is a separate step. Record actual release date before comparing results. Do not equate HTTP 200 with Google indexing or promise a ranking increase.

After release: inspect these URLs in GSC, confirm selected canonical and crawl date, then compare equivalent 28-day windows by page. Measure clicks, impressions and CTR together with the actual queries; split country/device only if sample size permits. Do not rewrite titles again after a few days of low-volume data.

Validation: production build, existing authority regression suite and `scripts/seo-secondary-pages-qa.py` (nine pages, desktop/mobile, metadata, alternates, FAQ consistency, images, local links, sitemap and screenshots).

Completed: 340/340 pages built; nine-page suite passed at 1440px and 390px after the final Fribourg heading change; existing 14-route authority suite passed before that heading-only adjustment. Reporting and related-post unit tests passed. Screenshots inspected for mobile Blausee/Rhine Falls and desktop/mobile Fribourg. Initial build exposed an ES5-target iterator incompatibility, corrected with Array.from without changing compiler settings. Existing Browserslist age warning remains; no dependency changes or deployment performed.
