import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { buildRootAlternates } from "../lib/alternates";
import { LocaleProvider } from "../lib/locale-context";
import { ThemeProvider } from "../lib/theme-context";
import { SiteFooter } from "./components/SiteFooter";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
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
  alternates: buildRootAlternates(),
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

const websiteSchema = {
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
      <head>
        {/* Prevent flash of wrong theme: apply .dark class synchronously before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('sweezy-theme');if(t!=='light'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden">
        <ThemeProvider>
          <LocaleProvider>
            {children}
            <SiteFooter year={currentYear} />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
