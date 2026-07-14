import type { MetadataRoute } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cantons } from "../data/cantons";
import { isLocale, isRedirectedBlogPost } from "../lib/blog";

const SITE_URL = "https://www.sweezy.world";
const LOCALES = ["en", "uk", "de"] as const;
const STATIC_PAGES = ["support", "privacy", "terms", "cookies"] as const;
const LOCALIZED_PAGES = ["about"] as const;

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
  const indexableFiles = files.filter((filePath) => {
    const slug = path.basename(filePath).replace(/\.(md|mdx)$/i, "");
    const locale = path.basename(path.dirname(filePath));
    return isLocale(locale) && !isRedirectedBlogPost(locale, slug);
  });

  return Promise.all(
    indexableFiles.map(async (filePath) => {
      const source = await fs.readFile(filePath, "utf8");
      const { data } = matter(source);
      const slug = path.basename(filePath).replace(/\.(md|mdx)$/i, "");
      const locale = path.basename(path.dirname(filePath));
      const lastModified = data.updatedAt ?? data.publishedAt;

      return {
        url: `${SITE_URL}/${locale}/blog/${slug}`,
        ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
      } satisfies SitemapEntry;
    }),
  );
}

async function getStaticEntries(): Promise<SitemapEntry[]> {
  const appDir = path.join(process.cwd(), "app");
  const pages: string[] = [...LOCALES.map((locale) => `/${locale}`)];
  const localizedBlogIndex = path.join(appDir, "[locale]", "blog", "page.tsx");
  const localizedGuidesIndex = path.join(appDir, "[locale]", "guides", "page.tsx");
  const localizedCantonGuide = path.join(appDir, "[locale]", "guides", "[canton]", "page.tsx");

  if (await pathExists(localizedBlogIndex)) {
    pages.push(...LOCALES.map((locale) => `/${locale}/blog`));
  }

  if (await pathExists(localizedGuidesIndex)) {
    pages.push(...LOCALES.map((locale) => `/${locale}/guides`));
  }

  if (await pathExists(localizedCantonGuide)) {
    pages.push(
      ...LOCALES.flatMap((locale) =>
        cantons.map((canton) => `/${locale}/guides/${canton.slug}`),
      ),
    );
  }

  for (const slug of LOCALIZED_PAGES) {
    const localizedPage = path.join(appDir, "[locale]", slug, "page.tsx");
    if (await pathExists(localizedPage)) {
      pages.push(...LOCALES.map((locale) => `/${locale}/${slug}`));
    }
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

  return pages.map(
    (page) =>
      ({
        url: `${SITE_URL}${page}`,
      }) satisfies SitemapEntry,
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [staticEntries, blogEntries] = await Promise.all([
    getStaticEntries(),
    getBlogEntries(),
  ]);

  return [...staticEntries, ...blogEntries];
}
