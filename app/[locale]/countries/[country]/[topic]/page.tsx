import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "../../../../../lib/blog";
import { BASE_URL, buildLocaleAlternates } from "../../../../../lib/alternates";
import { getDachGuide } from "../../../../../lib/dach-guides";
import { countryData, countryPath, dachCopy, DACH_TOPICS, type DachTopic, topicNames, guideSources, REVIEWED_AT } from "../../../../../data/dach";
import { JsonLd } from "../../../../components/seo/JsonLd";
import { LeadMagnetBanner } from "../../../../components/LeadMagnetBanner";
import styles from "../../dach.module.css";

type Params = { locale: string; country: string; topic: string };
function validTopic(topic: string): topic is DachTopic { return DACH_TOPICS.includes(topic as DachTopic); }
export function generateStaticParams() { return ["uk", "en", "de"].flatMap(locale => ["germany", "austria"].flatMap(country => DACH_TOPICS.map(topic => ({ locale, country, topic })))); }
export function generateMetadata({ params }: { params: Params }): Metadata {
  if (!isLocale(params.locale) || (params.country !== "germany" && params.country !== "austria") || !validTopic(params.topic)) return {};
  const guide = getDachGuide(params.country, params.topic, params.locale), item = countryData[params.country];
  const image = `${BASE_URL}/editorial/countries/${params.country}-social.jpg`;
  return { title: `${guide.title} | Sweezy`, description: guide.description, alternates: buildLocaleAlternates(params.locale, `/countries/${params.country}/${params.topic}`), openGraph: { title: guide.title, description: guide.description, type: "article", url: `${BASE_URL}/${params.locale}/countries/${params.country}/${params.topic}`, images: [{ url: image, width: 1200, height: 630, alt: item.alt[params.locale] }] }, twitter: { card: "summary_large_image", images: [{ url: image, alt: item.alt[params.locale] }] } };
}
export default function CountryGuide({ params }: { params: Params }) {
  if (!isLocale(params.locale) || (params.country !== "germany" && params.country !== "austria") || !validTopic(params.topic)) notFound();
  const locale = params.locale, country = params.country, topic = params.topic;
  const guide = getDachGuide(country, topic, locale), item = countryData[country], c = dachCopy[locale], sources = guideSources[country][topic];
  const path = `${countryPath(locale, country)}/${topic}`, url = `${BASE_URL}${path}`;
  const breadcrumbs = [{ name: "Sweezy", url: `${BASE_URL}/${locale}` }, { name: "DACH", url: `${BASE_URL}/${locale}/countries` }, { name: item.name[locale], url: `${BASE_URL}${countryPath(locale, country)}` }, { name: guide.title, url }];
  return <main className={styles.main} lang={locale}><div className={styles.shell}>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      { "@type": "Article", headline: guide.title, description: guide.description, abstract: guide.summary, url, mainEntityOfPage: url, inLanguage: locale, datePublished: REVIEWED_AT, dateModified: REVIEWED_AT, author: { "@type": "Organization", name: "Sweezy editorial team", url: `${BASE_URL}/${locale}/authors/sweezy-team` }, publisher: { "@type": "Organization", name: "Sweezy", url: BASE_URL }, spatialCoverage: { "@type": "Country", name: item.name[locale] }, citation: sources.map(source => source.url), isAccessibleForFree: true },
      { "@type": "FAQPage", mainEntity: guide.faq.map(faq => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) },
      { "@type": "BreadcrumbList", itemListElement: breadcrumbs.map((b, i) => ({ "@type": "ListItem", position: i + 1, name: b.name, item: b.url })) },
    ] }} />
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">{breadcrumbs.slice(0, -1).map(b => <Link href={b.url.replace(BASE_URL, "")} key={b.url}>{b.name} /</Link>)}<span>{topicNames[topic][locale]}</span></nav>
    <article className={styles.article}>
      <p className={styles.eyebrow}>SWEEZY / {item.code} / {topicNames[topic][locale]}</p><h1>{guide.title}</h1>
      <p>{guide.description}</p>
      <p className={styles.note}>{c.author} · <Link href={`/${locale}/editorial`}>{c.reviewed}</Link>: <time dateTime={REVIEWED_AT}>{new Date(`${REVIEWED_AT}T12:00:00Z`).toLocaleDateString(locale === "uk" ? "uk-UA" : locale === "de" ? "de-DE" : "en-GB")}</time></p>
      <div className={styles.summary}><strong>{c.answer}</strong><p>{guide.summary}</p></div>
      <div className={styles.summary}><strong>{c.applies}</strong><p>{guide.appliesTo}</p></div>
      <nav className={styles.toc} aria-label={c.topics}>{guide.sections.map((section, i) => <a key={section.title} href={`#step-${i + 1}`}>{section.title}</a>)}</nav>
      {guide.sections.map((section, index) => <section key={section.title} id={`step-${index + 1}`}><h2>{section.title}</h2><p>{section.body}</p><ul>{section.checklist.map(task => <li key={task}>{task}</li>)}</ul></section>)}
      <LeadMagnetBanner locale={locale} asset={topic === "business" ? item.business : item.starter} placement={`guide-${country}-${topic}`} />
      <section><h2>{c.faq}</h2>{guide.faq.map(faq => <div key={faq.q} className={styles.faq}><h3>{faq.q}</h3><p>{faq.a}</p></div>)}</section>
      <section className={styles.section}><h2>{c.sources}</h2><ul>{sources.map(source => <li key={source.url}><a className={styles.link} href={source.url} target="_blank" rel="noreferrer noopener">{source.name} ↗</a></li>)}</ul><p className={styles.note}>{c.scope}</p></section>
      <section className={styles.section}><h2>{c.next}</h2><div className={styles.sourceList}>{DACH_TOPICS.filter(next => next !== topic).map(next => <Link key={next} href={`${countryPath(locale, country)}/${next}`}>{topicNames[next][locale]} →</Link>)}<Link href={countryPath(locale, country)}>{c.services} →</Link><Link href={`/${locale}/countries`}>{c.all} →</Link></div></section>
    </article>
  </div></main>;
}
