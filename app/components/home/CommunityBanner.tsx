import Link from "next/link";
import type { Locale } from "../../../lib/i18n";
import { FACEBOOK_COMMUNITY_URL, TELEGRAM_URL } from "../../../lib/links";
import styles from "./landing.module.css";

const COPY = {
  en: {
    eyebrow: "SWEEZY COMMUNITY · ONLINE",
    title: "Questions move faster when people answer.",
    body: "Join Sweezy newcomers and Ukrainians in Switzerland. Follow updates, exchange practical experience and stay connected beyond the app.",
    telegram: "Join Telegram",
    facebook: "Join Facebook group",
    details: "Explore community",
  },
  uk: {
    eyebrow: "СПІЛЬНОТА SWEEZY · ONLINE",
    title: "Питання вирішуються швидше разом.",
    body: "Приєднуйтесь до українців і новоприбулих у Швейцарії. Стежте за оновленнями, обмінюйтеся практичним досвідом і залишайтеся на зв’язку поза застосунком.",
    telegram: "Перейти в Telegram",
    facebook: "Відкрити Facebook-групу",
    details: "Про спільноту",
  },
  de: {
    eyebrow: "SWEEZY COMMUNITY · ONLINE",
    title: "Gemeinsam werden Fragen schneller klar.",
    body: "Vernetzen Sie sich mit Neuankömmlingen und Menschen aus der Ukraine in der Schweiz. Folgen Sie Updates und teilen Sie praktische Erfahrungen.",
    telegram: "Telegram öffnen",
    facebook: "Facebook-Gruppe öffnen",
    details: "Community entdecken",
  },
} as const;

export function CommunityBanner({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  return (
    <section className={styles.communityBanner} aria-labelledby="community-banner-title">
      <div className={styles.communityBannerCopy}>
        <p>{copy.eyebrow}</p>
        <h2 id="community-banner-title">{copy.title}</h2>
        <span>{copy.body}</span>
        <Link href={`/${locale}/community`}>{copy.details} ↗</Link>
      </div>
      <div className={styles.communityBannerLinks}>
        <a href={TELEGRAM_URL} target="_blank" rel="noreferrer noopener"><small>01 · TELEGRAM</small><strong>{copy.telegram}</strong><b>↗</b></a>
        <a href={FACEBOOK_COMMUNITY_URL} target="_blank" rel="noreferrer noopener"><small>02 · FACEBOOK</small><strong>{copy.facebook}</strong><b>↗</b></a>
      </div>
    </section>
  );
}
