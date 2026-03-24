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
    title: string;
    description: string;
    empty: string;
    readMore: string;
    backHome: string;
    exploreGuides: string;
    exploreGuidesDesc: string;
  }
> = {
  en: {
    title: "Sweezy Blog",
    description: "Guides, insights and practical advice for expats building a life in Switzerland.",
    empty: "No posts published yet for this language.",
    readMore: "Read article",
    backHome: "Back to homepage",
    exploreGuides: "Explore Canton Guides",
    exploreGuidesDesc: "Looking for canton-specific information? Browse our detailed guides for all 26 Swiss cantons.",
  },
  uk: {
    title: "Блог Sweezy",
    description: "Гайди, поради та практичні матеріали для життя у Швейцарії.",
    empty: "Для цієї мови ще немає опублікованих статей.",
    readMore: "Читати статтю",
    backHome: "Назад на головну",
    exploreGuides: "Гіди по кантонах",
    exploreGuidesDesc: "Шукаєте інформацію по конкретному кантону? Перегляньте наші детальні гіди для всіх 26 кантонів Швейцарії.",
  },
  de: {
    title: "Sweezy Blog",
    description: "Guides, Tipps und praktische Inhalte fur Expats in der Schweiz.",
    empty: "Fur diese Sprache gibt es noch keine veroffentlichten Artikel.",
    readMore: "Artikel lesen",
    backHome: "Zur Startseite",
    exploreGuides: "Kantons-Guides entdecken",
    exploreGuidesDesc: "Suchen Sie kantonsspezifische Informationen? Durchstobern Sie unsere detaillierten Guides fur alle 26 Schweizer Kantone.",
  },
};

function formatDate(locale: Locale, value: string) {
  return new Date(value).toLocaleDateString(locale === "uk" ? "uk-UA" : locale === "de" ? "de-DE" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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
    title: copy.title,
    description: copy.description,
    alternates: buildLocaleAlternates(params.locale, "/blog"),
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: canonicalUrl,
      siteName: "Sweezy",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: copy.title,
        },
      ],
      locale: params.locale === "uk" ? "uk_UA" : params.locale === "de" ? "de_DE" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
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
    <main className="min-h-screen bg-dark-900 text-white">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <div className="mb-12">
          <Link
            href={`/${locale}`}
            className="mb-6 inline-flex text-sm text-white/45 transition-colors hover:text-white"
          >
            {copy.backHome}
          </Link>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{copy.title}</h1>
          <p className="mt-4 max-w-2xl text-base text-white/55">{copy.description}</p>
        </div>

        <div className="space-y-5">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-10 text-white/50">
              {copy.empty}
            </div>
          ) : (
            posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-white/40">
                  <time dateTime={post.frontmatter.publishedAt}>
                    {formatDate(locale, post.frontmatter.publishedAt)}
                  </time>
                  <span>{post.readingTimeMinutes} min read</span>
                  <span>{post.frontmatter.author}</span>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight">{post.frontmatter.title}</h2>
                <p className="mt-3 text-white/55">{post.frontmatter.description}</p>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="mt-5 inline-flex text-sm font-medium text-accent-green transition-colors hover:text-accent-emerald"
                >
                  {copy.readMore}
                </Link>
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

