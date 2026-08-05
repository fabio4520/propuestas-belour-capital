import type { Variants } from "framer-motion";
import { EASE_OUT_EXPO, SMOOTH } from "./transitions";

/* Fade + subida — reveal base de secciones. translateY máx 24-28px, sin overshoot */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: SMOOTH },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
};

/* Contenedor con stagger para listas (cards, pasos, nodos) */
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
  hidden: { opacity: 0, y: "0.6em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

/* Viewport por defecto para whileInView (una sola vez) */
export const viewportOnce = { once: true, amount: 0.25 } as const;

/* Viewport para grids altos (>1000px): amount 0.25 deja las cards
 * invisibles porque es fracción del contenedor completo, no del viewport. */
export const viewportGrid = { once: true, amount: 0.05 } as const;
