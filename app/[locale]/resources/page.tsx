import { CommunityInvite } from "../../components/CommunityInvite";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale } from "../../../lib/blog";
import { buildLocaleAlternates, BASE_URL } from "../../../lib/alternates";
import { DOWNLOAD_IDS, DOWNLOADS } from "../../../data/downloads";
import { COUNTRIES, countryData, dachCopy, countryPath } from "../../../data/dach";
import { DownloadLink } from "../../components/DownloadLink";
import { JsonLd } from "../../components/seo/JsonLd";
import styles from "../countries/dach.module.css";

export function generateStaticParams() { return ["uk", "en", "de"].map(locale => ({ locale })); }
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale;
  return { title: `${dachCopy[locale].resources}: DACH | Sweezy`, description: dachCopy[locale].intro, alternates: buildLocaleAlternates(locale, "/resources") };
}
export default function Resources({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale, c = dachCopy[locale];
  return <main className={styles.main} lang={locale}><div className={styles.shell}>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: c.resources, url: `${BASE_URL}/${locale}/resources`, inLanguage: locale }} />
    <header className={styles.intro}><p className={styles.eyebrow}>SWEEZY / RESOURCES</p><h1>{c.resources}</h1><p>{c.free}. {c.intro}</p></header>
    <nav className={styles.toc} aria-label={c.countries}>{COUNTRIES.map(country => <a key={country} href={`#${country}`}>{countryData[country].name[locale]}</a>)}</nav>
    {COUNTRIES.map(country => <section className={styles.section} id={country} key={country}><h2>{countryData[country].name[locale]}</h2><div className={styles.resourceGrid}>{DOWNLOAD_IDS.filter(id => DOWNLOADS[id].country === country).map(id => <article key={id} className={styles.resource}><div className={styles.resourceCover}><Image src={`/downloads/sweezy-${id}-cover-${locale}.webp`} alt={DOWNLOADS[id].title[locale]} width={714} height={1010} sizes="(max-width: 560px) 100px, 140px" /></div><div><p className={styles.eyebrow}>{countryData[country].code} / PDF</p><h3>{DOWNLOADS[id].title[locale]}</h3><p>{DOWNLOADS[id].description[locale]}</p><DownloadLink locale={locale} asset={id} placement="resources" className={styles.button}>{c.download} ↓</DownloadLink></div></article>)}</div><p className={styles.note}>{c.scope}</p><Link href={countryPath(locale, country)} className={styles.link}>{c.open}: {countryData[country].name[locale]} →</Link></section>)}
    <CommunityInvite locale={locale} placement="resources-community" />
  </div></main>;
}
