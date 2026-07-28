"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./landing.module.css";

type MotionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  dataTone?: number;
  hoverLift?: boolean;
};

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function motionStyle(delay: number) {
  return { "--motion-delay": `${Math.round(delay * 1000)}ms` } as CSSProperties;
}

function classes(className?: string, hoverLift = false) {
  return [styles.motionReveal, hoverLift ? styles.motionRevealLift : "", className ?? ""]
    .filter(Boolean)
    .join(" ");
}

export function MotionReveal({ children, className, delay = 0, hoverLift = false }: MotionProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={classes(className, hoverLift)} data-visible={visible} style={motionStyle(delay)}>
      {children}
    </div>
  );
}

export function MotionArticle({ children, className, delay = 0, dataTone }: MotionProps) {
  const { ref, visible } = useReveal<HTMLElement>();
  return (
    <article
      ref={ref}
      className={classes(className)}
      data-tone={dataTone}
      data-visible={visible}
      style={motionStyle(delay)}
    >
      {children}
    </article>
  );
}

export function MotionListItem({ children, className, delay = 0 }: MotionProps) {
  const { ref, visible } = useReveal<HTMLLIElement>();
  return (
    <li ref={ref} className={classes(className)} data-visible={visible} style={motionStyle(delay)}>
      {children}
    </li>
  );
}
