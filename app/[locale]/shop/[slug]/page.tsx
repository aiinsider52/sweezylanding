import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "../../../../lib/blog";
import { BASE_URL, buildLocaleAlternates } from "../../../../lib/alternates";
import { imageObject } from "../../../../lib/image-schema";
import { ENTITY_IDS } from "../../../../lib/entities";
import Image from "next/image";
import { SHOP_PRODUCTS, shopProduct, productCardImage, productImage, productImages, productImageAlt, productShots } from "../../../../data/shop";
import { shopStory } from "../../../../data/shop-stories";
import { SHOP_COPY } from "../../../../data/shop-copy";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { ProductGallery } from "../../../components/shop/ProductGallery";
import { ProductCard } from "../../../components/shop/ProductCard";
import { ProductActions } from "../../../components/shop/ProductActions";
import { JsonLd } from "../../../components/seo/JsonLd";
import styles from "../shop.module.css";

export const dynamicParams = false;
export function generateStaticParams() { return ["uk", "en", "de"].flatMap(locale => SHOP_PRODUCTS.map(product => ({ locale, slug: product.slug }))); }
export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const product = shopProduct(params.slug);
  if (!isLocale(params.locale) || !product) return {};
  const copy = product.copy[params.locale];
  const story = shopStory(product.slug, params.locale);
  const title = `${copy.name} · Sweezy Shop`;
  const description = story ? `${story.tagline} ${copy.description}` : copy.description;
  const images = [{ url: productCardImage(product), alt: productImageAlt(product, params.locale) }];
  return { title, description, alternates: buildLocaleAlternates(params.locale, `/shop/${product.slug}`),
    openGraph: { title, description, url: `${BASE_URL}/${params.locale}/shop/${product.slug}`, type: "website", images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default function ProductPage({ params }: { params: { locale: string; slug: string } }) {
  const product = shopProduct(params.slug);
  if (!isLocale(params.locale) || !product) notFound();
  const locale = params.locale;
  const c = SHOP_COPY[locale];
  const copy = product.copy[locale];
  const story = shopStory(product.slug, locale);
  const url = `${BASE_URL}/${locale}/shop/${product.slug}`;
  const related = SHOP_PRODUCTS.filter(p => p.slug !== product.slug).sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category)).slice(0, 3);
  return <main className={styles.page}>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      { "@type": "WebPage", "@id": `${url}#webpage`, url, name: copy.name, description: copy.description, inLanguage: locale, isPartOf: { "@id": ENTITY_IDS.website }, primaryImageOfPage: imageObject(productCardImage(product), productImageAlt(product, locale), locale), mainEntity: { "@id": `${url}#product` } },
      // No Offer, price, stock, rating, manufacturer or Sweezy brand is invented.
      { "@type": "Product", "@id": `${url}#product`, name: copy.name, sku: product.sku, description: story ? `${story.story} ${copy.description}` : copy.description, url, category: c.categories[product.category], image: productImages(product).map((src, index) => imageObject(src, productImageAlt(product, locale, productShots(product)[index]), locale)) },
    ] }} />
    <Breadcrumb items={[{ name: c.home, url: `/${locale}` }, { name: c.name, url: `/${locale}/shop` }, { name: copy.name, url: `/${locale}/shop/${product.slug}` }]} />
    <div className={styles.productLayout}>
      <ProductGallery product={product} locale={locale} />
      <div className={styles.productInfo}>
        <Link href={`/${locale}/shop#collection`} className={styles.backLink}>← {c.back}</Link>
        <p className={styles.eyebrow}>{c.categories[product.category]} · {product.sku}</p><h1>{copy.name}</h1>
        {story ? <p className={styles.productTagline}>{story.tagline}</p> : null}
        <p className={styles.productDescription}>{story?.story ?? copy.description}</p>
        {product.appearance ? <section className={styles.appearance} aria-label={c.appearance}><span className={styles.swatches} aria-hidden="true">{product.appearance.swatches.map(color => <span key={color} style={{ backgroundColor: color }} />)}</span><div><h2>{c.appearance}</h2><p>{product.appearance.label[locale]}</p></div></section> : null}
        <div className={styles.buyBox}>
          <div className={styles.pricePanel}><strong>{c.priceShort}</strong><p>{c.launchNote}</p></div>
          <ProductActions product={product} locale={locale} />
        </div>
        {story ? <section className={styles.highlights} aria-labelledby="highlights-title"><h2 id="highlights-title">{c.highlightsTitle}</h2><ul>{story.highlights.map(item => <li key={item}>{item}</li>)}</ul></section> : null}
        {story ? <section className={styles.moments} aria-labelledby="moments-title"><h2 id="moments-title">{c.momentsTitle}</h2><ul className={styles.chips}>{story.moments.map(item => <li key={item}>{item}</li>)}</ul></section> : null}
        <details className={styles.specs}><summary>{c.detailsTitle}</summary><p>{copy.description}</p><p>{c.specificsBody}</p>{product.flatPrint ? <p className={styles.flatNote}>{c.flatNote}</p> : null}<p className={styles.sku}>{c.sku}: {product.sku}</p></details>
      </div>
    </div>
    <section className={styles.lookBand} aria-labelledby="look-title">
      <div className={styles.lookCopy}><p className={styles.eyebrow}>{c.shots.lifestyle}</p><h2 id="look-title">{c.lookTitle}</h2><p>{c.lookBody}</p>{story ? <blockquote>{story.tagline}</blockquote> : null}</div>
      {(["in-use", "angle"] as const).map(shot => <figure key={shot} className={styles.lookImage}><Image src={productImage(product, shot)} alt={productImageAlt(product, locale, shot)} fill sizes="(max-width: 900px) 92vw, 34vw" /><figcaption>{c.shots[shot]}</figcaption></figure>)}
    </section>
    <section className={styles.related} aria-labelledby="related-products"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>THE SWISS EDIT</p><h2 id="related-products">{c.related}</h2></div><Link href={`/${locale}/shop#collection`} className={styles.inlineLink}>{c.back} ↗</Link></div><div className={styles.productGrid}>{related.map(item => <ProductCard key={item.slug} product={item} locale={locale} />)}</div></section>
  </main>;
}
