"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import type { ShowcaseMode } from "../../../lib/landing-copy";
import styles from "./landing.module.css";

export function ShowcaseTabs({ modes }: { modes: ShowcaseMode[] }) {
  const [activeId, setActiveId] = useState<ShowcaseMode["id"]>(modes[0].id);
  const [activeFrame, setActiveFrame] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = modes.find((mode) => mode.id === activeId) ?? modes[0];

  const moveFrame = (delta: number) => {
    setActiveFrame((current) => (current + delta + active.images.length) % active.images.length);
  };

  const framePosition = (index: number) => {
    const offset = (index - activeFrame + active.images.length) % active.images.length;
    if (offset === 0) return "main";
    if (offset === 1) return "right";
    if (offset === active.images.length - 1) return "left";
    return "hidden";
  };

  const selectMode = (id: ShowcaseMode["id"]) => {
    setActiveId(id);
    setActiveFrame(0);
  };

  const moveFocus = (index: number) => {
    const nextIndex = (index + modes.length) % modes.length;
    selectMode(modes[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className={styles.showcase}>
      <div className={styles.showcaseTabs} role="tablist" aria-label="Sweezy product areas">
        {modes.map((mode, index) => {
          const isActive = mode.id === active.id;
          return (
            <button
              key={mode.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`${baseId}-${mode.id}-tab`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${baseId}-${mode.id}-panel`}
              tabIndex={isActive ? 0 : -1}
              className={isActive ? styles.showcaseTabActive : styles.showcaseTab}
              onClick={() => selectMode(mode.id)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  moveFocus(index + 1);
                } else if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  moveFocus(index - 1);
                } else if (event.key === "Home") {
                  event.preventDefault();
                  moveFocus(0);
                } else if (event.key === "End") {
                  event.preventDefault();
                  moveFocus(modes.length - 1);
                }
              }}
            >
              {mode.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-${active.id}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-${active.id}-tab`}
        className={styles.showcasePanel}
      >
        <div className={styles.showcaseCopy} aria-live="polite">
          <div>
            <p>
              <span>{active.label}</span>
              <span>{String(activeFrame + 1).padStart(2, "0")} / {String(active.images.length).padStart(2, "0")}</span>
            </p>
            <h3>{active.title}</h3>
          </div>
          <span>{active.description}</span>
        </div>

        <div className={styles.showcaseBackdrop} aria-hidden="true">
          {active.images.map((image, index) => (
            <span
              key={image}
              className={styles.showcaseBackdropLayer}
              data-active={index === activeFrame ? "true" : "false"}
            >
              <Image src={image} alt="" fill unoptimized sizes="100vw" />
            </span>
          ))}
        </div>

        <div
          className={styles.showcaseDeck}
          role="group"
          aria-label={`${active.label} screens`}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              moveFrame(1);
            } else if (event.key === "ArrowLeft") {
              event.preventDefault();
              moveFrame(-1);
            }
          }}
        >
          {active.images.map((image, index) => (
            <button
              key={image}
              type="button"
              className={styles.showcaseCard}
              data-position={framePosition(index)}
              aria-label={`Select ${active.label} screen ${index + 1} of ${active.images.length}`}
              aria-pressed={index === activeFrame}
              onClick={() => setActiveFrame(index)}
            >
              <Image
                src={image}
                alt={`${active.label}: ${active.title}, screen ${index + 1} of ${active.images.length}`}
                fill
                unoptimized
                priority={active.id === "path"}
                sizes="(max-width: 760px) 60vw, 310px"
              />
            </button>
          ))}

          <div className={styles.showcaseDeckNav} aria-label={`${active.label} screen controls`}>
            {active.images.map((image, index) => (
              <button
                key={image}
                type="button"
                aria-label={`Show screen ${index + 1}`}
                aria-current={index === activeFrame ? "true" : undefined}
                onClick={() => setActiveFrame(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
