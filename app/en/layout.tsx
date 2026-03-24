import type { Metadata } from "next";
import { LocaleProvider } from "../../lib/locale-context";

const BASE_URL = "https://www.sweezy.world";
const CANONICAL_URL = `${BASE_URL}/en`;
const DEFAULT_OG_IMAGE = "/screenshots/home.png";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sweezy — Your Guide to Life in Switzerland",
    description:
      "Step-by-step guides, checklists, service map and CV builder for expats in Switzerland. Available in English, Ukrainian and German.",
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
      title: "Sweezy — Your Guide to Life in Switzerland",
      description:
        "Step-by-step guides, checklists, service map and CV builder for expats in Switzerland. Available in English, Ukrainian and German.",
      url: CANONICAL_URL,
      siteName: "Sweezy",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Sweezy — Your Guide to Life in Switzerland",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Sweezy — Your Guide to Life in Switzerland",
      description:
        "Step-by-step guides, checklists, service map and CV builder for expats in Switzerland. Available in English, Ukrainian and German.",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <LocaleProvider initialLocale="en">{children}</LocaleProvider>;
}
