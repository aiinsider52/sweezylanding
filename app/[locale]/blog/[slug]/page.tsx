import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import {
  getAllBlogParams,
  getPostBySlug,
  isLocale,
  type PostFrontmatter,
} from "../../../../lib/blog";
import type { Locale } from "../../../../lib/i18n";
import Link from "next/link";
import { Breadcrumb } from "../../../components/blog/Breadcrumb";
import { JsonLd } from "../../../components/seo/JsonLd";

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
  uk: { home: "Home", blog: "Blog" },
  de: { home: "Home", blog: "Blog" },
};

const LANGUAGE_MAP: Record<Locale, string> = {
  en: "en-US",
  uk: "uk-UA",
  de: "de-CH",
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

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    keywords: post.frontmatter.keywords,
    authors: [{ name: post.frontmatter.author }],
    alternates: {
      canonical: `/${params.locale}/blog/${params.slug}`,
    },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.publishedAt,
      authors: [post.frontmatter.author],
      url: `https://www.sweezy.world/${params.locale}/blog/${params.slug}`,
      images: [
        {
          url: `https://www.sweezy.world/${params.locale}/blog/${params.slug}/opengraph-image`,
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
      images: [
        `https://www.sweezy.world/${params.locale}/blog/${params.slug}/twitter-image`,
      ],
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

  const { content } = await compileMDX<PostFrontmatter>({
    source: post.content,
    options: {
      parseFrontmatter: false,
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
    },
  });

  const locale = params.locale;
  const canonicalUrl = `https://www.sweezy.world/${locale}/blog/${params.slug}`;
  const breadcrumbItems = [
    { label: COPY[locale].home, href: `/${locale}` },
    { label: COPY[locale].blog, href: `/${locale}/blog` },
    { label: post.frontmatter.title },
  ];
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.publishedAt,
    dateModified: post.frontmatter.publishedAt,
    author: {
      "@type": "Person",
      name: post.frontmatter.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Sweezy",
      url: "https://www.sweezy.world",
    },
    inLanguage: LANGUAGE_MAP[locale],
    url: canonicalUrl,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: COPY[locale].home,
        item: `https://www.sweezy.world/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: COPY[locale].blog,
        item: `https://www.sweezy.world/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.frontmatter.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-dark-900 text-white">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <header className="mb-10 border-b border-white/10 pb-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-white/40">
            <time dateTime={post.frontmatter.publishedAt}>
              {formatDate(locale, post.frontmatter.publishedAt)}
            </time>
            <span>{post.readingTimeMinutes} min read</span>
            <span>{post.frontmatter.author}</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {post.frontmatter.title}
          </h1>
          <p className="mt-4 text-lg text-white/55">{post.frontmatter.description}</p>
        </header>

        <div className="prose prose-invert max-w-none">{content}</div>

        <nav className="mt-12 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-sm text-white/55">
            {locale === "uk"
              ? "Досліджуйте гіди по кантонах Швейцарії"
              : locale === "de"
                ? "Entdecken Sie unsere Kantons-Guides"
                : "Explore our Swiss canton guides"}
          </p>
          <Link
            href={`/${locale}/guides`}
            className="flex-shrink-0 text-sm font-medium text-accent-green transition-colors hover:text-accent-emerald"
          >
            {locale === "uk" ? "Гіди" : "Guides"} →
          </Link>
        </nav>
      </article>
    </main>
  );
}

