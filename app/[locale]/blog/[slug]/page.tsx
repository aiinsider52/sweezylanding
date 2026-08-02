import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { buildCanonicalAlternates, BASE_URL } from "../../../../lib/alternates";
import {
  getAllBlogParams,
  getPostsByLocale,
  getPostBySlug,
  isLocale,
  type PostFrontmatter,
} from "../../../../lib/blog";
import type { Locale } from "../../../../lib/i18n";
import Link from "next/link";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { JsonLd } from "../../../components/seo/JsonLd";
import { getPostImage } from "../../../../lib/editorial";
import styles from "../../editorial.module.css";

function formatDate(locale: Locale, value: string) {
  return new Date(value).toLocaleDateString(
    locale === "uk" ? "uk-UA" : locale === "de" ? "de-DE" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );
}

const COPY: Record<Locale, { home: string; blog: string }> = {
  en: { home: "Home", blog: "Blog" },
  uk: { home: "Головна", blog: "Блог" },
  de: { home: "Startseite", blog: "Blog" },
};

const ARTICLE_COPY: Record<
  Locale,
  {
    updated: string;
    editorial: string;
    editorialLink: string;
    related: string;
    read: string;
  }
> = {
  en: {
    updated: "Last reviewed",
    editorial: "How Sweezy researches and reviews guidance",
    editorialLink: "Editorial standards",
    related: "Continue reading",
    read: "Read guide",
  },
  uk: {
    updated: "Остання перевірка",
    editorial: "Як Sweezy досліджує та перевіряє рекомендації",
    editorialLink: "Редакційні стандарти",
    related: "Читайте далі",
    read: "Відкрити гід",
  },
  de: {
    updated: "Zuletzt geprüft",
    editorial: "Wie Sweezy Inhalte recherchiert und prüft",
    editorialLink: "Redaktionelle Standards",
    related: "Weiterlesen",
    read: "Ratgeber öffnen",
  },
};

const LANGUAGE_CODE_MAP: Record<Locale, string> = {
  en: "en",
  uk: "uk",
  de: "de",
};

