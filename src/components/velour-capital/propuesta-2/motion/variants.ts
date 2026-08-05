import type { Variants } from "framer-motion";
import { EASE_OUT_EXPO, SMOOTH } from "./transitions";

/* Fade + subida — reveal base de secciones */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: SMOOTH },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
};

/* Contenedor con stagger para listas (cards, pills, pasos) */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: SMOOTH },
};

/* Reveal de titulares palabra por palabra */
export const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.1 },
  },
};

export const wordItem: Variants = {
  hidden: { opacity: 0, y: "0.5em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

/* Viewport por defecto para whileInView (una sola vez) */
export const viewportOnce = { once: true, amount: 0.3 } as const;
