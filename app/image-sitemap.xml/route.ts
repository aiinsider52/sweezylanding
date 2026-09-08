import { travelDestinations, destinationImage } from "../../data/travel-destinations";
import { getPostsByLocale } from "../../lib/blog";
import { cantons } from "../../data/cantons";
import { getCantonImage, getCantonImageAlt, getPostImage, getPostImageAlt } from "../../lib/editorial";
import type { Locale } from "../../lib/i18n";

const BASE_URL = "https://www.sweezy.world";
const LOCALES: Locale[] = ["en", "uk", "de"];

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function absoluteImageUrl(path: string) {
  return path.startsWith("http") ? path : `${BASE_URL}${path}`;
}

function localizedCantonName(locale: Locale, canton: (typeof cantons)[number]) {
  if (locale === "uk") return canton.nameUk;
  if (locale === "de") return canton.nameDe;
  return canton.name;
}

export async function GET() {
  const postGroups = await Promise.all(
    LOCALES.map(async (locale) => ({ locale, posts: await getPostsByLocale(locale) })),
  );

  const blogEntries = postGroups.flatMap(({ locale, posts }) =>
    posts.map((post) => ({
      page: `${BASE_URL}/${locale}/blog/${post.slug}`,
      images: [{
        location: absoluteImageUrl(getPostImage(locale, post.slug)),
        title: post.frontmatter.title,
        caption: getPostImageAlt(locale, post.frontmatter.title, post.slug),
      }],
    })),
  );

  const placeEntries = LOCALES.flatMap((locale) =>
    travelDestinations.map((place) => ({
      page: `${BASE_URL}/${locale}/places/${place.slug}`,
      images: [0, 1, 2].map((index) => ({
        location: absoluteImageUrl(destinationImage(place, index)),
        title: place.title[locale],
        caption: place.alt[locale][index],
      })),
    })),
  );

  const cantonEntries = LOCALES.flatMap((locale) =>
    cantons.flatMap((canton) => {
      const image = getCantonImage(canton.slug);
      if (!image) return [];
      const name = localizedCantonName(locale, canton);
      return [{
        page: `${BASE_URL}/${locale}/guides/${canton.slug}`,
        images: [{
          location: absoluteImageUrl(image),
          title: name,
          caption: getCantonImageAlt(locale, name),
        }],
      }];
    }),
  );

  const urls = [...blogEntries, ...placeEntries, ...cantonEntries].map(({ page, images }) => `
  <url>
    <loc>${escapeXml(page)}</loc>${images.map((image) => `
    <image:image>
      <image:loc>${escapeXml(image.location)}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.caption)}</image:caption>
    </image:image>`).join("")}
  </url>`).join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls}
</urlset>`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}
