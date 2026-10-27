import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "../../../lib/blog";
import { BASE_URL, buildLocaleAlternates } from "../../../lib/alternates";
import { imageObject } from "../../../lib/image-schema";
import { ENTITY_IDS } from "../../../lib/entities";
import { SHOP_PRODUCTS, productCardImage, productImage, productImageAlt, shopProduct } from "../../../data/shop";
import { SHOP_COPY } from "../../../data/shop-copy";
import { shopStory } from "../../../data/shop-stories";
import { Breadcrumb } from "../../components/Breadcrumb";
import { ShopCatalog } from "../../components/shop/ShopCatalog";
import { JsonLd } from "../../components/seo/JsonLd";
import styles from "./shop.module.css";

export function generateStaticParams() { return ["uk", "en", "de"].map(locale => ({ locale })); }
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const c = SHOP_COPY[params.locale];
  const p = SHOP_PRODUCTS[0];
  const images = [{ url: productCardImage(p), width: 1200, height: 1200, alt: productImageAlt(p, params.locale) }];
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
  const [heroMain, heroMug, heroCap] = ["swiss-lake-tote", "switzerland-calling-mug", "switzerland-cap"].map(slug => shopProduct(slug)!);
  const featured = shopProduct("swiss-weekender-bag")!;
  const featuredStory = shopStory(featured.slug, locale)!;
  return <main className={styles.page}>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: c.meta, description: c.description, inLanguage: locale,
      isPartOf: { "@id": ENTITY_IDS.website }, publisher: { "@id": ENTITY_IDS.organization },
      primaryImageOfPage: imageObject(productCardImage(SHOP_PRODUCTS[0]), productImageAlt(SHOP_PRODUCTS[0], locale), locale),
      mainEntity: { "@type": "ItemList", numberOfItems: SHOP_PRODUCTS.length, itemListElement: SHOP_PRODUCTS.map((product, index) => ({ "@type": "ListItem", position: index + 1, name: product.copy[locale].name, url: `${url}/${product.slug}` })) },
    }} />
    <Breadcrumb items={[{ name: c.home, url: `/${locale}` }, { name: c.name, url: `/${locale}/shop` }]} />
    <section className={styles.hero} aria-labelledby="shop-title">
      <div className={styles.heroCopy}>
        <p className={styles.heroBadge}><span aria-hidden="true" />{c.launch}</p>
        <h1 id="shop-title">{c.title}<em>{c.accent}</em></h1>
        <p className={styles.heroIntro}>{c.intro}</p>
        <div className={styles.actions}><a className={styles.primary} href="#collection">{c.browse}<span aria-hidden="true">↗</span></a><a className={styles.textButton} href="#how-it-works">{c.how}</a></div>
        <dl className={styles.heroStats}>{c.stats.map(([value, label]) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}</dl>
      </div>
      <div className={styles.heroArt}>
        <Link href={`/${locale}/shop/${heroMain.slug}`} className={styles.heroMain}>
          <Image src={productImage(heroMain, "lifestyle")} alt={productImageAlt(heroMain, locale, "lifestyle")} fill sizes="(max-width: 900px) 92vw, 44vw" priority />
          <span className={styles.heroCaption}><small>{c.categories[heroMain.category]}</small>{heroMain.copy[locale].name}<span aria-hidden="true">↗</span></span>
        </Link>
        <Link href={`/${locale}/shop/${heroMug.slug}`} className={`${styles.heroFloat} ${styles.heroFloatA}`}>
          <Image src={productImage(heroMug, "studio")} alt={productImageAlt(heroMug, locale)} fill sizes="200px" />
        </Link>
        <Link href={`/${locale}/shop/${heroCap.slug}`} className={`${styles.heroFloat} ${styles.heroFloatB}`}>
          <Image src={productImage(heroCap, "studio")} alt={productImageAlt(heroCap, locale)} fill sizes="180px" />
        </Link>
        <span className={styles.heroStamp} aria-hidden="true">SWISS<br />EDIT<br /><b>2026</b></span>
      </div>
    </section>
    <div className={styles.ticker} aria-hidden="true"><div>{[0, 1].map(copy => <span key={copy}>{c.ticker.map(word => <span key={word}>{word}<i>✦</i></span>)}</span>)}</div></div>
    <ShopCatalog locale={locale} />
    <section className={styles.featured} aria-labelledby="featured-title">
      <Link href={`/${locale}/shop/${featured.slug}`} className={styles.featuredImage}>
        <Image src={productImage(featured, "lifestyle")} alt={productImageAlt(featured, locale, "lifestyle")} fill sizes="(max-width: 900px) 92vw, 50vw" />
      </Link>
      <div className={styles.featuredCopy}>
        <p className={styles.eyebrow}>{c.featured} · {c.categories[featured.category]}</p>
        <h2 id="featured-title">{featured.copy[locale].name}</h2>
        <p className={styles.featuredTagline}>{featuredStory.tagline}</p>
        <p>{featuredStory.story}</p>
        <ul className={styles.chips}>{featuredStory.moments.map(moment => <li key={moment}>{moment}</li>)}</ul>
        <Link className={styles.primary} href={`/${locale}/shop/${featured.slug}`}>{c.featuredCta}<span aria-hidden="true">↗</span></Link>
      </div>
    </section>
    <section id="how-it-works" className={styles.process} aria-labelledby="process-heading">
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>{c.how}</p><h2 id="process-heading">{c.processTitle}</h2><p>{c.launchNote}</p></div></div>
      <ol className={styles.steps}>{c.steps.map(([title, body], index) => <li className={styles.step} key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p></li>)}</ol>
    </section>
    <section className={styles.faq} aria-labelledby="shop-faq"><div><p className={styles.eyebrow}>FAQ</p><h2 id="shop-faq">{c.faqTitle}</h2></div><div>{c.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
  </main>;
}
