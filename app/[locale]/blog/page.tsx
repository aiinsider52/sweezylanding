import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildLocaleAlternates, BASE_URL } from "../../../lib/alternates";
import { getPostsByLocale, isLocale } from "../../../lib/blog";
import type { Locale } from "../../../lib/i18n";
import { getPostArtwork, getPostImage, getPostImageAlt, getPostDisplayTitle } from "../../../lib/editorial";
import { Breadcrumb } from "../../components/Breadcrumb";
import journal from "./journal.module.css";
import styles from "../editorial.module.css";

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
    eyebrow: string;
    latest: string;
    articles: string;
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
    eyebrow: "FIELD NOTES · SWITZERLAND",
    latest: "Latest field note",
    articles: "Practical notes",
  },
  uk: {
    metaTitle: "Блог Sweezy: Гіди для українців у Швейцарії",
    h1: "Гіди для українців у Швейцарії",
    description: "Гіди для українців у Швейцарії: статус S, робота, власний бізнес, реєстрація, страхування та житло. Покрокові плани й офіційні джерела.",
    empty: "Для цієї мови ще немає опублікованих статей.",
    readMore: "Читати статтю",
    backHome: "Назад на головну",
    exploreGuides: "Гіди по кантонах",
    exploreGuidesDesc: "Шукаєте інформацію по конкретному кантону? Перегляньте наші детальні гіди для всіх 26 кантонів Швейцарії.",
    eyebrow: "ПОЛЬОВІ НОТАТКИ · ШВЕЙЦАРІЯ",
    latest: "Останній матеріал",
    articles: "Практичні матеріали",
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
    eyebrow: "FIELD NOTES · SCHWEIZ",
    latest: "Neuester Beitrag",
    articles: "Praktische Notizen",
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
    href: "/uk/blog/biznes-u-shveytcariyi-dlya-ukrayintsiv",
    eyebrow: "ВЛАСНА СПРАВА",
    title: "Бізнес у Швейцарії для українців",
    description: "З чого почати, як оформити самозайнятість, обрати форму та знайти бізнес-спільноту.",
  },
  {
    href: "/uk/status-s-updates",
    eyebrow: "LIVE TRACKER",
    title: "Оновлення статусу S",
    description: "Що вже діє, що лише обговорюється та які наступні кроки варто зробити.",
  },
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

