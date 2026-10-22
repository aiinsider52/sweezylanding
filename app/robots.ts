import type { MetadataRoute } from "next";
import { SEARCH_CRAWLERS, USER_FETCHERS } from "../lib/discovery";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [...SEARCH_CRAWLERS, ...USER_FETCHERS, "ClaudeBot", "*"].map((userAgent) => ({ userAgent, allow: "/", disallow: "/api/" })),
    sitemap: [
      "https://www.sweezy.world/sitemap.xml",
      "https://www.sweezy.world/image-sitemap.xml",
    ],
  };
}
