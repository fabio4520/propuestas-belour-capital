"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "../ui/section-heading";
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

export function Manifesto() {
  const t = useTranslations("manifesto");
  const stats = t.raw("stats") as Stat[];

  return (
    <section id="manifesto" className="relative bg-belour-noir py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          index="02"
          eyebrow={t("label")}
          title={t("headline")}
          highlight={t("highlight")}
        />

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 max-w-3xl font-cormorant text-2xl font-light leading-relaxed text-belour-white/90 sm:text-3xl"
        >
          {t("textBefore")}{" "}
          <em className="text-belour-perla-gradient italic">{t("emphasis")}</em>
          {t("textAfter")}
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-white/8 pt-12 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem}>
              <p className="font-cormorant text-4xl font-light text-belour-white sm:text-5xl">
                {stat.prefix}
                <CountUp value={stat.value} decimals={stat.decimals} />
                {stat.suffix}
              </p>
              <p className="mt-2 text-sm text-belour-piedra">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
        <p className="mt-8 text-xs text-belour-piedra/50">{t("note")}</p>
      </div>
    </section>
  );
}
