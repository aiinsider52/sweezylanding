import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "../../../../../../lib/blog";
import { BASE_URL, buildLocaleAlternates } from "../../../../../../lib/alternates";
import { CITY_SLUGS, cityPath, dachCities, getDachCity } from "../../../../../../lib/dach-cities";
import { countryData, countryPath, dachCopy, DACH_TOPICS, topicNames } from "../../../../../../data/dach";
import { JsonLd } from "../../../../../components/seo/JsonLd";
import { LeadMagnetBanner } from "../../../../../components/LeadMagnetBanner";
import styles from "../../../dach.module.css";

type Params = { locale: string; country: string; city: string };
export function generateStaticParams() { return ["uk", "en", "de"].flatMap(locale => CITY_SLUGS.map(city => ({ locale, country: dachCities[city].country, city }))); }
export function generateMetadata({ params }: { params: Params }): Metadata {
  const city = getDachCity(params.country, params.city);
  if (!isLocale(params.locale) || !city) return {};
  const locale = params.locale, title = city.title[locale], description = city.description[locale];
  const image = `${BASE_URL}/editorial/countries/${city.country}-social.jpg`;
  return { title: `${title} | Sweezy`, description, alternates: buildLocaleAlternates(locale, `/countries/${city.country}/cities/${params.city}`), openGraph: { title, description, type: "article", url: `${BASE_URL}${cityPath(locale, params.city)}`, images: [{ url: image, width: 1200, height: 630, alt: countryData[city.country].alt[locale] }] }, twitter: { card: "summary_large_image", images: [image] } };
}
export default function CityGuide({ params }: { params: Params }) {
  const city = getDachCity(params.country, params.city);
  if (!isLocale(params.locale) || !city) notFound();
  const locale = params.locale, country = city.country, item = countryData[country], c = dachCopy[locale];
  const url = `${BASE_URL}${cityPath(locale, params.city)}`;
  const breadcrumbs = [{ name: "Sweezy", url: `${BASE_URL}/${locale}` }, { name: item.name[locale], url: `${BASE_URL}${countryPath(locale, country)}` }, { name: city.name[locale], url }];
  return <main className={styles.main} lang={locale}><div className={styles.shell}>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      { "@type": "Article", headline: city.title[locale], description: city.description[locale], abstract: city.summary[locale], url, mainEntityOfPage: url, inLanguage: locale, datePublished: city.reviewedAt, dateModified: city.reviewedAt, author: { "@type": "Organization", name: "Sweezy editorial team", url: `${BASE_URL}/${locale}/authors/sweezy-team` }, publisher: { "@type": "Organization", name: "Sweezy", url: BASE_URL }, spatialCoverage: { "@type": "City", name: city.name[locale] }, citation: city.sources.map(source => source.url), isAccessibleForFree: true },
      { "@type": "FAQPage", mainEntity: city.faq.map(faq => ({ "@type": "Question", name: faq.q[locale], acceptedAnswer: { "@type": "Answer", text: faq.a[locale] } })) },
      { "@type": "BreadcrumbList", itemListElement: breadcrumbs.map((b, i) => ({ "@type": "ListItem", position: i+1, name: b.name, item: b.url })) },
    ] }} />
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">{breadcrumbs.slice(0,-1).map(b => <Link key={b.url} href={b.url.replace(BASE_URL, "")}>{b.name} /</Link>)}<span>{city.name[locale]}</span></nav>
    <article className={styles.article}>
      <p className={styles.eyebrow}>SWEEZY / {item.code} / {city.name[locale]}</p><h1>{city.title[locale]}</h1><p>{city.description[locale]}</p>
      <p className={styles.note}>{c.author} · {c.reviewed}: <time dateTime={city.reviewedAt}>{new Date(`${city.reviewedAt}T12:00:00Z`).toLocaleDateString(locale === "uk" ? "uk-UA" : locale === "de" ? "de-DE" : "en-GB")}</time></p>
      <div className={styles.summary}><strong>{c.answer}</strong><p>{city.summary[locale]}</p></div>
      <nav className={styles.toc} aria-label={c.topics}>{city.sections.map((section,i) => <a key={i} href={`#city-${i+1}`}>{section.title[locale]}</a>)}</nav>
      {city.sections.map((section,i) => <section key={i} id={`city-${i+1}`}><h2>{section.title[locale]}</h2><p>{section.body[locale]}</p></section>)}
      <LeadMagnetBanner locale={locale} asset={item.starter} placement={`city-${params.city}`} />
      <section><h2>{c.faq}</h2>{city.faq.map(faq => <div className={styles.faq} key={faq.q[locale]}><h3>{faq.q[locale]}</h3><p>{faq.a[locale]}</p></div>)}</section>
      <section className={styles.section}><h2>{c.sources}</h2><ul>{city.sources.map(source => <li key={source.url}><a className={styles.link} href={source.url} target="_blank" rel="noreferrer noopener">{source.name} ↗</a></li>)}</ul><p className={styles.note}>{c.scope}</p></section>
      <section className={styles.section}><h2>{c.next}</h2><div className={styles.sourceList}>{DACH_TOPICS.map(topic => <Link key={topic} href={`${countryPath(locale,country)}/${topic}`}>{topicNames[topic][locale]} →</Link>)}<Link href={countryPath(locale,country)}>{item.name[locale]} →</Link></div></section>
    </article>
  </div></main>;
}
