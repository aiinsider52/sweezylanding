import Image from "next/image";
import styles from "./landing.module.css";

type AppFrameClusterProps = {
  frames: readonly [string, string, string];
  alt: string;
  priority?: boolean;
};

export function AppFrameCluster({ frames, alt, priority = false }: AppFrameClusterProps) {
  return (
    <div className={styles.appFrameCluster}>
      <div className={styles.appFrameClusterItem} data-position="left">
        <div className={styles.appFrameMotionLayer}>
          <Image src={frames[0]} alt="" fill sizes="(max-width: 760px) 35vw, 230px" />
        </div>
      </div>
      <div className={styles.appFrameClusterItem} data-position="main">
        <div className={styles.appFrameMotionLayer}>
          <Image src={frames[1]} alt={alt} fill priority={priority} sizes="(max-width: 760px) 58vw, 310px" />
        </div>
      </div>
      <div className={styles.appFrameClusterItem} data-position="right">
        <div className={styles.appFrameMotionLayer}>
          <Image src={frames[2]} alt="" fill sizes="(max-width: 760px) 35vw, 230px" />
        </div>
      </div>
    </div>
  );
}
