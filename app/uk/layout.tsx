import type { Metadata } from "next";
import { LocaleProvider } from "../../lib/locale-context";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sweezy — Ваш гід для життя у Швейцарії",
    description:
      "Покрокові гайди, чеклісти, карта сервісів та CV builder для українців у Швейцарії.",
    alternates: {
      canonical: "/uk",
      languages: {
        en: "/en",
        uk: "/uk",
        de: "/de",
        "x-default": "/en",
      },
    },
  };
}

export default function UkLayout({ children }: { children: React.ReactNode }) {
  return <LocaleProvider initialLocale="uk">{children}</LocaleProvider>;
}
