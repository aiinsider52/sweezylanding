import Image from "next/image";
import styles from "./SweezyCompanion.module.css";

export type CompanionPose = "welcome" | "route" | "done" | "guide" | "planning" | "wave";

export function SweezyCompanion({ pose, className = "", priority = false }: {
  pose: CompanionPose;
  className?: string;
  priority?: boolean;
}) {
  return <span className={`${styles.companion} ${className}`} data-pose={pose} aria-hidden="true">
    <Image src={`/brand/companion/${pose}.webp`} alt="" fill
      sizes="(max-width: 600px) 150px, 300px" priority={priority} />
  </span>;
}
