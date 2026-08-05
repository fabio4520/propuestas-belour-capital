"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Preloader de marca: revela el wordmark mientras un contador sube a 100,
 * luego una cortina sube y desmonta (clipPath, no solo translate — corte limpio
 * hacia arriba). Solo una vez por sesión; se omite con prefers-reduced-motion.
 *
 * Su duración se ata a la disponibilidad real de las tipografías, no a un
 * número fijo: antes eran 1.4 s de contador + 0.25 s + 0.8 s de cortina, o sea
 * ~2.45 s de pantalla tapada aunque el sitio estuviera listo desde el frame 1.
 * Ahora se descubre cuándo está todo listo y se cierra ahí, con un suelo que
 * evita el parpadeo y un techo que impide que una fuente lenta secuestre la
 * primera pantalla (font-display:swap ya cubre ese caso).
 */
const MIN_MS = 350;
const MAX_MS = 900;

export function Preloader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("velour-p3-preloaded");
    if (reduce || seen) {
      setDone(true);
      return;
    }
    sessionStorage.setItem("velour-p3-preloaded", "1");

    const start = performance.now();
    // El contador se normaliza contra este plazo, que se acorta en cuanto las
    // fuentes resuelven: así llega a 100 justo cuando toca cerrar, en vez de
    // quedarse a medias o terminar mucho antes que la cortina.
    let deadline = MAX_MS;
    document.fonts?.ready.then(() => {
      deadline = Math.min(MAX_MS, Math.max(MIN_MS, performance.now() - start));
    });

    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / deadline, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-velour-black"
          aria-hidden
        >
          <div className="flex items-baseline gap-2 overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="font-garamond text-4xl font-light tracking-wide text-velour-white sm:text-5xl"
            >
              Velour
            </motion.span>
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
              className="font-garamond text-4xl font-light italic text-velour-gold sm:text-5xl"
            >
              Capital
            </motion.span>
          </div>

          <div className="mt-8 flex w-56 items-center gap-4">
            <div className="h-px flex-1 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-velour-gold to-velour-champagne"
                style={{ width: `${count}%` }}
              />
            </div>
            <span className="w-10 text-right text-xs tabular-nums text-velour-stone">
              {count}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
