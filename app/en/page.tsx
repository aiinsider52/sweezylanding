import type { Metadata } from "next";
import Home from "../page";

const BASE_URL = "https://www.sweezy.world";
const CANONICAL_URL = `${BASE_URL}/en`;
const DEFAULT_OG_IMAGE = "/screenshots/home.png";

export const metadata: Metadata = {
  title: "Sweezy — Life in Switzerland. Simplified.",
  description:
    "Sweezy helps newcomers navigate life in Switzerland with step-by-step guides, smart checklists, and curated official resources. Available in English, Ukrainian, and German.",
  alternates: {
    canonical: CANONICAL_URL,
    languages: {
      en: `${BASE_URL}/en`,
      uk: `${BASE_URL}/uk`,
      de: `${BASE_URL}/de`,
    },
  },
  openGraph: {
    title: "Sweezy — Life in Switzerland. Simplified.",
    description:
      "Navigate life in Switzerland with step-by-step guides and structured checklists. EN / UA / DE.",
    url: CANONICAL_URL,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Sweezy — Life in Switzerland. Simplified.",
      },
    ],
    type: "website",
    locale: "en_US",
    siteName: "Sweezy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sweezy — Life in Switzerland. Simplified.",
    description:
      "Navigate life in Switzerland with step-by-step guides and structured checklists.",
    images: [DEFAULT_OG_IMAGE],
  },
  verification: {
    google: "BENK-Jq8QxJ3rxJ5TfQL4uD2VSBxROsM_kfwbEUh5SU",
  },
};

export default function EnPage() {
  return <Home />;
}
