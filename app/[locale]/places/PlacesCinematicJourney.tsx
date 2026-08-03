"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "../../../lib/i18n";
import { useReducedMotionPreference } from "../../components/home/useReducedMotionPreference";
import styles from "./travel.module.css";

const OVERLAP = 0.3;
const CLIP_DURATION = 5.041667;

const clips = [
  { src: "/cinematic/places/places-01-lake-tunnel.mp4", poster: "/cinematic/places/places-01-lake-tunnel-poster.webp" },
  { src: "/cinematic/places/places-02-tunnel-valley.mp4", poster: "/cinematic/places/places-02-tunnel-valley-poster.webp" },
  { src: "/cinematic/places/places-03-valley-mist.mp4", poster: "/cinematic/places/places-03-valley-mist-poster.webp" },
  { src: "/cinematic/places/places-04-mist-aletsch.mp4", poster: "/cinematic/places/places-04-mist-aletsch-poster.webp" },
] as const;

const clipStarts = clips.map((_, index) => index * (CLIP_DURATION - OVERLAP));
const timelineDuration = clips.length * CLIP_DURATION - OVERLAP * (clips.length - 1);

const COPY: Record<Locale, { route: string; scenes: string[]; scroll: string; final: string; explore: string }> = {
  en: { route: "Lake → Valley → Glacier", scenes: ["Lake Lucerne", "Through the mountain", "Lauterbrunnen Valley", "Above Aletsch Glacier"], scroll: "Scroll through Switzerland", final: "Switzerland opens one landscape at a time.", explore: "Explore all places" },
  uk: { route: "Озеро → Долина → Льодовик", scenes: ["Люцернське озеро", "Крізь гору", "Долина Лаутербруннен", "Над льодовиком Алеч"], scroll: "Гортайте крізь Швейцарію", final: "Швейцарія відкривається краєвид за краєвидом.", explore: "Дивитися всі місця" },
  de: { route: "See → Tal → Gletscher", scenes: ["Vierwaldstättersee", "Durch den Berg", "Lauterbrunnental", "Über dem Aletschgletscher"], scroll: "Durch die Schweiz scrollen", final: "Die Schweiz öffnet sich Landschaft für Landschaft.", explore: "Alle Orte entdecken" },
};

type Props = { locale: Locale; title: string; description: string; eyebrow: string; count: number; countLabel: string };

export function PlacesCinematicJourney({ locale, title, description, eyebrow, count, countLabel }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const reduceMotion = useReducedMotionPreference();
  const [sceneIndex, setSceneIndex] = useState(0);
  const [introHidden, setIntroHidden] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);
  const copy = COPY[locale];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduceMotion) {
      section?.style.setProperty("--places-progress", "0");
      return;
    }

    let frameId = 0;
    let queued = false;
    let currentScene = 0;
    let currentIntroHidden = false;
    let currentFinalVisible = false;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / travel, 0), 1);
      const time = progress * timelineDuration;
      section.style.setProperty("--places-progress", progress.toFixed(4));

      videoRefs.current.forEach((video, index) => {
        if (!video) return;
        const raw = time - clipStarts[index];
        const local = Math.min(Math.max(raw, 0), CLIP_DURATION - 1 / 24);
        let opacity = raw >= 0 && raw <= CLIP_DURATION ? 1 : 0;
        if (index > 0 && raw >= 0 && raw < OVERLAP) opacity = raw / OVERLAP;
        if (index < clips.length - 1 && raw > CLIP_DURATION - OVERLAP && raw <= CLIP_DURATION) opacity = (CLIP_DURATION - raw) / OVERLAP;
        video.style.opacity = Math.min(Math.max(opacity, 0), 1).toFixed(3);

        const near = raw >= -OVERLAP && raw <= CLIP_DURATION + OVERLAP;
        if (near && video.readyState >= HTMLMediaElement.HAVE_METADATA && Math.abs(video.currentTime - local) > 1 / 24) {
          video.currentTime = local;
        }
      });

      let nextScene = 0;
      for (let index = 1; index < clips.length; index += 1) {
        if (time >= clipStarts[index] + OVERLAP / 2) nextScene = index;
      }
      if (nextScene !== currentScene) { currentScene = nextScene; setSceneIndex(nextScene); }

      const nextIntro = progress > 0.2;
      if (nextIntro !== currentIntroHidden) { currentIntroHidden = nextIntro; setIntroHidden(nextIntro); }
      const nextFinal = progress > 0.79;
      if (nextFinal !== currentFinalVisible) { currentFinalVisible = nextFinal; setFinalVisible(nextFinal); }
      queued = false;
    };

    const requestUpdate = () => {
      if (queued) return;
      queued = true;
      frameId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [reduceMotion]);

  return (
    <section ref={sectionRef} className={styles.placesJourney} aria-label={copy.route} data-reduced-motion={reduceMotion ? "true" : "false"}>
      <div className={styles.placesSticky}>
        <div className={styles.placesMedia} aria-hidden="true">
          {clips.map((clip, index) => (
            <video key={clip.src} ref={(node) => { videoRefs.current[index] = node; }} className={styles.placesVideo} src={clip.src} poster={clip.poster} preload={index === 0 ? "auto" : "metadata"} muted playsInline disablePictureInPicture />
          ))}
          <div className={styles.placesShade} />
          <div className={styles.placesGrain} />
        </div>

        <div className={styles.placesMeta}><span>Sweezy Field Guide</span><span>{copy.route}</span><span>0{sceneIndex + 1} / 04</span></div>
        <div className={styles.placesProgress} aria-hidden="true"><i /></div>
        <div className={styles.placesScene} aria-live="polite"><span>{String(sceneIndex + 1).padStart(2, "0")}</span><p>{copy.scenes[sceneIndex]}</p></div>

        <div className={styles.placesIntro} data-hidden={introHidden ? "true" : "false"}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className={styles.placesCount}><strong>{count}</strong><span>{countLabel}</span></div>
        </div>

        <div className={styles.placesFinal} data-visible={finalVisible ? "true" : "false"}>
          <p className={styles.eyebrow}>{copy.scenes[3]}</p>
          <h2>{copy.final}</h2>
          <a href="#places-catalog" tabIndex={finalVisible ? undefined : -1}>{copy.explore}<span aria-hidden>↓</span></a>
        </div>

        <div className={styles.placesScroll} aria-hidden="true"><span>{copy.scroll}</span><i /></div>
      </div>
    </section>
  );
}

