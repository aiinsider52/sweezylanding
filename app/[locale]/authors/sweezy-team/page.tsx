import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildLocaleAlternates, BASE_URL } from "../../../../lib/alternates";
import { isLocale } from "../../../../lib/blog";
import type { Locale } from "../../../../lib/i18n";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { JsonLd } from "../../../components/seo/JsonLd";
import { SweezyCompanion } from "../../../components/SweezyCompanion";
import { SWEEZY_COMPANION } from "../../../../data/companion";
import styles from "./team.module.css";

const COPY = {
  en: {
    title: "The people behind Sweezy.", description: "Meet the founders of Sweezy and learn how its practical DACH guides are researched and edited.", eyebrow: "SWEEZY / PEOPLE & EDITORIAL", intro: "A clearer start in a new country begins with people who care about the details. Here is who builds Sweezy and how our guides take shape.", name: "Vladyslav Katash", role: "Founder of Sweezy", person: "Vladyslav develops Sweezy and shapes the product around the questions people face when moving, working and settling into a new country.", focus: "Product, development & practical guides", personLabel: "Behind the product", contact: "Contact Sweezy", team: "The Sweezy editorial desk", teamBody: "Sweezy Team is the collective editorial byline used on our guides. It identifies the publication rather than a separate individual. Each article shows its own sources and review date.", process: "How a guide takes shape", steps: [{ title: "Start with a real question", body: "We structure information around moving, finding work, running a business and everyday life." }, { title: "Find the responsible source", body: "Federal, regional and municipal sources help us explain where a rule applies and which authority makes the decision." }, { title: "Make it useful", body: "We turn the research into readable guidance in Ukrainian, English and German, with links for further detail." }], scope: "Expertise and responsibility", scopeBody: "The editorial team does not claim legal, tax or medical qualifications. Where an external specialist reviews a particular article, their name and role are stated on that article. Personal decisions should be confirmed with the responsible authority or a qualified adviser.", editorial: "Our editorial standards", guides: "Explore the journal", home: "Home", back: "People", countries: "Switzerland · Germany · Austria", corrections: "Something needs correcting?", correctionsBody: "Send the page link and the information that needs updating. A link to the relevant official source helps us assess a correction.", write: "Send a correction"
  },
  uk: {
    title: "Люди, які створюють Sweezy.", description: "Хто створює Sweezy та як редакція готує практичні гіди про життя у країнах DACH.", eyebrow: "SWEEZY / ЛЮДИ ТА РЕДАКЦІЯ", intro: "За зрозумілим стартом у новій країні стоїть увага до деталей. Знайомтеся із засновниками Sweezy та підходом до наших матеріалів.", name: "Владислав Каташ", role: "Засновник Sweezy", person: "Владислав розвиває Sweezy та будує продукт навколо запитань, які виникають під час переїзду, пошуку роботи й облаштування життя в новій країні.", focus: "Продукт, розробка та практичні гіди", personLabel: "За продуктом", contact: "Зв’язатися зі Sweezy", team: "Редакція Sweezy", teamBody: "Sweezy Team — спільний редакційний підпис у наших гідах. Він позначає редакцію видання. Джерела й дату перевірки вказано окремо в кожному матеріалі.", process: "Як народжується гід", steps: [{ title: "Від реального запитання", body: "Будуємо матеріали навколо переїзду, роботи, власної справи та щоденних ситуацій." }, { title: "До відповідального джерела", body: "Федеральні, регіональні й міські джерела допомагають пояснити, де діє правило та хто ухвалює рішення." }, { title: "До зрозумілої відповіді", body: "Перетворюємо дослідження на практичні матеріали українською, англійською та німецькою з корисними посиланнями." }], scope: "Компетенції та відповідальність", scopeBody: "Редакція не заявляє юридичної, податкової чи медичної кваліфікації. Якщо конкретний матеріал перевіряє зовнішній фахівець, його ім’я та роль зазначено в цій статті. Особисті рішення варто підтверджувати у відповідальної установи або кваліфікованого консультанта.", editorial: "Наші редакційні стандарти", guides: "Перейти до журналу", home: "Головна", back: "Люди", countries: "Швейцарія · Німеччина · Австрія", corrections: "Помітили неточність?", correctionsBody: "Надішліть посилання на сторінку та інформацію, яку потрібно оновити. Посилання на відповідне офіційне джерело допоможе перевірити виправлення.", write: "Повідомити про неточність"
  },
  de: {
    title: "Die Menschen hinter Sweezy.", description: "Wer Sweezy entwickelt und wie unsere praktischen DACH-Ratgeber recherchiert und redigiert werden.", eyebrow: "SWEEZY / MENSCHEN & REDAKTION", intro: "Ein verständlicher Start in einem neuen Land beginnt mit Menschen, die auf die Details achten. Lernen Sie die Gründer von Sweezy und unsere Arbeitsweise kennen.", name: "Vladyslav Katash", role: "Gründer und Entwickler von Sweezy", person: "Vladyslav entwickelt Sweezy rund um die Fragen, die beim Umzug, bei der Arbeitssuche und beim Ankommen in einem neuen Land entstehen.", focus: "Produkt, Entwicklung & praktische Ratgeber", personLabel: "Hinter dem Produkt", contact: "Sweezy kontaktieren", team: "Die Sweezy-Redaktion", teamBody: "Sweezy Team ist die gemeinsame redaktionelle Autorenangabe unserer Ratgeber. Sie bezeichnet die Redaktion. Quellen und Prüfdatum stehen beim jeweiligen Beitrag.", process: "So entsteht ein Ratgeber", steps: [{ title: "Eine konkrete Frage", body: "Unsere Beiträge orientieren sich an Umzug, Arbeit, Selbstständigkeit und Alltagssituationen." }, { title: "Die zuständige Quelle", body: "Quellen von Bund, Regionen und Gemeinden zeigen, wo eine Regel gilt und welche Stelle entscheidet." }, { title: "Verständliche Orientierung", body: "Aus der Recherche entstehen lesbare Ratgeber auf Ukrainisch, Englisch und Deutsch mit weiterführenden Links." }], scope: "Fachwissen und Verantwortung", scopeBody: "Die Redaktion beansprucht keine juristischen, steuerlichen oder medizinischen Qualifikationen. Prüft eine externe Fachperson einen bestimmten Beitrag, stehen Name und Rolle bei diesem Artikel. Persönliche Entscheidungen sollten mit der zuständigen Behörde oder einer qualifizierten Beratung geklärt werden.", editorial: "Unsere redaktionellen Standards", guides: "Zum Journal", home: "Start", back: "Menschen", countries: "Schweiz · Deutschland · Österreich", corrections: "Eine Angabe stimmt nicht?", correctionsBody: "Senden Sie den Seitenlink und die Information, die aktualisiert werden muss. Ein Link zur zuständigen offiziellen Quelle erleichtert die Prüfung.", write: "Korrektur melden"
  },
} satisfies Record<Locale, Record<string, unknown>>;

