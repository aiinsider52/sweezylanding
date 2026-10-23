const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const postcss = require('postcss');

const compiled = ts.transpileModule(fs.readFileSync('lib/theme.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
function fixture(stored, blocked = false) {
  const module = { exports: {} };
  const dark = new Set();
  const meta = { content: '', setAttribute(name, value) { this[name] = value; } };
  const root = { dataset: {}, style: {}, classList: { toggle(key, on) { on ? dark.add(key) : dark.delete(key); } } };
  const context = vm.createContext({ module, exports: module.exports,
    document: { documentElement: root, querySelector: () => meta },
    localStorage: { getItem() { if (blocked) throw new Error('Storage disabled'); return stored; } },
  });
  vm.runInContext(compiled, context);
  return { api: module.exports, context, root, dark, meta };
}
for (const [stored, expected, blocked] of [[null,'dark',false],['light','light',false],['dark','dark',false],['invalid','dark',false],[null,'dark',true]]) {
  const f = fixture(stored, blocked);
  vm.runInContext(f.api.THEME_BOOTSTRAP, f.context);
  assert.equal(f.root.dataset.theme, expected);
  assert.equal(f.root.style.colorScheme, expected);
  assert.equal(f.dark.has('dark'), expected === 'dark');
  assert.equal(f.meta.content, expected === 'dark' ? '#0b100c' : '#f2f3ed');
  for (const next of ['light','dark','light']) {
    f.api.applyTheme(next);
    assert.equal(f.root.dataset.theme, next);
    assert.equal(f.root.style.colorScheme, next);
    assert.equal(f.dark.has('dark'), next === 'dark');
    assert.equal(f.meta.content, next === 'dark' ? '#0b100c' : '#f2f3ed');
  }
}
console.log('PASS first paint: saved light/dark, default, invalid and blocked storage; runtime DOM/browser chrome stay synchronized');

const css = postcss.parse(fs.readFileSync('app/theme.css', 'utf8'));
const tokens = { light: {}, dark: {} };
css.nodes.filter(n => n.type === 'rule').forEach(rule => {
  if (![':root','html.dark'].includes(rule.selector)) return;
  rule.walkDecls(d => { if (d.prop.startsWith('--')) tokens[rule.selector === ':root' ? 'light' : 'dark'][d.prop] = d.value; });
});
tokens.dark = { ...tokens.light, ...tokens.dark };
function rgb(hex) { return hex.slice(1).match(/../g).map(v => parseInt(v,16)/255); }
function luminance(hex) { return rgb(hex).map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4).reduce((v,c,i) => v+c*[.2126,.7152,.0722][i],0); }
function contrast(a,b) { const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05); }
for (const [theme,values] of Object.entries(tokens)) {
  for (const surface of ['bg','surface','raised','inset','blue-soft','lime-soft']) {
    for (const text of ['text','body','muted','link']) {
      const ratio = contrast(values[`--theme-${text}`],values[`--theme-${surface}`]);
      assert.ok(ratio >= 4.5, `${theme}: ${text} on ${surface} is ${ratio.toFixed(2)}:1`);
    }
    assert.ok(contrast(values['--theme-focus'],values[`--theme-${surface}`]) >= 3, `${theme}: focus on ${surface}`);
  }
  console.log(`PASS ${theme}: 24 shared text/surface pairs meet 4.5:1; focus indicators meet 3:1`);
}
assert.ok(contrast('#142015','#adff00') >= 4.5);
console.log('PASS lime action contrast');
