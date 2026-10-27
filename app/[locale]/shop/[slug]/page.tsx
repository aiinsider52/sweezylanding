import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "../../../../lib/blog";
import { BASE_URL, buildLocaleAlternates } from "../../../../lib/alternates";
import { imageObject } from "../../../../lib/image-schema";
import { ENTITY_IDS } from "../../../../lib/entities";
import { SHOP_PRODUCTS, shopProduct, productCardImage, productImages, productImageAlt, PRODUCT_SHOTS } from "../../../../data/shop";
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
  const title = `${copy.name} · Sweezy Shop`;
  const images = [{ url: productCardImage(product), alt: productImageAlt(product, params.locale) }];
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
      { "@type": "WebPage", "@id": `${url}#webpage`, url, name: copy.name, description: copy.description, inLanguage: locale, isPartOf: { "@id": ENTITY_IDS.website }, primaryImageOfPage: imageObject(productCardImage(product), productImageAlt(product, locale), locale), mainEntity: { "@id": `${url}#product` } },
      // No Offer, price, stock, rating, manufacturer or Sweezy brand is invented.
      { "@type": "Product", "@id": `${url}#product`, name: copy.name, sku: product.sku, description: copy.description, url, category: c.categories[product.category], image: productImages(product).map((src, index) => imageObject(src, productImageAlt(product, locale, PRODUCT_SHOTS[index]), locale)) },
    ] }} />
    <Breadcrumb items={[{ name: c.home, url: `/${locale}` }, { name: c.name, url: `/${locale}/shop` }, { name: copy.name, url: `/${locale}/shop/${product.slug}` }]} />
    <Link href={`/${locale}/shop#collection`} className={styles.backLink}>← {c.back}</Link>
    <div className={styles.productLayout}>
      <ProductGallery product={product} locale={locale} />
      <div className={styles.productInfo}>
        <p className={styles.eyebrow}>SWEEZY SHOP / {c.categories[product.category]}</p><h1>{copy.name}</h1><p className={styles.productDescription}>{copy.description}</p>
        {product.appearance ? <section className={styles.appearance} aria-label={c.appearance}><h2>{c.appearance}</h2><div><span className={styles.swatches} aria-hidden="true">{product.appearance.swatches.map(color => <span key={color} style={{ backgroundColor: color }} />)}</span><span>{product.appearance.label[locale]}</span></div><p>{c.variantNote}</p></section> : null}
        <div className={styles.pricePanel}><strong>{c.price}</strong><p>{c.launchNote}</p></div>
        <ProductActions product={product} locale={locale} />
        <section className={styles.specs}><h2>{c.specifics}</h2><p>{c.specificsBody}</p>{product.flatPrint ? <p className={styles.flatNote}>{c.flatNote}</p> : null}</section>
        <p className={styles.sku}>{c.sku}: {product.sku}</p>
      </div>
    </div>
    <section className={styles.related} aria-labelledby="related-products"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>THE SWISS EDIT</p><h2 id="related-products">{c.related}</h2></div><Link href={`/${locale}/shop#collection`} className={styles.inlineLink}>{c.back} ↗</Link></div><div className={styles.productGrid}>{related.map(item => <ProductCard key={item.slug} product={item} locale={locale} />)}</div></section>
  </main>;
}
