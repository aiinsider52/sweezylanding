import type { Metadata } from "next";
import { LocaleProvider } from "../../lib/locale-context";

const BASE_URL = "https://www.sweezy.world";
const CANONICAL_URL = `${BASE_URL}/de`;
const DEFAULT_OG_IMAGE = "/screenshots/home.png";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sweezy — Dein Ratgeber für das Leben in der Schweiz",
    description:
      "Schritt-für-Schritt-Anleitungen, Checklisten und Servicekarte für Expats in der Schweiz.",
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
      title: "Sweezy — Dein Ratgeber für das Leben in der Schweiz",
      description:
        "Schritt-für-Schritt-Anleitungen, Checklisten und Servicekarte für Expats in der Schweiz.",
      url: CANONICAL_URL,
      siteName: "Sweezy",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Sweezy — Dein Ratgeber für das Leben in der Schweiz",
        },
      ],
      locale: "de_DE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Sweezy — Dein Ratgeber für das Leben in der Schweiz",
      description:
        "Schritt-für-Schritt-Anleitungen, Checklisten und Servicekarte für Expats in der Schweiz.",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return <LocaleProvider initialLocale="de">{children}</LocaleProvider>;
}
