import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { JsonLd } from "../../../components/seo/JsonLd";
import { buildLocaleAlternates, BASE_URL } from "../../../../lib/alternates";
import { cantons, getCantonBySlug } from "../../../../data/cantons";
import { isLocale } from "../../../../lib/blog";
import type { Locale } from "../../../../lib/i18n";
import { APP_STORE_URL } from "../../../../lib/links";
import Link from "next/link";

const COPY: Record<
  Locale,
  {
    home: string;
    guides: string;
    title: (name: string) => string;
    description: (name: string, capital: string) => string;
    overview: string;
    registration: string;
    services: string;
    whySweezy: string;
    download: string;
    capital: string;
    population: string;
    languageRegion: string;
    registrationLead: (name: string, capital: string) => string;
    servicesLead: (name: string, capital: string) => string;
    sweezyLead: (name: string) => string;
    overviewLead: (name: string, capital: string, population: string, region: string) => string;
    reg1: string;
    reg2: string;
    reg3: string;
    srv1: string;
    srv2: string;
    srv3: string;
    srv4: string;
    ctaLead: (name: string) => string;
  }
> = {
  en: {
    home: "Home",
    guides: "Guides",
    title: (name) => `Moving to ${name} — Expat Guide | Sweezy`,
    description: (name, capital) =>
      `Practical expat guide to ${name}: registration steps, permit workflow, local services in ${capital}, and how to settle in with confidence.`,
    overview: "Canton overview",
    registration: "Registration steps after arrival",
    services: "Key services to find early",
    whySweezy: "Why Sweezy helps in this canton",
    download: "Download Sweezy on the App Store",
    capital: "Capital",
    population: "Population",
    languageRegion: "Language region",
    registrationLead: (name, capital) =>
      `${name} has its own cantonal habits, but your move usually starts with local registration in or near ${capital}. After you move in, check the municipality website, book an appointment if required, and prepare your passport, housing proof, employment or residence documents, and any family paperwork.`,
    servicesLead: (name, capital) =>
      `In ${name}, most newcomers should identify a few practical services early: the municipal office, cantonal migration authority where relevant, health insurance comparison workflow, nearby hospitals or clinics, public transport points, and local banking options in ${capital} or your commune.`,
    sweezyLead: (name) =>
      `Sweezy is especially useful in ${name} because it connects relocation guidance with real-life execution. Instead of reading rules in isolation, you can track registration tasks, explore nearby services, and keep permit, insurance, and job-search steps in one workflow.`,
    overviewLead: (name, capital, population, region) =>
      `${name} is one of the 26 Swiss cantons and gives newcomers a mix of local administration, practical infrastructure, and canton-specific rules. With a population of ${population}, a capital in ${capital}, and a ${region.toLowerCase()} context, it is helpful to prepare for both official formalities and daily-life routines before you settle in.`,
    reg1: "Check the local municipality website for deadlines, appointments, and forms.",
    reg2: "Prepare passport, rental contract, permit or work documents, and family records.",
    reg3: "Track health insurance, banking, and permit follow-up right after registration.",
    srv1: "Municipal registration office or residents office",
    srv2: "Relevant cantonal migration or permit authority",
    srv3: "Hospitals, clinics, and insurance-related support services",
    srv4: "Transport hubs, public service counters, and nearby banks",
    ctaLead: (name) =>
      `Use Sweezy to turn Swiss bureaucracy into a clear, step-by-step plan for registration, insurance, service discovery, and job preparation in ${name}.`,
  },
  uk: {
    home: "Головна",
    guides: "Гіди",
    title: (name) => `Переїзд до ${name} — гід для експатів | Sweezy`,
    description: (name, capital) =>
      `Практичний гід по ${name}: реєстрація після переїзду, документи, ключові сервіси у ${capital} та адаптація у кантоні.`,
    overview: "Огляд кантону",
    registration: "Що зробити після переїзду",
    services: "Ключові сервіси, які варто знайти одразу",
    whySweezy: "Чому Sweezy корисний у цьому кантоні",
    download: "Завантажити Sweezy в App Store",
    capital: "Столиця",
    population: "Населення",
    languageRegion: "Мовний регіон",
    registrationLead: (name, capital) =>
      `У ${name} є свої локальні адміністративні нюанси, але старт після переїзду майже завжди починається з реєстрації у громаді біля ${capital}. Після заселення перевірте сайт вашої Gemeinde або commune, підготуйте паспорт, договір оренди, підставу перебування та документи сім'ї, якщо вони потрібні.`,
    servicesLead: (name, capital) =>
      `У ${name} новоприбулим важливо швидко знайти базові сервіси: муніципальний офіс, міграційний орган кантону, варіанти медичного страхування, лікарні або клініки, транспортну інфраструктуру та банківські сервіси в ${capital} або вашому місті.`,
    sweezyLead: (name) =>
      `Sweezy особливо корисний у ${name}, бо допомагає не губитися між окремими завданнями. У застосунку можна поєднати гайди, чеклісти, карту сервісів і наступні кроки після реєстрації в один зрозумілий план.`,
    overviewLead: (name, capital, population, region) =>
      `${name} — один із 26 кантонів Швейцарії, де поєднуються локальна адміністрація, повсякденна інфраструктура та кантональні правила. Якщо в кантоні проживає близько ${population} людей, столицею є ${capital}, а мовний контекст тут ${region}, то до переїзду варто підготуватися і з бюрократичного, і з практичного боку.`,
    reg1: "Перевірте сайт місцевої громади: строки, запис, форми та перелік документів.",
    reg2: "Підготуйте паспорт, договір оренди, підставу перебування та документи родини.",
    reg3: "Одразу після реєстрації відстежуйте страховку, банк і permit follow-up.",
    srv1: "Муніципальний офіс реєстрації або residents office",
    srv2: "Потрібний кантональний міграційний чи permit орган",
    srv3: "Лікарні, клініки та сервіси, пов'язані зі страховкою",
    srv4: "Транспортні вузли, public service counters і банки поруч",
    ctaLead: (name) =>
      `Використовуйте Sweezy, щоб пройти реєстрацію, страховку, пошук сервісів і старт у ${name} за зрозумілим покроковим планом.`,
  },
  de: {
    home: "Startseite",
    guides: "Guides",
    title: (name) => `Umzug nach ${name} — Expat Guide | Sweezy`,
    description: (name, capital) =>
      `Praktischer Expat-Guide fur ${name}: Anmeldung, Dokumente, wichtige Services in ${capital} und ein strukturierter Start im Kanton.`,
    overview: "Kantonsuberblick",
    registration: "Anmeldung und erste Schritte",
    services: "Wichtige Services am Anfang",
    whySweezy: "Warum Sweezy in diesem Kanton hilft",
    download: "Sweezy im App Store laden",
    capital: "Hauptort",
    population: "Bevölkerung",
    languageRegion: "Sprachregion",
    registrationLead: (name, capital) =>
      `In ${name} gibt es kantonale Besonderheiten, aber der Start nach dem Umzug beginnt fast immer mit der lokalen Anmeldung in oder nahe ${capital}. Nach dem Einzug sollten Sie die Website Ihrer Gemeinde prufen, bei Bedarf einen Termin buchen und Pass, Wohnnachweis, Arbeitsvertrag oder andere Aufenthaltsunterlagen bereithalten.`,
    servicesLead: (name, capital) =>
      `In ${name} sollten Expats fruh einige Kernstellen kennen: Gemeinde, zustandige Migrationsstelle, Krankenversicherungsoptionen, Spitaler oder Kliniken, Verkehrsanbindung und praktische Bankservices in ${capital} oder Ihrer Wohnregion.`,
    sweezyLead: (name) =>
      `Sweezy ist in ${name} besonders hilfreich, weil die App nicht nur Informationen liefert, sondern den ganzen Ankommensprozess strukturiert. Guides, Checklisten, Services in der Nahe und nachste Schritte bleiben dadurch an einem Ort.`,
    overviewLead: (name, capital, population, region) =>
      `${name} gehort zu den 26 Schweizer Kantonen und verbindet lokale Verwaltung, praktische Infrastruktur und kantonsspezifische Ablaufe. Mit rund ${population} Einwohnern, dem Hauptort ${capital} und einem ${region.toLowerCase()} Umfeld lohnt es sich, den Umzug sowohl organisatorisch als auch alltagstauglich vorzubereiten.`,
    reg1: "Prufen Sie die Website Ihrer Gemeinde auf Fristen, Termine und Formulare.",
    reg2: "Bereiten Sie Pass, Mietvertrag, Aufenthaltsgrundlage und Familiendokumente vor.",
    reg3: "Behalten Sie danach Krankenversicherung, Bank und Permit-Follow-up im Blick.",
    srv1: "Gemeindeverwaltung oder Einwohneramt",
    srv2: "Zustandige kantonale Migrations- oder Bewilligungsstelle",
    srv3: "Spitaler, Kliniken und versicherungsnahe Services",
    srv4: "Verkehrsknoten, Service-Schalter und Banken in der Nahe",
    ctaLead: (name) =>
      `Nutzen Sie Sweezy, um Anmeldung, Versicherung, Servicesuche und den Start in ${name} als klaren Schritt-fur-Schritt-Prozess zu organisieren.`,
  },
};

