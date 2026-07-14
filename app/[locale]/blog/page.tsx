import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildLocaleAlternates, BASE_URL } from "../../../lib/alternates";
import { getPostsByLocale, isLocale } from "../../../lib/blog";
import type { Locale } from "../../../lib/i18n";

const DEFAULT_OG_IMAGE = "/screenshots/home.png";

const COPY: Record<
  Locale,
  {
    metaTitle: string;
    h1: string;
    description: string;
    empty: string;
    readMore: string;
    backHome: string;
    exploreGuides: string;
    exploreGuidesDesc: string;
  }
> = {
  en: {
    metaTitle: "Sweezy Blog: Switzerland Guides for Expats & Newcomers",
    h1: "Switzerland Guides for Expats & Newcomers",
    description: "Step-by-step guides on moving to Switzerland, residence permits, health insurance, banking, housing and more. Updated for 2026.",
    empty: "No posts published yet for this language.",
    readMore: "Read article",
    backHome: "Back to homepage",
    exploreGuides: "Explore Canton Guides",
    exploreGuidesDesc: "Looking for canton-specific information? Browse our detailed guides for all 26 Swiss cantons.",
  },
  uk: {
    metaTitle: "Блог Sweezy: Гіди для українців у Швейцарії",
    h1: "Гіди для українців у Швейцарії",
    description: "Покрокові інструкції для переїзду до Швейцарії: статус S, медична страховка, реєстрація, пошук роботи та житла. Актуально 2026.",
    empty: "Для цієї мови ще немає опублікованих статей.",
    readMore: "Читати статтю",
    backHome: "Назад на головну",
    exploreGuides: "Гіди по кантонах",
    exploreGuidesDesc: "Шукаєте інформацію по конкретному кантону? Перегляньте наші детальні гіди для всіх 26 кантонів Швейцарії.",
  },
  de: {
    metaTitle: "Sweezy Blog: Ratgeber für Expats & Neuzugezogene in der Schweiz",
    h1: "Ratgeber für Expats & Neuzugezogene in der Schweiz",
    description: "Schritt-für-Schritt-Anleitungen für den Umzug in die Schweiz: Aufenthaltsbewilligung, Krankenversicherung, Wohnung finden und mehr. Aktuell 2026.",
    empty: "Für diese Sprache gibt es noch keine veröffentlichten Artikel.",
    readMore: "Artikel lesen",
    backHome: "Zur Startseite",
    exploreGuides: "Kantons-Guides entdecken",
    exploreGuidesDesc: "Suchen Sie kantonsspezifische Informationen? Durchstöbern Sie unsere detaillierten Guides für alle 26 Schweizer Kantone.",
  },
};

function formatDate(locale: Locale, value: string) {
  return new Date(value).toLocaleDateString(locale === "uk" ? "uk-UA" : locale === "de" ? "de-DE" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const UK_FEATURED = [
  {
    href: "/uk/blog/status-s-shveytcariya-povnyy-gid",
    eyebrow: "ГОЛОВНИЙ ГІД",
    title: "Статус S у Швейцарії 2026–2027",
    description: "Чинні правила, права, документи, робота, страхування та виплати в одному місці.",
  },
  {
    href: "/uk/blog/status-s-pislya-bereznya-2027",
    eyebrow: "ОНОВЛЕНО 14.07.2026",
    title: "Що буде зі статусом S після березня 2027",
    description: "Три сценарії Федеральної ради та зміни, які зараз лише обговорюються.",
  },
  {
    href: "/uk/blog/poshuk-roboty-shveytcariya-2026",
    eyebrow: "РОБОТА",
    title: "Як знайти роботу у Швейцарії",
    description: "Практичний план для українців: документи, резюме, вакансії та перші кроки.",
  },
  {
    href: "/uk/blog/pereizd-do-shveytcariyi-chekist",
    eyebrow: "ПЕРШІ 30 ДНІВ",
    title: "Переїзд до Швейцарії: чеклист",
    description: "Реєстрація, адреса, страхування, банк і справи, які не можна пропустити.",
  },
] as const;

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "uk" }, { locale: "de" }];
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const copy = COPY[params.locale];
  const canonicalUrl = `${BASE_URL}/${params.locale}/blog`;

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: buildLocaleAlternates(params.locale, "/blog"),
    openGraph: {
      title: copy.metaTitle,
      description: copy.description,
      url: canonicalUrl,
      siteName: "Sweezy",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: copy.metaTitle,
        },
      ],
      locale: params.locale === "uk" ? "uk_UA" : params.locale === "de" ? "de_DE" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metaTitle,
      description: copy.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();

  const locale = params.locale;
  const copy = COPY[locale];
  const posts = await getPostsByLocale(locale);

  return (
    <main lang={locale} className="min-h-screen bg-dark-900 text-white">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <div className="mb-12">
          <Link
            href={`/${locale}`}
            className="mb-6 inline-flex text-sm text-white/45 transition-colors hover:text-white"
          >
            {copy.backHome}
          </Link>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{copy.h1}</h1>
          <p className="mt-4 max-w-2xl text-base text-white/55">{copy.description}</p>
        </div>

        {locale === "uk" ? (
          <section className="mb-14" aria-labelledby="ukrainian-start-title">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-green">
                  Почніть звідси
                </p>
                <h2 id="ukrainian-start-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Найважливіше для українців
                </h2>
              </div>
              <span className="hidden text-sm text-white/35 sm:block">Перевірено у липні 2026</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {UK_FEATURED.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group rounded-2xl border p-6 transition-all hover:-translate-y-0.5 hover:border-accent-green/55 ${
                    index === 0
                      ? "border-accent-green/35 bg-accent-green/[0.07] sm:col-span-2"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <p className="font-mono text-[11px] tracking-[0.16em] text-accent-green/80">{item.eyebrow}</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight transition-colors group-hover:text-accent-green">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">{item.description}</p>
                  <span className="mt-5 inline-flex text-sm font-medium text-accent-green">Відкрити →</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <div className="space-y-5">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-10 text-white/50">
              {copy.empty}
            </div>
          ) : (
            posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-white/40">
                  <time dateTime={post.frontmatter.publishedAt}>
                    {formatDate(locale, post.frontmatter.publishedAt)}
                  </time>
                  <span>{post.readingTimeMinutes} {locale === "uk" ? "хв читання" : locale === "de" ? "Min. Lesezeit" : "min read"}</span>
                  <span>{post.frontmatter.author}</span>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="transition-colors hover:text-accent-green"
                  >
                    {post.frontmatter.title}
                  </Link>
                </h2>
                <p className="mt-3 text-white/55">{post.frontmatter.description}</p>
                <span
                  aria-hidden="true"
                  className="mt-5 inline-flex text-sm font-medium text-accent-green"
                >
                  {copy.readMore} →
                </span>
              </article>
            ))
          )}
        </div>

        <div className="mt-16 rounded-2xl border border-accent-green/20 bg-accent-green/[0.03] p-6">
          <h2 className="text-xl font-semibold tracking-tight">{copy.exploreGuides}</h2>
          <p className="mt-2 text-white/55 text-sm">{copy.exploreGuidesDesc}</p>
          <Link
            href={`/${locale}/guides`}
            className="mt-4 inline-flex text-sm font-medium text-accent-green transition-colors hover:text-accent-emerald"
          >
            {copy.exploreGuides} →
          </Link>
        </div>
      </div>
    </main>
  );
}
