"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLocale } from "../lib/locale-context";
import { localeLabels, type Locale } from "../lib/i18n";
import { APP_STORE_URL, TELEGRAM_URL } from "../lib/links";
import { LANDING_IMAGES } from "../lib/landing-images";
import { BrandLogo } from "./components/BrandLogo";
import { ThemeToggle } from "./components/ThemeToggle";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ── Reusable Components ─────────────────────────────────────────────── */

function GradientBlob({
  className,
  colors = "from-accent-green/20 via-accent-emerald/10 to-transparent",
}: {
  className?: string;
  colors?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full bg-gradient-to-br ${colors} opacity-20 blur-2xl ${className ?? ""}`}
      style={{ transform: "translateZ(0)" }}
    />
  );
}

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      className="inline-flex items-center gap-2 rounded-full glass-green px-5 py-2 text-sm font-medium text-white/70 mb-6"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent-green animate-pulse" />
      {children}
    </motion.div>
  );
}

function PhoneMockup({
  src,
  alt,
  className = "",
  size = "md",
  glow = true,
}: {
  src: string;
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  glow?: boolean;
}) {
  const sizeClasses = {
    sm: "w-[220px]",
    md: "w-[260px]",
    lg: "w-[300px]",
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`} style={{ perspective: "1200px" }}>
      {glow && (
        <div className="absolute -inset-8 rounded-[4rem] bg-accent-green/[0.07] blur-[60px] animate-pulse-glow" />
      )}

      <div
        className="relative rounded-[3rem] overflow-hidden"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.08) 100%)",
          padding: "6px",
        }}
      >
        <div className="absolute inset-0 rounded-[3rem] opacity-30"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.2) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.1) 100%)",
          }}
        />

        <div className="relative rounded-[2.6rem] overflow-hidden bg-dark-950">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
            <div className="h-[28px] w-[100px] rounded-b-[18px] bg-dark-950 flex items-center justify-center gap-2">
              <div className="w-[8px] h-[8px] rounded-full bg-white/[0.06] ring-1 ring-white/[0.04]" />
            </div>
          </div>

          <img
            src={src}
            alt={alt}
            className="w-full relative z-10"
            loading="lazy"
            draggable={false}
          />

          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: "linear-gradient(125deg, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 70%, rgba(255,255,255,0.03) 100%)",
            }}
          />
        </div>
      </div>

      <div
        className="absolute -left-[1px] top-[120px] w-[3px] h-[28px] rounded-l-sm"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))" }}
      />
      <div
        className="absolute -left-[1px] top-[170px] w-[3px] h-[50px] rounded-l-sm"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))" }}
      />
      <div
        className="absolute -left-[1px] top-[230px] w-[3px] h-[50px] rounded-l-sm"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))" }}
      />
      <div
        className="absolute -right-[1px] top-[180px] w-[3px] h-[65px] rounded-r-sm"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))" }}
      />
    </div>
  );
}

function AppleLogo() {
  return (
    <svg width="20" height="24" viewBox="0 0 814 1000" fill="currentColor">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.5-155.5-127.4c-57.9-81.5-107.6-205.9-107.6-324.8 0-190.8 124.1-292.2 246.1-292.2 64.8 0 118.7 42.5 159.6 42.5 38.9 0 99.4-45.1 173.3-45.1 28 0 128.7 2.6 195.2 98zM554.1 159.4c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 103.5-30.4 135.5-71.3z" />
    </svg>
  );
}

function StarRating() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FBBF24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function GradientDivider() {
  return (
    <div className="mx-auto max-w-7xl px-6" aria-hidden="true">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-green/15 to-transparent" />
    </div>
  );
}

/* ── Icons ───────────────────────────────────────────────────────────── */

function IconGuide() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#ig1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <defs><linearGradient id="ig1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#22C55E" /><stop offset="100%" stopColor="#10B981" /></linearGradient></defs>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /><path d="M8 7h6" /><path d="M8 11h4" />
    </svg>
  );
}

function IconChecklist() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#ig2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <defs><linearGradient id="ig2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10B981" /><stop offset="100%" stopColor="#14B8A6" /></linearGradient></defs>
      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function IconMap() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#ig3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <defs><linearGradient id="ig3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#4ADE80" /><stop offset="100%" stopColor="#22C55E" /></linearGradient></defs>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconMarketplace() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#ig4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <defs><linearGradient id="ig4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#14B8A6" /><stop offset="100%" stopColor="#34D399" /></linearGradient></defs>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function IconCV() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#ig5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <defs><linearGradient id="ig5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#84CC16" /><stop offset="100%" stopColor="#22C55E" /></linearGradient></defs>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function IconLanguage() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#ig6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <defs><linearGradient id="ig6" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#34D399" /><stop offset="100%" stopColor="#10B981" /></linearGradient></defs>
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

/* ── Language Switcher ────────────────────────────────────────────────── */

const LOCALE_PATHS: Record<Locale, string> = { en: "/en", uk: "/uk", de: "/de" };

