import Image from "next/image";
import Link from "next/link";
import type { Locale } from "../../lib/i18n";
import type { DownloadId } from "../../data/downloads";
import { countryData, countryPath, dachCopy, type Source } from "../../data/dach";
import { LeadMagnetBanner } from "./LeadMagnetBanner";
import styles from "../[locale]/countries/dach.module.css";

type Section = { id: string; title: string; body: string; checklist?: string[] };
type Props = {
  locale: Locale;
  country: "germany" | "austria";
  kicker: string;
  title: string;
  description: string;
  summary: string;
  appliesTo?: string;
  reviewedAt: string;
  sections: Section[];
  faq: { q: string; a: string }[];
  sources: Source[];
  download: { asset: DownloadId; placement: string };
  next: { href: string; label: string }[];
};

export function DachGuideArticle({ locale, country, kicker, title, description, summary, appliesTo, reviewedAt, sections, faq, sources, download, next }: Props) {
  const c = dachCopy[locale], item = countryData[country];
  const contents = { uk: "У цьому гіді", en: "In this guide", de: "In diesem Ratgeber" }[locale];
  const date = new Date(`${reviewedAt}T12:00:00Z`).toLocaleDateString(locale === "uk" ? "uk-UA" : locale === "de" ? "de-DE" : "en-GB");
  return <article className={styles.article}>
    <header className={styles.readingHero}>
      <div className={styles.readingIntro}>
        <p className={styles.eyebrow}>SWEEZY / {item.code} / {kicker}</p>
        <h1>{title}</h1><p className={styles.readingLead}>{description}</p>
        <div className={styles.readingMeta}><Link href={`/${locale}/authors/sweezy-team`}>{c.author} ↗</Link><span><Link href={`/${locale}/editorial`}>{c.reviewed}</Link>: <time dateTime={reviewedAt}>{date}</time></span></div>
      </div>
      <div className={styles.readingVisual}><Image src={item.image} alt={item.alt[locale]} fill priority sizes="(max-width: 760px) 100vw, 40vw" /><Link className={styles.readingCountry} href={countryPath(locale, country)}><span>{item.code}</span>{item.name[locale]} ↗</Link></div>
    </header>

    <div className={styles.answerGrid} data-single={!appliesTo || undefined}>
      <section className={styles.answerCard} aria-labelledby="short-answer"><p className={styles.panelIndex} aria-hidden="true">01 / SWEEZY</p><h2 id="short-answer">{c.answer}</h2><p>{summary}</p></section>
      {appliesTo ? <section className={styles.contextCard} aria-labelledby="guide-audience"><p className={styles.panelIndex} aria-hidden="true">02 / {item.code}</p><h2 id="guide-audience">{c.applies}</h2><p>{appliesTo}</p></section> : null}
    </div>

    <div className={styles.readingLayout}>
      <aside className={styles.readingRail}>
        <p className={styles.eyebrow}>SWEEZY / {item.code}</p><h2>{contents}</h2>
        <nav aria-label={contents}>{sections.map((section, index) => <a key={section.id} href={`#${section.id}`}><span aria-hidden="true">0{index + 1}</span>{section.title}</a>)}<a href="#guide-faq"><span aria-hidden="true">↳</span>{c.faq}</a><a href="#guide-sources"><span aria-hidden="true">↳</span>{c.sources}</a></nav>
        <Link className={styles.railBack} href={countryPath(locale, country)}>← {item.name[locale]}</Link>
      </aside>
      <div className={styles.readingBody}>
        {sections.map((section, index) => <section className={styles.readingSection} key={section.id} id={section.id}>
          <div className={styles.sectionHeading}><span className={styles.sectionIndex} aria-hidden="true">0{index + 1}</span><h2>{section.title}</h2></div>
          <div className={styles.sectionContent}><p>{section.body}</p>{section.checklist?.length ? <ul>{section.checklist.map(task => <li key={task}>{task}</li>)}</ul> : null}</div>
        </section>)}
        <LeadMagnetBanner locale={locale} asset={download.asset} placement={download.placement} />
        <section className={styles.readingSupport} id="guide-faq"><div className={styles.supportHeading}><p className={styles.eyebrow}>SWEEZY / FAQ</p><h2>{c.faq}</h2></div><div className={styles.faqGrid}>{faq.map(question => <div key={question.q} className={styles.faq}><h3>{question.q}</h3><p>{question.a}</p></div>)}</div></section>
        <section className={styles.readingSupport} id="guide-sources"><div className={styles.supportHeading}><p className={styles.eyebrow}>SWEEZY / SOURCES</p><h2>{c.sources}</h2></div><ul className={styles.evidenceGrid}>{sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer noopener"><span>{source.name}</span><span aria-hidden="true">↗</span></a></li>)}</ul><p className={styles.note}>{c.scope}</p></section>
        <section className={styles.readingSupport}><div className={styles.supportHeading}><p className={styles.eyebrow}>SWEEZY / EXPLORE</p><h2>{c.next}</h2></div><div className={styles.nextGrid}>{next.map((link, index) => <Link key={link.href} href={link.href}><span aria-hidden="true">0{index + 1}</span><strong>{link.label}</strong><span aria-hidden="true">↗</span></Link>)}</div></section>
      </div>
    </div>
  </article>;
}
