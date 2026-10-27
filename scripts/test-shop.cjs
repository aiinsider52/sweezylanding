// Exercises persistence, damaged storage, enquiry drafts and gallery behaviour.
// Runs without a browser; does not assert layout or visual appearance.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const cache = new Map(), listeners = new Map(), storage = new Map();
let state = [], cursor = 0, effects = [], mounted = false, blocked = false;
class CustomEvent { constructor(type, options) { this.type = type; this.detail = options.detail; } }
const react = {
  useState(initial) { const index = cursor++; if (!(index in state)) state[index] = initial; return [state[index], next => { state[index] = typeof next === 'function' ? next(state[index]) : next; }]; },
  useEffect(fn) { if (!mounted) effects.push(fn); },
};
const window = {
  addEventListener(type, fn) { if (!listeners.has(type)) listeners.set(type, new Set()); listeners.get(type).add(fn); },
  removeEventListener(type, fn) { listeners.get(type)?.delete(fn); },
  dispatchEvent(event) { listeners.get(event.type)?.forEach(fn => fn(event)); },
};
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file);
  const exports = {}; cache.set(file, exports);
  const output = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  vm.runInNewContext(output, { exports, URL, Set, CustomEvent, window, localStorage: {
    getItem(key) { if (blocked) throw Error('denied'); return storage.get(key) ?? null; },
    setItem(key, value) { if (blocked) throw Error('denied'); storage.set(key, value); },
  }, require(name) {
    if (name === 'react') return react;
    if (name === 'react/jsx-runtime') return { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
    if (name === 'next/image') return { __esModule: true, default: 'Image' };
    if (name === 'next/link') return { __esModule: true, default: 'Link' };
    if (name.endsWith('.css')) return { __esModule: true, default: {} };
    if (!name.startsWith('.')) return require(name);
    const candidate = path.resolve(path.dirname(file), name);
    return load(candidate + (fs.existsSync(candidate + '.ts') ? '.ts' : '.tsx'));
  } });
  return exports;
}
const data = load('data/shop.ts');
const hook = load('app/components/shop/useShopSelection.ts');
const renderHook = () => { cursor = 0; return hook.useShopSelection(); };
const plain = value => JSON.parse(JSON.stringify(value));
const key = 'sweezy-shop-selection-v1';
assert.equal(data.SHOP_PRODUCTS.length, 9);
assert.equal(new Set(data.SHOP_PRODUCTS.map(p => p.goodsId)).size, 9);
const slug = data.SHOP_PRODUCTS[0].slug;
assert.deepEqual(plain(hook.parseShopSelection('{bad json')), []);
assert.deepEqual(plain(hook.parseShopSelection(JSON.stringify({ version: 9, items: [slug] }))), []);
assert.deepEqual(plain(hook.parseShopSelection(JSON.stringify({ version: 1, items: [slug, slug, 'unknown-product', 42] }))), [slug]);
let result = renderHook();
assert.equal(result.ready, false);
result.toggle(slug); assert.equal(storage.size, 0, 'Do not overwrite saved items before hydration');
effects.forEach(fn => fn()); mounted = true;
result = renderHook(); assert.equal(result.ready, true);
result.toggle(slug); result = renderHook();
assert.deepEqual(plain(result.selected), [slug]);
assert.deepEqual(JSON.parse(storage.get(key)), { version: 1, items: [slug] });
result.toggle(slug); result = renderHook(); assert.deepEqual(plain(result.selected), []);
storage.set(key, JSON.stringify({ version: 1, items: [slug] }));
window.dispatchEvent({ type: 'storage', key }); result = renderHook();
assert.deepEqual(plain(result.selected), [slug], 'Synchronize other tabs');
storage.clear(); window.dispatchEvent({ type: 'storage', key: null }); result = renderHook();
assert.deepEqual(plain(result.selected), [], 'Cleared browser storage clears selection');
blocked = true; result.toggle(slug); result = renderHook();
assert.deepEqual(plain(result.selected), [slug], 'Keep current-page selection when storage is blocked');
assert.equal(result.storageUnavailable, true);
result.clear(); result = renderHook(); assert.deepEqual(plain(result.selected), []);