function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale } = useLocale();
  const locales: Locale[] = ["en", "uk", "de"];

  return (
    <div className={`flex items-center rounded-xl bg-white/[0.04] border border-white/[0.06] p-0.5 ${className}`}>
      {locales.map((l) => (
        <a
          key={l}
          href={LOCALE_PATHS[l]}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300 ${
            locale === l
              ? "bg-gradient-to-r from-accent-green to-accent-emerald text-white shadow-glow-sm"
              : "text-white/40 hover:text-white/70"
          }`}
        >
          {localeLabels[l]}
        </a>
      ))}
    </div>
  );
}

/* ── Navbar ───────────────────────────────────────────────────────────── */

function Navbar() {
  const { t, locale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const resourceLabels = {
    en: { guides: "Guides", blog: "Blog" },
    uk: { guides: "Гіди", blog: "Блог" },
    de: { guides: "Guides", blog: "Blog" },
  } as const;

  const navLinks = [
    { href: "#features", label: t("nav.features") },
    { href: "#how-it-works", label: t("nav.howItWorks") },
    { href: "#screenshots", label: t("nav.screenshots") },
    { href: `/${locale}/guides`, label: resourceLabels[locale].guides },
    { href: `/${locale}/blog`, label: resourceLabels[locale].blog },
    { href: "#faq", label: t("nav.faq") },
  ];

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
      className="fixed top-5 left-0 right-0 z-50 px-4 sm:px-6"
    >
      <div className="mx-auto max-w-6xl nav-float px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-4">
          <a href={`/${locale}`} className="flex items-center gap-2.5 shrink-0">
            <BrandLogo variant="mark" className="h-8 w-8 object-cover rounded-lg" />
            <span className="text-base font-bold tracking-tight">Sweezy</span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.slice(0, 4).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-white/55 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="pill-btn bg-dark-950 text-white text-sm px-5 py-2 border border-white/10 hover:bg-dark-800"
            >
              {t("nav.getApp")}
            </a>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/10"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1">
                <span className={`block h-0.5 w-4 bg-white/80 rounded transition-all ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                <span className={`block h-0.5 w-4 bg-white/80 rounded transition-all ${isOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-4 bg-white/80 rounded transition-all ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="pt-4 pb-1 flex flex-col gap-1 border-t border-white/10 mt-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-white/65 hover:text-white py-2.5 px-1"
                  >
                    {link.label}
                  </a>
                ))}
                <LanguageSwitcher className="mt-2 w-full justify-center" />
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-3 pill-btn-primary w-full text-sm py-3"
                >
                  {t("nav.getApp")}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

/* ── Hero 3D Phone UI ─────────────────────────────────────────────────── */

function Hero3DPhoneUI() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-[#0a1a0f] to-[#081208] flex flex-col overflow-hidden text-white relative">
      {/* Ambient light effect inside phone */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-accent-green/10 blur-[60px]" />
      
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] text-white/50 relative z-10">
        <span className="font-medium">9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" className="opacity-60">
            <path d="M1 4a1 1 0 011-1h1a1 1 0 011 1v6a1 1 0 01-1 1H2a1 1 0 01-1-1V4zM6 2.5a1 1 0 011-1h1a1 1 0 011 1v7.5a1 1 0 01-1 1H7a1 1 0 01-1-1V2.5zM12 1a1 1 0 00-1 1v8a1 1 0 001 1h1a1 1 0 001-1V2a1 1 0 00-1-1h-1z"/>
          </svg>
          <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor" className="opacity-60">
            <path d="M7.5 2C4.5 2 1.9 3.4.3 5.5c-.2.3-.2.7 0 1 1.6 2.1 4.2 3.5 7.2 3.5s5.6-1.4 7.2-3.5c.2-.3.2-.7 0-1C13.1 3.4 10.5 2 7.5 2z"/>
          </svg>
          <div className="w-6 h-3 rounded-[4px] border border-white/30 relative ml-0.5">
            <div className="absolute top-[2px] left-[2px] bottom-[2px] right-[4px] rounded-sm bg-accent-green" />
            <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-1.5 rounded-r-full bg-white/30" />
          </div>
        </div>
      </div>

      {/* Hero card */}
      <div
        className="mx-4 mt-2 rounded-[20px] p-5 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #22C55E 0%, #16A34A 50%, #15803D 100%)" }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
        <div className="absolute bottom-0 left-1/3 w-20 h-20 rounded-full bg-white/5" />
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        </div>
        <p className="text-white font-bold text-xl relative z-10">Привіт!</p>
        <p className="text-white/80 text-sm mt-0.5 relative z-10">Четвер, 19 Березня</p>
        <p className="text-white/60 text-xs mt-3 leading-relaxed relative z-10 max-w-[180px]">Ваш повний гід для успішного життя в Швейцарії</p>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-5">
        <p className="text-white font-bold text-sm mb-3">Швидкі дії</p>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: "CV Builder", color: "#7C3AED", icon: "📄" },
            { label: "Шаблони", color: "#DC2626", icon: "📋" },
            { label: "Карта", color: "#D97706", icon: "🗺️" },
            { label: "Довідник", color: "#2563EB", icon: "📖" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl p-3 flex items-center gap-2.5"
              style={{ background: item.color }}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-white text-[11px] font-semibold flex-1">{item.label}</span>
              <span className="text-white/50 text-xs">→</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended section */}
      <div className="px-4 mt-5">
        <p className="text-white font-bold text-sm mb-3">Рекомендовано</p>
        <div className="rounded-2xl bg-white/[0.06] border border-white/[0.08] p-3.5 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/30 to-purple-600/20 flex items-center justify-center flex-shrink-0">
            <span className="text-xl">🛡️</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[11px] font-semibold leading-tight truncate">Медичне страхування</p>
            <p className="text-white/40 text-[9px] mt-0.5">Franchise, HMO/Telmed...</p>
          </div>
          <span className="text-[9px] text-accent-green font-bold bg-accent-green/15 px-2 py-1 rounded-full flex-shrink-0 border border-accent-green/20">New</span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="mt-auto border-t border-white/[0.06] flex items-center justify-around px-3 py-3 bg-[#0a1a0f]/80 backdrop-blur-xl">
        {[
          { icon: "🏠", label: "Головна", active: true },
          { icon: "📖", label: "Довідник", active: false },
          { icon: "🗺️", label: "Карта", active: false },
          { icon: "🛒", label: "Маркет", active: false },
          { icon: "⚙️", label: "Налашт.", active: false },
        ].map((tab) => (
          <div key={tab.label} className={`flex flex-col items-center gap-0.5 ${tab.active ? "text-accent-green" : "text-white/30"}`}>
            <span className="text-[14px]">{tab.icon}</span>
            <span className="text-[8px] font-medium">{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Floating Elements ────────────────────────────────────────────────── */

function FloatingElement({
  children,
  className = "",
  delay = 0,
  duration = 4,
  y = 15,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
}) {
  // Fade/scale-in on mount via Framer, but the continuous float is pure CSS
  // keyframes so the browser compositor handles it (no JS timeline per item).
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={`floating-el ${className}`}
      style={{
        ["--float-y" as string]: `${y}px`,
        ["--float-d" as string]: `${duration}s`,
        animationDelay: `${delay + 0.5}s`,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Hero Section ────────────────────────────────────────────────────── */

function HeroSection() {
  const { t } = useLocale();

  const stats = [
    { num: t("stats.guidesNum"), label: t("stats.guides") },
    { num: t("stats.cantonsNum"), label: t("stats.cantons") },
    { num: t("stats.languagesNum"), label: t("stats.languages") },
    { num: t("stats.ratingNum"), label: t("stats.rating") },
  ];

  return (
    <>
      <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
        <Image
          src={LANDING_IMAGES.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_28%] photo-grade"
          aria-hidden
        />
        <div className="absolute inset-0 photo-grade-overlay" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/55 via-transparent to-dark-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(6,13,8,0.75),transparent_60%)]" />

        <div className="absolute inset-0 flex items-end justify-center overflow-hidden pointer-events-none" aria-hidden>
          <span className="hero-watermark text-[20vw] sm:text-[15vw] translate-y-[18%]">SWITZERLAND</span>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
          className="hidden lg:block absolute top-[18%] right-[8%] w-[150px] h-[150px] pointer-events-none z-10"
          aria-hidden
        >
          <div className="floating-el relative w-full h-full drop-shadow-[0_20px_50px_rgba(34,197,94,0.35)]" style={{ ["--float-y" as string]: "18px", ["--float-d" as string]: "7s" }}>
            <Image src={LANDING_IMAGES.glossy.heroBadge} alt="" fill sizes="150px" className="object-contain" />
          </div>
        </motion.div>

        <Navbar />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-28 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center max-w-3xl"
          >
            <motion.div variants={fadeUp} className="mb-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-green animate-pulse" />
                {t("hero.badge")}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-[clamp(3rem,8vw,6.5rem)] font-extrabold tracking-[-0.03em] leading-[0.96]"
            >
              {t("hero.title1")}
              <br />
              <span className="font-display italic font-normal text-gradient">{t("hero.title2")}</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="mt-6 text-lg sm:text-xl text-white/60 leading-relaxed max-w-xl font-light">
              {t("hero.subtitle")}
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href={APP_STORE_URL} target="_blank" rel="noreferrer noopener" className="pill-btn-primary gap-3">
                <AppleLogo />
                <span>{t("hero.appStore")}</span>
              </a>
              <a href="#features" className="pill-btn-ghost text-[15px]">
                {t("hero.learnMore")}
                <span aria-hidden>→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="relative z-10 flex justify-center pb-10"
        >
          <a href="#stats" className="flex flex-col items-center gap-2 text-white/45 hover:text-white/80 transition-colors">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em]">Scroll</span>
            <span className="floating-el h-8 w-px bg-white/40" style={{ ["--float-y" as string]: "6px", ["--float-d" as string]: "1.8s" }} />
          </a>
        </motion.div>
      </section>

      <section id="stats" className="relative border-y border-white/[0.06] bg-dark-900/40">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.06]">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="px-4 sm:px-8 py-8 sm:py-10 text-center"
            >
              <p className="text-3xl sm:text-4xl font-bold text-gradient tabular-nums font-display">{stat.num}</p>
              <p className="text-xs sm:text-sm text-white/40 mt-1.5 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ── Stats Section (merged into hero) ────────────────────────────────── */

function StatsSection() {
  return null;
}

/* ── Features Section ────────────────────────────────────────────────── */

function FeaturesSection() {
  const { t } = useLocale();

  const features = [
    { icon: <IconGuide />, image: LANDING_IMAGES.features.guides, title: t("features.f1Title"), description: t("features.f1Desc") },
    { icon: <IconChecklist />, image: LANDING_IMAGES.features.checklists, title: t("features.f2Title"), description: t("features.f2Desc") },
    { icon: <IconMap />, image: LANDING_IMAGES.features.map, title: t("features.f3Title"), description: t("features.f3Desc") },
    { icon: <IconMarketplace />, image: LANDING_IMAGES.features.marketplace, title: t("features.f4Title"), description: t("features.f4Desc") },
    { icon: <IconCV />, image: LANDING_IMAGES.features.cv, title: t("features.f5Title"), description: t("features.f5Desc") },
    { icon: <IconLanguage />, image: LANDING_IMAGES.features.languages, title: t("features.f6Title"), description: t("features.f6Desc") },
  ];

  const bentoSpans = [
    "md:col-span-2 md:row-span-2 min-h-[420px]",
    "min-h-[200px]",
    "min-h-[200px]",
    "md:col-span-2 min-h-[220px]",
    "min-h-[200px]",
    "min-h-[200px]",
  ];

  return (
    <section id="features" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end mb-14"
        >
          <div>
            <motion.p variants={fadeUp} className="editorial-label mb-4">{t("features.badge")}</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05]">
              {t("features.title1")}{" "}
              <span className="font-display italic font-normal text-gradient">{t("features.title2")}</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} custom={2} className="text-lg text-white/45 leading-relaxed lg:pb-2">
            {t("features.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[repeat(3,minmax(0,1fr))] gap-4"
        >
          {features.map((feature, i) => (
            <motion.article
              key={feature.title}
              variants={scaleIn}
              custom={i}
              className={`group bento-card flex flex-col justify-end ${bentoSpans[i]}`}
            >
              <div className="absolute inset-0">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105 photo-grade"
                />
                <div className="absolute inset-0 photo-grade-overlay" aria-hidden />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-dark-950/10" />
              </div>
              <div className="relative z-10 p-6 sm:p-7">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{feature.title}</h3>
                <p className="mt-2 text-sm sm:text-[15px] text-white/55 leading-relaxed max-w-md">
                  {feature.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Interactive Phone Screens ───────────────────────────────────────── */

function HomeScreen() {
  return (
    <div className="w-full h-full bg-[#0f1f14] flex flex-col overflow-hidden text-white">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-2 pb-1 text-[10px] text-white/60">
        <span>13:42</span>
        <div className="flex items-center gap-1">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor" opacity="0.6"><rect x="0" y="2" width="2" height="6" rx="0.5"/><rect x="3" y="1" width="2" height="7" rx="0.5"/><rect x="6" y="0" width="2" height="8" rx="0.5"/><rect x="9" y="0" width="3" height="8" rx="0.5" opacity="0.3"/></svg>
          <svg width="14" height="10" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 8.5C5.5 3.5 18.5 3.5 23 8.5M5 12.5C8.5 9 15.5 9 19 12.5M9 16l3 3 3-3" opacity="0.6"/></svg>
          <div className="w-5 h-3 rounded-sm border border-white/40 relative"><div className="absolute inset-[1px] right-[3px] rounded-sm bg-accent-green/80" /></div>
        </div>
      </div>
      {/* Hero card */}
      <div className="mx-3 mt-1 rounded-2xl bg-gradient-to-br from-accent-green via-[#1a8c3a] to-accent-emerald p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/[0.06] -translate-y-4 translate-x-4" />
        <div className="absolute bottom-0 right-4 w-12 h-12 rounded-full bg-white/[0.04]" />
        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>
        </div>
        <p className="text-white font-bold text-base leading-tight">Привіт!</p>
        <p className="text-white/70 text-[10px] mt-0.5">Четвер, 19 Березня</p>
        <p className="text-white/60 text-[9px] mt-2 leading-relaxed">Ваш повний гід для успішного<br />життя в Швейцарії</p>
      </div>
      {/* Quick actions */}
      <div className="px-3 mt-3">
        <p className="text-white font-bold text-xs mb-2">Швидкі дії</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "CV Builder", color: "bg-[#6B3FA0]", icon: "📄" },
            { label: "Шаблони", color: "bg-[#9B2335]", icon: "📋" },
            { label: "Карта", color: "bg-[#B55A0A]", icon: "🗺️" },
            { label: "Довідник", color: "bg-[#1A5E8A]", icon: "📖" },
          ].map((item) => (
            <div key={item.label} className={`${item.color} rounded-xl p-2.5 flex items-center gap-2`}>
              <span className="text-sm">{item.icon}</span>
              <span className="text-white text-[10px] font-semibold">{item.label}</span>
              <span className="ml-auto text-white/40 text-[10px]">→</span>
            </div>
          ))}
        </div>
      </div>
      {/* Recommended */}
      <div className="px-3 mt-3">
        <p className="text-white font-bold text-xs mb-2">Рекомендований контент</p>
        <div className="rounded-xl bg-white/[0.05] border border-white/[0.06] p-2.5 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center flex-shrink-0">
            <span className="text-sm">🛡️</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[9px] font-medium leading-tight truncate">Медичне страхування</p>
            <p className="text-white/40 text-[8px] mt-0.5 truncate">Franchise, HMO/Telmed...</p>
          </div>
          <span className="text-[8px] text-accent-green font-bold bg-accent-green/10 px-1.5 py-0.5 rounded-full flex-shrink-0">New</span>
        </div>
      </div>
      {/* Tab bar */}
      <div className="mt-auto border-t border-white/[0.06] flex items-center justify-around px-2 py-2">
        {["🏠 Головна","📖 Довідник","🗺️ Карта","🛒 Маркет","⚙️ Налашт."].map((tab, i) => (
          <div key={tab} className={`flex flex-col items-center gap-0.5 ${i === 0 ? "text-accent-green" : "text-white/30"}`}>
            <span className="text-[10px]">{tab.split(" ")[0]}</span>
            <span className="text-[6px] font-medium">{tab.split(" ")[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GuidesScreen() {
  return (
    <div className="w-full h-full bg-[#0f1f14] flex flex-col overflow-hidden text-white">
      <div className="flex items-center justify-between px-5 pt-2 pb-1 text-[10px] text-white/60">
        <span>13:42</span>
        <div className="flex items-center gap-1">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor" opacity="0.6"><rect x="0" y="2" width="2" height="6" rx="0.5"/><rect x="3" y="1" width="2" height="7" rx="0.5"/><rect x="6" y="0" width="2" height="8" rx="0.5"/></svg>
          <div className="w-5 h-3 rounded-sm border border-white/40 relative"><div className="absolute inset-[1px] right-[3px] rounded-sm bg-accent-green/80" /></div>
        </div>
      </div>
      <div className="px-4 pt-2 pb-3">
        <p className="text-white font-bold text-lg mb-3">Довідник</p>
        <div className="flex items-center gap-2 rounded-xl bg-white/[0.06] border border-white/[0.06] px-3 py-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span className="text-[10px] text-white/25">Пошук інформації...</span>
        </div>
        <div className="flex gap-3 mt-3 border-b border-white/[0.06] pb-2">
          <div className="flex items-center gap-1 border-b-2 border-accent-green pb-1">
            <span className="text-[10px]">📖</span>
            <span className="text-[10px] text-accent-green font-semibold">Гайди</span>
            <span className="text-[8px]">❄️</span>
          </div>
          <div className="flex items-center gap-1 text-white/30">
            <span className="text-[10px]">☑️</span>
            <span className="text-[10px]">Чек-листи</span>
          </div>
        </div>
        <div className="flex gap-1.5 mt-2 overflow-hidden">
          {["Всі","📄 Документи","🏠 Житло","🛡️ Стра..."].map((cat, i) => (
            <span key={cat} className={`text-[8px] px-2 py-0.5 rounded-full whitespace-nowrap font-medium ${i === 0 ? "bg-accent-green text-dark-950" : "bg-white/[0.06] text-white/50"}`}>{cat}</span>
          ))}
        </div>
      </div>
      <div className="px-4 space-y-2 flex-1">
        <div className="rounded-xl bg-[#8B2FC9] p-3 relative">
          <span className="text-[7px] text-white/80 bg-white/20 px-1.5 py-0.5 rounded-full">Рекомендовано</span>
          <p className="text-white text-[10px] font-bold mt-1 leading-tight">Медичне страхування: вибір полісу без паніки</p>
          <p className="text-white/60 text-[8px] mt-1">Franchise, HMO/Telmed, субсидії та типові помилки</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[7px] text-white/50">⏱ 8 хв</span>
            <span className="text-[7px] text-white/50">📁 Страхування</span>
          </div>
        </div>
        {[
          { title: "Медичне страхування", emoji: "🛡️", color: "#6B3FA0" },
          { title: "Як отримати медичне страхування", emoji: "💊", color: "#6B3FA0" },
        ].map((item) => (
          <div key={item.title} className="rounded-xl bg-white/[0.04] border border-white/[0.05] p-2.5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: item.color }}>
              <span className="text-sm">{item.emoji}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[9px] font-semibold leading-tight truncate">{item.title}</p>
              <p className="text-white/40 text-[7px] mt-0.5">Обов'язкове базове страхування...</p>
              <span className="text-[6px] text-accent-green font-bold bg-accent-green/10 px-1 py-0.5 rounded-full">New</span>
            </div>
            <span className="text-white/20 text-xs">›</span>
          </div>
        ))}
      </div>
      <div className="mt-auto border-t border-white/[0.06] flex items-center justify-around px-2 py-2">
        {["🏠","📖","🗺️","🛒","⚙️"].map((tab, i) => (
          <div key={tab} className={`flex flex-col items-center ${i === 1 ? "text-accent-green" : "text-white/30"}`}>
            <span className="text-[12px]">{tab}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MapScreen() {
  return (
    <div className="w-full h-full bg-[#0f1f14] flex flex-col overflow-hidden text-white">
      <div className="flex items-center justify-between px-5 pt-2 pb-1 text-[10px] text-white/60">
        <span>13:42</span>
        <div className="w-5 h-3 rounded-sm border border-white/40 relative"><div className="absolute inset-[1px] right-[3px] rounded-sm bg-accent-green/80" /></div>
      </div>
      <div className="px-4 pt-2">
        <p className="text-white font-bold text-base mb-2">Карта сервісів</p>
        <div className="flex gap-1.5 mb-2 overflow-hidden">
          {["📍 Поруч (10 км)","🇨🇭 Вся Швейцарія","✨ Всі"].map((f, i) => (
            <span key={f} className={`text-[7px] px-2 py-0.5 rounded-full whitespace-nowrap ${i === 2 ? "bg-accent-green text-dark-950 font-bold" : "bg-white/[0.06] text-white/40"}`}>{f}</span>
          ))}
        </div>
      </div>
      {/* Stylized map */}
      <div className="mx-4 rounded-2xl overflow-hidden relative" style={{ height: 110 }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a3a1a 0%, #0d2a0d 40%, #152e15 100%)" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2322C55E' fill-opacity='0.15'%3E%3Crect x='0' y='9' width='20' height='1'/%3E%3Crect x='9' y='0' width='1' height='20'/%3E%3C/g%3E%3C/svg%3E\")" }} />
          {[
            { x: 30, y: 35, color: "#F59E0B", size: 16 },
            { x: 55, y: 55, color: "#22C55E", size: 22 },
            { x: 75, y: 30, color: "#3B82F6", size: 14 },
            { x: 45, y: 75, color: "#EF4444", size: 16 },
            { x: 20, y: 65, color: "#8B5CF6", size: 12 },
            { x: 85, y: 65, color: "#F59E0B", size: 14 },
          ].map((dot, i) => (
            <div key={i} className="absolute rounded-full flex items-center justify-center text-white font-bold"
              style={{ left: `${dot.x}%`, top: `${dot.y}%`, width: dot.size, height: dot.size, background: dot.color, fontSize: 7, transform: "translate(-50%,-50%)" }}>
              {i === 1 ? "🏛" : ""}
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 mt-3 flex-1 overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <p className="text-white text-xs font-semibold">Поруч з вами</p>
          <span className="text-[8px] text-white/40 bg-white/[0.06] px-1.5 py-0.5 rounded-full">ⓘ 79</span>
        </div>
        {[
          { name: "Migrationsamt Zürich", type: "Державні установи", color: "#3B82F6", open: true },
          { name: "Universitätsspital Zürich", type: "Медицина", color: "#EF4444", open: true },
          { name: "Gemeinde Zürich", type: "Державні установи", color: "#3B82F6", open: true },
        ].map((place) => (
          <div key={place.name} className="rounded-xl bg-white/[0.04] border border-white/[0.05] p-2 flex items-center gap-2 mb-1.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: place.color + "22" }}>
              <span className="text-sm">🏛</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[9px] font-medium truncate">{place.name}</p>
              <p className="text-white/40 text-[7px]">{place.type}</p>
              <p className="text-accent-green text-[7px] font-medium">● Відчинено</p>
            </div>
            <div className="w-5 h-5 rounded-full bg-accent-teal/20 flex items-center justify-center">
              <span className="text-[8px]">↗</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto border-t border-white/[0.06] flex items-center justify-around px-2 py-2">
        {["🏠","📖","🗺️","🛒","⚙️"].map((tab, i) => (
          <div key={tab} className={i === 2 ? "text-accent-green" : "text-white/30"}>
            <span className="text-[12px]">{tab}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarketScreen() {
  return (
    <div className="w-full h-full bg-[#0f1f14] flex flex-col overflow-hidden text-white">
      <div className="flex items-center justify-between px-5 pt-2 pb-1 text-[10px] text-white/60">
        <span>13:42</span>
        <div className="w-5 h-3 rounded-sm border border-white/40 relative"><div className="absolute inset-[1px] right-[3px] rounded-sm bg-accent-green/80" /></div>
      </div>
      <div className="px-4 pt-2">
        <p className="text-white font-bold text-base mb-1">Маркетплейс</p>
        <p className="text-white/40 text-[9px] mb-3">Перевірені партнери для експатів</p>
        <div className="flex gap-1.5 mb-3">
          {["Всі","🛡️ Страхування","💼 Праця","🏠 Житло"].map((cat, i) => (
            <span key={cat} className={`text-[7px] px-2 py-0.5 rounded-full whitespace-nowrap ${i === 0 ? "bg-accent-green text-dark-950 font-bold" : "bg-white/[0.06] text-white/40"}`}>{cat}</span>
          ))}
        </div>
      </div>
      <div className="px-4 space-y-2 flex-1 overflow-hidden">
        {[
          { name: "Swiss Insurance Pro", rating: "4.9", reviews: "128", tag: "Страхування", color: "#6B3FA0", emoji: "🛡️", badge: "Топ" },
          { name: "Expat Tax Consultants", rating: "4.8", reviews: "94", tag: "Податки", color: "#1A5E8A", emoji: "📊", badge: "Новий" },
          { name: "Zürich Relocation Help", rating: "5.0", reviews: "57", tag: "Переїзд", color: "#B55A0A", emoji: "📦", badge: null },
        ].map((item) => (
          <div key={item.name} className="rounded-xl bg-white/[0.04] border border-white/[0.05] p-3">
            <div className="flex items-start gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: item.color + "33" }}>
                <span className="text-base">{item.emoji}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <p className="text-white text-[9px] font-semibold truncate">{item.name}</p>
                  {item.badge && <span className="text-[6px] bg-accent-green/20 text-accent-green px-1 py-0.5 rounded-full">{item.badge}</span>}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-amber-400 text-[8px]">★</span>
                  <span className="text-white/70 text-[8px]">{item.rating}</span>
                  <span className="text-white/30 text-[8px]">({item.reviews})</span>
                  <span className="text-white/20 text-[8px]">·</span>
                  <span className="text-white/40 text-[7px]">{item.tag}</span>
                </div>
              </div>
              <button className="text-[8px] bg-accent-green text-dark-950 font-bold px-2 py-1 rounded-lg">→</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto border-t border-white/[0.06] flex items-center justify-around px-2 py-2">
        {["🏠","📖","🗺️","🛒","⚙️"].map((tab, i) => (
          <div key={tab} className={i === 3 ? "text-accent-green" : "text-white/30"}>
            <span className="text-[12px]">{tab}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CVBuilderScreen() {
  return (
    <div className="w-full h-full bg-[#0f1f14] flex flex-col overflow-hidden text-white">
      <div className="flex items-center justify-between px-5 pt-2 pb-1 text-[10px] text-white/60">
        <span>13:42</span>
        <div className="w-5 h-3 rounded-sm border border-white/40 relative"><div className="absolute inset-[1px] right-[3px] rounded-sm bg-accent-green/80" /></div>
      </div>
      <div className="px-4 pt-2">
        <p className="text-white font-bold text-base">CV Builder</p>
        <p className="text-white/40 text-[9px] mt-0.5 mb-3">Швейцарський формат</p>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-accent-green to-accent-emerald" style={{ width: "65%" }} />
          </div>
          <span className="text-[9px] text-accent-green font-bold">65%</span>
        </div>
      </div>
      <div className="px-4 space-y-2 flex-1 overflow-hidden">
        <div className="rounded-xl bg-white/[0.04] border border-accent-green/20 p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-green/30 to-accent-emerald/20 flex items-center justify-center">
              <span className="text-base">👤</span>
            </div>
            <div>
              <p className="text-white text-[10px] font-semibold">Марія Коваленко</p>
              <p className="text-accent-green text-[8px]">UX Designer</p>
            </div>
            <div className="ml-auto w-5 h-5 rounded-full bg-accent-green flex items-center justify-center">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#0f1f14" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
          </div>
        </div>
        {[
          { section: "Досвід роботи", items: ["Senior UX Designer · 2022–наш.", "Product Designer · 2019–2022"], done: true },
          { section: "Освіта", items: ["КНУ · Бакалавр Design · 2019"], done: true },
          { section: "Навички", items: ["Figma  •  React  •  Prototyping"], done: false },
        ].map((block) => (
          <div key={block.section} className="rounded-xl bg-white/[0.04] border border-white/[0.05] p-2.5">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-white text-[9px] font-semibold">{block.section}</p>
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${block.done ? "bg-accent-green" : "bg-white/10 border border-white/20"}`}>
                {block.done && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#0f1f14" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
              </div>
            </div>
            {block.items.map((it) => (
              <p key={it} className="text-white/40 text-[7px] leading-relaxed">{it}</p>
            ))}
          </div>
        ))}
      </div>
      <div className="px-4 pb-3 mt-2">
        <button className="w-full rounded-xl bg-gradient-to-r from-accent-green to-accent-emerald py-2 text-[9px] font-bold text-dark-950">
          Завантажити PDF →
        </button>
      </div>
    </div>
  );
}

