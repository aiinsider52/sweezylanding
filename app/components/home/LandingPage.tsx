import Image from "next/image";
import Link from "next/link";
import type { Locale } from "../../../lib/i18n";
import { landingCopy } from "../../../lib/landing-copy";
import { APP_STORE_URL, INSTAGRAM_URL, TELEGRAM_URL } from "../../../lib/links";
import { JsonLd } from "../seo/JsonLd";
import { AppFrameCluster } from "./AppFrameCluster";
import { LandingFaq } from "./LandingFaq";
import { LandingNav } from "./LandingNav";
import { MotionArticle, MotionListItem, MotionReveal } from "./MotionReveal";
import { ShowcaseTabs } from "./ShowcaseTabs";
import styles from "./landing.module.css";

const ABOUT_LABEL: Record<Locale, string> = {
  en: "About & editorial",
  uk: "Про Sweezy та редакцію",
  de: "Über Sweezy & Redaktion",
};

export function LandingPage({ locale }: { locale: Locale }) {
  const copy = landingCopy[locale];
  const currentYear = new Date().getFullYear();
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
      <div className={styles.navWrap}>
        <LandingNav locale={locale} copy={copy.nav} />
      </div>

      <main>
        <section className={styles.hero}>
          <MotionReveal className={styles.heroCopy}>
            <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
            <h1>
              {copy.hero.title}
              <span>{copy.hero.accent}</span>
            </h1>
            <p className={styles.heroBody}>{copy.hero.body}</p>
            <div className={styles.heroActions}>
              <a href={APP_STORE_URL} target="_blank" rel="noreferrer noopener" className={styles.primaryButton}>
                {copy.hero.primary}
              </a>
              <a href="#product" className={styles.secondaryButton}>{copy.hero.secondary}</a>
            </div>
            <p className={styles.heroNote}>{copy.hero.footnote}</p>
          </MotionReveal>

          <MotionReveal className={styles.heroVisual} delay={0.12} hoverLift>
            <div className={styles.heroVisualLabel}>
              <span>Sweezy</span>
              <span>01 — PATH</span>
            </div>
            <AppFrameCluster
              frames={[
                "/app-frames/path-city-hub.png",
                "/app-frames/path-journey.png",
                "/app-frames/path-permit-checklist.png",
              ]}
              alt="Sweezy personal journey through relocation tasks"
              priority
            />
          </MotionReveal>
        </section>

        <section className={styles.proof} aria-label="Sweezy in numbers">
          {copy.proof.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
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
          </MotionReveal>
          <div className={styles.storyGrid}>
            {copy.stories.items.map((story, index) => (
              <MotionArticle key={story.name} className={styles.storyCard} delay={index * 0.06}>
                <Image src={story.image} alt="" fill sizes="(max-width: 760px) 92vw, 33vw" className={styles.storyImage} />
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

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <Image src="/brand/sweezy-mark.svg" alt="" width={42} height={42} />
          <div><strong>Sweezy</strong><span>{copy.footer.line}</span></div>
        </div>
        <div className={styles.footerLinks}>
          <div>
            <p>{copy.footer.product}</p>
            <a href="#product">{copy.nav.product}</a>
            <a href="#method">{copy.nav.method}</a>
            <Link href={`/${locale}/guides`}>{copy.nav.guides}</Link>
          </div>
          <div>
            <p>{copy.footer.resources}</p>
            <Link href={`/${locale}/blog`}>{copy.nav.blog}</Link>
            {locale === "uk" ? (
              <Link href="/uk/blog/status-s-shveytcariya-povnyy-gid">Українцям у Швейцарії</Link>
            ) : null}
            <Link href={`/${locale}/about`}>{ABOUT_LABEL[locale]}</Link>
            <Link href="/support">{copy.footer.support}</Link>
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer noopener">Telegram</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer noopener">Instagram</a>
          </div>
          <div>
            <p>{copy.footer.legal}</p>
            <Link href="/privacy">{copy.footer.privacy}</Link>
            <Link href="/terms">{copy.footer.terms}</Link>
            <Link href="/cookies">{copy.footer.cookies}</Link>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© {currentYear} Sweezy</span>
          <span>Made in Switzerland by AI Insider</span>
        </div>
      </footer>
    </div>
  );
}
