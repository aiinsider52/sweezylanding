# Release preparation — 26 October 2026

Story: a visitor finds a guide, downloads a free PDF and follows a link to the app or a service; a business can separately review partnership formats and prepare a contact email. The application remains free, as confirmed by its owner. The new business pages use the existing Inter scale, spacing, themed surfaces and John asset; no new external design authentication was attempted.

## Implemented

- `/uk/partners`, `/en/partners`, `/de/partners`: directory suggestion, profile preparation and advertising discussion. No fixed public prices, checkout, subscription, audience size or promised leads. The Swiss commercial directory's current scope is stated separately from German/Austrian expansion.
- Entry links from the shared footer, homepage partner section and Ukrainian service catalogue; localized canonical/hreflang, social metadata and sitemap entries.
- `partner_contact` added to the existing opt-in metrics and report, with allowlisted format names. Email and form contents are excluded. A mail click or prepared draft is explicitly distinguished from a sent application and paying customer.
- FAQ text now says the current app and PDFs are free; speculative premium subscription text was removed from the public FAQ translations.
- Two broken unlocalized English article links fixed; one canton guide now links directly to the current Ukrainian work article.
- Analytics origin validation now accounts for the visitor-facing Host when Next constructs request.url using its listening hostname. The previous code rejected legitimate local-IP requests. Other-origin and no-consent requests remain rejected. A reverse proxy must preserve the original Host and correctly set its protocol using trusted proxy configuration.
- Empty `SWEEZY_ANALYTICS_DIR` now falls back to the intended local directory. `.env.example` documents persistent Node storage versus an HTTPS sink for serverless hosting and is now included in source control patterns; it contains no credentials.

## Evidence

| Boundary | Result | Limit |
| --- | --- | --- |
| Production build | 405 routes generated, compilation and types passed | Not a deployment |
| Sitemap HTML | 389 listed pages: HTTP 200, H1, canonical and unique IDs | No rendered browser layout |
| Internal links and images | 12,996 page/link/fragment combinations, one additional internal target and 200 local images checked, zero errors | External websites and computed styles excluded |
| Theme | Existing first-paint/storage sync and shared token contrast checks pass in both themes | Does not establish contrast for every rendered element |
| DACH and services | Existing 41-page DACH QA and 11 built service-route checks pass | Static/HTML checks |
| Client consent/actions | Existing VM/DOM harness passes opt-in, opt-out, expiry, PDF byte validation, correlation and partner clicks without collecting email content | Simulated DOM, not a real browser |
| HTTP API/storage/report | New isolated production-server integration passes consent rejection, persistent synthetic events, PDF byte length/signature/attachment, correlated requested/served/received and app/provider/partner reporting | Client receipt event is simulated after the HTTP bytes are read |
| Storage outage | API returns 503; PDF still returns complete bytes and HTTP 200 | Disposable local storage failure, not a production outage |
| Patch | `git diff --check` passes | No commit or push performed |

Commands:

```sh
npm run build
npm run test:growth
npm run test:funnel:http
node scripts/test-theme.cjs
python3 scripts/dach-static-qa.py
node scripts/test-services.cjs --built
# Start the existing production build before this read-only HTTP check:
npm run start -- -p 3032
npm run test:release
```

`test:funnel:http` starts and stops its own server on a free local port, removes external sink configuration for the child, and uses a temporary synthetic-data directory which it deletes. It does not write to the visitor analytics directory or send messages. `test:release` only makes GET requests and follows internal links from sitemap pages; Python 3.9's handling of Next's 308 redirects is explicitly supported.

## Outstanding

Browser screenshot, viewport, computed-style and actual interaction verification was unavailable in this environment. No desktop/mobile visual pass is claimed. The preview is available at http://localhost:3032/uk/partners.

Production publication and production persistent analytics remain blocked by hosting access. On 26 October the connected Vercel account exposed only the AI Insider team with 12 projects; Sweezy was not identified there. Its ambiguously named `website` project was checked and uses insiderai.it.com, so it was not changed. Render returned UNAUTHORIZED and requested reauthentication. No new hosting project, unrelated deployment, payment integration or external message was created.

The latest available GSC export in the project ends on 25 September. A current 10-page SEO sprint needs a new export or the relevant account connection; current traffic and revenue have not been inferred from old data.
