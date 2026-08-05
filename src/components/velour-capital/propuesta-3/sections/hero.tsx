"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowDown } from "lucide-react";
import { AnimatedText } from "../ui/animated-text";
import { WovenCanvas } from "../ui/woven-canvas";
import { EASE_OUT_EXPO } from "../motion/transitions";

/**
 * Hero de impacto: solo el wordmark de marca + slogan, centrados sobre el
 * campo de partículas — la animación es la protagonista, no hay eyebrow ni
 * CTA compitiendo por la atención en la primera pantalla. El resto del
 * mensaje (propuesta de valor, CTAs) vive en la sección "Introduction"
 * inmediatamente debajo.
 *
 * Fondo: campo de partículas Three.js sobre un torus-knot ("tejido de luz"),
 * 100% generativo — no depende de un asset de video pendiente. Reacciona
 * sutilmente al cursor y respeta la regla de marca (≥90% negro, dorado solo
 * como acento escaso). Wrapper del canvas SIN z-index negativo (nunca -z-10
 * con ancestro de fondo sólido: lo tapa), primero en el DOM; el contenido va
 * relative z-10 encima.
 */
export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="top"
      className="grain-velour relative flex min-h-screen items-center justify-center overflow-hidden bg-velour-black"
    >
      {/* Fondo cinematográfico */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
          className="absolute inset-0"
        >
          <WovenCanvas />
        </motion.div>

        {/* Viñeta radial: oscurece los bordes, mantiene el centro despejado
            para el wordmark sin tapar el tejido de partículas con un bloque */}
        <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_50%_50%,transparent_0%,rgba(10,10,10,0.55)_65%,rgba(10,10,10,0.95)_100%)]" />
        {/* Viñeta vertical: funde el header arriba y el indicador de scroll abajo */}
        <div className="absolute inset-0 bg-gradient-to-b from-velour-black/70 via-transparent to-velour-black" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <AnimatedText
          as="h1"
          animateOnView={false}
          text="BELOUR Capital"
          highlight="Capital"
          className="font-garamond text-6xl font-light leading-[1.05] tracking-tight text-velour-white drop-shadow-[0_0_40px_rgba(10,10,10,0.9)] sm:text-7xl lg:text-8xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.65 }}
          className="mt-7 max-w-lg text-lg tracking-wide text-velour-stone drop-shadow-[0_0_20px_rgba(10,10,10,0.9)] sm:text-xl"
        >
          {t("slogan")}
        </motion.p>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-velour-stone lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.35em]">
          {t("scroll")}
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-velour-gold" />
        </motion.span>
      </motion.div>
    </section>
  );
}
