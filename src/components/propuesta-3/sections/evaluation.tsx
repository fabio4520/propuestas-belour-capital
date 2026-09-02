"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "../ui/section-heading";
import { staggerContainer, staggerItem, viewportOnce } from "../motion/variants";

type Criterion = { title: string; text: string };

/**
 * Nuestro enfoque de evaluación — los cuatro criterios oficiales del
 * Brochure 2026 con los que se analiza cada operación: análisis LTV,
 * evaluación de garantías, capacidad de pago y cumplimiento AML/PLAFT.
 */
export function Evaluation() {
  const t = useTranslations("evaluation");
  const criteria = t.raw("criteria") as Criterion[];

  return (
    <section id="evaluation" className="surface-coal relative bg-surface py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          index="04"
          eyebrow={t("label")}
          title={t("headline")}
          highlight={t("highlight")}
          description={t("subtext")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 border-t border-rule/10 pt-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {criteria.map((criterion, i) => (
            <motion.div key={criterion.title} variants={staggerItem}>
              <span className="font-cormorant text-sm italic text-brand/70">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-sans text-xl font-light leading-tight text-ink sm:text-2xl">
                {criterion.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                {criterion.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
