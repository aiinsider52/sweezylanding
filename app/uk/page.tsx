import type { Metadata } from "next";
import { BASE_URL } from "../../lib/alternates";
import { HomeSeoSections } from "../components/home/HomeSeoSections";
import Home from "../page";

const CANONICAL_URL = `${BASE_URL}/uk`;
const DEFAULT_OG_IMAGE = "/screenshots/home.png";

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
  openGraph: {
    title: "Sweezy — Життя у Швейцарії. Просто.",
    description:
      "Покрокові гайди та чеклісти для нового життя у Швейцарії. EN / UA / DE.",
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
  return (
    <>
      <Home />
      <HomeSeoSections locale="uk" />
    </>
  );
}
