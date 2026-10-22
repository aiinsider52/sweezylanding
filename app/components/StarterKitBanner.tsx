import Link from "next/link";
import type { Locale } from "../../lib/i18n";
import { firstWeek } from "../../data/first-week";
import { SweezyCompanion } from "./SweezyCompanion";
import styles from "./StarterKit.module.css";

export function StarterKitBanner({ locale }: { locale: Locale }) {
  const copy = firstWeek[locale];
  return <section className={styles.banner} aria-label={copy.badge}>
    <div className={styles.bannerInner}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{copy.badge}</p>
        <h2 className={styles.title}>{copy.title}</h2>
        <p className={styles.intro}>{copy.intro}</p>
        <div className={styles.actions}>
          <a href={`/downloads/sweezy-first-week-${locale}.pdf`} download className={styles.button} data-download="first-week" data-placement="starter-kit-banner">{copy.download}<span aria-hidden>↓</span></a>
          <Link href={`/${locale}/starter-kit`} className={styles.secondary}>{copy.open}<span aria-hidden>→</span></Link>
        </div>
        <p className={styles.downloadNote}>{locale === "uk" ? "Безкоштовно · 1 сторінка · Без реєстрації" : locale === "de" ? "Kostenlos · 1 Seite · Ohne Anmeldung" : "Free · 1 page · No signup"}</p>
      </div>
      <SweezyCompanion pose="greeting" className={styles.companion} />
    </div>
  </section>;
}
