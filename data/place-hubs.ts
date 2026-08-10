import type { Locale } from "../lib/i18n";
import { travelDestinations, type TravelDestination } from "./travel-destinations";

export const PLACE_CATEGORIES = ["mountains", "lakes", "nature", "culture"] as const;
export type PlaceCategory = (typeof PLACE_CATEGORIES)[number];

const CATEGORY_COPY: Record<PlaceCategory, Record<Locale, { title: string; description: string }>> = {
  mountains: { en: { title: "Mountains and glaciers", description: "High-Alpine viewpoints, railways, glaciers and practical mountain day trips across Switzerland." }, uk: { title: "Гори та льодовики", description: "Високогірні панорами, залізниці, льодовики та практичні маршрути Швейцарією." }, de: { title: "Berge und Gletscher", description: "Hochalpine Aussichten, Bahnen, Gletscher und praktische Bergausflüge in der Schweiz." } },
  lakes: { en: { title: "Lakes and waterside routes", description: "Swiss lakes, vineyard shores and easy routes combining boats, trains and walking." }, uk: { title: "Озера та маршрути біля води", description: "Швейцарські озера, виноградні береги та маршрути потягом, кораблем і пішки." }, de: { title: "Seen und Uferwege", description: "Schweizer Seen, Weinberge und einfache Routen mit Schiff, Bahn und Wanderung." } },
  nature: { en: { title: "Nature, gorges and waterfalls", description: "Gorges, waterfalls, caves, valleys and geological landscapes worth planning a trip around." }, uk: { title: "Природа, ущелини та водоспади", description: "Ущелини, водоспади, печери, долини та природні маршрути для окремої подорожі." }, de: { title: "Natur, Schluchten und Wasserfälle", description: "Schluchten, Wasserfälle, Höhlen, Täler und besondere Naturlandschaften." } },
  culture: { en: { title: "Cities and cultural places", description: "Historic districts, gardens, museums and walkable Swiss city experiences." }, uk: { title: "Міста та культурні місця", description: "Історичні квартали, сади, музеї та маршрути швейцарськими містами." }, de: { title: "Städte und Kulturorte", description: "Historische Viertel, Gärten, Museen und Schweizer Stadterlebnisse." } },
};

export function categoryCopy(category: PlaceCategory, locale: Locale) { return CATEGORY_COPY[category][locale]; }
export function placesByCategory(category: PlaceCategory) { return travelDestinations.filter((place) => place.category === category); }
export function regionKey(place: TravelDestination) { return place.region.en.split(" · ")[0].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
export function placeRegions() { return Array.from(new Set(travelDestinations.map(regionKey))).sort(); }
export function placesByRegion(region: string) { return travelDestinations.filter((place) => regionKey(place) === region); }