export async function generateStaticParams() {
  return getAllBlogParams();
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};

  const post = await getPostBySlug(params.locale, params.slug);
  if (!post) return {};
  const pathWithoutLocale = `/blog/${params.slug}`;
  const canonicalUrl = `${BASE_URL}/${params.locale}/blog/${params.slug}`;
  const ogImageUrl = `${BASE_URL}/${params.locale}/blog/${params.slug}/opengraph-image`;
  const twitterImageUrl = `${BASE_URL}/${params.locale}/blog/${params.slug}/twitter-image`;

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    keywords: post.frontmatter.keywords,
    authors: [{ name: post.frontmatter.author }],
    alternates: buildCanonicalAlternates(params.locale, pathWithoutLocale),
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.publishedAt,
      modifiedTime: post.frontmatter.updatedAt ?? post.frontmatter.publishedAt,
      authors: [post.frontmatter.author],
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [twitterImageUrl],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  if (!isLocale(params.locale)) notFound();

  const post = await getPostBySlug(params.locale, params.slug);
  if (!post) notFound();

  const allPosts = await getPostsByLocale(params.locale);
  const preferredRelated = post.frontmatter.relatedPosts ?? [];
  const relatedPosts = [
    ...preferredRelated
      .map((slug) => allPosts.find((candidate) => candidate.slug === slug))
      .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate)),
    ...allPosts.filter(
      (candidate) =>
        candidate.slug !== post.slug && !preferredRelated.includes(candidate.slug),
    ),
  ].slice(0, 3);

  const { content } = await compileMDX<PostFrontmatter>({
    source: post.content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
    components: {
      h1: (props) => <h1 className="mt-8 text-4xl font-bold tracking-tight" {...props} />,
      h2: (props) => <h2 className="mt-10 text-2xl font-semibold tracking-tight" {...props} />,
      h3: (props) => <h3 className="mt-8 text-xl font-semibold tracking-tight" {...props} />,
      p: (props) => <p className="mt-4 leading-8 text-white/70" {...props} />,
      ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6 text-white/70" {...props} />,
      ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-white/70" {...props} />,
      li: (props) => <li {...props} />,
      a: (props) => (
        <a
          {...props}
          className="text-accent-green underline underline-offset-4"
          target={props.href?.startsWith("http") ? "_blank" : undefined}
          rel={props.href?.startsWith("http") ? "noreferrer noopener" : undefined}
        />
      ),
      blockquote: (props) => (
        <blockquote className="mt-6 border-l-2 border-accent-green/50 pl-4 italic text-white/65" {...props} />
      ),
      code: (props) => <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm" {...props} />,
      table: (props) => (
        <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full border-collapse text-left text-sm" {...props} />
        </div>
      ),
      thead: (props) => <thead className="bg-white/[0.06] text-white" {...props} />,
      tbody: (props) => <tbody className="divide-y divide-white/10" {...props} />,
      tr: (props) => <tr className="divide-x divide-white/10" {...props} />,
      th: (props) => <th className="px-4 py-3 font-semibold" {...props} />,
      td: (props) => <td className="px-4 py-3 text-white/65" {...props} />,
    },
  });

  const locale = params.locale;
  const articleCopy = ARTICLE_COPY[locale];
  const canonicalUrl = `${BASE_URL}/${locale}/blog/${params.slug}`;
  const ogImageUrl = `${BASE_URL}/${locale}/blog/${params.slug}/opengraph-image`;
  const breadcrumbItems = [
    { name: COPY[locale].home, url: `/${locale}` },
    { name: COPY[locale].blog, url: `/${locale}/blog` },
    { name: post.frontmatter.title, url: canonicalUrl },
  ];
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: ogImageUrl,
    datePublished: post.frontmatter.publishedAt,
    dateModified: post.frontmatter.updatedAt ?? post.frontmatter.publishedAt,
    author: {
      "@type": "Organization",
      name: post.frontmatter.author,
      url: `${BASE_URL}/${locale}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Sweezy",
      url: "https://www.sweezy.world",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/brand/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    inLanguage: LANGUAGE_CODE_MAP[locale],
    isAccessibleForFree: true,
    url: canonicalUrl,
  };
  return (
    <main lang={locale} className={styles.page}>
      <JsonLd data={articleJsonLd} />
      <article className={styles.articleShell}>
        <header className={styles.articleHero}>
          <div className={styles.articleIntro}>
            <div>
              <Breadcrumb items={breadcrumbItems} />
              <div className={styles.meta}>
                <time dateTime={post.frontmatter.publishedAt}>
                  {formatDate(locale, post.frontmatter.publishedAt)}
                </time>
                <span>
                  {post.readingTimeMinutes}{" "}
                  {locale === "uk" ? "хв читання" : locale === "de" ? "Min. Lesezeit" : "min read"}
                </span>
                <span>{post.frontmatter.category ?? "Sweezy field note"}</span>
              </div>
              <h1>{post.frontmatter.title}</h1>
              <p>{post.frontmatter.description}</p>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-5 border-t border-white/15 pt-6 text-sm text-white/55">
              <div>
                <span className={styles.eyebrow}>By</span>
                <Link href={`/${locale}/about`} className="mt-2 block font-semibold text-white">
                  {post.frontmatter.author}
                </Link>
              </div>
              <div className="text-right">
                <span className={styles.eyebrow}>{articleCopy.updated}</span>
                <strong className="mt-2 block text-white">
                  {formatDate(locale, post.frontmatter.updatedAt ?? post.frontmatter.publishedAt)}
                </strong>
              </div>
            </div>
          </div>
          <div className={styles.articleVisual}>
            <Image
              src={getPostImage(post.slug)}
              alt={`${post.frontmatter.title} — practical Sweezy guide for life in Switzerland`}
              fill
              priority
              sizes="(max-width: 800px) 100vw, 40vw"
            />
          </div>
        </header>

        <div className={styles.articleLayout}>
          <aside className={styles.articleRail}>
            <div className={styles.articleRailBlock}>
              <span className={styles.eyebrow}>{COPY[locale].blog}</span>
              <strong>{post.frontmatter.category ?? "Relocation guide"}</strong>
            </div>
            <div className={styles.articleRailBlock}>
              <span className={styles.eyebrow}>{articleCopy.updated}</span>
              <strong>{formatDate(locale, post.frontmatter.updatedAt ?? post.frontmatter.publishedAt)}</strong>
            </div>
            <div className={styles.articleRailBlock}>
              <Link href={`/${locale}/blog`} className="text-sm font-semibold">← {COPY[locale].blog}</Link>
            </div>
          </aside>

          <div className={styles.articleBody}>{content}</div>

          <aside className={styles.articleAside}>
            <span className={styles.index}>✓</span>
            <h2>{articleCopy.editorial}</h2>
            <Link href={`/${locale}/about`} className="mt-8 inline-flex text-sm font-bold">
              {articleCopy.editorialLink} →
            </Link>
          </aside>
        </div>

        {relatedPosts.length > 0 ? (
          <section className="mt-24 border-t border-black/15 pt-8" aria-labelledby="related-articles-title">
            <div className={styles.sectionHead}>
              <h2 id="related-articles-title">{articleCopy.related}</h2>
              <span className={styles.eyebrow}>Next route</span>
            </div>
            <div className={styles.relatedGrid}>
              {relatedPosts.map((relatedPost, index) => (
                <Link
                  key={relatedPost.slug}
                  href={`/${locale}/blog/${relatedPost.slug}`}
                  className={styles.relatedCard}
                >
                  <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-10 text-2xl font-semibold leading-tight tracking-tight">
                    {relatedPost.frontmatter.title}
                  </h3>
                  <span className={styles.cardLink}>{articleCopy.read} <span aria-hidden>↗</span></span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <div className={styles.cta}>
          <div>
            <p className={styles.eyebrow}>26 cantons · local detail</p>
            <h2>
              {locale === "uk"
                ? "Знайдіть свій кантон."
                : locale === "de"
                  ? "Finden Sie Ihren Kanton."
                  : "Find your canton."}
            </h2>
          </div>
          <Link href={`/${locale}/guides`}>{locale === "uk" ? "Гіди" : "Guides"} →</Link>
        </div>
      </article>
    </main>
  );
}
