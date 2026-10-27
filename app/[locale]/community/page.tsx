import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildLocaleAlternates, BASE_URL } from "../../../lib/alternates";
import { isLocale } from "../../../lib/blog";
import { ENTITY_IDS } from "../../../lib/entities";
import { FACEBOOK_COMMUNITY_URL, TELEGRAM_URL } from "../../../lib/links";
import { DEFAULT_OG_IMAGE } from "../../../lib/social";
import { COUNTRIES, countryData, countryPath, topicHref } from "../../../data/dach";
import { SWEEZY_COMPANION } from "../../../data/companion";
import { DOWNLOADS, type DownloadId } from "../../../data/downloads";
import { Breadcrumb } from "../../components/Breadcrumb";
import { SweezyCompanion } from "../../components/SweezyCompanion";
import { CommunityStarter } from "../../components/CommunityStarter";
import { DownloadLink } from "../../components/DownloadLink";
import { JsonLd } from "../../components/seo/JsonLd";
import styles from "./community.module.css";

const COPY = {
  uk: {
    name: "Спільноти", home: "Головна",
    metaTitle: "Спільнота Sweezy: українці у Швейцарії · Telegram і Facebook",
    description: "Знайдіть своїх у Швейцарії: офіційні Telegram і Facebook спільноти Sweezy, обмін досвідом та корисні матеріали про переїзд, роботу й життя в DACH.",
    eyebrow: "SWEEZY / ЗНАЙДІТЬ СВОЇХ", title: "Свої люди.", titleEnd: "Навіть далеко від дому.",
    intro: "Нова країна — це ще й нові знайомства. Долучайтеся до українців і новоприбулих у Швейцарії: залишайтеся на зв’язку зі Sweezy та обмінюйтеся досвідом у Facebook-групі.",
    telegram: "Відкрити Telegram", facebook: "До Facebook-групи", heroNote: "Долучитися безкоштовно · Оберіть зручну платформу",
    poster: "Тут починається ваше «привіт».", john: "Ваш провідник Sweezy", greeting: "Привіт, я Джон!", scopeBadge: "ФОКУС: ШВЕЙЦАРІЯ",
    navLabel: "На цій сторінці", jumpLinks: ["Оберіть спільноту", "Ваш перший допис", "Корисні матеріали"],
    platformsEyebrow: "ДВА СПОСОБИ БУТИ ПОРУЧ", platformsTitle: "Де вам зручніше?", platformsBody: "Можна обрати одну платформу або залишатися з нами в обох.",
    platforms: {
      telegram: { tag: "ЗАЛИШАЙТЕСЯ НА ЗВ’ЯЗКУ", title: "Sweezy у вашій кишені.", body: "Наш Telegram — прямий шлях до Sweezy, нових матеріалів та оновлень проєкту.", features: ["Матеріали проєкту", "Зручний доступ із телефона"], cta: "Відкрити Telegram" },
      facebook: { tag: "ЗНАЙОМТЕСЯ Й ДІЛІТЬСЯ", title: "Досвід, який об’єднує.", body: "Facebook-група для знайомств, практичних запитань і розгорнутих дописів про життя у Швейцарії.", features: ["Обмін досвідом", "Простір для ваших дописів"], cta: "Відкрити Facebook-групу" },
    },
    topicsEyebrow: "ВІД ЗНАЙОМСТВА — ДО КОНКРЕТИКИ", topicsTitle: "З чим ви зараз розбираєтесь?", topicsBody: "Спочатку — корисний матеріал. Потім — ваш досвід і запитання для спільноти.",
    topics: [
      { title: "Перші документи", body: "Реєстрація та перші кроки у Швейцарії.", action: "Розібратися зі стартом" },
      { title: "Робота й можливості", body: "З чого почати пошук роботи у Швейцарії.", action: "Перейти до матеріалів" },
      { title: "Послуги своєю мовою", body: "Контакти, міста й мови послуг у трьох країнах.", action: "Відкрити каталог" },
      { title: "Власна справа", body: "Куди звертатися українцю для старту бізнесу в DACH.", action: "Порівняти країни" },
    ],
    pdfTitle: "Корисне можна взяти із собою.", pdfBody: "Збережіть гід до переїзду, першого замовлення або наступної поїздки.", pdfCta: "Усі PDF-гіди", pdfFree: "Безкоштовно · Без реєстрації", download: "Завантажити PDF",
    scopeEyebrow: "ШВЕЙЦАРІЯ + МАТЕРІАЛИ ПРО DACH", scopeTitle: "Спільнота поруч. Орієнтири — ширше.", scopeBody: "Нинішній фокус наших Telegram і Facebook — Швейцарія. Для Німеччини й Австрії вже є окремі розділи сайту з гідами та місцевими контактами.", countriesLabel: "Матеріали за країнами",
    rulesEyebrow: "ДОБРЕ БУТИ СЕРЕД СВОЇХ", rulesTitle: "Починаємо з поваги.",
    rules: [
      ["Говоріть по-людськи", "Повага до інших, їхнього досвіду й обставин."],
      ["Бережіть приватність", "Без паспортів, дозволів, домашніх адрес і чужих персональних даних."],
      ["Діліться чесно", "Без спаму, шахрайства, мови ворожнечі та оманливих пропозицій."],
    ],
    faqTitle: "Перед тим як долучитися",
    faq: [
      { q: "Чи безкоштовно долучитися?", a: "Так, Sweezy не бере плату за приєднання до цих спільнот. Для доступу можуть знадобитися обліковий запис платформи й схвалення вступу до групи. Діють правила Telegram і Facebook." },
      { q: "Де можна поставити запитання чи поділитися досвідом?", a: "Для дописів і обміну досвідом обирайте Facebook-групу та дотримуйтеся її правил. Telegram допомагає залишатися на зв’язку зі Sweezy. Перед публікацією сформулюйте запитання конкретно й не додавайте чутливих даних." },
      { q: "А якщо я в Німеччині чи Австрії?", a: "Наші поточні посилання на спільноти стосуються Швейцарії. Матеріали про реєстрацію, роботу й власну справу в Німеччині та Австрії доступні у відповідних розділах Sweezy. Окремих посилань на спільноти цих країн тут поки немає." },
      { q: "Чи можна покладатися на поради учасників?", a: "Особистий досвід допомагає зорієнтуватися. Для рішень щодо дозволів, податків, здоров’я або права звіряйте інформацію з компетентним органом чи фахівцем: обставини учасників можуть відрізнятися від ваших." },
    ],
  },
  en: {
    name: "Community", home: "Home",
    metaTitle: "Sweezy Community: Telegram & Facebook in Switzerland",
    description: "Find your people in Switzerland: official Sweezy Telegram and Facebook spaces, shared experience and practical resources for newcomers across DACH.",
    eyebrow: "SWEEZY / FIND YOUR PEOPLE", title: "Your people.", titleEnd: "Even far from home.",
    intro: "A new country also means new connections. Join Ukrainians and newcomers in Switzerland: keep in touch with Sweezy and exchange experiences in our Facebook group.",
    telegram: "Open Telegram", facebook: "Explore Facebook group", heroNote: "Free to join · Choose your preferred platform",
    poster: "Your first hello starts here.", john: "Your Sweezy guide", greeting: "Hey, I’m John!", scopeBadge: "FOCUS: SWITZERLAND",
    navLabel: "On this page", jumpLinks: ["Choose your community", "Your first post", "Useful resources"],
    platformsEyebrow: "TWO WAYS TO STAY CONNECTED", platformsTitle: "Where do you feel at home?", platformsBody: "Choose one platform, or stay connected on both.",
    platforms: {
      telegram: { tag: "KEEP SWEEZY CLOSE", title: "Sweezy in your pocket.", body: "Our Telegram is a direct connection to Sweezy, new resources and project updates.", features: ["Project resources", "Easy access on your phone"], cta: "Open Telegram" },
      facebook: { tag: "MEET PEOPLE & SHARE", title: "Experience brings us together.", body: "A Facebook group for connections, practical questions and longer posts about life in Switzerland.", features: ["Exchange experiences", "Space for your own posts"], cta: "Open Facebook group" },
    },
    topicsEyebrow: "FROM CONNECTION TO YOUR NEXT STEP", topicsTitle: "What are you figuring out?", topicsBody: "Start with a useful resource. Bring your own experience and questions to the community.",
    topics: [
      { title: "Your first documents", body: "Registration and first steps in Switzerland.", action: "Find your starting point" },
      { title: "Work & opportunities", body: "Where to start your job search in Switzerland.", action: "Explore resources" },
      { title: "Services in your language", body: "Contacts, locations and service languages across three countries.", action: "Explore directory (Ukrainian)" },
      { title: "Your own business", body: "Where Ukrainians can turn for business support across DACH.", action: "Compare countries (Ukrainian)" },
    ],
    pdfTitle: "Take something useful with you.", pdfBody: "Save a guide before your move, your first order or your next day trip.", pdfCta: "All PDF guides", pdfFree: "Free · No signup", download: "Download PDF",
    scopeEyebrow: "SWISS COMMUNITY + DACH RESOURCES", scopeTitle: "Close connections. A wider perspective.", scopeBody: "Our Telegram and Facebook spaces currently focus on Switzerland. Germany and Austria already have dedicated sections on the site with guides and local contacts.", countriesLabel: "Resources by country",
    rulesEyebrow: "A GOOD PLACE TO BELONG", rulesTitle: "It starts with respect.",
    rules: [
      ["Be kind", "Respect other people, their experiences and circumstances."],
      ["Protect privacy", "No passports, permits, home addresses or other people’s personal data."],
      ["Share honestly", "No spam, scams, hate speech or misleading offers."],
    ],
    faqTitle: "Before you join",
    faq: [
      { q: "Is it free to join?", a: "Yes. Sweezy does not charge to join these spaces. You may need a platform account and group admission approval. Telegram and Facebook rules apply." },
      { q: "Where can I ask a question or share an experience?", a: "Choose the Facebook group for posts and exchanges, following its rules. Telegram helps you stay connected with Sweezy. Make your question specific and leave out sensitive personal information." },
      { q: "What if I live in Germany or Austria?", a: "Our current community links focus on Switzerland. Sweezy has dedicated resources on registration, work and starting a business in Germany and Austria. Separate community links for those countries are not listed here yet." },
      { q: "Can I rely on advice from members?", a: "Personal experience can help you find your bearings. For decisions about permits, tax, health or law, check with the responsible authority or a qualified professional: other members’ circumstances may differ from yours." },
    ],
  },
  de: {
    name: "Community", home: "Start",
    metaTitle: "Sweezy Community: Telegram & Facebook in der Schweiz",
    description: "Finde deine Community in der Schweiz: offizielle Sweezy-Angebote auf Telegram und Facebook, Erfahrungsaustausch und praktische Ratgeber für den DACH-Raum.",
    eyebrow: "SWEEZY / FINDE DEINE COMMUNITY", title: "Deine Leute.", titleEnd: "Auch fern von zu Hause.",
    intro: "Ein neues Land bedeutet auch neue Begegnungen. Vernetze dich mit Menschen aus der Ukraine und anderen Neuankommenden in der Schweiz: Bleib mit Sweezy verbunden und teile Erfahrungen in unserer Facebook-Gruppe.",
    telegram: "Telegram öffnen", facebook: "Zur Facebook-Gruppe", heroNote: "Kostenlos beitreten · Wähle deine Plattform",
    poster: "Dein erstes Hallo beginnt hier.", john: "Dein Sweezy-Begleiter", greeting: "Hey, ich bin John!", scopeBadge: "FOKUS: SCHWEIZ",
    navLabel: "Auf dieser Seite", jumpLinks: ["Community wählen", "Dein erster Beitrag", "Hilfreiche Ratgeber"],
    platformsEyebrow: "ZWEI WEGE, VERBUNDEN ZU BLEIBEN", platformsTitle: "Wo fühlst du dich wohl?", platformsBody: "Wähle eine Plattform oder bleib auf beiden mit uns verbunden.",
    platforms: {
      telegram: { tag: "SWEEZY IMMER DABEI", title: "Sweezy für unterwegs.", body: "Unser Telegram-Angebot verbindet dich direkt mit Sweezy, neuen Inhalten und Neuigkeiten zum Projekt.", features: ["Inhalte des Projekts", "Einfach auf dem Handy öffnen"], cta: "Telegram öffnen" },
      facebook: { tag: "KENNENLERNEN & AUSTAUSCHEN", title: "Erfahrungen verbinden.", body: "Eine Facebook-Gruppe für Kontakte, praktische Fragen und ausführliche Beiträge über das Leben in der Schweiz.", features: ["Erfahrungen austauschen", "Platz für eigene Beiträge"], cta: "Facebook-Gruppe öffnen" },
    },
    topicsEyebrow: "VOM KENNENLERNEN ZUM NÄCHSTEN SCHRITT", topicsTitle: "Was beschäftigt dich gerade?", topicsBody: "Beginne mit einem hilfreichen Ratgeber. Teile danach deine Erfahrungen und Fragen mit der Community.",
    topics: [
      { title: "Die ersten Dokumente", body: "Anmeldung und erste Schritte in der Schweiz.", action: "Den Einstieg finden" },
      { title: "Arbeit & Möglichkeiten", body: "Orientierung für die Arbeitssuche in der Schweiz.", action: "Ratgeber entdecken" },
      { title: "Angebote in deiner Sprache", body: "Kontakte, Orte und Sprachen der Angebote in drei Ländern.", action: "Verzeichnis öffnen (Ukrainisch)" },
      { title: "Das eigene Unternehmen", body: "Anlaufstellen für Menschen aus der Ukraine bei einer Gründung im DACH-Raum.", action: "Länder vergleichen (Ukrainisch)" },
    ],
    pdfTitle: "Nimm hilfreiches Wissen mit.", pdfBody: "Speichere einen Ratgeber vor dem Umzug, dem ersten Auftrag oder dem nächsten Ausflug.", pdfCta: "Alle PDF-Ratgeber", pdfFree: "Kostenlos · Ohne Anmeldung", download: "PDF herunterladen",
    scopeEyebrow: "SCHWEIZER COMMUNITY + DACH-RATGEBER", scopeTitle: "Nah verbunden. Weiter orientiert.", scopeBody: "Unsere Telegram- und Facebook-Angebote konzentrieren sich aktuell auf die Schweiz. Für Deutschland und Österreich gibt es bereits eigene Bereiche der Website mit Ratgebern und lokalen Kontakten.", countriesLabel: "Ratgeber nach Land",
    rulesEyebrow: "EIN GUTER ORT ZUM ANKOMMEN", rulesTitle: "Respekt macht den Anfang.",
    rules: [
      ["Bleib respektvoll", "Respektiere andere Menschen, ihre Erfahrungen und Lebensumstände."],
      ["Schütze die Privatsphäre", "Keine Pässe, Bewilligungen, Wohnadressen oder fremden persönlichen Daten."],
      ["Teile ehrlich", "Kein Spam, Betrug, keine Hassrede und keine irreführenden Angebote."],
    ],
    faqTitle: "Bevor du beitrittst",
    faq: [
      { q: "Ist der Beitritt kostenlos?", a: "Ja. Sweezy verlangt keine Gebühr für den Beitritt. Ein Plattformkonto und eine Aufnahmebestätigung der Gruppe können erforderlich sein. Es gelten die Regeln von Telegram und Facebook." },
      { q: "Wo kann ich Fragen stellen oder Erfahrungen teilen?", a: "Für eigene Beiträge und Austausch wähle die Facebook-Gruppe und beachte ihre Regeln. Über Telegram bleibst du mit Sweezy verbunden. Formuliere Fragen konkret und veröffentliche keine sensiblen persönlichen Angaben." },
      { q: "Was ist, wenn ich in Deutschland oder Österreich lebe?", a: "Unsere aktuellen Community-Links konzentrieren sich auf die Schweiz. Bei Sweezy findest du eigene Ratgeber zu Anmeldung, Arbeit und Gründung in Deutschland und Österreich. Separate Community-Links für diese Länder sind hier noch nicht aufgeführt." },
      { q: "Kann ich mich auf Ratschläge von Mitgliedern verlassen?", a: "Persönliche Erfahrungen helfen bei der Orientierung. Kläre Entscheidungen zu Bewilligungen, Steuern, Gesundheit oder Recht mit der zuständigen Behörde oder einer qualifizierten Fachperson: Andere Mitglieder können andere Voraussetzungen haben." },
    ],
  },
} as const;

