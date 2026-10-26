import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "../../../lib/blog";
import { BASE_URL, buildLocaleAlternates } from "../../../lib/alternates";
import { DEFAULT_OG_IMAGE } from "../../../lib/social";
import { PARTNER_EMAIL, PARTNER_FORMATS, partnerCopy, partnerEmailHref } from "../../../data/partners";
import { JsonLd } from "../../components/seo/JsonLd";
import { SweezyCompanion } from "../../components/SweezyCompanion";
import styles from "./partners.module.css";

export function generateStaticParams() { return ["uk", "en", "de"].map(locale => ({ locale })); }

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const c = partnerCopy[params.locale];
  const title = `${c.title} | Sweezy`;
  return {
    title, description: c.description, alternates: buildLocaleAlternates(params.locale, "/partners"),
    openGraph: { title, description: c.description, url: `${BASE_URL}/${params.locale}/partners`, type: "website", images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description: c.description, images: [DEFAULT_OG_IMAGE] },
  };
}

export default function Partners({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale, c = partnerCopy[locale];
  return <main lang={locale} className={styles.main}>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: c.title, description: c.description, url: `${BASE_URL}/${locale}/partners`, inLanguage: locale }} />
    <div className={styles.shell}>
      <nav className={styles.breadcrumb} aria-label={c.home}><Link href={`/${locale}`}>{c.home}</Link><span aria-hidden="true">/</span><span aria-current="page">{c.eyebrow}</span></nav>
      <header className={styles.hero}>
        <div><p className={styles.eyebrow}>{c.eyebrow}</p><h1>{c.title}</h1><p className={styles.lead}>{c.intro}</p><div className={styles.actions}><a href="#contact" className={styles.button}>{c.cta} ↗</a><Link href="/uk/services" className={styles.textLink}>{c.browse} →</Link></div></div>
        <div className={styles.art}><SweezyCompanion pose="greeting" className={styles.mascot} sizes="(max-width: 760px) 160px, 240px" /><span>SWEEZY / CH · DE · AT</span></div>
      </header>
      <p className={styles.scope}>{c.scope}</p>
      <section className={styles.section} aria-labelledby="formats-title"><h2 id="formats-title">{c.formatsTitle}</h2><div className={styles.formats}>
        {c.formats.map((format, index) => <article className={styles.format} key={PARTNER_FORMATS[index]}>
          <p className={styles.label}>{format.label}</p><h3>{format.title}</h3><p>{format.body}</p>
          <a href={partnerEmailHref(locale, PARTNER_FORMATS[index])} data-partner-contact={PARTNER_FORMATS[index]} data-placement="partner-formats" className={styles.textLink}>{format.action} ↗</a>
        </article>)}
      </div></section>
      <section className={styles.section} aria-labelledby="process-title"><h2 id="process-title">{c.processTitle}</h2><ol className={styles.steps}>{c.steps.map((step, index) => <li key={step.title}><span className={styles.number}>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol></section>
      <section className={styles.principles}><h2>{c.principlesTitle}</h2><ul>{c.principles.map(item => <li key={item}>{item}</li>)}</ul></section>
      <section className={styles.section} aria-labelledby="faq-title"><h2 id="faq-title">{c.faqTitle}</h2><div className={styles.faq}>{c.faq.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>
      <section id="contact" className={styles.contact} aria-labelledby="contact-title"><div><p className={styles.eyebrow}>SWEEZY / LET’S TALK</p><h2 id="contact-title">{c.contactTitle}</h2><p>{c.contactBody}</p></div><div><a href={partnerEmailHref(locale)} data-partner-contact="general" data-placement="partner-contact" className={styles.button}>{c.cta} ↗</a><p className={styles.emailNote}>{c.emailNote}</p><p className={styles.emailNote}>{c.fallback} <a href={`mailto:${PARTNER_EMAIL}`} data-partner-contact="general" data-placement="partner-fallback" className={styles.textLink}>{PARTNER_EMAIL}</a></p></div></section>
    </div>
  </main>;
}
