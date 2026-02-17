import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support — Sweezy",
  description:
    "Get help with Sweezy. Contact our support team, find answers to common questions, and learn how to make the most of the app.",
};

const faqs = [
  {
    question: "What is Sweezy?",
    answer:
      "Sweezy is a mobile app designed to help newcomers navigate life in Switzerland. It provides step-by-step guides, structured checklists, and curated links to official resources — covering topics like residence permits, health insurance, banking, taxes, and more.",
  },
  {
    question: "Is Sweezy free to use?",
    answer:
      "Sweezy offers a free tier with access to essential guides and checklists. Premium features may be available through an in-app subscription for more in-depth content and personalized recommendations.",
  },
  {
    question: "Which platforms is Sweezy available on?",
    answer:
      "Sweezy is currently available on iOS via the Apple App Store. We are working on expanding to other platforms in the future.",
  },
  {
    question: "How do I track my progress?",
    answer:
      "Each guide contains interactive checklists. As you complete steps, simply check them off — your progress is saved automatically and synced across your devices.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We use industry-standard encryption and security practices to protect your personal data. We do not sell your information to third parties. For more details, please review our Privacy Policy.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "You can delete your account from the app settings under Profile → Account → Delete Account. Alternatively, you can contact us at support@sweezy.app and we will process your request within 48 hours.",
  },
  {
    question: "The app is not working properly. What should I do?",
    answer:
      "Please try closing and reopening the app, or updating to the latest version from the App Store. If the issue persists, contact us at support@sweezy.app with a description of the problem and your device model.",
  },
  {
    question: "Can I suggest a new guide or feature?",
    answer:
      "Absolutely! We love hearing from our users. Send your ideas and suggestions to support@sweezy.app — we read every message.",
  },
];

export default function Support() {
  return (
    <main className="min-h-screen bg-dark-900 text-white">
      {/* Nav */}
      <nav className="border-b border-white/[0.04]">
        <div className="mx-auto max-w-4xl px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-purple to-neon-blue">
              <span className="text-sm font-bold text-white">S</span>
            </div>
            <span className="text-lg font-bold tracking-tight">Sweezy</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-white/40 hover:text-white transition-colors duration-300"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        {/* Header */}
        <header className="mb-16">
          <p className="text-sm font-medium text-neon-purple mb-3">
            Help Center
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Support
          </h1>
          <p className="text-white/40 text-lg max-w-xl">
            Have a question or need help? We&apos;re here for you.
          </p>
        </header>

        {/* Contact Card */}
        <section className="mb-20">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Email */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-8">
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
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-white/40 text-sm mb-4">
                Our support team typically responds within 24 hours.
              </p>
              <a
                href="mailto:support@sweezy.app"
                className="inline-flex items-center gap-2 text-neon-purple hover:text-neon-blue transition-colors font-medium text-[15px]"
              >
                support@sweezy.app
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
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
            </div>

            {/* Response Time */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-8">
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
              <h3 className="text-lg font-semibold mb-2">Response Time</h3>
              <p className="text-white/40 text-sm mb-4">
                We aim to reply to all inquiries within one business day.
              </p>
              <span className="text-white/60 text-[15px] font-medium">
                Mon — Fri, 9:00 — 18:00 CET
              </span>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-[15px] font-medium text-white/90 hover:text-white transition-colors list-none">
                  {faq.question}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="flex-shrink-0 ml-4 text-white/30 transition-transform duration-300 group-open:rotate-45"
                  >
                    <path
                      d="M10 4v12M4 10h12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-white/50 text-[15px] leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Still need help? */}
        <section className="mt-20">
          <div className="rounded-2xl bg-gradient-to-br from-neon-purple/10 via-neon-blue/5 to-transparent border border-white/[0.06] p-10 text-center">
            <h3 className="text-xl font-semibold mb-3">Still need help?</h3>
            <p className="text-white/40 text-[15px] mb-6 max-w-md mx-auto">
              If you couldn&apos;t find what you&apos;re looking for, don&apos;t
              hesitate to reach out. We&apos;re happy to help.
            </p>
            <a
              href="mailto:support@sweezy.app"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-dark-900 font-semibold text-sm transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Contact Support
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.04]">
        <div className="mx-auto max-w-4xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/20">
            &copy; {new Date().getFullYear()} Sweezy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-white/30 hover:text-white/60 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="text-sm text-white/30 hover:text-white/60 transition-colors duration-300"
            >
              Home
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
