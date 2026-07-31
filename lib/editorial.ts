const CANTON_IMAGES: Record<string, string> = {
  zurich: "/images/canton-zurich.jpg",
  bern: "/images/canton-bern.jpg",
  lucerne: "/images/canton-lucerne.jpg",
  geneva: "/images/canton-geneva.jpg",
  vaud: "/images/canton-lausanne.jpg",
  "basel-stadt": "/images/canton-basel.jpg",
};

const POST_IMAGES: Array<[RegExp, string]> = [
  [/job|robot|arbeit|cv|lebenslauf/i, "/images/feature-cv.jpg"],
  [/permit|status|bewill|dozvil/i, "/images/feature-checklists.jpg"],
  [/housing|wohnung|zhytl|rent|miete/i, "/images/feature-map.jpg"],
  [/insurance|versicherung|strakhuv/i, "/images/feature-guides.jpg"],
  [/language|sprache|mov/i, "/images/feature-languages.jpg"],
  [/geneva|genf|zhenev/i, "/images/canton-geneva.jpg"],
  [/zurich|zürich|tsyur/i, "/images/canton-zurich.jpg"],
  [/lucerne|luzern|lyutsern/i, "/images/canton-lucerne.jpg"],
  [/bern/i, "/images/canton-bern.jpg"],
];

export function getCantonImage(slug: string) {
  return CANTON_IMAGES[slug] ?? null;
}

export function getPostImage(slug: string) {
  return POST_IMAGES.find(([pattern]) => pattern.test(slug))?.[1] ?? "/images/step-guides.jpg";
}
