import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildLocaleAlternates, BASE_URL } from "../../../lib/alternates";
import { isLocale } from "../../../lib/blog";
import type { Locale } from "../../../lib/i18n";
import { FACEBOOK_COMMUNITY_URL, TELEGRAM_URL } from "../../../lib/links";
import { JsonLd } from "../../components/seo/JsonLd";

const COPY: Record<Locale, {
  title: string; description: string; eyebrow: string; intro: string;
  telegramTitle: string; telegramBody: string; telegramCta: string;
  facebookTitle: string; facebookBody: string; facebookCta: string;
  purposeTitle: string; purposes: [string, string][];
  rulesTitle: string; rules: string[]; faq: { q: string; a: string }[];
}> = {
  en: {
    title: "Sweezy Community for Newcomers in Switzerland",
    description: "Join Sweezy community on Telegram and Facebook for practical exchange, relocation updates and connections among newcomers and Ukrainians in Switzerland.",
    eyebrow: "COMMUNITY · SWITZERLAND",
    intro: "Sweezy connects product guidance with real conversation. Use our official Telegram and Facebook spaces to follow updates, exchange experience and meet people navigating life in Switzerland.",
    telegramTitle: "Fast updates. Direct conversation.", telegramBody: "Telegram works best for timely Sweezy news, quick questions and staying close to community activity.", telegramCta: "Join Telegram",
    facebookTitle: "Longer posts. Shared experience.", facebookBody: "Facebook group gives community members more room for practical discussions, useful posts and ongoing connections.", facebookCta: "Join Facebook group",
    purposeTitle: "What community is for",
    purposes: [["Practical exchange", "Discuss everyday relocation, work, documents and life in Switzerland."], ["Sweezy updates", "Follow product releases, new guides, places and community initiatives."], ["Human connection", "Find people facing similar questions and share useful experience."], ["Better guidance", "Recurring questions help Sweezy identify guides and tools people need next."]],
    rulesTitle: "Community principles", rules: ["Respect people, privacy and different personal situations.", "Do not publish passports, permits, addresses or other sensitive documents.", "Verify legal, tax, medical and migration decisions with responsible authorities.", "No spam, scams, hate speech or misleading offers."],
    faq: [{ q: "Is Sweezy community free to join?", a: "Yes. Telegram and Facebook community links are publicly available. Platform accounts and platform rules apply." }, { q: "Does community advice replace official guidance?", a: "No. Community experience may help orientation but does not replace responsible Swiss authorities or qualified professional advice." }, { q: "Who is Sweezy community for?", a: "It is designed for newcomers, expats and Ukrainians building life in Switzerland, plus people willing to share relevant experience." }],
  },
  uk: {
    title: "Спільнота Sweezy для українців у Швейцарії",
    description: "Приєднуйтесь до спільноти Sweezy у Telegram і Facebook: практичний досвід, оновлення та зв’язок між українцями й новоприбулими у Швейцарії.",
    eyebrow: "СПІЛЬНОТА · ШВЕЙЦАРІЯ",
    intro: "Sweezy поєднує перевірені гіди з живим спілкуванням. Наші офіційні простори у Telegram і Facebook допомагають стежити за оновленнями, обмінюватися досвідом і знаходити людей, які також будують життя у Швейцарії.",
    telegramTitle: "Швидкі оновлення. Живий зв’язок.", telegramBody: "Telegram підходить для новин Sweezy, коротких запитань і швидкого зв’язку зі спільнотою.", telegramCta: "Приєднатися в Telegram",
    facebookTitle: "Більше контексту. Спільний досвід.", facebookBody: "Facebook-група дає більше простору для практичних обговорень, корисних дописів і тривалих контактів.", facebookCta: "Приєднатися у Facebook",
    purposeTitle: "Для чого створена спільнота",
    purposes: [["Практичний обмін", "Обговорюйте переїзд, роботу, документи та повсякденне життя у Швейцарії."], ["Оновлення Sweezy", "Дізнавайтеся про нові функції, гіди, місця та ініціативи."], ["Людський зв’язок", "Знаходьте людей зі схожими питаннями та діліться корисним досвідом."], ["Кращі матеріали", "Повторювані запитання допомагають Sweezy створювати потрібні гіди й інструменти."]],
    rulesTitle: "Принципи спільноти", rules: ["Поважайте людей, приватність і різні життєві обставини.", "Не публікуйте паспорти, дозволи, адреси та інші чутливі документи.", "Юридичні, податкові, медичні й міграційні рішення перевіряйте в компетентних органах.", "Спам, шахрайство, мова ворожнечі та оманливі пропозиції заборонені."],
    faq: [{ q: "Чи безкоштовна спільнота Sweezy?", a: "Так. Посилання на Telegram і Facebook відкриті. Діють правила та вимоги відповідних платформ." }, { q: "Чи замінюють поради спільноти офіційну інформацію?", a: "Ні. Особистий досвід допомагає зорієнтуватися, але не замінює відповідальні органи Швейцарії або професійну консультацію." }, { q: "Для кого створена спільнота?", a: "Для новоприбулих, експатів та українців, які будують життя у Швейцарії, а також людей, готових ділитися релевантним досвідом." }],
  },
  de: {
    title: "Sweezy Community für Neuankömmlinge in der Schweiz",
    description: "Sweezy Community auf Telegram und Facebook: praktische Erfahrungen, Updates und Kontakte für Neuankömmlinge und Menschen aus der Ukraine in der Schweiz.",
    eyebrow: "COMMUNITY · SCHWEIZ",
    intro: "Sweezy verbindet geprüfte Orientierung mit echtem Austausch. In unseren offiziellen Telegram- und Facebook-Räumen folgen Sie Updates, teilen Erfahrungen und treffen Menschen, die ihr Leben in der Schweiz aufbauen.",
    telegramTitle: "Schnelle Updates. Direkter Austausch.", telegramBody: "Telegram eignet sich für Sweezy-News, kurze Fragen und direkten Kontakt zur Community.", telegramCta: "Telegram beitreten",
    facebookTitle: "Mehr Kontext. Gemeinsame Erfahrung.", facebookBody: "Die Facebook-Gruppe bietet Raum für praktische Diskussionen, hilfreiche Beiträge und langfristige Kontakte.", facebookCta: "Facebook-Gruppe beitreten",
    purposeTitle: "Wofür die Community da ist",
    purposes: [["Praktischer Austausch", "Umzug, Arbeit, Dokumente und Alltag in der Schweiz besprechen."], ["Sweezy Updates", "Neue Funktionen, Guides, Orte und Community-Initiativen verfolgen."], ["Menschliche Kontakte", "Menschen mit ähnlichen Fragen finden und Erfahrungen teilen."], ["Bessere Orientierung", "Wiederkehrende Fragen zeigen Sweezy, welche Guides und Werkzeuge als Nächstes fehlen."]],
    rulesTitle: "Community-Grundsätze", rules: ["Menschen, Privatsphäre und unterschiedliche Situationen respektieren.", "Keine Pässe, Bewilligungen, Adressen oder sensiblen Dokumente veröffentlichen.", "Rechtliche, steuerliche, medizinische und migrationsrechtliche Entscheidungen bei Behörden prüfen.", "Kein Spam, Betrug, Hassrede oder irreführende Angebote."],
    faq: [{ q: "Ist die Sweezy Community kostenlos?", a: "Ja. Telegram- und Facebook-Links sind öffentlich zugänglich. Es gelten die Regeln der jeweiligen Plattform." }, { q: "Ersetzt Community-Erfahrung offizielle Auskünfte?", a: "Nein. Erfahrungen helfen bei der Orientierung, ersetzen aber keine zuständige Schweizer Behörde oder qualifizierte Beratung." }, { q: "Für wen ist die Community?", a: "Für Neuankömmlinge, Expats und Menschen aus der Ukraine, die in der Schweiz leben, sowie für Personen mit relevanter Erfahrung." }],
  },
};

