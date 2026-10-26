/* HTTP integration against a production build, using isolated synthetic data.
   No browser rendering, outside services or production analytics are involved. */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const net = require("node:net");
const { spawn, execFileSync } = require("node:child_process");
const { randomUUID } = require("node:crypto");

async function main() {
  await fs.access(".next/BUILD_ID");
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "sweezy-live-funnel-"));
  const socket = net.createServer();
  await new Promise((resolve, reject) => { socket.on("error", reject); socket.listen(0, "127.0.0.1", resolve); });
  const port = socket.address().port;
  await new Promise(resolve => socket.close(resolve));
  const base = `http://127.0.0.1:${port}`;
  const env = { ...process.env, SWEEZY_ANALYTICS_DIR: directory };
  // A local integration must never use a configured external sink.
  delete env.SWEEZY_ANALYTICS_SINK;
  delete env.SWEEZY_ANALYTICS_TOKEN;
  delete env.VERCEL;
  delete env.AWS_LAMBDA_FUNCTION_NAME;
  const server = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "start", "-H", "127.0.0.1", "-p", String(port)], { env, stdio: ["ignore", "pipe", "pipe"] });
  let output = "";
  server.stdout.on("data", chunk => { output += chunk; });
  server.stderr.on("data", chunk => { output += chunk; });
  try {
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => { clearInterval(timer); reject(new Error("Preview startup timed out: " + output)); }, 15000);
      const timer = setInterval(() => {
        if (output.includes("Ready in")) { clearInterval(timer); clearTimeout(timeout); resolve(); }
        else if (server.exitCode !== null) { clearInterval(timer); clearTimeout(timeout); reject(new Error(output)); }
      }, 100);
      server.on("error", error => { clearInterval(timer); clearTimeout(timeout); reject(error); });
    });
    const session = randomUUID();
    const requestId = randomUUID();
    const event = { session, eventId: randomUUID(), event: "page_view", path: "/uk/resources", entry: "/uk/blog/ukrayinski-posluhy-shveytcariya", source: "google" };
    const post = (body, consent = true) => fetch(`${base}/api/events`, { method: "POST", headers: { origin: base, "content-type": "application/json", ...(consent ? { "x-sweezy-consent": "v1" } : {}) }, body: JSON.stringify(body) });
    assert.equal((await post(event, false)).status, 403);
    assert.deepEqual(await fs.readdir(directory), [], "No event can be persisted without consent");
    assert.equal((await post(event)).status, 204);
    assert.equal((await post({ ...event, event: "download_requested", eventId: requestId, asset: "first-week", placement: "release-qa" })).status, 204);
    const pdf = await fetch(`${base}/api/download/first-week?locale=uk&placement=release-qa`, { headers: { "x-sweezy-consent": "v1", "sec-fetch-site": "same-origin", "x-sweezy-session": session, "x-sweezy-download": requestId, "x-sweezy-path": event.path, "x-sweezy-entry": event.entry, "x-sweezy-source": event.source } });
    assert.equal(pdf.status, 200);
    assert.equal(pdf.headers.get("content-type"), "application/pdf");
    assert(pdf.headers.get("content-disposition").startsWith("attachment;"));
    const bytes = Buffer.from(await pdf.arrayBuffer());
    assert.equal(bytes.subarray(0, 5).toString(), "%PDF-");
    assert.equal(bytes.length, Number(pdf.headers.get("content-length")));
    assert.equal((await post({ ...event, event: "download_received", eventId: requestId, asset: "first-week", placement: "release-qa" })).status, 204);
    assert.equal((await post({ ...event, event: "app_click", eventId: randomUUID() })).status, 204);
    assert.equal((await post({ ...event, event: "service_contact", provider: "test-provider", action: "website", eventId: randomUUID() })).status, 204);
    assert.equal((await post({ ...event, event: "partner_contact", path: "/uk/partners", action: "profile", eventId: randomUUID(), email: "never-store@example.com", body: "private-company-information" })).status, 204);
    const files = await fs.readdir(directory);
    const log = (await Promise.all(files.map(file => fs.readFile(path.join(directory, file), "utf8")))).join("");
    assert(!log.includes("never-store") && !log.includes("private-company"));
    const report = JSON.parse(execFileSync(process.execPath, ["scripts/analytics-report.mjs", "--dir", directory], { encoding: "utf8" }));
    assert.equal(report.measuredTabSessions, 1);
    assert.equal(report.funnel.serverCorroboratedReceipts, 1);
    assert.equal(report.funnel.sessionsWithAppClickAfterPdf, 1);
    assert.equal(report.funnel.sessionsWithProviderClickAfterPdf, 1);
    assert.equal(report.funnel.partnerContactIntents, 1);
    const count = log.trim().split("\n").length;
    const noConsentPdf = await fetch(`${base}/api/download/first-week?locale=uk`);
    assert.equal(noConsentPdf.status, 200);
    await noConsentPdf.arrayBuffer();
    const after = (await Promise.all(files.map(file => fs.readFile(path.join(directory, file), "utf8")))).join("");
    assert.equal(after.trim().split("\n").length, count, "Downloading without consent does not add analytics");
    assert.equal((await fetch(`${base}/api/download/not-an-asset?locale=uk`)).status, 404);
    // Simulate broken storage in this disposable directory. A metrics outage
    // must be visible to collection callers while PDF delivery stays available.
    await fs.unlink(path.join(directory, files[0]));
    await fs.mkdir(path.join(directory, files[0]));
    assert.equal((await post({ ...event, eventId: randomUUID() })).status, 503);
    const outagePdf = await fetch(`${base}/api/download/first-week?locale=uk`, { headers: { "x-sweezy-consent": "v1", "sec-fetch-site": "same-origin", "x-sweezy-session": session, "x-sweezy-download": randomUUID(), "x-sweezy-path": event.path, "x-sweezy-entry": event.entry, "x-sweezy-source": event.source } });
    assert.equal(outagePdf.status, 200, "Metrics storage failure cannot block the PDF");
    assert.equal(Buffer.from(await outagePdf.arrayBuffer()).subarray(0, 5).toString(), "%PDF-");
    console.log("PASS live production HTTP: consent → events → PDF response → persisted request/served/receipt → app/provider/partner report; opt-out and storage-outage downloads work; private email content excluded. Browser UI was not exercised.");
  } finally {
    const exited = new Promise(resolve => server.once("exit", resolve));
    if (server.exitCode === null) { server.kill("SIGTERM"); await exited; }
    await fs.rm(directory, { recursive: true, force: true });
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
