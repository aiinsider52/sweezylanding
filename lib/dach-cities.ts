import cities from "../data/dach-cities.json";
import type { Locale } from "./i18n";

type Localized = Record<Locale, string>;
export type DachCity = { country: "germany" | "austria"; name: Localized; title: Localized; description: Localized; summary: Localized; sections: { title: Localized; body: Localized }[]; faq: { q: Localized; a: Localized }[]; sources: { name: string; url: string }[]; reviewedAt: string };
export const dachCities = cities as Record<string, DachCity>;
export const CITY_SLUGS = Object.keys(dachCities);
export function getDachCity(country: string, city: string): DachCity | undefined {
  const entry = Object.prototype.hasOwnProperty.call(dachCities, city) ? dachCities[city] : undefined;
  return entry?.country === country ? entry : undefined;
}
export function cityPath(locale: Locale, city: string) { return `/${locale}/countries/${dachCities[city].country}/cities/${city}`; }
