import { appendFile, mkdir, readdir, unlink } from "node:fs/promises";
import { join, isAbsolute } from "node:path";
import type { MetricEvent } from "./analytics";

let lastPrune = 0;
// JSONL on a persistent Node volume, or an explicitly configured HTTPS event sink.
// Files are never served publicly. No IP, user agent, full referrer or query strings.
export async function persistMetric(event: MetricEvent) {
  const row = { ...event, recordedAt: new Date().toISOString(), schema: 1 };
  const sink = process.env.SWEEZY_ANALYTICS_SINK;
  if (sink) {
    if (new URL(sink).protocol !== "https:") throw new Error("Analytics sink requires HTTPS");
    const response = await fetch(sink, { method: "POST", headers: { "content-type": "application/json", ...(process.env.SWEEZY_ANALYTICS_TOKEN ? { authorization: `Bearer ${process.env.SWEEZY_ANALYTICS_TOKEN}` } : {}) }, body: JSON.stringify(row), signal: AbortSignal.timeout(4000), cache: "no-store" });
    if (!response.ok) throw new Error("Analytics storage unavailable");
    return;
  }
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) throw new Error("Configure persistent analytics storage for serverless hosting");
  const configured = process.env.SWEEZY_ANALYTICS_DIR?.trim() || ".local/analytics";
  const directory = isAbsolute(configured) ? configured : join(process.cwd(), configured);
  await mkdir(directory, { recursive: true, mode: 0o700 });
  await appendFile(join(directory, `events-${row.recordedAt.slice(0, 10)}.jsonl`), JSON.stringify(row) + "\n", { mode: 0o600 });
  if (Date.now() - lastPrune > 86400000) {
    lastPrune = Date.now();
    const cutoff = new Date(Date.now() - 90 * 86400000).toISOString().slice(0, 10);
    const files = await readdir(directory);
    await Promise.all(files.filter(file => /^events-\d{4}-\d{2}-\d{2}\.jsonl$/.test(file) && file.slice(7, 17) < cutoff).map(file => unlink(join(directory, file))));
  }
}
