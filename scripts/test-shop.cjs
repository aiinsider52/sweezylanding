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
  useRef(initial) { const index = cursor++; if (!(index in state)) state[index] = { current: initial }; return state[index]; },
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
assert.equal(data.SHOP_PRODUCTS.length, 28);
assert.equal(new Set(data.SHOP_PRODUCTS.map(p => p.sku)).size, data.SHOP_PRODUCTS.length);
assert(data.SHOP_PRODUCTS.every(p => /^SW-\d{3}$/.test(p.sku) && !("goodsId" in p) && !("code" in p)), "Supplier identities stay out of the public model");
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
    assert(body.includes(product.sku));
    assert(!body.includes("temu.com"));
    assert(body.includes(`/${locale}/shop/${product.slug}`));
  }
  for (const product of data.SHOP_PRODUCTS) {
    assert(product.copy[locale].name && product.copy[locale].description && product.copy[locale].alt);
    assert.equal(data.productImages(product).length, product.modelView ? 6 : 5);
    for (const shot of data.productShots(product)) {
      assert(data.productImageAlt(product, locale, shot).length <= 240);
      assert(fs.existsSync('public' + data.productImage(product, shot)));
    }
  }
}
const manifest = JSON.parse(fs.readFileSync('generated_images/shop/gallery-images.json'));
assert.equal(Object.keys(manifest).length, data.SHOP_PRODUCTS.reduce((total, product) => total + data.productShots(product).length, 0));
assert.equal(new Set(Object.values(manifest)).size, data.SHOP_PRODUCTS.reduce((total, product) => total + data.productShots(product).length, 0), 'Every product view uses its own generated image');
assert.equal(fs.readdirSync('public/shop/products').filter(file => file.endsWith('.webp')).length, data.SHOP_PRODUCTS.reduce((total, product) => total + data.productShots(product).length, 0));
assert(!fs.existsSync('public/shop/source'), 'Listing photos are not public storefront assets');
const gallery = load('app/components/shop/ProductGallery.tsx');
const card = load('app/components/shop/ProductCard.tsx');
const copy = load('data/shop-copy.ts').SHOP_COPY;
function nodes(node) { if (!node || typeof node !== 'object') return []; return [node, ...[node.props?.children].flat(Infinity).flatMap(nodes)]; }
for (const product of data.SHOP_PRODUCTS) {
  const shots = data.productShots(product);
  state = []; cursor = 0;
  const render = () => { cursor = 0; return nodes(gallery.ProductGallery({ product, locale: 'uk' })); };
  let all = render();
  assert.equal(all.find(n => n.type === 'Image').props.src, data.productImage(product));
  assert.equal(all.filter(n => n.type === 'button' && n.props['aria-pressed'] !== undefined).length, shots.length);
  for (const [index, shot] of shots.entries()) {
    all.filter(n => n.type === 'button' && n.props['aria-pressed'] !== undefined)[index].props.onClick();
    all = render(); assert.equal(all.find(n => n.type === 'Image').props.src, data.productImage(product, shot));
  }
  all.find(n => n.type === 'button' && n.props['aria-label'] === copy.uk.next).props.onClick();
  all = render(); assert.equal(all.find(n => n.type === 'Image').props.src, data.productImage(product, 'studio'), 'Next wraps from final view to studio');
  all.find(n => n.type === 'button' && n.props['aria-label'] === copy.uk.previous).props.onClick();
  all = render(); assert.equal(all.find(n => n.type === 'Image').props.src, data.productImage(product, shots[shots.length - 1]), 'Previous wraps');
  let opened = 0, closed = 0, focused = 0;
  const dialog = all.find(n => n.type === 'dialog');
  dialog.props.ref.current = { showModal() { opened++; }, close() { closed++; } };
  const trigger = all.find(n => n.type === 'button' && n.props['aria-label']?.startsWith(copy.uk.zoom));
  trigger.props.ref.current = { focus() { focused++; } };
  trigger.props.onClick(); assert.equal(opened, 1);
  let prevented = false;
  dialog.props.onKeyDown({ key: 'ArrowRight', preventDefault() { prevented = true; } });
  all = render(); assert(prevented); assert.equal(all.find(n => n.type === 'Image').props.src, data.productImage(product));
  dialog.props.onClick({ target: 1, currentTarget: 2 }); assert.equal(closed, 0, 'Clicking a child does not close the dialog');
  dialog.props.onClick({ target: 1, currentTarget: 1 }); assert.equal(closed, 1);
  dialog.props.onClose(); assert.equal(focused, 1, 'Closing returns focus to the image trigger');
  state = []; cursor = 0;
  const renderCard = () => { cursor = 0; return nodes(card.ProductCard({ product, locale: 'uk' })); };
  all = renderCard();
  const previews = all.filter(n => n.type === 'button' && n.props['aria-pressed'] !== undefined);
  assert.equal(previews.length, shots.length);
  assert.equal(all.find(n => n.type === 'Image').props.src, data.productImage(product, product.modelView ? 'model' : 'studio'));
  for (const [index, shot] of shots.entries()) {
    all.filter(n => n.type === 'button' && n.props['aria-pressed'] !== undefined)[index].props.onClick();
    all = renderCard();
    assert.equal(all.find(n => n.type === 'Image').props.src, data.productImage(product, shot));
  }
}
const catalog = load('app/components/shop/ShopCatalog.tsx');
for (const locale of ['uk', 'en', 'de']) {
  state = []; cursor = 0; effects = []; mounted = false; blocked = false; storage.clear(); listeners.clear();
  const render = () => { cursor = 0; return nodes(catalog.ShopCatalog({ locale })); };
  let all = render(); effects.forEach(fn => fn()); mounted = true; all = render();
  assert.equal(all.filter(n => n.type?.name === 'ProductCard').length, data.SHOP_PRODUCTS.length);
  const categories = all.filter(n => n.type === 'button' && n.props['aria-pressed'] !== undefined && !n.props['aria-label']);
  categories[1].props.onClick(); all = render();
  assert.equal(all.filter(n => n.type?.name === 'ProductCard').length, data.SHOP_PRODUCTS.filter(p => p.category === 'bags').length, 'Bag filter returns two actual products');
  all.find(n => n.type === 'input').props.onChange({ target: { value: 'NO_MATCH_123' } }); all = render();
  assert.equal(all.filter(n => n.type?.name === 'ProductCard').length, 0, 'Search respects the active category');
  all.find(n => n.type === 'input').props.onChange({ target: { value: '' } }); all = render();
  all.find(n => n.type?.name === 'ProductCard').props.onToggle(); all = render();
  const draft = all.find(n => n.type === 'a' && n.props.href?.startsWith('mailto:'));
  assert(draft && decodeURIComponent(draft.props.href).includes(slug));
  assert.equal(all.filter(n => n.type?.name === 'ProductCard').length, data.SHOP_PRODUCTS.filter(p => p.category === 'bags').length, 'Saving a product preserves the filter');
}
console.log('Shop checks passed: 28 products, 3 languages, storage failures, selection sync, enquiry drafts, 145 generated images, including 56 additional angles and in-use views, card previews, gallery navigation and zoom controls.');
