"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type MotionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  dataTone?: number;
  hoverLift?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

function reveal(reduceMotion: boolean | null, delay: number) {
  return {
    initial: reduceMotion ? false : { opacity: 0, y: 26, scale: 0.988 },
    whileInView: reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.18, margin: "0px 0px -70px" },
    transition: { duration: 0.58, delay, ease },
  };
}

export function MotionReveal({ children, className, delay = 0, hoverLift = false }: MotionProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      {...reveal(reduceMotion, delay)}
      whileHover={!reduceMotion && hoverLift ? { y: -5 } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function MotionArticle({ children, className, delay = 0, dataTone }: MotionProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      className={className}
      data-tone={dataTone}
      {...reveal(reduceMotion, delay)}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
    >
      {children}
    </motion.article>
  );
}

export function MotionListItem({ children, className, delay = 0 }: MotionProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.li className={className} {...reveal(reduceMotion, delay)}>
      {children}
    </motion.li>
  );
}
