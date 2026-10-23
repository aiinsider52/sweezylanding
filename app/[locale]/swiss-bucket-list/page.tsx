import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "../../../lib/blog";
import { BASE_URL, buildLocaleAlternates } from "../../../lib/alternates";
import { DEFAULT_OG_IMAGE } from "../../../lib/social";
import { getTravelKitPlaces, travelKitCopy, travelKitPdf } from "../../../data/travel-kit";
import { TravelKitBanner } from "../../components/TravelKitBanner";
import { JsonLd } from "../../components/seo/JsonLd";
import { TravelChecklist } from "./TravelChecklist";
import styles from "../../components/TravelKit.module.css";

export function generateStaticParams() { return ["uk", "en", "de"].map((locale) => ({ locale })); }
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const copy = travelKitCopy[params.locale];
  return { title: `${copy.title} | Sweezy`, description: copy.intro, alternates: buildLocaleAlternates(params.locale, "/swiss-bucket-list"), openGraph: { title: copy.title, description: copy.intro, url: `${BASE_URL}/${params.locale}/swiss-bucket-list`, type: "website", images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }] }, twitter: { card: "summary_large_image", title: copy.title, description: copy.intro, images: [DEFAULT_OG_IMAGE] } };
}
export default function TravelKitPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const copy = travelKitCopy[locale];
  const places = getTravelKitPlaces(locale);
  return <main lang={locale} className={styles.page}>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: copy.title, description: copy.intro, url: `${BASE_URL}/${locale}/swiss-bucket-list`, inLanguage: locale, mainEntity: { "@type": "ItemList", numberOfItems: places.length, itemListElement: places.map((place, index) => ({ "@type": "ListItem", position: index + 1, name: place.title, url: `${BASE_URL}${place.href}` })) } }} />
    <TravelKitBanner locale={locale} headingAs="h1" />
    <div className={styles.shell}>
      <section id="travel-checklist" className={styles.selection} aria-labelledby="travel-list-title">
        <header className={styles.sectionHeader}><p className={styles.eyebrow}>THE SWEEZY LIST / 01—08</p><h2 id="travel-list-title">{copy.listTitle}</h2><p>{copy.listBody}</p></header>
        <TravelChecklist places={places} copy={{ selected: copy.selected, select: copy.select, reset: copy.reset, saved: copy.saved, unavailable: copy.unavailable, season: copy.season, duration: copy.duration, read: copy.read, official: copy.official }} />
      </section>
      <section className={styles.planner}><div><p className={styles.eyebrow}>NEXT / YOUR DAY OUT</p><h2>{copy.planner}</h2><p>{copy.plannerBody}</p><Link href={`/${locale}/planning`}>{locale === "uk" ? "Спланувати поїздку" : locale === "de" ? "Ausflug planen" : "Plan your trip"} ↗</Link></div><ol>{copy.tasks.map((task) => <li key={task}>{task}</li>)}</ol></section>
      <p className={styles.note}>{copy.note}</p>
      <section className={styles.sources}><h2>{copy.sources}</h2><ul>{places.map((place) => <li key={place.slug}><a href={place.source.url} target="_blank" rel="noreferrer noopener">{place.title} · {place.source.name} ↗</a></li>)}</ul><p>{copy.reviewed}</p></section>
      <div className={styles.bottomLinks}><a href={travelKitPdf(locale)} download>{copy.download} ↓</a><Link href={`/${locale}/places`}>{copy.all} ↗</Link><Link href={`/${locale}/starter-kit`}>{copy.firstWeek} ↗</Link></div>
    </div>
  </main>;
}
