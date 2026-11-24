import { getPostsByLocale, isRedirectedBlogPost, type BlogPost } from "./blog";
import type { Locale } from "./i18n";
import { BASE_URL } from "./alternates";

export const AGENT_LOCALES: Locale[] = ["en", "uk", "de"];

export async function indexablePosts(): Promise<BlogPost[]> {
  const lists = await Promise.all(AGENT_LOCALES.map((locale) => getPostsByLocale(locale)));
  return lists.flat().filter((post) => !isRedirectedBlogPost(post.locale, post.slug));
}

export const postUrl = (post: BlogPost) => `${BASE_URL}/${post.locale}/blog/${post.slug}`;

/** MDX → readable Markdown: drops imports/exports and JSX wrappers, keeps prose, tables and links. */
export function mdxToMarkdown(source: string) {
  return source
    .replace(/^(import|export)\s.*$/gm, "")
    .replace(/<([A-Z][\w.]*)[^>]*\/>/g, "")
    .replace(/<\/?([A-Z][\w.]*)[^>]*>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
