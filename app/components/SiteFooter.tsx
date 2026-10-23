"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "../../lib/locale-context";
import { translations, type Locale } from "../../lib/i18n";
import { APP_STORE_URL, FACEBOOK_COMMUNITY_URL, INSTAGRAM_URL, TELEGRAM_URL } from "../../lib/links";
import { SEO_CLUSTERS } from "../../data/seo-clusters";
import { BrandLogo } from "./BrandLogo";
import { SweezyCompanion } from "./SweezyCompanion";
import styles from "./SiteFooter.module.css";

const copy = {
  uk: {
    eyebrow: "Твій супутник у DACH", title: "Почувайся вдома.", accent: "Твій наступний крок.",
    intro: "Від перших документів до місць, які захоплюють подих. Ідемо разом?", app: "Завантажити Sweezy", kit: "8 місць для списку мрій", free: "Безкоштовний PDF", farewell: "До нових відкриттів!", discover: "Відкривай", settle: "Почувайся вдома", together: "Залишаймося поруч", guides: "Гіди по кантонах", places: "Красиві місця", planning: "Планування подорожі", jobs: "Вакансії", postJob: "Розмістити вакансію", starter: "Перший тиждень: стартовий набір", community: "Спільнота Sweezy", editorial: "Редакційні стандарти", note: "Менше невідомого. Більше свого.", made: "Створено у Швейцарії", top: "Нагору", social: "Знайди своїх", legal: "Юридична інформація", navigation: "Навігація сайтом",
  },
  en: {
    eyebrow: "Your companion across DACH", title: "Feel at home.", accent: "Your next chapter.",
    intro: "From your first paperwork to places that take your breath away. Shall we?", app: "Get Sweezy", kit: "8 places for your wish list", free: "Free PDF guide", farewell: "See you out there!", discover: "Go explore", settle: "Feel at home", together: "Stay in touch", guides: "Cantonal guides", places: "Beautiful places", planning: "Travel planning", jobs: "Jobs", postJob: "Post a vacancy", starter: "Your first week: starter kit", community: "Sweezy community", editorial: "Editorial standards", note: "Less unfamiliar. More like home.", made: "Made in Switzerland", top: "Back to top", social: "Find your people", legal: "Legal information", navigation: "Site navigation",
  },
  de: {
    eyebrow: "Dein Begleiter in DACH", title: "Fühl dich zu Hause.", accent: "Dein nächstes Kapitel.",
    intro: "Von den ersten Formularen bis zu Orten, die den Atem rauben. Kommst du mit?", app: "Sweezy herunterladen", kit: "8 Orte für deine Wunschliste", free: "Kostenloser PDF-Guide", farewell: "Bis zum nächsten Abenteuer!", discover: "Geh auf Entdeckung", settle: "Fühl dich zu Hause", together: "Bleiben wir in Kontakt", guides: "Kantonale Ratgeber", places: "Schöne Orte", planning: "Reiseplanung", jobs: "Jobs", postJob: "Stelle veröffentlichen", starter: "Deine erste Woche: Startpaket", community: "Sweezy Community", editorial: "Redaktionelle Standards", note: "Weniger fremd. Mehr zu Hause.", made: "In der Schweiz entwickelt", top: "Nach oben", social: "Finde deine Community", legal: "Rechtliche Informationen", navigation: "Seitennavigation",
  },
} satisfies Record<Locale, Record<string, string>>;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-7-7 7 7-7 7"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function FooterLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  if (href.startsWith("http") || href.startsWith("mailto:")) {
    const external = href.startsWith("http");
    return <a href={href} className={className} target={external ? "_blank" : undefined} rel={external ? "noreferrer noopener" : undefined}>{children}</a>;
  }
  return <Link href={href} className={className}>{children}</Link>;
}

