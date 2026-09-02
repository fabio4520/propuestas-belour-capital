"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "../ui/section-heading";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "../motion/variants";

type Parameter = { label: string; value: string; note: string };
type Criterion = { title: string; text: string };

/**
 * Estrategia de Inversión — da sustancia a la tesis (antes solo platitudes).
 * Dos bloques: parámetros de inversión (ticket, etapa, horizonte, retorno —
 * "spec sheet" institucional) + criterios de convicción. Contenido mock
 * CMS-ready ES/EN, registro Obsidiana.
 */
export function Strategy() {
  const t = useTranslations("strategy");
  const parameters = t.raw("parameters") as Parameter[];
  const criteria = t.raw("criteria") as Criterion[];

  return (
    <section id="strategy" className="relative bg-belour-noir py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          index="04"
          eyebrow={t("label")}
          title={t("headline")}
          highlight={t("highlight")}
          description={t("subtext")}
        />

        {/* Parámetros de inversión — spec sheet */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 border-t border-white/8 pt-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {parameters.map((p) => (
            <motion.div key={p.label} variants={staggerItem}>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-belour-perla/70">
                {p.label}
              </p>
              <p className="mt-3 font-cormorant text-2xl font-light leading-tight text-belour-white sm:text-[1.75rem]">
                {p.value}
              </p>
              <p className="mt-2.5 text-xs leading-relaxed text-belour-piedra">
                {p.note}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Criterios de convicción */}
        <div className="mt-20 lg:mt-28">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex items-center gap-3"
          >
            <span className="h-px w-8 bg-belour-perla/50" />
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-belour-perla">
              {t("criteriaLabel")}
            </span>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2"
          >
            {criteria.map((c, i) => (
              <motion.div
                key={c.title}
                variants={staggerItem}
                className="grid grid-cols-[auto_1fr] items-start gap-5 border-t border-white/8 pt-6"
              >
                <span className="font-cormorant text-sm italic text-belour-hueso/70">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-cormorant text-xl font-light text-belour-white sm:text-2xl">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-belour-piedra">
                    {c.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <p className="mt-14 text-xs text-belour-piedra/50">{t("note")}</p>
      </div>
    </section>
  );
}
