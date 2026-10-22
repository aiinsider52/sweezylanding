import type { Metadata } from "next";
import Link from "next/link";
import { BASE_URL, buildCanonicalAlternates } from "../../../lib/alternates";
import { DEFAULT_OG_IMAGE } from "../../../lib/social";
import { ukrainianServices, servicePath } from "../../../data/ukrainian-services";
import { Breadcrumb } from "../../components/Breadcrumb";
import { JsonLd } from "../../components/seo/JsonLd";
import { ServiceCard } from "../../components/services/ServiceCard";
import { StarterKitBanner } from "../../components/StarterKitBanner";
import styles from "../../components/services/services.module.css";

const title = "Українські послуги у Швейцарії — каталог Sweezy";
const description = "Знаходьте українських фахівців у Швейцарії: послуги, контакти та місце роботи. Перша картка — автосервіс Classic Car die Garage у Тургау.";
export const metadata: Metadata = {
  title, description,
  alternates: buildCanonicalAlternates("uk", "/services"),
  openGraph: { title, description, url: `${BASE_URL}/uk/services`, type: "website", locale: "uk_UA", images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] },
};

export default function ServicesPage() {
  return <main lang="uk" className={styles.page}>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url: `${BASE_URL}/uk/services`, inLanguage: "uk", mainEntity: { "@type": "ItemList", numberOfItems: ukrainianServices.length, itemListElement: ukrainianServices.map((service, index) => ({ "@type": "ListItem", position: index + 1, name: service.name, url: `${BASE_URL}${servicePath(service)}` })) } }} />
    <div className={styles.shell}>
      <Breadcrumb items={[{ name: "Головна", url: "/uk" }, { name: "Українські послуги", url: "/uk/services" }]} />
      <header className={styles.hero}>
        <p className={styles.eyebrow}>SWEEZY · ЛОКАЛЬНІ ПОСЛУГИ</p>
        <h1>Українські послуги у Швейцарії</h1>
        <p>Майстри, до яких можна звернутися з конкретною справою. Тут зібрані опис послуг, місце роботи та прямі контакти. Починаємо з автосервісу в кантоні Тургау й поступово розширюємо каталог.</p>
        <div className={styles.tags}><span>Автосервіс</span><span>Тургау · Roggwil</span><span>Карток у каталозі: {ukrainianServices.length}</span></div>
      </header>
      <section className={styles.section} aria-labelledby="service-list-title">
        <h2 id="service-list-title">Авто та ремонт у Тургау</h2>
        <div className={styles.grid}>{ukrainianServices.map((service) => <ServiceCard key={service.slug} service={service} />)}</div>
      </section>
      <section className={styles.section}>
        <h2>Як обрати послугу й домовитися про роботу</h2>
        <ol className={styles.list}><li>Знайдіть виконавця за потрібною послугою та місцем роботи.</li><li>Уточніть мову спілкування, доступний час і можливість виконати саме ваше завдання.</li><li>Перед роботою погодьте обсяг, вартість або спосіб розрахунку та порядок додаткових витрат.</li><li>Збережіть домовленість і попросіть рахунок за виконану роботу.</li></ol>
        <Link href="/uk/blog/ukrayinski-posluhy-shveytcariya" className={styles.textLink}>Як шукати українські послуги у Швейцарії →</Link>
      </section>
      <section className={styles.section}>
        <h2>Що означає картка в каталозі</h2>
        <p>Ми звіряємо опубліковані контакти та опис із джерелами й показуємо дату перевірки. Зв'язок із українською спільнотою описаний у кожній картці окремо. Наявність картки не є оцінкою якості робіт чи гарантією ціни.</p>
        <p className={styles.note}>Каталог поки охоплює один сервіс. Для інших категорій і кантонів ще збираємо дані. Ваша рекомендація допоможе додати наступного фахівця.</p>
      </section>
      <section className={styles.section}>
        <h2>Знаєте український сервіс?</h2>
        <p>Надішліть назву, сайт, кантон, перелік послуг і доступні мови. Редакція перевірить дані перед додаванням.</p>
        <div className={styles.actions}><a href="mailto:support@sweezy.world?subject=Ukrainian%20service%20for%20Sweezy" className={styles.button}>Запропонувати сервіс →</a><Link href="/uk/blog/biznes-u-shveytcariyi-dlya-ukrayintsiv" className={styles.textLink}>Запускаєте власний бізнес?</Link></div>
      </section>
    </div>
    <StarterKitBanner locale="uk" />
  </main>;
}
