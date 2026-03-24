import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "../../components/Breadcrumb";
import { buildLocaleAlternates, BASE_URL } from "../../../lib/alternates";
import { cantons } from "../../../data/cantons";
import { isLocale } from "../../../lib/blog";
import type { Locale } from "../../../lib/i18n";

const DEFAULT_OG_IMAGE = "/screenshots/home.png";

const COPY: Record<
  Locale,
  {
    title: string;
    description: string;
    backHome: string;
    breadcrumbHome: string;
    breadcrumbGuides: string;
    population: string;
    capital: string;
    languageRegion: string;
    openGuide: string;
    readBlog: string;
    readBlogDesc: string;
  }
> = {
  en: {
    title: "Swiss Canton Guides",
    description:
      "Explore practical expat guides for all 26 Swiss cantons, from registration and permits to local services and settling in.",
    backHome: "Back to homepage",
    breadcrumbHome: "Home",
    breadcrumbGuides: "Guides",
    population: "Population",
    capital: "Capital",
    languageRegion: "Language region",
    openGuide: "Open guide",
    readBlog: "Read Our Blog",
    readBlogDesc: "Get practical tips, insights, and step-by-step advice for expats in Switzerland.",
  },
  uk: {
    title: "Гіди по кантонах Швейцарії",
    description:
      "Практичні гіди для всіх 26 кантонів Швейцарії: реєстрація, документи, місцеві сервіси та адаптація.",
    backHome: "Назад на головну",
    breadcrumbHome: "Головна",
    breadcrumbGuides: "Гіди",
    population: "Населення",
    capital: "Столиця",
    languageRegion: "Мовний регіон",
    openGuide: "Відкрити гід",
    readBlog: "Читайте наш блог",
    readBlogDesc: "Практичні поради та покрокові інструкції для життя у Швейцарії.",
  },
  de: {
    title: "Schweizer Kantons-Guides",
    description:
      "Praktische Expat-Guides fur alle 26 Kantone der Schweiz: Anmeldung, Dokumente, lokale Services und Alltag.",
    backHome: "Zur Startseite",
    breadcrumbHome: "Startseite",
    breadcrumbGuides: "Guides",
    population: "Bevölkerung",
    capital: "Hauptort",
    languageRegion: "Sprachregion",
    openGuide: "Guide öffnen",
    readBlog: "Lesen Sie unseren Blog",
    readBlogDesc: "Praktische Tipps und Schritt-fur-Schritt-Anleitungen fur Expats in der Schweiz.",
  },
};

function getCantonName(locale: Locale, canton: (typeof cantons)[number]) {
  if (locale === "uk") return canton.nameUk;
  if (locale === "de") return canton.nameDe;
  return canton.name;
}

function getLanguageRegion(locale: Locale, canton: (typeof cantons)[number]) {
  if (locale === "uk") return canton.languageRegionUk;
  if (locale === "de") return canton.languageRegionDe;
  return canton.languageRegion;
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
  const canonicalUrl = `${BASE_URL}/${params.locale}/guides`;

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildLocaleAlternates(params.locale, "/guides"),
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

export default function GuidesIndexPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();

  const locale = params.locale;
  const copy = COPY[locale];
  const breadcrumbItems = [
    { name: copy.breadcrumbHome, url: `/${locale}` },
    { name: copy.breadcrumbGuides, url: `${BASE_URL}/${locale}/guides` },
  ];

  return (
    <main className="min-h-screen bg-dark-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <div className="mb-12">
          <Breadcrumb items={breadcrumbItems} />
          <Link
            href={`/${locale}`}
            className="mb-6 inline-flex text-sm text-white/45 transition-colors hover:text-white"
          >
            {copy.backHome}
          </Link>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{copy.title}</h1>
          <p className="mt-4 max-w-3xl text-base text-white/55">{copy.description}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cantons.map((canton) => (
            <article
              key={canton.slug}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h2 className="text-2xl font-semibold tracking-tight">
                {getCantonName(locale, canton)}
              </h2>
              <div className="mt-4 space-y-2 text-sm text-white/55">
                <p>
                  <span className="text-white/80">{copy.capital}:</span> {canton.capital}
                </p>
                <p>
                  <span className="text-white/80">{copy.population}:</span>{" "}
                  {new Intl.NumberFormat(locale === "uk" ? "uk-UA" : locale === "de" ? "de-CH" : "en-US").format(canton.population)}
                </p>
                <p>
                  <span className="text-white/80">{copy.languageRegion}:</span>{" "}
                  {getLanguageRegion(locale, canton)}
                </p>
              </div>
              <Link
                href={`/${locale}/guides/${canton.slug}`}
                className="mt-5 inline-flex text-sm font-medium text-accent-green transition-colors hover:text-accent-emerald"
              >
                {copy.openGuide}
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-accent-green/20 bg-accent-green/[0.03] p-6">
          <h2 className="text-xl font-semibold tracking-tight">{copy.readBlog}</h2>
          <p className="mt-2 text-white/55 text-sm">{copy.readBlogDesc}</p>
          <Link
            href={`/${locale}/blog`}
            className="mt-4 inline-flex text-sm font-medium text-accent-green transition-colors hover:text-accent-emerald"
          >
            {copy.readBlog} →
          </Link>
        </div>
      </div>
    </main>
  );
}

