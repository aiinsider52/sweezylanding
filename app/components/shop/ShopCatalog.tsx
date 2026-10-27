"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Locale } from "../../../lib/i18n";
import { SHOP_COPY } from "../../../data/shop-copy";
import { SHOP_PRODUCTS, productCardImage, productImageAlt, shopInquiryHref, type ShopCategory } from "../../../data/shop";
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
          {(["all", "bags", "cups", "decor", "accessories"] as const).map(key => <button key={key} type="button" aria-pressed={category === key} onClick={() => setCategory(key)}>{key === "all" ? c.all : c.categories[key]}<small>{key === "all" ? SHOP_PRODUCTS.length : SHOP_PRODUCTS.filter(p => p.category === key).length}</small></button>)}
        </div>
        <label className={styles.search}><span className={styles.srOnly}>{c.search}</span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5"/><path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.5"/></svg><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={c.searchPlaceholder} /></label>
      </div>
      <p className={styles.resultCount} role="status">{c.results}: {visible.length} / {SHOP_PRODUCTS.length}</p>
      <div className={styles.productGrid}>
        {visible.map(product => <article key={product.slug} className={styles.card}>
          <div className={styles.cardPhoto}>
            <Link href={`/${locale}/shop/${product.slug}`} className={styles.imageLink}>
              <Image src={productCardImage(product)} alt={productImageAlt(product, locale, product.styledImage)} fill sizes="(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 31vw" />
              <span className={styles.photoLabel}>{product.styledImage ? c.ai : c.original}</span>
            </Link>
            {product.flatPrint ? <span className={styles.flatBadge}>{c.flat}</span> : null}
            <button className={styles.saveButton} type="button" disabled={!ready} aria-pressed={selected.includes(product.slug)} aria-label={`${selected.includes(product.slug) ? c.remove : c.add}: ${product.copy[locale].name}`} onClick={() => toggle(product.slug)}>{selected.includes(product.slug) ? "✓" : "+"}</button>
          </div>
          <div className={styles.cardCopy}><p className={styles.cardCategory}>{c.categories[product.category]}</p><h3><Link href={`/${locale}/shop/${product.slug}`}>{product.copy[locale].name}</Link></h3><div className={styles.cardBottom}><span>{c.price}</span><Link href={`/${locale}/shop/${product.slug}`} aria-label={`${c.details}: ${product.copy[locale].name}`}>{c.details}<span aria-hidden="true">↗</span></Link></div></div>
        </article>)}
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