export function SiteFooter({ year }: { year: number }) {
  const { locale: preferredLocale } = useLocale();
  const segment = usePathname()?.split("/")[1];
  const locale: Locale = segment === "uk" || segment === "en" || segment === "de" ? segment : preferredLocale;
  const c = copy[locale];
  const t = translations[locale].footer as Record<string, string>;
  const home = `/${locale}`;
  const discover = [
    { label: "DACH · CH / DE / AT", href: `${home}/countries` },
    { label: locale === "uk" ? "Безкоштовні PDF" : locale === "de" ? "Kostenlose PDFs" : "Free PDF checklists", href: `${home}/resources` },
    { label: c.places, href: `${home}/places` },
    { label: c.planning, href: `${home}/planning` },
    { label: c.guides, href: `${home}/guides` },
    { label: t.blog, href: `${home}/blog` },
    { label: c.jobs, href: `${home}/jobs` },
    { label: c.postJob, href: `${home}/jobs/post` },
  ];
  const columns = [
    { title: c.discover, links: discover },
    { title: c.settle, links: [
      ...SEO_CLUSTERS[locale].filter(cluster => cluster.key !== "places" && cluster.key !== "community" && !discover.some(link => link.href === cluster.href)).map(cluster => ({ label: cluster.title, href: cluster.href })),
      { label: c.starter, href: `${home}/starter-kit` },
    ] },
    { title: c.together, links: [
      { label: c.community, href: `${home}/community` },
      { label: t.support, href: "/support" },
      { label: t.faqLink, href: `${home}#faq` },
      { label: c.editorial, href: `${home}/editorial` },
      { label: "support@sweezy.world", href: "mailto:support@sweezy.world" },
    ] },
  ];

  return <footer id="site-footer" className={styles.footer}>
    <div className={styles.shell}>
      <div className={styles.invitation}>
        <div className={styles.invitationCopy}>
          <p className={styles.eyebrow}><span className={styles.swissCross} aria-hidden="true" />{c.eyebrow}</p>
          <h2>{c.title}<br /><em>{c.accent}</em></h2>
          <p className={styles.intro}>{c.intro}</p>
          <div className={styles.actions}>
            <FooterLink href={APP_STORE_URL} className={styles.appLink}>{c.app}<span><Arrow diagonal /></span></FooterLink>
            <Link href={`${home}/swiss-bucket-list`} className={styles.kitLink}><span><small>{c.free}</small>{c.kit}</span><Arrow diagonal /></Link>
          </div>
        </div>
        <div className={styles.character}>
          <div className={styles.orbit} aria-hidden="true"><span /><span /></div>
          <span className={styles.farewell}>{c.farewell}<svg viewBox="0 0 30 20" fill="none" aria-hidden="true"><path d="M2 2c0 12 10 14 23 10m-5-5 6 5-4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          <SweezyCompanion pose="greeting" className={styles.mascot} sizes="(max-width: 640px) 280px, 380px" />
          <span className={styles.passport} aria-hidden="true">SWEEZY EXPLORER<span>DE / AT / CH</span></span>
        </div>
      </div>

      <div className={styles.directory}>
        <div className={styles.brandColumn}>
          <Link href={home} className={styles.brand}><BrandLogo variant="mark" className={styles.logo} /><span>Sweezy</span></Link>
          <p>{c.note}</p>
          <div className={styles.productLinks}><Link href={`${home}#product`}>{t.features}</Link><Link href={`${home}#method`}>{t.howItWorks}</Link></div>
          <p className={styles.socialLabel}>{c.social}</p>
          <div className={styles.socials}>
            <FooterLink href={INSTAGRAM_URL} className={styles.social}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg><span className={styles.srOnly}>Instagram</span>
            </FooterLink>
            <FooterLink href={TELEGRAM_URL} className={styles.social}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m3 10 17-6-3 16-6-5-3 3v-6l8-5-10 5-3-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg><span className={styles.srOnly}>Telegram</span>
            </FooterLink>
            <FooterLink href={FACEBOOK_COMMUNITY_URL} className={styles.social}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 21v-8h3l.5-4H14V7c0-1 .3-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg><span className={styles.srOnly}>Facebook</span>
            </FooterLink>
          </div>
        </div>
        <nav className={styles.navigation} aria-label={c.navigation}>
          {columns.map(column => <div key={column.title} className={styles.column}>
            <h3>{column.title}</h3><ul>{column.links.map(link => <li key={link.href}><FooterLink href={link.href}>{link.label}</FooterLink></li>)}</ul>
          </div>)}
        </nav>
      </div>

      <div className={styles.signature}>
        <p><span className={styles.swissCross} aria-hidden="true" />{c.made}<span className={styles.credit}> / <FooterLink href="https://www.aiinsider.it.com">AI Insider <Arrow diagonal /></FooterLink></span></p>
        <a href="#" className={styles.backTop}>{c.top}<span><Arrow /></span></a>
      </div>
      <div className={styles.wordmark} aria-hidden="true">Sweezy<span>✳</span></div>
      <div className={styles.bottom}>
        <p>© {year} Sweezy. {t.copyright}</p>
        <nav aria-label={c.legal}><Link href="/privacy">{t.privacy}</Link><Link href="/terms">{t.terms}</Link><Link href="/cookies">{t.cookies}</Link></nav>
      </div>
    </div>
  </footer>;
}
