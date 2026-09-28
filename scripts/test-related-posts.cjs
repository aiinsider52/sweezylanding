const { readFileSync } = require("node:fs");
const { runInNewContext } = require("node:vm");
const assert = require("node:assert/strict");
const ts = require("typescript");

// Compile the pure editorial helper without loading Next.js or the MDX pipeline.
const output = ts.transpileModule(readFileSync("lib/editorial.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const exportsObject = {};
runInNewContext(output, { exports: exportsObject });
const select = exportsObject.selectRelatedPosts;
const post = (slug, relatedPosts = [], locale = "en") => ({ slug, locale, frontmatter: { relatedPosts } });
const slugs = (current, candidates) => Array.from(select(current, candidates), (item) => item.slug);
const tax = post("swiss-tax-return-2026");
const overview = post("swiss-tax-system-expats");
const jobs = post("find-a-job");
const pension = post("ahv-pension");
const bank = post("bank-account");

assert.deepEqual(slugs(tax, [jobs, tax, overview, pension, bank]), [overview.slug, pension.slug, jobs.slug]);
assert.deepEqual(slugs(post(tax.slug, [bank.slug, bank.slug, tax.slug, "missing"]), [jobs, tax, overview, bank]), [bank.slug, overview.slug, jobs.slug]);
assert.deepEqual(slugs(tax, [tax, overview, overview, post("steuer", [], "de")]), [overview.slug]);
assert.deepEqual(slugs(tax, []), []);
assert.deepEqual(slugs(post("unclassified"), [jobs, post("another-unclassified"), bank]), [jobs.slug, "another-unclassified", bank.slug]);
console.log("Related-post tests passed: topic, editorial priority, duplicates, self, locale, fallback.");
