"use client";

import Image from "next/image";
import { Pause, Play } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import styles from "./landing.module.css";
import { useReducedMotionPreference } from "./useReducedMotionPreference";

type AppFrameClusterProps = {
  frames: readonly [string, string, string];
  alt: string;
  priority?: boolean;
};

export function AppFrameCluster({ frames, alt, priority = false }: AppFrameClusterProps) {
  const clusterRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionPreference();
  const [isInView, setIsInView] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(1);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);

  useEffect(() => {
    const node = clusterRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(document.visibilityState === "visible");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (!isInView || !isDocumentVisible || reduceMotion || userPaused || hoverPaused) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % frames.length);
    }, 3800);

    return () => window.clearInterval(interval);
  }, [frames.length, hoverPaused, isDocumentVisible, isInView, reduceMotion, userPaused]);

  const positionFor = (index: number) => {
    if (index === activeIndex) return "main";
    if (index === (activeIndex + 1) % frames.length) return "right";
    return "left";
  };

  return (
    <div
      ref={clusterRef}
      className={styles.appFrameCluster}
      role="region"
      aria-roledescription="carousel"
      aria-label={alt}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setHoverPaused(true)}
      onBlurCapture={() => setHoverPaused(false)}
    >
      {frames.map((frame, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={frame}
            type="button"
            className={styles.appFrameClusterItem}
            data-position={positionFor(index)}
            aria-label={isActive ? `Current screen ${index + 1}` : `Show screen ${index + 1}`}
            aria-pressed={isActive}
            onClick={() => {
              setActiveIndex(index);
              setUserPaused(true);
            }}
          >
            <div className={styles.appFrameMotionLayer}>
              <Image
                src={frame}
                alt={isActive ? alt : ""}
                fill
                priority={priority && index === 1}
                sizes={isActive ? "(max-width: 760px) 58vw, 310px" : "(max-width: 760px) 35vw, 230px"}
              />
            </div>
          </button>
        );
      })}

      <div className={styles.appFrameCarouselControls} aria-label="Carousel controls">
        {frames.map((frame, index) => (
          <button
            key={frame}
            type="button"
            aria-label={`Show screen ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => {
              setActiveIndex(index);
              setUserPaused(true);
            }}
          />
        ))}
        <button
          type="button"
          className={styles.appFramePauseButton}
          aria-label={userPaused ? "Resume carousel" : "Pause carousel"}
          aria-pressed={userPaused}
          onClick={() => setUserPaused((paused) => !paused)}
        >
          {userPaused ? <Play size={11} weight="fill" aria-hidden /> : <Pause size={11} weight="fill" aria-hidden />}
        </button>
      </div>
      <span className={styles.srOnly} aria-live="polite">
        Screen {activeIndex + 1} of {frames.length}
      </span>
    </div>
  );
}
