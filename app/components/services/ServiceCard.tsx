import Link from "next/link";
import { servicePath, type UkrainianService } from "../../../data/ukrainian-services";
import styles from "./services.module.css";

export function ServiceCard({ service }: { service: UkrainianService }) {
  return <article className={styles.card}>
    <div className={styles.cardLabel}><span>{service.category} · {service.canton}</span><span>UA / CH</span></div>
    <h3><Link href={servicePath(service)}>{service.name}</Link></h3>
    <p>{service.summary}</p>
    <p className={styles.address}>{service.street} · {service.postalCode} {service.city}</p>
    <div className={styles.actions}>
      <Link href={servicePath(service)} className={styles.button}>Контакти й послуги <span aria-hidden>↗</span></Link>
      <a href={`tel:${service.phone}`} className={styles.textLink} data-service={service.slug} data-service-action="phone">{service.phoneDisplay}</a>
    </div>
  </article>;
}
