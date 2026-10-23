import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { isLocale } from "../../../../../lib/blog";
import { getPostSocialImage } from "../../../../../lib/editorial";
import blogImages from "../../../../../data/blog-images.json";

export const runtime = "nodejs";

// Preserve previously shared image URLs while metadata points to static JPEGs.
export async function GET(_request: Request, { params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale) || !Object.hasOwn(blogImages, `${params.locale}/${params.slug}`)) {
    return new Response(null, { status: 404 });
  }
  const image = await readFile(join(process.cwd(), "public", getPostSocialImage(params.locale, params.slug)));
  return new Response(new Uint8Array(image), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
