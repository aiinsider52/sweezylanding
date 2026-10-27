import Image from "next/image";
import styles from "./SweezyCompanion.module.css";
import { SWEEZY_COMPANION } from "../../data/companion";
import { companionImage, companionImageAlt, type CompanionPose } from "../../data/companion-images";
import type { Locale } from "../../lib/i18n";

export type { CompanionPose } from "../../data/companion-images";

export function SweezyCompanion({ pose, locale, className = "", priority = false, sizes = "(max-width: 600px) 260px, 400px" }: {
  pose: CompanionPose;
  locale: Locale;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return <span className={`${styles.companion} ${className}`} data-pose={pose} data-companion={SWEEZY_COMPANION.id}>
    <Image src={companionImage(pose)} alt={companionImageAlt(pose, locale)} fill
      sizes={sizes} priority={priority}
      // These WebPs are optimized at export. Serve alpha unchanged even when
      // a client's Accept header would make Next fall back to JPEG.
      unoptimized />
  </span>;
}
