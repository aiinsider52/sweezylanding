"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "../../../lib/i18n";
import { PRODUCT_SHOTS, productImage, productImageAlt, type ShopProduct } from "../../../data/shop";
import { SHOP_COPY } from "../../../data/shop-copy";
import styles from "../../[locale]/shop/shop.module.css";

export function ProductGallery({ product, locale }: { product: ShopProduct; locale: Locale }) {
  const [index, setIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const c = SHOP_COPY[locale];
  const shot = PRODUCT_SHOTS[index];
  const step = (direction: number) => setIndex(value => (value + direction + PRODUCT_SHOTS.length) % PRODUCT_SHOTS.length);
  useEffect(() => {
    if (!zoomOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [zoomOpen]);
  return <div className={styles.gallery}>
    <div className={styles.galleryPhoto}>
      <button ref={trigger} className={styles.zoomTrigger} type="button" aria-label={`${c.zoom}: ${product.copy[locale].name}`} onClick={() => { if (dialog.current) { dialog.current.showModal(); setZoomOpen(true); } }}>
        <Image src={productImage(product, shot)} alt={productImageAlt(product, locale, shot)} fill sizes="(max-width: 800px) 92vw, 52vw" priority />
        <span className={styles.zoomBadge} aria-hidden="true">↗</span>
      </button>
      <span className={styles.photoLabel}>{c.ai}</span>
      <span className={styles.galleryCounter} aria-live="polite">{String(index + 1).padStart(2, "0")} / 03</span>
      {product.flatPrint ? <span className={styles.flatBadge}>{c.flat}</span> : null}
      <div className={styles.galleryArrows}><button type="button" aria-label={c.previous} onClick={() => step(-1)}>←</button><button type="button" aria-label={c.next} onClick={() => step(1)}>→</button></div>
    </div>
    <div className={styles.galleryThumbnails} role="group" aria-label={c.gallery}>
      {PRODUCT_SHOTS.map((item, itemIndex) => <button key={item} type="button" aria-pressed={itemIndex === index} aria-label={`${c.shots[item]}: ${product.copy[locale].name}`} onClick={() => setIndex(itemIndex)}>
        <span className={styles.thumbPhoto}><Image src={productImage(product, item)} alt={productImageAlt(product, locale, item)} fill sizes="(max-width: 800px) 28vw, 16vw" /></span>
        <span className={styles.thumbCaption}><small>{String(itemIndex + 1).padStart(2, "0")}</small>{c.shots[item]}</span>
      </button>)}
    </div>
    <p className={styles.finePrint}>{c.imageNote}</p>
    <dialog ref={dialog} className={styles.zoomDialog} aria-label={`${c.gallery}: ${product.copy[locale].name}`} onClose={() => { setZoomOpen(false); trigger.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={event => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); step(event.key === "ArrowRight" ? 1 : -1); }
    }}>
      <div className={styles.zoomPanel}>
        <div className={styles.zoomHeader}><span>{product.copy[locale].name}</span><button type="button" autoFocus aria-label={c.closeZoom} onClick={() => dialog.current?.close()}>×</button></div>
        <div className={styles.zoomImage}><Image src={productImage(product, shot)} alt={productImageAlt(product, locale, shot)} fill sizes="(max-width: 800px) 94vw, 82vh" /></div>
        <div className={styles.zoomFooter}><button type="button" aria-label={c.previous} onClick={() => step(-1)}>←</button><span>{c.shots[shot]} · {index + 1} / 3 · {c.ai}</span><button type="button" aria-label={c.next} onClick={() => step(1)}>→</button></div>
      </div>
    </dialog>
  </div>;
}
