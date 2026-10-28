import { EXTENDED_SHOP_PRODUCTS } from "./shop-products-extended";
import type { Locale } from "../lib/i18n";

export type ShopCategory = "bags" | "cups" | "decor" | "accessories" | "clothing" | "home";
type ProductCopy = { name: string; description: string; alt: string };
export type ShopProduct = {
  slug: string;
  sku: string;
  category: ShopCategory;
  flatPrint: boolean;
  modelView?: boolean;
  copy: Record<Locale, ProductCopy>;
  appearance?: { label: Record<Locale, string>; swatches: string[] };
};

// Names describe only what is visible in the supplied listing photograph.
// Stock, dimensions, materials and shipping are deliberately unconfirmed; prices live in shop-prices.ts.
// Supplier links, IDs and extraction evidence are kept in private/shop (excluded from Git).
export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    slug: "switzerland-tote", sku: "SW-001", category: "bags", flatPrint: true,
    copy: {
      uk: { name: "Шоппер Swiss Stories", description: "Бежевий шоппер зі світлими ручками, написом Switzerland та малюнками гір, фондю, годинника й інших швейцарських символів. Декор — плоский друк.", alt: "Бежевий шоппер зі світлими ручками, написом Switzerland і малюнками швейцарських символів" },
      en: { name: "Swiss Stories tote", description: "A beige tote with light handles, Switzerland lettering and illustrations of mountains, fondue, a watch and other Swiss symbols. The decoration is a flat print.", alt: "Beige tote with light handles, Switzerland lettering and illustrated Swiss symbols" },
      de: { name: "Swiss Stories Stofftasche", description: "Beige Tasche mit hellen Henkeln, Switzerland-Schriftzug und Motiven von Bergen, Fondue, Uhr und weiteren Schweizer Symbolen. Das Motiv ist flach aufgedruckt.", alt: "Beige Tasche mit hellen Henkeln, Switzerland-Schriftzug und illustrierten Schweizer Symbolen" },
    },
  },
  {
    slug: "switzerland-cap", sku: "SW-002", category: "accessories", flatPrint: false,
    copy: {
      uk: { name: "Кепка Alpine Blue", description: "Темно-синя кепка з вигнутим козирком, світлим написом SWITZERLAND і зображенням гір та річки.", alt: "Темно-синя кепка з написом SWITZERLAND, білим малюнком гір та вигнутим козирком" },
      en: { name: "Alpine Blue cap", description: "A navy blue cap with a curved brim, light SWITZERLAND lettering and a mountain-and-river graphic.", alt: "Navy blue cap with SWITZERLAND lettering, white mountain graphic and curved brim" },
      de: { name: "Alpine Blue Cap", description: "Dunkelblaue Kappe mit gebogenem Schirm, hellem SWITZERLAND-Schriftzug und einem Berg- und Flussmotiv.", alt: "Dunkelblaue Kappe mit SWITZERLAND-Schriftzug, weißem Bergmotiv und gebogenem Schirm" },
    },
  },
  {
    slug: "switzerland-calling-mug", sku: "SW-003", category: "cups", flatPrint: false,
    copy: {
      uk: { name: "Горнятко Switzerland Is Calling", description: "Біле горнятко зі світлою ручкою, сріблястим на вигляд обідком і чорним написом Switzerland is calling and I must go.", alt: "Біле горнятко з чорним написом Switzerland is calling and I must go та сріблястим обідком" },
      en: { name: "Switzerland Is Calling mug", description: "A white mug with a light handle, silver-coloured rim and black Switzerland is calling and I must go lettering.", alt: "White mug with black Switzerland is calling and I must go lettering and a silver-coloured rim" },
      de: { name: "Switzerland Is Calling Tasse", description: "Weiße Tasse mit hellem Henkel, silberfarbenem Rand und schwarzem Aufdruck Switzerland is calling and I must go.", alt: "Weiße Tasse mit schwarzem Switzerland is calling and I must go-Aufdruck und silberfarbenem Rand" },
    },
  },
  {
    slug: "interlaken-decor", sku: "SW-004", category: "decor", flatPrint: true,
    copy: {
      uk: { name: "Декор Interlaken", description: "Декоративна панель із написом Interlaken, гірським краєвидом і червоним парапланом. В оголошенні вказано плоский 2D-друк на акрилі: видимий об’єм є частиною зображення.", alt: "Декор Interlaken із горами, озером і червоним парапланом; плоский 2D-друк" },
      en: { name: "Interlaken decorative print", description: "A decorative panel with Interlaken lettering, mountains and a red paraglider. The listing states a flat 2D acrylic print: the apparent depth is part of the printed image.", alt: "Interlaken decorative panel with mountains, a lake and a red paraglider, flat 2D print" },
      de: { name: "Interlaken Dekorbild", description: "Dekorplatte mit Interlaken-Schriftzug, Bergen und rotem Gleitschirm. Laut Anzeige ein flacher 2D-Acryldruck: Die räumliche Wirkung gehört zum gedruckten Motiv.", alt: "Interlaken-Dekorbild mit Bergen, See und rotem Gleitschirm, flacher 2D-Druck" },
    },
  },
  {
    slug: "swiss-lake-tote", sku: "SW-005", category: "bags", flatPrint: true,
    copy: {
      uk: { name: "Шоппер Lakeside Switzerland", description: "Шоппер із чорними ручками та кольоровим принтом: озеро, альпійські вершини й містечко з червоними дахами. Малюнок надрукований, без об’ємної фактури.", alt: "Шоппер із чорними ручками та кольоровим друкованим краєвидом швейцарського озера, міста й гір" },
      en: { name: "Lakeside Switzerland tote", description: "A tote with black handles and a colourful printed lakeside town, red roofs and Alpine mountains. The design is printed, without raised texture.", alt: "Tote with black handles and a colourful printed Swiss lakeside town and mountain panorama" },
      de: { name: "Lakeside Switzerland Tasche", description: "Tasche mit schwarzen Henkeln und farbigem Druckmotiv: See, Alpen und ein Städtchen mit roten Dächern. Das Motiv ist gedruckt, ohne erhabene Struktur.", alt: "Tasche mit schwarzen Henkeln und farbig aufgedrucktem Schweizer See-, Stadt- und Bergpanorama" },
    },
  },
  {
    slug: "love-switzerland-mug", sku: "SW-006", category: "cups", flatPrint: false,
    copy: {
      uk: { name: "Горнятко I Love Switzerland", description: "Чорне горнятко з чорною ручкою, червоним серцем і білим написом I love Switzerland.", alt: "Чорне горнятко з чорною ручкою, червоним серцем та білим написом I love Switzerland" },
      en: { name: "I Love Switzerland mug", description: "A black mug with a black handle, a red heart and white I love Switzerland lettering.", alt: "Black mug with a black handle, red heart and white I love Switzerland lettering" },
      de: { name: "I Love Switzerland Tasse", description: "Schwarze Tasse mit schwarzem Henkel, rotem Herz und weißem I love Switzerland-Schriftzug.", alt: "Schwarze Tasse mit schwarzem Henkel, rotem Herz und weißem I love Switzerland-Schriftzug" },
    },
  },
  {
    slug: "alpine-chalet-decor", sku: "SW-007", category: "decor", flatPrint: false,
    copy: {
      uk: { name: "Декор Alpine Chalet", description: "Швейцарський сувенір із зображенням шале, квітів, корів і засніжених вершин та написом Switzerland. Матеріал, розміри й кріплення потрібно уточнити.", alt: "Сувенір Switzerland із зображенням альпійського шале, квітів, корів і засніжених гір" },
      en: { name: "Alpine Chalet decoration", description: "A Swiss souvenir featuring a chalet, flowers, cows, snowy peaks and Switzerland lettering. Material, dimensions and mounting still need confirmation.", alt: "Switzerland souvenir depicting an Alpine chalet, flowers, cows and snowy mountains" },
      de: { name: "Alpine Chalet Dekoration", description: "Schweizer Souvenir mit Chalet, Blumen, Kühen, verschneiten Gipfeln und Switzerland-Schriftzug. Material, Maße und Befestigung müssen noch bestätigt werden.", alt: "Switzerland-Souvenir mit Alpenchalet, Blumen, Kühen und verschneiten Bergen" },
    },
  },
  {
    slug: "zurich-decor", sku: "SW-008", category: "decor", flatPrint: true,
    copy: {
      uk: { name: "Декор Zurich Old Town", description: "Панель із золотистою рамкою, написом Zurich і зображенням старого міста. В оголошенні зазначено 2D FLAT: це плоске зображення, а не архітектурна мініатюра.", alt: "Панель Zurich із золотистою рамкою та зображенням старого міста; плоский 2D-друк" },
      en: { name: "Zurich Old Town decorative print", description: "A panel with a gold-coloured frame, Zurich lettering and an old-town scene. The listing says 2D FLAT: a flat image rather than an architectural miniature.", alt: "Zurich panel with a gold-coloured frame and old-town scene, flat 2D print" },
      de: { name: "Zurich Old Town Dekorbild", description: "Platte mit goldfarbener Umrahmung, Zurich-Schriftzug und Altstadtmotiv. Die Anzeige nennt 2D FLAT: ein flaches Bild, keine Architekturminiatur.", alt: "Zurich-Platte mit goldfarbener Umrahmung und Altstadtmotiv, flacher 2D-Druck" },
    },
  },
  {
    slug: "swiss-mountain-travel-cup", sku: "SW-009", category: "cups", flatPrint: false,
    copy: {
      uk: { name: "Дорожнє горнятко Swiss Mountains", description: "Чорне дорожнє горнятко з білою кришкою, петлею COFFEE та червоним гірським принтом. Об’єм, матеріал і теплоізоляцію ще потрібно підтвердити.", alt: "Чорне дорожнє горнятко з білою кришкою, петлею COFFEE і червоним зображенням гір" },
      en: { name: "Swiss Mountains travel cup", description: "A black travel cup with a white lid, COFFEE loop and red mountain print. Capacity, material and insulation have not been confirmed.", alt: "Black travel cup with a white lid, COFFEE loop and red mountain graphic" },
      de: { name: "Swiss Mountains Reisebecher", description: "Schwarzer Reisebecher mit weißem Deckel, COFFEE-Schlaufe und rotem Bergmotiv. Volumen, Material und Isolierung sind noch nicht bestätigt.", alt: "Schwarzer Reisebecher mit weißem Deckel, COFFEE-Schlaufe und rotem Bergmotiv" },
    },
  },
  ...EXTENDED_SHOP_PRODUCTS,
];

