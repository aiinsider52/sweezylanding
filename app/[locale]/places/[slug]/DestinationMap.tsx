"use client";

import { useId, useState } from "react";
import { SWISS_LAKES, SWITZERLAND_PATH } from "../../../../data/switzerland-map";
import { layoutSwissMapMarkers, projectSwissCoordinates, swissMapViewBox, type MapCoordinates } from "../../../../lib/swiss-map";
import styles from "../travel.module.css";

type MapPlace = { title: string; number: string; href: string; coordinates: MapCoordinates };
type Labels = { map: string; country: string; zoomIn: string; zoomOut: string; reset: string; selected: string; nearby: string; attribution: string; view: string };

export function DestinationMap({ title, coordinates, nearby, labels }: { title: string; coordinates: MapCoordinates; nearby: MapPlace[]; labels: Labels }) {
  const [zoom, setZoom] = useState(1);
  const [hovered, setHovered] = useState<string | null>(null);
  const id = useId().replace(/:/g, "");
  const point = projectSwissCoordinates(coordinates);
  const landId = `swiss-land-${id}`;
  const waterId = `swiss-water-${id}`;
  const textureId = `swiss-texture-${id}`;
  const highlighted = nearby.find((place) => place.href === hovered);
  const markers = layoutSwissMapMarkers(point, nearby.map((place) => projectSwissCoordinates(place.coordinates)), zoom);

  return <div className={styles.mapCanvas}>
    <div className={styles.mapTopline}><span>{labels.country} <b>CH</b></span><span aria-hidden="true">N ↑</span></div>
    <div className={styles.mapStage}>
      <svg id={`swiss-map-${id}`} viewBox={swissMapViewBox(point, zoom)} role="group" aria-label={`${labels.map}: ${title}`}>
        <defs>
          <linearGradient id={landId} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#536357" /><stop offset="1" stopColor="#2c3c32" /></linearGradient>
          <linearGradient id={waterId} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#a6d9df" /><stop offset="1" stopColor="#699fad" /></linearGradient>
          <pattern id={textureId} width="7" height="7" patternUnits="userSpaceOnUse"><path d="M0 7 7 0" stroke="#e6f2e5" strokeOpacity=".045" strokeWidth=".7" /></pattern>
        </defs>
        <g aria-hidden="true">
          <path className={styles.mapShadow} d={SWITZERLAND_PATH} />
          <path className={styles.mapLand} d={SWITZERLAND_PATH} fill={`url(#${landId})`} />
          <path d={SWITZERLAND_PATH} fill={`url(#${textureId})`} />
          <g className={styles.mapLakes} fill={`url(#${waterId})`}>{SWISS_LAKES.map((lake) => <path key={lake.name} d={lake.d} />)}</g>
        </g>
        {nearby.map((place, index) => {
          const { point: actual, badge: p } = markers[index];
          return <a key={place.href} href={place.href} aria-label={`${place.number}: ${place.title}`} className={styles.mapNearbyPin} onMouseEnter={() => setHovered(place.href)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(place.href)} onBlur={() => setHovered(null)}>
            <title>{place.title}</title>
            <path d={`M${actual.x} ${actual.y} L${p.x} ${p.y}`} fill="none" stroke="#bdcbb6" strokeOpacity=".65" strokeWidth={1 / zoom} />
            <circle cx={actual.x} cy={actual.y} r={3 / zoom} fill="#d7e5cc" />
            <circle cx={p.x} cy={p.y} r={40 / zoom} fill="transparent" />
            <circle className={styles.mapNearbyCircle} cx={p.x} cy={p.y} r={28 / zoom} />
            <text x={p.x} y={p.y} dominantBaseline="central" textAnchor="middle" fontSize={30 / zoom}>{place.number}</text>
          </a>;
        })}
        <g className={styles.mapSelectedPin} transform={`translate(${point.x},${point.y})`} aria-hidden="true">
          <circle r={50 / zoom} fill="#adff00" fillOpacity=".12" />
          <circle r={41 / zoom} fill="none" stroke="#adff00" strokeOpacity=".45" strokeWidth={1 / zoom} />
          <circle r={30 / zoom} fill="#adff00" stroke="#142018" strokeWidth={3 / zoom} />
          <text dominantBaseline="central" textAnchor="middle" fontSize={30 / zoom} fill="#101810">01</text>
        </g>
      </svg>
    </div>
    <div className={styles.mapControls} role="group" aria-label={labels.view}>
      <button type="button" aria-label={labels.zoomOut} aria-controls={`swiss-map-${id}`} disabled={zoom === 1} onClick={() => setZoom((value) => Math.max(1, value - .5))}>−</button>
      <span role="status" aria-live="polite">{zoom.toFixed(1)}×</span>
      <button type="button" aria-label={labels.zoomIn} aria-controls={`swiss-map-${id}`} disabled={zoom === 3} onClick={() => setZoom((value) => Math.min(3, value + .5))}>+</button>
      <button type="button" className={styles.mapReset} onClick={() => setZoom(1)}>{labels.reset}<span aria-hidden="true">↗</span></button>
    </div>
    <div className={styles.mapCaption}>
      <span className={styles.mapCaptionNumber} aria-hidden="true">{highlighted?.number ?? "01"}</span>
      <div><span>{highlighted ? labels.nearby : labels.selected}</span><strong>{highlighted?.title ?? title}</strong></div>
    </div>
    <p className={styles.mapAttribution}>{labels.attribution}: <a href="https://www.naturalearthdata.com/" target="_blank" rel="noreferrer noopener">Natural Earth</a> · © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer noopener">OpenStreetMap</a></p>
  </div>;
}
