import Link from "next/link";
import { ukrainianServices } from "../../../data/ukrainian-services";
import { ServiceCard } from "./ServiceCard";
import styles from "./services.module.css";

export function ServicesSpotlight() {
  return <section className={styles.spotlight} aria-labelledby="ukrainian-services-title">
    <div className={styles.spotlightInner}>
      <div>
        <p className={styles.eyebrow}>ЛЮДИ ТА ПОСЛУГИ ПОРУЧ</p>
        <h2 id="ukrainian-services-title">Знайдіть своїх. Вирішіть справу.</h2>
        <p>Автосервіс, фотографія, догляд, переклади та навчання. Уже {ukrainianServices.length} карток у Тургау, Цюриху й Санкт-Галлені: прямі контакти, джерела та пояснення щодо української мови.</p>
        <Link href="/uk/services" className={styles.textLink}>Відкрити каталог послуг →</Link>
      </div>
      <ServiceCard service={ukrainianServices[0]} />
    </div>
  </section>;
}
