import type { Metadata } from "next";
import { LocaleProvider } from "../../lib/locale-context";

const BASE_URL = "https://www.sweezy.world";
const CANONICAL_URL = `${BASE_URL}/en`;
const DEFAULT_OG_IMAGE = "/screenshots/home.png";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(BASE_URL),
    title: "Sweezy App — Life in Switzerland, Simplified",
    description:
      "Plan permits, registration, work, housing and daily life in Switzerland with personal checklists and local guidance in the Sweezy app.",
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
      title: "Sweezy App — Life in Switzerland, Simplified",
      description:
        "Personal checklists and local guidance for permits, registration, work, housing and daily life in Switzerland.",
      url: CANONICAL_URL,
      siteName: "Sweezy",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Sweezy app for life in Switzerland",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Sweezy App — Life in Switzerland, Simplified",
      description:
        "Personal checklists and local guidance for newcomers to Switzerland.",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <LocaleProvider initialLocale="en">{children}</LocaleProvider>;
}
