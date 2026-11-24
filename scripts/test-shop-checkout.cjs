// Checks checkout gating, cart normalisation and the Stripe Checkout form body.
// No network: the Stripe request itself is not exercised here.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const cache = new Map();
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file);
  const exports = {}; cache.set(file, exports);
  const output = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  vm.runInNewContext(output, { exports, URL, URLSearchParams, Intl, Set, Map, Number, process: { env: {} }, require(name) {
    const base = path.resolve(path.dirname(file), name);
    for (const candidate of [`${base}.ts`, `${base}.tsx`, path.join(base, 'index.ts')]) if (fs.existsSync(candidate)) return load(candidate);
    return require(name);
  } });
  return exports;
}
const co = load('lib/shop-checkout.ts');

// Gating: both a Stripe key and a shipping price are required.
assert.equal(co.checkoutConfig({}).enabled, false);
assert.equal(co.checkoutConfig({ STRIPE_SECRET_KEY: 'sk_test_x' }).enabled, false);
assert.equal(co.checkoutConfig({ SHOP_SHIPPING_CHF: '7.90' }).enabled, false);
const cfg = co.checkoutConfig({ STRIPE_SECRET_KEY: 'sk_test_x', SHOP_SHIPPING_CHF: '7.90', SHOP_SHIP_COUNTRIES: 'ch, li, xx1, de' });
assert.equal(cfg.enabled, true);
assert.equal(cfg.shippingRappen, 790);
assert.deepEqual([...cfg.countries], ['CH', 'LI', 'DE']);
assert.equal(co.checkoutConfig({ STRIPE_SECRET_KEY: 'k', SHOP_SHIPPING_CHF: '0' }).enabled, true, 'free shipping is an explicit owner choice');
assert.equal(co.checkoutConfig({ STRIPE_SECRET_KEY: 'k', SHOP_SHIPPING_CHF: '-1' }).enabled, false);

// Cart: unknown, unpriced and malformed lines vanish; duplicates merge; quantities cap.
assert.equal(co.normaliseCart(null).length, 0);
const lines = co.normaliseCart([
  { slug: 'switzerland-tote', qty: 2 }, { slug: 'switzerland-tote', qty: 3 },
  { slug: 'switzerland-cap', qty: 99 }, { slug: 'swiss-peaks-white-hoodie', qty: 1 },
  { slug: 'nope', qty: 1 }, { slug: 'switzerland-calling-mug', qty: 0 }, { slug: 'interlaken-decor', qty: 1.5 }, 'x',
]);
assert.deepEqual(JSON.parse(JSON.stringify(lines.map(l => [l.slug, l.qty]))), [['switzerland-tote', 5], ['switzerland-cap', 10], ['interlaken-decor', 1]]);

// Stripe form body: CHF rappen amounts, absolute image URLs, shipping and return URLs.
const body = co.checkoutSessionParams(lines, 'de', cfg);
assert.equal(body.get('mode'), 'payment');
assert.equal(body.get('line_items[0][price_data][currency]'), 'chf');
assert.equal(body.get('line_items[0][price_data][unit_amount]'), '1190');
assert.equal(body.get('line_items[0][quantity]'), '5');
assert.equal(body.get('line_items[2][price_data][unit_amount]'), '490');
assert.match(body.get('line_items[0][price_data][product_data][images][0]'), /^https:\/\/www\.sweezy\.world\/shop\/products\//);
assert.equal(body.get('line_items[0][price_data][product_data][metadata][sku]'), 'SW-001');
assert.equal(body.get('shipping_options[0][shipping_rate_data][fixed_amount][amount]'), '790');
assert.equal(body.get('shipping_address_collection[allowed_countries][2]'), 'DE');
assert.equal(body.get('success_url'), 'https://www.sweezy.world/de/shop/thanks?session_id={CHECKOUT_SESSION_ID}');
assert.equal(body.get('locale'), 'de');
assert.equal(co.checkoutSessionParams(lines, 'uk', cfg).get('locale'), 'auto');
console.log('shop checkout: all assertions passed');
