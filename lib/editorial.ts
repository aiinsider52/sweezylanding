import type { Locale } from "./i18n";

const CANTON_IMAGES: Record<string, string> = {
  zurich: "/images/canton-zurich.jpg",
  bern: "/images/canton-bern.jpg",
  lucerne: "/images/canton-lucerne.jpg",
  geneva: "/images/canton-geneva.jpg",
  vaud: "/images/canton-lausanne.jpg",
  "basel-stadt": "/images/canton-basel.jpg",
};

const GENERATED_POST_IMAGES: Partial<Record<Locale, Record<string, string>>> = {
  uk: {
    "status-s-pislya-bereznya-2027": "/editorial/status-s-after-march-2027.webp",
    "poshuk-roboty-shveytcariya-2026": "/editorial/job-search-switzerland-ukrainians.webp",
    "yak-zekonomyty-na-strakhovantsi-shveytcariya": "/editorial/swiss-health-insurance-savings.webp",
    "bezpechni-rehiony-ukrainy-status-s": "/editorial/status-s-safe-regions-ukraine.webp",
  },
};

const TOPICS = [
  { pattern: /status-s|prodovzh|vidmova|bezpechni/i, key: "status", accent: "#adff00", soft: "#dff7b4" },
  { pattern: /job|robot|arbeit|cv|lebenslauf|work-permit/i, key: "work", accent: "#82c8ff", soft: "#c9e8ff" },
  { pattern: /insurance|versicherung|strakhuv|strakhiv/i, key: "insurance", accent: "#70d6a8", soft: "#ccefdc" },
  { pattern: /tax|steuer|pension|ahv|finansova/i, key: "tax", accent: "#ff826e", soft: "#ffd3ca" },
  { pattern: /apartment|housing|wohnung|zhytl|rent|miete/i, key: "housing", accent: "#ffc85c", soft: "#ffe6ae" },
  { pattern: /bank|konto|rakhunok/i, key: "banking", accent: "#8da7ff", soft: "#d7defe" },
  { pattern: /register|anmeldung|zareyestr|permit|bewill|dozvil/i, key: "registration", accent: "#c9a7ff", soft: "#e8dbff" },
  { pattern: /geneva|genf|zurich|zürich|moving|umzug|pereizd|checklist|checkliste|chekist/i, key: "relocation", accent: "#ffb36b", soft: "#ffe0c1" },
  { pattern: /apps?|zastosun/i, key: "digital", accent: "#64d9e8", soft: "#c8f1f5" },
] as const;

const TOPIC_LABELS: Record<string, Record<Locale, string>> = {
  status: { en: "Status S", uk: "Статус S", de: "Status S" },
  work: { en: "Work", uk: "Робота", de: "Arbeit" },
  insurance: { en: "Health insurance", uk: "Медичне страхування", de: "Krankenversicherung" },
  tax: { en: "Tax & finance", uk: "Податки й фінанси", de: "Steuern & Finanzen" },
  housing: { en: "Housing", uk: "Житло", de: "Wohnen" },
  banking: { en: "Banking", uk: "Банкінг", de: "Banking" },
  registration: { en: "Registration", uk: "Реєстрація", de: "Anmeldung" },
  relocation: { en: "Relocation", uk: "Переїзд", de: "Umzug" },
  digital: { en: "Digital life", uk: "Цифрові сервіси", de: "Digitaler Alltag" },
  guide: { en: "Switzerland guide", uk: "Гід по Швейцарії", de: "Schweiz-Ratgeber" },
};

function stableHash(value: string) {
  return value.split("").reduce((total, character) => ((total * 31) + character.charCodeAt(0)) >>> 0, 0);
}

export function getPostArtwork(slug: string, locale: Locale) {
  const topic = TOPICS.find(({ pattern }) => pattern.test(slug)) ?? {
    key: "guide",
    accent: "#adff00",
    soft: "#dff7b4",
  };
  const hash = stableHash(`${locale}-${slug}`);

  return {
    ...topic,
    label: TOPIC_LABELS[topic.key][locale],
    issue: String((hash % 89) + 10).padStart(2, "0"),
    markerA: 16 + (hash % 34),
    markerB: 48 + ((hash >>> 4) % 31),
    rotation: -12 + ((hash >>> 8) % 25),
  };
}

export function getCantonImage(slug: string) {
  return CANTON_IMAGES[slug] ?? null;
}

export function getCantonImageAlt(locale: Locale, cantonName: string) {
  if (locale === "uk") {
    return `${cantonName}, Швейцарія — міський краєвид і практичний гід для переїзду та реєстрації`;
  }
  if (locale === "de") {
    return `${cantonName}, Schweiz — Stadtansicht und praktischer Guide zu Umzug und Anmeldung`;
  }
  return `${cantonName}, Switzerland — city view and practical guide to relocation and registration`;
}

export function getPostImage(locale: Locale, slug: string) {
  return GENERATED_POST_IMAGES[locale]?.[slug] ?? `/${locale}/blog/${slug}/opengraph-image`;
}

export function getPostSocialImage(locale: Locale, slug: string) {
  return `/${locale}/blog/${slug}/opengraph-image`;
}

export function getPostImageAlt(locale: Locale, title: string, slug: string) {
  const topic = getPostArtwork(slug, locale).label;
  if (locale === "uk") return `Редакційна обкладинка Sweezy про «${title}» — тема: ${topic}`;
  if (locale === "de") return `Redaktionelles Sweezy-Titelbild zu „${title}“ — Thema: ${topic}`;
  return `Sweezy editorial cover for “${title}” — ${topic}`;
}
