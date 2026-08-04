"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLocale } from "../../lib/locale-context";
import { localeLabels, type Locale } from "../../lib/i18n";
import styles from "./LegalPageShell.module.css";

type LegalDocument = "privacy" | "terms" | "cookies";

const DOCUMENTS: Array<{ key: LegalDocument; number: string; label: string }> = [
  { key: "privacy", number: "01", label: "Privacy" },
  { key: "terms", number: "02", label: "Terms" },
  { key: "cookies", number: "03", label: "Cookies" },
];

type LegalPageShellProps = {
  document: LegalDocument;
  label: string;
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

export function LegalPageShell({
  document,
  label,
  title,
  lastUpdated,
  children,
}: LegalPageShellProps) {
  const { locale, setLocale } = useLocale();
  const activeIndex = DOCUMENTS.findIndex((item) => item.key === document);

  return (
    <main className={styles.page}>
      <article className={styles.frame}>
        <header className={styles.hero}>
          <div className={styles.heroTopline}>
            <span>{label}</span>
            <span>LEGAL / {String(activeIndex + 1).padStart(2, "0")}</span>
          </div>
          <div className={styles.heroMain}>
            <h1>{title}</h1>
            <p>{lastUpdated}</p>
          </div>
          <div className={styles.route} aria-hidden="true">
            {DOCUMENTS.map((item, index) => (
              <span key={item.key} data-active={index <= activeIndex} />
            ))}
          </div>
        </header>

        <div className={styles.workspace}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarBlock}>
              <p className={styles.sidebarLabel}>LEGAL INDEX</p>
              <nav className={styles.index} aria-label="Legal pages">
                {DOCUMENTS.map((item) => (
                  <Link
                    key={item.key}
                    href={`/${item.key}`}
                    aria-current={item.key === document ? "page" : undefined}
                  >
                    <span>{item.number}</span>
                    <strong>{item.label}</strong>
                    <i aria-hidden="true">↗</i>
                  </Link>
                ))}
              </nav>
            </div>

            <div className={styles.sidebarBlock}>
              <p className={styles.sidebarLabel}>LANGUAGE</p>
              <div className={styles.languages} aria-label="Document language">
                {(Object.keys(localeLabels) as Locale[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setLocale(item)}
                    aria-pressed={locale === item}
                  >
                    {item === "uk" ? "UA" : localeLabels[item]}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.help}>
              <span>QUESTION?</span>
              <a href="mailto:support@sweezy.world">support@sweezy.world ↗</a>
            </div>
          </aside>

          <div className={styles.document}>{children}</div>
        </div>
      </article>
    </main>
  );
}
