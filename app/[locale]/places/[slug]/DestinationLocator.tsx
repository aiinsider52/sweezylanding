import type { Locale } from "../../../../lib/i18n";
import styles from "../travel.module.css";

const LABELS: Record<Locale, { eyebrow: string; title: string; position: string; route: string; country: string }> = {
  en: { eyebrow: "SWITZERLAND LOCATOR", title: "Where you are going", position: "Coordinates", route: "Open route", country: "Switzerland" },
  uk: { eyebrow: "МАПА ШВЕЙЦАРІЇ", title: "Куди ви їдете", position: "Координати", route: "Відкрити маршрут", country: "Швейцарія" },
  de: { eyebrow: "SCHWEIZ LOCATOR", title: "Wohin die Reise geht", position: "Koordinaten", route: "Route öffnen", country: "Schweiz" },
};

// Natural Earth Switzerland boundary, simplified and projected to this SVG viewBox.
const SWITZERLAND_PATH = "M932.6,277.6 L930.9,287.5 L925.5,293.4 L927.7,303.8 L922.1,308.7 L921.1,317.1 L916.2,323.9 L921.3,332.0 L933.6,335.7 L934.9,346.6 L930.7,356.4 L901.9,353.2 L890.1,347.3 L889.9,337.0 L881.8,334.9 L861.6,340.3 L858.4,350.0 L850.9,357.5 L850.0,369.4 L853.1,373.5 L849.7,378.5 L871.9,388.9 L862.5,404.5 L864.9,411.5 L875.4,422.8 L867.4,430.3 L852.8,432.9 L850.7,423.4 L840.2,414.2 L837.6,400.2 L828.7,396.6 L816.5,397.6 L799.6,404.4 L790.3,401.5 L788.0,410.9 L781.4,415.7 L754.6,414.1 L748.0,408.7 L744.2,400.0 L736.8,395.6 L734.9,365.9 L725.2,373.6 L714.8,365.1 L701.6,369.1 L696.7,380.8 L701.2,385.6 L703.9,406.2 L694.2,430.3 L685.7,436.9 L682.2,444.5 L668.1,452.8 L662.0,471.2 L651.0,476.6 L653.6,487.8 L646.8,494.7 L652.6,503.8 L660.6,506.5 L662.8,510.5 L651.0,529.3 L638.8,525.9 L631.1,528.0 L633.5,514.2 L625.5,498.9 L605.5,490.2 L618.4,470.1 L613.5,464.5 L601.5,463.3 L597.0,459.7 L588.0,463.0 L573.3,456.5 L555.5,436.0 L541.5,429.3 L538.7,419.6 L543.0,386.6 L539.6,377.9 L534.0,377.0 L517.9,381.5 L512.1,388.3 L514.3,392.6 L511.2,396.8 L503.4,400.7 L493.9,411.5 L473.5,420.5 L470.7,424.9 L481.7,438.8 L482.2,447.7 L478.0,455.5 L461.5,464.1 L458.6,478.9 L453.8,486.3 L436.8,490.5 L431.4,500.5 L427.4,500.6 L423.8,506.7 L397.2,503.3 L387.3,494.2 L367.5,489.9 L360.3,496.5 L332.7,508.3 L318.2,507.0 L292.3,515.9 L275.5,512.6 L265.5,502.2 L260.1,487.8 L246.1,474.4 L233.6,474.1 L233.2,465.6 L237.2,459.0 L218.8,453.6 L218.9,441.3 L229.1,421.1 L214.1,402.8 L220.3,394.8 L221.2,386.2 L216.5,382.6 L187.6,376.1 L162.2,377.9 L145.7,387.6 L127.0,390.9 L110.1,410.0 L114.6,421.5 L122.1,422.6 L123.1,428.2 L89.5,452.7 L74.0,450.4 L60.6,454.6 L65.2,444.9 L60.5,435.0 L76.9,427.5 L85.9,426.7 L88.1,413.4 L95.0,399.4 L89.5,390.5 L79.1,384.9 L81.6,381.5 L81.0,372.5 L96.8,353.0 L91.5,345.4 L120.2,322.0 L151.8,302.6 L152.5,296.5 L149.5,292.6 L155.2,279.2 L151.5,266.8 L154.4,258.4 L184.7,248.1 L197.6,239.8 L202.1,234.3 L199.7,229.8 L202.3,226.0 L254.1,185.7 L254.5,174.8 L269.6,165.4 L271.1,162.8 L263.3,156.1 L236.7,159.5 L240.0,152.6 L247.9,147.0 L248.2,142.4 L260.8,135.8 L257.4,126.9 L264.4,124.5 L297.6,127.1 L295.2,137.9 L308.7,144.4 L341.4,139.2 L345.8,132.7 L342.9,126.7 L353.2,128.7 L356.5,126.0 L355.1,120.7 L359.8,120.1 L360.5,116.3 L356.2,114.1 L369.3,106.1 L386.1,101.4 L390.5,101.0 L388.0,107.0 L380.8,108.7 L395.1,113.6 L411.3,110.8 L421.6,101.3 L436.8,103.1 L439.5,109.7 L464.7,109.7 L473.5,108.0 L491.3,96.4 L501.7,94.9 L512.5,96.4 L516.0,102.1 L525.2,104.7 L543.6,104.0 L546.1,98.7 L557.9,94.9 L565.3,102.7 L569.2,100.1 L569.1,90.8 L573.3,92.3 L574.4,86.6 L566.8,85.0 L545.4,90.6 L532.5,84.4 L532.6,76.2 L541.5,70.5 L546.5,60.6 L563.6,56.9 L561.8,53.1 L564.8,51.6 L573.3,53.2 L576.3,62.2 L581.5,54.1 L588.8,61.9 L594.9,62.2 L592.4,70.4 L595.7,77.4 L605.9,77.2 L606.1,71.0 L611.3,71.2 L622.6,78.3 L619.1,80.7 L627.6,86.6 L639.9,87.1 L653.8,81.1 L686.1,83.2 L688.8,86.6 L703.6,88.1 L756.8,116.0 L763.9,128.9 L776.7,135.8 L774.7,149.7 L745.1,194.2 L744.6,202.4 L749.9,218.8 L743.1,229.5 L780.3,231.3 L817.0,241.2 L820.3,262.4 L866.1,281.8 L883.6,277.0 L890.2,263.4 L901.9,263.5 L905.4,253.5 L918.1,246.0 L933.5,260.2 L932.6,277.6Z";

