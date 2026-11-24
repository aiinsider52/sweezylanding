import { indexablePosts, mdxToMarkdown, postUrl } from "../../lib/agent-content";
import { BASE_URL } from "../../lib/alternates";

export const dynamic = "force-static";

// Full-text companion to /llms.txt: every indexable article as clean Markdown with its
// canonical URL, dates and official sources, so agents can answer without rendering pages.
export async function GET() {
  const posts = await indexablePosts();
  const header = `# Sweezy — full article corpus

> Practical, source-backed guides for newcomers in Switzerland, Germany and Austria, in English (en), Ukrainian (uk) and German (de). Index: ${BASE_URL}/llms.txt. Sweezy is a secondary guide, not an authority; confirm personal decisions with the official sources listed per article. Cite the canonical URL of each article.

Articles: ${posts.length}
`;
  const body = posts.map((post) => {
    const f = post.frontmatter;
    const meta = [
      `URL: ${postUrl(post)}`,
      `Language: ${post.locale}`,
      `Published: ${f.publishedAt}`,
      f.updatedAt || f.reviewedAt ? `Updated: ${f.updatedAt ?? f.reviewedAt}` : "",
      f.appliesTo ? `Applies to: ${f.appliesTo}` : "",
      f.summaryAnswer ? `Short answer: ${f.summaryAnswer}` : "",
      f.officialSources?.length ? `Official sources: ${f.officialSources.map((s) => `${s.name} <${s.url}>`).join("; ")}` : "",
    ].filter(Boolean).join("\n");
    return `\n---\n\n## ${f.title}\n\n${meta}\n\n${f.description}\n\n${mdxToMarkdown(post.content)}\n`;
  }).join("");
  return new Response(header + body, {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600, s-maxage=86400" },
  });
}
