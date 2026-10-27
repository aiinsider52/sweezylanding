"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Locale } from "../../../lib/i18n";
import { PRODUCT_SHOTS, productImage, productImageAlt, type ShopProduct, type ProductShot } from "../../../data/shop";
import { SHOP_COPY } from "../../../data/shop-copy";
import styles from "../../[locale]/shop/shop.module.css";

export function ProductCard({ product, locale, saved = false, ready = true, onToggle }: {
  product: ShopProduct; locale: Locale; saved?: boolean; ready?: boolean; onToggle?: () => void;
}) {
  const [shot, setShot] = useState<ProductShot>("studio");
  const c = SHOP_COPY[locale];
  const href = `/${locale}/shop/${product.slug}`;
  return <article className={styles.card} data-product={product.slug}>
    <div className={styles.cardPhoto}>
      <Link href={href} className={styles.imageLink}>
        <Image src={productImage(product, shot)} alt={productImageAlt(product, locale, shot)} fill sizes="(max-width: 600px) 92vw, (max-width: 1100px) 46vw, 31vw" />
        <span className={styles.photoLabel}>{c.ai}</span>
        <span className={styles.cardExplore}>{c.details} <span aria-hidden="true">↗</span></span>
      </Link>
      {product.flatPrint ? <span className={styles.flatBadge}>{c.flat}</span> : null}
      {onToggle ? <button className={styles.saveButton} type="button" disabled={!ready} aria-pressed={saved} aria-label={`${saved ? c.remove : c.add}: ${product.copy[locale].name}`} onClick={onToggle}>{saved ? "✓" : "+"}</button> : null}
    </div>
    <div className={styles.cardCopy}>
      <div className={styles.cardMeta}><p className={styles.cardCategory}>{c.categories[product.category]}</p><span>CH / {String(PRODUCT_SHOTS.indexOf(shot) + 1).padStart(2, "0")}</span></div>
      <h3><Link href={href}>{product.copy[locale].name}</Link></h3>
      <div className={styles.cardPreviews} role="group" aria-label={`${c.preview}: ${product.copy[locale].name}`}>
        {PRODUCT_SHOTS.map((item, index) => <button key={item} type="button" aria-pressed={shot === item} aria-label={`${c.shots[item]}: ${product.copy[locale].name}`} onClick={() => setShot(item)}>
          <Image src={productImage(product, item)} alt={productImageAlt(product, locale, item)} fill sizes="76px" />
          <span>{String(index + 1).padStart(2, "0")}</span>
        </button>)}
        <Link href={href} className={styles.moreViews} aria-label={`${c.details}: ${product.copy[locale].name}`}><span aria-hidden="true">↗</span><small>{c.visualCount}</small></Link>
      </div>
      <div className={styles.cardBottom}><span>{c.price}</span><Link href={href} aria-label={`${c.details}: ${product.copy[locale].name}`}>{c.details}<span aria-hidden="true">↗</span></Link></div>
    </div>
  </article>;
}
