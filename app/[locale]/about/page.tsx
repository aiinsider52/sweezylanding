import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildLocaleAlternates, BASE_URL } from "../../../lib/alternates";
import { isLocale } from "../../../lib/blog";
import type { Locale } from "../../../lib/i18n";
import { JsonLd } from "../../components/seo/JsonLd";

type AboutCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  missionTitle: string;
  mission: string;
  processTitle: string;
  process: Array<{ title: string; body: string }>;
  sourcesTitle: string;
  sourcesIntro: string;
  correctionTitle: string;
  correction: string;
  disclaimerTitle: string;
  disclaimer: string;
  back: string;
};

const COPY: Record<Locale, AboutCopy> = {
  en: {
    metaTitle: "About Sweezy & Editorial Standards",
    metaDescription:
      "How Sweezy researches, reviews and updates practical guidance for newcomers to Switzerland.",
    eyebrow: "ABOUT SWEEZY",
    title: "Useful guidance needs visible standards.",
    intro:
      "Sweezy helps newcomers turn Swiss administration into clear next steps. Our website supports orientation; the app helps people organize those steps around their situation.",
    missionTitle: "Our editorial mission",
    mission:
      "We publish practical guidance for people moving to and living in Switzerland. Content should answer a real task, explain local differences, and show when a federal, cantonal or municipal authority must make the final decision.",
    processTitle: "How we work",
    process: [
      { title: "Research", body: "We start with official federal, cantonal and municipal information, then structure it around the questions newcomers face." },
      { title: "Review", body: "We check deadlines, terminology and jurisdiction. Material changes receive an updated review date." },
      { title: "Clarity", body: "We separate general orientation from rules that depend on nationality, permit, canton or municipality." },
      { title: "Maintenance", body: "Time-sensitive guides are reviewed when authorities publish meaningful changes. We do not change dates only to make pages look fresh." },
    ],
    sourcesTitle: "Primary sources",
    sourcesIntro: "Common starting points for our research include:",
    correctionTitle: "Corrections",
    correction:
      "Found an outdated rule or unclear statement? Send the page URL and supporting source to our support team. We review substantive corrections and update the page date when content changes.",
    disclaimerTitle: "Scope",
    disclaimer:
      "Sweezy provides general information, not legal, tax, financial or medical advice. Requirements can vary by person and location. Confirm important decisions with the responsible authority or a qualified professional.",
    back: "Back to Sweezy",
  },
  uk: {
    metaTitle: "Про Sweezy та редакційні стандарти",
    metaDescription:
      "Як Sweezy досліджує, перевіряє й оновлює практичні матеріали для новоприбулих у Швейцарії.",
    eyebrow: "ПРО SWEEZY",
    title: "Корисні рекомендації потребують видимих стандартів.",
    intro:
      "Sweezy допомагає новоприбулим перетворити швейцарську адміністрацію на зрозумілі наступні кроки. Сайт дає орієнтири, а застосунок допомагає впорядкувати дії під вашу ситуацію.",
    missionTitle: "Наша редакційна місія",
    mission:
      "Ми публікуємо практичні матеріали для людей, які переїжджають до Швейцарії або вже живуть тут. Кожен матеріал має вирішувати конкретне завдання, пояснювати місцеві відмінності й показувати, коли остаточне рішення приймає федеральний, кантональний або муніципальний орган.",
    processTitle: "Як ми працюємо",
    process: [
      { title: "Дослідження", body: "Починаємо з офіційної інформації федерації, кантонів і громад, потім структуруємо її навколо питань новоприбулих." },
      { title: "Перевірка", body: "Перевіряємо строки, терміни та компетенції органів. Після суттєвих змін оновлюємо дату перевірки." },
      { title: "Ясність", body: "Відокремлюємо загальні орієнтири від правил, що залежать від громадянства, дозволу, кантону чи громади." },
      { title: "Оновлення", body: "Переглядаємо чутливі до часу гіди після важливих змін у джерелах. Не змінюємо дати лише заради видимої свіжості." },
    ],
    sourcesTitle: "Першоджерела",
    sourcesIntro: "Серед базових джерел для досліджень:",
    correctionTitle: "Виправлення",
    correction:
      "Знайшли застаріле правило або неточне формулювання? Надішліть URL сторінки та підтверджувальне джерело команді підтримки. Ми перевіримо суттєве виправлення й оновимо дату сторінки після зміни змісту.",
    disclaimerTitle: "Межі відповідальності",
    disclaimer:
      "Sweezy надає загальну інформацію, а не юридичну, податкову, фінансову чи медичну консультацію. Вимоги залежать від людини й місця. Важливі рішення підтверджуйте у відповідальному органі або кваліфікованого фахівця.",
    back: "Назад до Sweezy",
  },
  de: {
    metaTitle: "Über Sweezy & redaktionelle Standards",
    metaDescription:
      "Wie Sweezy praktische Informationen für Neuzuzüger in der Schweiz recherchiert, prüft und aktualisiert.",
    eyebrow: "ÜBER SWEEZY",
    title: "Nützliche Orientierung braucht sichtbare Standards.",
    intro:
      "Sweezy hilft Neuzuzügern, Schweizer Administration in klare nächste Schritte zu übersetzen. Die Website bietet Orientierung; die App ordnet Aufgaben passend zur persönlichen Situation.",
    missionTitle: "Unsere redaktionelle Mission",
    mission:
      "Wir veröffentlichen praktische Inhalte für Menschen, die in die Schweiz ziehen oder bereits hier leben. Jeder Beitrag soll eine konkrete Aufgabe lösen, lokale Unterschiede erklären und zeigen, wann eine Bundes-, Kantons- oder Gemeindebehörde endgültig entscheidet.",
    processTitle: "So arbeiten wir",
    process: [
      { title: "Recherche", body: "Wir beginnen mit offiziellen Informationen von Bund, Kantonen und Gemeinden und strukturieren sie entlang realer Fragen von Neuzuzügern." },
      { title: "Prüfung", body: "Wir prüfen Fristen, Begriffe und Zuständigkeiten. Nach wesentlichen Änderungen aktualisieren wir das Prüfdatum." },
      { title: "Klarheit", body: "Wir trennen allgemeine Orientierung von Regeln, die von Nationalität, Bewilligung, Kanton oder Gemeinde abhängen." },
      { title: "Pflege", body: "Zeitkritische Ratgeber prüfen wir nach relevanten Änderungen offizieller Stellen. Daten ändern wir nicht nur, damit Seiten frischer wirken." },
    ],
    sourcesTitle: "Primärquellen",
    sourcesIntro: "Zu den üblichen Ausgangspunkten unserer Recherche gehören:",
    correctionTitle: "Korrekturen",
    correction:
      "Eine veraltete Regel oder unklare Aussage gefunden? Senden Sie die Seiten-URL und eine belastbare Quelle an unser Support-Team. Wir prüfen substanzielle Korrekturen und aktualisieren das Seitendatum nach einer Inhaltsänderung.",
    disclaimerTitle: "Geltungsbereich",
    disclaimer:
      "Sweezy bietet allgemeine Informationen, keine Rechts-, Steuer-, Finanz- oder Medizinberatung. Anforderungen unterscheiden sich je nach Person und Ort. Bestätigen Sie wichtige Entscheidungen bei der zuständigen Behörde oder einer qualifizierten Fachperson.",
    back: "Zurück zu Sweezy",
  },
};

