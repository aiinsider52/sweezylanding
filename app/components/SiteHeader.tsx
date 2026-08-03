"use client";

import Image from "next/image";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { APP_STORE_URL } from "../../lib/links";
import type { Locale } from "../../lib/i18n";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./SiteHeader.module.css";

const LABELS = {
  en: { home: "Home", guides: "Guides", places: "Places", jobs: "Jobs", blog: "Blog", app: "Get app", menu: "Open menu", close: "Close menu" },
  uk: { home: "Головна", guides: "Гіди", places: "Місця", jobs: "Робота", blog: "Блог", app: "Завантажити", menu: "Відкрити меню", close: "Закрити меню" },
  de: { home: "Start", guides: "Guides", places: "Orte", jobs: "Jobs", blog: "Blog", app: "App laden", menu: "Menü öffnen", close: "Menü schließen" },
} as const;

function localeFromPath(pathname: string): Locale {
  if (pathname.startsWith("/uk")) return "uk";
  if (pathname.startsWith("/de")) return "de";
  return "en";
}

export function SiteHeader() {
  const pathname = usePathname() || "/en";
  const locale = localeFromPath(pathname);
  const copy = LABELS[locale];
  const [open, setOpen] = useState(false);
  const links = [
    [`/${locale}`, copy.home],
    [`/${locale}/guides`, copy.guides],
    [`/${locale}/places`, copy.places],
    [`/${locale}/jobs`, copy.jobs],
    [`/${locale}/blog`, copy.blog],
  ] as const;

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href={`/${locale}`} className={styles.brand} aria-label="Sweezy home">
          <Image src="/brand/sweezy-mark.svg" alt="" width={34} height={34} priority />
          <span>Sweezy</span>
        </Link>
        <nav className={styles.nav} aria-label="Primary navigation">
          {links.map(([href, label]) => <Link key={href} href={href} data-active={pathname === href || (href !== `/${locale}` && pathname.startsWith(`${href}/`))}>{label}</Link>)}
        </nav>
        <div className={styles.actions}>
          <div className={styles.languages} aria-label="Language">
            {(["en", "uk", "de"] as const).map((item) => <Link key={item} href={`/${item}`} aria-current={item === locale ? "page" : undefined}>{item === "uk" ? "UA" : item.toUpperCase()}</Link>)}
          </div>
          <ThemeToggle />
          <a className={styles.app} href={APP_STORE_URL} target="_blank" rel="noreferrer noopener">{copy.app}</a>
          <button className={styles.menu} type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? copy.close : copy.menu} aria-expanded={open} aria-controls="site-mobile-menu">
            {open ? <X size={22} weight="bold" aria-hidden /> : <List size={22} weight="bold" aria-hidden />}
          </button>
        </div>
        {open ? <nav id="site-mobile-menu" className={styles.mobile} aria-label="Mobile navigation">{links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}<a href={APP_STORE_URL} target="_blank" rel="noreferrer noopener">{copy.app} ↗</a></nav> : null}
      </div>
    </header>
  );
}
