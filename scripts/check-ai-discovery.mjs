// Read-only checks with synthetic user agents. These cannot verify a crawler IP
// or establish that an AI product has indexed or cited the site.
const argument = process.argv.find((arg) => arg.startsWith("--base="));
const base = (argument?.slice(7) || "https://www.sweezy.world").replace(/\/$/, "");
const origin = "https://www.sweezy.world";
const routes = ["/uk/services", "/uk/services/classic-car-die-garage", "/uk/blog/ukrayinski-posluhy-shveytcariya", "/uk/blog/ukrayinskyy-avtoservis-thurgau"];
const agents = ["OAI-SearchBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Googlebot", "bingbot"];
const failures = [];
async function read(path, userAgent = "Sweezy-Discovery-QA/1.0") {
  const response = await fetch(base + path, { headers: { "user-agent": userAgent }, signal: AbortSignal.timeout(20000) });
  const body = await response.text();
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  if (/noindex|nosnippet/i.test(response.headers.get("x-robots-tag") || "")) throw new Error(`${path}: restrictive X-Robots-Tag`);
  return body;
}
for (const agent of agents) {
  try {
    const html = await read(routes[0], agent);
    if (!html.includes("Українські послуги") || !html.includes('rel="canonical"')) throw new Error("Missing content or canonical");
    console.log(`PASS synthetic ${agent}: directory HTML accessible`);
  } catch (error) { failures.push(`${agent}: ${error.message}`); }
}
try {
  const sitemap = await read("/sitemap.xml");
  const robots = await read("/robots.txt");
  for (const token of ["OAI-SearchBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Googlebot", "bingbot"]) {
    if (!robots.includes(`User-Agent: ${token}`) && !robots.includes(`User-agent: ${token}`)) throw new Error(`Missing explicit robot rule: ${token}`);
  }
  const llms = await read("/llms.txt");
  for (const path of routes) {
    const html = await read(path);
    if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1) throw new Error(`${path}: expected one H1`);
    if (!html.includes(`rel="canonical" href="${origin}${path}"`)) throw new Error(`${path}: wrong canonical`);
    if (!html.includes('type="application/ld+json"')) throw new Error(`${path}: missing structured data`);
    if (!sitemap.includes(origin + path)) throw new Error(`${path}: missing from sitemap`);
    if (!llms.includes(origin + path)) throw new Error(`${path}: missing from discovery index`);
    console.log(`PASS ${path}: H1, canonical, schema and discovery links`);
  }
} catch (error) { failures.push(error.message); }
for (const message of failures) console.error(`FAIL ${message}`);
if (failures.length) process.exitCode = 1;
else console.log("Discovery access checks passed. Real indexing, citations and provider-side firewall access remain separate checks.");
