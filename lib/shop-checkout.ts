import { SHOP_PRODUCTS, productCardImage, shopProduct } from "../data/shop";
import { shopPrice } from "../data/shop-prices";
import type { Locale } from "./i18n";
import { BASE_URL } from "./alternates";

// Online checkout stays off until the owner sets BOTH a Stripe secret key and a
// shipping price. Without them every product keeps the email-enquiry flow, so
// no shipping promise or payment path is ever invented by default.
export type CheckoutConfig = { enabled: boolean; shippingRappen: number; countries: string[] };

export const MAX_LINE_QTY = 10;
export const MAX_LINES = 20;

export function checkoutConfig(env: Record<string, string | undefined> = process.env): CheckoutConfig {
  const shipping = Number.parseFloat(env.SHOP_SHIPPING_CHF ?? "");
  const countries = (env.SHOP_SHIP_COUNTRIES ?? "CH,LI")
    .split(",")
    .map((code) => code.trim().toUpperCase())
    .filter((code) => /^[A-Z]{2}$/.test(code));
  const enabled = Boolean(env.STRIPE_SECRET_KEY) && Number.isFinite(shipping) && shipping >= 0 && countries.length > 0;
  return { enabled, shippingRappen: Math.round((Number.isFinite(shipping) ? shipping : 0) * 100), countries };
}

/** True when this product can be paid online (it has a published price). */
export const isBuyable = (slug: string) => shopPrice(slug) !== undefined;

export type CartLine = { slug: string; qty: number };

/** Drops unknown, unpriced and malformed lines; merges duplicates; caps quantities. */
export function normaliseCart(input: unknown): CartLine[] {
  if (!Array.isArray(input)) return [];
  const merged = new Map<string, number>();
  for (const raw of input.slice(0, MAX_LINES * 2)) {
    if (!raw || typeof raw !== "object") continue;
    const { slug, qty } = raw as { slug?: unknown; qty?: unknown };
    if (typeof slug !== "string" || !shopProduct(slug) || !isBuyable(slug)) continue;
    const count = typeof qty === "number" && Number.isInteger(qty) ? qty : 1;
    if (count < 1) continue;
    merged.set(slug, Math.min(MAX_LINE_QTY, (merged.get(slug) ?? 0) + count));
  }
  return Array.from(merged, ([slug, qty]) => ({ slug, qty })).slice(0, MAX_LINES);
}

const STRIPE_LOCALE: Record<Locale, string> = { en: "en", de: "de", uk: "auto" };
const SHIPPING_LABEL: Record<Locale, string> = { en: "Standard delivery", de: "Standardversand", uk: "Стандартна доставка" };

/** Builds the form body for POST https://api.stripe.com/v1/checkout/sessions. */
export function checkoutSessionParams(lines: CartLine[], locale: Locale, config: CheckoutConfig): URLSearchParams {
  const body = new URLSearchParams();
  body.set("mode", "payment");
  body.set("locale", STRIPE_LOCALE[locale]);
  body.set("success_url", `${BASE_URL}/${locale}/shop/thanks?session_id={CHECKOUT_SESSION_ID}`);
  body.set("cancel_url", `${BASE_URL}/${locale}/shop#my-selection`);
  body.set("allow_promotion_codes", "true");
  body.set("phone_number_collection[enabled]", "true");
  body.set("metadata[source]", "sweezy-web-shop");
  body.set("metadata[locale]", locale);
  lines.forEach(({ slug, qty }, index) => {
    const product = shopProduct(slug)!;
    const price = shopPrice(slug)!;
    const key = `line_items[${index}]`;
    body.set(`${key}[quantity]`, String(qty));
    body.set(`${key}[price_data][currency]`, "chf");
    body.set(`${key}[price_data][unit_amount]`, String(Math.round(price * 100)));
    body.set(`${key}[price_data][product_data][name]`, product.copy[locale].name);
    body.set(`${key}[price_data][product_data][images][0]`, `${BASE_URL}${productCardImage(product)}`);
    body.set(`${key}[price_data][product_data][metadata][sku]`, product.sku);
    body.set(`${key}[price_data][product_data][metadata][slug]`, slug);
  });
  config.countries.forEach((code, index) => body.set(`shipping_address_collection[allowed_countries][${index}]`, code));
  body.set("shipping_options[0][shipping_rate_data][type]", "fixed_amount");
  body.set("shipping_options[0][shipping_rate_data][display_name]", SHIPPING_LABEL[locale]);
  body.set("shipping_options[0][shipping_rate_data][fixed_amount][amount]", String(config.shippingRappen));
  body.set("shipping_options[0][shipping_rate_data][fixed_amount][currency]", "chf");
  return body;
}

export const buyableProducts = () => SHOP_PRODUCTS.filter((product) => isBuyable(product.slug));
