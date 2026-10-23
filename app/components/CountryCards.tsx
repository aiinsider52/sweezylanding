import Image from "next/image";
import Link from "next/link";
import type { Locale } from "../../lib/i18n";
import { COUNTRIES, countryData, countryPath, dachCopy, type Country } from "../../data/dach";
import styles from "../[locale]/countries/dach.module.css";

export function CountryCards({ locale, exclude }: { locale: Locale; exclude?: Country }) {
  return <div className={styles.countries}>{COUNTRIES.filter(country => country !== exclude).map(country => {
    const item = countryData[country];
    return <article className={styles.country} key={country}>
      <div className={styles.photo}><Image src={item.image} alt={item.alt[locale]} fill sizes="(max-width: 560px) 100vw, (max-width: 850px) 40vw, 380px" /><span className={styles.countryCode}>{item.code}</span></div>
      <div><h2>{item.name[locale]}</h2><p>{item.description[locale]}</p><Link className={styles.link} href={countryPath(locale, country)}>{dachCopy[locale].open} ↗</Link></div>
    </article>;
  })}</div>;
}
