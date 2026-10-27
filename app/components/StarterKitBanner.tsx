import Link from "next/link";
import type { Locale } from "../../lib/i18n";
import { firstWeek } from "../../data/first-week";
import { SweezyCompanion } from "./SweezyCompanion";
import styles from "./StarterKit.module.css";
import { DownloadLink } from "./DownloadLink";

export function StarterKitBanner({ locale }: { locale: Locale }) {
  const copy = firstWeek[locale];
  return <section className={styles.banner} aria-label={copy.badge}>
    <div className={styles.bannerInner}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{copy.badge}</p>
        <h2 className={styles.title}>{copy.title}</h2>
        <p className={styles.intro}>{copy.intro}</p>
        <div className={styles.actions}>
          <DownloadLink asset="first-week" locale={locale} placement="starter-kit-banner" className={styles.button}>{copy.download}<span aria-hidden>↓</span></DownloadLink>
          <Link href={`/${locale}/starter-kit`} className={styles.secondary}>{copy.open}<span aria-hidden>→</span></Link>
        </div>
        <p className={styles.downloadNote}>{locale === "uk" ? "Безкоштовно · 5 сторінок · Без реєстрації" : locale === "de" ? "Kostenlos · 5 Seiten · Ohne Anmeldung" : "Free · 5 pages · No signup"}</p>
      </div>
      <SweezyCompanion locale={locale} pose="download" className={styles.companion} />
    </div>
  </section>;
}
