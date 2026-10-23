const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { createHash } = require("node:crypto");
const { runInNewContext } = require("node:vm");
const ts = require("typescript");
const sharp = require("sharp");
const images = require("../data/blog-images.json");

function loadHelper(file, resolve) {
  const output = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  const result = {};
  runInNewContext(output, { exports: result, require: resolve, process });
  return result;
}

const blog = loadHelper("lib/blog.ts", require);
const editorial = loadHelper("lib/editorial.ts", (name) => {
  assert.equal(name, "../data/blog-images.json");
  return images;
});

(async () => {
  const posts = await blog.getAllBlogParams();
  assert.deepEqual(Object.keys(images).sort(), Array.from(posts, (p) => `${p.locale}/${p.slug}`).sort(), "Every published post needs exactly one registered cover");
  const urls = new Set();
  const pixelHashes = new Set();
  const altTexts = new Set();
  for (const { locale, slug } of posts) {
    const key = `${locale}/${slug}`;
    const image = images[key];
    assert.equal(image.src, `/editorial/posts/${locale}-${slug}.webp`);
    assert(!urls.has(image.src), `Repeated cover URL: ${key}`);
    urls.add(image.src);
    assert(image.alt.length >= 30 && image.alt.length <= 180, `Descriptive concise alt required: ${key}`);
    assert(!altTexts.has(image.alt), `Repeated alt text: ${key}`);
    altTexts.add(image.alt);
    assert.equal(/[а-яіїєґ]/i.test(image.alt), locale === "uk", `Alt language: ${key}`);
    assert.equal(editorial.getPostImage(locale, slug), image.src);
    assert.equal(editorial.getPostImageAlt(locale, "SEO title must not become alt", slug), image.alt);
    const file = path.join("public", image.src);
    const metadata = await sharp(file).metadata();
    assert.equal(metadata.width, image.width, `Width: ${key}`);
    assert.equal(metadata.height, image.height, `Height: ${key}`);
    assert.equal(metadata.format, "webp");
    assert(fs.statSync(file).size < 500000, `Cover exceeds 500 KB: ${key}`);
    // Compare decoded pixels too, so renaming or re-encoding a duplicate cannot pass.
    const pixels = await sharp(file).resize(96, 64).removeAlpha().raw().toBuffer();
    const hash = createHash("sha256").update(pixels).digest("hex");
    assert(!pixelHashes.has(hash), `Repeated image content: ${key}`);
    pixelHashes.add(hash);
    const social = await sharp(path.join("public", editorial.getPostSocialImage(locale, slug))).metadata();
    assert.equal(social.format, "jpeg");
    assert.equal(social.width, 1200);
    assert.equal(social.height, 630);
  }
  assert.throws(() => editorial.getPostImage("en", "unregistered-post"), /Missing unique blog cover/);
  console.log(`Blog image checks passed: ${posts.length} published posts, unique decoded images, localized alt text, cover dimensions and social JPEGs.`);
})().catch((error) => { console.error(error); process.exitCode = 1; });
