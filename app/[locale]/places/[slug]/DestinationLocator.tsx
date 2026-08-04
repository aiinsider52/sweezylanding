import type { Locale } from "../../../../lib/i18n";
import styles from "../travel.module.css";

const LABELS: Record<Locale, { eyebrow: string; title: string; position: string; route: string; country: string }> = {
  en: { eyebrow: "SWITZERLAND LOCATOR", title: "Where you are going", position: "Coordinates", route: "Open route", country: "Switzerland" },
  uk: { eyebrow: "МАПА ШВЕЙЦАРІЇ", title: "Куди ви їдете", position: "Координати", route: "Відкрити маршрут", country: "Швейцарія" },
  de: { eyebrow: "SCHWEIZ LOCATOR", title: "Wohin die Reise geht", position: "Koordinaten", route: "Route öffnen", country: "Schweiz" },
};

export function DestinationLocator({ locale, title, region, latitude, longitude }: { locale: Locale; title: string; region: string; latitude: number; longitude: number }) {
  const copy = LABELS[locale];
  const x = Math.max(4, Math.min(96, ((longitude - 5.9) / 4.6) * 100));
  const y = Math.max(6, Math.min(94, ((47.9 - latitude) / 2.1) * 100));
  const maps = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  return <section className={styles.locator} aria-labelledby="destination-locator-title">
    <div className={styles.locatorCopy}>
      <p className={styles.eyebrow}>{copy.eyebrow}</p><h2 id="destination-locator-title">{copy.title}</h2>
      <div className={styles.locatorPlace}><span aria-hidden>●</span><div><strong>{title}</strong><p>{region}</p></div></div>
      <dl><div><dt>{copy.country}</dt><dd>CH</dd></div><div><dt>{copy.position}</dt><dd>{latitude.toFixed(3)}° N · {longitude.toFixed(3)}° E</dd></div></dl>
      <a href={maps} target="_blank" rel="noreferrer noopener">{copy.route} ↗</a>
    </div>
    <div className={styles.mapCanvas} aria-label={`${title} location on the map of Switzerland`}>
      <div className={styles.mapGrid} aria-hidden />
      <svg viewBox="0 0 1000 580" role="img" aria-label={`${copy.country}: ${title}`}>
        <path className={styles.mapShadow} d="M73 250 154 205 196 134 279 145 323 91 405 121 463 83 531 120 594 96 650 138 735 128 774 177 872 187 919 249 875 294 902 344 833 366 790 430 701 412 650 468 576 449 521 495 444 463 370 482 326 426 244 437 210 384 128 366 143 313 72 288Z" />
        <path className={styles.mapLand} d="M58 235 143 190 183 116 270 130 317 73 404 104 460 66 532 103 598 78 657 122 744 111 785 160 885 169 936 235 890 282 919 335 845 358 801 425 707 406 654 464 575 444 521 492 439 459 363 479 316 420 231 431 195 376 111 357 128 302 54 276Z" />
        <path className={styles.mapLake} d="M124 277c38-24 74-31 112-22-33 13-62 33-91 61-22-8-29-21-21-39Zm653-89c29-7 61-5 95 8-21 11-45 19-73 24-19-7-26-18-22-32Zm-198 219c26-9 49-7 69 8-19 15-43 22-71 21-12-12-11-22 2-29Z" />
      </svg>
      <div className={styles.mapPin} style={{ left: `${x}%`, top: `${y}%` }} aria-hidden><span /><i /></div>
      <div className={styles.mapLabel} style={{ left: `${x}%`, top: `${y}%` }}>{title}</div><span className={styles.mapNorth} aria-hidden>N ↑</span>
    </div>
  </section>;
}
