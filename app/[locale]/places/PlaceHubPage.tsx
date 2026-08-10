import Image from "next/image";
import Link from "next/link";
import type { Locale } from "../../../lib/i18n";
import { destinationImage, type TravelDestination } from "../../../data/travel-destinations";
import styles from "./travel.module.css";

export function PlaceHubPage({ locale, title, description, places }: { locale: Locale; title: string; description: string; places: TravelDestination[] }) {
  const back = locale === "uk" ? "Усі місця" : locale === "de" ? "Alle Orte" : "All places";
  const open = locale === "uk" ? "Відкрити гід" : locale === "de" ? "Guide öffnen" : "Open guide";
  return <main lang={locale} className={styles.page}><div className={styles.shell}>
    <Link href={`/${locale}/places`} className={styles.hubBack}>← {back}</Link>
    <header className={styles.hubHero}><p className={styles.eyebrow}>SWEEZY · SWITZERLAND</p><h1>{title}</h1><p>{description}</p><strong>{places.length}</strong></header>
    <div className={styles.grid}>{places.map((place,index)=><Link key={place.slug} href={`/${locale}/places/${place.slug}`} className={styles.card}><div className={styles.media}><Image src={destinationImage(place)} alt={place.alt[locale][0]} fill priority={index<2} sizes="(max-width: 580px) 100vw, 50vw"/></div><div className={styles.copy}><div className={`${styles.meta} ${styles.eyebrow}`}><span>{place.region[locale]}</span><span>{String(index+1).padStart(2,"0")}</span></div><h2>{place.title[locale]}</h2><p>{place.summary[locale]}</p><span className={styles.open}>{open}<span aria-hidden>↗</span></span></div></Link>)}</div>
  </div></main>;
}
