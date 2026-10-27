import Link from "next/link";
import { connectionLabels, servicePath, ukrainianServices, SERVICE_COUNTRIES, type UkrainianService } from "../../../data/ukrainian-services";
import styles from "./services.module.css";

export function ServiceEvidenceTable({ services = ukrainianServices }: { services?: UkrainianService[] }) {
  return <section className={styles.section} aria-labelledby="service-evidence-title">
    <h2 id="service-evidence-title">Де працюють фахівці та що підтверджено</h2>
    <p>Порівняйте {services.length} сервісів за місцем роботи та опублікованими відомостями. Походження з України саме по собі не підтверджує українську мову прийому.</p>
    <div className={styles.evidenceTable} role="region" aria-labelledby="service-evidence-title" tabIndex={0}>
      <table>
        <caption>Регіон, зв’язок з українською спільнотою та джерело кожної картки</caption>
        <thead><tr><th scope="col">Сервіс</th><th scope="col">Де працює</th><th scope="col">Що підтверджено</th><th scope="col">Джерело та перевірка</th></tr></thead>
        <tbody>{services.map(service => <tr key={service.slug} id={`service-facts-${service.slug}`}>
          <th scope="row"><Link href={servicePath(service)}>{service.name}</Link><small>{service.category}</small></th>
          <td>{service.city}<small>{SERVICE_COUNTRIES[service.country]} · {service.region}</small></td>
          <td><strong>{connectionLabels[service.connection]}</strong><p>{service.ukrainianConnection}</p></td>
          <td>{service.sources[0] ? <a href={service.sources[0].url} target="_blank" rel="noreferrer noopener">{service.sources[0].name} ↗</a> : null}<time dateTime={service.checkedAt}>{service.checkedAt.split("-").reverse().join(".")}</time></td>
        </tr>)}</tbody>
      </table>
    </div>
    <p className={styles.note}>Картка не є оцінкою якості робіт. Мову спілкування, доступність, вартість та місце зустрічі погодьте з виконавцем. Дата в таблиці стосується перевірки опублікованих відомостей.</p>
  </section>;
}
