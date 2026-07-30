"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./landing.module.css";
import { useReducedMotionPreference } from "./useReducedMotionPreference";

type ProofItem = {
  value: string;
  label: string;
};

type ParsedValue = {
  number: number | null;
  prefix: string;
  suffix: string;
};

const COUNT_DURATION = 650;
const COUNT_STAGGER = 45;

function parseValue(value: string): ParsedValue {
  const match = value.match(/^(.*?)(\d+)(.*?)$/);
  if (!match) return { number: null, prefix: "", suffix: "" };

  return {
    number: Number(match[2]),
    prefix: match[1],
    suffix: match[3],
  };
}

export function AnimatedProof({ items }: { items: ProofItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotionPreference();
  const parsed = useMemo(() => items.map((item) => parseValue(item.value)), [items]);
  const [visibleValues, setVisibleValues] = useState(() =>
    items.map((item, index) => {
      const value = parsed[index];
      return value.number === null ? item.value : `${value.prefix}0${value.suffix}`;
    }),
  );
  const [shouldCount, setShouldCount] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setVisibleValues(items.map((item) => item.value));
      return;
    }

    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setShouldCount(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldCount(true);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [items, reduceMotion]);

  useEffect(() => {
    if (!shouldCount || reduceMotion) return;

    const startedAt = performance.now();
    const totalDuration = COUNT_DURATION + COUNT_STAGGER * Math.max(items.length - 1, 0);
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - startedAt;

      setVisibleValues(
        items.map((item, index) => {
          const value = parsed[index];
          if (value.number === null) return item.value;

          const progress = Math.min(Math.max((elapsed - index * COUNT_STAGGER) / COUNT_DURATION, 0), 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(value.number * eased);
          return `${value.prefix}${current}${value.suffix}`;
        }),
      );

      if (elapsed < totalDuration) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [items, parsed, reduceMotion, shouldCount]);

  return (
    <section ref={sectionRef} className={styles.proof} aria-label="Sweezy in numbers">
      {items.map((item, index) => (
        <div key={item.label}>
          <strong aria-label={item.value}>{visibleValues[index]}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </section>
  );
}
