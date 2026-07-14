import type { Metadata } from "next";
import { BASE_URL } from "../../lib/alternates";
import { LandingPage } from "../components/home/LandingPage";

const CANONICAL_URL = `${BASE_URL}/uk`;
const DEFAULT_OG_IMAGE = "/screenshots/home.png";

export const metadata: Metadata = {
  title: "Sweezy для українців у Швейцарії — статус S, робота й документи",
  description:
    "Sweezy допомагає українцям у Швейцарії: статус S, документи, робота, страхування, покрокові гайди, чеклісти та перевірені офіційні ресурси.",
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
    "українці у Швейцарії",
    "статус S Швейцарія",
  ],
  openGraph: {
    title: "Sweezy для українців у Швейцарії",
    description:
      "Статус S, документи, робота та покрокові гайди для українців у Швейцарії.",
    url: CANONICAL_URL,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Sweezy — Життя у Швейцарії. Просто.",
      },
    ],
    type: "website",
    locale: "uk_UA",
    siteName: "Sweezy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sweezy — Життя у Швейцарії. Просто.",
    description:
      "Покрокові гайди та чеклісти для нового життя у Швейцарії.",
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

export default function UkPage() {
  return <LandingPage locale="uk" />;
}
