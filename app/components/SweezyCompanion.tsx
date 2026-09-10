import Image from "next/image";
import styles from "./SweezyCompanion.module.css";

export type CompanionPose = "welcome" | "route" | "done" | "guide" | "planning" | "wave" | "reader" | "greeting";

export function SweezyCompanion({ pose, className = "", priority = false }: {
  pose: CompanionPose;
  className?: string;
  priority?: boolean;
}) {
  return <span className={`${styles.companion} ${className}`} data-pose={pose} aria-hidden="true">
    <Image src={`/brand/companion/${pose}.${pose === "reader" || pose === "greeting" ? "png" : "webp"}`} alt="" fill
      sizes="(max-width: 600px) 260px, 400px" priority={priority} />
  </span>;
}
