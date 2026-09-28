"use client";

import { useEffect, useState } from "react";
import { ArrowCounterClockwise } from "@phosphor-icons/react";
import { firstWeek } from "../../../data/first-week";
import type { Locale } from "../../../lib/i18n";
import styles from "../../components/StarterKit.module.css";

const KEY = "sweezy-first-week-v1";
const validIds = new Set(Array.from({ length: 7 }, (_, day) => [`${day}-0`, `${day}-1`]).flat());

export function Checklist({ locale }: { locale: Locale }) {
  const copy = firstWeek[locale];
  const [checked, setChecked] = useState<string[]>([]);
  const [storageAvailable, setStorageAvailable] = useState(true);
  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      if (Array.isArray(saved)) setChecked(Array.from(new Set(saved.filter((id): id is string => typeof id === "string" && validIds.has(id)))));
    } catch { setStorageAvailable(false); }
  }, []);
  function save(next: string[]) {
    setChecked(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); }
    catch { setStorageAvailable(false); }
  }
  return <>
    <div className={styles.toolbar}>
      <p role="status">{checked.length} / 14 {copy.progress}</p>
      <button type="button" disabled={!checked.length} onClick={() => save([])}><ArrowCounterClockwise size={18} aria-hidden />{copy.reset}</button>
    </div>
    <p className={styles.saved}>{storageAvailable ? copy.saved : copy.unavailable}</p>
    <div className={styles.days}>
      {copy.days.map((day, index) => <section className={styles.day} key={index}>
        <span className={styles.number} aria-hidden>{String(index + 1).padStart(2, "0")}</span>
        <div><h2>{day.title}</h2>
          {day.tasks.map((task, item) => {
            const id = `${index}-${item}`;
            return <label className={styles.task} key={id}>
              <input type="checkbox" checked={checked.includes(id)} onChange={() => save(checked.includes(id) ? checked.filter(value => value !== id) : [...checked, id])} />
              <span>{task}</span>
            </label>;
          })}
        </div>
      </section>)}
    </div>
  </>;
}