const HERO_UI = {
  en: { code: "GUIDES / 04", panel: "Sweezy knowledge desk", count: "Published guides", focus: "Relocation & permits", current: "Reviewed guidance" },
  uk: { code: "ГІДИ / 04", panel: "База знань Sweezy", count: "Опубліковано", focus: "Статус S і переїзд", current: "Перевірені матеріали" },
  de: { code: "RATGEBER / 04", panel: "Sweezy Wissensbasis", count: "Veröffentlichte Guides", focus: "Umzug & Bewilligung", current: "Geprüfte Orientierung" },
} satisfies Record<Locale, { code: string; panel: string; count: string; focus: string; current: string }>;

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
  const socialImage = `${canonicalUrl}/opengraph-image`;

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
          url: socialImage,
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
      images: [socialImage],
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
  const heroUi = HERO_UI[locale];
  const posts = await getPostsByLocale(locale);
  const [leadPost, ...remainingPosts] = posts;

  return (
    <main lang={locale} className={styles.page}>
      <div className={journal.shell}>
        <Breadcrumb items={[
          { name: locale === "uk" ? "Головна" : locale === "de" ? "Start" : "Home", url: `/${locale}` },
          { name: copy.eyebrow, url: `${BASE_URL}/${locale}/blog` },
        ]} />
        <header className={journal.intro}>
          <div>
            <p className={journal.eyebrow}>{copy.eyebrow}</p>
            <h1>{copy.h1}</h1>
            <p className={journal.description}>{copy.description}</p>
          </div>
          <a href="#latest" className={journal.libraryNote}>
            <span className={journal.noteTop}>SWEEZY / JOURNAL <span aria-hidden>↙</span></span>
            <strong>{String(posts.length).padStart(2, "0")}<span>{heroUi.count}</span></strong>
            <span className={journal.noteBottom}>{copy.latest} <span aria-hidden>↓</span></span>
          </a>
        </header>
        <nav className={journal.countryNav} aria-label={locale === "uk" ? "Гіди за країнами" : locale === "de" ? "Ratgeber nach Land" : "Guides by country"}>
          <span>DACH /</span>
          <Link href={`/${locale}/countries/switzerland`}>{locale === "uk" ? "Швейцарія" : locale === "de" ? "Schweiz" : "Switzerland"} <span>CH ↗</span></Link>
          <Link href={`/${locale}/countries/germany`}>{locale === "uk" ? "Німеччина" : locale === "de" ? "Deutschland" : "Germany"} <span>DE ↗</span></Link>
          <Link href={`/${locale}/countries/austria`}>{locale === "uk" ? "Австрія" : locale === "de" ? "Österreich" : "Austria"} <span>AT ↗</span></Link>
        </nav>

        {leadPost ? (
          <>
            <div className={styles.sectionHead} id="latest">
              <h2>{copy.latest}</h2>
              <span className={styles.eyebrow}>01</span>
            </div>
            <Link href={`/${locale}/blog/${leadPost.slug}`} className={journal.featured}>
              <div className={journal.featuredMedia}>
                <Image
                  src={getPostImage(locale, leadPost.slug)}
                  alt={getPostImageAlt(locale, leadPost.frontmatter.title, leadPost.slug)}
                  fill
                  priority
                  sizes="(max-width: 760px) 100vw, 55vw"
                />
              </div>
              <div className={journal.featuredCopy}>
                <div>
                  <div className={styles.storyLabel}>
                    <span>{getPostArtwork(leadPost.slug, locale).label}</span>
                    <span>SWEEZY / 01</span>
                  </div>
                  <div className={styles.meta}>
                    <time dateTime={leadPost.frontmatter.publishedAt}>
                      {formatDate(locale, leadPost.frontmatter.publishedAt)}
                    </time>
                    <span>{leadPost.readingTimeMinutes} {locale === "uk" ? "хв" : locale === "de" ? "Min." : "min"}</span>
                  </div>
                  <h2>{getPostDisplayTitle(leadPost.frontmatter.title)}</h2>
                  <p>{leadPost.frontmatter.description}</p>
                </div>
                <span className={journal.featuredAction}>
                  {copy.readMore} →
                </span>
              </div>
            </Link>
          </>
        ) : (
          <p className="py-12 opacity-50">{copy.empty}</p>
        )}

        {locale === "uk" ? (
          <section aria-labelledby="ukrainian-start-title">
            <div className={styles.sectionHead}>
              <h2 id="ukrainian-start-title">Почніть звідси</h2>
              <span className={styles.eyebrow}>Офіційні джерела · практичні кроки</span>
            </div>
            <div className={journal.startGrid}>
              {UK_FEATURED.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={journal.startItem}
                >
                  <div className="flex items-center justify-between">
                    <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.eyebrow}>{item.eyebrow}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {remainingPosts.length ? (
          <>
            <div className={styles.sectionHead}>
              <h2>{copy.articles}</h2>
              <span className={styles.eyebrow}>02 — {String(posts.length).padStart(2, "0")}</span>
            </div>
            <div className={journal.postGrid}>
              {remainingPosts.map((post) => {
                const artwork = getPostArtwork(post.slug, locale);
                return (
                <Link
                  key={post.slug}
                  href={`/${locale}/blog/${post.slug}`}
                  className={journal.postCard}
                >
                  <div className={journal.cardMedia}>
                    <Image
                      src={getPostImage(locale, post.slug)}
                      alt={getPostImageAlt(locale, post.frontmatter.title, post.slug)}
                      fill
                      sizes="(max-width: 620px) 100vw, (max-width: 1100px) 50vw, (min-width: 1900px) 25vw, 33vw"
                    />
                    <span className={journal.imageTopic}>{artwork.label}</span>
                  </div>
                  <div className={journal.cardCopy}>
                    <div className={styles.meta}>
                      <time dateTime={post.frontmatter.publishedAt}>{formatDate(locale, post.frontmatter.publishedAt)}</time>
                      <span>{post.readingTimeMinutes} {locale === "uk" ? "хв" : locale === "de" ? "Min." : "min"}</span>
                    </div>
                    <h2>{getPostDisplayTitle(post.frontmatter.title)}</h2>
                    <p>{post.frontmatter.description}</p>
                    <span className={journal.cardLink}>{copy.readMore} <span aria-hidden>↗</span></span>
                  </div>
                </Link>
              )})}
            </div>
          </>
        ) : null}

        <div className={styles.cta}>
          <div>
            <p className={styles.eyebrow}>26 cantons · local detail</p>
            <h2>{copy.exploreGuides}</h2>
            <p className="mt-5 max-w-xl text-white/55">{copy.exploreGuidesDesc}</p>
          </div>
          <Link href={`/${locale}/guides`}>{copy.exploreGuides} →</Link>
        </div>
      </div>
    </main>
  );
}
