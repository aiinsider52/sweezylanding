import type { Metadata } from "next";
import Link from "next/link";
import { BASE_URL, buildCanonicalAlternates } from "../../../lib/alternates";
import { DEFAULT_OG_IMAGE } from "../../../lib/social";
import { ukrainianServices, servicePath, servicePreview } from "../../../data/ukrainian-services";
import { Breadcrumb } from "../../components/Breadcrumb";
import { JsonLd } from "../../components/seo/JsonLd";
import { ServiceDirectory } from "../../components/services/ServiceDirectory";
import { StarterKitBanner } from "../../components/StarterKitBanner";
import styles from "../../components/services/services.module.css";

const title = "Українські послуги у Швейцарії — каталог Sweezy";
const description = "Українські та україномовні послуги в Цюриху, Тургау й Санкт-Галлені: авто, фото, догляд, масаж, переклади та школа. Контакти, джерела й фільтри.";
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
        <p>Знайдіть фахівця, україномовного спеціаліста або послугу для української спільноти. Обирайте категорію й кантон: у картках є прямі контакти, джерела та пояснення, чи підтверджена українська мова.</p>
        <div className={styles.tags}><span>Цюрих · Тургау · Санкт-Галлен</span><span>Карток у каталозі: {ukrainianServices.length}</span><span>Контакти з першоджерел</span></div>
      </header>
      <section className={styles.section} aria-labelledby="service-list-title">
        <h2 id="service-list-title">Оберіть послугу поруч</h2>
        <ServiceDirectory services={ukrainianServices.map(servicePreview)} />
      </section>
      <section className={styles.section}>
        <h2>Як обрати послугу й домовитися про роботу</h2>
        <ol className={styles.list}><li>Знайдіть виконавця за потрібною послугою та місцем роботи.</li><li>Уточніть мову спілкування, доступний час і можливість виконати саме ваше завдання.</li><li>Перед роботою погодьте обсяг, вартість або спосіб розрахунку та порядок додаткових витрат.</li><li>Збережіть домовленість і попросіть рахунок за виконану роботу.</li></ol>
        <Link href="/uk/blog/ukrayinski-posluhy-shveytcariya" className={styles.textLink}>Як шукати українські послуги у Швейцарії →</Link>
        <p><Link href="/uk/blog/ukrayinski-posluhy-zurich" className={styles.textLink}>Українські послуги в Цюриху: фото, догляд і школа →</Link></p>
      </section>
      <section className={styles.section}>
        <h2>Що означає картка в каталозі</h2>
        <p>Ми звіряємо опубліковані контакти та опис із джерелами й показуємо дату перевірки. Зв'язок із українською спільнотою описаний у кожній картці окремо. Наявність картки не є оцінкою якості робіт чи гарантією ціни.</p>
        <p className={styles.note}>Позначки розрізняють підтверджену українську мову, походження фахівця з України, переклад з української та рекомендацію спільноти. Для виїзних послуг зазначений регіон роботи; адресу зустрічі потрібно погодити.</p>
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
