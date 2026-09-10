"use client";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "../lib/locale-context";
import styles from "./not-found.module.css";

const copy = {
  uk: { title: "Збилися з маршруту?", body: "Цієї сторінки немає. Але ми знаємо, куди йти далі.", home: "На головну", guides: "Відкрити гіди", places: "Місця", planning: "Планування", community: "Спільнота" },
  en: { title: "Lost your way?", body: "This page does not exist. But we know where to go next.", home: "Back to home", guides: "Explore guides", places: "Places", planning: "Planning", community: "Community" },
  de: { title: "Vom Weg abgekommen?", body: "Diese Seite gibt es nicht. Aber wir wissen, wie es weitergeht.", home: "Zur Startseite", guides: "Guides entdecken", places: "Orte", planning: "Planung", community: "Community" },
};
export default function NotFound() {
  const { locale } = useLocale();
  const c = copy[locale];
  return <main className={styles.page} lang={locale}>
    <Image className={styles.art} src="/brand/companion/not-found.png" alt="404" width={1536} height={1024} sizes="(max-width: 760px) 100vw, 760px" priority />
    <h1>{c.title}</h1><p>{c.body}</p>
    <div className={styles.actions}>
      <Link href={`/${locale}`}>{c.home}<span aria-hidden="true">↗</span></Link>
      <Link href={`/${locale}/guides`}>{c.guides}<span aria-hidden="true">↗</span></Link>
    </div>
    <nav className={styles.links} aria-label={c.guides}>
      <Link href={`/${locale}/places`}>{c.places}</Link>
      <Link href={`/${locale}/planning`}>{c.planning}</Link>
      <Link href={`/${locale}/community`}>{c.community}</Link>
    </nav>
  </main>;
}
