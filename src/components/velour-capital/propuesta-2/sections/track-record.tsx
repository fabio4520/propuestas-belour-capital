"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionLabel } from "../ui/section-label";
import { AnimatedText } from "../ui/animated-text";
import { CountUp } from "../ui/count-up";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../motion/variants";

type Stat = {
  value: number;
  decimals: number;
  prefix: string;
  suffix: string;
  label: string;
};

/**
 * Track Record — banda de cifras con count-up lento (gravitas de fondo de
 * inversión). Datos ilustrativos (ver nota / footer legal).
 */
export function TrackRecord() {
  const t = useTranslations("track");
  const stats = t.raw("stats") as Stat[];

  return (
    <section className="relative overflow-hidden bg-obsidian-900 py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(216,194,144,0.07),transparent_62%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-2xl">
          <SectionLabel index="02">{t("label")}</SectionLabel>
          <AnimatedText
            as="h2"
            text={t("headline")}
            highlight={t("highlight")}
            className="mt-7 font-cormorant text-4xl font-light leading-[1.1] text-warmwhite sm:text-5xl"
          />
        </div>

        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={staggerItem}
              className="group relative bg-obsidian/60 p-8 transition-colors duration-300 hover:bg-graphite/60"
            >
              <span className="absolute inset-x-0 top-0 h-px w-0 bg-gradient-to-r from-champagne to-copper transition-all duration-500 group-hover:w-full" />
              <dd className="flex items-baseline font-cormorant text-5xl font-light leading-none text-warmwhite sm:text-6xl">
                {s.prefix && (
                  <span className="mr-1 text-2xl text-champagne sm:text-3xl">
                    {s.prefix.trim()}
                  </span>
                )}
                <CountUp value={s.value} decimals={s.decimals} duration={2.6} />
                <span className="text-champagne-gradient ml-0.5 text-3xl sm:text-4xl">
                  {s.suffix}
                </span>
              </dd>
              <dt className="mt-5 max-w-[24ch] font-manrope text-sm leading-relaxed text-stone">
                {s.label}
              </dt>
            </motion.div>
          ))}
        </motion.dl>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-8 text-xs text-stone-dark"
        >
          {t("note")}
        </motion.p>
      </div>
    </section>
  );
}
