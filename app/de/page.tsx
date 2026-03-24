import type { Metadata } from "next";
import Home from "../page";

const BASE_URL = "https://www.sweezy.world";
const CANONICAL_URL = `${BASE_URL}/de`;
const DEFAULT_OG_IMAGE = "/screenshots/home.png";

export const metadata: Metadata = {
  title: "Sweezy — Leben in der Schweiz. Vereinfacht.",
  description:
    "Sweezy hilft Neuankömmlingen, das Leben in der Schweiz zu meistern — mit Schritt-für-Schritt-Anleitungen, Checklisten und einer Dienstleistungskarte.",
  keywords: [
    "Schweiz",
    "Expat",
    "Umzug",
    "Anleitungen",
    "Checklisten",
    "Neuzuzüger",
    "Sweezy",
    "Schweiz App",
    "Leben Schweiz",
  ],
  alternates: {
    canonical: CANONICAL_URL,
    languages: {
      en: `${BASE_URL}/en`,
      uk: `${BASE_URL}/uk`,
      de: `${BASE_URL}/de`,
    },
  },
  openGraph: {
    title: "Sweezy — Leben in der Schweiz. Vereinfacht.",
    description:
      "Schritt-für-Schritt-Anleitungen und Checklisten für ein neues Leben in der Schweiz. EN / UA / DE.",
    url: CANONICAL_URL,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Sweezy — Leben in der Schweiz. Vereinfacht.",
      },
    ],
    type: "website",
    locale: "de_DE",
    siteName: "Sweezy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sweezy — Leben in der Schweiz. Vereinfacht.",
    description:
      "Schritt-für-Schritt-Anleitungen und Checklisten für ein neues Leben in der Schweiz.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "BENK-Jq8QxJ3rxJ5TfQL4uD2VSBxROsM_kfwbEUh5SU",
  },
};

export default function DePage() {
  return <Home />;
}
