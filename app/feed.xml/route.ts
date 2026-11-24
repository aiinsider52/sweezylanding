import { escapeXml, indexablePosts, postUrl } from "../../lib/agent-content";
import { BASE_URL } from "../../lib/alternates";

export const dynamic = "force-static";

export async function GET() {
  const posts = (await indexablePosts()).sort((a, b) =>
    new Date(b.frontmatter.updatedAt ?? b.frontmatter.publishedAt).getTime() - new Date(a.frontmatter.updatedAt ?? a.frontmatter.publishedAt).getTime());
  const items = posts.map((post) => {
    const f = post.frontmatter;
    return `    <item>
      <title>${escapeXml(f.title)}</title>
      <link>${postUrl(post)}</link>
      <guid isPermaLink="true">${postUrl(post)}</guid>
      <description>${escapeXml(f.description)}</description>
      <pubDate>${new Date(f.publishedAt).toUTCString()}</pubDate>
      <dc:language>${post.locale}</dc:language>${f.category ? `\n      <category>${escapeXml(f.category)}</category>` : ""}
    </item>`;
  }).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Sweezy Journal — life in Switzerland, Germany and Austria</title>
    <link>${BASE_URL}/en/blog</link>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Practical, source-backed guides for newcomers in DACH in English, Ukrainian and German.</description>
${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8", "cache-control": "public, max-age=3600, s-maxage=86400" } });
}
