"use client";

import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./ThemeToggle";
import { useLocale } from "../../lib/locale-context";

export function ContentTopBar() {
  const { locale } = useLocale();

  const labels = {
    en: { home: "Home", guides: "Guides", blog: "Blog" },
    uk: { home: "Головна", guides: "Гіди", blog: "Блог" },
    de: { home: "Startseite", guides: "Guides", blog: "Blog" },
  } as const;

  const l = labels[locale] ?? labels.en;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-glass-bg)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-accent-green/15 to-accent-emerald/10 border border-[var(--color-border)]">
            <BrandLogo variant="mark" className="h-6 w-6 object-cover" />
          </div>
          <span className="text-base font-bold tracking-tight text-[var(--color-fg)]">Sweezy</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <Link
            href={`/${locale}`}
            className="text-[var(--color-fg-55)] transition-colors hover:text-accent-green"
          >
            {l.home}
          </Link>
          <Link
            href={`/${locale}/guides`}
            className="text-[var(--color-fg-55)] transition-colors hover:text-accent-green"
          >
            {l.guides}
          </Link>
          <Link
            href={`/${locale}/blog`}
            className="text-[var(--color-fg-55)] transition-colors hover:text-accent-green"
          >
            {l.blog}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
