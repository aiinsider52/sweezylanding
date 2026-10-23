const { readFileSync } = require("node:fs");
const { resolve, dirname } = require("node:path");
const { runInNewContext } = require("node:vm");
const ts = require("typescript");
const cache = new Map();
function load(file) {
  const path = resolve(file);
  if (cache.has(path)) return cache.get(path);
  const exports = {};
  cache.set(path, exports);
  const output = ts.transpileModule(readFileSync(path, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  runInNewContext(output, { exports, require: (name) => load(resolve(dirname(path), name + ".ts")) });
  return exports;
}
const { getTravelKitPlaces, travelKitCopy } = load("data/travel-kit.ts");
process.stdout.write(JSON.stringify(Object.fromEntries(["uk", "en", "de"].map((locale) => [locale, { copy: travelKitCopy[locale], places: getTravelKitPlaces(locale) }]))));
