import type { Locale } from "../lib/i18n";

// John is Sweezy's fictional guide, shared by every existing character pose.
export const SWEEZY_COMPANION = {
  id: "john",
  name: { uk: "Джон", en: "John", de: "John" },
  introduction: { uk: "Джон — ваш провідник Sweezy", en: "John — your Sweezy guide", de: "John — dein Sweezy-Begleiter" },
  description: {
    uk: "Знайомтеся, Джон. Наш персонаж супроводжує вас у гідах, допомагає обрати наступну пригоду й робить перші кроки в новій країні трохи теплішими.",
    en: "Meet John. Our character joins you in the guides, helps you discover your next adventure and makes those first steps in a new country feel a little warmer.",
    de: "Das ist John. Unsere Figur begleitet dich durch die Ratgeber, macht Lust auf den nächsten Ausflug und sorgt für einen herzlichen Start im neuen Land.",
  },
} satisfies { id: string; name: Record<Locale,string>; introduction: Record<Locale,string>; description: Record<Locale,string> };
