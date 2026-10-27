import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceHub, serviceHubs, servicesInHub } from "../../../../../data/service-hubs";
import { servicePreview, servicePath, SERVICE_COUNTRIES } from "../../../../../data/ukrainian-services";
import { ServiceEvidenceTable } from "../../../../components/services/ServiceEvidenceTable";
import { ServiceDirectory } from "../../../../components/services/ServiceDirectory";
import { JsonLd } from "../../../../components/seo/JsonLd";
import styles from "../../../../components/services/services.module.css";

export function generateStaticParams() { return serviceHubs.map(hub => ({ slug: hub.kind, filter: hub.slug })); }
export function generateMetadata({ params }: { params: { slug: string; filter: string } }): Metadata {
  const hub = getServiceHub(params.slug, params.filter);
  if (!hub) return {};
  return { title: `${hub.title} | Sweezy`, description: hub.description, alternates: { canonical: `https://www.sweezy.world/uk/services/${hub.kind}/${hub.slug}` } };
}
export default function ServiceHub({ params }: { params: { slug: string; filter: string } }) {
  const hub = getServiceHub(params.slug, params.filter), services = servicesInHub(params.slug, params.filter);
  if (!hub || services.length < 2) notFound();
  return <main className={styles.page} lang="uk"><div className={styles.shell}>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: hub.title, description: hub.description, url: `https://www.sweezy.world/uk/services/${hub.kind}/${hub.slug}`, mainEntity: { "@type": "ItemList", numberOfItems: services.length, itemListElement: services.map((service, index) => ({ "@type": "ListItem", position: index + 1, name: service.name, url: `https://www.sweezy.world${servicePath(service)}` })) } }} />
    <p className={styles.eyebrow}><Link href="/uk/services">Українські послуги</Link> / {SERVICE_COUNTRIES[hub.country]}</p>
    <header className={styles.hero}><h1>{hub.title}</h1><p className={styles.heroLead}>{hub.intro}</p></header>
    <section className={styles.section}><h2>Контакти та формати роботи</h2><ServiceDirectory services={services.map(servicePreview)} /></section>
    <ServiceEvidenceTable services={services} />
    <section className={styles.section}><h2>Що уточнити перед записом</h2><ul className={styles.list}>{hub.advice.map(item => <li key={item}>{item}</li>)}</ul><p>Контакти та зв’язок з українською спільнотою наведені з джерелами в кожній картці. Наявність у каталозі не є оцінкою якості чи гарантією доступності.</p><Link className={styles.textLink} href={hub.guide}>{hub.kind === "country" ? "Бізнес у DACH: куди звертатися →" : "Як знайти й обрати фахівця →"}</Link></section>
    <div className={styles.actions}><Link className={styles.button} href="/uk/services">Усі послуги →</Link><Link className={styles.textLink} href="/uk/countries">Послуги й допомога в інших країнах DACH →</Link></div>
  </div></main>;
}
