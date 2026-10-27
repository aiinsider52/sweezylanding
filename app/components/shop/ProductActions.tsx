"use client";

import Link from "next/link";
import { shopInquiryHref, type ShopProduct } from "../../../data/shop";
import { SHOP_COPY } from "../../../data/shop-copy";
import type { Locale } from "../../../lib/i18n";
import { useShopSelection } from "./useShopSelection";
import styles from "../../[locale]/shop/shop.module.css";

export function ProductActions({ product, locale }: { product: ShopProduct; locale: Locale }) {
  const c = SHOP_COPY[locale];
  const { selected, toggle, ready, storageUnavailable } = useShopSelection();
  const saved = selected.includes(product.slug);
  return <div className={styles.productActions}>
    <a href={shopInquiryHref([product], locale)} className={styles.primary}>{c.inquiry}<span aria-hidden="true">↗</span></a>
    <button type="button" className={styles.secondary} disabled={!ready} aria-pressed={saved} onClick={() => toggle(product.slug)}>{saved ? `✓ ${c.added}` : `+ ${c.add}`}</button>
    <p className={styles.finePrint}>{c.mailNote}</p>
    {saved ? <Link className={styles.inlineLink} href={`/${locale}/shop#my-selection`}>{c.selectionCta} ({selected.length}) →</Link> : null}
    <span className={styles.srOnly} role="status">{saved ? c.added : ""}</span>
    {storageUnavailable ? <p className={styles.finePrint} role="status">{c.storageNote}</p> : null}
  </div>;
}
