import { SWISS_LAKES, SWITZERLAND_PATH } from "../../../../data/switzerland-map";
import type { Locale } from "../../../../lib/i18n";
import styles from "../travel.module.css";

const LABELS: Record<Locale, { eyebrow: string; title: string; position: string; route: string; country: string }> = {
  en: { eyebrow: "SWITZERLAND LOCATOR", title: "Where you are going", position: "Coordinates", route: "Open route", country: "Switzerland" },
  uk: { eyebrow: "МАПА ШВЕЙЦАРІЇ", title: "Куди ви їдете", position: "Координати", route: "Відкрити маршрут", country: "Швейцарія" },
  de: { eyebrow: "SCHWEIZ LOCATOR", title: "Wohin die Reise geht", position: "Koordinaten", route: "Route öffnen", country: "Schweiz" },
};

export function DestinationLocator({ locale, title, region, latitude, longitude }: { locale: Locale; title: string; region: string; latitude: number; longitude: number }) {
  const copy = LABELS[locale];
  const mapX = 60 + ((longitude - 5.956) / (10.492 - 5.956)) * 880;
  const mapY = 50 + ((47.808 - latitude) / (47.808 - 45.818)) * 480;
  const x = 8 + (mapX / 1000) * 84;
  const y = 8 + (mapY / 580) * 84;
  const maps = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return <section id="destination-map" className={styles.locator} aria-labelledby="destination-locator-title">
    <div className={styles.locatorCopy}>
      <p className={styles.eyebrow}>{copy.eyebrow}</p><h2 id="destination-locator-title">{copy.title}</h2>
      <div className={styles.locatorPlace}><span aria-hidden>●</span><div><strong>{title}</strong><p>{region}</p></div></div>
      <dl><div><dt>{copy.country}</dt><dd>CH</dd></div><div><dt>{copy.position}</dt><dd>{latitude.toFixed(3)}° N · {longitude.toFixed(3)}° E</dd></div></dl>
      <a href={maps} target="_blank" rel="noreferrer noopener">{copy.route} ↗</a>
    </div>
    <div className={styles.mapCanvas} aria-label={`${title} location on the map of Switzerland`}>
      <div className={styles.mapGrid} aria-hidden />
      <svg viewBox="0 0 1000 580" role="img" aria-label={`${copy.country}: ${title}`}>
        <defs>
          <linearGradient id="swiss-land" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#53635a"/><stop offset=".55" stopColor="#3e4d45"/><stop offset="1" stopColor="#27352e"/></linearGradient>
          <linearGradient id="swiss-water" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b9edff"/><stop offset=".48" stopColor="#65b8da"/><stop offset="1" stopColor="#337d9d"/></linearGradient>
          <clipPath id="switzerland-clip"><path d={SWITZERLAND_PATH}/></clipPath>
        </defs>
        <path className={styles.mapShadow} d={SWITZERLAND_PATH}/>
        <path className={styles.mapLand} d={SWITZERLAND_PATH}/>
        <g className={styles.mapRelief} clipPath="url(#switzerland-clip)" aria-hidden>
          <path d="M68 448C190 365 293 401 387 334S550 242 667 272s193 15 270-56"/>
          <path d="M110 484c105-58 206-44 286-106s178-93 278-52 181 21 244-30"/>
          <path d="M187 512c89-35 172-24 249-70s145-68 242-31 165 17 224-18"/>
        </g>
        <g className={styles.mapLakes} clipPath="url(#switzerland-clip)">
          {SWISS_LAKES.map(lake=><path key={lake.name} d={lake.d}><title>{lake.name}</title></path>)}
        </g>
      </svg>
      <div className={styles.mapPin} style={{ left: `${x}%`, top: `${y}%` }} aria-hidden><span/><i/></div>
      <div className={styles.mapLabel} style={{ left: `${x}%`, top: `${y}%` }}>{title}</div><span className={styles.mapNorth} aria-hidden>N ↑</span>
    </div>
  </section>;
}
