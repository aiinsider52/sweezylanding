import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildLocaleAlternates, BASE_URL } from "../../lib/alternates";
import { LocaleProvider } from "../../lib/locale-context";
import { isLocale } from "../../lib/blog";

const DEFAULT_OG_IMAGE = "/screenshots/home.png";

const LOCALE_METADATA = {
  en: {
    title: "Sweezy App — Move to Switzerland with Clear Steps",
    description:
      "Sweezy app combines step-by-step relocation guides, checklists, jobs, local places and community help for newcomers moving to Switzerland.",
    ogLocale: "en_US",
  },
  uk: {
    title: "Sweezy — застосунок для українців у Швейцарії",
    description:
      "Переїзд і життя у Швейцарії: покрокові гайди, документи, робота, красиві місця та допомога спільноти в застосунку Sweezy.",
    ogLocale: "uk_UA",
  },
  de: {
    title: "Sweezy App — Ankommen und leben in der Schweiz",
    description:
      "Schritt-für-Schritt-Guides, Checklisten, Jobs, Orte und Community-Hilfe für Menschen, die neu in die Schweiz ziehen.",
    ogLocale: "de_DE",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};

  const canonicalUrl = `${BASE_URL}/${params.locale}`;
  const current = LOCALE_METADATA[params.locale];

  return {
    metadataBase: new URL(BASE_URL),
    title: current.title,
    description: current.description,
    alternates: buildLocaleAlternates(params.locale),
    openGraph: {
      title: current.title,
      description: current.description,
      url: canonicalUrl,
      siteName: "Sweezy",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: current.title,
        },
      ],
      locale: current.ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: current.title,
      description: current.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default function LocaleBlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();

  return (
    <LocaleProvider initialLocale={params.locale}>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(params.locale)};`,
        }}
      />
      {children}
    </LocaleProvider>
  );
}