/* ── App Showcase Section ────────────────────────────────────────────── */

function AppShowcaseSection() {
  const { t } = useLocale();
  const [activeTab, setActiveTab] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const tabs = [
    { id: 0, label: t("appShowcase.screen1Label"), icon: "🏠", color: "#22C55E", desc: "Привітальний екран з швидкими діями, CV Builder, Картою та Довідником." },
    { id: 1, label: t("appShowcase.screen2Label"), icon: "📖", color: "#8B5CF6", desc: "Бібліотека гайдів та чек-листів з пошуком і категоріями." },
    { id: 2, label: t("appShowcase.screen3Label"), icon: "🗺️", color: "#14B8A6", desc: "Інтерактивна карта з держустановами, лікарнями та банками поруч." },
    { id: 3, label: "Marketplace", icon: "🛒", color: "#F59E0B", desc: "Перевірені постачальники послуг — від страхування до переїзду." },
    { id: 4, label: "CV Builder", icon: "📄", color: "#10B981", desc: "Конструктор CV у швейцарському форматі з прогресом і PDF-експортом." },
  ];

  const screens = [HomeScreen, GuidesScreen, MapScreen, MarketScreen, CVBuilderScreen];
  const ActiveScreen = screens[activeTab];

  // Track visibility so the autoplay timer only runs when section is onscreen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (isHovered || !isVisible) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered, isVisible, tabs.length]);

  return (
    <section ref={sectionRef} id="screenshots" className="relative py-32 sm:py-40 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="h-[560px] w-[560px] rounded-full bg-accent-green/[0.05] blur-[60px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end mb-16 sm:mb-20"
        >
          <div>
            <motion.p variants={fadeUp} className="editorial-label mb-4">{t("appShowcase.badge")}</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05]">
              {t("appShowcase.title1")}{" "}
              <span className="font-display italic font-normal text-gradient">{t("appShowcase.title2")}</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} custom={2} className="text-lg text-white/45 leading-relaxed">
            {t("appShowcase.subtitle")}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: tabs + description */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col gap-3"
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsHovered(true); }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`relative w-full text-left rounded-2xl px-5 py-4 transition-all duration-300 border overflow-hidden ${
                  activeTab === tab.id
                    ? "border-accent-green/30 bg-accent-green/[0.05]"
                    : "border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04]"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tabHighlight"
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: `linear-gradient(120deg, ${tab.color}08, transparent)` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative flex items-center gap-4">
                  <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-lg transition-all duration-300"
                    style={{ background: activeTab === tab.id ? `${tab.color}22` : "rgba(255,255,255,0.04)" }}
                  >
                    {tab.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold transition-colors duration-300 ${activeTab === tab.id ? "text-white" : "text-white/50"}`}>
                      {tab.label}
                    </p>
                    <AnimatePresence mode="wait">
                      {activeTab === tab.id && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-[13px] text-white/40 leading-relaxed mt-1"
                        >
                          {tab.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300"
                    style={{ background: activeTab === tab.id ? tab.color : "rgba(255,255,255,0.08)" }}
                  />
                </div>
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] rounded-full"
                    style={{ background: `linear-gradient(90deg, ${tab.color}, transparent)` }}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "linear" }}
                    key={`${activeTab}-progress`}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Right: Phone */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex justify-center lg:justify-end"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative" style={{ perspective: "1200px" }}>
              {/* Ambient glow — static, no background animation */}
              <div
                className="absolute -inset-16 rounded-full blur-[60px] transition-opacity duration-700"
                style={{ background: `radial-gradient(circle, ${tabs[activeTab].color}20 0%, transparent 70%)` }}
              />

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  whileHover={{ rotateY: -4, rotateX: 2, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Phone frame */}
                  <div
                    className="relative rounded-[3.2rem] overflow-visible"
                    style={{
                      background: "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.10) 100%)",
                      padding: "6px",
                      width: 280,
                    }}
                  >
                    {/* Metal highlight */}
                    <div className="absolute inset-0 rounded-[3.2rem] pointer-events-none"
                      style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.18) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.08) 100%)" }}
                    />
                    {/* Buttons */}
                    <div className="absolute -left-[3px] top-[120px] w-[3px] h-[26px] rounded-l-sm" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))" }} />
                    <div className="absolute -left-[3px] top-[158px] w-[3px] h-[44px] rounded-l-sm" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))" }} />
                    <div className="absolute -left-[3px] top-[212px] w-[3px] h-[44px] rounded-l-sm" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))" }} />
                    <div className="absolute -right-[3px] top-[170px] w-[3px] h-[60px] rounded-r-sm" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))" }} />

                    {/* Screen */}
                    <div className="rounded-[2.8rem] overflow-hidden bg-dark-950 relative" style={{ height: 570 }}>
                      {/* Dynamic island */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30">
                        <div className="h-[26px] w-[90px] rounded-b-[16px] bg-dark-950 flex items-center justify-center gap-2 pt-1">
                          <div className="w-[8px] h-[8px] rounded-full bg-white/[0.07]" />
                        </div>
                      </div>

                      {/* Screen content with animated transitions */}
                      <div className="w-full h-full relative overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.98 }}
                            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                            className="absolute inset-0"
                          >
                            <ActiveScreen />
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Screen glass glare */}
                      <div className="absolute inset-0 pointer-events-none rounded-[2.8rem]"
                        style={{ background: "linear-gradient(125deg, rgba(255,255,255,0.07) 0%, transparent 40%, transparent 70%, rgba(255,255,255,0.03) 100%)" }}
                      />
                    </div>
                  </div>

                  {/* Phone shadow */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[55%] h-[16px] rounded-[50%] blur-xl"
                    style={{ background: `${tabs[activeTab].color}30` }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── What's New Section ───────────────────────────────────────────────── */

function WhatsNewSection() {
  const { t } = useLocale();

  const cards = [
    {
      title: t("whatsNew.card1Title"),
      description: t("whatsNew.card1Desc"),
      icon: LANDING_IMAGES.glossy.iconLaunch,
      glow: "from-accent-green/20 via-accent-emerald/10 to-transparent",
    },
    {
      title: t("whatsNew.card2Title"),
      description: t("whatsNew.card2Desc"),
      icon: LANDING_IMAGES.glossy.iconCart,
      glow: "from-amber-400/15 via-accent-green/10 to-transparent",
    },
    {
      title: t("whatsNew.card3Title"),
      description: t("whatsNew.card3Desc"),
      icon: LANDING_IMAGES.glossy.iconGear,
      glow: "from-teal-400/15 via-accent-emerald/10 to-transparent",
    },
  ];

  return (
    <section id="whats-new" className="relative py-28 sm:py-36 overflow-hidden cv-auto section-mesh">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end mb-12"
        >
          <div>
            <motion.p variants={fadeUp} className="editorial-label mb-4">{t("whatsNew.badge")}</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05]">
              {t("whatsNew.title1")}{" "}
              <span className="font-display italic font-normal text-gradient">{t("whatsNew.title2")}</span>
            </motion.h2>
          </div>
          <motion.div variants={fadeUp} custom={2} className="nav-float p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full bg-accent-green/15 px-3 py-1 text-xs font-semibold text-accent-green">
                {t("whatsNew.releaseLabel")}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-white/30">{t("whatsNew.releaseValue")}</span>
            </div>
            <p className="mt-4 text-[15px] leading-7 text-white/55">{t("whatsNew.lead")}</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid gap-4 lg:grid-cols-3"
        >
          {cards.map((card, i) => (
            <motion.article key={card.title} variants={scaleIn} custom={i} className="bento-card p-7 sm:p-8 group">
              <div className={`absolute inset-0 bg-gradient-to-br ${card.glow} opacity-50 group-hover:opacity-80 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="relative h-14 w-14 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                  <Image src={card.icon} alt="" fill sizes="56px" className="object-contain drop-shadow-[0_8px_20px_rgba(34,197,94,0.25)]" />
                </div>
                <h3 className="mt-5 text-xl sm:text-2xl font-bold tracking-tight">{card.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-white/55">{card.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Swiss Cantons Gallery ───────────────────────────────────────────── */

function CantonsSection() {
  const { t, locale } = useLocale();
  const cantonLabels = {
    en: "Explore Switzerland",
    uk: "Досліджуйте Швейцарію",
    de: "Schweiz entdecken",
  } as const;
  const cantonSubtitle = {
    en: "Local guides for every canton — from Zürich to Geneva.",
    uk: "Локальні гайди для кожного кантону — від Цюриха до Женеви.",
    de: "Lokale Guides für jeden Kanton — von Zürich bis Genf.",
  } as const;

  const cantons = Object.values(LANDING_IMAGES.cantons);

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden cv-auto section-mesh">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mb-16 flex flex-col items-end text-right ml-auto max-w-2xl"
        >
          <motion.p variants={fadeUp} className="editorial-label mb-4">{cantonLabels[locale]}</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05]">
            {cantonSubtitle[locale].includes("—") ? (
              <>
                {cantonSubtitle[locale].split("—")[0]}
                <span className="font-display italic font-normal text-gradient"> —{cantonSubtitle[locale].split("—")[1]}</span>
              </>
            ) : (
              cantonSubtitle[locale]
            )}
          </motion.h2>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
        className="full-bleed flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory pl-6 pr-6 sm:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] scrollbar-hide"
      >
        {cantons.map((canton, i) => (
          <motion.article
            key={canton.name}
            variants={scaleIn}
            custom={i}
            className="group relative flex-shrink-0 w-[min(80vw,420px)] snap-start aspect-[3/4] rounded-[1.75rem] overflow-hidden border border-white/[0.08]"
          >
            <Image
              src={canton.src}
              alt={canton.name}
              fill
              sizes="420px"
              className="object-cover transition-transform duration-1000 group-hover:scale-110 photo-grade"
            />
            <div className="absolute inset-0 photo-grade-overlay" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-transparent" />
            <div className="absolute inset-0 flex items-end overflow-hidden pointer-events-none" aria-hidden>
              <span className="canton-watermark text-[4.5rem] sm:text-[5rem] -mb-4 ml-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                {canton.name.split(" ")[0].slice(0, 4)}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
              <p className="text-2xl sm:text-3xl font-bold tracking-tight">{canton.name}</p>
              <p className="text-sm text-white/45 mt-1">{t("features.f1Title")}</p>
            </div>
          </motion.article>
        ))}
        <div className="flex-shrink-0 w-6 sm:w-1" aria-hidden />
      </motion.div>
    </section>
  );
}

/* ── Events / Marketplace Section ─────────────────────────────────────── */

function EventsMarketSection() {
  const { t } = useLocale();

  const eventPoints = [
    t("eventsMarket.eventsPoint1"),
    t("eventsMarket.eventsPoint2"),
    t("eventsMarket.eventsPoint3"),
  ];

  const marketPoints = [
    t("eventsMarket.marketPoint1"),
    t("eventsMarket.marketPoint2"),
    t("eventsMarket.marketPoint3"),
  ];

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden cv-auto">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end mb-16"
        >
          <div>
            <motion.p variants={fadeUp} className="editorial-label mb-4">{t("eventsMarket.badge")}</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05]">
              {t("eventsMarket.title1")}{" "}
              <span className="font-display italic font-normal text-gradient">{t("eventsMarket.title2")}</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} custom={2} className="text-lg text-white/45 leading-relaxed">
            {t("eventsMarket.subtitle")}
          </motion.p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="bento-card p-8 sm:p-10 min-h-[420px] flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.15),transparent_50%)]" />
            <div className="relative z-10">
              <p className="editorial-label mb-3">{t("eventsMarket.eventsStat1")}</p>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">{t("eventsMarket.eventsTitle")}</h3>
              <p className="mt-4 text-[15px] leading-8 text-white/55 max-w-md">{t("eventsMarket.eventsDesc")}</p>
            </div>
            <div className="relative z-10 mt-8 space-y-2.5">
              {eventPoints.map((point) => (
                <div key={point} className="flex items-center gap-3 nav-float px-4 py-3">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-green" />
                  <p className="text-sm text-white/65">{point}</p>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.25, 0.4, 0.25, 1] }}
            className="bento-card p-8 sm:p-10 min-h-[420px] flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.12),transparent_50%)]" />
            <div className="relative z-10">
              <p className="editorial-label mb-3 text-amber-300/80">{t("eventsMarket.marketStat1")}</p>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">{t("eventsMarket.marketTitle")}</h3>
              <p className="mt-4 text-[15px] leading-8 text-white/55 max-w-md">{t("eventsMarket.marketDesc")}</p>
            </div>
            <div className="relative z-10 mt-8 space-y-2.5">
              {marketPoints.map((point) => (
                <div key={point} className="flex items-center gap-3 nav-float px-4 py-3">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-300" />
                  <p className="text-sm text-white/65">{point}</p>
                </div>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

/* ── How It Works Section ────────────────────────────────────────────── */

function HowItWorksSection() {
  const { t } = useLocale();

  const steps = [
    { number: "01", image: LANDING_IMAGES.steps.download, title: t("howItWorks.s1Title"), description: t("howItWorks.s1Desc") },
    { number: "02", image: LANDING_IMAGES.steps.guides, title: t("howItWorks.s2Title"), description: t("howItWorks.s2Desc") },
    { number: "03", image: LANDING_IMAGES.steps.settle, title: t("howItWorks.s3Title"), description: t("howItWorks.s3Desc") },
  ];

  return (
    <section id="how-it-works" className="relative py-28 sm:py-36 overflow-hidden cv-auto section-mesh">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.p variants={fadeUp} className="editorial-label mb-4">{t("howItWorks.badge")}</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] max-w-3xl">
            {t("howItWorks.title1")}{" "}
            <span className="font-display italic font-normal text-gradient">{t("howItWorks.title2")}</span>
          </motion.h2>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute left-[calc(33.33%-1px)] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent-green/30 to-transparent" aria-hidden />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="space-y-16 lg:space-y-24"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                custom={i}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}
              >
                <div className="relative aspect-[4/3] rounded-[1.75rem] overflow-hidden border border-white/[0.08] shadow-[0_30px_80px_-40px_rgba(34,197,94,0.4)]">
                  <Image src={step.image} alt={step.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover photo-grade" />
                  <div className="absolute inset-0 photo-grade-overlay" aria-hidden />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 to-transparent" />
                  <span className="absolute top-5 left-5 nav-float px-4 py-2 text-sm font-bold text-gradient tabular-nums">{step.number}</span>
                </div>
                <div className="lg:px-6">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">{step.title}</h3>
                  <p className="mt-4 text-white/50 text-[15px] sm:text-base leading-relaxed max-w-md">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Coming Soon Section ─────────────────────────────────────────────── */

function ComingSoonSection() {
  const { t } = useLocale();

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden cv-auto">
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative rounded-[2rem] overflow-hidden border border-white/[0.08] mesh-hero"
        >
          <div className="absolute inset-0 bg-dark-950/60 backdrop-blur-sm" />
          <div className="relative z-10 p-10 sm:p-16 text-center">
            <motion.p variants={fadeUp} className="editorial-label mb-5">{t("comingSoon.badge")}</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05]">
              {t("comingSoon.title1")}{" "}
              <span className="font-display italic font-normal text-gradient">{t("comingSoon.title2")}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-5 text-lg text-white/45 max-w-md mx-auto">
              {t("comingSoon.subtitle")}
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-col items-center gap-4">
              <a href={TELEGRAM_URL} target="_blank" rel="noreferrer noopener" className="pill-btn-primary gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M21.4 4.6c.3-.9-.6-1.7-1.5-1.4L3.2 9.3c-1 .4-1 1.8.1 2.1l4.2 1.4 1.6 5c.3 1 1.6 1.2 2.2.4l2.4-3 4.7 3.5c.8.6 2 .2 2.2-.8l2.8-13.3ZM9 12.4l8.2-5.1-6.6 6.5-.3 3.3-1.3-4.7Z" />
                </svg>
                {t("comingSoon.notify")}
              </a>
              <p className="text-sm text-white/35">
                Telegram:{" "}
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer noopener" className="text-accent-green/80 hover:text-accent-green transition-colors">
                  @sweezyxswiss
                </a>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Testimonials Section ────────────────────────────────────────────── */

function TestimonialsSection() {
  const { t } = useLocale();

  const testimonials = [
    { quote: t("testimonials.t1Quote"), name: t("testimonials.t1Name"), role: t("testimonials.t1Role"), avatar: LANDING_IMAGES.testimonials.olena },
    { quote: t("testimonials.t2Quote"), name: t("testimonials.t2Name"), role: t("testimonials.t2Role"), avatar: LANDING_IMAGES.testimonials.marco },
    { quote: t("testimonials.t3Quote"), name: t("testimonials.t3Name"), role: t("testimonials.t3Role"), avatar: LANDING_IMAGES.testimonials.sarah },
  ];

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden cv-auto section-mesh">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end mb-16"
        >
          <div>
            <motion.p variants={fadeUp} className="editorial-label mb-4">{t("testimonials.badge")}</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05]">
              {t("testimonials.title1")}{" "}
              <span className="font-display italic font-normal text-gradient">{t("testimonials.title2")}</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} custom={2} className="text-lg text-white/45 leading-relaxed">
            {t("testimonials.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid lg:grid-cols-[1.4fr_1fr] gap-5"
        >
          <motion.article variants={scaleIn} className="bento-card p-8 sm:p-12 flex flex-col justify-between min-h-[360px]">
            <span className="quote-mark" aria-hidden>&ldquo;</span>
            <p className="font-display italic text-2xl sm:text-3xl lg:text-4xl leading-snug text-white/85 -mt-4">
              {testimonials[0].quote}
            </p>
            <div className="flex items-center gap-4 mt-8">
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border-2 border-white/10">
                <Image src={testimonials[0].avatar} alt={testimonials[0].name} fill sizes="56px" className="object-cover" />
              </div>
              <div>
                <p className="font-semibold">{testimonials[0].name}</p>
                <p className="text-sm text-white/40">{testimonials[0].role}</p>
              </div>
              <div className="ml-auto hidden sm:block"><StarRating /></div>
            </div>
          </motion.article>

          <div className="grid gap-5">
            {testimonials.slice(1).map((item, i) => (
              <motion.article key={item.name} variants={scaleIn} custom={i + 1} className="bento-card p-6 sm:p-7 flex flex-col gap-4">
                <StarRating />
                <p className="text-white/60 leading-relaxed text-[15px] flex-1">&ldquo;{item.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-white/[0.08]">
                    <Image src={item.avatar} alt={item.name} fill sizes="40px" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-white/35">{item.role}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── FAQ Section ─────────────────────────────────────────────────────── */

function FAQSection() {
  const { t } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
    { q: t("faq.q6"), a: t("faq.a6") },
  ];

  return (
    <section id="faq" className="relative py-28 sm:py-36 overflow-hidden cv-auto">
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-14 text-center"
        >
          <motion.p variants={fadeUp} className="editorial-label mb-4">{t("faq.subtitle")}</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em]">
            {t("faq.title")}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} className="rounded-2xl nav-float overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex items-center justify-between w-full px-6 py-5 text-left text-[15px] font-medium text-white/90 hover:text-white transition-colors"
              >
                {faq.q}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={`flex-shrink-0 ml-4 text-white/30 transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""}`}
                >
                  <path
                    d="M10 4v12M4 10h12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-white/50 text-[15px] leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── CTA Section ─────────────────────────────────────────────────────── */

function CTASection() {
  const { t } = useLocale();

  return (
    <section id="download" className="relative py-20 sm:py-28 overflow-hidden cv-auto">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden min-h-[480px] sm:min-h-[520px] bg-[#0a1610] grid lg:grid-cols-[1.1fr_0.9fr] items-center"
        >
          <div className="relative z-10 px-8 sm:px-16 py-16 sm:py-20">
            <motion.p variants={fadeUp} className="editorial-label mb-5">{t("cta.downloadOn")}</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05]">
              {t("cta.title1")}{" "}
              <span className="font-display italic font-normal text-gradient">{t("cta.title2")}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-5 text-lg text-white/50 max-w-md">
              {t("cta.subtitle")}
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-wrap gap-4">
              <a href={APP_STORE_URL} target="_blank" rel="noreferrer noopener" className="pill-btn-primary gap-3">
                <AppleLogo />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[11px] font-normal opacity-60">{t("cta.downloadOn")}</span>
                  <span>{t("cta.appStore")}</span>
                </div>
              </a>
              <a href="#features" className="pill-btn-ghost text-[15px]">
                {t("cta.learnMore")} →
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={scaleIn}
            custom={2}
            className="relative hidden lg:block h-full min-h-[480px]"
          >
            <Image
              src={LANDING_IMAGES.glossy.ctaScene}
              alt=""
              fill
              sizes="45vw"
              className="object-cover"
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a1610] via-[#0a1610]/10 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Page Composition ────────────────────────────────────────────────── */

export default function Home() {
  const { t } = useLocale();

  return (
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <AppShowcaseSection />
      <WhatsNewSection />
      <CantonsSection />
      <EventsMarketSection />
      <HowItWorksSection />
      <ComingSoonSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
