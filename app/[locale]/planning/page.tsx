import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { buildLocaleAlternates, BASE_URL } from "../../../lib/alternates";
import { isLocale } from "../../../lib/blog";
import type { Locale } from "../../../lib/i18n";
import { Breadcrumb } from "../../components/Breadcrumb";
import { CorporateHero } from "../../components/CorporateHero";
import styles from "./planning.module.css";

const COPY: Record<Locale, {
  title: string; description: string; eyebrow: string; start: string; startBody: string;
  modes: { title: string; body: string; href: string }[];
  processTitle: string; process: { title: string; body: string }[];
  toolsTitle: string; toolsBody: string; checkTitle: string; checklist: string[];
  backupTitle: string; backupBody: string; faqTitle: string; faq: { q: string; a: string }[];
  reviewed: string; open: string; places: string;
}> = {
  en: {
    title: "Plan a trip in Switzerland without losing the day to logistics",
    description: "Practical Switzerland trip planner for public transport, mountain weather, official maps, day trips and backup routes.",
    eyebrow: "Sweezy travel planning", start: "Start with the shape of the day", startBody: "A useful plan begins with time, terrain and return transport — not a list of attractions. Choose one main landscape, define the last connection and build optional stops around that fixed route.",
    modes: [
      { title: "Easy day trip", body: "One destination, public transport both ways and a short signed walk. Best when weather is mixed or you are learning the network.", href: "/en/places/category/lakes" },
      { title: "Alpine panorama", body: "One valley access, one mountain railway and one viewpoint. Check conditions at altitude and keep a lower backup.", href: "/en/places/category/mountains" },
      { title: "Slow weekend", body: "Stay in one region and split viewpoints, villages and nature across two days. Less transfer risk, more useful weather flexibility.", href: "/en/places" },
    ],
    processTitle: "A four-check planning method", process: [
      { title: "Set the return first", body: "Check the final practical connection before choosing stops. Mountain railways, boats and local buses may finish earlier than mainline trains." },
      { title: "Read altitude, not only city weather", body: "Valley sunshine does not guarantee clear, warm conditions at a viewpoint. Compare forecast, warnings, webcams and live operating status." },
      { title: "Confirm the route category", body: "A cable car can shorten access but the trail beyond it may still be a mountain or alpine hiking route. Use an official map and follow local signs." },
      { title: "Keep one real backup", body: "Choose a lower village, museum, lakeside route or shorter walk in the same transport corridor. A backup in another canton is not useful when weather changes." },
    ],
    toolsTitle: "Official tools worth opening", toolsBody: "Sweezy organises the decision. Operators and authorities remain the source for live departures, warnings, closures and route status.",
    checkTitle: "Ten minutes before leaving", checklist: ["Refresh SBB connection and platform", "Check MeteoSwiss warnings and forecast at altitude", "Open route in swisstopo and save offline area", "Check lift, boat or trail operator status", "Save last return connection", "Carry water, layers and sun/rain protection"],
    backupTitle: "What this planner does not promise", backupBody: "Opening hours, fares, weather and trail access change. Sweezy provides an editorial starting point, not live operational confirmation. Recheck official sources on travel day and follow closures and local instructions.",
    faqTitle: "Planning questions", faq: [
      { q: "Can I plan Swiss day trips without a car?", a: "Yes, many destinations connect well with train, bus, boat or mountain railway. Check the full return journey because the last local segment may run less frequently." },
      { q: "Which source should I use for hiking routes?", a: "Use swisstopo or SwitzerlandMobility for official map context, then check the local operator or destination for current closures and operating status." },
      { q: "How many places should fit into one day?", a: "Usually one main destination plus one nearby optional stop. In mountain regions, extra transfers make the plan fragile and reduce time at the place itself." },
    ],
    reviewed: "Planning sources checked 7 September 2026", open: "Open official tool", places: "Explore places",
  },
  uk: {
    title: "Сплануйте подорож Швейцарією без дня, втраченого на логістику",
    description: "Практичний планувальник подорожей Швейцарією: транспорт, гірська погода, офіційні карти, одноденні маршрути й запасний план.",
    eyebrow: "Планування подорожей Sweezy", start: "Почніть із формату дня", startBody: "Хороший план починається з часу, рельєфу й зворотного транспорту, а не зі списку пам’яток. Оберіть один головний ландшафт, зафіксуйте останнє сполучення й лише тоді додайте необов’язкові зупинки.",
    modes: [
      { title: "Легка одноденна поїздка", body: "Одне місце, громадський транспорт в обидва боки й коротка маркована прогулянка. Підходить для мінливої погоди та першого знайомства з мережею.", href: "/uk/places/category/lakes" },
      { title: "Альпійська панорама", body: "Один під’їзд із долини, одна канатна дорога й один майданчик. Перевірте погоду на висоті та майте нижчий запасний маршрут.", href: "/uk/places/category/mountains" },
      { title: "Повільний вікенд", body: "Зупиніться в одному регіоні й розділіть панорами, села та природу на два дні. Менше ризику пересадок, більше свободи через погоду.", href: "/uk/places" },
    ],
    processTitle: "Метод чотирьох перевірок", process: [
      { title: "Спочатку визначте повернення", body: "Знайдіть останнє практичне сполучення до вибору зупинок. Канатні дороги, кораблі й локальні автобуси можуть завершувати роботу раніше за магістральні потяги." },
      { title: "Дивіться погоду на висоті", body: "Сонце в долині не гарантує тепла й видимості на майданчику. Порівняйте прогноз, попередження, вебкамери та поточний статус роботи." },
      { title: "Перевірте категорію стежки", body: "Підйомник скорочує шлях, але стежка після нього все одно може бути гірською або альпійською. Користуйтеся офіційною картою й місцевими вказівниками." },
      { title: "Підготуйте реальний план B", body: "Оберіть нижче село, музей, береговий маршрут або коротшу прогулянку в тому самому транспортному напрямі. Запасний варіант в іншому кантоні не допоможе при раптовій зміні погоди." },
    ],
    toolsTitle: "Офіційні інструменти", toolsBody: "Sweezy допомагає скласти рішення. Актуальні відправлення, попередження, закриття й стан маршруту перевіряйте в операторів та органів влади.",
    checkTitle: "За десять хвилин до виходу", checklist: ["Оновіть сполучення й платформу в SBB", "Перевірте MeteoSwiss і прогноз на потрібній висоті", "Відкрийте маршрут у swisstopo й збережіть ділянку офлайн", "Перевірте статус підйомника, корабля або стежки", "Збережіть останнє зворотне сполучення", "Візьміть воду, теплий шар і захист від сонця та дощу"],
    backupTitle: "Чого цей планувальник не обіцяє", backupBody: "Години роботи, ціни, погода й доступ до стежок змінюються. Sweezy дає редакційну основу, але не замінює оперативне підтвердження. У день поїздки перевірте офіційні джерела й дотримуйтеся закриттів та місцевих вказівок.",
    faqTitle: "Запитання про планування", faq: [
      { q: "Чи можна подорожувати Швейцарією без автомобіля?", a: "Так, багато місць добре пов’язані потягами, автобусами, кораблями й канатними дорогами. Перевіряйте весь зворотний шлях: остання локальна ділянка може ходити рідше." },
      { q: "Де перевіряти пішохідні маршрути?", a: "Використовуйте swisstopo або SwitzerlandMobility для карти, а поточні закриття та роботу інфраструктури перевіряйте на сайті місцевого оператора." },
      { q: "Скільки місць планувати на один день?", a: "Зазвичай одне головне місце й одна необов’язкова зупинка поруч. У горах зайві пересадки роблять план крихким і забирають час у самого маршруту." },
    ],
    reviewed: "Джерела для планування перевірено 7 вересня 2026", open: "Відкрити офіційний сервіс", places: "Обрати місце",
  },
  de: {
    title: "Schweiz-Reise planen, ohne den Tag an Logistik zu verlieren",
    description: "Praktischer Schweiz-Reiseplaner für öffentlichen Verkehr, Bergwetter, offizielle Karten, Tagesausflüge und Ersatzrouten.",
    eyebrow: "Sweezy Reiseplanung", start: "Mit der Form des Tages beginnen", startBody: "Ein guter Plan beginnt mit Zeit, Gelände und Rückfahrt — nicht mit einer Liste von Sehenswürdigkeiten. Eine Hauptlandschaft wählen, letzte Verbindung festlegen und optionale Stopps um diese Route bauen.",
    modes: [
      { title: "Einfacher Tagesausflug", body: "Ein Ziel, öffentlicher Verkehr in beide Richtungen und ein kurzer markierter Spaziergang. Gut bei wechselhaftem Wetter oder zum Kennenlernen des Netzes.", href: "/de/places/category/lakes" },
      { title: "Alpenpanorama", body: "Ein Talzugang, eine Bergbahn und ein Aussichtspunkt. Bedingungen in der Höhe prüfen und eine tiefere Alternative bereithalten.", href: "/de/places/category/mountains" },
      { title: "Ruhiges Wochenende", body: "In einer Region bleiben und Aussicht, Dörfer und Natur auf zwei Tage verteilen. Weniger Transferrisiko, mehr Wetterflexibilität.", href: "/de/places" },
    ],
    processTitle: "Planung mit vier Prüfungen", process: [
      { title: "Rückfahrt zuerst setzen", body: "Letzte praktische Verbindung prüfen, bevor Stopps gewählt werden. Bergbahnen, Schiffe und lokale Busse enden oft früher als Fernzüge." },
      { title: "Höhenwetter statt Stadtwetter", body: "Sonne im Tal garantiert keine klare, warme Aussicht. Prognose, Warnungen, Webcams und Betriebsstatus vergleichen." },
      { title: "Wegkategorie bestätigen", body: "Eine Bergbahn verkürzt den Zugang, macht den folgenden Weg aber nicht automatisch leicht. Offizielle Karte und lokale Signalisation beachten." },
      { title: "Echten Plan B behalten", body: "Ein tieferes Dorf, Museum, Uferweg oder eine kürzere Wanderung im selben Verkehrskorridor wählen. Eine Alternative in einem anderen Kanton hilft bei Wetterwechsel kaum." },
    ],
    toolsTitle: "Offizielle Werkzeuge", toolsBody: "Sweezy strukturiert die Entscheidung. Live-Abfahrten, Warnungen, Sperrungen und Wegstatus bleiben Sache von Betreibern und Behörden.",
    checkTitle: "Zehn Minuten vor Abfahrt", checklist: ["SBB-Verbindung und Gleis aktualisieren", "MeteoSchweiz-Warnungen und Höhenprognose prüfen", "Route in swisstopo öffnen und Gebiet offline speichern", "Status von Bahn, Schiff oder Weg prüfen", "Letzte Rückverbindung speichern", "Wasser, Schichten sowie Sonnen- und Regenschutz mitnehmen"],
    backupTitle: "Was dieser Planer nicht verspricht", backupBody: "Öffnungszeiten, Preise, Wetter und Wegzugang ändern sich. Sweezy bietet einen redaktionellen Startpunkt, keine Live-Betriebsbestätigung. Offizielle Quellen am Reisetag erneut prüfen und Sperrungen respektieren.",
    faqTitle: "Fragen zur Planung", faq: [
      { q: "Kann ich Schweizer Tagesausflüge ohne Auto planen?", a: "Ja, viele Ziele sind mit Bahn, Bus, Schiff oder Bergbahn gut verbunden. Die ganze Rückreise prüfen, weil der letzte lokale Abschnitt seltener fahren kann." },
      { q: "Welche Quelle eignet sich für Wanderrouten?", a: "swisstopo oder SchweizMobil für den Kartenkontext nutzen; aktuelle Sperrungen und Betriebszustände beim lokalen Betreiber prüfen." },
      { q: "Wie viele Orte passen in einen Tag?", a: "Meist ein Hauptziel plus ein naher optionaler Stopp. In Bergregionen machen zusätzliche Umstiege den Plan anfällig und verkürzen die Zeit vor Ort." },
    ],
    reviewed: "Planungsquellen geprüft am 7. September 2026", open: "Offizielles Werkzeug öffnen", places: "Orte entdecken",
  },
};

