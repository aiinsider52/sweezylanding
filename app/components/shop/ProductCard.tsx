"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Locale } from "../../../lib/i18n";
import { productShots, productImage, productImageAlt, type ShopProduct, type ProductShot } from "../../../data/shop";
import { SHOP_COPY } from "../../../data/shop-copy";
import { shopStory } from "../../../data/shop-stories";
import styles from "../../[locale]/shop/shop.module.css";

export function ProductCard({ product, locale, saved = false, ready = true, onToggle }: {
  product: ShopProduct; locale: Locale; saved?: boolean; ready?: boolean; onToggle?: () => void;
}) {
  const [shot, setShot] = useState<ProductShot>(product.modelView ? "model" : "studio");
  const c = SHOP_COPY[locale];
  const name = product.copy[locale].name;
  const href = `/${locale}/shop/${product.slug}`;
  // Model-led clothing previews return to the studio view on hover.
  const hoverShot: ProductShot = shot === "studio" ? "in-use" : "studio";
  return <article className={styles.card} data-product={product.slug}>
    <div className={styles.cardPhoto}>
      <Link href={href} className={styles.imageLink} aria-label={`${c.details}: ${name}`}>
        <Image src={productImage(product, shot)} alt={productImageAlt(product, locale, shot)} fill sizes="(max-width: 560px) 46vw, (max-width: 900px) 46vw, (max-width: 1280px) 31vw, 23vw" />
        <Image className={styles.hoverImage} src={productImage(product, hoverShot)} alt={productImageAlt(product, locale, hoverShot)} fill sizes="(max-width: 560px) 46vw, (max-width: 900px) 46vw, (max-width: 1280px) 31vw, 23vw" />
      </Link>
      {product.flatPrint && product.category === "decor" ? <span className={styles.flatBadge}>{c.flat}</span> : null}
      {onToggle ? <button className={styles.saveButton} type="button" disabled={!ready} aria-pressed={saved} aria-label={`${saved ? c.remove : c.add}: ${name}`} onClick={onToggle}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2Z" /></svg>
      </button> : null}
      <div className={styles.cardDots} role="group" aria-label={`${c.preview}: ${name}`}>
        {productShots(product).map(item => <button key={item} type="button" aria-pressed={shot === item} aria-label={`${c.shots[item]}: ${name}`} onClick={() => setShot(item)}><span><Image src={productImage(product, item)} alt={productImageAlt(product, locale, item)} fill sizes="32px" /></span></button>)}
      </div>
    </div>
    <div className={styles.cardCopy}>
      <p className={styles.cardCategory}>{c.categories[product.category]}</p>
      <h3><Link href={href}>{name}</Link></h3>
      <p className={styles.cardTagline}>{shopStory(product.slug, locale)?.tagline}</p>
      <div className={styles.cardBottom}><span>{c.priceShort}</span><Link href={href} tabIndex={-1} aria-hidden="true" className={styles.cardArrow}>↗</Link></div>
    </div>
  </article>;
}
