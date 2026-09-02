"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "../ui/section-heading";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../motion/variants";

type Item = { title: string; text: string };

/**
 * Nuestra propuesta de valor — las cuatro tarjetas oficiales del Brochure
 * 2026 (estructuras a la medida, evaluación rigurosa del riesgo, alianza
 * estratégica, capital flexible), precedidas por una declaración editorial.
 */
export function ValueProposition() {
  const t = useTranslations("value");
  const items = t.raw("items") as Item[];

  return (
    <section id="value" className="grain-belour surface-perla relative bg-surface py-28 sm:py-36">
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
          className="mt-10 max-w-3xl font-cormorant text-2xl font-light leading-relaxed text-ink/90 sm:text-3xl"
        >
          {t("textBefore")}{" "}
          <em className="text-brand-gradient italic">{t("emphasis")}</em>
          {t("textAfter")}
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-20 grid gap-x-12 gap-y-10 border-t border-rule/10 pt-12 sm:grid-cols-2"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              variants={staggerItem}
              className="group grid grid-cols-[auto_1fr] items-start gap-5"
            >
              <span className="font-cormorant text-sm italic text-brand/70 transition-all duration-500 ease-out group-hover:-translate-y-0.5 group-hover:text-brand">
                0{i + 1}
              </span>
              <div>
                <h3 className="font-sans text-xl font-light text-ink sm:text-2xl">
                  {item.title}
                </h3>
                <span
                  aria-hidden
                  className="mt-3 block h-px w-8 bg-brand/35 transition-all duration-500 ease-out group-hover:w-20 group-hover:bg-brand/70"
                />
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
