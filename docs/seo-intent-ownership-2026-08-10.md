# Sweezy search intent ownership

One query family has one canonical owner. Supporting pages answer narrower questions and link back to owner. Old overlapping URLs redirect permanently and stay out of sitemap.

| Cluster | Canonical owner | Supporting layer | Current control |
| --- | --- | --- | --- |
| Ukrainian Status S | `/uk/blog/status-s-shveytcariya-povnyy-gid` | extension, work, insurance, appeal, canton differences | `/uk/blog/status-s-shveytcariya-2026` redirects to owner |
| Ukrainian work | `/uk/blog/poshuk-roboty-shveytcariya-2026` | Status S work article, Jobs inventory | `/uk/blog/poshuk-roboty-u-shveytcariyi` redirects; Jobs links owner directly |
| Ukrainian insurance | `/uk/blog/medychne-strakhuvannya-shveytcariya` | Status S insurance, saving guide | broad intent assigned to owner |
| English Swiss tax return | `/en/blog/swiss-tax-return-2026` | tax-system explainer | filing intent stays on return page |
| English Zurich relocation | `/en/guides/zurich` | moving and registration articles | `/en/blog/moving-to-zurich-guide` permanently redirects; excluded from post lists and sitemap |
| Ukrainian address registration | `/uk/blog/yak-zareyestruvatysya-v-shveytcariyi` | local canton offices; separate SEM protection procedure | linked from homepage route and Status S, work and insurance owners |
| Ukrainian Sweezy community | `/uk/community` | Telegram and Facebook groups | final step of Ukrainian route; metadata held during observation window |
| Places | `/{locale}/places` | category, region and destination hubs | indexable hierarchy added |

Review rule: inspect GSC every 14 days. If two URLs rank for same query family, compare usefulness, backlinks and conversions; consolidate weaker URL instead of publishing third page.
