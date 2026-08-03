const CANTON_IMAGES: Record<string, string> = {
  zurich: "/images/canton-zurich.jpg",
  bern: "/images/canton-bern.jpg",
  lucerne: "/images/canton-lucerne.jpg",
  geneva: "/images/canton-geneva.jpg",
  vaud: "/images/canton-lausanne.jpg",
  "basel-stadt": "/images/canton-basel.jpg",
};

const POST_IMAGES: Array<[RegExp, string]> = [
  [/geneva|genf|zhenev/i, "/images/canton-geneva.jpg"],
  [/zurich|zürich|tsyur/i, "/images/canton-zurich.jpg"],
  [/lucerne|luzern|lyutsern/i, "/images/canton-lucerne.jpg"],
  [/bern/i, "/images/canton-bern.jpg"],
  [/status-s.*robot|robot.*status-s/i, "/app-frames/work-experience.png"],
  [/status-s.*med|med.*status-s/i, "/images/feature-guides.jpg"],
  [/apartment|housing|wohnung|zhytl|rent|miete/i, "/images/feature-map.jpg"],
  [/job|robot|arbeit|cv|lebenslauf/i, "/images/feature-cv.jpg"],
  [/bank|konto|rakhunok/i, "/images/step-settle.jpg"],
  [/tax|steuer|pension|ahv|finansova/i, "/destinations/swiss-discovery-lavaux.webp"],
  [/insurance|versicherung|strakhuv|strakhiv/i, "/images/feature-guides.jpg"],
  [/register|anmeldung|zareyestr/i, "/images/step-guides.jpg"],
  [/permit|bewill|dozvil/i, "/images/feature-checklists.jpg"],
  [/apps?|zastosun/i, "/images/feature-marketplace.jpg"],
  [/cost|vartist/i, "/images/canton-lucerne.jpg"],
  [/language|sprache|mova/i, "/images/feature-languages.jpg"],
  [/checklist|checkliste|chekist/i, "/images/step-download.jpg"],
  [/status|prodovzh|vidmova|bezpechni/i, "/app-frames/path-permit-checklist.png"],
];

const POST_IMAGE_FALLBACKS = [
  "/images/step-settle.jpg",
  "/images/feature-languages.jpg",
  "/images/canton-bern.jpg",
  "/destinations/swiss-discovery-rigi.webp",
  "/images/feature-marketplace.jpg",
  "/destinations/swiss-discovery-st-gallen.webp",
] as const;

export function getCantonImage(slug: string) {
  return CANTON_IMAGES[slug] ?? null;
}

export function getPostImage(slug: string) {
  const matched = POST_IMAGES.find(([pattern]) => pattern.test(slug))?.[1];
  if (matched) return matched;

  const hash = slug.split("").reduce((total, character) => ((total * 31) + character.charCodeAt(0)) >>> 0, 0);
  return POST_IMAGE_FALLBACKS[hash % POST_IMAGE_FALLBACKS.length];
}
