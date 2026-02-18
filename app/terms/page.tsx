"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "../../lib/locale-context";
import { localeLabels, type Locale } from "../../lib/i18n";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

export default function TermsPage() {
  const { locale, setLocale, t } = useLocale();

  return (
    <main className="min-h-screen bg-dark-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-br from-neon-blue/15 via-neon-purple/10 to-transparent blur-3xl opacity-40"
      />

      {/* Nav */}
      <nav className="relative z-20 border-b border-white/[0.04] backdrop-blur-md bg-dark-900/60">
        <div className="mx-auto max-w-4xl px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-purple to-neon-blue shadow-lg shadow-neon-purple/25 group-hover:shadow-neon-purple/40 transition-shadow duration-300">
              <span className="text-sm font-bold text-white">S</span>
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
            {t("termsPage.label")}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
            {t("termsPage.title")}
          </h1>
          <p className="text-white/40 text-sm">{t("termsPage.lastUpdated")}</p>
        </motion.header>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="space-y-12 text-white/60 leading-relaxed text-[15px]"
        >
          <motion.section variants={fadeUp}>
            <p>{t("termsPage.intro")}</p>
          </motion.section>

          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("termsPage.s1Title")}
            </h2>
            <p>{t("termsPage.s1Text")}</p>
          </motion.section>

          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("termsPage.s2Title")}
            </h2>
            <p>{t("termsPage.s2Text")}</p>
          </motion.section>

          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("termsPage.s3Title")}
            </h2>
            <p>{t("termsPage.s3Text")}</p>
          </motion.section>

          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("termsPage.s4Title")}
            </h2>
            <p className="mb-4">{t("termsPage.s4Intro")}</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>{t("termsPage.s4Item1")}</li>
              <li>{t("termsPage.s4Item2")}</li>
              <li>{t("termsPage.s4Item3")}</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("termsPage.s5Title")}
            </h2>
            <p>{t("termsPage.s5Text")}</p>
          </motion.section>

          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("termsPage.s6Title")}
            </h2>
            <p>{t("termsPage.s6Text")}</p>
          </motion.section>

          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("termsPage.s7Title")}
            </h2>
            <p>{t("termsPage.s7Text")}</p>
          </motion.section>

          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("termsPage.s8Title")}
            </h2>
            <p>{t("termsPage.s8Text")}</p>
          </motion.section>

          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("termsPage.s9Title")}
            </h2>
            <p>{t("termsPage.s9Text")}</p>
          </motion.section>

          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("termsPage.s10Title")}
            </h2>
            <p>
              {t("termsPage.s10Text")}{" "}
              <a
                href={`mailto:${t("termsPage.email")}`}
                className="text-neon-purple hover:text-neon-blue transition-colors underline underline-offset-4"
              >
                {t("termsPage.email")}
              </a>
              .
            </p>
          </motion.section>
        </motion.div>
      </article>
    </main>
  );
}

