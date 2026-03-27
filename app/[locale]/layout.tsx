import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildLocaleAlternates, BASE_URL } from "../../lib/alternates";
import { LocaleProvider } from "../../lib/locale-context";
import { ContentTopBar } from "../components/ContentTopBar";
import { isLocale } from "../../lib/blog";

const DEFAULT_OG_IMAGE = "/screenshots/home.png";

const LOCALE_METADATA = {
  en: {
    title: "Sweezy — Your Guide to Life in Switzerland",
    description:
      "Step-by-step guides, checklists, service map and CV builder for expats in Switzerland. Available in English, Ukrainian and German.",
    ogLocale: "en_US",
  },
  uk: {
    title: "Sweezy — Ваш гід для життя у Швейцарії",
    description:
      "Покрокові гайди, чеклісти, карта сервісів та CV builder для українців у Швейцарії.",
    ogLocale: "uk_UA",
  },
  de: {
    title: "Sweezy — Dein Ratgeber für das Leben in der Schweiz",
    description:
      "Schritt-für-Schritt-Anleitungen, Checklisten und Servicekarte für Expats in der Schweiz.",
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
      <ContentTopBar />
      {children}
    </LocaleProvider>
  );
}

