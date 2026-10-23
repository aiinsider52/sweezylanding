"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { travelKitCopy, getTravelKitPlaces } from "../../../data/travel-kit";
import styles from "../../components/TravelKit.module.css";

const KEY = "sweezy-travel-wishlist-v1";

type ChecklistCopy = Pick<(typeof travelKitCopy)["uk"], "selected" | "select" | "reset" | "saved" | "unavailable" | "season" | "duration" | "read" | "official">;

export function TravelChecklist({ copy, places }: { copy: ChecklistCopy; places: ReturnType<typeof getTravelKitPlaces> }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [available, setAvailable] = useState(true);
  useEffect(() => {
    try {
      const value: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      if (Array.isArray(value)) setSelected(Array.from(new Set(value.filter((item): item is string => typeof item === "string" && places.some((place) => place.slug === item)))));
    } catch { setAvailable(false); }
  }, [places]);
  function save(value: string[]) {
    setSelected(value);
    try { localStorage.setItem(KEY, JSON.stringify(value)); } catch { setAvailable(false); }
  }

  return <>
    <div className={styles.toolbar}>
      <div><p role="status" aria-live="polite"><strong>{selected.length}</strong> / {places.length} {copy.selected}</p><small>{available ? copy.saved : copy.unavailable}</small></div>
      <button type="button" disabled={!selected.length} onClick={() => save([])}>{copy.reset} <span aria-hidden="true">↺</span></button>
    </div>
    <div className={styles.grid}>
      {places.map((place, index) => <article className={styles.card} key={place.slug} data-selected={selected.includes(place.slug)}>
        <Link className={styles.cardImage} href={place.href}><Image src={place.image} alt={place.alt} fill sizes="(max-width: 700px) 100vw, 50vw" /><span>{String(index + 1).padStart(2, "0")}</span></Link>
        <div className={styles.cardCopy}><p className={styles.region}>{place.region}</p><h3><Link href={place.href}>{place.title}</Link></h3><p>{place.summary}</p>
          <dl><div><dt>{copy.season}</dt><dd>{place.season}</dd></div><div><dt>{copy.duration}</dt><dd>{place.duration}</dd></div></dl>
          <div className={styles.cardActions}><label><input type="checkbox" checked={selected.includes(place.slug)} onChange={() => save(selected.includes(place.slug) ? selected.filter((item) => item !== place.slug) : [...selected, place.slug])} aria-label={`${copy.select}: ${place.title}`} />{copy.select}</label><Link href={place.href}>{copy.read} ↗</Link></div>
          <a className={styles.sourceLink} href={place.source.url} target="_blank" rel="noreferrer noopener">{copy.official} ↗</a>
        </div>
      </article>)}
    </div>
  </>;
}
