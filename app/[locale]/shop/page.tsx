import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "../../../lib/blog";
import { BASE_URL, buildLocaleAlternates } from "../../../lib/alternates";
import { imageObject } from "../../../lib/image-schema";
import { ENTITY_IDS } from "../../../lib/entities";
import { SHOP_PRODUCTS, productCardImage, productImageAlt } from "../../../data/shop";
import { SHOP_COPY } from "../../../data/shop-copy";
import { Breadcrumb } from "../../components/Breadcrumb";
import { ShopCatalog } from "../../components/shop/ShopCatalog";
import { JsonLd } from "../../components/seo/JsonLd";
import styles from "./shop.module.css";

export function generateStaticParams() { return ["uk", "en", "de"].map(locale => ({ locale })); }
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const c = SHOP_COPY[params.locale];
  const p = SHOP_PRODUCTS[0];
  const images = [{ url: productCardImage(p), width: 1200, height: 1200, alt: productImageAlt(p, params.locale, true) }];
  return { title: c.meta, description: c.description, alternates: buildLocaleAlternates(params.locale, "/shop"),
    openGraph: { title: c.meta, description: c.description, url: `${BASE_URL}/${params.locale}/shop`, type: "website", images },
    twitter: { card: "summary_large_image", title: c.meta, description: c.description, images },
  };
}

export default function ShopPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const c = SHOP_COPY[locale];
  const url = `${BASE_URL}/${locale}/shop`;
  const heroProducts = [SHOP_PRODUCTS[0], SHOP_PRODUCTS[1], SHOP_PRODUCTS[5]];
  return <main className={styles.page}>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: c.meta, description: c.description, inLanguage: locale,
      isPartOf: { "@id": ENTITY_IDS.website }, publisher: { "@id": ENTITY_IDS.organization },
      primaryImageOfPage: imageObject(productCardImage(heroProducts[0]), productImageAlt(heroProducts[0], locale, true), locale),
      mainEntity: { "@type": "ItemList", numberOfItems: SHOP_PRODUCTS.length, itemListElement: SHOP_PRODUCTS.map((product, index) => ({ "@type": "ListItem", position: index + 1, name: product.copy[locale].name, url: `${url}/${product.slug}` })) },
    }} />
    <Breadcrumb items={[{ name: c.home, url: `/${locale}` }, { name: c.name, url: `/${locale}/shop` }]} />
    <section className={styles.hero} aria-labelledby="shop-title">
      <div><p className={styles.eyebrow}>{c.eyebrow}</p><h1 id="shop-title">{c.title}<em>{c.accent}</em></h1><p className={styles.heroIntro}>{c.intro}</p><div className={styles.actions}><a className={styles.primary} href="#collection">{c.browse}<span aria-hidden="true">↗</span></a><a className={styles.textButton} href="#how-it-works">{c.how}</a></div></div>
      <div className={styles.heroArt}>{heroProducts.map((product, index) => <Link key={product.slug} href={`/${locale}/shop/${product.slug}`}><Image src={productCardImage(product)} alt={productImageAlt(product, locale, true)} fill sizes="(max-width: 600px) 190px, 26vw" priority={index === 0}/><span className={styles.srOnly}>{c.ai}</span></Link>)}<span className={styles.heroStamp}>SWISS EDIT / 2026 · AI</span></div>
    </section>
    <div className={styles.launch}><strong>{c.launch}</strong><p>{c.launchNote}</p></div>
    <ShopCatalog locale={locale} />
    <section id="how-it-works" className={styles.process} aria-labelledby="process-heading"><p className={styles.eyebrow}>{c.how}</p><h2 id="process-heading">{c.processTitle}</h2><div className={styles.steps}>{c.steps.map(([title, body], index) => <div className={styles.step} key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p></div>)}</div></section>
    <section className={styles.faq} aria-labelledby="shop-faq"><h2 id="shop-faq">{c.faqTitle}</h2><div>{c.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
  </main>;
}