export const SHOP_CATEGORIES: ShopCategory[] = ["bags", "clothing", "cups", "accessories", "home", "decor"];
export const shopProduct = (slug: string) => SHOP_PRODUCTS.find(product => product.slug === slug);
export const PRODUCT_SHOTS = ["studio", "lifestyle", "detail"] as const;
export type ProductShot = typeof PRODUCT_SHOTS[number] | "model" | "angle" | "in-use";
export const productShots = (product: ShopProduct): readonly ProductShot[] => [...PRODUCT_SHOTS, ...(product.modelView ? ["model" as const] : []), "angle", "in-use"];
export const productImage = (product: ShopProduct, shot: ProductShot = "studio") => `/shop/products/${product.slug}-${shot}.webp`;
export const productImages = (product: ShopProduct) => productShots(product).map(shot => productImage(product, shot));
export const productCardImage = (product: ShopProduct) => productImage(product);
export function productImageAlt(product: ShopProduct, locale: Locale, shot: ProductShot = "studio") {
  if (shot === "angle") return { uk: `${product.copy.uk.name} — додатковий ракурс, візуалізація ШІ`, en: `${product.copy.en.name} — another angle, AI visualisation`, de: `${product.copy.de.name} — weitere Ansicht, KI-Visualisierung` }[locale];
  if (shot === "in-use") return { uk: `${product.copy.uk.name} — у використанні, візуалізація ШІ`, en: `${product.copy.en.name} — in use, AI visualisation`, de: `${product.copy.de.name} — in Benutzung, KI-Visualisierung` }[locale];
  if (shot === "model") return { uk: `${product.copy.uk.name} на моделі-шатенці — візуалізація ШІ`, en: `${product.copy.en.name} worn by a chestnut-haired model — AI visualisation`, de: `${product.copy.de.name} an einem Model mit kastanienbraunem Haar — KI-Visualisierung` }[locale];
  if (shot === "detail") return { uk: `Деталі дизайну: ${product.copy.uk.name}. Авторська візуалізація ШІ`, en: `Design detail: ${product.copy.en.name}. Original AI visualisation`, de: `Designdetail: ${product.copy.de.name}. Eigene KI-Visualisierung` }[locale];
  const suffix = shot === "lifestyle"
    ? { uk: " — у повсякденній обстановці, візуалізація ШІ", en: " — in an everyday setting, AI visualisation", de: " — im Alltag, KI-Visualisierung" }[locale]
    : { uk: " — предметна візуалізація ШІ", en: " — studio AI visualisation", de: " — Studio-KI-Visualisierung" }[locale];
  return `${product.copy[locale].alt}${suffix}`;
}

