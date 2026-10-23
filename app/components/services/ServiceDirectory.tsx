"use client";

import { useState } from "react";
import { filterServices, type ServicePreview } from "../../../data/ukrainian-services";
import { ServiceCard } from "./ServiceCard";
import styles from "./services.module.css";

export function ServiceDirectory({ services }: { services: ServicePreview[] }) {
  const [category, setCategory] = useState("");
  const [canton, setCanton] = useState("");
  const categories = Array.from(new Set(services.map((service) => service.category)));
  const cantons = Array.from(new Set(services.map((service) => service.canton)));
  const matches = filterServices(services, category, canton);
  const filtered = Boolean(category || canton);

  function resetFilters() {
    setCategory("");
    setCanton("");
  }

  return <>
    <div className={styles.filters}>
      <label htmlFor="service-category">Яка послуга?
        <select id="service-category" value={category} onChange={(event) => setCategory(event.target.value)} aria-controls="service-results">
          <option value="">Усі категорії</option>
          {categories.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
      <label htmlFor="service-canton">У якому кантоні?
        <select id="service-canton" value={canton} onChange={(event) => setCanton(event.target.value)} aria-controls="service-results">
          <option value="">Усі кантони</option>
          {cantons.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
      {filtered && <button type="button" className={styles.textLink} onClick={resetFilters}>Скинути фільтри</button>}
    </div>
    <p className={styles.resultCount} role="status" aria-live="polite">Знайдено: {matches.length} із {services.length}</p>
    <div id="service-results">
      {matches.length ? <div className={styles.grid}>{matches.map((service) => <ServiceCard key={service.slug} service={service} />)}</div>
        : <div className={styles.note}><p>Для цієї послуги в обраному кантоні карток поки немає.</p><button type="button" className={styles.textLink} onClick={resetFilters}>Показати всі послуги</button></div>}
    </div>
  </>;
}
