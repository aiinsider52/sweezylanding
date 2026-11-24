// Export approved generated frames; original PNGs remain unchanged.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
async function main() {
  const records = JSON.parse(fs.readFileSync(path.resolve(root, process.argv[2] || 'generated_images/shop/realism-images.json'), 'utf8'));
  const manifestPath = path.join(root, 'generated_images/shop/gallery-images.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const revision = process.argv[3] || '';
  if (revision && !/^[a-z0-9-]+$/.test(revision)) throw Error('Invalid photo revision directory');
  const destination = path.join(root, 'public/shop/products', revision);
  fs.mkdirSync(destination, { recursive: true });
  const seen = new Set();
  for (const record of records) {
    const key = `${record.slug}/${record.shot}`;
    if (seen.has(key) || !/^[a-z0-9-]+$/.test(record.slug) || !['studio', 'lifestyle', 'detail', 'model', 'angle', 'in-use', 'campaign'].includes(record.shot)) throw Error(`Invalid or duplicate frame: ${key}`);
    seen.add(key);
    if (!/^exec-[a-f0-9-]+\.png$/.test(record.filename)) throw Error(`Invalid generated source: ${record.filename}`);
    await sharp(path.join(root, 'generated_images', record.filename))
      .resize(1200, 1200, { fit: 'cover' }).webp({ quality: 80, effort: 6, smartSubsample: true })
      .toFile(path.join(destination, `${record.slug}-${record.shot}.webp`));
    manifest[key] = record.filename;
  }
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Exported ${records.length} additional product frames.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
