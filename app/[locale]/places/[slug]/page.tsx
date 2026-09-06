import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildLocaleAlternates, BASE_URL } from "../../../../lib/alternates";
import { buildDestinationEditorial } from "../../../../data/destination-editorial";
import { getDestinationDepth } from "../../../../data/destination-depth";
import { destinationImage, getTravelDestination, travelDestinations } from "../../../../data/travel-destinations";
import imageCredits from "../../../../data/destination-image-credits.json";
import { isLocale } from "../../../../lib/blog";
import type { Locale } from "../../../../lib/i18n";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { DestinationLocator } from "./DestinationLocator";
import styles from "../travel.module.css";

const OESCHINEN_REVIEW = {
  date: "2026-09-07",
  url: "https://www.oeschinensee.ch/en/",
  en: "Before travelling, check the operator's live trail and lift status and the reservation rules for your ticket. The direct path from the upper station to the lake takes about 20 minutes; longer panorama hikes are separate routes. Weather and closures can change your plan.",
  uk: "Перед поїздкою перевірте актуальний стан стежок і підйомника та правила бронювання для вашого квитка на сайті оператора. Прямий шлях від верхньої станції до озера займає близько 20 хвилин; довші панорамні походи — окремі маршрути. Погода й закриття можуть змінити план.",
  de: "Prüfen Sie vor der Anreise den aktuellen Weg- und Bahnstatus sowie die Reservierungsregeln für Ihr Ticket beim Betreiber. Der direkte Weg von der Bergstation zum See dauert etwa 20 Minuten; längere Panoramawanderungen sind eigene Routen. Wetter und Sperrungen können den Plan ändern.",
};

const COPY: Record<Locale, { home: string; places: string; why: string; highlights: string; plan: string; season: string; duration: string; arrival: string; tip: string; gallery: string; source: string; related: string; map: string; answer: string; applies: string; appliesValue: string; reviewed: string; official: string }> = {
  en: { home: "Home", places: "Places", why: "Why go", highlights: "What to see", plan: "Plan your visit", season: "Best time", duration: "Time needed", arrival: "Getting there", tip: "Practical tip", gallery: "See the landscape", source: "Destination facts reviewed using official Switzerland Tourism information.", related: "Continue exploring", map: "Open in Maps", answer: "Quick answer", applies: "Useful for", appliesValue: "Independent day-trip and itinerary planning", reviewed: "Last reviewed", official: "Official destination source" },
  uk: { home: "Головна", places: "Місця", why: "Чому варто поїхати", highlights: "Що подивитися", plan: "Сплануйте поїздку", season: "Коли їхати", duration: "Скільки часу", arrival: "Як дістатися", tip: "Практична порада", gallery: "Подивіться краєвид", source: "Факти про місце перевірено за офіційними матеріалами Switzerland Tourism.", related: "Продовжити подорож", map: "Відкрити на мапі", answer: "Коротка відповідь", applies: "Для кого", appliesValue: "Для самостійної одноденної поїздки або маршруту", reviewed: "Перевірено", official: "Офіційне джерело про місце" },
  de: { home: "Startseite", places: "Orte", why: "Warum hinfahren", highlights: "Was ansehen", plan: "Besuch planen", season: "Beste Zeit", duration: "Zeitbedarf", arrival: "Anreise", tip: "Praktischer Tipp", gallery: "Landschaft ansehen", source: "Fakten mit offiziellen Informationen von Schweiz Tourismus geprüft.", related: "Weiter entdecken", map: "In Maps öffnen", answer: "Kurzantwort", applies: "Geeignet für", appliesValue: "Selbstständige Tagesausflüge und Reiseplanung", reviewed: "Geprüft", official: "Offizielle Reisezielquelle" },
};

