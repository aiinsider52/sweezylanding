import { ENTITY_IDS } from "../../../../../../lib/entities";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "../../../../../../lib/blog";
import { BASE_URL, buildLocaleAlternates } from "../../../../../../lib/alternates";
import { CITY_SLUGS, cityPath, dachCities, getDachCity } from "../../../../../../lib/dach-cities";
import { countryData, countryPath, DACH_TOPICS, topicNames } from "../../../../../../data/dach";
import { JsonLd } from "../../../../../components/seo/JsonLd";
import { DachGuideArticle } from "../../../../../components/DachGuideArticle";
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
  const locale = params.locale, country = city.country, item = countryData[country];
  const url = `${BASE_URL}${cityPath(locale, params.city)}`;
  const breadcrumbs = [{ name: "Sweezy", url: `${BASE_URL}/${locale}` }, { name: item.name[locale], url: `${BASE_URL}${countryPath(locale, country)}` }, { name: city.name[locale], url }];
  return <main className={styles.main} lang={locale}><div className={styles.shell}>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      { "@type": "Article", headline: city.title[locale], description: city.description[locale], abstract: city.summary[locale], url, mainEntityOfPage: url, inLanguage: locale, datePublished: city.reviewedAt, dateModified: city.reviewedAt, author: { "@type": "Organization", "@id": ENTITY_IDS.editorial, name: "Sweezy editorial team", url: `${BASE_URL}/${locale}/authors/sweezy-team` }, publisher: { "@type": "Organization", "@id": ENTITY_IDS.organization, name: "Sweezy", url: BASE_URL }, spatialCoverage: { "@type": "City", name: city.name[locale] }, citation: city.sources.map(source => source.url), isAccessibleForFree: true, isPartOf: { "@id": ENTITY_IDS.website } },
      { "@type": "FAQPage", mainEntity: city.faq.map((faq, index) => ({ "@type": "Question", url: `${url}#faq-${index + 1}`, name: faq.q[locale], acceptedAnswer: { "@type": "Answer", text: faq.a[locale] } })) },
      { "@type": "BreadcrumbList", itemListElement: breadcrumbs.map((b, i) => ({ "@type": "ListItem", position: i+1, name: b.name, item: b.url })) },
    ] }} />
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">{breadcrumbs.slice(0,-1).map(b => <Link key={b.url} href={b.url.replace(BASE_URL, "")}>{b.name} /</Link>)}<span>{city.name[locale]}</span></nav>
    <DachGuideArticle locale={locale} country={country} kicker={city.name[locale]} title={city.title[locale]} description={city.description[locale]} summary={city.summary[locale]} reviewedAt={city.reviewedAt}
      sections={city.sections.map((section, index) => ({ id: `city-${index + 1}`, title: section.title[locale], body: section.body[locale] }))}
      faq={city.faq.map(faq => ({ q: faq.q[locale], a: faq.a[locale] }))} sources={city.sources}
      download={{ asset: item.starter, placement: `city-${params.city}` }}
      next={[...DACH_TOPICS.map(topic => ({ href: `${countryPath(locale, country)}/${topic}`, label: topicNames[topic][locale] })), { href: countryPath(locale, country), label: item.name[locale] }]} />
  </div></main>;
}
