"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Target, Eye, Lightbulb, type LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Magnetic } from "../ui/magnetic";
import { SectionHeading } from "../ui/section-heading";
import { SurfaceWipe } from "../ui/surface-wipe";
import { PILLAR_ICONS } from "../lib/constants";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../motion/variants";

const ICONS: Record<string, LucideIcon> = { Target, Eye, Lightbulb };

type Pillar = { title: string; text: string };

/**
 * Quiénes somos — copy oficial del Brochure 2026: firma boutique de
 * estructuración de capital e inversión privada, más los tres pilares
 * institucionales (Propósito · Visión · Enfoque).
 */
export function Introduction() {
  const t = useTranslations("introduction");
  const pillars = t.raw("pillars") as Pillar[];

  return (
    <section id="about" className="grain-belour surface-hueso relative bg-surface py-28 sm:py-36">
      <SurfaceWipe from="#0A0A0A" />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          index="01"
          eyebrow={t("eyebrow")}
          title={t("headline")}
          highlight={t("highlight")}
          description={t("subheadline")}
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 flex flex-wrap items-center gap-8"
        >
          <Magnetic>
            <Button href="#services" variant="primary">
              {t("ctaPrimary")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Magnetic>
          <a
            href="#contact"
            className="group relative text-sm font-medium tracking-wide text-ink/85 transition-colors hover:text-ink"
          >
            {t("ctaSecondary")}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
          </a>
        </motion.div>

        {/* Propósito · Visión · Enfoque */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-20 grid gap-x-10 gap-y-12 border-t border-rule/10 pt-12 sm:grid-cols-3"
        >
          {pillars.map((pillar, i) => {
            const Icon = ICONS[PILLAR_ICONS[i]];
            return (
              <motion.div key={pillar.title} variants={staggerItem}>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand/30 text-brand">
                  <Icon className="h-5 w-5" strokeWidth={1.2} />
                </span>
                <h3 className="mt-5 text-xs font-medium uppercase tracking-[0.25em] text-brand">
                  {pillar.title}
                </h3>
                <p className="mt-3 max-w-xs font-cormorant text-xl italic leading-snug text-ink/90 sm:text-2xl">
                  {pillar.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