type Platform = "telegram" | "facebook";
const PLATFORMS: { key: Platform; name: string; href: string }[] = [
  { key: "telegram", name: "Telegram", href: TELEGRAM_URL },
  { key: "facebook", name: "Facebook", href: FACEBOOK_COMMUNITY_URL },
];
const COMMUNITY_DOWNLOADS: DownloadId[] = ["first-week", "business-ch", "travel-kit"];

function PlatformIcon({ platform }: { platform: Platform }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    {platform === "telegram"
      ? <path d="M21.6 3.7 18.4 20c-.2 1-1 1.2-1.8.7l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.3-8.4c.4-.4-.1-.6-.6-.3L5.8 13.2.9 11.7c-1-.3-1-1 .2-1.5L20 2.9c.9-.3 1.7.2 1.6.8Z" />
      : <path d="M14 22v-9h3l.5-4H14V7c0-1.2.3-2 2-2h2V1.4C17.4 1.2 16.3 1 15 1c-3 0-5 1.8-5 5.2V9H7v4h3v9h4Z" />}
  </svg>;
}

export function generateStaticParams() { return ["en", "uk", "de"].map((locale) => ({ locale })); }

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const copy = COPY[params.locale];
  const image = { url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Sweezy — Your next step in DACH" };
  return {
    title: copy.metaTitle, description: copy.description,
    alternates: buildLocaleAlternates(params.locale, "/community"),
    openGraph: { title: copy.metaTitle, description: copy.description, url: `${BASE_URL}/${params.locale}/community`, type: "website", images: [image] },
    twitter: { card: "summary_large_image", title: copy.metaTitle, description: copy.description, images: [image] },
  };
}

