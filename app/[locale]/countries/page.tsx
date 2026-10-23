import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "../../../lib/blog";
import { BASE_URL, buildLocaleAlternates } from "../../../lib/alternates";
import { COUNTRIES, countryData, countryPath, dachCopy } from "../../../data/dach";
import { CountryCards } from "../../components/CountryCards";
import { JsonLd } from "../../components/seo/JsonLd";
import styles from "./dach.module.css";

export function generateStaticParams() { return ["uk", "en", "de"].map(locale => ({ locale })); }
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const c = dachCopy[params.locale];
  return { title: `${c.title} DACH | Sweezy`, description: c.intro, alternates: buildLocaleAlternates(params.locale, "/countries"), openGraph: { title: `${c.title} | Sweezy`, description: c.intro, url: `${BASE_URL}/${params.locale}/countries` } };
}
export default function Countries({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale, c = dachCopy[locale];
  return <main className={styles.main} lang={locale}><div className={styles.shell}>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: c.title, description: c.intro, url: `${BASE_URL}/${locale}/countries`, inLanguage: locale, mainEntity: { "@type": "ItemList", itemListElement: COUNTRIES.map((country, index) => ({ "@type": "ListItem", position: index + 1, name: countryData[country].name[locale], url: `${BASE_URL}${countryPath(locale, country)}` })) } }} />
    <header className={styles.intro}><p className={styles.eyebrow}>{c.eyebrow}</p><h1>{c.title}</h1><p>{c.intro}</p></header>
    <section aria-label={c.countries}><CountryCards locale={locale} /></section>
    <p className={styles.note}>{c.scope}</p>
    <div className={styles.actions}><Link href={`/${locale}/resources`} className={styles.button}>{c.resources} →</Link><Link href={`/${locale}/editorial`} className={styles.link}>{c.author} →</Link></div>
  </div></main>;
}
