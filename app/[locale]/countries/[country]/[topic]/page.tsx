import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "../../../../../lib/blog";
import { BASE_URL, buildLocaleAlternates } from "../../../../../lib/alternates";
import { getDachGuide } from "../../../../../lib/dach-guides";
import { countryData, countryPath, dachCopy, DACH_TOPICS, type DachTopic, topicNames, guideSources, REVIEWED_AT } from "../../../../../data/dach";
import { JsonLd } from "../../../../components/seo/JsonLd";
import { DachGuideArticle } from "../../../../components/DachGuideArticle";
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
    <DachGuideArticle locale={locale} country={country} kicker={topicNames[topic][locale]} title={guide.title} description={guide.description} summary={guide.summary} appliesTo={guide.appliesTo} reviewedAt={REVIEWED_AT}
      sections={guide.sections.map((section, index) => ({ ...section, id: `step-${index + 1}` }))} faq={guide.faq} sources={sources}
      download={{ asset: topic === "business" ? item.business : item.starter, placement: `guide-${country}-${topic}` }}
      next={[...DACH_TOPICS.filter(next => next !== topic).map(next => ({ href: `${countryPath(locale, country)}/${next}`, label: topicNames[next][locale] })), { href: countryPath(locale, country), label: c.services }, { href: `/${locale}/countries`, label: c.all }]} />
  </div></main>;
}
