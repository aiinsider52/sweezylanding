const { readFileSync, existsSync } = require("node:fs");
const { resolve, dirname } = require("node:path");
const { runInNewContext } = require("node:vm");
const assert = require("node:assert/strict");
const ts = require("typescript");
const cache = new Map();
function load(file) {
  const filename = resolve(file);
  if (cache.has(filename)) return cache.get(filename);
  const exports = {};
  cache.set(filename, exports);
  const output = ts.transpileModule(readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  runInNewContext(output, { exports, require: (name) => load(resolve(dirname(filename), name + ".ts")) });
  return exports;
}
const { projectSwissCoordinates: project, swissMapViewBox: view, layoutSwissMapMarkers: layout, nearbyMapPlaces: nearby } = load("lib/swiss-map.ts");
const { travelDestinations: places } = load("data/travel-destinations.ts");
assert.equal(project({ latitude: 47.808, longitude: 5.956 }).x, 60);
assert.equal(project({ latitude: 47.808, longitude: 5.956 }).y, 50);
assert.equal(project({ latitude: 45.818, longitude: 10.492 }).x, 940);
assert.equal(project({ latitude: 45.818, longitude: 10.492 }).y, 530);
const candidates = [{ id: "north", coordinates: { latitude: 61, longitude: 0 } }, { id: "east", coordinates: { latitude: 60, longitude: 1 } }];
assert.equal(nearby({ latitude: 60, longitude: 0 }, candidates)[0].id, "east", "Longitude distance must account for latitude");
assert.equal(candidates[0].id, "north", "Sorting must not mutate source content");
assert.equal(nearby({ latitude: 47, longitude: 8 }, [], 3).length, 0);

for (const place of places) {
  const point = project(place.coordinates);
  const neighbours = nearby(place.coordinates, places.filter((item) => item.slug !== place.slug));
  assert.equal(neighbours.length, 3);
  assert.equal(new Set(neighbours.map((item) => item.slug)).size, 3);
  assert.ok(!neighbours.some((item) => item.slug === place.slug));
  for (const zoom of [1, 1.5, 2, 2.5, 3]) {
    const [x, y, width, height] = view(point, zoom).split(" ").map(Number);
    assert.ok(x >= 0 && y >= 0 && x + width <= 1000.00001 && y + height <= 580.00001);
    assert.ok(point.x >= x && point.x <= x + width && point.y >= y && point.y <= y + height, place.slug);
    assert.ok(Math.abs(width / height - 1000 / 580) < .00001, "Zoom must preserve the map aspect ratio");
    if (zoom === 1) assert.equal(view(point, zoom), "0 0 1000 580");
  }
  const markers = layout(point, neighbours.map((item) => project(item.coordinates)), 1);
  for (let i = 0; i < markers.length; i++) {
    const marker = markers[i];
    assert.ok(Math.hypot(marker.badge.x - point.x, marker.badge.y - point.y) >= 79.9, `${place.slug}: badge covers active destination`);
    for (let j = 0; j < i; j++) assert.ok(Math.hypot(marker.badge.x - markers[j].badge.x, marker.badge.y - markers[j].badge.y) >= 79.9, `${place.slug}: overlapping badges`);
  }
}
console.log(`Swiss map tests passed: ${places.length} places, projection, 5 zoom levels, current-point visibility, nearest places and label collisions.`);

if (process.argv.includes("--built")) {
  for (const locale of ["en", "uk", "de"]) for (const place of places) {
    const route = `/${locale}/places/${place.slug}`;
    const html = readFileSync(`.next/server/app${route}.html`, "utf8");
    const ids = Array.from(html.matchAll(/\sid="([^"]+)"/g), (match) => match[1]);
    assert.equal(ids.length, new Set(ids).size, `${route}: duplicate SVG or section IDs`);
    assert.ok(html.includes('viewBox="0 0 1000 580"'), `${route}: no initial map view`);
    assert.ok(html.includes('aria-controls="swiss-map-'), `${route}: missing accessible zoom controls`);
    assert.ok(html.includes(`https://www.google.com/maps/dir/?api=1&amp;destination=${place.coordinates.latitude},${place.coordinates.longitude}`));
    assert.ok(html.includes("https://www.openstreetmap.org/copyright"), `${route}: attribution missing`);
    const neighbours = nearby(place.coordinates, places.filter((item) => item.slug !== place.slug));
    for (const item of neighbours) {
      const path = `/${locale}/places/${item.slug}`;
      assert.ok(html.includes(`href="${path}"`));
      assert.ok(existsSync(`.next/server/app${path}.html`));
    }
  }
  console.log(`${places.length * 3} built place pages passed: SVG geometry, unique IDs, accessible controls, route destinations, attribution and nearby links.`);
}
