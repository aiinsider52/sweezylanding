import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getSiteUrl } from "../lib/site-url";

function getBaseUrl(): string {
  const env = getSiteUrl();
  if (process.env.NEXT_PUBLIC_SITE_URL?.trim()) return env;

  const h = headers();
  const proto = h.get("x-forwarded-proto") ?? "https";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (host) return `${proto}://${host}`;

  return env;
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: new URL("/sitemap.xml", baseUrl).toString(),
  };
}

