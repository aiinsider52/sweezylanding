import type { Metadata } from "next";
import Home from "../page";

export const metadata: Metadata = {
  title: "Sweezy — Life in Switzerland. Simplified.",
  description:
    "Sweezy helps newcomers navigate life in Switzerland with step-by-step guides, smart checklists, and curated official resources. Available in English, Ukrainian, and German.",
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      uk: "/uk",
      de: "/de",
    },
  },
  openGraph: {
    title: "Sweezy — Life in Switzerland. Simplified.",
    description:
      "Navigate life in Switzerland with step-by-step guides and structured checklists. EN / UA / DE.",
    type: "website",
    locale: "en_US",
    siteName: "Sweezy",
  },
  verification: {
    google: "BENK-Jq8QxJ3rxJ5TfQL4uD2VSBxROsM_kfwbEUh5SU",
  },
};

export default function EnPage() {
  return <Home />;
}