const OFFICIAL_SOURCES = [
  { name: "ch.ch — Swiss authorities online", href: "https://www.ch.ch/" },
  { name: "SEM — State Secretariat for Migration", href: "https://www.sem.admin.ch/" },
  { name: "FOPH — Federal Office of Public Health", href: "https://www.bag.admin.ch/" },
  { name: "FSO — Federal Statistical Office", href: "https://www.bfs.admin.ch/" },
];

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "uk" }, { locale: "de" }];
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const copy = COPY[params.locale];
  const canonicalUrl = `${BASE_URL}/${params.locale}/about`;

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: buildLocaleAlternates(params.locale, "/about"),
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      url: canonicalUrl,
      siteName: "Sweezy",
      type: "website",
      locale: params.locale === "uk" ? "uk_UA" : params.locale === "de" ? "de_DE" : "en_US",
    },
  };
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const copy = COPY[locale];
  const canonicalUrl = `${BASE_URL}/${locale}/about`;
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: copy.metaTitle,
    description: copy.metaDescription,
    url: canonicalUrl,
    inLanguage: locale,
    about: {
      "@type": "Organization",
      name: "Sweezy",
      url: BASE_URL,
    },
  };

  return (
    <main className="min-h-screen bg-dark-900 text-white">
      <JsonLd data={aboutSchema} />
      <article className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <Link href={`/${locale}`} className="text-sm text-white/45 transition-colors hover:text-white">
          ← {copy.back}
        </Link>

        <header className="mt-10 border-b border-white/10 pb-10">
          <p className="text-xs font-semibold tracking-[0.24em] text-accent-green">{copy.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">{copy.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">{copy.intro}</p>
        </header>

        <section className="py-10">
          <h2 className="text-2xl font-semibold tracking-tight">{copy.missionTitle}</h2>
          <p className="mt-4 leading-8 text-white/65">{copy.mission}</p>
        </section>

        <section className="border-t border-white/10 py-10">
          <h2 className="text-2xl font-semibold tracking-tight">{copy.processTitle}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {copy.process.map((item, index) => (
              <article key={item.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <span className="text-xs font-semibold text-accent-green">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 leading-7 text-white/55">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 py-10">
          <h2 className="text-2xl font-semibold tracking-tight">{copy.sourcesTitle}</h2>
          <p className="mt-3 text-white/60">{copy.sourcesIntro}</p>
          <ul className="mt-5 space-y-3">
            {OFFICIAL_SOURCES.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-accent-green underline underline-offset-4"
                >
                  {source.name}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-5 border-t border-white/10 py-10 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-semibold">{copy.correctionTitle}</h2>
            <p className="mt-3 leading-7 text-white/55">{copy.correction}</p>
            <Link href="/support" className="mt-4 inline-flex text-sm font-medium text-accent-green">
              Support →
            </Link>
          </div>
          <div className="rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-semibold">{copy.disclaimerTitle}</h2>
            <p className="mt-3 leading-7 text-white/55">{copy.disclaimer}</p>
          </div>
        </section>
      </article>
    </main>
  );
}
