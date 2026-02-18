"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocale } from "../../lib/locale-context";
import { localeLabels, type Locale } from "../../lib/i18n";

/* ---------- Animations ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

/* ---------- FAQ Accordion Item ---------- */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between cursor-pointer px-6 py-5 text-[15px] font-medium text-white/90 hover:text-white transition-colors text-left"
      >
        {question}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className={`flex-shrink-0 ml-4 text-white/30 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <path
            d="M10 4v12M4 10h12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-white/50 text-[15px] leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Support() {
  const { locale, setLocale, t } = useLocale();

  const faqs = [
    { q: t("supportPage.faq1Q"), a: t("supportPage.faq1A") },
    { q: t("supportPage.faq2Q"), a: t("supportPage.faq2A") },
    { q: t("supportPage.faq3Q"), a: t("supportPage.faq3A") },
    { q: t("supportPage.faq4Q"), a: t("supportPage.faq4A") },
    { q: t("supportPage.faq5Q"), a: t("supportPage.faq5A") },
    { q: t("supportPage.faq6Q"), a: t("supportPage.faq6A") },
    { q: t("supportPage.faq7Q"), a: t("supportPage.faq7A") },
    { q: t("supportPage.faq8Q"), a: t("supportPage.faq8A") },
  ];

  return (
    <main className="min-h-screen bg-dark-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-[500px] w-[700px] rounded-full bg-gradient-to-bl from-neon-blue/20 via-neon-purple/10 to-transparent blur-3xl opacity-40"
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

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-16 sm:py-24">
        {/* Header */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-16"
        >
          <p className="text-sm font-medium text-neon-purple mb-3 tracking-wide uppercase">
            {t("supportPage.label")}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
            {t("supportPage.title")}
          </h1>
          <p className="text-white/40 text-lg max-w-xl">
            {t("supportPage.subtitle")}
          </p>
        </motion.header>

        {/* Contact Cards */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="mb-20"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Email */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-8 backdrop-blur-sm hover:bg-white/[0.06] transition-colors duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 border border-white/[0.06] mb-5">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-neon-purple"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {t("supportPage.emailTitle")}
              </h3>
              <p className="text-white/40 text-sm mb-4">
                {t("supportPage.emailDesc")}
              </p>
              <a
                href="mailto:support@sweezy.world"
                className="inline-flex items-center gap-2 text-neon-purple hover:text-neon-blue transition-colors font-medium text-[15px]"
              >
                support@sweezy.world
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
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

            {/* Response Time */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-8 backdrop-blur-sm hover:bg-white/[0.06] transition-colors duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-cyan/20 border border-white/[0.06] mb-5">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-neon-blue"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {t("supportPage.responseTitle")}
              </h3>
              <p className="text-white/40 text-sm mb-4">
                {t("supportPage.responseDesc")}
              </p>
              <span className="text-white/60 text-[15px] font-medium">
                {t("supportPage.responseHours")}
              </span>
            </motion.div>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-3xl font-bold tracking-tight mb-10"
          >
            {t("supportPage.faqTitle")}
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FaqItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </motion.section>

        {/* Still need help? */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-20"
        >
          <div className="rounded-2xl bg-gradient-to-br from-neon-purple/10 via-neon-blue/5 to-transparent border border-white/[0.06] p-10 text-center backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-3">
              {t("supportPage.stillNeedHelp")}
            </h3>
            <p className="text-white/40 text-[15px] mb-6 max-w-md mx-auto">
              {t("supportPage.stillNeedHelpDesc")}
            </p>
            <a
              href="mailto:support@sweezy.world"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-dark-900 font-semibold text-sm transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-white/10"
            >
              {t("supportPage.contactSupport")}
            </a>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
