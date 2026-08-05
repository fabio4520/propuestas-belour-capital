"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/* Easing tipo "out-expo" — sensación premium y suave */
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Reveal — anima la entrada en scroll (fade + desplazamiento vertical).
 * `once` evita re-disparos al volver a entrar en viewport.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* Variants para listas con stagger (cards, equipo, etc.) */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};
