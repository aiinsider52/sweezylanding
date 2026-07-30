"use client";

import { useEffect, useRef, useState } from "react";
import type { LandingCopy } from "../../../lib/landing-copy";
import type { Locale } from "../../../lib/i18n";
import { APP_STORE_URL } from "../../../lib/links";
import styles from "./landing.module.css";
import { useReducedMotionPreference } from "./useReducedMotionPreference";

const CLIP_OVERLAP = 0.25;

const clips = [
  {
    src: "/cinematic/journey-01-kyiv-station.mp4",
    poster: "/cinematic/journey-01-kyiv-station-poster.webp",
    duration: 5.041667,
  },
  {
    src: "/cinematic/journey-02-station-carpathians.mp4",
    poster: "/cinematic/journey-02-station-carpathians-poster.webp",
    duration: 5.041667,
  },
  {
    src: "/cinematic/journey-03-carpathians-alps.mp4",
    poster: "/cinematic/journey-03-carpathians-alps-poster.webp",
    duration: 5.041667,
  },
  {
    src: "/cinematic/journey-04-alps-lucerne.mp4",
    poster: "/cinematic/journey-04-alps-lucerne-poster.webp",
    duration: 7.041667,
  },
] as const;

const clipStarts = clips.map((_, index) =>
  clips
    .slice(0, index)
    .reduce((total, clip) => total + clip.duration - CLIP_OVERLAP, 0),
);
const journeyDuration =
  clips.reduce((total, clip) => total + clip.duration, 0) -
  CLIP_OVERLAP * (clips.length - 1);

const journeyCopy: Record<
  Locale,
  {
    ariaLabel: string;
    route: string;
    scenes: readonly string[];
    scroll: string;
    arrival: string;
    finalTitle: string;
  }
> = {
  en: {
    ariaLabel: "A cinematic journey from Kyiv to Lucerne",
    route: "Ukraine → Switzerland",
    scenes: ["Kyiv · Departure", "Westbound · Carpathians", "Above the Alps", "Lucerne · Arrival"],
    scroll: "Scroll to travel",
    arrival: "Your route continues here",
    finalTitle: "Switzerland, already mapped.",
  },
  uk: {
    ariaLabel: "Кінематографічна подорож із Києва до Люцерна",
    route: "Україна → Швейцарія",
    scenes: ["Київ · Відправлення", "На захід · Карпати", "Над Альпами", "Люцерн · Прибуття"],
    scroll: "Гортайте, щоб вирушити",
    arrival: "Ваш маршрут продовжується тут",
    finalTitle: "Швейцарія — вже по кроках.",
  },
  de: {
    ariaLabel: "Eine filmische Reise von Kyiv nach Luzern",
    route: "Ukraine → Schweiz",
    scenes: ["Kyiv · Abfahrt", "Westwärts · Karpaten", "Über den Alpen", "Luzern · Ankunft"],
    scroll: "Scrollen und losreisen",
    arrival: "Dein Weg geht hier weiter",
    finalTitle: "Die Schweiz. Schon eingeordnet.",
  },
};

type CinematicJourneyProps = {
  locale: Locale;
  hero: LandingCopy["hero"];
};

