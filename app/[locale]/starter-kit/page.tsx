import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "../../../lib/blog";
import { buildLocaleAlternates } from "../../../lib/alternates";
import { APP_STORE_URL } from "../../../lib/links";
import { firstWeek, kitSources } from "../../../data/first-week";
import { SweezyCompanion } from "../../components/SweezyCompanion";
import { Checklist } from "./Checklist";
import styles from "../../components/StarterKit.module.css";

export function generateStaticParams() { return ["uk", "en", "de"].map(locale => ({ locale })); }
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const copy = firstWeek[params.locale];
  return { title: `${copy.title} | Sweezy`, description: copy.intro, alternates: buildLocaleAlternates(params.locale, "/starter-kit") };
}
export default function StarterKit({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const copy = firstWeek[locale];
  return <main className={styles.main}>
    <p className={styles.printBrand}>Sweezy / sweezy.world/{locale}/starter-kit</p>
    <div className={styles.hero}>
      <div className={styles.heroText}>
        <p className={styles.eyebrow}>{copy.badge}</p>
        <h1>{copy.title}</h1>
        <p className={styles.intro}>{copy.intro}</p>
        <a className={styles.button} href={`/downloads/sweezy-first-week-${locale}.pdf`} download>{copy.download}<span aria-hidden>↓</span></a>
      </div>
      <SweezyCompanion pose="reader" className={styles.companion} priority />
    </div>
    <p className={styles.note}>{copy.note}</p>
    <Checklist locale={locale} />
    <section className={styles.sources}>
      <h2>{copy.sources}</h2>
      <ul>{kitSources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer noopener">{source.name}</a></li>)}</ul>
      <p>Sweezy · 28.09.2026</p>
    </section>
    <section className={styles.end}><h2>{copy.next}</h2><a href={APP_STORE_URL} className={styles.button} target="_blank" rel="noreferrer noopener">{copy.app}<span aria-hidden>↗</span></a></section>
  </main>;
}