/** This opens an email draft; it neither submits an order nor takes payment. */
export function shopInquiryHref(products: ShopProduct[], locale: Locale) {
  const text = {
    uk: ["Sweezy Shop — запит щодо товарів", "Вітаю! Цікавлять такі товари:", "Прошу уточнити кінцеву ціну, варіанти, наявність і доставку до мого міста:", "Це запит інформації, не оформлене замовлення."],
    en: ["Sweezy Shop — product enquiry", "Hello! I am interested in:", "Please confirm the full price, options, availability and delivery to my city:", "This is an information enquiry, not a placed order."],
    de: ["Sweezy Shop — Produktanfrage", "Hallo! Ich interessiere mich für:", "Bitte Endpreis, Varianten, Verfügbarkeit und Lieferung an meinen Wohnort bestätigen:", "Dies ist eine Informationsanfrage, keine Bestellung."],
  }[locale];
  const body = `${text[1]}\n\n${products.map(p => `${p.copy[locale].name} · ${p.sku}\nhttps://www.sweezy.world/${locale}/shop/${p.slug}`).join("\n\n")}\n\n${text[2]}\n\n${text[3]}`;
  return `mailto:support@sweezy.world?subject=${encodeURIComponent(text[0])}&body=${encodeURIComponent(body)}`;
}
