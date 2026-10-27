import type { Locale } from "../lib/i18n";

export const PLANNING_IMAGES = [
  { src: "/destinations/swiss-discovery-lavaux.webp", alt: { uk: "Виноградні тераси Лаво над Женевським озером у Швейцарії", en: "Lavaux vineyard terraces above Lake Geneva in Switzerland", de: "Weinbergterrassen von Lavaux über dem Genfersee in der Schweiz" } },
  { src: "/destinations/swiss-discovery-matterhorn.webp", alt: { uk: "Гора Маттергорн у Швейцарських Альпах біля Церматта", en: "The Matterhorn in the Swiss Alps near Zermatt", de: "Das Matterhorn in den Schweizer Alpen bei Zermatt" } },
  { src: "/images/canton-lucerne.jpg", alt: { uk: "Краєвид Люцерна у Швейцарії", en: "Cityscape of Lucerne in Switzerland", de: "Stadtansicht von Luzern in der Schweiz" } },
];

const APP_SCREENS = {
  "path-journey": ["маршрут переїзду", "relocation journey", "Umzugsplan"],
  "path-first-30-days": ["перші 30 днів після переїзду", "first 30 days after moving", "die ersten 30 Tage nach dem Umzug"],
  "path-permit-checklist": ["підготовка документів для дозволу на проживання", "residence permit preparation", "Vorbereitung der Aufenthaltsdokumente"],
  "path-city-hub": ["інформація про місто", "city information", "Stadtinformationen"],
  "work-ai-match": ["підбір роботи", "job matching", "Stellensuche"],
  "work-experience": ["професійний досвід", "work experience", "Berufserfahrung"],
  "work-landlord-letter": ["лист орендодавцю", "landlord letter", "Vermieterschreiben"],
  "work-support-calculator": ["калькулятор підтримки", "support calculator", "Unterstützungsrechner"],
  "market-relocation-service": ["послуги для переїзду", "relocation services", "Umzugsangebote"],
  "market-community-event": ["подія спільноти", "community event", "Community-Veranstaltung"],
  "market-new-listing": ["створення оголошення", "new listing", "Inserat erstellen"],
  "market-expert": ["профіль спеціаліста", "specialist profile", "Profil einer Fachperson"],
  "profile-settings": ["налаштування профілю", "profile settings", "Profileinstellungen"],
  "profile-situation": ["особиста ситуація після переїзду", "personal relocation situation", "persönliche Situation nach dem Umzug"],
  "profile-passport": ["цифровий профіль користувача", "digital user profile", "digitales Nutzerprofil"],
  "profile-access": ["доступ до застосунку", "app access", "App-Zugang"],
} as const;

export function appScreenAlt(src: string, locale: Locale) {
  const key = src.split("/").pop()?.replace(/\.png$/, "") as keyof typeof APP_SCREENS;
  const copy = APP_SCREENS[key];
  if (!copy) throw new Error(`Missing screenshot description: ${src}`);
  if (locale === "uk") return `Екран застосунку Sweezy: ${copy[0]}`;
  if (locale === "de") return `Sweezy-App: ${copy[2]}`;
  return `Sweezy app screen: ${copy[1]}`;
}
