"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { APP_STORE_URL } from "../../lib/links";
import type { Locale } from "../../lib/i18n";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./SiteHeader.module.css";

const LABELS = {
  uk: {
    home: "Sweezy — на головну", tagline: "Твій DACH-гід", life: "Життя", explore: "Відкривай", community: "Спільнота", blog: "Блог", app: "Завантажити", menu: "Відкрити меню", close: "Закрити меню", navigation: "Головна навігація", language: "Мова сайту", light: "Увімкнути світлу тему", dark: "Увімкнути темну тему",
    lifeTitle: "Почувайся вдома.", lifeIntro: "Зрозумілі кроки для життя у Швейцарії.", guides: "Гіди по кантонах", guidesDesc: "Документи, страхування, перші кроки", jobs: "Робота у Швейцарії", jobsDesc: "Вакансії та нові можливості", services: "Українські послуги", servicesDesc: "Знайди своїх фахівців поруч", business: "Власний бізнес", businessDesc: "Як розпочати свою справу", starter: "Твій перший тиждень.", starterDesc: "Зібрали важливі кроки в одному стартовому наборі.", starterAction: "Забрати стартовий набір", free: "Безкоштовно · PDF",
    exploreTitle: "Більше, ніж краєвид.", exploreIntro: "Знайди привід для наступної маленької подорожі.", places: "Красиві місця", placesDesc: "Гори, озера та міста з історією", planning: "Планування подорожі", planningDesc: "Від ідеї до маршруту на день", wishlist: "Твій список мрій", wishlistDesc: "8 місць, які хочеться побачити", feature: "Швейцарія, яку варто побачити.", featureAction: "Відкрити мінігід", all: "Разом зі Sweezy", communityDesc: "Обмін досвідом та свої люди", blogDesc: "Корисні відповіді й нові історії", mobileTitle: "Куди вирушаємо?",
  },
  en: {
    home: "Sweezy — home", tagline: "Your DACH guide", life: "Live here", explore: "Explore", community: "Community", blog: "Journal", app: "Get Sweezy", menu: "Open menu", close: "Close menu", navigation: "Primary navigation", language: "Site language", light: "Switch to light theme", dark: "Switch to dark theme",
    lifeTitle: "Make yourself at home.", lifeIntro: "Clear steps for your life in Switzerland.", guides: "Cantonal guides", guidesDesc: "Paperwork, insurance and first steps", jobs: "Work in Switzerland", jobsDesc: "Jobs and new opportunities", services: "Ukrainian services", servicesDesc: "Find local professionals", business: "Your own business", businessDesc: "Start building your next chapter", starter: "Your first week, sorted.", starterDesc: "The essential first steps, together in one starter kit.", starterAction: "Get the starter kit", free: "Free guide · PDF",
    exploreTitle: "More than a pretty view.", exploreIntro: "Find a reason for your next little adventure.", places: "Beautiful places", placesDesc: "Mountains, lakes and historic towns", planning: "Travel planning", planningDesc: "Turn an idea into a day out", wishlist: "Your Swiss wish list", wishlistDesc: "8 places you will want to see", feature: "Switzerland, worth exploring.", featureAction: "Open the mini guide", all: "Together with Sweezy", communityDesc: "Shared experiences and your people", blogDesc: "Useful answers and fresh stories", mobileTitle: "Where shall we go?",
  },
  de: {
    home: "Sweezy — Startseite", tagline: "Dein DACH-Guide", life: "Leben", explore: "Entdecken", community: "Community", blog: "Journal", app: "App laden", menu: "Menü öffnen", close: "Menü schließen", navigation: "Hauptnavigation", language: "Sprache der Website", light: "Helles Design aktivieren", dark: "Dunkles Design aktivieren",
    lifeTitle: "Fühl dich zu Hause.", lifeIntro: "Klare Schritte für dein Leben in der Schweiz.", guides: "Kantonale Ratgeber", guidesDesc: "Dokumente, Versicherung und erste Schritte", jobs: "Arbeiten in der Schweiz", jobsDesc: "Jobs und neue Möglichkeiten", services: "Ukrainische Dienstleistungen", servicesDesc: "Fachleute in deiner Nähe finden", business: "Dein eigenes Unternehmen", businessDesc: "Dein nächstes Kapitel beginnt hier", starter: "Deine erste Woche.", starterDesc: "Die wichtigsten ersten Schritte in einem Startpaket.", starterAction: "Startpaket mitnehmen", free: "Kostenloser Guide · PDF",
    exploreTitle: "Mehr als eine schöne Aussicht.", exploreIntro: "Finde einen Anlass für dein nächstes kleines Abenteuer.", places: "Schöne Orte", placesDesc: "Berge, Seen und historische Städte", planning: "Reiseplanung", planningDesc: "Von der Idee zum Tagesausflug", wishlist: "Deine Schweizer Wunschliste", wishlistDesc: "8 Orte, die du sehen möchtest", feature: "Die Schweiz wartet auf dich.", featureAction: "Mini-Guide öffnen", all: "Zusammen mit Sweezy", communityDesc: "Erfahrungen teilen, Menschen finden", blogDesc: "Hilfreiche Antworten und neue Geschichten", mobileTitle: "Wohin geht’s als Nächstes?",
  },
} as const;

