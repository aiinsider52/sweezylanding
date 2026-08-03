import Image from "next/image";
import Link from "next/link";
import type { Locale } from "../../../lib/i18n";
import { landingCopy } from "../../../lib/landing-copy";
import { APP_STORE_URL } from "../../../lib/links";
import { JsonLd } from "../seo/JsonLd";
import { destinationImage, travelDestinations } from "../../../data/travel-destinations";
import { AppFrameCluster } from "./AppFrameCluster";
import { AnimatedProof } from "./AnimatedProof";
import { CinematicJourney } from "./CinematicJourney";
import { LandingFaq } from "./LandingFaq";
import { MotionArticle, MotionListItem, MotionReveal } from "./MotionReveal";
import { PartnerNetwork } from "./PartnerNetwork";
import { ShowcaseTabs } from "./ShowcaseTabs";
import styles from "./landing.module.css";

const PLACES_COPY: Record<Locale, { eyebrow: string; title: string; body: string; open: string; all: string }> = {
  en: { eyebrow: "SWITZERLAND OUTSIDE THE CHECKLIST", title: "Live here. Explore here.", body: "Sweezy now combines relocation guidance with practical routes to Switzerland's mountains, lakes, cities and natural landmarks.", open: "Open place", all: "Explore all places" },
  uk: { eyebrow: "ШВЕЙЦАРІЯ ПОЗА ЧЕКЛИСТОМ", title: "Живіть тут. Відкривайте тут.", body: "Sweezy поєднує допомогу з переїздом із практичними маршрутами до гір, озер, міст і природних пам'яток Швейцарії.", open: "Відкрити місце", all: "Усі красиві місця" },
  de: { eyebrow: "SCHWEIZ AUSSERHALB DER CHECKLISTE", title: "Hier leben. Hier entdecken.", body: "Sweezy verbindet Umzugshilfe mit praktischen Routen zu Bergen, Seen, Städten und Naturwundern der Schweiz.", open: "Ort öffnen", all: "Alle Orte entdecken" },
};

