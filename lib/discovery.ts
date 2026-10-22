// Search indexing, user fetches and training are different activities.
export const SEARCH_CRAWLERS = ["OAI-SearchBot", "Claude-SearchBot", "PerplexityBot", "Googlebot", "bingbot"] as const;
export const USER_FETCHERS = ["ChatGPT-User", "Claude-User", "Perplexity-User"] as const;
const TRAINING_CRAWLERS = ["GPTBot", "ClaudeBot"] as const;

export function identifyCrawler(userAgent: string) {
  for (const [purpose, agents] of [["search", SEARCH_CRAWLERS], ["user-fetch", USER_FETCHERS], ["training", TRAINING_CRAWLERS]] as const) {
    const agent = agents.find((name) => new RegExp(`\\b${name}\\b`, "i").test(userAgent));
    if (agent) return { agent, purpose };
  }
  return null;
}

const REFERRAL_HOSTS = [
  ["chatgpt.com", "ChatGPT"], ["chat.openai.com", "ChatGPT"],
  ["claude.ai", "Claude"], ["claude.com", "Claude"],
  ["perplexity.ai", "Perplexity"], ["perplexity.com", "Perplexity"],
  ["gemini.google.com", "Gemini"], ["copilot.microsoft.com", "Microsoft Copilot"],
] as const;

const UTM_SOURCES: Record<string, string> = {
  chatgpt: "ChatGPT", "chatgpt.com": "ChatGPT", "chat.openai.com": "ChatGPT",
  claude: "Claude", "claude.ai": "Claude", "claude.com": "Claude",
  perplexity: "Perplexity", "perplexity.ai": "Perplexity", "perplexity.com": "Perplexity",
  gemini: "Gemini", "gemini.google.com": "Gemini", copilot: "Microsoft Copilot", "copilot.microsoft.com": "Microsoft Copilot",
};

export function detectAiReferral(referrer: string, sourceParam: string) {
  try {
    const url = new URL(referrer);
    if (url.protocol === "https:" || url.protocol === "http:") {
      const match = REFERRAL_HOSTS.find(([host]) => url.hostname === host || url.hostname.endsWith(`.${host}`));
      if (match) return { name: match[1], referrer: url.origin, attribution: "referrer" as const };
    }
  } catch { /* Empty or invalid referrer: inspect the explicit campaign hint. */ }
  const source = sourceParam.trim().toLowerCase();
  const name = Object.prototype.hasOwnProperty.call(UTM_SOURCES, source) ? UTM_SOURCES[source] : undefined;
  return name ? { name, referrer: source, attribution: "utm" as const } : null;
}