for (const locale of ['uk', 'en', 'de']) {
  const products = data.SHOP_PRODUCTS.slice(0, 3);
  const draft = new URL(data.shopInquiryHref(products, locale));
  assert.equal(draft.protocol, 'mailto:'); assert.equal(draft.pathname, 'support@sweezy.world');
  const body = draft.searchParams.get('body');
  for (const product of products) {
    assert(body.includes(product.copy[locale].name));
    assert(body.includes(product.goodsId));
    assert(body.includes(`/${locale}/shop/${product.slug}`));
  }
  for (const product of data.SHOP_PRODUCTS) {
    assert(product.copy[locale].name && product.copy[locale].description && product.copy[locale].alt);
    assert(data.productImageAlt(product, locale, true).length <= 240);
    assert(fs.existsSync('public' + data.originalProductImage(product)));
    if (product.styledImage) assert(fs.existsSync('public' + data.styledProductImage(product)));
  }
}
assert(data.SHOP_PRODUCTS.filter(p => ['interlaken-decor', 'zurich-decor'].includes(p.slug)).every(p => p.flatPrint && !p.styledImage), 'Keep flat-print listing photos instead of misleading relief renders');

const gallery = load('app/components/shop/ProductGallery.tsx');
function nodes(node) { if (!node || typeof node !== 'object') return []; return [node, ...[node.props?.children].flat(Infinity).flatMap(nodes)]; }
for (const product of data.SHOP_PRODUCTS) {
  state = []; cursor = 0;
  let tree = gallery.ProductGallery({ product, locale: 'uk' });
  let all = nodes(tree);
  assert.equal(all.find(n => n.type === 'Image').props.src, data.originalProductImage(product), 'Original photo is displayed first');
  const buttons = all.filter(n => n.type === 'button');
  assert.equal(buttons.length, product.styledImage ? 2 : 0);
  if (product.styledImage) {
    buttons[1].props.onClick(); cursor = 0;
    tree = gallery.ProductGallery({ product, locale: 'uk' }); all = nodes(tree);
    assert.equal(all.find(n => n.type === 'Image').props.src, data.styledProductImage(product));
    assert(all.find(n => n.type === 'Image').props.alt.includes('ШІ'));
    all.find(n => n.type === 'button').props.onClick(); cursor = 0;
    assert.equal(nodes(gallery.ProductGallery({ product, locale: 'uk' })).find(n => n.type === 'Image').props.src, data.originalProductImage(product));
  }
}
const catalog = load('app/components/shop/ShopCatalog.tsx');
for (const locale of ['uk', 'en', 'de']) {
  state = []; cursor = 0; effects = []; mounted = false; blocked = false; storage.clear(); listeners.clear();
  const render = () => { cursor = 0; return nodes(catalog.ShopCatalog({ locale })); };
  let all = render(); effects.forEach(fn => fn()); mounted = true; all = render();
  assert.equal(all.filter(n => n.type === 'article').length, 9);
  const categories = all.filter(n => n.type === 'button' && n.props['aria-pressed'] !== undefined && !n.props['aria-label']);
  categories[1].props.onClick(); all = render();
  assert.equal(all.filter(n => n.type === 'article').length, 2, 'Bag filter returns two actual products');
  all.find(n => n.type === 'input').props.onChange({ target: { value: 'NO_MATCH_123' } }); all = render();
  assert.equal(all.filter(n => n.type === 'article').length, 0, 'Search respects the active category');
  all.find(n => n.type === 'input').props.onChange({ target: { value: '' } }); all = render();
  all.find(n => n.type === 'button' && n.props['aria-label'] && n.props['aria-pressed'] === false).props.onClick(); all = render();
  const draft = all.find(n => n.type === 'a' && n.props.href?.startsWith('mailto:'));
  assert(draft && decodeURIComponent(draft.props.href).includes(slug));
  assert.equal(all.filter(n => n.type === 'article').length, 2, 'Saving a product preserves the filter');
}
console.log('Shop checks passed: 9 source products, 3 languages, storage failures, selection sync, enquiry drafts and 9 galleries.');