export default function CommunityPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const copy = COPY[locale];
  const url = `${BASE_URL}/${locale}/community`;
  const topicLinks = [topicHref(locale, "switzerland", "registration"), topicHref(locale, "switzerland", "work"), "/uk/services", "/uk/blog/biznes-dach-dlya-ukrayintsiv"];
  const schema = [
    { "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${url}#page`, name: copy.metaTitle, description: copy.description, url, inLanguage: locale, isPartOf: { "@id": ENTITY_IDS.website }, about: { "@id": ENTITY_IDS.organization }, publisher: { "@id": ENTITY_IDS.organization }, mainEntity: { "@type": "ItemList", itemListElement: PLATFORMS.map((platform, index) => ({ "@type": "ListItem", position: index + 1, name: `Sweezy · ${platform.name}`, url: platform.href })) } },
    { "@context": "https://schema.org", "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: copy.faq.map((item, index) => ({ "@type": "Question", "@id": `${url}#question-${index + 1}`, name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) },
  ];

  return <main lang={locale} className={styles.page}>
    <JsonLd data={schema} />
    <div className={styles.shell}>
      <Breadcrumb items={[{ name: copy.home, url: `/${locale}` }, { name: copy.name, url }]} />
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.marker} aria-hidden="true" />{copy.eyebrow}</p>
          <h1>{copy.title}<span>{copy.titleEnd}</span></h1>
          <p className={styles.intro}>{copy.intro}</p>
          <div className={styles.heroActions}>
            {PLATFORMS.map(platform => <a key={platform.key} className={platform.key === "telegram" ? styles.primaryAction : styles.secondaryAction} href={platform.href} target="_blank" rel="noreferrer noopener" data-placement="community-hero">
              <PlatformIcon platform={platform.key} /><span>{copy[platform.key]}</span><span aria-hidden="true">↗</span>
            </a>)}
          </div>
          <p className={styles.heroNote}>{copy.heroNote}</p>
        </div>
        <div className={styles.poster}>
          <div className={styles.posterTop}><span>SWEEZY / TOGETHER</span><span>{copy.scopeBadge}</span></div>
          <div className={styles.heroArt}><div className={styles.posterOrbit} aria-hidden="true" /><SweezyCompanion pose="community" className={styles.companion} priority sizes="(max-width: 620px) 90vw, (max-width: 950px) 42vw, 480px" /><span className={styles.greeting}>{copy.greeting}</span></div>
          <div className={styles.posterFoot}><p className={styles.posterTitle}>{copy.poster}</p><p className={styles.posterCaption}><strong>{SWEEZY_COMPANION.name[locale]}</strong><span>{copy.john}</span></p></div>
        </div>
      </header>
      <nav className={styles.jumpNav} aria-label={copy.navLabel}>{["community-platforms", "community-starter", "community-resources"].map((id, index) => <a key={id} href={`#${id}`}><span>0{index + 1}</span>{copy.jumpLinks[index]}<span aria-hidden="true">↓</span></a>)}</nav>
      <section className={styles.section} id="community-platforms" aria-labelledby="platforms-title">
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{copy.platformsEyebrow}</p><h2 id="platforms-title">{copy.platformsTitle}</h2></div><p>{copy.platformsBody}</p></div>
        <div className={styles.platforms}>
          {PLATFORMS.map((platform, index) => {
            const item = copy.platforms[platform.key];
            return <article key={platform.key} className={`${styles.platform} ${styles[platform.key]}`}>
              <div className={styles.platformTop}><span className={styles.platformIcon}><PlatformIcon platform={platform.key} /></span><span>{platform.name}</span><small>0{index + 1} / 02</small></div>
              <p className={styles.platformTag}>{item.tag}</p><h3>{item.title}</h3><p className={styles.platformBody}>{item.body}</p>
              <ul className={styles.features}>{item.features.map(feature => <li key={feature}><span aria-hidden="true">↗</span>{feature}</li>)}</ul>
              <a href={platform.href} data-placement="community-platforms" target="_blank" rel="noreferrer noopener" className={styles.platformAction}><span>{item.cta}</span><span aria-hidden="true">↗</span></a>
            </article>;
          })}
        </div>
      </section>
      <div id="community-starter" className={styles.anchor}><CommunityStarter key={locale} locale={locale} /></div>
      <section className={styles.section} id="community-resources" aria-labelledby="topics-title">
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{copy.topicsEyebrow}</p><h2 id="topics-title">{copy.topicsTitle}</h2></div><p>{copy.topicsBody}</p></div>
        <div className={styles.topics}>{copy.topics.map((topic, index) => <Link href={topicLinks[index]} className={styles.topic} key={topic.title}>
          <span className={styles.topicIndex}>0{index + 1}<span aria-hidden="true">↗</span></span><h3>{topic.title}</h3><p>{topic.body}</p><span className={styles.topicAction}>{topic.action}</span>
        </Link>)}</div>
        <div className={styles.downloadShelf}>
          <div className={styles.downloadHeading}><div><p className={styles.eyebrow}>{copy.pdfFree}</p><h3>{copy.pdfTitle}</h3><p>{copy.pdfBody}</p></div><Link href={`/${locale}/resources`}>{copy.pdfCta} <span aria-hidden="true">↗</span></Link></div>
          <div className={styles.downloadGrid}>{COMMUNITY_DOWNLOADS.map(asset => <article key={asset} className={styles.downloadCard}><Image src={`/downloads/sweezy-${asset}-cover-${locale}.webp`} alt="" width={714} height={1010} sizes="64px" /><div><h4>{DOWNLOADS[asset].title[locale]}</h4><p>{DOWNLOADS[asset].description[locale]}</p><DownloadLink asset={asset} locale={locale} placement="community-resources">{copy.download} <span aria-hidden="true">↓</span></DownloadLink></div></article>)}</div>
        </div>
      </section>
      <section className={styles.scope} aria-labelledby="scope-title">
        <div><p className={styles.eyebrow}>{copy.scopeEyebrow}</p><h2 id="scope-title">{copy.scopeTitle}</h2><p className={styles.scopeBody}>{copy.scopeBody}</p></div>
        <nav className={styles.countries} aria-label={copy.countriesLabel}>{COUNTRIES.map(country => <Link key={country} href={countryPath(locale, country)}><span>{countryData[country].code}</span><strong>{countryData[country].name[locale]}</strong><span aria-hidden="true">↗</span></Link>)}</nav>
      </section>
      <div className={styles.detailsGrid}>
        <section className={styles.principles} aria-labelledby="principles-title"><p className={styles.eyebrow}>{copy.rulesEyebrow}</p><h2 id="principles-title">{copy.rulesTitle}</h2><ol>{copy.rules.map(([title, body], index) => <li key={title}><span className={styles.ruleIndex}>0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol></section>
        <section className={styles.faq} id="faq" aria-labelledby="faq-title"><p className={styles.eyebrow}>FAQ / SWEEZY</p><h2 id="faq-title">{copy.faqTitle}</h2><div>{copy.faq.map((item, index) => <details key={item.q} id={`question-${index + 1}`}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div></section>
      </div>
    </div>
  </main>;
}
