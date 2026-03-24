import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { LocaleProvider } from "../lib/locale-context";
import { SiteFooter } from "./components/SiteFooter";
import { JsonLd } from "./components/seo/JsonLd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

const DEFAULT_OG_IMAGE = "/screenshots/home.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sweezy.world"),
  title: "Sweezy — Life in Switzerland. Simplified.",
  description:
    "Sweezy helps newcomers navigate life in Switzerland with step-by-step guides, smart checklists, and curated official resources. Available in English, Ukrainian, and German.",
  keywords: [
    "Switzerland",
    "expat",
    "relocation",
    "guides",
    "checklists",
    "newcomers",
    "Sweezy",
    "Schweiz",
    "Швейцарія",
  ],
  authors: [{ name: "Sweezy by AI Insider" }],
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      uk: "/uk",
      de: "/de",
    },
  },
  openGraph: {
    title: "Sweezy — Life in Switzerland. Simplified.",
    description:
      "Navigate life in Switzerland with step-by-step guides and structured checklists.",
    url: "https://www.sweezy.world",
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
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "BENK-Jq8QxJ3rxJ5TfQL4uD2VSBxROsM_kfwbEUh5SU",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0F19",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sweezy",
  url: "https://www.sweezy.world",
  description:
    "Sweezy helps newcomers navigate life in Switzerland with step-by-step guides, smart checklists, and curated official resources.",
  inLanguage: ["en", "uk", "de"],
  publisher: {
    "@type": "Organization",
    name: "Sweezy",
    url: "https://www.sweezy.world",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" className={`antialiased ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen overflow-x-hidden">
        <JsonLd data={websiteJsonLd} />
        <LocaleProvider>
          {children}
          <SiteFooter year={currentYear} />
        </LocaleProvider>
      </body>
    </html>
  );
}