const DEPTH_COPY: Record<Locale, { guide: string; choose: string; bestFor: string; route: string; watch: string; checklist: string; sources: string; planning: string; planningBody: string; planningCta: string }> = {
  en: { guide: "In-depth guide", choose: "Choose your version of the day", bestFor: "Best for", route: "Plan", watch: "Check first", checklist: "Before leaving", sources: "Sources and review", planning: "Plan the whole trip", planningBody: "Transport, weather, maps and a backup route — one practical checklist for travelling around Switzerland.", planningCta: "Open travel planner" },
  uk: { guide: "Детальний путівник", choose: "Оберіть свій формат дня", bestFor: "Для кого", route: "План", watch: "Спочатку перевірте", checklist: "Перед виїздом", sources: "Джерела й перевірка", planning: "Сплануйте всю поїздку", planningBody: "Транспорт, погода, карти й запасний маршрут — один практичний чекліст для подорожей Швейцарією.", planningCta: "Відкрити планувальник" },
  de: { guide: "Ausführlicher Guide", choose: "Passenden Tagesplan wählen", bestFor: "Geeignet für", route: "Plan", watch: "Zuerst prüfen", checklist: "Vor der Abfahrt", sources: "Quellen und Prüfung", planning: "Ganze Reise planen", planningBody: "Verkehr, Wetter, Karten und Ersatzroute — eine praktische Checkliste für Reisen durch die Schweiz.", planningCta: "Reiseplaner öffnen" },
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
  const depthCopy = DEPTH_COPY[locale];
  const operatorReview = place.slug === "oeschinen-lake" ? OESCHINEN_REVIEW : null;
  const editorial = buildDestinationEditorial(place, locale);
  const depth = getDestinationDepth(place.slug);
  const faq = depth ? [...depth.faq.map((item) => ({ question: item.question[locale], answer: item.answer[locale] })), ...editorial.faq] : editorial.faq;
  const citations = Array.from(new Set([place.sourceUrl, ...(operatorReview ? [operatorReview.url] : []), ...(depth ? depth.sources.map((source) => source.url) : [])]));
  const additionalSources = depth?.sources.filter((source) => source.url !== place.sourceUrl) ?? [];
  const related = travelDestinations.filter((item) => item.slug !== place.slug && (item.category === place.category || item.region[locale].split(" · ")[0] === place.region[locale].split(" · ")[0])).slice(0, 3);
  const credits = (imageCredits as Record<string, Credit[]>)[place.slug] || [];
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "TouristAttraction", name: place.title[locale], description: place.description[locale], image: [0, 1, 2].map((index) => `${BASE_URL}${destinationImage(place, index)}`), url: `${BASE_URL}/${locale}/places/${place.slug}`, geo: { "@type": "GeoCoordinates", latitude: place.coordinates.latitude, longitude: place.coordinates.longitude }, touristType: [place.category, "nature", "culture"] },
    { "@type": "WebPage", name: place.title[locale], description: place.summary[locale], url: `${BASE_URL}/${locale}/places/${place.slug}`, inLanguage: locale, ...(depth ? { dateModified: depth.reviewedAt } : {}), citation: citations, about: { "@type": "TouristAttraction", name: place.title[locale] } },
    { "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
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

      <section className={styles.answerPanel} aria-labelledby="destination-short-answer">
        <div>
          <p className={styles.eyebrow}>{copy.answer}</p>
          <h2 id="destination-short-answer">{place.summary[locale]}</h2>
          <dl>
            <div><dt>{copy.applies}</dt><dd>{copy.appliesValue}</dd></div>
            <div><dt>{copy.season}</dt><dd>{place.season[locale]}</dd></div>
            <div><dt>{copy.duration}</dt><dd>{place.duration[locale]}</dd></div>
          </dl>
        </div>
        <a href={place.sourceUrl} target="_blank" rel="noreferrer noopener"><span>{copy.official}</span><strong>Switzerland Tourism ↗</strong></a>
      </section>

      {operatorReview && <section className={styles.experience}>
        <p className={styles.eyebrow}>{copy.tip}</p>
        <div><h2>{copy.plan}</h2><p>{operatorReview[locale]}</p><p><a href={operatorReview.url} target="_blank" rel="noreferrer noopener">Oeschinensee ↗</a> · {copy.reviewed}: <time dateTime={operatorReview.date}>{operatorReview.date}</time></p></div>
      </section>}

      <div className={styles.body}>
        <div className={styles.prose}><h2>{copy.why}</h2><p>{place.description[locale]}</p><p>{place.whyVisit[locale]}</p><h2>{copy.highlights}</h2><ul className={styles.highlights}>{place.highlights[locale].map((item) => <li key={item}>↗ {item}</li>)}</ul></div>
        <aside className={styles.aside}><p className={styles.eyebrow}>{copy.plan}</p><h2>{place.title[locale]}</h2><dl><div><dt>{copy.season}</dt><dd>{place.season[locale]}</dd></div><div><dt>{copy.duration}</dt><dd>{place.duration[locale]}</dd></div><div><dt>{copy.arrival}</dt><dd>{place.arrival[locale]}</dd></div><div><dt>{copy.tip}</dt><dd>{place.tip[locale]}</dd></div></dl><a className={styles.mapLink} href={`https://www.google.com/maps/search/?api=1&query=${place.coordinates.latitude},${place.coordinates.longitude}`} target="_blank" rel="noreferrer noopener">{copy.map} ↗</a></aside>
      </div>

      <section className={styles.experience}><p className={styles.eyebrow}>{place.region[locale]}</p><div><h2>{editorial.labels.experience}</h2><p>{editorial.experience}</p></div></section>

      {depth ? <section className={styles.depthGuide} aria-labelledby="destination-depth-title">
        <div className={styles.depthIntro}>
          <p className={styles.eyebrow}>{depthCopy.guide}</p>
          <h2 id="destination-depth-title">{place.title[locale]}</h2>
          <p>{depth.lead[locale]}</p>
        </div>
        <div className={styles.depthChapters}>{depth.sections.map((section, index) => <article key={section.title[locale]}>
          <span>0{index + 1}</span><div><h3>{section.title[locale]}</h3>{section.paragraphs[locale].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </article>)}</div>
      </section> : null}

      {depth ? <section className={styles.tripOptions} aria-labelledby="trip-options-title">
        <div className={styles.sectionLead}><p className={styles.eyebrow}>01 — 03</p><h2 id="trip-options-title">{depthCopy.choose}</h2></div>
        <div className={styles.optionGrid}>{depth.options.map((option, index) => <article key={option.title[locale]}><span>0{index + 1}</span><h3>{option.title[locale]}</h3><dl><div><dt>{depthCopy.bestFor}</dt><dd>{option.bestFor[locale]}</dd></div><div><dt>{depthCopy.route}</dt><dd>{option.plan[locale]}</dd></div><div><dt>{depthCopy.watch}</dt><dd>{option.watch[locale]}</dd></div></dl></article>)}</div>
      </section> : null}
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

      {depth ? <section className={styles.depthChecklist} aria-labelledby="depth-checklist-title"><div><p className={styles.eyebrow}>{depthCopy.checklist}</p><h2 id="depth-checklist-title">{depthCopy.checklist}</h2></div><ol>{depth.checklist[locale].map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></section> : null}

      <section className={styles.faq}><div className={styles.sectionLead}><p className={styles.eyebrow}>FAQ</p><h2>{editorial.labels.faq}</h2></div><div>{faq.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div></section>

      <aside className={styles.planningBridge}><div><p className={styles.eyebrow}>{depthCopy.planning}</p><h2>{depthCopy.planning}</h2><p>{depthCopy.planningBody}</p></div><Link href={`/${locale}/planning`}>{depthCopy.planningCta} ↗</Link></aside>

      <div className={styles.source}><p>{depth ? `${depthCopy.sources}: ${depth.reviewedAt}.` : copy.source}</p><a href={place.sourceUrl} target="_blank" rel="noreferrer noopener">Switzerland Tourism ↗</a>{additionalSources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer noopener">{source.name} ↗</a>)}{credits.length ? <span className={styles.credits}>Images: {credits.map((credit, index) => <a key={credit.pageUrl} href={credit.pageUrl} target="_blank" rel="noreferrer noopener">{credit.creator} · {credit.license}{index < credits.length - 1 ? ", " : ""}</a>)}</span> : null}</div>
      {related.length ? <section className={styles.related}><h2>{copy.related}</h2><div className={styles.relatedGrid}>{related.map((item) => <Link key={item.slug} href={`/${locale}/places/${item.slug}`} className={styles.relatedCard}><p className={styles.eyebrow}>{item.region[locale]}</p><h3>{item.title[locale]}</h3><span>{copy.related} ↗</span></Link>)}</div></section> : null}
    </article>
  </main>;
}