export function LandingPage({ locale }: { locale: Locale }) {
  const copy = landingCopy[locale];
  const softwareSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Sweezy",
        operatingSystem: "iOS",
        applicationCategory: "LifestyleApplication",
        description: copy.hero.body,
        url: `https://www.sweezy.world/${locale}`,
        downloadUrl: APP_STORE_URL,
        inLanguage: ["en", "uk", "de"],
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.2", ratingCount: "5", bestRating: "5" },
        offers: { "@type": "Offer", price: "0", priceCurrency: "CHF" },
      },
      {
        "@type": "FAQPage",
        mainEntity: copy.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <div lang={locale} className={styles.landing}>
      <JsonLd data={softwareSchema} />
      <main>
        <CinematicJourney locale={locale} hero={copy.hero} />

        <AnimatedProof items={copy.proof} />

        <section className={styles.placesSection}>
          <MotionReveal className={styles.placesHeader}>
            <p className={styles.eyebrow}>{PLACES_COPY[locale].eyebrow}</p>
            <h2>{PLACES_COPY[locale].title}</h2>
            <p>{PLACES_COPY[locale].body}</p>
          </MotionReveal>
          <div className={styles.placesGrid}>
            {travelDestinations.slice(0, 4).map((place, index) => (
              <MotionArticle key={place.slug} className={styles.placeCard} delay={index * 0.055}>
                <Link href={`/${locale}/places/${place.slug}`}>
                  <Image src={destinationImage(place)} alt={place.alt[locale][0]} fill sizes="(max-width: 760px) 92vw, 25vw" />
                  <span className={styles.placeShade} />
                  <span className={styles.placeNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.placeCopy}>
                    <small>{place.region[locale]}</small>
                    <strong>{place.title[locale]}</strong>
                    <em>{PLACES_COPY[locale].open} ↗</em>
                  </span>
                </Link>
              </MotionArticle>
            ))}
          </div>
          <Link href={`/${locale}/places`} className={styles.placesButton}>{PLACES_COPY[locale].all} →</Link>
        </section>

        <section id="product" className={styles.productSection}>
          <MotionReveal className={styles.sectionIntro}>
            <p className={styles.eyebrow}>{copy.product.eyebrow}</p>
            <h2>{copy.product.title}</h2>
            <p>{copy.product.body}</p>
          </MotionReveal>
          <ShowcaseTabs modes={copy.product.modes} />
        </section>

        <section className={styles.valueSection}>
          <MotionReveal className={styles.valueHeader}>
            <p className={styles.eyebrow}>{copy.value.eyebrow}</p>
            <h2>{copy.value.title}</h2>
          </MotionReveal>
          <div className={styles.valueGrid}>
            {copy.value.items.map((item, index) => (
              <MotionArticle key={item.title} className={styles.valueCard} dataTone={index} delay={index * 0.055}>
                <div>
                  <span>{item.tag}</span>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </MotionArticle>
            ))}
          </div>
        </section>

        <section id="method" className={styles.methodSection}>
          <MotionReveal className={styles.methodHeader}>
            <p className={styles.eyebrow}>{copy.method.eyebrow}</p>
            <h2>{copy.method.title}</h2>
          </MotionReveal>
          <ol className={styles.methodList}>
            {copy.method.steps.map((step, index) => (
              <MotionListItem key={step.title} delay={index * 0.045}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </MotionListItem>
            ))}
          </ol>
        </section>

        <section id="stories" className={styles.storiesSection}>
          <MotionReveal className={styles.storiesHeader}>
            <p className={styles.eyebrow}>{copy.stories.eyebrow}</p>
            <h2>{copy.stories.title}</h2>
            <a href={APP_STORE_URL} target="_blank" rel="noreferrer noopener" className={styles.appStoreRating} aria-label="Sweezy App Store rating: 4.2 out of 5 from 5 ratings">
              <span aria-hidden>★★★★★</span><strong>4.2 / 5</strong><em>5 App Store ratings ↗</em>
            </a>
          </MotionReveal>
          <div className={styles.storyGrid}>
            {copy.stories.items.map((story, index) => (
              <MotionArticle key={story.name} className={styles.storyCard} delay={index * 0.06}>
                <Image src={story.image} alt={`${story.name}, Sweezy user sharing relocation experience in Switzerland`} fill sizes="(max-width: 760px) 92vw, 33vw" className={styles.storyImage} />
                <div className={styles.storyOverlay} />
                <blockquote>“{story.quote}”</blockquote>
                <footer>
                  <strong>{story.name}</strong>
                  <span>{story.role}</span>
                </footer>
              </MotionArticle>
            ))}
          </div>
        </section>

        <PartnerNetwork copy={copy.partner} locale={locale} />

        <section id="faq" className={styles.faqSection}>
          <MotionReveal className={styles.faqHeader}>
            <p className={styles.eyebrow}>{copy.faq.eyebrow}</p>
            <h2>{copy.faq.title}</h2>
          </MotionReveal>
          <LandingFaq items={copy.faq.items} />
        </section>

        <section className={styles.ctaSection}>
          <MotionReveal className={styles.ctaCopy}>
            <p className={styles.eyebrow}>{copy.cta.eyebrow}</p>
            <h2>{copy.cta.title}</h2>
            <p>{copy.cta.body}</p>
            <a href={APP_STORE_URL} target="_blank" rel="noreferrer noopener" className={styles.ctaButton}>
              {copy.cta.button}
            </a>
            <span>{copy.cta.note}</span>
          </MotionReveal>
          <MotionReveal className={styles.ctaVisual} delay={0.1} hoverLift>
            <AppFrameCluster
              frames={[
                "/app-frames/profile-situation.png",
                "/app-frames/profile-passport.png",
                "/app-frames/profile-access.png",
              ]}
              alt="Sweezy Passport with personal progress and achievements"
            />
          </MotionReveal>
        </section>
      </main>

    </div>
  );
}
