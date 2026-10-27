import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "../../../../lib/blog";
import { BASE_URL, buildLocaleAlternates } from "../../../../lib/alternates";
import { imageObject } from "../../../../lib/image-schema";
import { ENTITY_IDS } from "../../../../lib/entities";
import { SHOP_PRODUCTS, shopProduct, originalProductImage, productCardImage, productImageAlt } from "../../../../data/shop";
import { SHOP_COPY } from "../../../../data/shop-copy";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { ProductGallery } from "../../../components/shop/ProductGallery";
import { ProductActions } from "../../../components/shop/ProductActions";
import { JsonLd } from "../../../components/seo/JsonLd";
import styles from "../shop.module.css";

export const dynamicParams = false;
export function generateStaticParams() { return ["uk", "en", "de"].flatMap(locale => SHOP_PRODUCTS.map(product => ({ locale, slug: product.slug }))); }
export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const product = shopProduct(params.slug);
  if (!isLocale(params.locale) || !product) return {};
  const copy = product.copy[params.locale];
  const title = `${copy.name} · Sweezy Shop`;
  const images = [{ url: originalProductImage(product), alt: copy.alt }];
  return { title, description: copy.description, alternates: buildLocaleAlternates(params.locale, `/shop/${product.slug}`),
    openGraph: { title, description: copy.description, url: `${BASE_URL}/${params.locale}/shop/${product.slug}`, type: "website", images },
    twitter: { card: "summary_large_image", title, description: copy.description, images },
  };
}

export default function ProductPage({ params }: { params: { locale: string; slug: string } }) {
  const product = shopProduct(params.slug);
  if (!isLocale(params.locale) || !product) notFound();
  const locale = params.locale;
  const c = SHOP_COPY[locale];
  const copy = product.copy[locale];
  const url = `${BASE_URL}/${locale}/shop/${product.slug}`;
  const related = SHOP_PRODUCTS.filter(p => p.slug !== product.slug).sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category)).slice(0, 3);
  return <main className={styles.page}>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      { "@type": "WebPage", "@id": `${url}#webpage`, url, name: copy.name, description: copy.description, inLanguage: locale, isPartOf: { "@id": ENTITY_IDS.website }, primaryImageOfPage: imageObject(originalProductImage(product), copy.alt, locale), mainEntity: { "@id": `${url}#product` } },
      // No Offer, price, stock, rating, manufacturer or Sweezy brand is invented.
      { "@type": "Product", "@id": `${url}#product`, name: copy.name, description: copy.description, url, category: c.categories[product.category], image: imageObject(originalProductImage(product), copy.alt, locale) },
    ] }} />
    <Breadcrumb items={[{ name: c.home, url: `/${locale}` }, { name: c.name, url: `/${locale}/shop` }, { name: copy.name, url: `/${locale}/shop/${product.slug}` }]} />
    <Link href={`/${locale}/shop#collection`} className={styles.backLink}>← {c.back}</Link>
    <div className={styles.productLayout}>
      <ProductGallery product={product} locale={locale} />
      <div className={styles.productInfo}>
        <p className={styles.eyebrow}>SWEEZY SHOP / {c.categories[product.category]}</p><h1>{copy.name}</h1><p className={styles.productDescription}>{copy.description}</p>
        <div className={styles.pricePanel}><strong>{c.price}</strong><p>{c.launchNote}</p></div>
        <ProductActions product={product} locale={locale} />
        <section className={styles.specs}><h2>{c.specifics}</h2><p>{c.specificsBody}</p>{product.flatPrint ? <p className={styles.flatNote}>{c.flatNote}</p> : null}</section>
        <div className={styles.source}><a href={`https://www.temu.com/goods.html?goods_id=${product.goodsId}`} target="_blank" rel="noopener noreferrer">{c.source} ↗</a><p className={styles.finePrint}>{c.sourceNote}</p><p className={styles.sku}>{c.sku}: {product.goodsId}</p></div>
      </div>
    </div>
    <section className={styles.related} aria-labelledby="related-products"><h2 id="related-products">{c.related}</h2><div className={styles.productGrid}>{related.map(item => <article key={item.slug} className={styles.card}><div className={styles.cardPhoto}><Link className={styles.imageLink} href={`/${locale}/shop/${item.slug}`}><Image src={productCardImage(item)} alt={productImageAlt(item, locale, item.styledImage)} fill sizes="(max-width: 600px) 92vw, (max-width: 1100px) 46vw, 31vw"/><span className={styles.photoLabel}>{item.styledImage ? c.ai : c.original}</span></Link></div><div className={styles.cardCopy}><p className={styles.cardCategory}>{c.categories[item.category]}</p><h3><Link href={`/${locale}/shop/${item.slug}`}>{item.copy[locale].name}</Link></h3><div className={styles.cardBottom}><span>{c.price}</span><Link href={`/${locale}/shop/${item.slug}`} aria-label={`${c.details}: ${item.copy[locale].name}`}>{c.details} ↗</Link></div></div></article>)}</div></section>
  </main>;
}
