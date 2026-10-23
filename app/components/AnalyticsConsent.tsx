"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { consentChoice, setConsent } from "../../lib/analytics-client";
import { CONSENT_EVENT } from "../../lib/analytics";
import styles from "./AnalyticsConsent.module.css";

export function AnalyticsConsent() {
  const locale = usePathname()?.split("/")[1];
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const c = locale === "uk" ? { title: "Допоможете зробити Sweezy кращим?", body: "За вашою згодою вимірюємо відвідування, отримання PDF і переходи. Без рекламних трекерів. Відмова не обмежує сайт.", yes: "Дозволити аналітику", no: "Відмовитися", settings: "Налаштування аналітики", privacy: "Конфіденційність" } : locale === "de" ? { title: "Hilfst du uns, Sweezy zu verbessern?", body: "Mit deiner Zustimmung messen wir Besuche, empfangene PDFs und Link-Klicks. Ohne Werbetracker. Alle Funktionen bleiben auch ohne Zustimmung verfügbar.", yes: "Analyse erlauben", no: "Ablehnen", settings: "Analyse-Einstellungen", privacy: "Datenschutz" } : { title: "Help us make Sweezy better?", body: "With your permission, we measure visits, received PDFs and link clicks. No advertising trackers. Declining keeps every feature available.", yes: "Allow analytics", no: "Decline", settings: "Analytics settings", privacy: "Privacy" };
  useEffect(() => {
    setReady(true);
    setOpen(consentChoice() === null);
    const update = () => setOpen(consentChoice() === null);
    window.addEventListener(CONSENT_EVENT, update);
    return () => window.removeEventListener(CONSENT_EVENT, update);
  }, []);
  if (!ready) return null;
  return <>
    <button className={styles.settings} type="button" onClick={() => setOpen(true)}>{c.settings}</button>
    {open && <section className={styles.panel} role="region" aria-label={c.settings}>
      <strong>{c.title}</strong><p>{c.body}</p>
      <div><button type="button" onClick={() => { setConsent("declined"); setOpen(false); }}>{c.no}</button><button type="button" onClick={() => { setConsent("accepted"); setOpen(false); }}>{c.yes}</button></div>
      <Link href="/privacy">{c.privacy} →</Link>
    </section>}
  </>;
}
