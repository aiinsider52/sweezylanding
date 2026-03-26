"use client";

import Link from "next/link";
import { useLocale } from "../../lib/locale-context";
import { APP_STORE_URL, INSTAGRAM_URL } from "../../lib/links";
import { BrandLogo } from "./BrandLogo";

function FooterLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const isExternal = href.startsWith("http");
  const isMail = href.startsWith("mailto:");
  const isPlaceholder = href === "#";

  if (isExternal || isMail || isPlaceholder) {
    return (
      <a
        href={href}
        className={className}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer noopener" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function SiteFooter({ year }: { year: number }) {
  const { t, locale } = useLocale();
  const localeHome = `/${locale}`;
  const localeGuides = `/${locale}/guides`;
  const localeBlog = `/${locale}/blog`;

  const columns = [
    {
      title: t("footer.product"),
      links: [
        { label: t("footer.features"), href: `${localeHome}#features` },
        { label: t("footer.howItWorks"), href: `${localeHome}#how-it-works` },
        { label: "Guides", href: localeGuides },
        { label: t("footer.download"), href: APP_STORE_URL },
      ],
    },
    {
      title: t("footer.resources"),
      links: [
        { label: t("footer.support"), href: "/support" },
        { label: t("footer.faqLink"), href: `${localeHome}#faq` },
        { label: t("footer.contact"), href: "mailto:support@sweezy.world" },
        { label: t("footer.blog"), href: localeBlog },
      ],
    },
    {
      title: t("footer.legal"),
      links: [
        { label: t("footer.privacy"), href: "/privacy" },
        { label: t("footer.terms"), href: "/terms" },
        { label: t("footer.cookies"), href: "/cookies" },
      ],
    },
  ];

  return (
    <footer className="relative">
      {/* Top gradient accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-green/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href={localeHome} className="flex items-center gap-2.5 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-green/15 to-accent-emerald/10 border border-white/[0.06]">
                <BrandLogo variant="mark" className="h-8 w-8 object-cover" />
              </div>
              <span className="text-xl font-bold tracking-tight">Sweezy</span>
            </Link>
            <p className="text-white/40 text-[15px] leading-relaxed max-w-xs mb-4">
              {t("footer.tagline")}
            </p>
            <a
              href="https://www.aiinsider.it.com"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 mb-6 text-xs text-white/25 hover:text-accent-green/70 transition-colors duration-300 group"
            >
              <span className="h-4 w-4 rounded-md bg-gradient-to-br from-accent-green/60 to-accent-emerald/40 flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">AI</span>
              </span>
              A product by AI Insider
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="opacity-40 group-hover:opacity-70 transition-opacity">
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {/* X / Twitter */}
              <a
                href="#"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 text-white/40 hover:text-white"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href={INSTAGRAM_URL}
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer noopener"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 text-white/40 hover:text-white"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 text-white/40 hover:text-white"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink
                      href={link.href}
                      className="text-[15px] text-white/35 hover:text-white/70 transition-colors duration-300"
                    >
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter column */}
          <div className="lg:col-span-4 md:col-span-2 lg:col-start-9">
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6">
              <h4 className="text-sm font-semibold mb-2">
                {t("footer.newsletter")}
              </h4>
              <p className="text-sm text-white/35 mb-4">
                {t("footer.newsletterDesc")}
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder")}
                  className="flex-1 rounded-xl bg-white/[0.05] border border-white/[0.08] px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-accent-green/40 transition-colors duration-300"
                />
                <button className="rounded-xl bg-gradient-to-r from-accent-green to-accent-emerald px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity duration-300 whitespace-nowrap">
                  {t("footer.subscribe")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/20">
            &copy; {year} Sweezy. {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-1.5 text-sm text-white/20">
            <span>{t("footer.madeWith")}</span>
            <span>·</span>
            <a
              href="https://www.aiinsider.it.com"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-accent-green/60 transition-colors duration-300"
            >
              AI Insider
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

