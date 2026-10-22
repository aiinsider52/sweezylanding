# Sweezy: social preview, business cluster and starter-kit promotion

Prepared 22 October 2026. These changes are local; this document does not verify a production release or Google indexation.

## Social preview and identity

The old default image was `/screenshots/home.png`. Root, explicit EN/UK/DE layouts and homepages, the generic locale layout and guide index now share `lib/social.ts` and `/social/sweezy-switzerland-v2.jpg` (1200 × 630, 193,128 bytes). Article-specific Open Graph covers remain in use. Their generators, the blog library cover and canton covers now embed local Noto Sans regular/bold fonts, including Cyrillic. This fixes square glyphs when the external font fallback is unavailable; Twitter article covers reuse the same generator. Font sources: the official notofonts/noto-fonts repository (`hinted/ttf/NotoSans`), with its SIL Open Font License included in `public/fonts/OFL.txt`.

The new cover is illustrative generated Swiss landscape artwork, not a photograph attributed to a particular destination. Both Open Graph and Twitter defaults reference it. A new filename gives image crawlers a fresh asset URL; a previously cached page preview may still need to be refreshed after release.

`app/icon.svg`, the header/footer mark, `app/favicon.ico` (16/32/48) and `app/apple-icon.png` (180) use a consistent lime and ink S. The old Apple SVG was replaced with a PNG supported by Next's Apple icon convention.

## Ukrainian business search cluster

Each intent has one article owner, its own title, description, canonical, source list and review date. No missing EN/DE translations are advertised. The existing MDX pipeline includes all four pages in the blog and sitemap.

| Search intent | Local route |
| --- | --- |
| Starting a business as a Ukrainian; practical difficulty and launch plan | `/uk/blog/biznes-u-shveytcariyi-dlya-ukrayintsiv` |
| Self-employment with Swiss Status S; notification and AHV | `/uk/blog/samozaynyatist-status-s-shveytcariya` |
| Einzelfirma versus GmbH; capital, liability and budget | `/uk/blog/einzelfirma-chy-gmbh-shveytcariya` |
| Business communities, learning and networking | `/uk/blog/biznes-spilnoty-shveytcariya` |

Discovery links: Ukrainian homepage knowledge cards, footer, Ukrainian blog featured routes, existing work and Status S guides, and explicit links between all four new articles. The editorial business topic takes precedence over the generic Status S topic for the self-employment article.

The content distinguishes activity notification, social-insurance recognition, company registration and tax obligations. It gives no fixed launch time, guaranteed permit conversion, universal tax result or promise of clients/funding. Community listings are a researched selection, not Sweezy partnerships or a ranking.

Primary sources checked:

- [SEM: activity notification](https://www.sem.admin.ch/sem/de/home/ukr-schutzsuchende/ich-suche-eine-stelle/arbeitsbewilligung.html)
- [Lucerne: Status S procedure](https://migration.lu.ch/Arbeitsbewilligung/Arbeiten_mit_bestehender_Bewilligung/Schutzstatus_S_Ukraine)
- [Basel-Stadt: notification by the self-employed person](https://www.bs.ch/themen/arbeit-und-steuern/arbeitsbewilligungen/erstmaliger-stellenantritt/arbeitnehmende-aus-dem-asylbereich)
- [Zurich: recognition of self-employment](https://www.zh.ch/en/wirtschaft-arbeit/unternehmensportal/opu/firma-gruenden/selbstaendig-werden/selbstaendig-werden-als-einzelunternehmen.html)
- [SECO: sole proprietorship](https://www.kmu.admin.ch/en/legal-form-sole-proprietorships)
- [SECO: limited liability company](https://www.kmu.admin.ch/en/legal-form-limited-liability-company)
- [EasyGov: legal forms](https://www.easygov.swiss/easygov/portal/resource/document/Rechtsformen_e.pdf)
- [ESTV: VAT liability](https://www.estv.admin.ch/en/vat-tax-liability)
- [USBA](https://ukraine-swiss.ch/uk/pro-asocziacziyu/), [HSU](https://www.hsu.ch/en/about-us/), [IFJ courses](https://www.ifj.ch/get-started/courses), [Impact Hub Switzerland](https://www.impacthub.ch/)

IFJ's course descriptions were available in indexed first-party search results; direct fetch returned HTTP 503. Availability, dates, language and conditions should be rechecked with the organizer before a visit. No future event dates are published in this cluster.

## Popular places and the lead magnet

Homepage cards now use an explicit editorial selection: Rhine Falls, Rigi, Lake Oeschinen and Lavaux. The section calls this the Sweezy selection; it makes no claim about measured site popularity.

The existing free first-week kit is placed immediately after the homepage proof strip, ahead of the knowledge cards. Its main CTA downloads the matching EN/UK/DE PDF directly; a second link opens the interactive checklist. Copy states that it is free, one page and requires no signup. The reusable banner also appears after blog content and canton guides, and the footer links to the kit.

This promotes the existing relocation checklist; it is not presented as a business-registration PDF. No email gate, contact list or download analytics dashboard was introduced. A click/download uplift has not yet been measured.

## Verification and release checks

Final validation passed:

- Production build and TypeScript checks: 346/346 static outputs.
- Three homepages: 1200 × 630 Open Graph/Twitter metadata, fresh image URL, favicon and Apple icon links, direct localized download, promoted kit order and all four destination links.
- Four business pages: one H1, canonical, indexability, no nonexistent language alternates, unique IDs, internal destinations, mutual links, article citations and sitemap inclusion.
- Local production HTTP requests with a Telegram crawler user agent: homepage, images, icons, all three PDFs and four business routes returned 200; root redirected to `/en`.
- Nine image routes returned 1200 × 630 PNGs, including Ukrainian blog and canton covers, article covers and Twitter. The Ukrainian pillar, blog library and canton images were visually inspected as standalone images after the font fix.
- Noto Sans regular/bold cmap checks cover the English alphabet, the full Ukrainian alphabet (including Ґ, Є, І, Ї) and German umlauts/ß. Both fonts are included in all four image route deployment traces through `experimental.outputFileTracingIncludes`.
- Existing related-post tests, including new business-topic precedence cases, and 14-route SEO sprint regression checks passed; `git diff --check` passed.
- Existing PDFs have valid PDF headers and declare one page in their page trees. PDF contents and print pagination were not visually rechecked in this run.

No additional dependencies were installed. The existing Browserslist staleness warning remains.

 Browser layout, keyboard interaction and Telegram's actual rendering require a separate visual check; Chromium cannot launch in this environment because of the operating-system sandbox restriction.

After release:

1. Check root redirect and EN/UK/DE default Open Graph tags against the deployed build; fetch the JPEG, icons and localized PDFs publicly.
2. Send the homepage URL in Telegram and refresh any cached preview if it still uses the old image.
3. Verify the four new pages are in the live sitemap; inspect the pillar URL in Search Console and request indexing if available.
4. Review business queries/pages and starter-kit engagement after sufficient data accumulates. Search Console clicks do not measure completed PDF downloads.
