import { travelDestinations, destinationImage } from "../../data/travel-destinations";
import { getPostsByLocale } from "../../lib/blog";
import { cantons } from "../../data/cantons";
import { getCantonImage, getPostImage } from "../../lib/editorial";
import type { Locale } from "../../lib/i18n";
import { COUNTRIES, countryData, countryPath } from "../../data/dach";
import { DOWNLOAD_IDS } from "../../data/downloads";
import { companionImage, type CompanionPose } from "../../data/companion-images";
import { PLANNING_IMAGES } from "../../data/image-copy";
import { SHOP_PRODUCTS, productImages } from "../../data/shop";

const BASE_URL = "https://www.sweezy.world";
const LOCALES: Locale[] = ["en", "uk", "de"];
export const dynamic = "force-static";

type ImageEntry = { page: string; images: string[] };
function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}
const absolute = (value: string) => value.startsWith("/") ? `${BASE_URL}${value}` : value;
const art = (...poses: CompanionPose[]) => poses.map(companionImage);

export async function GET() {
  const postGroups = await Promise.all(LOCALES.map(async locale => ({ locale, posts: await getPostsByLocale(locale) })));
  const entries: ImageEntry[] = postGroups.flatMap(({ locale, posts }) => posts.map(post => ({
    page: `/${locale}/blog/${post.slug}`,
    images: [getPostImage(locale, post.slug), ...art("article-reader"), ...(!/biznes|samozaynyatist|einzelfirma|gmbh/.test(post.slug) ? art("download") : [])],
  })));

  for (const locale of LOCALES) {
    entries.push(
      { page: `/${locale}/shop`, images: SHOP_PRODUCTS.flatMap(productImages) },
      ...SHOP_PRODUCTS.map(product => ({ page: `/${locale}/shop/${product.slug}`, images: productImages(product) })),
      ...travelDestinations.map(place => ({ page: `/${locale}/places/${place.slug}`, images: [0, 1, 2].map(index => destinationImage(place, index)) })),
      ...cantons.flatMap(canton => {
        const image = getCantonImage(canton.slug);
        return image ? [{ page: `/${locale}/guides/${canton.slug}`, images: [image] }] : [];
      }),
      ...COUNTRIES.map(country => ({ page: countryPath(locale, country), images: [countryData[country].image] })),
      { page: `/${locale}`, images: art("home-discover", "home-welcome", "home-route", "home-done", "home-help", "home-community", "travel-kit") },
      { page: `/${locale}/community`, images: [...art("community", "post-writer"), ...["first-week", "business-ch", "travel-kit"].map(id => `/downloads/sweezy-${id}-cover-${locale}.webp`)] },
      { page: `/${locale}/resources`, images: DOWNLOAD_IDS.map(id => `/downloads/sweezy-${id}-cover-${locale}.webp`) },
      { page: `/${locale}/guides`, images: art("guides") },
      { page: `/${locale}/starter-kit`, images: art("starter") },
      { page: `/${locale}/swiss-bucket-list`, images: [...art("travel-kit"), `/downloads/sweezy-travel-kit-cover-${locale}.webp`] },
      { page: `/${locale}/places`, images: art("places") },
      { page: `/${locale}/about`, images: art("about", "footer") },
      { page: `/${locale}/authors/sweezy-team`, images: ["/brand/team/vladyslav-studio.webp", "/brand/team/yuliia-studio.webp", ...art("team")] },
      { page: `/${locale}/partners`, images: art("partners") },
      { page: `/${locale}/planning`, images: [...art("planner"), ...PLANNING_IMAGES.map(image => image.src)] },
      { page: `/${locale}/jobs`, images: art("jobs") },
    );
  }
  entries.push({ page: "/uk/services", images: art("services", "download") });

  // Only current image-sitemap tags are emitted. Descriptions belong in HTML
  // alt/captions and structured data, not deprecated image:title/caption tags.
  const pages = new Map<string, Set<string>>();
  entries.forEach(entry => {
    const images = pages.get(entry.page) ?? new Set<string>();
    entry.images.forEach(src => images.add(absolute(src)));
    pages.set(entry.page, images);
  });
  const urls = Array.from(pages, ([page, images]) => `\n  <url>\n    <loc>${escapeXml(absolute(page))}</loc>${Array.from(images, src => `\n    <image:image><image:loc>${escapeXml(src)}</image:loc></image:image>`).join("")}\n  </url>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls}\n</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=3600" },
  });
}
