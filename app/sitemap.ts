import type { MetadataRoute } from "next";
import { getSiteUrl } from "../lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  const paths = [
    "/",
    "/en",
    "/uk",
    "/de",
    "/support",
    "/privacy",
    "/terms",
    "/terms-of-service",
    "/cookies",
    "/cookie-policy",
  ];

  return paths.map((path) => ({
    url: new URL(path, baseUrl).toString(),
    lastModified,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : path === "/en" || path === "/uk" || path === "/de" ? 0.9 : 0.6,
  }));
}

