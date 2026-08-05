import type { Transition } from "framer-motion";

/* Curvas de easing reutilizables — sensación premium, nunca brusca */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 26,
};

export const SPRING_SNAPPY: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

export const SMOOTH: Transition = {
  duration: 0.7,
  ease: EASE_OUT_EXPO,
};

export const SMOOTH_SLOW: Transition = {
  duration: 1,
  ease: EASE_OUT_EXPO,
};
