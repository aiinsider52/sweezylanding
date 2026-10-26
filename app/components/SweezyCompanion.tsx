import Image from "next/image";
import styles from "./SweezyCompanion.module.css";
import { SWEEZY_COMPANION } from "../../data/companion";

export type CompanionPose = "welcome" | "route" | "done" | "guide" | "planning" | "wave" | "reader" | "greeting";

export function SweezyCompanion({ pose, className = "", priority = false, sizes = "(max-width: 600px) 260px, 400px" }: {
  pose: CompanionPose;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return <span className={`${styles.companion} ${className}`} data-pose={pose} data-companion={SWEEZY_COMPANION.id} aria-hidden="true">
    <Image src={`/brand/companion/${pose}.${pose === "reader" || pose === "greeting" ? "png" : "webp"}`} alt="" fill
      sizes={sizes} priority={priority} />
  </span>;
}
