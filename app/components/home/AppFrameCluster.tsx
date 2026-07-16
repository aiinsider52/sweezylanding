"use client";

import Image from "next/image";
import { Pause, Play } from "@phosphor-icons/react";
import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./landing.module.css";

type AppFrameClusterProps = {
  frames: readonly [string, string, string];
  alt: string;
  priority?: boolean;
};

export function AppFrameCluster({ frames, alt, priority = false }: AppFrameClusterProps) {
  const clusterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(clusterRef, { amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(1);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);

  useEffect(() => {
    if (!isInView || reduceMotion || userPaused || hoverPaused) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % frames.length);
    }, 3800);

    return () => window.clearInterval(interval);
  }, [frames.length, hoverPaused, isInView, reduceMotion, userPaused]);

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
    >
      {frames.map((frame, index) => {
        const isActive = index === activeIndex;
        return (
          <div key={frame} className={styles.appFrameClusterItem} data-position={positionFor(index)}>
            <div className={styles.appFrameMotionLayer}>
              <Image
                src={frame}
                alt={isActive ? alt : ""}
                fill
                priority={priority && index === 1}
                sizes={isActive ? "(max-width: 760px) 58vw, 310px" : "(max-width: 760px) 35vw, 230px"}
              />
            </div>
          </div>
        );
      })}

      <div className={styles.appFrameCarouselControls} aria-label="Carousel controls">
        {frames.map((frame, index) => (
          <button
            key={frame}
            type="button"
            aria-label={`Show screen ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
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
    </div>
  );
}
