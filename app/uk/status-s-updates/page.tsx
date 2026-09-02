import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../../components/seo/JsonLd";

const BASE_URL = "https://www.sweezy.world";
const URL = `${BASE_URL}/uk/status-s-updates`;

const updates = [
  {
    date: "2026-08-03",
    label: "ПЕРЕВІРЕНО",
    title: "Статус S залишається чинним до 4 березня 2027 року",
    summary:
      "Федеральні правила захисту для людей з України продовжують діяти. Ваші конкретні права, виплати та обов’язки залежать від кантону, громади й особистої ситуації.",
    action: "Перевірте строк дії документа та повідомлення вашого кантону. Не відкладайте страхування, реєстрацію адреси й повідомлення про зміни.",
    sourceName: "Державний секретаріат з питань міграції (SEM)",
    sourceUrl: "https://www.sem.admin.ch/sem/de/home/sem/aktuell/ukraine-hilfe.html",
  },
  {
    date: "2026-06-19",
    label: "КОНСУЛЬТАЦІЯ",
    title: "Майбутнє після березня 2027 року ще не є остаточним рішенням",
    summary:
      "Федеральна рада відкрила консультацію щодо подальшого регулювання. Пропозиції та сценарії консультації не слід подавати як уже ухвалені правила.",
    action: "Не змінюйте важливі рішення лише через заголовки в медіа. Чекайте фінального рішення та перевіряйте першоджерело.",
    sourceName: "Федеральна рада Швейцарії",
    sourceUrl: "https://www.bk.admin.ch/de/newnsb/0oWuu8LZli5y",
  },
  {
    date: "2025-11-01",
    label: "ЧИННЕ ПРАВИЛО",
    title: "Для нових заяв враховується останній регіон проживання в Україні",
    summary:
      "Для заяв, поданих після 1 листопада 2025 року, SEM оцінює потребу в захисті з урахуванням останнього регіону проживання. Рішення залишається індивідуальним.",
    action: "Підготуйте правдиву послідовну інформацію про останнє місце проживання та документи, що її підтверджують.",
    sourceName: "SEM: інформація для осіб зі статусом S",
    sourceUrl: "https://www.sem.admin.ch/sem/de/home/themen/aufenthalt/nicht_eu_efta/ausweis_s__schutzbeduerftige.html",
  },
] as const;

export const metadata: Metadata = {
  title: "Статус S у Швейцарії: оновлення правил 2026–2027",
  description:
    "Хронологія перевірених змін щодо статусу S для українців у Швейцарії: що вже діє, що лише обговорюється та що робити далі.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Статус S: перевірені оновлення правил",
    description: "Чинні рішення, консультації та практичні наступні кроки для українців у Швейцарії.",
    url: URL,
    type: "website",
    locale: "uk_UA",
  },
};

export default function StatusSUpdatesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: metadata.title,
    description: metadata.description,
    url: URL,
    inLanguage: "uk-UA",
    dateModified: updates[0].date,
    publisher: { "@type": "Organization", name: "Sweezy", url: BASE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: updates.map((update, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Thing",
          name: update.title,
          description: update.summary,
          url: update.sourceUrl,
        },
      })),
    },
  };

  return (
    <main lang="uk" className="min-h-screen bg-dark-900 text-white">
      <JsonLd data={schema} />
      <article className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <Link href="/uk/blog" className="text-sm text-white/45 transition-colors hover:text-white">
          ← Усі гіди
        </Link>

        <header className="mt-10 border-b border-white/10 pb-12">
          <p className="text-xs font-semibold tracking-[.22em] text-accent-green">STATUS S · LIVE TRACKER</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-bold tracking-tight sm:text-7xl">
            Статус S: що змінилося і що діє зараз
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/65">
            Коротка відповідь: статус S чинний до 4 березня 2027 року. Рішення про період після цієї дати ще не остаточне. Нижче — тільки перевірені події, першоджерела й конкретні наступні кроки.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-accent-green px-4 py-2 font-semibold text-black">Оновлено 3 серпня 2026</span>
            <span className="rounded-full border border-white/15 px-4 py-2 text-white/65">Юрисдикція: Швейцарія</span>
            <span className="rounded-full border border-white/15 px-4 py-2 text-white/65">Для людей з України</span>
          </div>
        </header>

        <section className="py-12" aria-labelledby="updates-heading">
          <h2 id="updates-heading" className="text-3xl font-semibold tracking-tight">Хронологія</h2>
          <div className="mt-7 space-y-4">
            {updates.map((update, index) => (
              <article key={`${update.date}-${update.title}`} className="grid gap-6 rounded-3xl border border-white/10 bg-white/[.035] p-6 md:grid-cols-[9rem_1fr] md:p-8">
                <div>
                  <span className="text-xs font-bold tracking-[.16em] text-accent-green">{update.label}</span>
                  <time dateTime={update.date} className="mt-3 block text-sm text-white/45">{update.date.split("-").reverse().join(".")}</time>
                  <span className="mt-5 block text-xs text-white/25">0{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">{update.title}</h3>
                  <p className="mt-4 leading-7 text-white/65">{update.summary}</p>
                  <div className="mt-5 rounded-2xl bg-accent-green/10 p-4">
                    <p className="text-xs font-bold tracking-[.14em] text-accent-green">ЩО РОБИТИ</p>
                    <p className="mt-2 leading-7 text-white/75">{update.action}</p>
                  </div>
                  <a href={update.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-5 inline-flex text-sm font-semibold text-accent-green underline underline-offset-4">
                    {update.sourceName} →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 border-t border-white/10 py-12 md:grid-cols-2">
          <Link href="/uk/blog/status-s-shveytcariya-povnyy-gid" className="rounded-3xl bg-accent-green p-7 text-black transition-transform hover:-translate-y-1">
            <span className="text-xs font-bold tracking-[.16em]">ПОВНИЙ ГІД</span>
            <h2 className="mt-8 text-3xl font-bold">Статус S: права, документи, робота й страхування</h2>
          </Link>
          <Link href="/uk/blog/status-s-pislya-bereznya-2027" className="rounded-3xl border border-white/10 bg-white/[.035] p-7 transition-transform hover:-translate-y-1">
            <span className="text-xs font-bold tracking-[.16em] text-white/45">ПІСЛЯ 2027</span>
            <h2 className="mt-8 text-3xl font-bold">Що відомо про сценарії після березня 2027</h2>
          </Link>
        </section>

        <p className="pb-10 text-sm leading-6 text-white/40">
          Sweezy — практичний путівник, не державний орган і не персональна юридична консультація. Для рішення у вашій справі перевіряйте відповідальний кантон та SEM.
        </p>
      </article>
    </main>
  );
}
