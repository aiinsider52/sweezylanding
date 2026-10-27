// Local purchasing reference. Never imported by the app or exposed by an API.
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const ts=require('typescript');
const root=path.resolve(__dirname,'..');
const folder=path.join(root,'private/shop');
const read=file=>JSON.parse(fs.readFileSync(path.join(folder,file),'utf8'));
const cache=new Map();
function load(file){
 file=path.resolve(file);if(cache.has(file))return cache.get(file);
 const exports={};cache.set(file,exports);
 const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 vm.runInNewContext(code,{exports,require(name){if(!name.startsWith('.'))throw Error('Only local product data can be loaded');return load(path.resolve(path.dirname(file),name)+'.ts');}});
 return exports;
}
if(!fs.existsSync(path.join(folder,'temu-import-2026-10-27.json')))throw Error('Private supplier import is required locally; it is deliberately not in Git.');
const shopData=load(path.join(root,'data/shop.ts'));
const products=shopData.SHOP_PRODUCTS;
const originals=read('original-product-suppliers.json');
const imports=read('temu-import-2026-10-27.json');
const drafts=read('public-product-drafts.json');
const oldSources=read('legacy-sources.json');
const suppliers=new Map(originals.map(row=>[row.slug,{...row,shareUrl:'https://share.temu.com/'+row.shareCode,sourceUrl:'https://www.temu.com/goods.html?goods_id='+row.goodsId,referenceImage:oldSources.find(s=>s.goodsId===row.goodsId)?.localImage,checkedAt:'2026-10-27',extraction:{status:'reference_image_only',completeGallery:false,completeVariantMatrix:false}}]));
imports.forEach((row,index)=>suppliers.set(drafts[index].slug,row));
const existing=fs.existsSync(path.join(folder,'PRODUCT_SOURCING.json'))?read('PRODUCT_SOURCING.json'):[];
const rows=products.map(product=>{
 const supplier=suppliers.get(product.slug);if(!supplier)throw Error('No private supplier for '+product.slug);
 const previous=existing.find(row=>row.sku===product.sku);
 return {sku:product.sku,name:product.copy.uk.name,slug:product.slug,siteUrl:'https://www.sweezy.world/uk/shop/'+product.slug,localUrl:'http://localhost:3032/uk/shop/'+product.slug,category:product.category,
  supplier:{shareUrl:supplier.shareUrl,canonicalUrl:supplier.sourceUrl,goodsId:supplier.goodsId,selectedSpecId:supplier.selectedSpecId??null,selectedGalleryId:supplier.selectedGalleryId??null},
  observedAppearance:product.appearance?.label.uk??product.copy.uk.alt,appearanceEvidence:'visible_reference_image_only',referenceImage:supplier.referenceImage,
  sourceImageUrls:supplier.extraction?.discoveredImageUrls??[oldSources.find(s=>s.goodsId===supplier.goodsId)?.sourceImageUrl].filter(Boolean),
  generatedImages:shopData.productShots(product).map(shot=>'public/shop/products/'+product.slug+'-'+shot+'.webp'),
  verifiedAt:supplier.checkedAt,extraction:supplier.extraction,missingInformation:['complete_supplier_gallery','all_colour_variants','all_sizes','fabric_or_material','dimensions','supplier_price','availability','delivery','set_contents'],
  purchasingNotes:previous?.purchasingNotes??{purchasePrice:null,retailPrice:null,currency:null,notes:''},
 };
});
fs.writeFileSync(path.join(folder,'PRODUCT_SOURCING.json'),JSON.stringify(rows,null,2)+'\n');
const columns=['sku','name','site_url','temu_share_url','temu_product_url','temu_goods_id','observed_colour_or_appearance','reference_image','extraction_status','complete_gallery','all_variants','checked_at'];
const csv=[columns,...rows.map(r=>[r.sku,r.name,r.siteUrl,r.supplier.shareUrl,r.supplier.canonicalUrl,r.supplier.goodsId,r.observedAppearance,r.referenceImage,r.extraction.status,'no','no',r.verifiedAt])].map(row=>row.map(value=>'"'+String(value??'').replaceAll('"','""')+'"').join(';')).join('\n');
fs.writeFileSync(path.join(folder,'PRODUCT_SOURCING.csv'),'\ufeff'+csv+'\n');
const escape=value=>String(value??'').replaceAll('|','\\|').replaceAll('\n',' ');
let md='# Sweezy — внутрішній довідник закупівель\n\nЛише для команди. Ця папка виключена з Git і з публічних файлів сайту. Файл не підключено до клієнтського коду чи API.\n\nПеревірено: 27 жовтня 2026. Адреси сайту нижче — цільові URL після публікації змін; локальні сторінки доступні через localhost:3032.\n\n## Що підтверджено\n\nДля 19 нових посилань отримано ідентифікатор товару, канонічне посилання Temu та одне доступне зображення з перенаправлення. Варіант кольору описано за цим зображенням. Обрані spec_id збережені там, де вони були в посиланні.\n\nПублічні сторінки Temu для всіх 19 товарів повернули скрипт перевірки без опису, повної галереї, цін і SKU-матриці. Тому НЕ підтверджено всі кольори, розміри, матеріал, розмірну сітку, склад набору, наявність, вартість і доставку. Список нижче не є підтвердженням наявності або пропозицією постачальника.\n\nЗгенеровані зображення — візуалізації, не доказ фізичних властивостей чи точних розмірів. Перед оплатою замовлення звіряйте конкретний варіант, надписи, комплектацію й розміри безпосередньо у продавця.\n\n## Каталог і джерела\n\n| Артикул | Товар на сайті | Temu | Варіант на референсі |\n|---|---|---|---|\n';
for(const r of rows)md+='| '+escape(r.sku)+' | ['+escape(r.name)+']('+r.siteUrl+') | [Посилання]('+r.supplier.shareUrl+') · `'+r.supplier.goodsId+'` | '+escape(r.observedAppearance)+' |\n';
md+='\n## Файли\n\n- `PRODUCT_SOURCING.csv` — таблиця для Excel / Numbers.\n- `PRODUCT_SOURCING.json` — повний запис джерел, spec_id, статусів і збережених нотаток закупівлі.\n- `temu-import-2026-10-27.json` — результати перевірки всіх 19 нових посилань.\n- `references/` — референси постачальника, не для показу на сайті.\n- `pages/` — отримані відповіді сторінок для перевірки доступності даних.\n\nОновлення довідника: `node scripts/export-shop-sourcing.cjs`. Поле `purchasingNotes` у JSON зберігається при повторному експорті. Інші згенеровані поля перезаписуються.\n';
fs.writeFileSync(path.join(folder,'PRODUCT_SOURCING.md'),md);
console.log('Private supplier directory written for '+rows.length+' products (Markdown, CSV, JSON). No supplier data is imported by the app.');
