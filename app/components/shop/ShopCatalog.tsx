"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "../../../lib/i18n";
import { SHOP_COPY } from "../../../data/shop-copy";
import { SHOP_PRODUCTS, SHOP_CATEGORIES, shopInquiryHref, type ShopCategory } from "../../../data/shop";
import { ProductCard } from "./ProductCard";
import { useShopSelection } from "./useShopSelection";
import styles from "../../[locale]/shop/shop.module.css";

export function ShopCatalog({ locale }: { locale: Locale }) {
  const c = SHOP_COPY[locale];
  const [category, setCategory] = useState<ShopCategory | "all">("all");
  const [query, setQuery] = useState("");
  const { selected, toggle, clear, ready, storageUnavailable } = useShopSelection();
  const term = query.trim().toLocaleLowerCase(locale);
  const visible = SHOP_PRODUCTS.filter(p => (category === "all" || p.category === category) && `${p.copy[locale].name} ${p.copy[locale].description}`.toLocaleLowerCase(locale).includes(term));
  const selection = SHOP_PRODUCTS.filter(p => selected.includes(p.slug));
  return <>
    <section id="collection" className={styles.collection} aria-labelledby="collection-heading">
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>THE SWISS EDIT / 01</p><h2 id="collection-heading">{c.collection}</h2><p>{c.collectionNote}</p></div><a href="#my-selection" className={styles.selectionLink}>{c.selectionLink}<span>{selected.length}</span></a></div>
      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label={c.collection}>
          {(["all", ...SHOP_CATEGORIES] as const).map(key => <button key={key} type="button" aria-pressed={category === key} onClick={() => setCategory(key)}>{key === "all" ? c.all : c.categories[key]}<small>{key === "all" ? SHOP_PRODUCTS.length : SHOP_PRODUCTS.filter(p => p.category === key).length}</small></button>)}
        </div>
        <label className={styles.search}><span className={styles.srOnly}>{c.search}</span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5"/><path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.5"/></svg><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={c.searchPlaceholder} /></label>
      </div>
      <p className={styles.resultCount} role="status">{c.results}: {visible.length} / {SHOP_PRODUCTS.length}</p>
      <div className={styles.productGrid}>
        {visible.map(product => <ProductCard key={product.slug} product={product} locale={locale} saved={selected.includes(product.slug)} ready={ready} onToggle={() => toggle(product.slug)} />)}
      </div>
      {visible.length === 0 ? <div className={styles.empty}><p>{c.empty}</p><button type="button" onClick={() => { setQuery(""); setCategory("all"); }}>{c.reset}</button></div> : null}
      <p className={styles.imageNote}>{c.imageNote}</p>
    </section>
    <section id="my-selection" className={styles.selection} aria-labelledby="selection-heading">
      <div><p className={styles.eyebrow}>YOUR SWISS EDIT</p><h2 id="selection-heading">{c.selection}</h2><p>{c.selectionBody}</p><p className={styles.selectionStatus} role="status">{c.selectionLink}: {selection.length}</p></div>
      <div className={styles.selectionContents}>
        {selection.length ? <>
          <ul>{selection.map(product => <li key={product.slug}><Link href={`/${locale}/shop/${product.slug}`}>{product.copy[locale].name}</Link><button type="button" aria-label={`${c.remove}: ${product.copy[locale].name}`} onClick={() => toggle(product.slug)}>×</button></li>)}</ul>
          <div className={styles.actions}><a className={styles.primary} href={shopInquiryHref(selection, locale)}>{c.inquiry}<span aria-hidden="true">↗</span></a><button className={styles.textButton} type="button" onClick={clear}>{c.clear}</button></div><p className={styles.finePrint}>{c.mailNote}</p>
        </> : <p className={styles.selectionEmpty}>{c.selectionEmpty}</p>}
        {storageUnavailable ? <p className={styles.finePrint} role="status">{c.storageNote}</p> : null}
      </div>
    </section>
  </>;
}
