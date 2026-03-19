import type { Metadata } from "next";
import Home from "../page";

export const metadata: Metadata = {
  title: "Sweezy — Життя у Швейцарії. Просто.",
  description:
    "Sweezy допомагає новоприбулим розібратися зі швейцарською бюрократією — покрокові гайди, чеклісти, карта сервісів та маркетплейс в одному застосунку.",
  keywords: [
    "Швейцарія",
    "еміграція",
    "релокація",
    "гайди",
    "чеклісти",
    "новоприбулі",
    "Sweezy",
    "Швейцарія застосунок",
    "Швейцарія Україна",
  ],
  alternates: {
    canonical: "/uk",
    languages: {
      en: "/en",
      uk: "/uk",
      de: "/de",
    },
  },
  openGraph: {
    title: "Sweezy — Життя у Швейцарії. Просто.",
    description:
      "Покрокові гайди та чеклісти для нового життя у Швейцарії. EN / UA / DE.",
    type: "website",
    locale: "uk_UA",
    siteName: "Sweezy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sweezy — Життя у Швейцарії. Просто.",
    description:
      "Покрокові гайди та чеклісти для нового життя у Швейцарії.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "BENK-Jq8QxJ3rxJ5TfQL4uD2VSBxROsM_kfwbEUh5SU",
  },
};

export default function UkPage() {
  return <Home />;
}
