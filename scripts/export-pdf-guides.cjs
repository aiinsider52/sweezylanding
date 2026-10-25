// Shared content contract: informational prose, with no PDF task/form data.
const fs = require("node:fs"), path = require("node:path"), vm = require("node:vm"), ts = require("typescript");
const cache = new Map();
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file);
  const exports = {}; cache.set(file, exports);
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  vm.runInNewContext(code, { exports, require: name => load(path.resolve(path.dirname(file), name + ".ts")) });
  return exports;
}
const { DOWNLOADS, DOWNLOAD_IDS, downloadFilename } = load("data/downloads.ts");
const { countryData, countrySources, guideSources } = load("data/dach.ts");
const { kitSources } = load("data/first-week.ts");
const { getTravelKitPlaces } = load("data/travel-kit.ts");
const guides = require("../data/dach-guides.json"), editorial = require("../data/pdf-editorial.json");
const all = [];
for (const id of DOWNLOAD_IDS) for (const locale of ["uk", "en", "de"]) {
  const item = DOWNLOADS[id], country = item.country, business = id.startsWith("business"), topic = business ? "business" : "registration";
  const guide = country === "switzerland" ? null : guides[country][topic][locale];
  const sections = editorial[id]?.[locale] ?? guide?.sections.map(({ title, body }) => ({ title, body })) ?? [];
  if (id.startsWith("starter-")) sections.push(...guides[country].work[locale].sections.slice(0, 2).map(({ title, body }) => ({ title, body })));
  const places = id === "travel-kit" ? getTravelKitPlaces(locale) : undefined;
  const sources = id === "first-week" ? kitSources.map(({ name, href }) => ({ name, url: href })) : places ? places.map(place => ({ name: `${place.title} / ${place.source.name}`, url: place.source.url })) : guide ? guideSources[country][topic] : countrySources[country];
  const online = id === "travel-kit" ? `/${locale}/swiss-bucket-list` : id === "first-week" ? `/${locale}/starter-kit` : country === "switzerland" ? `/${locale}/countries/switzerland#business` : `/${locale}/countries/${country}/${topic}`;
  all.push({ id, locale, country, countryName: countryData[country].name[locale], title: item.title[locale], description: item.description[locale], summary: guide?.summary ?? sections[0]?.body ?? item.description[locale], filename: downloadFilename(id, locale), image: country === "switzerland" ? business ? "/editorial/posts/uk-biznes-u-shveytcariyi-dlya-ukrayintsiv.webp" : "/editorial/covers/registration.webp" : countryData[country].image, sections, faq: guide?.faq ?? [], sources, guide: `https://www.sweezy.world${online}`, ...(places ? { places } : {}) });
}
module.exports = all;
if (require.main === module) process.stdout.write(JSON.stringify(all));
