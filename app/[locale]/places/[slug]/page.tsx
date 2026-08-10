import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildLocaleAlternates, BASE_URL } from "../../../../lib/alternates";
import { buildDestinationEditorial } from "../../../../data/destination-editorial";
import { destinationImage, getTravelDestination, travelDestinations } from "../../../../data/travel-destinations";
import imageCredits from "../../../../data/destination-image-credits.json";
import { isLocale } from "../../../../lib/blog";
import type { Locale } from "../../../../lib/i18n";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { DestinationLocator } from "./DestinationLocator";
import styles from "../travel.module.css";

const COPY: Record<Locale, { home: string; places: string; why: string; highlights: string; plan: string; season: string; duration: string; arrival: string; tip: string; gallery: string; source: string; related: string; map: string }> = {
  en: { home: "Home", places: "Places", why: "Why go", highlights: "What to see", plan: "Plan your visit", season: "Best time", duration: "Time needed", arrival: "Getting there", tip: "Practical tip", gallery: "See the landscape", source: "Destination facts reviewed using official Switzerland Tourism information.", related: "Continue exploring", map: "Open in Maps" },
  uk: { home: "Головна", places: "Місця", why: "Чому варто поїхати", highlights: "Що подивитися", plan: "Сплануйте поїздку", season: "Коли їхати", duration: "Скільки часу", arrival: "Як дістатися", tip: "Практична порада", gallery: "Подивіться краєвид", source: "Факти про місце перевірено за офіційними матеріалами Switzerland Tourism.", related: "Продовжити подорож", map: "Відкрити на мапі" },
  de: { home: "Startseite", places: "Orte", why: "Warum hinfahren", highlights: "Was ansehen", plan: "Besuch planen", season: "Beste Zeit", duration: "Zeitbedarf", arrival: "Anreise", tip: "Praktischer Tipp", gallery: "Landschaft ansehen", source: "Fakten mit offiziellen Informationen von Schweiz Tourismus geprüft.", related: "Weiter entdecken", map: "In Maps öffnen" },
};

type Credit = { title: string; pageUrl: string; creator: string; license: string; licenseUrl: string };

export function generateStaticParams() {
  return ["en", "uk", "de"].flatMap((locale) => travelDestinations.map((place) => ({ locale, slug: place.slug })));
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const place = getTravelDestination(params.slug);
  if (!place) return {};
  const suffix = params.locale === "uk" ? "що подивитися, маршрут і поради" : params.locale === "de" ? "Sehenswürdigkeiten, Anreise und Tipps" : "things to see, route and travel tips";
  return {
    title: `${place.title[params.locale]}: ${suffix}`,
    description: `${place.summary[params.locale]} ${place.description[params.locale]}`.slice(0, 158),
    keywords: [place.title[params.locale], place.region[params.locale], params.locale === "uk" ? "куди поїхати у Швейцарії" : "Switzerland travel guide", params.locale === "uk" ? "що подивитися у Швейцарії" : "places to visit Switzerland"],
    alternates: buildLocaleAlternates(params.locale, `/places/${place.slug}`),
    openGraph: { title: place.title[params.locale], description: place.summary[params.locale], url: `${BASE_URL}/${params.locale}/places/${place.slug}`, type: "article", images: [{ url: destinationImage(place), width: 1600, height: 1200, alt: place.alt[params.locale][0] }] },
    twitter: { card: "summary_large_image", images: [destinationImage(place)] },
  };
}

