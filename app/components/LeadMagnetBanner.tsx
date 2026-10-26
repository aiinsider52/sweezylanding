import Link from "next/link";
import Image from "next/image";
import { DOWNLOADS, type DownloadId } from "../../data/downloads";
import { dachCopy } from "../../data/dach";
import type { Locale } from "../../lib/i18n";
import { DownloadLink } from "./DownloadLink";
import styles from "../[locale]/countries/dach.module.css";

export function LeadMagnetBanner({ locale, asset, placement }: { locale: Locale; asset: DownloadId; placement: string }) {
  const item = DOWNLOADS[asset], c = dachCopy[locale];
  return <aside className={styles.kit}>
    <div className={styles.kitCover}><Image src={`/downloads/sweezy-${asset}-cover-${locale}.webp`} alt="" width={714} height={1010} sizes="(max-width: 560px) 72px, 104px" /></div>
    <div className={styles.kitCopy}><p className={styles.eyebrow}>SWEEZY / PDF</p><h2>{item.title[locale]}</h2><p>{item.description[locale]}</p><small>{c.free}</small></div>
    <div className={styles.actions}><DownloadLink asset={asset} locale={locale} placement={placement} className={styles.button}>{c.download} ↓</DownloadLink><Link href={`/${locale}/resources`} className={styles.link}>{c.resources} →</Link></div>
  </aside>;
}
