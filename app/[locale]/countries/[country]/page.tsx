import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "../../../../lib/blog";
import { BASE_URL, buildLocaleAlternates } from "../../../../lib/alternates";
import { COUNTRIES, countrySeoTitles, countryData, countryPath, isCountry, dachCopy, DACH_TOPICS, topicNames, topicHref, countrySources, REVIEWED_AT } from "../../../../data/dach";
import { dachSupport } from "../../../../data/dach-support";
import { CITY_SLUGS, dachCities, cityPath } from "../../../../lib/dach-cities";
import { DOWNLOADS } from "../../../../data/downloads";
import { CountryCards } from "../../../components/CountryCards";
import { LeadMagnetBanner } from "../../../components/LeadMagnetBanner";
import { JsonLd } from "../../../components/seo/JsonLd";
import styles from "../dach.module.css";

export function generateStaticParams() { return ["uk", "en", "de"].flatMap(locale => COUNTRIES.map(country => ({ locale, country }))); }
export function generateMetadata({ params }: { params: { locale: string; country: string } }): Metadata {
  if (!isLocale(params.locale) || !isCountry(params.country)) return {};
  const locale = params.locale, country = params.country, item = countryData[country];
  const image = country === "switzerland" ? item.image : `/editorial/countries/${country}-social.jpg`;
  return { title: `${countrySeoTitles[country][locale]} | Sweezy`, description: item.description[locale], alternates: buildLocaleAlternates(locale, `/countries/${country}`), openGraph: { title: item.title[locale], description: item.description[locale], url: `${BASE_URL}${countryPath(locale, country)}`, images: [{ url: image, alt: item.alt[locale] }] }, twitter: { card: "summary_large_image", images: [{ url: image, alt: item.alt[locale] }] } };
}
export default function CountryHub({ params }: { params: { locale: string; country: string } }) {
  if (!isLocale(params.locale) || !isCountry(params.country)) notFound();
  const locale = params.locale, country = params.country, item = countryData[country], c = dachCopy[locale];
  const resources = country === "switzerland" ? [] : dachSupport[country];
  const url = `${BASE_URL}${countryPath(locale, country)}`;
  return <main className={styles.main} lang={locale}><div className={styles.shell}>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: item.title[locale], description: item.description[locale], url, inLanguage: locale, about: { "@type": "Country", name: item.name[locale] }, mainEntity: { "@type": "ItemList", itemListElement: DACH_TOPICS.map((topic, i) => ({ "@type": "ListItem", position: i + 1, name: topicNames[topic][locale], url: `${BASE_URL}${topicHref(locale, country, topic)}` })) } }} />
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb"><Link href={`/${locale}`}>Sweezy</Link><span>/</span><Link href={`/${locale}/countries`}>DACH</Link><span>/ {item.name[locale]}</span></nav>
    <header className={styles.hero}><div><p className={styles.eyebrow}>SWEEZY / {item.code}</p><h1>{item.title[locale]}</h1><p>{item.description[locale]}</p></div><div className={styles.heroPhoto}><Image src={item.image} alt={item.alt[locale]} fill priority sizes="(max-width: 850px) 100vw, 590px" /></div></header>
    <section className={styles.section}><h2>{c.topics}</h2><div className={styles.topics}>{DACH_TOPICS.map((topic, index) => <article className={styles.topic} key={topic}><small>0{index + 1} / {item.code}</small><h3>{topicNames[topic][locale]}</h3><Link href={topicHref(locale, country, topic)} className={styles.link}>{c.open} →</Link></article>)}</div></section>
    <p className={styles.note}>{c.scope}</p>
    {CITY_SLUGS.filter(city => dachCities[city].country === country).map(city => <section className={styles.section} key={city}><h2>{dachCities[city].name[locale]}</h2><p>{dachCities[city].description[locale]}</p><Link className={styles.link} href={cityPath(locale,city)}>{c.open}: {dachCities[city].name[locale]} →</Link></section>)}
    <LeadMagnetBanner locale={locale} asset={item.starter} placement={`country-${country}`} />
    {country === "switzerland" && <section className={styles.section} id="business"><h2>{DOWNLOADS["business-ch"].title[locale]}</h2><p>{c.businessNote}</p><div className={styles.sourceList}><Link href="/uk/blog/biznes-u-shveytcariyi-dlya-ukrayintsiv">{c.businessAction} →</Link><Link href={`/${locale}/guides`}>{locale === "uk" ? "Гіди по кантонах" : locale === "de" ? "Kantonale Ratgeber" : "Canton guides"} →</Link><Link href="/uk/services">{c.services} (UK) →</Link></div></section>}
    {resources.length > 0 && <section className={styles.section}><h2>{c.services}</h2><div className={styles.directory}>{resources.map(resource => <article className={styles.topic} key={resource.id}><small>{resource.city} / {resource.kind[locale]}</small><h3>{resource.name}</h3><p>{resource.description[locale]}</p><div className={styles.sourceList}><a href={resource.url} target="_blank" rel="noreferrer noopener" data-service={resource.id} data-service-action="website">{c.open} ↗</a>{resource.phone && <a href={`tel:${resource.phone}`} data-service={resource.id} data-service-action="phone">{resource.phone}</a>}{resource.email && <a href={`mailto:${resource.email}`} data-service={resource.id} data-service-action="email">Email ↗</a>}</div></article>)}</div></section>}
    <LeadMagnetBanner locale={locale} asset={item.business} placement={`country-business-${country}`} />
    <section className={styles.section}><h2>{c.sources}</h2><p>{c.reviewed}: <time dateTime={REVIEWED_AT}>{new Date(`${REVIEWED_AT}T12:00:00Z`).toLocaleDateString(locale === "uk" ? "uk-UA" : locale === "de" ? "de-DE" : "en-GB")}</time></p><ul className={styles.sourceList}>{countrySources[country].map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer noopener">{source.name} ↗</a></li>)}</ul></section>
    <section className={styles.section}><h2>{c.other}</h2><CountryCards locale={locale} exclude={country} /></section>
  </div></main>;
}
