"use client";

import Image from "next/image";
import { useState } from "react";
import type { Locale } from "../../../lib/i18n";
import { originalProductImage, styledProductImage, productImageAlt, type ShopProduct } from "../../../data/shop";
import { SHOP_COPY } from "../../../data/shop-copy";
import styles from "../../[locale]/shop/shop.module.css";

export function ProductGallery({ product, locale }: { product: ShopProduct; locale: Locale }) {
  const [styled, setStyled] = useState(false);
  const c = SHOP_COPY[locale];
  return <div className={styles.gallery}>
    <div className={styles.galleryPhoto}>
      <Image src={styled ? styledProductImage(product) : originalProductImage(product)} alt={productImageAlt(product, locale, styled)} fill sizes="(max-width: 800px) 92vw, 52vw" priority />
      <span className={styles.photoLabel}>{styled ? c.ai : c.original}</span>
      {product.flatPrint ? <span className={styles.flatBadge}>{c.flat}</span> : null}
    </div>
    {product.styledImage ? <div className={styles.galleryTabs} role="group" aria-label={c.gallery}>
      <button type="button" aria-pressed={!styled} onClick={() => setStyled(false)}>{c.original}</button><button type="button" aria-pressed={styled} onClick={() => setStyled(true)}>{c.style} · {c.ai}</button>
    </div> : null}
    {product.styledImage ? <p className={styles.finePrint}>{c.imageNote}</p> : null}
  </div>;
}
