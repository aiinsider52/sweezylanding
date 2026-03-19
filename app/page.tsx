"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocale } from "../lib/locale-context";
import { localeLabels, type Locale } from "../lib/i18n";
import { APP_STORE_URL } from "../lib/links";

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
      className={`absolute rounded-full bg-gradient-to-br ${colors} opacity-20 blur-3xl ${className ?? ""}`}
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
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative w-[260px] rounded-[3rem] border-[6px] border-white/[0.08] bg-dark-800 shadow-phone-glow overflow-hidden ${className}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-28 rounded-b-2xl bg-dark-800 z-20" />
      <img
        src={src}
        alt={alt}
        className="w-full rounded-[2.4rem] relative z-10"
        loading="lazy"
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

function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const locales: Locale[] = ["en", "uk", "de"];

  return (
    <div className={`flex items-center rounded-xl bg-white/[0.04] border border-white/[0.06] p-0.5 ${className}`}>
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300 ${
            locale === l
              ? "bg-gradient-to-r from-accent-green to-accent-emerald text-white shadow-glow-sm"
              : "text-white/40 hover:text-white/70"
          }`}
        >
          {localeLabels[l]}
        </button>
      ))}
    </div>
  );
}

/* ── Navbar ───────────────────────────────────────────────────────────── */

function Navbar() {
  const { t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#features", label: t("nav.features") },
    { href: "#how-it-works", label: t("nav.howItWorks") },
    { href: "#screenshots", label: t("nav.screenshots") },
    { href: "#faq", label: t("nav.faq") },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="rounded-2xl glass px-6 py-3">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-green to-accent-emerald">
                <span className="text-sm font-bold text-white">S</span>
              </div>
              <span className="text-lg font-bold tracking-tight">Sweezy</span>
            </a>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <LanguageSwitcher />
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-xl bg-accent-green/10 hover:bg-accent-green/20 border border-accent-green/20 px-5 py-2 text-sm font-medium text-accent-green transition-all duration-300"
              >
                {t("nav.getApp")}
              </a>
            </div>

            <div className="flex lg:hidden items-center gap-3">
              <LanguageSwitcher />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.06]"
                aria-label="Toggle menu"
              >
                <div className="flex flex-col gap-1.5">
                  <span className={`block h-0.5 w-5 bg-white/70 rounded transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                  <span className={`block h-0.5 w-5 bg-white/70 rounded transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
                  <span className={`block h-0.5 w-5 bg-white/70 rounded transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
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
                transition={{ duration: 0.3 }}
                className="overflow-hidden lg:hidden"
              >
                <div className="pt-4 pb-2 flex flex-col gap-3 border-t border-white/[0.06] mt-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-300 py-2"
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => setIsOpen(false)}
                    className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-accent-green/10 hover:bg-accent-green/20 border border-accent-green/20 px-5 py-3 text-sm font-medium text-accent-green transition-all duration-300"
                  >
                    {t("nav.getApp")}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}

/* ── Hero Section ────────────────────────────────────────────────────── */

function HeroSection() {
  const { t } = useLocale();

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <GradientBlob className="w-[600px] h-[600px] -top-40 -left-40 animate-blob" colors="from-accent-green/20 via-accent-emerald/10 to-transparent" />
      <GradientBlob className="w-[500px] h-[500px] top-20 right-0 animate-blob animation-delay-2000" colors="from-accent-spring/15 via-accent-teal/10 to-transparent" />
      <GradientBlob className="w-[400px] h-[400px] bottom-0 left-1/3 animate-blob animation-delay-4000" colors="from-accent-emerald/20 via-accent-mint/10 to-transparent" />

      <div className="absolute inset-0 bg-dark-900/60" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-start"
          >
            <SectionBadge>{t("hero.badge")}</SectionBadge>

            <motion.h1
              variants={fadeUp}
              custom={0}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]"
            >
              {t("hero.title1")}
              <br />
              <span className="text-gradient">{t("hero.title2")}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={1}
              className="mt-6 text-lg sm:text-xl text-white/45 leading-relaxed max-w-lg"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div variants={fadeUp} custom={2} className="mt-10 flex flex-wrap gap-4">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="group relative inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 text-dark-900 font-semibold text-[15px] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <AppleLogo />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[11px] font-normal opacity-60">
                    {t("hero.downloadOn")}
                  </span>
                  <span>{t("hero.appStore")}</span>
                </div>
                <div className="absolute -inset-1 rounded-2xl bg-accent-green/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-2xl glass-green border border-accent-green/10 px-7 py-4 text-[15px] font-semibold text-white hover:border-accent-green/25 transition-all duration-300"
              >
                {t("hero.learnMore")}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path
                    d="M6 12l4-4-4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>

            <motion.p variants={fadeUp} custom={3} className="mt-6 text-xs text-white/25">
              {t("hero.madeBy")}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-80 w-80 rounded-full bg-accent-green/20 blur-[100px] animate-pulse-glow" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-60 w-60 rounded-full bg-accent-emerald/15 blur-[80px] animate-pulse-glow animation-delay-2000" />
            </div>

            <div className="relative z-10 animate-float">
              <PhoneMockup
                src="/screenshots/home.png"
                alt="Sweezy app home screen"
                className="mx-auto w-[280px] sm:w-[300px] shadow-glow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Stats Section ───────────────────────────────────────────────────── */

