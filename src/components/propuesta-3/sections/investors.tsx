"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Download, KeyRound, FileText, ArrowRight } from "lucide-react";
import { SectionHeading } from "../ui/section-heading";
import { Button } from "../ui/button";
import { Magnetic } from "../ui/magnetic";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "../motion/variants";

/**
 * Investor Relations — separa las dos audiencias de un fondo: el prospecto
 * (solicita el deck) y el LP actual (portal / data room). Cierra el vacío de
 * "no hay forma de pedir el material ni acceso para inversionistas". CTAs
 * apuntan a #contact en la demo; el CMS cableará endpoints reales. Mock ES/EN.
 */
export function Investors() {
  const t = useTranslations("investors");
  const prospect = t.raw("prospect") as { tag: string; title: string; text: string; cta: string };
  const lp = t.raw("lp") as { tag: string; title: string; text: string; cta: string };
  const documents = t.raw("documents") as string[];

  return (
    <section id="investors" className="relative overflow-hidden bg-velour-black py-28 sm:py-36">
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          index="09"
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
          className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8"
        >
          {/* Prospecto */}
          <motion.div
            variants={staggerItem}
            className="glass-velour flex flex-col rounded-3xl border border-white/10 p-8 sm:p-10"
          >
            <span className="inline-flex w-fit items-center rounded-full border border-velour-gold/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-velour-gold">
              {prospect.tag}
            </span>
            <h3 className="mt-6 font-garamond text-2xl font-light text-velour-white sm:text-3xl">
              {prospect.title}
            </h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-velour-stone sm:text-base">
              {prospect.text}
            </p>
            <div className="mt-8">
              <Magnetic>
                <Button href="#contact" variant="primary">
                  <Download className="h-4 w-4" strokeWidth={1.6} />
                  {prospect.cta}
                </Button>
              </Magnetic>
            </div>
          </motion.div>

          {/* Inversionista actual */}
          {/*<motion.div
            variants={staggerItem}
            className="glass-velour flex flex-col rounded-3xl border border-white/10 p-8 sm:p-10"
          >
            <span className="inline-flex w-fit items-center rounded-full border border-white/15 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-velour-stone">
              {lp.tag}
            </span>
            <h3 className="mt-6 font-garamond text-2xl font-light text-velour-white sm:text-3xl">
              {lp.title}
            </h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-velour-stone sm:text-base">
              {lp.text}
            </p>
            <div className="mt-8">
              <Button href="#contact" variant="outline">
                <KeyRound className="h-4 w-4" strokeWidth={1.6} />
                {lp.cta}
              </Button>
            </div>
          </motion.div>*/}
        </motion.div>

        {/* Documentación disponible */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 border-t border-white/8 pt-10"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-velour-gold/70">
              {t("documentsLabel")}
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {documents.map((doc) => (
              <span
                key={doc}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-velour-stone"
              >
                <FileText className="h-3.5 w-3.5 text-velour-gold/70" strokeWidth={1.6} />
                {doc}
              </span>
            ))}
          </div>
          <p className="mt-8 flex items-center gap-2 text-xs text-velour-stone/50">
            <ArrowRight className="h-3 w-3 text-velour-gold/50" />
            {t("note")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
