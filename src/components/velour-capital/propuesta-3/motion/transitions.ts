import type { Transition } from "framer-motion";

/*
 * Curvas de easing reutilizables — motion institucional: nunca bounce,
 * nunca overshoot, nunca "juguetón". Entradas expansivas y suaves.
 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_SOFT = [0.25, 0.1, 0.25, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 26,
};

export const SPRING_MAGNETIC: Transition = {
  type: "spring",
  stiffness: 150,
  damping: 15,
};

/* Reveals de sección — 0.6-0.8s */
export const SMOOTH: Transition = {
  duration: 0.7,
  ease: EASE_OUT_EXPO,
};

/* Hero / preloader — 0.9-1.2s */
export const SMOOTH_SLOW: Transition = {
  duration: 1,
  ease: EASE_OUT_EXPO,
};

/* Micro-interacciones — 0.2-0.3s */
export const MICRO: Transition = {
  duration: 0.25,
  ease: EASE_SOFT,
};
