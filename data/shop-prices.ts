import type { Locale } from "../lib/i18n";

// Sweezy retail prices in CHF.
// Products without a set price stay "price on request".
export const SHOP_PRICES: Partial<Record<string, number>> = {
  "switzerland-tote": 11.9,
  "switzerland-cap": 20.9,
  "switzerland-calling-mug": 20.9,
  "interlaken-decor": 4.9,
  "swiss-lake-tote": 8.9,
  "love-switzerland-mug": 25.9,
};

const NUMBER_LOCALE: Record<Locale, string> = { uk: "uk-CH", en: "en-CH", de: "de-CH" };

export const shopPrice = (slug: string) => SHOP_PRICES[slug];

export function formatShopPrice(value: number, locale: Locale) {
  return new Intl.NumberFormat(NUMBER_LOCALE[locale], { style: "currency", currency: "CHF", minimumFractionDigits: 2 }).format(value);
}

export function shopPriceLabel(slug: string, locale: Locale) {
  const value = shopPrice(slug);
  return value === undefined ? undefined : formatShopPrice(value, locale);
}
