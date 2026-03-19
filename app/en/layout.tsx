import type { Metadata } from "next";
import { LocaleProvider } from "../../lib/locale-context";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sweezy — Your Guide to Life in Switzerland",
    description:
      "Step-by-step guides, checklists, service map and CV builder for expats in Switzerland. Available in English, Ukrainian and German.",
    alternates: {
      canonical: "/en",
      languages: {
        en: "/en",
        uk: "/uk",
        de: "/de",
        "x-default": "/en",
      },
    },
  };
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <LocaleProvider initialLocale="en">{children}</LocaleProvider>;
}
