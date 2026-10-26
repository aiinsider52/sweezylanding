"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_EVENT } from "../../lib/analytics";
import { analyticsSession, eventPayload, sendMetric } from "../../lib/analytics-client";
import { isDownloadId } from "../../data/downloads";

let lastPage = "";
const busy = new WeakSet<HTMLAnchorElement>();
export function GrowthAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    const page = () => {
      const session = analyticsSession();
      if (!session) { lastPage = ""; return; }
      const key = `${session.id}:${location.pathname}`;
      if (key !== lastPage) { lastPage = key; void sendMetric("page_view"); }
    };
    page();
    const click = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const url = new URL(link.href, location.origin);
      const asset = link.dataset.download;
      if (asset && isDownloadId(asset) && url.origin === location.origin && url.pathname.startsWith("/api/download/")) {
        event.preventDefault();
        if (busy.has(link)) return;
        busy.add(link); link.setAttribute("aria-busy", "true");
        const eventId = crypto.randomUUID();
        const placement = link.dataset.placement ?? "resources";
        const payload = eventPayload("download_requested", { asset, placement, eventId });
        void sendMetric("download_requested", { asset, placement, eventId });
        const headers: Record<string, string> = payload ? { "x-sweezy-consent": "v1", "x-sweezy-session": payload.session, "x-sweezy-download": eventId, "x-sweezy-path": payload.path, "x-sweezy-entry": payload.entry, "x-sweezy-source": payload.source } : {};
        void (async () => {
          try {
            const response = await fetch(link.href, { headers });
            if (!response.ok || !response.headers.get("content-type")?.startsWith("application/pdf")) throw new Error("PDF unavailable");
            const bytes = await response.arrayBuffer();
            const expected = Number(response.headers.get("content-length") ?? 0);
            const encoded = response.headers.get("content-encoding");
            if (!bytes.byteLength || (expected && !encoded && expected !== bytes.byteLength) || new TextDecoder().decode(bytes.slice(0, 5)) !== "%PDF-") throw new Error("Incomplete PDF");
            void sendMetric("download_received", { asset, placement, eventId });
            const blobUrl = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
            const anchor = document.createElement("a"); anchor.href = blobUrl; anchor.download = link.download || `${asset}.pdf`; document.body.appendChild(anchor); anchor.click(); anchor.remove();
            window.setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);
          } catch {
            void sendMetric("download_failed", { asset, placement, eventId });
            location.assign(link.href);
          } finally { busy.delete(link); link.removeAttribute("aria-busy"); }
        })();
        return;
      }
      if (url.hostname === "apps.apple.com") void sendMetric("app_click", { placement: link.dataset.placement ?? "site" });
      if (url.protocol === "mailto:" && link.dataset.partnerContact) void sendMetric("partner_contact", { action: link.dataset.partnerContact, placement: link.dataset.placement ?? "partners" });
      if (link.dataset.service && link.dataset.serviceAction) void sendMetric("service_contact", { provider: link.dataset.service, action: link.dataset.serviceAction, placement: "service-directory" });
      if (["t.me", "www.facebook.com", "www.instagram.com"].includes(url.hostname)) void sendMetric("community_click", { placement: "site" });
    };
    const storage = (event: StorageEvent) => { if (event.key === "sweezy-metrics-consent") page(); };
    window.addEventListener(CONSENT_EVENT, page); window.addEventListener("storage", storage); document.addEventListener("click", click);
    return () => { window.removeEventListener(CONSENT_EVENT, page); window.removeEventListener("storage", storage); document.removeEventListener("click", click); };
  }, [pathname]);
  return null;
}
