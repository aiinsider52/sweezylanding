import type { Metadata } from "next";
import { LocaleProvider } from "../../lib/locale-context";

const BASE_URL = "https://www.sweezy.world";
const CANONICAL_URL = `${BASE_URL}/uk`;
const DEFAULT_OG_IMAGE = "/screenshots/home.png";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(BASE_URL),
    title: "Sweezy — застосунок для українців у Швейцарії",
    description:
      "Переїзд і життя у Швейцарії: гайди, документи, робота, красиві місця та допомога спільноти в застосунку Sweezy.",
    alternates: {
      canonical: CANONICAL_URL,
      languages: {
        en: `${BASE_URL}/en`,
        uk: `${BASE_URL}/uk`,
        de: `${BASE_URL}/de`,
        "x-default": `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: "Sweezy — застосунок для українців у Швейцарії",
      description:
        "Гайди, документи, робота, красиві місця та допомога спільноти для українців у Швейцарії.",
      url: CANONICAL_URL,
      siteName: "Sweezy",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Sweezy — застосунок для українців у Швейцарії",
        },
      ],
      locale: "uk_UA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Sweezy — застосунок для українців у Швейцарії",
      description:
        "Гайди, документи, робота, красиві місця та допомога спільноти для українців у Швейцарії.",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default function UkLayout({ children }: { children: React.ReactNode }) {
  return <LocaleProvider initialLocale="uk">{children}</LocaleProvider>;
}