const TEAM = {
  uk: { name: "Юлія Антонишин", role: "Co-founder · Співзасновниця Sweezy", description: "Юлія — співзасновниця Sweezy. Разом створюємо проєкт, який допомагає людям знаходити свій шлях у Швейцарії, Німеччині та Австрії.", label: "Разом створюємо Sweezy", illustration: "Авторська ілюстрація", alt: "Авторська ілюстрація для картки Владислава Каташа: розробник за ноутбуком у студії з видом на Альпи", mascot: "Знайомтеся з Джоном", mascotRole: "Персонаж Sweezy", founders: "Засновники Sweezy" },
  en: { name: "Yuliia Antonyshyn", role: "Co-founder of Sweezy", description: "Yuliia is a co-founder of Sweezy. Together, we are building a project that helps people find their way in Switzerland, Germany and Austria.", label: "Building Sweezy together", illustration: "Editorial illustration", alt: "Editorial illustration for Vladyslav Katash’s profile: an app creator at a laptop in an Alpine-view studio", mascot: "Meet John", mascotRole: "The Sweezy character", founders: "Sweezy founders" },
  de: { name: "Yuliia Antonyshyn", role: "Co-founder · Mitgründerin von Sweezy", description: "Yuliia ist Mitgründerin von Sweezy. Gemeinsam entwickeln wir ein Projekt, das Menschen beim Ankommen in der Schweiz, Deutschland und Österreich unterstützt.", label: "Gemeinsam entsteht Sweezy", illustration: "Redaktionelle Illustration", alt: "Redaktionelle Illustration für das Profil von Vladyslav Katash: App-Entwickler am Laptop in einem Atelier mit Alpenblick", mascot: "Das ist John", mascotRole: "Die Sweezy-Figur", founders: "Die Gründer von Sweezy" },
} satisfies Record<Locale, Record<string,string>>;

