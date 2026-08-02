"use client";

import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./ThemeToggle";
import { useLocale } from "../../lib/locale-context";

export function ContentTopBar() {
  const { locale } = useLocale();

  const labels = {
    en: { home: "Home", guides: "Guides", places: "Places", blog: "Blog" },
    uk: { home: "Головна", guides: "Гіди", places: "Місця", blog: "Блог" },
    de: { home: "Startseite", guides: "Guides", places: "Orte", blog: "Blog" },
  } as const;

  const l = labels[locale] ?? labels.en;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/15 bg-[#0c0f0d]/95 text-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-3 sm:px-6">
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
            <BrandLogo variant="mark" className="h-6 w-6 object-cover" />
          </div>
          <span className="text-base font-bold tracking-tight text-white">Sweezy</span>
        </Link>

        <nav className="hidden items-center rounded-full border border-white/10 bg-white/[0.04] p-1 text-sm sm:flex">
          <Link
            href={`/${locale}`}
            className="rounded-full px-4 py-2 text-white/55 transition-colors hover:bg-white/[0.07] hover:text-white"
          >
            {l.home}
          </Link>
          <Link
            href={`/${locale}/guides`}
            className="rounded-full px-4 py-2 text-white/55 transition-colors hover:bg-[#82c8ff] hover:text-black"
          >
            {l.guides}
          </Link>
          <Link
            href={`/${locale}/places`}
            className="rounded-full px-4 py-2 text-white/55 transition-colors hover:bg-[#adff00] hover:text-black"
          >
            {l.places}
          </Link>
          <Link
            href={`/${locale}/blog`}
            className="rounded-full px-4 py-2 text-white/55 transition-colors hover:bg-[#adff00] hover:text-black"
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
