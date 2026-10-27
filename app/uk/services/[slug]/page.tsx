import { CommunityInvite } from "../../../components/CommunityInvite";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BASE_URL, buildCanonicalAlternates } from "../../../../lib/alternates";
import { DEFAULT_OG_IMAGE } from "../../../../lib/social";
import { connectionLabels, ukrainianServices, getUkrainianService, servicePath, serviceDirections, serviceLocation, serviceSchema, SERVICE_COUNTRIES, SERVICE_COUNTRY_SLUGS } from "../../../../data/ukrainian-services";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { JsonLd } from "../../../components/seo/JsonLd";
import styles from "../../../components/services/services.module.css";

export const dynamicParams = false;
export function generateStaticParams() { return ukrainianServices.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getUkrainianService(params.slug);
  if (!service) return {};
  const title = `${service.name} — ${service.category}, ${service.city} | Sweezy`;
  return {
    title, description: service.summary,
    alternates: buildCanonicalAlternates("uk", `/services/${service.slug}`),
    openGraph: { title, description: service.summary, type: "website", url: `${BASE_URL}${servicePath(service)}`, images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description: service.summary, images: [DEFAULT_OG_IMAGE] },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getUkrainianService(params.slug);
  if (!service) notFound();
  const directions = serviceDirections(service);
  const checkedDate = service.checkedAt.split("-").reverse().join(".");
  const faq = [
    { q: "Де можна отримати послугу?", a: `${serviceLocation(service)}. ${service.locationNote}` },
    { q: "Чи можна спілкуватися українською?", a: service.ukrainianConnection },
    { q: "Як дізнатися вартість і доступний час?", a: "Зверніться через опубліковані контакти з описом свого запиту. Актуальну ціну, доступний час, обсяг послуги та умови зміни запису погодьте безпосередньо з виконавцем." },
  ];
  return <main lang="uk" className={styles.page}>
    <JsonLd data={serviceSchema(service)} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }} />
    <article className={styles.shell}>
      <Breadcrumb items={[{ name: "Головна", url: "/uk" }, { name: "Українські послуги", url: "/uk/services" }, { name: service.name, url: servicePath(service) }]} />
      <header className={styles.hero}>
        <p className={styles.eyebrow}>{service.category} · {SERVICE_COUNTRIES[service.country]} · {service.region} · {service.city}</p>
        <h1>{service.name}</h1>
        <p>{service.summary}</p>
        <div className={styles.tags}><span>{connectionLabels[service.connection]}</span></div>
        <div className={styles.actions}>
          {service.phone && <a href={`tel:${service.phone}`} className={styles.button} data-service={service.slug} data-service-action="phone">Зателефонувати <span aria-hidden>↗</span></a>}
          <a href={service.website} target="_blank" rel="noreferrer noopener" className={service.phone ? styles.textLink : styles.button} data-service={service.slug} data-service-action="website">Офіційний сайт ↗</a>
          {directions && <a href={directions} target="_blank" rel="noreferrer noopener" className={styles.textLink} data-service={service.slug} data-service-action="directions">Знайти на карті ↗</a>}
        </div>
      </header>
      <section className={styles.section} aria-labelledby="service-contact-title">
        <h2 id="service-contact-title">Контакти та запис</h2>
        <dl className={styles.facts}>
          <div><dt>{directions ? "Адреса / місце занять" : "Регіон роботи"}</dt><dd>{serviceLocation(service)}</dd></div>
          {service.phone && <div><dt>Телефон</dt><dd><a href={`tel:${service.phone}`} className={styles.textLink} data-service={service.slug} data-service-action="phone">{service.phoneDisplay}</a></dd></div>}
          {service.email && <div><dt>Email</dt><dd><a href={`mailto:${service.email}`} className={styles.textLink} data-service={service.slug} data-service-action="email">{service.email}</a></dd></div>}
          <div><dt>Графік та домовленість про прийом</dt><dd>{service.hoursNote}</dd></div>
        </dl>
        <p>{service.locationNote}</p>
        <p className={styles.note}>{service.ukrainianConnection} Дані звірено з наведеними джерелами <time dateTime={service.checkedAt}>{checkedDate}</time>.</p>
      </section>
      <section className={styles.section}>
        <h2>Послуги та формати</h2>
        <div className={styles.grid}>{service.services.map((item) => <div className={styles.card} key={item.title}><h3>{item.title}</h3><p>{item.description}</p><a className={styles.textLink} href={item.source} target="_blank" rel="noreferrer noopener">Опис у першоджерелі ↗</a></div>)}</div>
      </section>
      <section className={styles.section}>
        <h2>Що повідомити під час запису</h2>
        <ol className={styles.list}>{service.inquiryChecklist.map((item) => <li key={item}>{item}</li>)}</ol>
        {service.guide && <Link href={service.guide.href} className={styles.textLink}>{service.guide.title} →</Link>}
      </section>
      <section className={styles.section} aria-labelledby="service-faq-title"><h2 id="service-faq-title">Питання перед зверненням</h2>{faq.map(({ q, a }) => <div className={styles.faq} key={q}><h3>{q}</h3><p>{a}</p></div>)}</section>
      <CommunityInvite locale="uk" placement="service-profile-community" context="services" />
      <section className={styles.section}>
        <h2>Джерела та уточнення</h2>
        <ul className={styles.sourceList}>{service.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer noopener">{source.name} ↗</a></li>)}</ul>
        <p className={styles.note}>Це інформаційна картка Sweezy. Ми не публікуємо непідтверджених рейтингів, цін або гарантій робіт. Змінилися дані? Напишіть на <a className={styles.textLink} href="mailto:support@sweezy.world">support@sweezy.world</a>.</p>
        <div className={styles.actions}><Link href={`/uk/services/country/${SERVICE_COUNTRY_SLUGS[service.country]}`} className={styles.button}>{SERVICE_COUNTRIES[service.country]}: послуги →</Link><Link href="/uk/services" className={styles.textLink}>Увесь каталог DACH →</Link></div>
      </section>
    </article>
  </main>;
}
