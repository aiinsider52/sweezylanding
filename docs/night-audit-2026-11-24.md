# Night audit and growth pass — 24 November 2026

Full report (Russian): published as a private Claude artifact "Sweezy Growth Audit".
Inputs: Search Console export for the last 3 months (131 clicks, 17,302 impressions, CTR 0.76%, avg position ≈8), live-site HTTP audit, code review, current iOS app design (Illustrated City, App Store v2 screens).

## Changed in code (not deployed)

- Shop checkout: Stripe Checkout via REST (`lib/shop-checkout.ts`, `POST /api/shop/checkout`, `/[locale]/shop/thanks`). Enabled only when BOTH `STRIPE_SECRET_KEY` and `SHOP_SHIPPING_CHF` are set (optional `SHOP_SHIP_COUNTRIES`, default `CH,LI`). Only products with a price in `data/shop-prices.ts` are buyable; others keep the email enquiry. Fulfilment stays manual.
- Product schema: `Offer` (CHF) for priced products; availability and shipping only when checkout is on. Shop `ItemList` carries prices. Product titles include price; descriptions trimmed to ~155 chars.
- Brand entity: new home titles/descriptions (EN/DE/UK), Organization `alternateName`, App Store in `sameAs`, `areaServed`, Smart App Banner (`itunes.appId`).
- Removed App Store ratings/reviews from JSON-LD (third-party reviews); quotes stay visible.
- Agents: `/llms.txt` gains app, shop, endpoint and canton sections; new `/llms-full.txt` (all indexable articles as Markdown), `/products.json`, `/feed.xml` (+ RSS link in `<head>`).
- `next.config.js`: security headers, 1-day + SWR cache for public image folders, `images.minimumCacheTTL` 7 days.
- Sitemap: `lastmod` for canton guides and places from their review dates.
- UX: reveal animations hide content only when `html[data-motion="on"]` (set by the theme bootstrap, skipped for reduced motion); consent banner appears after first interaction or 4 s and is compact on phones; homepage app showcase now uses current App Store screens (`AppScreens`); header menu titles are no longer H2; H1 spacing fixed.

## Owner actions

1. Review and deploy. 2. Set Stripe live key + shipping price in Vercel; enable TWINT and payment emails in Stripe. 3. Price the 29 "price on request" products. 4. Vercel domain: apex → 308 to www; set `INDEXNOW_KEY`.

## Verification

`npm run build` (533 pages) with and without checkout env; prod server checks for headers, Offer, titles, API validation (invalid JSON/empty cart → 400, fake Stripe key → 502 after Stripe 401); `test:shop:checkout`, `test:shop`, theme, growth analytics, related posts, discovery, services, blog images, swiss map — all pass.