export function generateStaticParams() { return ["en", "uk", "de"].map(locale => ({ locale })); }
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const c = COPY[params.locale];
  return { title: `Sweezy Team | ${c.title}`, description: c.description, alternates: buildLocaleAlternates(params.locale, "/authors/sweezy-team") };
}
export default function TeamPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale, c = COPY[locale], team = TEAM[locale], url = `${BASE_URL}/${locale}/authors/sweezy-team`;
  return <main lang={locale} className={styles.page}><div className={styles.shell}>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      { "@type": "Organization", "@id": `${url}#editorial`, name: "Sweezy Team", url, parentOrganization: { "@id": `${BASE_URL}/#organization` }, knowsLanguage: ["uk", "en", "de"] },
      { "@type": "Organization", "@id": `${BASE_URL}/#organization`, name: "Sweezy", url: BASE_URL, founder: [{ "@id": `${url}#vladyslav` }, { "@id": `${url}#yuliia` }] },
      { "@type": "Person", "@id": `${url}#vladyslav`, name: c.name, jobTitle: c.role, description: c.person, url: `${url}#vladyslav` },
      { "@type": "Person", "@id": `${url}#yuliia`, name: team.name, jobTitle: team.role, description: team.description, url: `${url}#yuliia` },
    ] }} />
    <Breadcrumb items={[{ name: c.home, url: `/${locale}` }, { name: c.back, url }]} />
    <header className={styles.hero}><p className={styles.eyebrow}>{c.eyebrow}</p><h1>{c.title}</h1><p>{c.intro}</p><span className={styles.countries}>{c.countries}</span></header>
    <section className={styles.people} aria-label={team.founders}>
      <article className={styles.person} id="vladyslav">
        <figure className={styles.portrait}><Image src="/brand/team/vladyslav-studio.webp" alt={team.alt} fill priority sizes="(max-width: 650px) 100vw, (max-width: 1100px) 45vw, 25vw" /><figcaption>{team.illustration}</figcaption></figure>
        <div className={styles.personCopy}><p className={styles.eyebrow}>{c.personLabel}</p><h2 id="person-name">{c.name}</h2><p className={styles.role}>{c.role}</p><p>{c.person}</p><span className={styles.focus}>{c.focus}</span><a href="mailto:support@sweezy.world" className={styles.button}>{c.contact} ↗</a></div>
      </article>
      <article className={styles.person} id="yuliia"><div className={`${styles.monogram} ${styles.coFounderVisual}`} aria-hidden="true"><span>YA</span><small>SWEEZY / CO-FOUNDER</small></div><div className={styles.personCopy}><p className={styles.eyebrow}>{team.label}</p><h2>{team.name}</h2><p className={styles.role}>{team.role}</p><p>{team.description}</p><a href="mailto:support@sweezy.world" className={styles.button}>{c.contact} ↗</a></div></article>
    </section>
    <section className={styles.teamNotes}>
      <div className={styles.editorial}><p className={styles.eyebrow}>SWEEZY TEAM</p><h2>{c.team}</h2><p>{c.teamBody}</p><Link className={styles.textLink} href={`/${locale}/editorial`}>{c.editorial} →</Link></div>
      <aside className={styles.johnCard}><div className={styles.johnVisual}><SweezyCompanion pose="greeting" className={styles.john} sizes="(max-width: 650px) 180px, 260px" /></div><div><p className={styles.eyebrow}>{team.mascotRole}</p><h2>{team.mascot}</h2><p>{SWEEZY_COMPANION.description[locale]}</p><Link className={styles.textLink} href={`/${locale}/blog`}>{c.guides} →</Link></div></aside>
    </section>
    <section className={styles.process} aria-labelledby="process-title"><h2 id="process-title">{c.process}</h2><div>{c.steps.map((step,i) => <article key={step.title}><span>0{i+1}</span><h3>{step.title}</h3><p>{step.body}</p></article>)}</div></section>
    <section className={styles.scope}><div><p className={styles.eyebrow}>SWEEZY / EDITORIAL</p><h2>{c.scope}</h2><p>{c.scopeBody}</p><Link className={styles.textLink} href={`/${locale}/blog`}>{c.guides} →</Link></div><div><h2>{c.corrections}</h2><p>{c.correctionsBody}</p><a className={styles.textLink} href="mailto:support@sweezy.world?subject=Sweezy%20editorial%20correction">{c.write} ↗</a></div></section>
  </div></main>;
}
