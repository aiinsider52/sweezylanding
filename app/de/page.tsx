import type { Metadata } from "next";
import Home from "../page";

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
    canonical: "/de",
    languages: {
      en: "/en",
      uk: "/uk",
      de: "/de",
    },
  },
  openGraph: {
    title: "Sweezy — Leben in der Schweiz. Vereinfacht.",
    description:
      "Schritt-für-Schritt-Anleitungen und Checklisten für ein neues Leben in der Schweiz. EN / UA / DE.",
    type: "website",
    locale: "de_DE",
    siteName: "Sweezy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sweezy — Leben in der Schweiz. Vereinfacht.",
    description:
      "Schritt-für-Schritt-Anleitungen und Checklisten für ein neues Leben in der Schweiz.",
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
