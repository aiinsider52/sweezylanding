import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { isDownloadId, downloadFilename, DOWNLOADS } from "../../../../data/downloads";
import { isLocale } from "../../../../lib/blog";
import { validateMetric } from "../../../../lib/analytics";
import { persistMetric } from "../../../../lib/analytics-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request, { params }: { params: { asset: string } }) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") ?? "en";
  if (!isDownloadId(params.asset) || !isLocale(locale)) return new Response(null, { status: 404 });
  const filename = downloadFilename(params.asset, locale);
  let bytes: Buffer;
  try { bytes = await readFile(join(process.cwd(), "public/downloads", filename)); } catch { return new Response(null, { status: 404 }); }
  if (request.headers.get("x-sweezy-consent") === "v1" && request.headers.get("sec-fetch-site") === "same-origin") {
    const event = validateMetric({ event: "download_served", session: request.headers.get("x-sweezy-session"), eventId: request.headers.get("x-sweezy-download"), path: request.headers.get("x-sweezy-path"), entry: request.headers.get("x-sweezy-entry"), source: request.headers.get("x-sweezy-source"), asset: params.asset, placement: url.searchParams.get("placement") }, true);
    if (event) { event.country = DOWNLOADS[params.asset].country; try { await persistMetric(event); } catch { /* A metrics outage must not prevent a PDF download. */ } }
  }
  return new Response(new Uint8Array(bytes), { headers: { "Content-Type": "application/pdf", "Content-Length": String(bytes.length), "Content-Disposition": `attachment; filename="${filename}"`, "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
}
