import { BASE_URL } from "./alternates";
import { APP_STORE_URL, TELEGRAM_URL, FACEBOOK_COMMUNITY_URL, INSTAGRAM_URL } from "./links";

// Shared IDs connect translations, the publisher and real founders. John is a
// fictional mascot and is deliberately not represented as a Person entity.
export const ENTITY_IDS = {
  organization: `${BASE_URL}/#organization`,
  website: `${BASE_URL}/#website`,
  application: `${BASE_URL}/#application`,
  editorial: `${BASE_URL}/en/authors/sweezy-team#editorial`,
  vladyslav: `${BASE_URL}/en/authors/sweezy-team#vladyslav`,
  yuliia: `${BASE_URL}/en/authors/sweezy-team#yuliia`,
} as const;

export const SITE_ENTITIES = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization", "@id": ENTITY_IDS.organization,
      name: "Sweezy", url: BASE_URL,
      description: "Practical guides and local resources for newcomers in Switzerland, Germany and Austria.",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/brand/logo.png` },
      sameAs: [TELEGRAM_URL, FACEBOOK_COMMUNITY_URL, INSTAGRAM_URL],
      founder: [{ "@type": "Person", "@id": ENTITY_IDS.vladyslav, name: "Vladyslav Katash" }, { "@type": "Person", "@id": ENTITY_IDS.yuliia, name: "Yuliia Antonyshyn" }],
    },
    {
      "@type": "WebSite", "@id": ENTITY_IDS.website, name: "Sweezy", url: BASE_URL,
      description: "Practical guides, informational PDFs and local support for newcomers in Switzerland, Germany and Austria.",
      inLanguage: ["en", "uk", "de"], publisher: { "@id": ENTITY_IDS.organization },
      about: { "@id": ENTITY_IDS.organization },
    },
    {
      "@type": "Organization", "@id": ENTITY_IDS.editorial,
      name: "Sweezy Team", url: `${BASE_URL}/en/authors/sweezy-team`,
      parentOrganization: { "@id": ENTITY_IDS.organization }, knowsLanguage: ["uk", "en", "de"],
    },
  ],
};

export const APPLICATION_IDENTITY = {
  "@id": ENTITY_IDS.application,
  publisher: { "@id": ENTITY_IDS.organization },
  creator: { "@id": ENTITY_IDS.vladyslav },
  sameAs: APP_STORE_URL,
};