function StatsSection() {
  const { t } = useLocale();

  const stats = [
    { num: t("stats.guidesNum"), label: t("stats.guides") },
    { num: t("stats.cantonsNum"), label: t("stats.cantons") },
    { num: t("stats.languagesNum"), label: t("stats.languages") },
    { num: t("stats.ratingNum"), label: t("stats.rating") },
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={i}
              className="flex flex-col items-center text-center gap-2 py-6"
            >
              <span className="text-4xl sm:text-5xl font-extrabold text-gradient">
                {stat.num}
              </span>
              <span className="text-sm text-white/40 font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Features Section ────────────────────────────────────────────────── */

function FeaturesSection() {
  const { t } = useLocale();

  const features = [
    { icon: <IconGuide />, title: t("features.f1Title"), description: t("features.f1Desc") },
    { icon: <IconChecklist />, title: t("features.f2Title"), description: t("features.f2Desc") },
    { icon: <IconMap />, title: t("features.f3Title"), description: t("features.f3Desc") },
    { icon: <IconMarketplace />, title: t("features.f4Title"), description: t("features.f4Desc") },
    { icon: <IconCV />, title: t("features.f5Title"), description: t("features.f5Desc") },
    { icon: <IconLanguage />, title: t("features.f6Title"), description: t("features.f6Desc") },
  ];

  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <GradientBlob
        className="w-[600px] h-[600px] top-0 left-1/2 -translate-x-1/2"
        colors="from-accent-green/20 via-accent-emerald/10 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <SectionBadge>{t("features.badge")}</SectionBadge>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            {t("features.title1")}
            <br />
            <span className="text-gradient">{t("features.title2")}</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="mt-5 text-lg text-white/40 max-w-xl mx-auto"
          >
            {t("features.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={scaleIn}
              custom={i}
              whileHover={{ y: -8, transition: { duration: 0.35 } }}
              className="group relative rounded-2xl glass glass-hover glow-border p-8 flex flex-col gap-5"
            >
              <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-accent-green/10 blur-2xl group-hover:bg-accent-green/20 transition-all duration-700" />
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-green/20 to-accent-emerald/20 border border-white/[0.06]">
                {feature.icon}
              </div>
              <h3 className="relative z-10 text-xl font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="relative z-10 text-white/50 leading-relaxed text-[15px]">
                {feature.description}
              </p>
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent-green/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── App Showcase Section ────────────────────────────────────────────── */

function AppShowcaseSection() {
  const { t } = useLocale();

  const screens = [
    { src: "/screenshots/home.png", label: t("appShowcase.screen1Label") },
    { src: "/screenshots/guides.png", label: t("appShowcase.screen2Label") },
    { src: "/screenshots/map.png", label: t("appShowcase.screen3Label") },
  ];

  return (
    <section id="screenshots" className="relative py-32 overflow-hidden">
      <GradientBlob
        className="w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        colors="from-accent-green/15 via-accent-spring/10 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <SectionBadge>{t("appShowcase.badge")}</SectionBadge>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            {t("appShowcase.title1")}
            <br />
            <span className="text-gradient">{t("appShowcase.title2")}</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="mt-5 text-lg text-white/40 max-w-xl mx-auto"
          >
            {t("appShowcase.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row items-end justify-center gap-8 md:gap-12"
        >
          {screens.map((screen, i) => {
            const isCenter = i === 1;
            return (
              <motion.div
                key={screen.src}
                variants={scaleIn}
                custom={i}
                className={`flex flex-col items-center gap-5 ${isCenter ? "md:-mt-8" : ""}`}
              >
                <PhoneMockup
                  src={screen.src}
                  alt={screen.label}
                  className={isCenter ? "w-[280px] shadow-glow-lg" : "w-[240px] opacity-90"}
                />
                <span className="text-sm text-white/40 font-medium">{screen.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ── How It Works Section ────────────────────────────────────────────── */

function HowItWorksSection() {
  const { t } = useLocale();

  const steps = [
    { number: "01", title: t("howItWorks.s1Title"), description: t("howItWorks.s1Desc") },
    { number: "02", title: t("howItWorks.s2Title"), description: t("howItWorks.s2Desc") },
    { number: "03", title: t("howItWorks.s3Title"), description: t("howItWorks.s3Desc") },
  ];

  return (
    <section id="how-it-works" className="relative py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <SectionBadge>{t("howItWorks.badge")}</SectionBadge>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            {t("howItWorks.title1")}
            <br />
            <span className="text-gradient">{t("howItWorks.title2")}</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative grid md:grid-cols-3 gap-12 md:gap-8"
        >
          <div
            className="hidden md:block absolute top-8 left-[20%] right-[20%] h-px"
            aria-hidden="true"
          >
            <div className="h-full w-full bg-gradient-to-r from-accent-green/30 via-accent-emerald/20 to-accent-green/30" />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              custom={i}
              className="relative flex flex-col items-center text-center gap-4"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl glass border border-white/[0.08]">
                <span className="text-2xl font-bold text-gradient">{step.number}</span>
              </div>
              <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="text-white/45 text-[15px] leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Coming Soon Section ─────────────────────────────────────────────── */

function ComingSoonSection() {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section className="relative py-32 overflow-hidden">
      <GradientBlob
        className="w-[500px] h-[500px] top-0 right-0"
        colors="from-accent-spring/15 via-accent-teal/10 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="rounded-3xl glass-green glow-border p-10 sm:p-14 text-center"
        >
          <SectionBadge>{t("comingSoon.badge")}</SectionBadge>

          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            {t("comingSoon.title1")}
            <br />
            <span className="text-gradient">{t("comingSoon.title2")}</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="mt-5 text-lg text-white/40 max-w-md mx-auto"
          >
            {t("comingSoon.subtitle")}
          </motion.p>

          <motion.form
            variants={fadeUp}
            custom={2}
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            {submitted ? (
              <div className="flex-1 flex items-center justify-center gap-2 rounded-xl glass px-6 py-4 text-accent-green text-sm font-medium">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>Thank you!</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                  className="flex-1 rounded-xl bg-white/[0.04] border border-white/[0.08] px-5 py-3.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-accent-green/40 transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-accent-green to-accent-emerald px-6 py-3.5 text-sm font-semibold text-dark-950 hover:shadow-glow transition-shadow duration-300 whitespace-nowrap"
                >
                  {t("comingSoon.notify")}
                </button>
              </>
            )}
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Testimonials Section ────────────────────────────────────────────── */

function TestimonialsSection() {
  const { t } = useLocale();

  const testimonials = [
    { quote: t("testimonials.t1Quote"), name: t("testimonials.t1Name"), role: t("testimonials.t1Role") },
    { quote: t("testimonials.t2Quote"), name: t("testimonials.t2Name"), role: t("testimonials.t2Role") },
    { quote: t("testimonials.t3Quote"), name: t("testimonials.t3Name"), role: t("testimonials.t3Role") },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      <GradientBlob
        className="w-[500px] h-[500px] top-20 -right-20"
        colors="from-accent-emerald/15 via-accent-teal/10 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <SectionBadge>{t("testimonials.badge")}</SectionBadge>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            {t("testimonials.title1")}
            <br />
            <span className="text-gradient">{t("testimonials.title2")}</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="mt-5 text-lg text-white/40 max-w-xl mx-auto"
          >
            {t("testimonials.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              variants={scaleIn}
              custom={i}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative rounded-2xl glass glass-hover p-8 flex flex-col gap-6"
            >
              <StarRating />
              <p className="text-white/60 leading-relaxed text-[15px] flex-1">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-accent-green/30 to-accent-emerald/30 border border-white/[0.08]">
                  <span className="text-sm font-bold">{item.name[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-white/35">{item.role}</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent-green/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
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
    <section id="faq" className="relative py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            {t("faq.title")}
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="mt-5 text-lg text-white/40">
            {t("faq.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} className="rounded-2xl glass overflow-hidden">
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
    <section id="download" className="relative py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-green/20 via-accent-emerald/10 to-dark-800" />
          <div className="absolute inset-0 bg-dark-900/40" />
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent-green/15 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-accent-spring/10 blur-[80px]" />

          <div className="relative z-10 px-8 sm:px-16 py-20 sm:py-24 text-center">
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight"
            >
              {t("cta.title1")}
              <br />
              <span className="text-gradient">{t("cta.title2")}</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mt-5 text-lg text-white/50 max-w-md mx-auto"
            >
              {t("cta.subtitle")}
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={2}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="group relative inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 text-dark-900 font-semibold text-[15px] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <AppleLogo />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[11px] font-normal opacity-60">
                    {t("cta.downloadOn")}
                  </span>
                  <span>{t("cta.appStore")}</span>
                </div>
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 px-7 py-4 text-[15px] font-medium backdrop-blur-sm transition-all duration-300"
              >
                {t("cta.learnMore")}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Page Composition ────────────────────────────────────────────────── */

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <GradientDivider />
      <FeaturesSection />
      <GradientDivider />
      <AppShowcaseSection />
      <GradientDivider />
      <HowItWorksSection />
      <ComingSoonSection />
      <GradientDivider />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
