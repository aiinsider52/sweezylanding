"use client";

import { useState } from "react";
import { filterServices, SERVICE_COUNTRIES, type ServiceCountry, type ServicePreview } from "../../../data/ukrainian-services";
import { ServiceCard } from "./ServiceCard";
import styles from "./services.module.css";

export function ServiceDirectory({ services }: { services: ServicePreview[] }) {
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState<ServiceCountry | "">("");
  const categories = Array.from(new Set(services.map((service) => service.category)));
  const countries = Array.from(new Set(services.map(service => service.country)));
  const regions = Array.from(new Set(services.filter(service => !country || service.country === country).map(service => service.region)));
  const matches = filterServices(services, category, region, country);
  const filtered = Boolean(category || region || country);

  function resetFilters() {
    setCategory("");
    setRegion("");
    setCountry("");
  }

  return <>
    <div className={styles.filters}>
      {countries.length > 1 ? <label htmlFor="service-country">У якій країні?
        <select id="service-country" value={country} onChange={event => { setCountry(event.target.value as ServiceCountry | ""); setRegion(""); }} aria-controls="service-results">
          <option value="">Усі країни DACH</option>
          {countries.map(value => <option key={value} value={value}>{SERVICE_COUNTRIES[value]}</option>)}
        </select>
      </label> : null}
      <label htmlFor="service-category">Яка послуга?
        <select id="service-category" value={category} onChange={(event) => setCategory(event.target.value)} aria-controls="service-results">
          <option value="">Усі категорії</option>
          {categories.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
      <label htmlFor="service-region">У якому регіоні?
        <select id="service-region" value={region} onChange={(event) => setRegion(event.target.value)} aria-controls="service-results">
          <option value="">Усі регіони</option>
          {regions.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
      {filtered && <button type="button" className={styles.textLink} onClick={resetFilters}>Скинути фільтри</button>}
    </div>
    <p className={styles.resultCount} role="status" aria-live="polite">Знайдено: {matches.length} із {services.length}</p>
    <div id="service-results">
      {matches.length ? <div className={styles.grid}>{matches.map((service) => <ServiceCard key={service.slug} service={service} />)}</div>
        : <div className={styles.note}><p>Для цієї послуги в обраній країні та регіоні карток поки немає.</p><button type="button" className={styles.textLink} onClick={resetFilters}>Показати всі послуги</button></div>}
    </div>
  </>;
}