const TOOLS = [
  { name: "SBB", url: "https://www.sbb.ch/en", role: { en: "Timetable, live transport information and tickets", uk: "Розклад, оперативна інформація про транспорт і квитки", de: "Fahrplan, Live-Verkehrsinformation und Tickets" } },
  { name: "MeteoSwiss", url: "https://www.meteoswiss.admin.ch/", role: { en: "Official forecast and hazard warnings", uk: "Офіційний прогноз і попередження про небезпеку", de: "Offizielle Prognose und Gefahrenwarnungen" } },
  { name: "swisstopo", url: "https://www.swisstopo.admin.ch/en/map-viewer-mapgeoadminch", role: { en: "Federal maps, terrain and offline planning", uk: "Федеральні карти, рельєф і офлайн-планування", de: "Bundeskarten, Gelände und Offline-Planung" } },
  { name: "SwitzerlandMobility", url: "https://schweizmobil.ch/en", role: { en: "Signed hiking, cycling and accessible routes", uk: "Марковані пішохідні, велосипедні й безбар’єрні маршрути", de: "Markierte Wander-, Velo- und hindernisfreie Routen" } },
] as const;

const FEATURED_REGIONS = [
  { place: "lavaux-vineyards", canton: "vaud", title: { en: "Lavaux and Vaud", uk: "Лаво й кантон Во", de: "Lavaux und Waadt" }, body: { en: "UNESCO vineyard paths, Lake Geneva transport and the practical Vaud context for a French-speaking stay.", uk: "Виноградні стежки UNESCO, транспорт біля Женевського озера й практичний контекст франкомовного кантону Во.", de: "UNESCO-Rebwege, Verkehr am Genfersee und praktischer Waadt-Kontext für einen französischsprachigen Aufenthalt." } },
  { place: "lake-murten", canton: "fribourg", title: { en: "Lake Murten and Fribourg", uk: "Озеро Муртен і Фрібур", de: "Murtensee und Freiburg" }, body: { en: "A bilingual city-and-lake route linked to the Fribourg guide for registration, local offices and daily life.", uk: "Двомовний маршрут містом і озером, пов’язаний із гідом Фрібура про реєстрацію, офіси й повсякденне життя.", de: "Zweisprachige Stadt-und-See-Route mit Freiburg-Guide zu Anmeldung, Behörden und Alltag." } },
  { place: "bern-old-town", canton: "bern", title: { en: "Bern city and canton", uk: "Місто й кантон Берн", de: "Stadt und Kanton Bern" }, body: { en: "A walkable UNESCO capital route paired with the bilingual canton guide for newcomers planning more than a day trip.", uk: "Пішохідний маршрут столицею UNESCO плюс двомовний гід кантону для тих, хто планує не лише одноденну поїздку.", de: "Begehbare UNESCO-Hauptstadtroute plus zweisprachiger Kantonsguide für mehr als einen Tagesausflug." } },
] as const;

