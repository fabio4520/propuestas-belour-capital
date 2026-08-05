"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Preloader de marca: revela el wordmark mientras un contador sube a 100,
 * luego el telón sube y desmonta. Solo una vez por sesión; se omite con
 * prefers-reduced-motion. Se renderiza en SSR para evitar flash de contenido.
 */
export function Preloader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("velour-preloaded");
    if (reduce || seen) {
      setDone(true);
      return;
    }
    sessionStorage.setItem("velour-preloaded", "1");

    const duration = 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 300);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian"
          aria-hidden
        >
          <div className="flex items-baseline gap-2 overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-cormorant text-4xl font-light tracking-wide text-warmwhite sm:text-5xl"
            >
              Velour
            </motion.span>
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
              className="font-cormorant text-4xl font-light italic text-champagne sm:text-5xl"
            >
              Capital
            </motion.span>
          </div>

          <div className="mt-8 flex w-56 items-center gap-4">
            <div className="h-px flex-1 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-champagne to-copper"
                style={{ width: `${count}%` }}
              />
            </div>
            <span className="w-10 text-right font-manrope text-xs tabular-nums text-stone">
              {count}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
