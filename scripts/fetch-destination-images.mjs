import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const output = path.join(root, "public", "destinations");
const creditFile = path.join(root, "data", "destination-image-credits.json");

const places = {
  "staubbach-falls": "Staubbach Falls Lauterbrunnen Switzerland",
  "trummelbach-falls": "Trummelbach Falls Switzerland",
  "giessbach-falls": "Giessbach Falls Switzerland",
  "seerenbach-falls": "Seerenbach Falls Switzerland",
  "saut-du-doubs": "Saut du Doubs Switzerland waterfall",
  "rosenlaui-gorge": "Rosenlaui glacier gorge Switzerland",
  "aare-gorge": "Aare Gorge Switzerland",
  "viamala-gorge": "Viamala Gorge Switzerland",
  "tamina-gorge": "Tamina Gorge Switzerland",
  blausee: "Blausee Kandersteg Switzerland",
  bachalpsee: "Bachalpsee Grindelwald Switzerland",
  caumasee: "Caumasee Flims Switzerland",
  bannalpsee: "Bannalpsee Switzerland",
  "st-leonard-underground-lake": "Saint Leonard underground lake Switzerland",
  "st-beatus-caves": "St Beatus Caves Switzerland",
  "vallorbe-caves": "Vallorbe caves Switzerland",
  "hollgrotten-baar": "Hollgrotten Baar Switzerland caves",
  "col-des-roches-mills": "Col des Roches cave mills Switzerland",
  "brissago-islands": "Brissago Islands Switzerland",
  "st-peters-island": "St Peters Island Lake Biel Switzerland",
  "weisstannen-valley": "Wanderung durch das Weisstannental",
  "val-calnegia": "Val Calneggia",
  "val-frisal": "Val Frisal Breil Brigels",
  "geneva-botanical-garden": "Conservatory Botanical Garden Geneva Switzerland",
};

const clean = (value = "") => value.replace(/<[^>]+>/g, "").replace(/&[^;]+;/g, " ").trim();
const credits = JSON.parse(await fs.readFile(creditFile, "utf8").catch(() => "{}"));
await fs.mkdir(output, { recursive: true });
const startAt = process.env.START_AT;
let started = !startAt;

async function fetchWithRetry(url, attempts = 5) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const response = await fetch(url, { headers: { "User-Agent": "SweezyTravelGuide/1.0 support@sweezy.world" } });
    if (response.ok || response.status !== 429) return response;
    await new Promise((resolve) => setTimeout(resolve, 1800 * (attempt + 1)));
  }
  return fetch(url, { headers: { "User-Agent": "SweezyTravelGuide/1.0 support@sweezy.world" } });
}

for (const [slug, query] of Object.entries(places)) {
  if (!started && slug === startAt) started = true;
  if (!started) continue;
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    generator: "search",
    gsrnamespace: "6",
    gsrlimit: "12",
    gsrsearch: query,
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "1800",
  });
  const response = await fetchWithRetry(`https://commons.wikimedia.org/w/api.php?${params}`);
  if (!response.ok) throw new Error(`${slug}: Wikimedia ${response.status}`);
  const payload = await response.json();
  const candidates = Object.values(payload.query?.pages || {}).filter((page) => {
    const info = page.imageinfo?.[0];
    const width = info?.thumbwidth || info?.width || 0;
    const height = info?.thumbheight || info?.height || 0;
    return info?.thumburl && width >= 900 && height >= 550;
  }).slice(0, 3);
  if (candidates.length < 3) throw new Error(`${slug}: only ${candidates.length} usable images`);

  credits[slug] = [];
  for (const [index, page] of candidates.entries()) {
    const info = page.imageinfo[0];
    const suffix = index === 0 ? "" : `-${index + 1}`;
    const file = path.join(output, `swiss-discovery-${slug}${suffix}.webp`);
    const imageResponse = await fetchWithRetry(info.thumburl);
    if (!imageResponse.ok) throw new Error(`${slug}: image ${imageResponse.status}`);
    await sharp(Buffer.from(await imageResponse.arrayBuffer())).rotate().resize(1600, 1200, { fit: "cover", position: "attention" }).webp({ quality: 80 }).toFile(file);
    const meta = info.extmetadata || {};
    credits[slug].push({
      title: page.title.replace(/^File:/, ""),
      pageUrl: info.descriptionurl,
      creator: clean(meta.Artist?.value) || "Wikimedia Commons contributor",
      license: clean(meta.LicenseShortName?.value) || "See source",
      licenseUrl: meta.LicenseUrl?.value || info.descriptionurl,
    });
  }
  await fs.writeFile(creditFile, `${JSON.stringify(credits, null, 2)}\n`);
  process.stdout.write(`✓ ${slug}\n`);
}

await fs.writeFile(creditFile, `${JSON.stringify(credits, null, 2)}\n`);
