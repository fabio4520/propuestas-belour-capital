"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { STATS, COVERAGE } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Orquestación de entrada al cargar (stagger de cada bloque del hero) */
const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.35 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Capas de fondo: zoom sutil al cargar + glow dorado + viñeta */}
      <motion.div
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-ink-950" />
        {/* glow dorado radial */}
        <div className="absolute left-1/2 top-[-10%] h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-radial-gold blur-[40px]" />
        {/* malla geométrica tenue */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #d4af37 1px, transparent 1px), linear-gradient(to bottom, #d4af37 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
          }}
        />
        {/* viñeta inferior */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-900 to-transparent" />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-7xl px-6 pt-28"
      >
        {/* Eyebrow */}
        <motion.div variants={item} className="flex items-center gap-3">
          <span className="h-px w-10 bg-gold" />
          <span className="text-xs uppercase tracking-widest text-gold">
            Velour Capital · Private Equity
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="mt-7 max-w-4xl font-serif text-[2.75rem] font-medium leading-[1.05] text-white sm:text-6xl lg:text-7xl"
        >
          Capital Privado para{" "}
          <span className="text-gold-sheen italic">Sectores Estratégicos</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={item}
          className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          Inversiones mineras e inmobiliarias en LATAM. Estructuramos
          oportunidades con retornos atractivos para inversores
          institucionales y privados.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 rounded-sm bg-gold px-7 py-3.5 text-sm font-medium text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_12px_30px_-8px_rgba(212,175,55,0.5)]"
          >
            Conversar con nosotros
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#sectores"
            className="inline-flex items-center rounded-sm border border-border px-7 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            Ver sectores
          </a>
        </motion.div>

        {/* Stats */}
        <motion.dl
          variants={item}
          className="mt-20 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-8 border-t border-border/60 pt-10 sm:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="font-serif text-3xl text-white sm:text-4xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Marquee de cobertura (señal de alcance / confianza) */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-border/40 bg-ink-950/60 py-4 no-scrollbar">
        <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap">
          {[...COVERAGE, ...COVERAGE, ...COVERAGE, ...COVERAGE].map((c, i) => (
            <span
              key={i}
              className="flex items-center gap-12 text-xs uppercase tracking-widest text-muted-foreground/70"
            >
              {c}
              <span className="h-1 w-1 rounded-full bg-gold/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
