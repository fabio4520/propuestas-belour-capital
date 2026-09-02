"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Cursor de seguimiento dorado (punto que crece a anillo sobre elementos
 * interactivos). No oculta el cursor nativo. Solo desktop con puntero fino;
 * desactivado con reduced-motion.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        "a, button, [data-cursor], input, textarea, select"
      );
      setActive(!!el);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden lg:block"
      aria-hidden
    >
      <motion.span
        animate={{
          scale: active ? 2.2 : 1,
          opacity: active ? 0.9 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-belour-perla"
      />
      <motion.span
        animate={{
          scale: active ? 1 : 0,
          opacity: active ? 0.8 : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="absolute left-0 top-0 block h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-belour-perla/70"
      />
    </motion.div>
  );
}
