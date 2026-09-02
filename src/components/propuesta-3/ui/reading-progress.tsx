"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Barra fina de progreso de lectura, anclada al borde superior. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-0.5 origin-left bg-gradient-to-r from-belour-perla via-belour-hueso to-belour-perla"
      aria-hidden
    />
  );
}
