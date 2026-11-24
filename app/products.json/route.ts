import { SHOP_PRODUCTS, productImages } from "../../data/shop";
import { shopPrice } from "../../data/shop-prices";
import { SHOP_COPY } from "../../data/shop-copy";
import { shopStory } from "../../data/shop-stories";
import { BASE_URL } from "../../lib/alternates";
import { checkoutConfig } from "../../lib/shop-checkout";

export const dynamic = "force-static";

// Machine-readable catalogue for shopping agents and comparison tools.
export function GET() {
  const checkout = checkoutConfig();
  const products = SHOP_PRODUCTS.map((product) => {
    const price = shopPrice(product.slug);
    return {
      sku: product.sku,
      slug: product.slug,
      category: product.category,
      price: price === undefined ? null : { amount: price.toFixed(2), currency: "CHF" },
      purchase: price !== undefined && checkout.enabled ? "online_checkout" : "email_enquiry",
      images: productImages(product).map((src) => `${BASE_URL}${src}`),
      locales: Object.fromEntries((["en", "de", "uk"] as const).map((locale) => [locale, {
        name: product.copy[locale].name,
        category: SHOP_COPY[locale].categories[product.category],
        tagline: shopStory(product.slug, locale)?.tagline ?? null,
        description: product.copy[locale].description,
        url: `${BASE_URL}/${locale}/shop/${product.slug}`,
      }])),
    };
  });
  return Response.json({
    name: "Sweezy Shop",
    url: `${BASE_URL}/en/shop`,
    currency: "CHF",
    shipsTo: checkout.enabled ? checkout.countries : null,
    enquiry: "mailto:support@sweezy.world",
    note: "Product images are AI visualisations; details are confirmed before dispatch. Items without a price are sold on enquiry.",
    count: products.length,
    products,
  }, { headers: { "cache-control": "public, max-age=3600, s-maxage=86400" } });
}