export function DestinationLocator({ locale, title, region, latitude, longitude }: { locale: Locale; title: string; region: string; latitude: number; longitude: number }) {
  const copy = LABELS[locale];
  const mapX = 60 + ((longitude - 5.956) / (10.492 - 5.956)) * 880;
  const mapY = 50 + ((47.808 - latitude) / (47.808 - 45.818)) * 480;
  const x = 8 + (mapX / 1000) * 84;
  const y = 8 + (mapY / 580) * 84;
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
        <path className={styles.mapShadow} d={SWITZERLAND_PATH} />
        <path className={styles.mapLand} d={SWITZERLAND_PATH} />
        <g className={styles.mapLakes}>
          <path d="M76 414c17-17 40-27 68-31 29-5 49-13 72-30-10 25-28 44-54 58-30 16-58 22-86 16-7-4-7-8 0-13Z" />
          <path d="M244 246c17-15 31-23 42-24 8 6 7 16-3 28-13 15-28 22-45 20-7-8-5-16 6-24Z" />
          <path d="M301 232c14-10 26-12 36-6 4 7 0 15-13 24-11 7-23 10-35 7-4-8 0-16 12-25Z" />
          <path d="M497 258c8-17 19-22 33-15 10 5 18 2 25-9 3 15-3 27-18 36-14 8-26 8-36 0-5-4-6-8-4-12Z" />
          <path d="M558 229c8-13 18-18 30-14 13 4 22 1 29-9 0 14-8 25-23 33-16 8-28 8-36 0-3-3-3-6 0-10Z" />
          <path d="M663 156c18-11 38-15 60-11 20 3 38 1 54-8-7 18-24 31-51 38-27 7-48 5-63-6-4-5-4-9 0-13Z" />
        </g>
      </svg>
      <div className={styles.mapPin} style={{ left: `${x}%`, top: `${y}%` }} aria-hidden><span /><i /></div>
      <div className={styles.mapLabel} style={{ left: `${x}%`, top: `${y}%` }}>{title}</div><span className={styles.mapNorth} aria-hidden>N ↑</span>
    </div>
  </section>;
}
