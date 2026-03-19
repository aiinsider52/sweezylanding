import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostsByLocale, isLocale } from "../../../lib/blog";
import type { Locale } from "../../../lib/i18n";

const COPY: Record<
  Locale,
  {
    title: string;
    description: string;
    empty: string;
    readMore: string;
    backHome: string;
  }
> = {
  en: {
    title: "Sweezy Blog",
    description: "Guides, insights and practical advice for expats building a life in Switzerland.",
    empty: "No posts published yet for this language.",
    readMore: "Read article",
    backHome: "Back to homepage",
  },
  uk: {
    title: "Блог Sweezy",
    description: "Гайди, поради та практичні матеріали для життя у Швейцарії.",
    empty: "Для цієї мови ще немає опублікованих статей.",
    readMore: "Читати статтю",
    backHome: "Назад на головну",
  },
  de: {
    title: "Sweezy Blog",
    description: "Guides, Tipps und praktische Inhalte fur Expats in der Schweiz.",
    empty: "Fur diese Sprache gibt es noch keine veroffentlichten Artikel.",
    readMore: "Artikel lesen",
    backHome: "Zur Startseite",
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

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: `/${params.locale}/blog`,
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
      </div>
    </main>
  );
}