export function generateStaticParams() { return ["en", "uk", "de"].map((locale) => ({ locale })); }

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const copy = COPY[params.locale];
  return { title: copy.title, description: copy.description, alternates: buildLocaleAlternates(params.locale, "/community"), openGraph: { title: copy.title, description: copy.description, url: `${BASE_URL}/${params.locale}/community`, type: "website" } };
}

export default function CommunityPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const copy = COPY[locale];
  const url = `${BASE_URL}/${locale}/community`;
  const schema = [
    { "@context": "https://schema.org", "@type": "WebPage", name: copy.title, description: copy.description, url, inLanguage: locale, about: { "@type": "Organization", name: "Sweezy", url: BASE_URL, sameAs: [TELEGRAM_URL, FACEBOOK_COMMUNITY_URL] } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: copy.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) },
  ];
  return <main lang={locale} className="min-h-screen bg-[#0c0f0d] text-white"><JsonLd data={schema}/><article className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20"><Link href={`/${locale}`} className="text-sm text-white/45">← Sweezy</Link><header className="mt-10 grid gap-7 border-b border-white/10 pb-12 lg:grid-cols-[.42fr_1fr]"><p className="text-xs font-bold tracking-[.2em] text-[#adff00]">{copy.eyebrow}</p><div><h1 className="max-w-5xl text-5xl font-bold leading-[.92] tracking-[-.06em] sm:text-7xl lg:text-8xl">{copy.title}</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-white/65">{copy.intro}</p></div></header><section className="grid gap-3 py-12 md:grid-cols-2"><a href={TELEGRAM_URL} target="_blank" rel="noreferrer noopener" className="flex min-h-[360px] flex-col rounded-3xl bg-[#7ec8ff] p-8 text-black transition-transform hover:-translate-y-1"><span className="text-xs font-bold tracking-[.16em]">01 · TELEGRAM</span><h2 className="mt-auto text-4xl font-bold tracking-[-.05em] sm:text-5xl">{copy.telegramTitle}</h2><p className="mt-5 max-w-xl leading-7 text-black/60">{copy.telegramBody}</p><strong className="mt-8">{copy.telegramCta} ↗</strong></a><a href={FACEBOOK_COMMUNITY_URL} target="_blank" rel="noreferrer noopener" className="flex min-h-[360px] flex-col rounded-3xl bg-[#adff00] p-8 text-black transition-transform hover:-translate-y-1"><span className="text-xs font-bold tracking-[.16em]">02 · FACEBOOK</span><h2 className="mt-auto text-4xl font-bold tracking-[-.05em] sm:text-5xl">{copy.facebookTitle}</h2><p className="mt-5 max-w-xl leading-7 text-black/60">{copy.facebookBody}</p><strong className="mt-8">{copy.facebookCta} ↗</strong></a></section><section className="border-t border-white/10 py-12"><h2 className="text-4xl font-bold tracking-[-.05em] sm:text-6xl">{copy.purposeTitle}</h2><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{copy.purposes.map(([title, body], index) => <div key={title} className="rounded-3xl border border-white/10 bg-white/[.035] p-6"><span className="text-xs font-bold text-[#adff00]">0{index + 1}</span><h3 className="mt-12 text-2xl font-semibold">{title}</h3><p className="mt-4 leading-7 text-white/55">{body}</p></div>)}</div></section><section className="grid gap-8 border-t border-white/10 py-12 lg:grid-cols-[.45fr_1fr]"><h2 className="text-4xl font-bold tracking-[-.05em]">{copy.rulesTitle}</h2><ol className="space-y-3">{copy.rules.map((rule, index) => <li key={rule} className="flex gap-5 rounded-2xl border border-white/10 p-5"><span className="font-mono text-xs text-[#adff00]">0{index + 1}</span><span className="leading-7 text-white/65">{rule}</span></li>)}</ol></section><section className="border-t border-white/10 py-12"><h2 className="text-4xl font-bold tracking-[-.05em]">FAQ</h2><div className="mt-8 grid gap-3 lg:grid-cols-3">{copy.faq.map((item) => <article key={item.q} className="rounded-3xl border border-white/10 p-6"><h3 className="text-xl font-semibold">{item.q}</h3><p className="mt-4 leading-7 text-white/55">{item.a}</p></article>)}</div></section></article></main>;
}
