import type { Metadata } from "next";
import { BASE_URL } from "../../lib/alternates";
import { LandingPage } from "../components/home/LandingPage";

const CANONICAL_URL = `${BASE_URL}/en`;
const DEFAULT_OG_IMAGE = "/screenshots/home.png";

export const metadata: Metadata = {
  title: "Sweezy App — Life in Switzerland, Simplified",
  description:
    "Plan permits, registration, work, housing and daily life in Switzerland with personal checklists, local guides and trusted resources in the Sweezy app.",
  openGraph: {
    title: "Sweezy App — Life in Switzerland, Simplified",
    description:
      "Personal checklists and local guidance for permits, registration, work, housing and daily life in Switzerland.",
    url: CANONICAL_URL,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Sweezy app for life in Switzerland",
      },
    ],
    type: "website",
    locale: "en_US",
    siteName: "Sweezy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sweezy App — Life in Switzerland, Simplified",
    description:
      "Personal checklists and local guidance for newcomers to Switzerland.",
    images: [DEFAULT_OG_IMAGE],
  },
  verification: {
    google: "BENK-Jq8QxJ3rxJ5TfQL4uD2VSBxROsM_kfwbEUh5SU",
  },
};

export default function EnPage() {
  return <LandingPage locale="en" />;
}
