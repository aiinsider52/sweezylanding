const { existsSync, readFileSync } = require("node:fs");
const { runInNewContext } = require("node:vm");
const assert = require("node:assert/strict");
const ts = require("typescript");

const exportsObject = {};
runInNewContext(ts.transpileModule(readFileSync("data/ukrainian-services.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, { exports: exportsObject });
const { ukrainianServices: services, getUkrainianService: get, filterServices: filter, serviceDirections: directions, serviceSchema: schema, servicePreview: preview } = exportsObject;
const plain = (value) => JSON.parse(JSON.stringify(value));

assert.equal(new Set(services.map((service) => service.slug)).size, services.length);
assert.equal(filter(services, "", "").length, services.length);
assert.deepEqual(Array.from(filter(services, "Фотографія", "Цюрих"), (service) => service.slug), ["jane-gromova-photography", "m-fotografie"]);
assert.equal(filter(services, "Переклади", "Тургау").length, 0);
assert.equal(filter(services, "", "Тургау").length, 2);
assert.equal(filter(services.map(preview), "Переклади", "")[0].slug, "invatrans-st-gallen");
assert.equal(get("missing-provider"), undefined);

for (const slug of ["jane-gromova-photography", "m-fotografie"]) {
  assert.equal(directions(get(slug)), null, "A service area must not become a fake studio address");
  assert.equal("address" in schema(get(slug)), false);
  assert.equal("openingHoursSpecification" in schema(get(slug)), false);
  assert.equal(get(slug).connection, "origin", "Ukrainian origin is not a confirmed service language");
}
const school = schema(get("mrija-school-zurich"));
assert.equal(school["@type"], "School");
assert.equal("telephone" in school, false, "Do not emit a missing contact as an empty or invented phone");
assert.equal(school.address.streetAddress, "Aegertenstrasse 29");
assert.equal(school.address.addressLocality, "Zürich");
const translator = schema(get("invatrans-st-gallen"));
assert.equal(translator["@type"], "ProfessionalService");
assert.equal(translator.address.addressLocality, "St. Gallen");
assert.equal("openingHoursSpecification" in translator, false, "24/7 reachability is not a confirmed office timetable");
const clinic = schema(get("physiozentrum-frauenfeld"));
assert.equal(clinic["@type"], "MedicalClinic");
assert.equal("email" in clinic, false);
assert.equal(clinic.openingHoursSpecification.find((entry) => entry.dayOfWeek.includes("Friday")).closes, "18:30");
assert.equal(schema(get("genki-beauty-zurich"))["@type"], "BeautySalon");
assert.equal(schema(get("classic-car-die-garage"))["@type"], "AutoRepair");
assert.equal(schema(get("classic-car-die-garage")).telephone, "+41712786060");

for (const service of services) {
  const structured = plain(schema(service));
  assert.equal(structured.name, service.name);
  assert.ok(service.sources.length && service.inquiryChecklist.length);
  assert.match(service.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(service.phone || service.email);
  if (service.phone) {
    assert.match(service.phone, /^\+41\d{9}$/);
    assert.ok(service.phoneDisplay);
  }
  assert.equal("aggregateRating" in structured, false);
  assert.equal("priceRange" in structured, false);
  assert.equal("sources" in preview(service), false, "Client filtering needs only card fields");
}
console.log(`Services tests passed: ${services.length} providers, combined filters, empty/reset selection, optional contacts, regional photographers, individual schemas and hours.`);

if (process.argv.includes("--built")) {
  const decode = (value) => value.replace(/&(?:amp|quot|#x27|#39|lt|gt);/g, (entity) => ({ "&amp;": "&", "&quot;": '"', "&#x27;": "'", "&#39;": "'", "&lt;": "<", "&gt;": ">" }[entity]));
  const normalize = (value) => decode(value).replace(/\s+/g, " ").trim();
  const routes = ["/uk/services", ...services.map((service) => `/uk/services/${service.slug}`), "/uk/blog/ukrayinski-posluhy-shveytcariya", "/uk/blog/ukrayinski-posluhy-zurich", "/uk/blog/ukrayinskyy-avtoservis-thurgau"];
  for (const route of routes) {
    const html = readFileSync(`.next/server/app${route}.html`, "utf8");
    const visible = normalize(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>|<!--.*?-->/g, "").replace(/<[^>]*>/g, " "));
    const schemas = Array.from(html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g), (match) => JSON.parse(match[1]));
    const links = Array.from(html.matchAll(/<a\b[^>]*href="([^"]*)"/g), (match) => decode(match[1]));
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, route);
    assert.ok(html.includes(`rel="canonical" href="https://www.sweezy.world${route}"`), route);
    assert.ok(!html.includes('href="tel:undefined"') && !html.includes('href="mailto:undefined"'));
    assert.ok(!/hrefLang="(?:en|de)" href="https:\/\/www\.sweezy\.world\/(?:en|de)\/services/.test(html));
    const ids = Array.from(html.matchAll(/\sid="([^"]+)"/g), (match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, `${route}: duplicate IDs`);
    for (const faq of schemas.filter((entry) => entry["@type"] === "FAQPage")) {
      for (const item of faq.mainEntity) {
        assert.ok(visible.includes(normalize(item.name)), `${route}: FAQ question not visible`);
        assert.ok(visible.includes(normalize(item.acceptedAnswer.text)), `${route}: FAQ answer not visible`);
      }
    }
    for (const link of links.filter((href) => /^\/uk\/(?:services|blog)(?:\/|$)/.test(href))) {
      assert.ok(existsSync(`.next/server/app${link.split(/[?#]/)[0]}.html`), `${route}: broken internal link ${link}`);
    }
    const service = services.find((entry) => route === `/uk/services/${entry.slug}`);
    if (service) {
      assert.deepEqual(schemas.find((entry) => entry["@id"]?.endsWith("#business")), plain(schema(service)), `${route}: emitted schema differs from provider data`);
      assert.ok(visible.includes(service.checkedAt.split("-").reverse().join(".")));
      assert.ok(visible.includes(normalize(service.ukrainianConnection)));
      assert.ok(links.includes(service.website));
      if (service.phone) assert.ok(links.includes(`tel:${service.phone}`));
      if (service.email) assert.ok(links.includes(`mailto:${service.email}`));
      if (directions(service)) assert.ok(links.includes(directions(service)));
      else assert.ok(!links.some((href) => href.startsWith("https://www.google.com/maps/search/")), `${route}: map invented for an area-only provider`);
    }
    if (route === "/uk/services") {
      assert.ok(html.includes('id="service-category"') && html.includes('id="service-canton"'));
      for (const service of services) assert.ok(links.includes(`/uk/services/${service.slug}`), "All cards must be available before hydration");
    }
    console.log(`PASS built ${route}`);
  }
  console.log(`${routes.length} built service routes passed: visible FAQ, provider schema, canonical, contacts, dates, internal links and SSR cards. Browser interactions remain a separate check.`);
}
