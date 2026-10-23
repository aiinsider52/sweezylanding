"use client";

import { ANALYTICS_VERSION, CONSENT_KEY, SESSION_KEY, CONSENT_EVENT, sourceForVisit, metricPath, countryForPath, type MetricEvent } from "./analytics";

type Session = { id: string; entry: string; source: MetricEvent["source"] };
export function consentChoice(): "accepted" | "declined" | null {
  try {
    const record = JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "null");
    return record?.version === ANALYTICS_VERSION && Date.now() - record.at < 180 * 86400000 && ["accepted", "declined"].includes(record.choice) ? record.choice : null;
  } catch { return null; }
}
export function setConsent(choice: "accepted" | "declined") {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ version: ANALYTICS_VERSION, choice, at: Date.now() }));
    if (choice === "declined") sessionStorage.removeItem(SESSION_KEY);
  } catch { /* Storage unavailable: measurements stay off. */ }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}
export function analyticsSession(): Session | null {
  if (consentChoice() !== "accepted") {
    try { sessionStorage.removeItem(SESSION_KEY); } catch { /* Storage unavailable. */ }
    return null;
  }
  try {
    const existing = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? "null");
    if (existing?.id && metricPath(existing.entry)) return existing;
    const session: Session = { id: crypto.randomUUID(), entry: metricPath(location.pathname) ?? "/", source: sourceForVisit(document.referrer, new URLSearchParams(location.search).get("utm_source") ?? "") };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  } catch { return null; }
}
export function eventPayload(event: MetricEvent["event"], fields: Partial<MetricEvent> = {}): MetricEvent | null {
  const session = analyticsSession();
  if (!session) return null;
  const path = metricPath(location.pathname) ?? "/";
  const locale = path.split("/")[1];
  return { ...fields, event, session: session.id, eventId: fields.eventId ?? crypto.randomUUID(), path, entry: session.entry, source: session.source, country: countryForPath(path), locale: locale === "uk" || locale === "de" ? locale : "en" };
}
export async function sendMetric(event: MetricEvent["event"], fields: Partial<MetricEvent> = {}) {
  const payload = eventPayload(event, fields);
  if (!payload) return;
  try { await fetch("/api/events", { method: "POST", headers: { "content-type": "application/json", "x-sweezy-consent": ANALYTICS_VERSION }, body: JSON.stringify(payload), keepalive: true }); } catch { /* Navigation and actions remain available if measurement fails. */ }
}
