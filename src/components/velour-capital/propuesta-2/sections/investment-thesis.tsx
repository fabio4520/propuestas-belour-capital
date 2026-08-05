"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Crosshair, BrainCircuit, TrendingUp, type LucideIcon } from "lucide-react";
import { SectionLabel } from "../ui/section-label";
import { AnimatedText } from "../ui/animated-text";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../motion/variants";

const ICONS: LucideIcon[] = [Crosshair, BrainCircuit, TrendingUp];

type Pillar = { title: string; text: string };

export function InvestmentThesis() {
  const t = useTranslations("thesis");
  const pillars = t.raw("pillars") as Pillar[];

  return (
    <section id="thesis" className="relative bg-obsidian py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionLabel index="01">{t("label")}</SectionLabel>
            <AnimatedText
              as="h2"
              text={t("headline")}
              highlight="convergen."
              className="mt-7 font-cormorant text-4xl font-light leading-[1.1] text-warmwhite sm:text-5xl"
            />
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex items-center"
          >
            <p className="font-manrope text-lg leading-relaxed text-stone">
              {t("text")}
            </p>
          </motion.div>
        </div>

        {/* Pilares */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {pillars.map((pillar, i) => {
            const Icon = ICONS[i];
            return (
              <motion.article
                key={pillar.title}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group glass relative overflow-hidden rounded-2xl p-8 transition-colors duration-300 hover:border-champagne/30"
              >
                <span className="absolute right-6 top-6 font-cormorant text-2xl italic text-champagne/30">
                  0{i + 1}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 text-champagne transition-colors duration-300 group-hover:border-champagne/50 group-hover:bg-champagne/5">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 font-cormorant text-2xl text-warmwhite">
                  {pillar.title}
                </h3>
                <p className="mt-3 font-manrope text-sm leading-relaxed text-stone">
                  {pillar.text}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
