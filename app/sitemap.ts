import type { MetadataRoute } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";

const SITE_URL = "https://www.sweezy.world";
const LOCALES = ["en", "uk", "de"] as const;
const STATIC_PAGES = ["support", "privacy", "terms", "cookies"] as const;

type SitemapEntry = MetadataRoute.Sitemap[number];

async function pathExists(targetPath: string) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function collectMdxFiles(dir: string): Promise<string[]> {
  if (!(await pathExists(dir))) return [];

  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return collectMdxFiles(fullPath);
      if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) return [fullPath];
      return [];
    }),
  );

  return files.flat();
}

async function getBlogEntries(): Promise<SitemapEntry[]> {
  const blogDir = path.join(process.cwd(), "content", "blog");
  const files = await collectMdxFiles(blogDir);

  return Promise.all(
    files.map(async (filePath) => {
      const stats = await fs.stat(filePath);
      const slug = path.basename(filePath).replace(/\.(md|mdx)$/i, "");
      const locale = path.basename(path.dirname(filePath));

      return {
        url: `${SITE_URL}/${locale}/blog/${slug}`,
        lastModified: stats.mtime,
        changeFrequency: "weekly",
        priority: 0.8,
      } satisfies SitemapEntry;
    }),
  );
}

async function getStaticEntries(): Promise<SitemapEntry[]> {
  const appDir = path.join(process.cwd(), "app");
  const pages: string[] = ["/", ...LOCALES.map((locale) => `/${locale}`)];
  const localizedBlogIndex = path.join(appDir, "[locale]", "blog", "page.tsx");

  if (await pathExists(localizedBlogIndex)) {
    pages.push(...LOCALES.map((locale) => `/${locale}/blog`));
  }

  for (const slug of STATIC_PAGES) {
    const rootPage = path.join(appDir, slug, "page.tsx");
    if (await pathExists(rootPage)) {
      pages.push(`/${slug}`);
    }

    for (const locale of LOCALES) {
      const localizedPage = path.join(appDir, locale, slug, "page.tsx");
      if (await pathExists(localizedPage)) {
        pages.push(`/${locale}/${slug}`);
      }
    }
  }

  return pages.map((page) => {
    const isHomepage = page === "/";
    const isLocaleHomepage = LOCALES.some((locale) => page === `/${locale}`);

    return {
      url: `${SITE_URL}${page}`,
      lastModified: new Date(),
      changeFrequency: isHomepage || isLocaleHomepage ? "daily" : "monthly",
      priority: isHomepage ? 1 : isLocaleHomepage ? 1 : 0.5,
    } satisfies SitemapEntry;
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [staticEntries, blogEntries] = await Promise.all([
    getStaticEntries(),
    getBlogEntries(),
  ]);

  return [...staticEntries, ...blogEntries];
}

