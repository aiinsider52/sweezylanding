import type { Metadata } from "next";
import { LocaleProvider } from "../../lib/locale-context";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sweezy — Dein Ratgeber für das Leben in der Schweiz",
    description:
      "Schritt-für-Schritt-Anleitungen, Checklisten und Servicekarte für Expats in der Schweiz.",
    alternates: {
      canonical: "/de",
      languages: {
        en: "/en",
        uk: "/uk",
        de: "/de",
        "x-default": "/en",
      },
    },
  };
}

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return <LocaleProvider initialLocale="de">{children}</LocaleProvider>;
}
