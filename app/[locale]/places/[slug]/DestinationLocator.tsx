import Link from "next/link";
import { travelDestinations } from "../../../../data/travel-destinations";
import type { Locale } from "../../../../lib/i18n";
import { nearbyMapPlaces } from "../../../../lib/swiss-map";
import { DestinationMap } from "./DestinationMap";
import styles from "../travel.module.css";

const LABELS = {
  en: { eyebrow: "SWITZERLAND · FIELD NOTES", title: "Find your place.", position: "Coordinates", route: "Get directions", country: "Switzerland", nearby: "Explore nearby", note: "Nearby places by geographic proximity. Check transport and access in each guide.", map: "Destination map", zoomIn: "Zoom in", zoomOut: "Zoom out", reset: "All Switzerland", selected: "Your destination", attribution: "Map data", view: "Map zoom" },
  uk: { eyebrow: "ШВЕЙЦАРІЯ · ПУТІВНИК", title: "Ваше місце на мапі.", position: "Координати", route: "Прокласти маршрут", country: "Швейцарія", nearby: "Що подивитися поруч", note: "Місця поблизу за географічним розташуванням. Транспорт і доступ перевірте в кожному гіді.", map: "Мапа місця", zoomIn: "Збільшити мапу", zoomOut: "Зменшити мапу", reset: "Уся Швейцарія", selected: "Ваше місце", attribution: "Дані мапи", view: "Масштаб мапи" },
  de: { eyebrow: "SCHWEIZ · REISEFÜHRER", title: "Dein Ort auf der Karte.", position: "Koordinaten", route: "Route planen", country: "Schweiz", nearby: "In der Nähe entdecken", note: "Orte nach geografischer Nähe. Anreise und Zugang im jeweiligen Guide prüfen.", map: "Karte des Reiseziels", zoomIn: "Karte vergrössern", zoomOut: "Karte verkleinern", reset: "Ganze Schweiz", selected: "Dein Reiseziel", attribution: "Kartendaten", view: "Kartenmassstab" },
} satisfies Record<Locale, Record<string, string>>;

export function DestinationLocator({ locale, title, region, latitude, longitude }: { locale: Locale; title: string; region: string; latitude: number; longitude: number }) {
  const copy = LABELS[locale];
  const coordinates = { latitude, longitude };
  const candidates = travelDestinations.filter((place) => place.coordinates.latitude !== latitude || place.coordinates.longitude !== longitude);
  const nearby = nearbyMapPlaces(coordinates, candidates).map((place, index) => ({
    title: place.title[locale], coordinates: place.coordinates, number: String(index + 2).padStart(2, "0"), href: `/${locale}/places/${place.slug}`,
  }));
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return <section id="destination-map" className={styles.locator} aria-labelledby="destination-locator-title">
    <div className={styles.locatorCopy}>
      <p className={styles.eyebrow}>{copy.eyebrow}</p>
      <h2 id="destination-locator-title">{copy.title}</h2>
      <div className={styles.locatorPlace}><span aria-hidden="true">01</span><div><strong>{title}</strong><p>{region}</p></div></div>
      <dl><div><dt>{copy.country}</dt><dd>CH</dd></div><div><dt>{copy.position}</dt><dd>{latitude.toFixed(3)}° N<br />{longitude.toFixed(3)}° E</dd></div></dl>
      <a href={directions} target="_blank" rel="noreferrer noopener" className={styles.locatorRoute}>{copy.route}<span aria-hidden="true">↗</span></a>
      <nav className={styles.locatorNearby} aria-label={copy.nearby}>
        <h3>{copy.nearby}</h3>
        {nearby.map((place) => <Link key={place.href} href={place.href}><span>{place.number}</span><strong>{place.title}</strong><span aria-hidden="true">↗</span></Link>)}
      </nav>
      <p className={styles.locatorNote}>{copy.note}</p>
    </div>
    <DestinationMap title={title} coordinates={coordinates} nearby={nearby} labels={copy} />
  </section>;
}
