"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  if (isExternal || isMail) {
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
  const pathname = usePathname();
  const localeHome = `/${locale}`;
  const localeGuides = `/${locale}/guides`;
  const localeBlog = `/${locale}/blog`;
  const guidesLabel = locale === "uk" ? "Гіди" : locale === "de" ? "Ratgeber" : "Guides";

  const columns = [
    {
      title: t("footer.product"),
      links: [
        { label: t("footer.features"), href: `${localeHome}#product` },
        { label: t("footer.howItWorks"), href: `${localeHome}#method` },
        { label: guidesLabel, href: localeGuides },
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
        ...(locale === "uk"
          ? [{ label: "Українцям у Швейцарії", href: "/uk/blog/status-s-shveytcariya-povnyy-gid" }]
          : []),
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

  if (/^\/(en|uk|de)\/?$/.test(pathname)) return null;

  return (
    <footer className="relative">
      {/* Top gradient accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-green/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-3">
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
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-3">
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
