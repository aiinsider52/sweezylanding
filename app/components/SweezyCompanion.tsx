import Image from "next/image";
import styles from "./SweezyCompanion.module.css";
import { SWEEZY_COMPANION } from "../../data/companion";

export type CompanionPose =
  | "home-discover" | "home-welcome" | "home-route" | "home-done"
  | "home-help" | "home-community" | "footer" | "download"
  | "travel-kit" | "guides" | "starter" | "services" | "team"
  | "about" | "places" | "partners" | "planner" | "post-writer"
  | "jobs" | "article-reader" | "community";

export function SweezyCompanion({ pose, className = "", priority = false, sizes = "(max-width: 600px) 260px, 400px" }: {
  pose: CompanionPose;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return <span className={`${styles.companion} ${className}`} data-pose={pose} data-companion={SWEEZY_COMPANION.id} aria-hidden="true">
    <Image src={`/brand/companion/${pose}.webp`} alt="" fill
      sizes={sizes} priority={priority}
      // These WebPs are optimized at export. Serve alpha unchanged even when
      // a client's Accept header would make Next fall back to JPEG.
      unoptimized />
  </span>;
}
