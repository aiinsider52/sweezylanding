import serviceCountries from "../data/service-countries.json";

export const ANALYTICS_VERSION = "v1";
export const CONSENT_KEY = "sweezy-metrics-consent";
export const SESSION_KEY = "sweezy-metrics-session";
export const CONSENT_EVENT = "sweezy:metrics-consent";
export const METRIC_EVENTS = ["page_view", "download_requested", "download_served", "download_received", "download_failed", "app_click", "service_contact", "community_click", "partner_contact"] as const;
export type MetricName = typeof METRIC_EVENTS[number];
export const SOURCES = ["direct", "google", "bing", "chatgpt", "claude", "perplexity", "gemini", "copilot", "telegram", "facebook", "instagram", "other"] as const;
export type MetricSource = typeof SOURCES[number];
export type MetricEvent = {
  event: MetricName; session: string; eventId: string; path: string; entry: string;
  source: MetricSource; country: "switzerland" | "germany" | "austria" | "dach";
  locale: "uk" | "en" | "de"; asset?: string; placement?: string; action?: string; provider?: string;
};
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const PATH = /^\/(?:[a-z0-9-]+\/?){0,8}$/;
export function metricPath(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const pathname = value.split(/[?#]/)[0];
  return pathname.length <= 220 && PATH.test(pathname) ? pathname : null;
}
export function countryForPath(path: string): MetricEvent["country"] {
  const country = path.match(/^\/(?:uk|en|de)\/countries\/(switzerland|germany|austria)(?:\/|$)/)?.[1];
  if (country) return country as MetricEvent["country"];
  const hubCountry = path.match(/^\/(?:uk|en|de)\/services\/country\/(switzerland|germany|austria)(?:\/|$)/)?.[1];
  if (hubCountry) return hubCountry as MetricEvent["country"];
  const provider = path.match(/^\/uk\/services\/([a-z0-9-]+)\/?$/)?.[1];
  if (provider && Object.hasOwn(serviceCountries, provider)) return serviceCountries[provider as keyof typeof serviceCountries] as MetricEvent["country"];
  if (/^\/uk\/services\/(?:city\/zurich|category\/photography)(?:\/|$)/.test(path)) return "switzerland";
  if (/\/services(?:\/|$)/.test(path) || path === "/uk/blog/biznes-dach-dlya-ukrayintsiv") return "dach";
  return /\/(?:blog|guides|places|planning|starter-kit|swiss-bucket-list)(?:\/|$)/.test(path) ? "switzerland" : "dach";
}
export function sourceForVisit(referrer: string, utmSource = ""): MetricSource {
  const sources: Record<string, MetricSource> = { google: "google", bing: "bing", chatgpt: "chatgpt", claude: "claude", perplexity: "perplexity", gemini: "gemini", copilot: "copilot", telegram: "telegram", facebook: "facebook", instagram: "instagram" };
  const hint = utmSource.toLowerCase().replace(/\.(com|ai|org)$/, "");
  if (Object.hasOwn(sources, hint)) return sources[hint];
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (host === "www.sweezy.world" || host === "sweezy.world" || host === "localhost") return "direct";
    if (/^(?:www\.)?google\.[a-z.]+$/.test(host)) return "google";
    for (const [domain, name] of [["bing.com", "bing"], ["chatgpt.com", "chatgpt"], ["chat.openai.com", "chatgpt"], ["claude.ai", "claude"], ["claude.com", "claude"], ["perplexity.ai", "perplexity"], ["perplexity.com", "perplexity"], ["gemini.google.com", "gemini"], ["copilot.microsoft.com", "copilot"], ["t.me", "telegram"], ["facebook.com", "facebook"], ["instagram.com", "instagram"]] as const) {
      if (host === domain || host.endsWith(`.${domain}`)) return name;
    }
    return "other";
  } catch { return "direct"; }
}
export function validateMetric(value: unknown, allowServerEvent = false): MetricEvent | null {
  if (!value || typeof value !== "object") return null;
  const data = value as Record<string, unknown>;
  if (!METRIC_EVENTS.includes(data.event as MetricName) || (!allowServerEvent && data.event === "download_served")) return null;
  if (typeof data.session !== "string" || !UUID.test(data.session) || typeof data.eventId !== "string" || !UUID.test(data.eventId)) return null;
  const path = metricPath(data.path), entry = metricPath(data.entry);
  if (!path || !entry || !SOURCES.includes(data.source as MetricSource)) return null;
  const locale = path.split("/")[1];
  const result: MetricEvent = { event: data.event as MetricName, session: data.session, eventId: data.eventId, path, entry, source: data.source as MetricSource, country: countryForPath(path), locale: locale === "uk" || locale === "de" ? locale : "en" };
  for (const field of ["asset", "placement", "action", "provider"] as const) {
    if (typeof data[field] === "string" && /^[a-z0-9-]{1,80}$/.test(data[field] as string)) result[field] = data[field] as string;
  }
  if (result.event.startsWith("download_") && !result.asset) return null;
  if (result.event === "service_contact" && (!result.provider || !["phone", "email", "website", "directions"].includes(result.action ?? ""))) return null;
  if (result.event === "partner_contact" && !["listing", "profile", "promotion", "general"].includes(result.action ?? "")) return null;
  return result;
}
