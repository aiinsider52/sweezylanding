import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getSiteUrl } from "../lib/site-url";

function getBaseUrl(): string {
  const env = getSiteUrl();
  // Prefer explicit canonical domain if provided (NEXT_PUBLIC_SITE_URL).
  if (process.env.NEXT_PUBLIC_SITE_URL?.trim()) return env;

  // Otherwise, derive from the incoming request host (prevents GSC "URL not allowed" mismatches).
  const h = headers();
  const proto = h.get("x-forwarded-proto") ?? "https";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (host) return `${proto}://${host}`;

  return env;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const lastModified = new Date();

  const paths = [
    "/",
    "/en",
    "/uk",
    "/de",
    "/support",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  return paths.map((path) => ({
    url: new URL(path, baseUrl).toString(),
    lastModified,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : path === "/en" || path === "/uk" || path === "/de" ? 0.9 : 0.6,
  }));
}

