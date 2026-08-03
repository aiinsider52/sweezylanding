import type { Metadata } from "next";
import { LocaleProvider } from "../../lib/locale-context";

const BASE_URL = "https://www.sweezy.world";
const CANONICAL_URL = `${BASE_URL}/de`;
const DEFAULT_OG_IMAGE = "/screenshots/home.png";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(BASE_URL),
    title: "Sweezy App — Ankommen und leben in der Schweiz",
    description:
      "Schritt-für-Schritt-Guides, Checklisten, Jobs, Orte und Community-Hilfe für Menschen, die neu in die Schweiz ziehen.",
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
      title: "Sweezy App — Ankommen und leben in der Schweiz",
      description:
        "Guides, Checklisten, Jobs, Orte und Community-Hilfe für Neuankömmlinge in der Schweiz.",
      url: CANONICAL_URL,
      siteName: "Sweezy",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Sweezy App für das Leben in der Schweiz",
        },
      ],
      locale: "de_DE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Sweezy App — Ankommen und leben in der Schweiz",
      description:
        "Guides, Checklisten, Jobs, Orte und Community-Hilfe für Neuankömmlinge in der Schweiz.",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return <LocaleProvider initialLocale="de">{children}</LocaleProvider>;
}
