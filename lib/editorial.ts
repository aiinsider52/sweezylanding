import type { Locale } from "./i18n";
import blogImages from "../data/blog-images.json";

type PostImage = { src: string; alt: string; width: number; height: number };
const POST_IMAGES: Record<string, PostImage> = blogImages;

export function getPostImageMetadata(locale: Locale, slug: string): PostImage {
  const image = POST_IMAGES[`${locale}/${slug}`];
  if (!image) throw new Error(`Missing unique blog cover: ${locale}/${slug}`);
  return image;
}

const CANTON_IMAGES: Record<string, string> = {
  zurich: "/images/canton-zurich.jpg",
  bern: "/images/canton-bern.jpg",
  lucerne: "/images/canton-lucerne.jpg",
  geneva: "/images/canton-geneva.jpg",
  vaud: "/images/canton-lausanne.jpg",
  "basel-stadt": "/images/canton-basel.jpg",
};


const TOPICS = [
  { pattern: /posluhy|avtoservis/i, key: "services", accent: "#82c8ff", soft: "#c9e8ff" },
  { pattern: /biznes|samozaynyatist|einzelfirma|gmbh/i, key: "business", accent: "#adff00", soft: "#dff7b4" },
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
  services: { en: "Local services", uk: "Українські послуги", de: "Lokale Angebote" },
  business: { en: "Business", uk: "Власний бізнес", de: "Unternehmen" },
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

export function selectRelatedPosts<T extends { slug: string; locale: Locale; frontmatter: { relatedPosts?: string[] } }>(post: T, posts: T[]): T[] {
  const candidates = posts.filter((candidate) => candidate.locale === post.locale && candidate.slug !== post.slug);
  const topic = getPostArtwork(post.slug, post.locale).key;
  const preferred = (post.frontmatter.relatedPosts ?? []).flatMap((slug) => {
    const candidate = candidates.find((item) => item.slug === slug);
    return candidate ? [candidate] : [];
  });
  const sameTopic = topic === "guide" ? [] : candidates.filter((candidate) => getPostArtwork(candidate.slug, post.locale).key === topic);
  const seen = new Set<string>();
  return [...preferred, ...sameTopic, ...candidates].filter((candidate) => {
    if (seen.has(candidate.slug)) return false;
    seen.add(candidate.slug);
    return true;
  }).slice(0, 3);
}

export function getCantonImageAlt(locale: Locale, cantonName: string) {
  if (locale === "uk") {
    return `Міський краєвид: ${cantonName}, Швейцарія`;
  }
  if (locale === "de") {
    return `Stadtansicht: ${cantonName}, Schweiz`;
  }
  return `City view: ${cantonName}, Switzerland`;
}

export function getPostImage(locale: Locale, slug: string) {
  return getPostImageMetadata(locale, slug).src;
}

export function getPostDisplayTitle(title: string) {
  return title.split(/\s+\|\s+/)[0].trim();
}

export function getPostSocialImage(locale: Locale, slug: string) {
  return getPostImage(locale, slug).replace("/posts/", "/posts/social/").replace(/\.webp$/, ".jpg");
}

export function getPostImageAlt(locale: Locale, _title: string, slug: string) {
  return getPostImageMetadata(locale, slug).alt;
}
