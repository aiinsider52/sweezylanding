# Editorial layout and creator profile

The author page previously contained only a generic Sweezy Team description. It now includes a named creator card for Vladyslav Katash, an explanation of the collective editorial byline, the research process, correction contact and expertise boundaries in Ukrainian, English and German. The monogram is a graphic identity element, not a claimed photograph. No additional people or credentials were invented. Person and Organization structured data match visible content.

The blog index, article pages and canton guides now use fluid page widths with modest responsive gutters. Their former desktop caps were 1380, 1240 and 1120 pixels respectively. Larger covers and display headings use the existing design tokens. The journal leads with the illustrated featured story, followed by shortcuts and the article grid. Country links lead to real DACH hubs. Wide screens use four article columns; smaller desktop/tablet screens use three/two and phones one.

Canton guides pair their main content with a navigation/resources sidebar, which moves above the content on smaller screens. Article content occupies the available grid space while individual paragraphs retain a readable measure. Existing unique cover images, localized alt text, canonicals, sources and editorial dates remain intact.

Validation: TypeScript, production build (402 generated pages), 41 DACH/resource/service/city route checks, 14 existing SEO route checks, service directory regressions, theme contrast/bootstrap checks, 43 unique blog image checks, analytics lifecycle tests and all 21 PDF checks passed. Nine localized blog/team/Zurich pages passed heading, canonical, anchor, schema and semantic image checks. Decorative companion images correctly retain empty alt text and aria-hidden.

Browser layout/interaction testing is unavailable in this sandbox. Source and static/HTTP verification are not described as browser screenshots or visual QA. Superdesign login was rejected by automatic approval review because it creates an external authenticated session; implementation continued directly in the existing checkout without that login.

Production deployment is pending hosting access, as recorded in `pdf-and-city-release-2026-10-23.md`. The local preview runs on port 3032.

HTTP verification: 18 localized pages, all 21 PDF attachments and all 21 cover previews returned successfully. Download bytes match the generated files and Content-Length; four invalid asset/city routes returned 404. Three representative optimized country/canton images returned 200 at the configured 1200-pixel width. These requests used no analytics consent/session headers and did not create synthetic funnel events.
