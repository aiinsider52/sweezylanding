import Link from "next/link";
import { connectionLabels, serviceLocation, servicePath, type ServicePreview } from "../../../data/ukrainian-services";
import styles from "./services.module.css";

export function ServiceCard({ service }: { service: ServicePreview }) {
  return <article className={styles.card}>
    <div className={styles.cardLabel}><span>{service.category} · {service.region}</span><span>UA / {service.country}</span></div>
    <h3><Link href={servicePath(service)}>{service.name}</Link></h3>
    <p>{service.summary}</p>
    <p className={styles.evidence}>{connectionLabels[service.connection]}</p>
    <p className={styles.address}>{serviceLocation(service)}</p>
    <div className={styles.actions}>
      <Link href={servicePath(service)} className={styles.button}>Контакти й послуги <span aria-hidden>↗</span></Link>
      {service.phone && <a href={`tel:${service.phone}`} className={styles.textLink} data-service={service.slug} data-service-action="phone">{service.phoneDisplay}</a>}
    </div>
  </article>;
}