const FEATURED_COPY = {
  en: { eyebrow: "Place + canton", title: "Plan the landscape and the life around it", place: "Open place guide", canton: "Open canton guide" },
  uk: { eyebrow: "Місце + кантон", title: "Плануйте краєвид і життя навколо нього", place: "Відкрити гід місця", canton: "Відкрити гід кантону" },
  de: { eyebrow: "Ort + Kanton", title: "Landschaft und Alltag zusammen planen", place: "Ortsguide öffnen", canton: "Kantonsguide öffnen" },
} satisfies Record<Locale, { eyebrow: string; title: string; place: string; canton: string }>;

const HERO_UI = {
  en: { code: "PLANNING / 01", panel: "Trip control", signals: [["Transport", "SBB timetable"], ["Weather", "MeteoSwiss"], ["Route", "Official maps"]] },
  uk: { code: "ПЛАНУВАННЯ / 01", panel: "Контроль подорожі", signals: [["Транспорт", "Розклад SBB"], ["Погода", "MeteoSwiss"], ["Маршрут", "Офіційні карти"]] },
  de: { code: "PLANUNG / 01", panel: "Reisecheck", signals: [["Verkehr", "SBB-Fahrplan"], ["Wetter", "MeteoSchweiz"], ["Route", "Offizielle Karten"]] },
} satisfies Record<Locale, { code: string; panel: string; signals: [string, string][] }>;