export default function DestinationPage({ params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale)) notFound();
  const place = getTravelDestination(params.slug);
  if (!place) notFound();
  const locale = params.locale;
  const copy = COPY[locale];
  const editorial = buildDestinationEditorial(place, locale);
  const related = travelDestinations.filter((item) => item.slug !== place.slug && (item.category === place.category || item.region[locale].split(" · ")[0] === place.region[locale].split(" · ")[0])).slice(0, 3);
  const credits = (imageCredits as Record<string, Credit[]>)[place.slug] || [];
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "TouristAttraction", name: place.title[locale], description: place.description[locale], image: [0, 1, 2].map((index) => `${BASE_URL}${destinationImage(place, index)}`), url: `${BASE_URL}/${locale}/places/${place.slug}`, geo: { "@type": "GeoCoordinates", latitude: place.coordinates.latitude, longitude: place.coordinates.longitude }, touristType: [place.category, "nature", "culture"] },
    { "@type": "FAQPage", mainEntity: editorial.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
  ] };

  return <main lang={locale} className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\u003c") }} />
    <article className={styles.shell}>
      <Breadcrumb items={[{ name: copy.home, url: `/${locale}` }, { name: copy.places, url: `/${locale}/places` }, { name: place.title[locale], url: `${BASE_URL}/${locale}/places/${place.slug}` }]} />
      <header className={styles.detailHero}>
        <Image src={destinationImage(place)} alt={place.alt[locale][0]} fill priority sizes="100vw" />
        <div className={styles.shade} />
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{place.region[locale]} · {place.category}</p><h1>{place.title[locale]}</h1><p>{place.summary[locale]}</p>
          <div className={styles.facts}><div><span>{copy.season}</span><strong>{place.season[locale]}</strong></div><div><span>{copy.duration}</span><strong>{place.duration[locale]}</strong></div><div><span>{copy.arrival}</span><strong>{place.arrival[locale]}</strong></div></div>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.prose}><h2>{copy.why}</h2><p>{place.description[locale]}</p><p>{place.whyVisit[locale]}</p><h2>{copy.highlights}</h2><ul className={styles.highlights}>{place.highlights[locale].map((item) => <li key={item}>↗ {item}</li>)}</ul></div>
        <aside className={styles.aside}><p className={styles.eyebrow}>{copy.plan}</p><h2>{place.title[locale]}</h2><dl><div><dt>{copy.season}</dt><dd>{place.season[locale]}</dd></div><div><dt>{copy.duration}</dt><dd>{place.duration[locale]}</dd></div><div><dt>{copy.arrival}</dt><dd>{place.arrival[locale]}</dd></div><div><dt>{copy.tip}</dt><dd>{place.tip[locale]}</dd></div></dl><a className={styles.mapLink} href={`https://www.google.com/maps/search/?api=1&query=${place.coordinates.latitude},${place.coordinates.longitude}`} target="_blank" rel="noreferrer noopener">{copy.map} ↗</a></aside>
      </div>

      <section className={styles.experience}><p className={styles.eyebrow}>{place.region[locale]}</p><div><h2>{editorial.labels.experience}</h2><p>{editorial.experience}</p></div></section>
      <DestinationLocator locale={locale} title={place.title[locale]} region={place.region[locale]} latitude={place.coordinates.latitude} longitude={place.coordinates.longitude} />

      <section className={styles.routeSection}>
        <div className={styles.sectionLead}><p className={styles.eyebrow}>{editorial.labels.route}</p><h2>{editorial.labels.route}</h2><p>{editorial.labels.routeIntro}</p></div>
        <ol className={styles.routeGrid}>{editorial.route.map((step) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
      </section>

      <section><p className={styles.eyebrow}>{copy.gallery}</p><div className={styles.gallery}>{[1, 2].map((index) => <figure key={index}><Image src={destinationImage(place, index)} alt={place.alt[locale][index]} fill sizes="(max-width: 900px) 100vw, 60vw" /><figcaption>{place.alt[locale][index]}</figcaption></figure>)}</div></section>

      <section className={styles.prepare}>
        <div className={styles.sectionLead}><p className={styles.eyebrow}>{editorial.labels.prepare}</p><h2>{editorial.labels.prepare}</h2><p>{editorial.labels.prepareIntro}</p></div>
        <div className={styles.prepareGrid}>{editorial.preparation.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className={styles.faq}><div className={styles.sectionLead}><p className={styles.eyebrow}>FAQ</p><h2>{editorial.labels.faq}</h2></div><div>{editorial.faq.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div></section>

      <p className={styles.source}>{copy.source} <a href={place.sourceUrl} target="_blank" rel="noreferrer noopener">Switzerland Tourism ↗</a>{credits.length ? <span className={styles.credits}>Images: {credits.map((credit, index) => <a key={credit.pageUrl} href={credit.pageUrl} target="_blank" rel="noreferrer noopener">{credit.creator} · {credit.license}{index < credits.length - 1 ? ", " : ""}</a>)}</span> : null}</p>
      {related.length ? <section className={styles.related}><h2>{copy.related}</h2><div className={styles.relatedGrid}>{related.map((item) => <Link key={item.slug} href={`/${locale}/places/${item.slug}`} className={styles.relatedCard}><p className={styles.eyebrow}>{item.region[locale]}</p><h3>{item.title[locale]}</h3><span>{copy.related} ↗</span></Link>)}</div></section> : null}
    </article>
  </main>;
}
