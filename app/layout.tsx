import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { buildRootAlternates } from "../lib/alternates";
import { LocaleProvider } from "../lib/locale-context";
import { ThemeProvider } from "../lib/theme-context";
import { THEME_BOOTSTRAP } from "../lib/theme";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { Telemetry } from "./components/Telemetry";
import { GrowthAnalytics } from "./components/GrowthAnalytics";
import { AnalyticsConsent } from "./components/AnalyticsConsent";
import { DEFAULT_OG_IMAGE } from "../lib/social";
import { SITE_ENTITIES } from "../lib/entities";
import "./globals.css";
import "./theme.css";
import "./design-system.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sweezy.world"),
  title: "Sweezy — Life in Switzerland, Germany and Austria",
  description:
    "Sweezy helps newcomers navigate Switzerland, Germany and Austria with practical guides, checklists and local support in English, Ukrainian and German.",
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
  alternates: buildRootAlternates(),
  openGraph: {
    title: "Sweezy — Your next step in DACH",
    description:
      "Practical guides and checklists for life in Switzerland, Germany and Austria.",
    url: "https://www.sweezy.world",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Sweezy — Your next step in DACH",
      },
    ],
    type: "website",
    locale: "en_US",
    siteName: "Sweezy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sweezy — Your next step in DACH",
    description:
      "Practical guides and checklists for life in Switzerland, Germany and Austria.",
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
  themeColor: "#0b100c",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" className={`dark antialiased ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme: apply .dark class synchronously before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_BOOTSTRAP,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(SITE_ENTITIES).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden">
        <Telemetry />
        <GrowthAnalytics />
        <AnalyticsConsent />
        <ThemeProvider>
          <LocaleProvider>
            <SiteHeader />
            {children}
            <SiteFooter year={currentYear} />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
