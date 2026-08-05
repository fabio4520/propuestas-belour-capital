"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Cursor de seguimiento champagne (anillo que persigue al puntero con resorte).
 * Crece sobre elementos interactivos. No oculta el cursor nativo (seguro en
 * inputs). Solo en desktop con puntero fino; desactivado con reduced-motion.
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
          scale: active ? 1.9 : 1,
          opacity: active ? 0.9 : 0.55,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="block h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne/70"
      />
    </motion.div>
  );
}