export function CinematicJourney({ locale, hero }: CinematicJourneyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const reduceMotion = useReducedMotionPreference();
  const [sceneIndex, setSceneIndex] = useState(0);
  const [introHidden, setIntroHidden] = useState(false);
  const [arrivalVisible, setArrivalVisible] = useState(false);
  const copy = journeyCopy[locale];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduceMotion) {
      section?.style.setProperty("--journey-progress", "0");
      return;
    }

    let frameId = 0;
    let queued = false;
    let currentScene = 0;
    let isIntroHidden = false;
    let isArrivalVisible = false;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const travelDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / travelDistance, 0), 1);
      const timelineTime = progress * journeyDuration;

      section.style.setProperty("--journey-progress", progress.toFixed(4));

      videoRefs.current.forEach((video, index) => {
        if (!video) return;

        const clip = clips[index];
        const clipStart = clipStarts[index];
        const rawLocalTime = timelineTime - clipStart;
        const localTime = Math.min(Math.max(rawLocalTime, 0), clip.duration - 1 / 24);
        const isNearTimeline =
          rawLocalTime >= -CLIP_OVERLAP && rawLocalTime <= clip.duration + CLIP_OVERLAP;

        let opacity = rawLocalTime >= 0 && rawLocalTime <= clip.duration ? 1 : 0;
        if (index > 0 && rawLocalTime >= 0 && rawLocalTime < CLIP_OVERLAP) {
          opacity = rawLocalTime / CLIP_OVERLAP;
        }
        if (
          index < clips.length - 1 &&
          rawLocalTime > clip.duration - CLIP_OVERLAP &&
          rawLocalTime <= clip.duration
        ) {
          opacity = (clip.duration - rawLocalTime) / CLIP_OVERLAP;
        }

        video.style.opacity = Math.min(Math.max(opacity, 0), 1).toFixed(3);

        if (
          isNearTimeline &&
          video.readyState >= HTMLMediaElement.HAVE_METADATA &&
          Math.abs(video.currentTime - localTime) > 1 / 30
        ) {
          video.currentTime = localTime;
        }
      });

      let nextScene = 0;
      for (let index = 1; index < clips.length; index += 1) {
        if (timelineTime >= clipStarts[index] + CLIP_OVERLAP / 2) {
          nextScene = index;
        }
      }
      if (nextScene !== currentScene) {
        currentScene = nextScene;
        setSceneIndex(nextScene);
      }

      const nextIntroHidden = progress > 0.23;
      if (nextIntroHidden !== isIntroHidden) {
        isIntroHidden = nextIntroHidden;
        setIntroHidden(nextIntroHidden);
      }

      const nextArrivalVisible = progress > 0.78;
      if (nextArrivalVisible !== isArrivalVisible) {
        isArrivalVisible = nextArrivalVisible;
        setArrivalVisible(nextArrivalVisible);
      }

      queued = false;
    };

    const requestUpdate = () => {
      if (queued) return;
      queued = true;
      frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className={styles.cinematicJourney}
      aria-label={copy.ariaLabel}
      data-reduced-motion={reduceMotion ? "true" : "false"}
    >
      <div className={styles.cinematicSticky}>
        <div className={styles.cinematicMedia} aria-hidden="true">
          {clips.map((clip, index) => (
            <video
              key={clip.src}
              ref={(node) => {
                videoRefs.current[index] = node;
              }}
              className={styles.cinematicVideo}
              data-scene={index}
              src={clip.src}
              poster={clip.poster}
              preload={index === 0 ? "auto" : "metadata"}
              muted
              playsInline
              disablePictureInPicture
            />
          ))}
          <div className={styles.cinematicShade} />
          <div className={styles.cinematicGrain} />
        </div>

        <div className={styles.cinematicRoute} aria-hidden="true">
          <span>UA</span>
          <div><i /></div>
          <span>CH</span>
        </div>

        <div className={styles.cinematicMeta}>
          <span>Sweezy</span>
          <span>{copy.route}</span>
          <span>00{sceneIndex + 1} / 004</span>
        </div>

        <div className={styles.cinematicSceneLabel} aria-live="polite">
          <span>{String(sceneIndex + 1).padStart(2, "0")}</span>
          <p>{copy.scenes[sceneIndex]}</p>
        </div>

        <div className={styles.cinematicIntro} data-hidden={introHidden ? "true" : "false"}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1>
            {hero.title}
            <span>{hero.accent}</span>
          </h1>
          <p className={styles.cinematicIntroBody}>{hero.body}</p>
          <div className={styles.heroActions}>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.primaryButton}
              tabIndex={introHidden ? -1 : undefined}
            >
              {hero.primary}
            </a>
            <a href="#product" className={styles.cinematicSecondaryButton} tabIndex={introHidden ? -1 : undefined}>
              {hero.secondary}
            </a>
          </div>
          <p className={styles.heroNote}>{hero.footnote}</p>
        </div>

        <div className={styles.cinematicArrival} data-visible={arrivalVisible ? "true" : "false"}>
          <p className={styles.eyebrow}>{copy.arrival}</p>
          <h2>{copy.finalTitle}</h2>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.primaryButton}
            tabIndex={arrivalVisible ? undefined : -1}
          >
            {hero.primary}
          </a>
        </div>

        <div className={styles.cinematicScrollHint} aria-hidden="true">
          <span>{copy.scroll}</span>
          <i />
        </div>
      </div>
    </section>
  );
}
