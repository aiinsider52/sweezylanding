import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "./i18n";

export type PostFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  keywords: string[];
  locale: "en" | "uk" | "de";
};

export type BlogPost = {
  slug: string;
  locale: Locale;
  frontmatter: PostFrontmatter;
  content: string;
  readingTimeMinutes: number;
};

const LOCALES: Locale[] = ["en", "uk", "de"];

function getBlogDir(locale: Locale) {
  return path.join(process.cwd(), "content", "blog", locale);
}

async function pathExists(targetPath: string) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function parsePost(locale: Locale, slug: string, source: string): BlogPost {
  const { data, content } = matter(source);
  const frontmatter = data as PostFrontmatter;

  return {
    slug,
    locale,
    frontmatter,
    content,
    readingTimeMinutes: estimateReadingTime(content),
  };
}

export async function getPostSlugs(locale: Locale) {
  const dir = getBlogDir(locale);
  if (!(await pathExists(dir))) return [];

  const files = await fs.readdir(dir);
  return files
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => file.replace(/\.(md|mdx)$/i, ""))
    .sort();
}

export async function getPostBySlug(locale: Locale, slug: string) {
  const dir = getBlogDir(locale);
  const candidates = [path.join(dir, `${slug}.mdx`), path.join(dir, `${slug}.md`)];

  for (const filePath of candidates) {
    if (await pathExists(filePath)) {
      const source = await fs.readFile(filePath, "utf8");
      return parsePost(locale, slug, source);
    }
  }

  return null;
}

export async function getPostsByLocale(locale: Locale) {
  const slugs = await getPostSlugs(locale);
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(locale, slug)));

  return posts
    .filter((post): post is BlogPost => Boolean(post))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime(),
    );
}

export async function getAllBlogParams() {
  const params = await Promise.all(
    LOCALES.map(async (locale) => {
      const slugs = await getPostSlugs(locale);
      return slugs.map((slug) => ({ locale, slug }));
    }),
  );

  return params.flat();
}

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

