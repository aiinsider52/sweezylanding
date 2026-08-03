const siteUrl = (process.env.SITE_URL || "https://www.sweezy.world").replace(/\/$/, "");
const key = process.env.INDEXNOW_KEY?.trim();
const dryRun = process.argv.includes("--dry-run");
const suppliedUrls = process.argv.slice(2).filter((value) => !value.startsWith("--"));

if (!key && !dryRun) {
  console.error("INDEXNOW_KEY is required. Generate a key, configure it in deployment, then retry.");
  process.exit(1);
}

async function sitemapUrls() {
  const response = await fetch(`${siteUrl}/sitemap.xml`);
  if (!response.ok) throw new Error(`Sitemap returned HTTP ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

const urls = suppliedUrls.length
  ? suppliedUrls.map((value) => new URL(value, siteUrl).toString())
  : await sitemapUrls();

const uniqueUrls = [...new Set(urls)].filter((url) => url.startsWith(`${siteUrl}/`)).slice(0, 10_000);
const payload = {
  host: new URL(siteUrl).host,
  key: key || "dry-run-key",
  keyLocation: `${siteUrl}/indexnow-key.txt`,
  urlList: uniqueUrls,
};

if (dryRun) {
  console.log(JSON.stringify({ endpoint: "https://api.indexnow.org/indexnow", ...payload }, null, 2));
  process.exit(0);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});

if (!response.ok && response.status !== 202) {
  console.error(`IndexNow submission failed with HTTP ${response.status}: ${await response.text()}`);
  process.exit(1);
}

console.log(`IndexNow accepted ${uniqueUrls.length} URL(s) with HTTP ${response.status}.`);
