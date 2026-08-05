"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import { Marquee } from "../ui/marquee";
import { AnimatedText } from "../ui/animated-text";
import { Magnetic } from "../ui/magnetic";
import { EASE_OUT_EXPO } from "../motion/transitions";

export function Hero() {
  const t = useTranslations("hero");
  const ticker = t.raw("ticker") as string[];

  return (
    <section
      id="top"
      className="noise relative flex min-h-screen items-center overflow-hidden bg-obsidian"
    >
      {/* Fondo cinematográfico */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/velour/hero.png"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/velour-hero-video.mp4" type="video/mp4" />
        </video>
        {/* Scrim horizontal: asegura legibilidad del texto a la izquierda */}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/75 to-obsidian/20" />
        {/* Viñeta vertical: funde el header arriba y aterriza el ticker abajo */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-transparent to-obsidian" />
        {/* Glow champagne (marca) */}
        <div className="absolute bottom-0 right-0 h-[500px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(176,118,79,0.10),transparent_65%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-24 pt-32 lg:px-10">
        {/* Columna texto */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-champagne" />
            <span className="text-xs uppercase tracking-[0.3em] text-champagne">
              {t("eyebrow")}
            </span>
          </motion.div>

          <AnimatedText
            as="h1"
            animateOnView={false}
            text={t("headline")}
            highlight="futuro"
            className="mt-7 max-w-[18ch] font-cormorant text-5xl font-light leading-[1.04] text-warmwhite sm:text-6xl lg:text-7xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.7 }}
            className="mt-7 max-w-xl font-manrope text-lg leading-relaxed text-stone"
          >
            {t("subheadline")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-7"
          >
            <Magnetic>
              <Button href="#thesis" variant="primary">
                {t("ctaPrimary")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Magnetic>
            <a
              href="#contact"
              className="group relative text-sm font-medium tracking-wide text-warmwhite/85 transition-colors hover:text-warmwhite"
            >
              {t("ctaSecondary")}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-stone lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">
          {t("scroll")}
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-champagne" />
        </motion.span>
      </motion.div>

      {/* Ticker inferior */}
      <div className="absolute inset-x-0 bottom-0 border-t border-white/8 bg-obsidian/50 py-4 backdrop-blur-sm">
        <Marquee items={ticker} />
      </div>
    </section>
  );
}
