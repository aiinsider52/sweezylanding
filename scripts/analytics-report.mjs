import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const option = (name, fallback) => { const index = args.indexOf(name); return index >= 0 ? args[index + 1] : fallback; };
const directory = resolve(option("--dir", process.env.SWEEZY_ANALYTICS_DIR ?? ".local/analytics"));
const days = Number(option("--days", "28"));
if (!Number.isInteger(days) || days < 1 || days > 90) throw new Error("--days must be between 1 and 90");
const cutoff = Date.now() - days * 86400000;
const rows = [];
const files = await readdir(directory).catch(error => { if (error.code === "ENOENT") return []; throw error; });
for (const file of files.filter(file => /^events-\d{4}-\d{2}-\d{2}\.jsonl$/.test(file)).sort()) {
  const lines = (await readFile(resolve(directory, file), "utf8")).split("\n").filter(Boolean);
  for (const line of lines) {
    try { const row = JSON.parse(line); if (Date.parse(row.recordedAt) >= cutoff && Date.parse(row.recordedAt) <= Date.now()) rows.push(row); } catch { /* Skip an interrupted final line. */ }
  }
}
const seen = new Set();
const events = rows.filter(row => { const key = `${row.session}:${row.event}:${row.eventId}`; if (seen.has(key)) return false; seen.add(key); return true; }).sort((a, b) => a.recordedAt.localeCompare(b.recordedAt));
const sessions = new Map();
const pages = new Map();
const downloads = new Map();
for (const event of events) {
  if (!sessions.has(event.session)) sessions.set(event.session, { source: event.source, entry: event.entry, events: [] });
  sessions.get(event.session).events.push(event);
  if (event.event === "page_view") pages.set(event.path, (pages.get(event.path) ?? 0) + 1);
  if (event.asset) {
    const key = `${event.session}:${event.eventId}`;
    if (!downloads.has(key)) downloads.set(key, { asset: event.asset, requested: false, served: false, received: false });
    const item = downloads.get(key);
    if (event.event === "download_requested") item.requested = true;
    if (event.event === "download_served") item.served = true;
    if (event.event === "download_received") item.received = true;
  }
}
const count = name => events.filter(row => row.event === name).length;
const requests = Array.from(downloads.values()).filter(row => row.requested).length;
const received = Array.from(downloads.values()).filter(row => row.requested && row.received).length;
const corroborated = Array.from(downloads.values()).filter(row => row.requested && row.served && row.received).length;
let appAfterPdf = 0, providerAfterPdf = 0;
for (const session of sessions.values()) {
  const firstReceipt = session.events.findIndex(event => event.event === "download_received");
  if (firstReceipt >= 0) {
    const onward = session.events.slice(firstReceipt + 1);
    if (onward.some(event => event.event === "app_click")) appAfterPdf++;
    if (onward.some(event => event.event === "service_contact")) providerAfterPdf++;
  }
}
const sources = {};
for (const session of sessions.values()) sources[session.source] = (sources[session.source] ?? 0) + 1;
const report = {
  generatedAt: new Date().toISOString(), days, measuredTabSessions: sessions.size,
  definitions: ["Only opted-in browser tabs are measured; these are not all visits or unique people.", "download_received means a complete PDF response reached browser JavaScript, not that a file was saved or opened.", "serverCorroboratedReceipts require matching requested, served and received events for the same tab/request.", "App, community and provider clicks do not confirm installs, messages, calls, bookings or purchases.", "After-PDF steps use server receipt order within the same consenting tab. Sessions crossing the reporting window can have incomplete funnels.", "Source is captured when measurement starts after consent; earlier page activity is not reconstructed."],
  funnel: { pageViews: count("page_view"), pdfRequests: requests, pdfReceivedInBrowser: received, serverCorroboratedReceipts: corroborated, pdfReceiptRate: requests ? Number((received / requests).toFixed(4)) : null, appClicks: count("app_click"), providerClicks: count("service_contact"), communityClicks: count("community_click"), sessionsWithAppClickAfterPdf: appAfterPdf, sessionsWithProviderClickAfterPdf: providerAfterPdf },
  sources,
  pages: Array.from(pages, ([path, views]) => ({ path, views })).sort((a, b) => b.views - a.views),
  downloads: Array.from(new Set(Array.from(downloads.values(), row => row.asset)), asset => ({ asset, requested: Array.from(downloads.values()).filter(row => row.asset === asset && row.requested).length, received: Array.from(downloads.values()).filter(row => row.asset === asset && row.requested && row.received).length })),
};
process.stdout.write(JSON.stringify(report, null, 2) + "\n");
