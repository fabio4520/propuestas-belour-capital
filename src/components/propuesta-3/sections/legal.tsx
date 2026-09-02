"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "../motion/variants";

type Item = { title: string; text: string };

/**
 * Banda Legal & Divulgaciones — deliberadamente understated (sin índice, sin
 * reveal palabra a palabra): señaliza "territorio de fine print", no marketing.
 * Aviso de no-oferta, evaluación caso por caso, cumplimiento AML/PLAFT y
 * confidencialidad. Objetivo del ancla #legal para los enlaces del footer.
 */
export function Legal() {
  const t = useTranslations("legal");
  const items = t.raw("items") as Item[];

  return (
    <section id="legal" className="border-t border-white/8 bg-belour-noir py-20 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-belour-perla/50" />
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-belour-perla">
              {t("label")}
            </span>
          </div>
          <p className="mt-6 max-w-3xl font-cormorant text-2xl font-light leading-snug text-belour-white/90 sm:text-3xl">
            {t("headline")}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-belour-piedra">
            {t("lead")}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-x-10 gap-y-8 border-t border-white/8 pt-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item) => (
            <motion.div key={item.title} variants={staggerItem}>
              <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-belour-hueso">
                {item.title}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-belour-piedra/70">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-10 text-xs text-belour-piedra/40">{t("finePrint")}</p>
      </div>
    </section>
  );
}
