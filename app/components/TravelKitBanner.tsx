import Image from "next/image";
import Link from "next/link";
import type { Locale } from "../../lib/i18n";
import { travelKitCopy, travelKitPdf, TRAVEL_KIT_SLUGS } from "../../data/travel-kit";
import { SweezyCompanion } from "./SweezyCompanion";
import styles from "./TravelKit.module.css";

export function TravelKitBanner({ locale, headingAs = "h2" }: { locale: Locale; headingAs?: "h1" | "h2" }) {
  const copy = travelKitCopy[locale];
  const Heading = headingAs;
  return <section id="swiss-travel-kit" className={styles.banner} aria-label={copy.badge}>
    <div className={styles.bannerInner}>
      <Image className={styles.landscape} src="/destinations/swiss-discovery-oeschinen-2.webp" alt="" fill sizes="(max-width: 760px) 100vw, 1500px" />
      <div className={styles.shade} />
      <div className={styles.bannerCopy}>
        <p className={styles.eyebrow}><span aria-hidden="true">↗</span>{copy.badge}</p>
        <Heading>{copy.title}</Heading>
        <p className={styles.intro}>{copy.intro}</p>
        <div className={styles.actions}>
          <a href={travelKitPdf(locale)} download className={styles.primary} data-download="travel-kit" data-placement="travel-kit-banner">{copy.download}<span aria-hidden="true">↓</span></a>
          <Link href={headingAs === "h1" ? "#travel-checklist" : `/${locale}/swiss-bucket-list`} className={styles.secondary}>{copy.open}<span aria-hidden="true">↗</span></Link>
        </div>
        <ul className={styles.benefits}><li>{copy.free}</li><li>{copy.pages}</li><li>{copy.noSignup}</li></ul>
        <div className={styles.companionNote}>
          <SweezyCompanion pose="reader" className={styles.companion} sizes="80px" />
          <div><strong>{copy.guide}</strong><p>{copy.guideNote}</p></div>
        </div>
      </div>
      <div className={styles.visual}>
        <div className={styles.coverBack} aria-hidden="true" />
        <Link className={styles.cover} href={headingAs === "h1" ? "#travel-checklist" : `/${locale}/swiss-bucket-list`} aria-label={copy.open}>
          <Image src={`/downloads/sweezy-travel-kit-cover-${locale}.webp`} alt={copy.title} width={714} height={1010} sizes="(max-width: 760px) 240px, 310px" />
        </Link>
        <div className={styles.count}><strong>{String(TRAVEL_KIT_SLUGS.length).padStart(2, "0")}</strong><span>{copy.destinations}</span></div>
        <p className={styles.photoLabel}>OESCHINENSEE / SWITZERLAND</p>
      </div>
    </div>
  </section>;
}
