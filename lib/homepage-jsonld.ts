import { APP_STORE_URL, TELEGRAM_URL } from "./links";
import { translations, type Locale } from "./i18n";

type FaqCopy = {
  q1: string;
  a1: string;
  q2: string;
  a2: string;
  q3: string;
  a3: string;
  q4: string;
  a4: string;
  q5: string;
  a5: string;
};

function getFaqCopy(locale: Locale): FaqCopy {
  return (translations[locale] as { faq: FaqCopy }).faq;
}

export function buildHomepageJsonLd(locale: Locale) {
  const faq = getFaqCopy(locale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Sweezy",
        operatingSystem: "iOS",
        applicationCategory: "LifestyleApplication",
        description:
          "Step-by-step guides, checklists, service map and CV builder for expats in Switzerland",
        url: "https://www.sweezy.world",
        downloadUrl: APP_STORE_URL,
        inLanguage: ["en", "uk", "de"],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "120",
          bestRating: "5",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "CHF",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: faq.q1,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a1,
            },
          },
          {
            "@type": "Question",
            name: faq.q2,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a2,
            },
          },
          {
            "@type": "Question",
            name: faq.q3,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a3,
            },
          },
          {
            "@type": "Question",
            name: faq.q4,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a4,
            },
          },
          {
            "@type": "Question",
            name: faq.q5,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a5,
            },
          },
        ],
      },
      {
        "@type": "Organization",
        name: "Sweezy",
        url: "https://www.sweezy.world",
        logo: "https://www.sweezy.world/brand/sweezy-mark.svg",
        sameAs: [APP_STORE_URL, TELEGRAM_URL],
      },
    ],
  };
}
