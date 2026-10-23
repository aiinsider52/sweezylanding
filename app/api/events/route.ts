import { validateMetric } from "../../../lib/analytics";
import { persistMetric } from "../../../lib/analytics-store";
import { isDownloadId, DOWNLOADS } from "../../../data/downloads";

export const runtime = "nodejs";
export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin || request.headers.get("x-sweezy-consent") !== "v1") return new Response(null, { status: 403 });
  if (Number(request.headers.get("content-length") ?? 0) > 4096) return new Response(null, { status: 413 });
  const reader = request.body?.getReader();
  if (!reader) return new Response(null, { status: 400 });
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > 4096) { await reader.cancel(); return new Response(null, { status: 413 }); }
    chunks.push(value);
  }
  const body = Buffer.concat(chunks).toString("utf8");
  let data: unknown;
  try { data = JSON.parse(body); } catch { return new Response(null, { status: 400 }); }
  const event = validateMetric(data);
  if (!event || (event.asset && !isDownloadId(event.asset))) return new Response(null, { status: 400 });
  if (event.asset && isDownloadId(event.asset)) event.country = DOWNLOADS[event.asset].country;
  try { await persistMetric(event); } catch { return new Response(null, { status: 503 }); }
  return new Response(null, { status: 204, headers: { "cache-control": "no-store" } });
}
