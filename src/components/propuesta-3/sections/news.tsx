"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "../ui/section-heading";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "../motion/variants";

type Article = {
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt?: string;
};

/**
 * Sala de Prensa — banda editorial final antes del footer. Registro Obsidiana:
 * nota destacada (visual tipográfico sin imagen, glow dorado ≤2%) + lista de
 * notas recientes con hairline dorado que crece en hover, mismo lenguaje de
 * interacción que el listado de Liderazgo. Data-driven desde i18n (CMS-ready).
 */
export function News() {
  const t = useTranslations("news");
  const featured = t.raw("featured") as Article;
  const items = t.raw("items") as Article[];

  return (
    <section id="news" className="relative overflow-hidden bg-belour-coal/40 py-28 sm:py-36">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(230,227,220,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Encabezado + CTA */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="11"
            eyebrow={t("label")}
            title={t("headline")}
            highlight={t("highlight")}
            description={t("subtext")}
          />
          <motion.a
            href="#"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-belour-white/85 transition-colors hover:text-belour-perla"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          {/* Nota destacada */}
          <motion.a
            href="#"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/8 bg-belour-noir/60 transition-colors duration-500 hover:border-belour-perla/30"
          >
            {/* Visual editorial (sin imagen): glow + aro dorado + monograma */}
            <div className="relative flex h-56 items-center justify-center overflow-hidden border-b border-white/8 sm:h-72">
              <div
                aria-hidden
                className="absolute h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(230,227,220,0.18),transparent_70%)] blur-xl transition-transform duration-700 group-hover:scale-125"
              />
              <div
                aria-hidden
                className="absolute right-8 top-8 h-40 w-40 rounded-full border border-belour-perla/20 transition-transform duration-700 group-hover:scale-110"
              />
              <span
                aria-hidden
                className="relative font-cormorant text-[5rem] font-light leading-none text-belour-white/[0.07] sm:text-[7rem]"
              >
                V
              </span>
              <span className="absolute left-6 top-6 inline-flex items-center rounded-full border border-belour-perla/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-belour-perla">
                {featured.category}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-7 sm:p-9">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-belour-piedra/70">
                <span>{featured.date}</span>
                <span className="h-1 w-1 rounded-full bg-belour-perla/60" />
                <span>{featured.readTime}</span>
              </div>
              <h3 className="mt-4 font-cormorant text-2xl font-light leading-snug text-belour-white transition-colors duration-300 group-hover:text-belour-hueso sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-belour-piedra sm:text-base">
                {featured.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-belour-perla">
                {t("readMore")}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </motion.a>

          {/* Lista de notas recientes */}
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col divide-y divide-white/8 border-t border-white/8"
          >
            {items.map((item) => (
              <motion.li key={item.title} variants={staggerItem}>
                <a href="#" className="group flex items-start gap-5 py-6 sm:py-7">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-belour-piedra/60">
                      <span className="text-belour-perla/80">{item.category}</span>
                      <span className="h-px w-4 bg-belour-piedra/30" />
                      <span>{item.date}</span>
                    </div>
                    <h4 className="mt-2.5 font-cormorant text-xl font-light leading-snug text-belour-piedra/90 transition-colors duration-300 group-hover:text-belour-white sm:text-2xl">
                      {item.title}
                    </h4>
                    <span className="mt-3 block h-px w-0 bg-belour-perla transition-all duration-500 group-hover:w-16" />
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 -translate-x-2 text-belour-perla opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
