import Link from "next/link";
import type { Locale } from "../../lib/i18n";
import { firstWeek } from "../../data/first-week";
import { SweezyCompanion } from "./SweezyCompanion";
import styles from "./StarterKit.module.css";

export function StarterKitBanner({ locale }: { locale: Locale }) {
  const copy = firstWeek[locale];
  return <section className={styles.banner}>
    <div className={styles.bannerInner}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{copy.badge}</p>
        <h2 className={styles.title}>{copy.title}</h2>
        <p className={styles.intro}>{copy.intro}</p>
        <Link href={`/${locale}/starter-kit`} className={styles.button}>{copy.open}<span aria-hidden>→</span></Link>
      </div>
      <SweezyCompanion pose="greeting" className={styles.companion} />
    </div>
  </section>;
}