type MenuItem = { href: string; label: string; description: string };
type Panel = "life" | "explore" | "mobile" | null;

function Arrow({ down = false }: { down?: boolean }) {
  return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d={down ? "m6 8 4 4 4-4" : "M5 15 15 5M5 5h10v10"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function SiteHeader() {
  const pathname = usePathname() || "/en";
  const segment = pathname.split("/")[1];
  const locale: Locale = segment === "uk" || segment === "de" ? segment : "en";
  const c = LABELS[locale];
  const home = `/${locale}`;
  const [open, setOpen] = useState<Panel>(null);
  const [compact, setCompact] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const close = () => setOpen(null);
  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const life: MenuItem[] = [
    { href: `${home}/countries`, label: "DACH", description: locale === "uk" ? "Швейцарія · Німеччина · Австрія" : locale === "de" ? "Schweiz · Deutschland · Österreich" : "Switzerland · Germany · Austria" },
    { href: `${home}/resources`, label: locale === "uk" ? "Безкоштовні PDF" : locale === "de" ? "Kostenlose PDFs" : "Free PDF checklists", description: locale === "uk" ? "Переїзд і бізнес: оберіть країну" : locale === "de" ? "Umzug und Gründung: Land wählen" : "Moving and business: choose your country" },
    { href: `${home}/guides`, label: c.guides, description: c.guidesDesc },
    { href: `${home}/jobs`, label: c.jobs, description: c.jobsDesc },
    ...(locale === "uk" ? [
      { href: "/uk/services", label: c.services, description: c.servicesDesc },
      { href: "/uk/blog/biznes-u-shveytcariyi-dlya-ukrayintsiv", label: c.business, description: c.businessDesc },
    ] : []),
  ];
  const explore: MenuItem[] = [
    { href: `${home}/places`, label: c.places, description: c.placesDesc },
    { href: `${home}/planning`, label: c.planning, description: c.planningDesc },
    { href: `${home}/swiss-bucket-list`, label: c.wishlist, description: c.wishlistDesc },
  ];
  const starter = `${home}/starter-kit`;
  const wishlist = `${home}/swiss-bucket-list`;
  const business = "/uk/blog/biznes-u-shveytcariyi-dlya-ukrayintsiv";
  const lifeActive = life.some(item => active(item.href)) || active(starter);
  const exploreActive = explore.some(item => active(item.href));

  useEffect(() => setOpen(null), [pathname]);
  useEffect(() => {
    let frame: number | null = null;
    const update = () => {
      frame = null;
      setCompact(previous => window.scrollY > 96 ? true : window.scrollY < 24 ? false : previous);
    };
    const scroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(null);
        triggerRef.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(null);
    };
    const breakpoint = window.matchMedia("(max-width: 1120px)");
    const resize = () => setOpen(null);
    document.addEventListener("keydown", keydown);
    document.addEventListener("pointerdown", outside);
    breakpoint.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("pointerdown", outside);
      breakpoint.removeEventListener("change", resize);
    };
  }, [open]);

  function toggle(panel: Exclude<Panel, null>, button: HTMLButtonElement) {
    triggerRef.current = button;
    setOpen(value => value === panel ? null : panel);
  }

  function menuLink(item: MenuItem, index: number) {
    return <Link key={item.href} href={item.href} className={styles.menuLink} onClick={close} aria-current={pathname === item.href ? "page" : undefined}>
      <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
      <span><strong>{item.label}</strong><small>{item.description}</small></span><Arrow />
    </Link>;
  }

  function feature(kind: "life" | "explore") {
    return kind === "explore" ? <Link href={wishlist} onClick={close} className={styles.travelFeature}>
      <Image src="/destinations/swiss-discovery-oeschinen-2.webp" alt="" fill sizes="(max-width: 1120px) 1px, 340px" />
      <span className={styles.featureBadge}>{c.free}</span>
      <span className={styles.featureCopy}><strong>{c.feature}</strong><span>{c.featureAction}<Arrow /></span></span>
    </Link> : <Link href={starter} onClick={close} className={styles.starterFeature}>
      <span className={styles.featureBadge}>{c.free}</span>
      <span className={styles.miniChecklist} aria-hidden="true"><span>✓</span><span>✓</span><span /></span>
      <strong>{c.starter}</strong><p>{c.starterDesc}</p><span className={styles.featureAction}>{c.starterAction}<Arrow /></span>
    </Link>;
  }

  return <header id="site-header" ref={headerRef} className={styles.header} data-compact={compact} onBlur={event => {
    if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) close();
  }}>
    {open && <button type="button" className={styles.scrim} onClick={close} tabIndex={-1} aria-label={c.close} />}
    <div className={styles.bar}>
      <Link href={home} className={styles.brand} aria-label={c.home} onClick={close}>
        <Image src="/brand/sweezy-mark.svg" alt="" width={40} height={40} priority />
        <span><strong>Sweezy</strong><small>{c.tagline}<span aria-hidden="true">＋</span></small></span>
      </Link>
      <nav className={styles.nav} aria-label={c.navigation}>
        {(["life", "explore"] as const).map(kind => <div key={kind} className={styles.navItem}>
          <button type="button" className={styles.navTrigger} aria-expanded={open === kind} aria-controls={`header-${kind}-panel`} data-active={kind === "life" ? lifeActive : exploreActive} onClick={event => toggle(kind, event.currentTarget)}>{c[kind]}<Arrow down /></button>
          <div id={`header-${kind}-panel`} className={styles.panel} hidden={open !== kind}>
            <div className={styles.panelDirectory}><p className={styles.panelEyebrow}>SWEEZY / {kind === "life" ? "01" : "02"}</p><h2>{kind === "life" ? c.lifeTitle : c.exploreTitle}</h2><p className={styles.panelIntro}>{kind === "life" ? c.lifeIntro : c.exploreIntro}</p><div className={styles.panelLinks}>{(kind === "life" ? life : explore).map(menuLink)}</div></div>
            {feature(kind)}
          </div>
        </div>)}
        <Link href={`${home}/countries`} onClick={close} className={styles.directLink} aria-current={active(`${home}/countries`) ? "page" : undefined}>DACH</Link>
        <Link href={`${home}/blog`} onClick={close} className={styles.directLink} aria-current={active(`${home}/blog`) && pathname !== business ? "page" : undefined}>{c.blog}</Link>
      </nav>
      <div className={styles.actions}>
        <nav className={styles.languages} aria-label={c.language}>
          {(["uk", "en", "de"] as const).map(item => <Link key={item} href={/^\/(uk|en|de)\/(countries(?:\/.*)?|resources)$/.test(pathname) ? pathname.replace(/^\/(uk|en|de)/, `/${item}`) : `/${item}`} hrefLang={item} lang={item} data-selected={item === locale} aria-label={item === "uk" ? "Українська" : item === "de" ? "Deutsch" : "English"} onClick={close}>{item === "uk" ? "UA" : item.toUpperCase()}</Link>)}
        </nav>
        <ThemeToggle className={styles.themeToggle} labels={{ light: c.light, dark: c.dark }} />
        <a className={styles.app} href={APP_STORE_URL} target="_blank" rel="noreferrer noopener">{c.app}<span><Arrow /></span></a>
        <button className={styles.menuButton} type="button" onClick={event => toggle("mobile", event.currentTarget)} aria-label={open === "mobile" ? c.close : c.menu} aria-expanded={open === "mobile"} aria-controls="site-mobile-menu"><span data-open={open === "mobile"}><i /><i /></span></button>
      </div>
      <nav id="site-mobile-menu" className={styles.mobile} hidden={open !== "mobile"} aria-label={c.navigation}>
        <p className={styles.mobileTitle}>{c.mobileTitle}</p>
        <div className={styles.mobileGroups}>
          <section><h2>{c.life}</h2>{life.map(menuLink)}<Link href={starter} onClick={close} className={styles.mobileStarter}>{c.starterAction}<Arrow /></Link></section>
          <section><h2>{c.explore}</h2>{explore.map(menuLink)}</section>
          <section className={styles.mobileTogether}><h2>{c.all}</h2>{[
            { href: `${home}/community`, label: c.community, description: c.communityDesc },
            { href: `${home}/blog`, label: c.blog, description: c.blogDesc },
          ].map(menuLink)}</section>
        </div>
        <a className={styles.mobileApp} href={APP_STORE_URL} target="_blank" rel="noreferrer noopener">{c.app}<Arrow /></a>
      </nav>
    </div>
  </header>;
}
