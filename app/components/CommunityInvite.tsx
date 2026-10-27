import Link from "next/link";
import type { Locale } from "../../lib/i18n";
import { FACEBOOK_COMMUNITY_URL, TELEGRAM_URL } from "../../lib/links";
import styles from "./CommunityInvite.module.css";

const COPY = {
  uk: {
    eyebrow: "SWEEZY / ЗНАЙДИ СВОЇХ", title: "Залишаймося на зв’язку.",
    general: "Продовжуйте знайомство зі Sweezy у Telegram та Facebook: оновлення проєкту, корисні матеріали й досвід спільноти.",
    services: "Поруч із контактами важливий досвід людей. Долучайтеся до спільноти Sweezy та стежте за новими матеріалами й добірками.",
    business: "Будувати свою справу легше, коли є з ким обмінятися досвідом. Залишайтеся поруч зі спільнотою Sweezy.",
    scope: "Нинішній фокус наших спільнот — Швейцарія.", telegram: "Відкрити Telegram", facebook: "Facebook-група", details: "Про нашу спільноту",
  },
  en: {
    eyebrow: "SWEEZY / FIND YOUR PEOPLE", title: "Let’s stay connected.",
    general: "Keep in touch with Sweezy on Telegram and Facebook for product updates, useful guides and community experience.",
    services: "People’s experience matters alongside contact details. Join the Sweezy community and follow new guides and local selections.",
    business: "Building a business is easier when you can exchange experiences. Stay connected with the Sweezy community.",
    scope: "Our current community spaces focus on Switzerland.", telegram: "Open Telegram", facebook: "Facebook group", details: "About our community",
  },
  de: {
    eyebrow: "SWEEZY / FINDE DEINE COMMUNITY", title: "Bleiben wir in Verbindung.",
    general: "Bleibe mit Sweezy auf Telegram und Facebook verbunden: Produktneuigkeiten, hilfreiche Ratgeber und Erfahrungen aus der Community.",
    services: "Neben Kontaktdaten zählen persönliche Erfahrungen. Entdecke die Sweezy Community und neue Ratgeber und lokale Angebote.",
    business: "Beim Aufbau eines Unternehmens hilft der Austausch mit anderen. Bleibe mit der Sweezy Community verbunden.",
    scope: "Unsere bestehenden Community-Angebote konzentrieren sich auf die Schweiz.", telegram: "Telegram öffnen", facebook: "Facebook-Gruppe", details: "Über unsere Community",
  },
};

export function CommunityInvite({ locale, placement, context = "general" }: { locale: Locale; placement: string; context?: "general" | "business" | "services" }) {
  const copy = COPY[locale];
  const heading = `community-${placement}`;
  return <section className={styles.panel} aria-labelledby={heading} data-community-invite={placement}>
    <div className={styles.copy}>
      <p className={styles.eyebrow}>{copy.eyebrow}</p>
      <h2 id={heading}>{copy.title}</h2>
      <p className={styles.body}>{copy[context]}</p>
      <p className={styles.scope}>{copy.scope} <Link href={`/${locale}/community`}>{copy.details} ↗</Link></p>
    </div>
    <div className={styles.actions}>
      <a href={TELEGRAM_URL} className={styles.telegram} target="_blank" rel="noreferrer noopener" data-placement={placement}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m3 10 17-6-3 16-6-5-3 3v-6l8-5-10 5-3-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span>{copy.telegram}</span><span aria-hidden="true">↗</span>
      </a>
      <a href={FACEBOOK_COMMUNITY_URL} className={styles.facebook} target="_blank" rel="noreferrer noopener" data-placement={placement}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 21v-8h3l.5-4H14V7c0-1 .3-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
        <span>{copy.facebook}</span><span aria-hidden="true">↗</span>
      </a>
    </div>
  </section>;
}