export function generateStaticParams() { return ["en", "uk", "de"].map((locale) => ({ locale })); }

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const copy = COPY[params.locale];
  return { title: copy.title, description: copy.description, alternates: buildLocaleAlternates(params.locale, "/planning"), openGraph: { title: copy.title, description: copy.description, url: `${BASE_URL}/${params.locale}/planning`, type: "website" } };
}

export default function PlanningPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const copy = COPY[locale];
  const featuredCopy = FEATURED_COPY[locale];
  const heroUi = HERO_UI[locale];
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", name: copy.title, description: copy.description, url: `${BASE_URL}/${locale}/planning`, inLanguage: locale, dateModified: "2026-09-07", citation: TOOLS.map((tool) => tool.url) },
    { "@type": "ItemList", name: copy.toolsTitle, numberOfItems: TOOLS.length, itemListElement: TOOLS.map((tool, index) => ({ "@type": "ListItem", position: index + 1, name: tool.name, url: tool.url })) },
    { "@type": "FAQPage", mainEntity: copy.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) },
  ] };
  return <main lang={locale} className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <article className={styles.shell}>
      <Breadcrumb items={[{ name: locale === "uk" ? "Головна" : locale === "de" ? "Start" : "Home", url: `/${locale}` }, { name: copy.eyebrow, url: `${BASE_URL}/${locale}/planning` }]} />
      <CorporateHero
        companion="planning"
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        sectionCode={heroUi.code}
        panelLabel={heroUi.panel}
        signals={heroUi.signals.map(([label, value]) => ({ label, value }))}
        primaryAction={{ label: copy.places, href: `/${locale}/places` }}
      />
      <section className={styles.start}><div><p>{copy.eyebrow}</p><h2>{copy.start}</h2><span>{copy.startBody}</span></div><div className={styles.modes}>{copy.modes.map((mode, index) => <Link key={mode.title} href={mode.href}><small>0{index + 1}</small><Image src={["/destinations/swiss-discovery-lavaux.webp", "/destinations/swiss-discovery-matterhorn.webp", "/images/canton-lucerne.jpg"][index]} width={480} height={300} alt="" sizes="(max-width: 900px) 90vw, 30vw" /><h3>{mode.title}</h3><p>{mode.body}</p><b aria-hidden>↗</b></Link>)}</div></section>
      <section className={styles.featured}><div><p>{featuredCopy.eyebrow}</p><h2>{featuredCopy.title}</h2></div><div className={styles.featuredGrid}>{FEATURED_REGIONS.map((item, index) => <article key={item.place}><small>0{index + 1}</small><h3>{item.title[locale]}</h3><p>{item.body[locale]}</p><div><Link href={`/${locale}/places/${item.place}`}>{featuredCopy.place} ↗</Link><Link href={`/${locale}/guides/${item.canton}`}>{featuredCopy.canton} ↗</Link></div></article>)}</div></section>
      <section className={styles.process}><div><p>{copy.eyebrow}</p><h2>{copy.processTitle}</h2></div><ol>{copy.process.map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol></section>
      <section className={styles.tools}><div><p>{copy.eyebrow}</p><h2>{copy.toolsTitle}</h2><span>{copy.toolsBody}</span></div><div>{TOOLS.map((tool, index) => <a key={tool.name} href={tool.url} target="_blank" rel="noreferrer noopener"><small>0{index + 1}</small><h3>{tool.name}</h3><p>{tool.role[locale]}</p><b>{copy.open} ↗</b></a>)}</div></section>
      <section className={styles.check}><div><p>{copy.eyebrow}</p><h2>{copy.checkTitle}</h2></div><ol>{copy.checklist.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></section>
      <aside className={styles.disclaimer}><p>{copy.eyebrow}</p><div><h2>{copy.backupTitle}</h2><span>{copy.backupBody}</span><small>{copy.reviewed}</small></div></aside>
      <section className={styles.faq}><div><p>FAQ</p><h2>{copy.faqTitle}</h2></div><div>{copy.faq.map((item) => <details key={item.q}><summary>{item.q}<span>+</span></summary><p>{item.a}</p></details>)}</div></section>
    </article>
  </main>;
}
