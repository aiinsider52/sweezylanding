import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Sweezy",
  description:
    "Privacy Policy for Sweezy. Learn how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicy() {
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

      {/* Content */}
      <article className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <header className="mb-16">
          <p className="text-sm font-medium text-neon-purple mb-3">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/40 text-sm">
            Last updated: February 17, 2026
          </p>
        </header>

        <div className="space-y-12 text-white/60 leading-relaxed text-[15px]">
          {/* 1. Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to Sweezy (&quot;we,&quot; &quot;our,&quot; or
              &quot;us&quot;). This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our mobile
              application Sweezy (the &quot;App&quot;). Please read this Privacy
              Policy carefully. By using the App, you agree to the collection and
              use of information in accordance with this policy.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              2. Information We Collect
            </h2>

            <h3 className="text-base font-medium text-white/80 mb-2 mt-6">
              2.1 Information You Provide
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong className="text-white/80">Account Information:</strong>{" "}
                When you create an account, we may collect your name, email
                address, and profile preferences.
              </li>
              <li>
                <strong className="text-white/80">User Content:</strong>{" "}
                Checklist progress, bookmarks, and preferences you create within
                the App.
              </li>
            </ul>

            <h3 className="text-base font-medium text-white/80 mb-2 mt-6">
              2.2 Information Collected Automatically
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong className="text-white/80">Device Information:</strong>{" "}
                Device type, operating system version, unique device identifiers.
              </li>
              <li>
                <strong className="text-white/80">Usage Data:</strong> App
                interactions, feature usage, session duration, and crash reports.
              </li>
              <li>
                <strong className="text-white/80">Analytics:</strong> We use
                anonymized analytics to understand how users interact with the
                App and to improve our services.
              </li>
            </ul>
          </section>

          {/* 3. How We Use Your Information */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              3. How We Use Your Information
            </h2>
            <p className="mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>To provide, maintain, and improve the App</li>
              <li>To personalize your experience and save your progress</li>
              <li>
                To send you updates, notifications, and support communications
              </li>
              <li>
                To analyze usage patterns and improve our content and features
              </li>
              <li>To detect and prevent technical issues or abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          {/* 4. Data Sharing and Disclosure */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              4. Data Sharing and Disclosure
            </h2>
            <p className="mb-4">
              We do <strong className="text-white/80">not</strong> sell your
              personal data. We may share your information only in the following
              circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong className="text-white/80">Service Providers:</strong>{" "}
                With trusted third-party providers who assist us in operating the
                App (e.g., hosting, analytics), bound by confidentiality
                obligations.
              </li>
              <li>
                <strong className="text-white/80">Legal Requirements:</strong>{" "}
                When required by law, regulation, or legal process.
              </li>
              <li>
                <strong className="text-white/80">Safety:</strong> To protect
                the rights, property, or safety of Sweezy, our users, or others.
              </li>
            </ul>
          </section>

          {/* 5. Data Storage and Security */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              5. Data Storage and Security
            </h2>
            <p>
              Your data is stored securely using industry-standard encryption and
              security practices. We use secure servers and employ appropriate
              technical and organizational measures to protect your personal
              information. However, no method of transmission over the Internet
              or electronic storage is 100% secure, and we cannot guarantee
              absolute security.
            </p>
          </section>

          {/* 6. Your Rights */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              6. Your Rights
            </h2>
            <p className="mb-4">
              Depending on your location, you may have the following rights
              regarding your personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong className="text-white/80">Access:</strong> Request a
                copy of the personal data we hold about you.
              </li>
              <li>
                <strong className="text-white/80">Correction:</strong> Request
                correction of inaccurate or incomplete data.
              </li>
              <li>
                <strong className="text-white/80">Deletion:</strong> Request
                deletion of your personal data.
              </li>
              <li>
                <strong className="text-white/80">Portability:</strong> Request
                a portable copy of your data.
              </li>
              <li>
                <strong className="text-white/80">Objection:</strong> Object to
                the processing of your personal data.
              </li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:privacy@sweezy.app"
                className="text-neon-purple hover:text-neon-blue transition-colors underline underline-offset-4"
              >
                privacy@sweezy.app
              </a>
              .
            </p>
          </section>

          {/* 7. Data Retention */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              7. Data Retention
            </h2>
            <p>
              We retain your personal data only for as long as necessary to
              fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required or permitted by law. When your
              data is no longer needed, we will securely delete or anonymize it.
            </p>
          </section>

          {/* 8. Children's Privacy */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              8. Children&apos;s Privacy
            </h2>
            <p>
              The App is not intended for children under the age of 13. We do
              not knowingly collect personal data from children under 13. If you
              believe a child has provided us with personal data, please contact
              us and we will take steps to delete such information.
            </p>
          </section>

          {/* 9. Third-Party Services */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              9. Third-Party Services
            </h2>
            <p>
              The App may contain links to third-party websites or services
              (such as official government portals). We are not responsible for
              the privacy practices or content of these external services. We
              encourage you to review their privacy policies before providing
              any personal data.
            </p>
          </section>

          {/* 10. Changes to This Policy */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              10. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy within
              the App and updating the &quot;Last updated&quot; date. Your
              continued use of the App after such changes constitutes acceptance
              of the updated policy.
            </p>
          </section>

          {/* 11. Contact */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              11. Contact Us
            </h2>
            <p className="mb-4">
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us:
            </p>
            <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-6 space-y-2">
              <p>
                <strong className="text-white/80">Email:</strong>{" "}
                <a
                  href="mailto:privacy@sweezy.app"
                  className="text-neon-purple hover:text-neon-blue transition-colors underline underline-offset-4"
                >
                  privacy@sweezy.app
                </a>
              </p>
              <p>
                <strong className="text-white/80">Website:</strong>{" "}
                <Link
                  href="/"
                  className="text-neon-purple hover:text-neon-blue transition-colors underline underline-offset-4"
                >
                  sweezy.app
                </Link>
              </p>
            </div>
          </section>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-white/[0.04]">
        <div className="mx-auto max-w-4xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/20">
            &copy; {new Date().getFullYear()} Sweezy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/support"
              className="text-sm text-white/30 hover:text-white/60 transition-colors duration-300"
            >
              Support
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
