"use client";

import Image from "next/image";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { APP_STORE_URL } from "../../../lib/links";
import type { Locale } from "../../../lib/i18n";
import type { LandingCopy } from "../../../lib/landing-copy";
import styles from "./landing.module.css";

export function LandingNav({ locale, copy }: { locale: Locale; copy: LandingCopy["nav"] }) {
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const links = [
    { href: "#product", label: copy.product },
    { href: "#method", label: copy.method },
    { href: "#stories", label: copy.stories },
    { href: "#faq", label: copy.faq },
  ];

  return (
    <nav className={styles.nav} aria-label="Primary navigation">
      <Link href={`/${locale}`} className={styles.brand} aria-label="Sweezy home">
        <Image src="/brand/sweezy-mark.svg" alt="" width={34} height={34} priority />
        <span>Sweezy</span>
      </Link>

      <div className={styles.desktopLinks}>
        {links.map((link) => (
          <a key={link.href} href={link.href}>{link.label}</a>
        ))}
      </div>

      <div className={styles.navActions}>
        <div className={styles.localeSwitch} aria-label="Language">
          {(["en", "uk", "de"] as const).map((item) => (
            <Link key={item} href={`/${item}`} aria-current={item === locale ? "page" : undefined}>
              {item === "uk" ? "UA" : item.toUpperCase()}
            </Link>
          ))}
        </div>
        <a href={APP_STORE_URL} target="_blank" rel="noreferrer noopener" className={styles.navCta}>
          {copy.app}
        </a>
        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? copy.close : copy.menu}
          aria-expanded={isOpen}
          aria-controls="landing-mobile-menu"
        >
          {isOpen ? <X size={24} weight="bold" aria-hidden /> : <List size={24} weight="bold" aria-hidden />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="landing-mobile-menu"
            className={styles.mobileMenu}
            initial={reduceMotion ? false : { opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}>{link.label}</a>
            ))}
            <Link href={`/${locale}/guides`} onClick={() => setIsOpen(false)}>{copy.guides}</Link>
            <Link href={`/${locale}/blog`} onClick={() => setIsOpen(false)}>{copy.blog}</Link>
            <a href={APP_STORE_URL} target="_blank" rel="noreferrer noopener" className={styles.mobileCta}>
              {copy.app}
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
