import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { BASE_URL, buildLocaleAlternates } from "./alternates";
import { DEFAULT_OG_IMAGE } from "./social";

const COPY = {
  uk: { title: "Sweezy — застосунок для переїзду до Швейцарії, Німеччини та Австрії", description: "Sweezy — безкоштовний iOS-застосунок і гід для українців у DACH: реєстрація, дозволи, робота, страхування, бізнес і безкоштовні чек-листи." },
  en: { title: "Sweezy App — Moving to Switzerland, Germany & Austria", description: "Sweezy is a free iOS app and guide for newcomers: registration, permits, work, health insurance and free checklists for Switzerland, Germany and Austria." },
  de: { title: "Sweezy App — Umzug in die Schweiz, nach Deutschland & Österreich", description: "Sweezy ist eine kostenlose iOS-App und ein Guide für Neuankömmlinge: Anmeldung, Bewilligung, Arbeit, Krankenkasse und kostenlose Checklisten." },
};
export function dachHomeMetadata(locale: Locale): Metadata {
  const copy = COPY[locale];
  const image = { url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Sweezy — DE · AT · CH" };
  return { ...copy, alternates: buildLocaleAlternates(locale), openGraph: { ...copy, url: `${BASE_URL}/${locale}`, type: "website", locale: locale === "uk" ? "uk_UA" : locale === "de" ? "de_DE" : "en_US", siteName: "Sweezy", images: [image] }, twitter: { card: "summary_large_image", ...copy, images: [image] }, robots: { index: true, follow: true } };
}
