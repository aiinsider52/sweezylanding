import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BASE_URL, buildCanonicalAlternates } from "../../../../lib/alternates";
import { DEFAULT_OG_IMAGE } from "../../../../lib/social";
import { ukrainianServices, getUkrainianService, servicePath, serviceDirections, serviceSchema } from "../../../../data/ukrainian-services";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { JsonLd } from "../../../components/seo/JsonLd";
import styles from "../../../components/services/services.module.css";

export const dynamicParams = false;
export function generateStaticParams() { return ukrainianServices.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getUkrainianService(params.slug);
  if (!service) return {};
  const title = `${service.name} — автосервіс у Тургау | Sweezy`;
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
  const faq = [
    { q: "Де знаходиться гараж?", a: `${service.street}, ${service.postalCode} ${service.city}, кантон Тургау, Швейцарія.` },
    { q: "Чи можна спілкуватися українською?", a: service.ukrainianConnection },
    { q: "Яка вартість ремонту?", a: "У цій картці немає підтвердженого прайсу. Надішліть марку, модель, рік і опис завдання, а потім погодьте кошторис безпосередньо з гаражем." },
  ];
  return <main lang="uk" className={styles.page}>
    <JsonLd data={serviceSchema(service)} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }} />
    <article className={styles.shell}>
      <Breadcrumb items={[{ name: "Головна", url: "/uk" }, { name: "Українські послуги", url: "/uk/services" }, { name: service.name, url: servicePath(service) }]} />
      <header className={styles.hero}>
        <p className={styles.eyebrow}>{service.category} · {service.canton} · {service.city}</p>
        <h1>{service.name}</h1>
        <p>{service.summary}</p>
        <div className={styles.actions}>
          <a href={`tel:${service.phone}`} className={styles.button} data-service={service.slug} data-service-action="phone">Зателефонувати <span aria-hidden>↗</span></a>
          <a href={service.website} target="_blank" rel="noreferrer noopener" className={styles.textLink} data-service={service.slug} data-service-action="website">Сайт гаража ↗</a>
          <a href={serviceDirections(service)} target="_blank" rel="noreferrer noopener" className={styles.textLink} data-service={service.slug} data-service-action="directions">Знайти на карті ↗</a>
        </div>
      </header>
      <section className={styles.section} aria-labelledby="garage-contact-title">
        <h2 id="garage-contact-title">Контакти та години роботи</h2>
        <dl className={styles.facts}>
          <div><dt>Адреса</dt><dd>{service.street}, {service.postalCode} {service.city}</dd></div>
          <div><dt>Телефон</dt><dd><a href={`tel:${service.phone}`} className={styles.textLink} data-service={service.slug} data-service-action="phone">{service.phoneDisplay}</a></dd></div>
          <div><dt>Email</dt><dd><a href={`mailto:${service.email}`} className={styles.textLink} data-service={service.slug} data-service-action="email">{service.email}</a></dd></div>
          <div><dt>За опублікованим графіком</dt><dd>Пн–пт: 08:00–17:00<br />Субота: за домовленістю<br />Неділя: зачинено</dd></div>
        </dl>
        <p className={styles.note}>{service.ukrainianConnection} Контакти й опублікований графік звірено із сайтом гаража <time dateTime={service.checkedAt}>22.10.2026</time>; перед візитом підтвердьте запис.</p>
      </section>
      <section className={styles.section}>
        <h2>Що пропонує гараж</h2>
        <div className={styles.grid}>{service.services.map((item) => <div className={styles.card} key={item.title}><h3>{item.title}</h3><p>{item.description}</p><a className={styles.textLink} href={item.source} target="_blank" rel="noreferrer noopener">Опис на сайті гаража ↗</a></div>)}</div>
      </section>
      <section className={styles.section}>
        <h2>Що повідомити під час запису</h2>
        <ol className={styles.list}><li>Марку, модель, рік випуску й опис проблеми або потрібної роботи.</li><li>Бажаний час і потрібну мову спілкування.</li><li>Запит на кошторис: що входить у роботу та як погоджують додаткові витрати.</li></ol>
        <Link href="/uk/blog/ukrayinskyy-avtoservis-thurgau" className={styles.textLink}>Автосервіс у Тургау: як записатися й погодити ремонт →</Link>
      </section>
      <section className={styles.section} aria-labelledby="garage-faq-title"><h2 id="garage-faq-title">Питання перед візитом</h2>{faq.map(({ q, a }) => <div className={styles.faq} key={q}><h3>{q}</h3><p>{a}</p></div>)}</section>
      <section className={styles.section}>
        <h2>Джерела та уточнення</h2>
        <ul className={styles.sourceList}>{service.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer noopener">{source.name} ↗</a></li>)}</ul>
        <p className={styles.note}>Це інформаційна картка Sweezy. Ми не публікуємо непідтверджених рейтингів, цін або гарантій робіт. Змінилися дані? Напишіть на <a className={styles.textLink} href="mailto:support@sweezy.world">support@sweezy.world</a>.</p>
        <div className={styles.actions}><Link href="/uk/services" className={styles.button}>Усі українські послуги →</Link><Link href="/uk/blog/ukrayinski-posluhy-shveytcariya" className={styles.textLink}>Як обрати виконавця</Link></div>
      </section>
    </article>
  </main>;
}
