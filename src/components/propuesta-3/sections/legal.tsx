"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "../motion/variants";

type Item = { title: string; text: string };

/**
 * Banda Legal & Divulgaciones — deliberadamente understated (sin índice, sin
 * reveal palabra a palabra): señaliza "territorio de fine print", no marketing.
 * Cierra una bandera roja de compliance para una entidad financiera: aviso de
 * no-oferta, riesgo, estatus regulatorio y confidencialidad. Objetivo del
 * ancla #legal para los enlaces legales del footer. Contenido mock CMS-ready.
 */
export function Legal() {
  const t = useTranslations("legal");
  const items = t.raw("items") as Item[];

  return (
    <section id="legal" className="border-t border-white/8 bg-velour-black py-20 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-velour-gold/50" />
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-velour-gold">
              {t("label")}
            </span>
          </div>
          <p className="mt-6 max-w-3xl font-garamond text-2xl font-light leading-snug text-velour-white/90 sm:text-3xl">
            {t("headline")}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-velour-stone">
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
              <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-velour-champagne">
                {item.title}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-velour-stone/70">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-10 text-xs text-velour-stone/40">{t("finePrint")}</p>
      </div>
    </section>
  );
}