const LANG_MAP: Record<Locale, string> = {
  en: "en-US",
  uk: "uk-UA",
  de: "de-CH",
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

function formatPopulation(locale: Locale, value: number) {
  return new Intl.NumberFormat(
    locale === "uk" ? "uk-UA" : locale === "de" ? "de-CH" : "en-US",
  ).format(value);
}

export async function generateStaticParams() {
  return ["en", "uk", "de"].flatMap((locale) =>
    cantons.map((canton) => ({ locale, canton: canton.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; canton: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};

  const canton = getCantonBySlug(params.canton);
  if (!canton) return {};

  const locale = params.locale;
  const copy = COPY[locale];
  const name = getCantonName(locale, canton);
  const canonicalUrl = `${BASE_URL}/${locale}/guides/${canton.slug}`;
  const ogImageUrl = `${canonicalUrl}/opengraph-image`;

  return {
    title: copy.title(name),
    description: copy.description(name, canton.capital),
    alternates: buildLocaleAlternates(locale, `/guides/${canton.slug}`),
    openGraph: {
      title: copy.title(name),
      description: copy.description(name, canton.capital),
      url: canonicalUrl,
      siteName: "Sweezy",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: copy.title(name),
        },
      ],
      locale: locale === "uk" ? "uk_UA" : locale === "de" ? "de_DE" : "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title(name),
      description: copy.description(name, canton.capital),
      images: [ogImageUrl],
    },
  };
}

export default function CantonGuidePage({
  params,
}: {
  params: { locale: string; canton: string };
}) {
  if (!isLocale(params.locale)) notFound();

  const canton = getCantonBySlug(params.canton);
  if (!canton) notFound();

  const locale = params.locale;
  const copy = COPY[locale];
  const name = getCantonName(locale, canton);
  const canonicalUrl = `${BASE_URL}/${locale}/guides/${canton.slug}`;
  const breadcrumbItems = [
    { name: copy.home, url: `/${locale}` },
    { name: copy.guides, url: `/${locale}/guides` },
    { name, url: canonicalUrl },
  ];
  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name,
    url: canonicalUrl,
    address: {
      "@type": "PostalAddress",
      addressRegion: canton.nameDe,
      addressCountry: "CH",
    },
    containedInPlace: {
      "@type": "Country",
      name: "Switzerland",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Capital",
        value: canton.capital,
      },
      {
        "@type": "PropertyValue",
        name: "Population",
        value: canton.population,
      },
      {
        "@type": "PropertyValue",
        name: "Language region",
        value: getLanguageRegion(locale, canton),
      },
    ],
  };
  return (
    <main className="min-h-screen bg-dark-900 text-white">
      <JsonLd data={placeJsonLd} />
      <article className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <Breadcrumb items={breadcrumbItems} />

        <header className="mb-10 border-b border-white/10 pb-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {copy.title(name).replace(" | Sweezy", "")}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-white/55">
            {copy.description(name, canton.capital)}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3 text-sm text-white/60">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-white/35">{copy.capital}</p>
              <p className="mt-1 text-base font-medium text-white">{canton.capital}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-white/35">{copy.population}</p>
              <p className="mt-1 text-base font-medium text-white">
                {formatPopulation(locale, canton.population)}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-white/35">{copy.languageRegion}</p>
              <p className="mt-1 text-base font-medium text-white">
                {getLanguageRegion(locale, canton)}
              </p>
            </div>
          </div>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">{copy.overview}</h2>
            <p className="mt-4 leading-8 text-white/70">
              {copy.overviewLead(
                name,
                canton.capital,
                formatPopulation(locale, canton.population),
                getLanguageRegion(locale, canton),
              )}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">{copy.registration}</h2>
            <p className="mt-4 leading-8 text-white/70">
              {copy.registrationLead(name, canton.capital)}
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-white/70">
              <li>{copy.reg1}</li>
              <li>{copy.reg2}</li>
              <li>{copy.reg3}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">{copy.services}</h2>
            <p className="mt-4 leading-8 text-white/70">
              {copy.servicesLead(name, canton.capital)}
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-white/70">
              <li>{copy.srv1}</li>
              <li>{copy.srv2}</li>
              <li>{copy.srv3}</li>
              <li>{copy.srv4}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">{copy.whySweezy}</h2>
            <p className="mt-4 leading-8 text-white/70">{copy.sweezyLead(name)}</p>
            <p className="mt-4 leading-8 text-white/70">
              Instead of keeping notes in different apps, you can use Sweezy to move through the
              practical settlement sequence: understand the process, save the next step, and locate
              the nearby services you actually need in {name}.
            </p>
            {locale === "en" && canton.slug === "zurich" ? (
              <div className="mt-6 rounded-2xl border border-accent-green/20 bg-accent-green/[0.04] p-5">
                <h2 className="text-2xl font-semibold tracking-tight">Useful links for Zurich expats</h2>
                <div className="mt-4 space-y-3 text-white/70">
                  <p>
                    Read the in-depth{" "}
                    <Link
                      href="/en/blog/moving-to-zurich-guide"
                      className="text-accent-green transition-colors hover:text-accent-emerald"
                    >
                      Moving to Zurich Guide
                    </Link>{" "}
                    for district-by-district registration advice, housing tips, transport costs,
                    and first-week priorities.
                  </p>
                  <p>
                    For the broader Swiss process, start with{" "}
                    <Link
                      href="/en/blog/how-to-register-switzerland"
                      className="text-accent-green transition-colors hover:text-accent-emerald"
                    >
                      How to Register in Switzerland
                    </Link>
                    .
                  </p>
                </div>
              </div>
            ) : null}
          </section>

          <section className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm text-white/55">
              {locale === "uk"
                ? "Читайте більше порад у нашому блозі"
                : locale === "de"
                  ? "Lesen Sie weitere Tipps in unserem Blog"
                  : "Read more tips on our blog"}
            </p>
            <Link
              href={`/${locale}/blog`}
              className="flex-shrink-0 text-sm font-medium text-accent-green transition-colors hover:text-accent-emerald"
            >
              {locale === "uk" ? "Блог" : "Blog"} →
            </Link>
          </section>

          <section className="rounded-2xl border border-accent-green/20 bg-accent-green/[0.05] p-6">
            <h2 className="text-2xl font-semibold tracking-tight">Sweezy</h2>
            <p className="mt-3 text-white/65">{copy.ctaLead(name)}</p>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 inline-flex rounded-xl bg-accent-green px-5 py-3 text-sm font-semibold text-dark-950 transition-opacity hover:opacity-90"
            >
              {copy.download}
            </a>
          </section>
        </div>
      </article>
    </main>
  );
}

