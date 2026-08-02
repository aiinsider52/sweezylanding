import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildLocaleAlternates, BASE_URL } from "../../../lib/alternates";
import { cantons } from "../../../data/cantons";
import { isLocale } from "../../../lib/blog";
import type { Locale } from "../../../lib/i18n";
import { getCantonImage } from "../../../lib/editorial";
import styles from "../editorial.module.css";

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
    eyebrow: string;
    allCantons: string;
    routes: string;
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
    eyebrow: "26 CANTONS · ONE CLEAR SYSTEM",
    allCantons: "Choose your canton",
    routes: "local routes",
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
    eyebrow: "26 КАНТОНІВ · ОДНА ЗРОЗУМІЛА СИСТЕМА",
    allCantons: "Оберіть свій кантон",
    routes: "локальних маршрутів",
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
    eyebrow: "26 KANTONE · EIN KLARES SYSTEM",
    allCantons: "Kanton auswählen",
    routes: "lokale Routen",
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
  return (
    <main lang={locale} className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1 className={styles.heroTitle}>{copy.title}</h1>
          </div>
          <div className={styles.heroAside}>
            <div className={styles.heroCount}>
              26 <span>{copy.routes}</span>
            </div>
            <p>{copy.description}</p>
          </div>
        </div>

        <div className={styles.sectionHead}>
          <h2>{copy.allCantons}</h2>
          <span className={styles.eyebrow}>01 — 26</span>
        </div>

        <div className={styles.cantonGrid}>
          {cantons.map((canton, index) => {
            const image = getCantonImage(canton.slug);
            return (
              <Link
                key={canton.slug}
                href={`/${locale}/guides/${canton.slug}`}
                className={styles.cantonCard}
              >
                {image ? (
                  <div className={styles.cardMedia}>
                    <Image
                      src={image}
                      alt={`${getCantonName(locale, canton)} canton in Switzerland — local guide, services and relocation information`}
                      fill
                      sizes="(max-width: 560px) 100vw, (max-width: 1050px) 50vw, 25vw"
                    />
                  </div>
                ) : null}
                <div className={styles.cardCopy}>
                  <div className="flex items-center justify-between">
                    <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.eyebrow}>{getLanguageRegion(locale, canton)}</span>
                  </div>
                  <h2>{getCantonName(locale, canton)}</h2>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm opacity-60">
                    <span>{copy.capital}: {canton.capital}</span>
                    <span>
                      {new Intl.NumberFormat(locale === "uk" ? "uk-UA" : locale === "de" ? "de-CH" : "en-US").format(canton.population)}
                    </span>
                  </div>
                  <span className={styles.cardLink}>
                    {copy.openGuide} <span aria-hidden>↗</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className={styles.cta}>
          <div>
            <p className={styles.eyebrow}>Sweezy editorial</p>
            <h2>{copy.readBlog}</h2>
            <p className="mt-5 max-w-xl text-white/55">{copy.readBlogDesc}</p>
          </div>
          <Link href={`/${locale}/blog`}>{copy.readBlog} →</Link>
        </div>
      </div>
    </main>
  );
}
