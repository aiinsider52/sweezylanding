"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "../../lib/locale-context";
import { localeLabels, type Locale } from "../../lib/i18n";
import { BrandLogo } from "../components/BrandLogo";

/* ---------- Animations ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

export default function PrivacyPolicy() {
  const { locale, setLocale, t } = useLocale();

  return (
    <main className="min-h-screen bg-dark-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-br from-neon-purple/20 via-neon-blue/10 to-transparent blur-3xl opacity-40"
      />

      {/* Nav */}
      <nav className="relative z-20 border-b border-white/[0.04] backdrop-blur-md bg-dark-900/60">
        <div className="mx-auto max-w-4xl px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-green/10 to-accent-emerald/10 border border-white/[0.06]">
              <BrandLogo variant="mark" className="h-5 w-5 object-contain" />
            </div>
            <span className="text-lg font-bold tracking-tight">Sweezy</span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Language switcher */}
            <div className="flex items-center gap-1 rounded-full glass px-1 py-1">
              {(Object.keys(localeLabels) as Locale[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                    locale === l
                      ? "bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-lg shadow-neon-purple/25"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {localeLabels[l]}
                </button>
              ))}
            </div>

            <Link
              href="/"
              className="text-sm text-white/40 hover:text-white transition-colors duration-300"
            >
              {t("common.backToHome")}
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <article className="relative z-10 mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-16"
        >
          <p className="text-sm font-medium text-neon-purple mb-3 tracking-wide uppercase">
            {t("privacyPage.label")}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
            {t("privacyPage.title")}
          </h1>
          <p className="text-white/40 text-sm">{t("privacyPage.lastUpdated")}</p>
        </motion.header>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="space-y-12 text-white/60 leading-relaxed text-[15px]"
        >
          {/* 1. Introduction */}
          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("privacyPage.s1Title")}
            </h2>
            <p>{t("privacyPage.s1Text")}</p>
          </motion.section>

          {/* 2. Information We Collect */}
          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("privacyPage.s2Title")}
            </h2>
            <h3 className="text-base font-medium text-white/80 mb-2 mt-6">
              {t("privacyPage.s2aTitle")}
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong className="text-white/80">{t("privacyPage.s2aItem1Label")}</strong>{" "}
                {t("privacyPage.s2aItem1Text")}
              </li>
              <li>
                <strong className="text-white/80">{t("privacyPage.s2aItem2Label")}</strong>{" "}
                {t("privacyPage.s2aItem2Text")}
              </li>
            </ul>
            <h3 className="text-base font-medium text-white/80 mb-2 mt-6">
              {t("privacyPage.s2bTitle")}
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong className="text-white/80">{t("privacyPage.s2bItem1Label")}</strong>{" "}
                {t("privacyPage.s2bItem1Text")}
              </li>
              <li>
                <strong className="text-white/80">{t("privacyPage.s2bItem2Label")}</strong>{" "}
                {t("privacyPage.s2bItem2Text")}
              </li>
              <li>
                <strong className="text-white/80">{t("privacyPage.s2bItem3Label")}</strong>{" "}
                {t("privacyPage.s2bItem3Text")}
              </li>
            </ul>
          </motion.section>

          {/* 3. How We Use Your Information */}
          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("privacyPage.s3Title")}
            </h2>
            <p className="mb-4">{t("privacyPage.s3Intro")}</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>{t("privacyPage.s3Item1")}</li>
              <li>{t("privacyPage.s3Item2")}</li>
              <li>{t("privacyPage.s3Item3")}</li>
              <li>{t("privacyPage.s3Item4")}</li>
              <li>{t("privacyPage.s3Item5")}</li>
              <li>{t("privacyPage.s3Item6")}</li>
            </ul>
          </motion.section>

          {/* 4. Data Sharing and Disclosure */}
          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("privacyPage.s4Title")}
            </h2>
            <p className="mb-4">{t("privacyPage.s4Intro")}</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong className="text-white/80">{t("privacyPage.s4Item1Label")}</strong>{" "}
                {t("privacyPage.s4Item1Text")}
              </li>
              <li>
                <strong className="text-white/80">{t("privacyPage.s4Item2Label")}</strong>{" "}
                {t("privacyPage.s4Item2Text")}
              </li>
              <li>
                <strong className="text-white/80">{t("privacyPage.s4Item3Label")}</strong>{" "}
                {t("privacyPage.s4Item3Text")}
              </li>
            </ul>
          </motion.section>

          {/* 5. Data Storage and Security */}
          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("privacyPage.s5Title")}
            </h2>
            <p>{t("privacyPage.s5Text")}</p>
          </motion.section>

          {/* 6. Your Rights */}
          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("privacyPage.s6Title")}
            </h2>
            <p className="mb-4">{t("privacyPage.s6Intro")}</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong className="text-white/80">{t("privacyPage.s6Item1Label")}</strong>{" "}
                {t("privacyPage.s6Item1Text")}
              </li>
              <li>
                <strong className="text-white/80">{t("privacyPage.s6Item2Label")}</strong>{" "}
                {t("privacyPage.s6Item2Text")}
              </li>
              <li>
                <strong className="text-white/80">{t("privacyPage.s6Item3Label")}</strong>{" "}
                {t("privacyPage.s6Item3Text")}
              </li>
              <li>
                <strong className="text-white/80">{t("privacyPage.s6Item4Label")}</strong>{" "}
                {t("privacyPage.s6Item4Text")}
              </li>
              <li>
                <strong className="text-white/80">{t("privacyPage.s6Item5Label")}</strong>{" "}
                {t("privacyPage.s6Item5Text")}
              </li>
            </ul>
            <p className="mt-4">
              {t("privacyPage.s6Outro")}{" "}
              <a
                href="mailto:support@sweezy.world"
                className="text-neon-purple hover:text-neon-blue transition-colors underline underline-offset-4"
              >
                support@sweezy.world
              </a>
              .
            </p>
          </motion.section>

          {/* 7. Data Retention */}
          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("privacyPage.s7Title")}
            </h2>
            <p>{t("privacyPage.s7Text")}</p>
          </motion.section>

          {/* 8. Children's Privacy */}
          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("privacyPage.s8Title")}
            </h2>
            <p>{t("privacyPage.s8Text")}</p>
          </motion.section>

          {/* 9. Third-Party Services */}
          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("privacyPage.s9Title")}
            </h2>
            <p>{t("privacyPage.s9Text")}</p>
          </motion.section>

          {/* 10. Changes */}
          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("privacyPage.s10Title")}
            </h2>
            <p>{t("privacyPage.s10Text")}</p>
          </motion.section>

          {/* 11. Contact */}
          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("privacyPage.s11Title")}
            </h2>
            <p className="mb-4">{t("privacyPage.s11Intro")}</p>
            <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-6 space-y-2 backdrop-blur-sm">
              <p>
                <strong className="text-white/80">{t("privacyPage.emailLabel")}</strong>{" "}
                <a
                  href="mailto:support@sweezy.world"
                  className="text-neon-purple hover:text-neon-blue transition-colors underline underline-offset-4"
                >
                  support@sweezy.world
                </a>
              </p>
              <p>
                <strong className="text-white/80">{t("privacyPage.websiteLabel")}</strong>{" "}
                <a
                  href="https://sweezy.world"
                  className="text-neon-purple hover:text-neon-blue transition-colors underline underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  sweezy.world
                </a>
              </p>
            </div>
          </motion.section>
        </motion.div>
      </article>
    </main>
  );
}
