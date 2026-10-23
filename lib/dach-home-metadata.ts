import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { BASE_URL, buildLocaleAlternates } from "./alternates";
import { DEFAULT_OG_IMAGE } from "./social";

const COPY = {
  uk: { title: "Sweezy — життя у Швейцарії, Німеччині та Австрії", description: "Переїзд і життя в DACH: реєстрація, робота, бізнес, місцеві послуги та безкоштовні чек-листи для українців і новоприбулих. Оберіть свою країну." },
  en: { title: "Sweezy — life in Switzerland, Germany and Austria", description: "Find your next step in DACH: registration, work, business, local support and free checklists for newcomers. Choose Switzerland, Germany or Austria." },
  de: { title: "Sweezy — Leben in der Schweiz, Deutschland und Österreich", description: "Dein nächster Schritt in DACH: Anmeldung, Arbeit, Gründung, lokale Hilfe und kostenlose Checklisten. Wähle Schweiz, Deutschland oder Österreich." },
};
export function dachHomeMetadata(locale: Locale): Metadata {
  const copy = COPY[locale];
  const image = { url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Sweezy — DE · AT · CH" };
  return { ...copy, alternates: buildLocaleAlternates(locale), openGraph: { ...copy, url: `${BASE_URL}/${locale}`, type: "website", locale: locale === "uk" ? "uk_UA" : locale === "de" ? "de_DE" : "en_US", siteName: "Sweezy", images: [image] }, twitter: { card: "summary_large_image", ...copy, images: [image] }, robots: { index: true, follow: true } };
}
