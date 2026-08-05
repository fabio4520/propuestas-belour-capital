"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "../ui/section-label";
import { AnimatedText } from "../ui/animated-text";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../motion/variants";

type Deal = {
  name: string;
  sector: string;
  location: string;
  year: string;
  stake: string;
  status: "active" | "realized";
  note: string;
};

/**
 * Selected Investments — tabla editorial de transacciones representativas.
 * Cada fila revela el detalle al pasar el cursor (siempre visible en móvil).
 * Datos ficticios con fines de propuesta.
 */
export function SelectedInvestments() {
  const t = useTranslations("investments");
  const deals = t.raw("deals") as Deal[];

  return (
    <section
      id="investments"
      className="relative overflow-hidden bg-obsidian py-28 sm:py-36"
    >
      <div className="pointer-events-none absolute right-0 top-1/4 h-[460px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(176,118,79,0.08),transparent_65%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-2xl">
          <SectionLabel index="05">{t("label")}</SectionLabel>
          <AnimatedText
            as="h2"
            text={t("headline")}
            highlight={t("highlight")}
            className="mt-7 font-cormorant text-4xl font-light leading-[1.1] text-warmwhite sm:text-5xl"
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-6 max-w-xl font-manrope text-lg leading-relaxed text-stone"
          >
            {t("text")}
          </motion.p>
        </div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 border-t border-white/10"
        >
          {deals.map((deal) => (
            <motion.li
              key={deal.name}
              variants={staggerItem}
              className="group relative border-b border-white/10"
            >
              {/* barrido de fondo en hover */}
              <span className="pointer-events-none absolute inset-x-[-1.5rem] inset-y-0 bg-champagne/[0.03] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative grid grid-cols-1 gap-2 py-7 lg:grid-cols-[1.7fr_0.8fr_1fr_auto] lg:items-center lg:gap-6">
                <div className="flex items-center gap-3">
                  <h3 className="font-cormorant text-2xl text-warmwhite transition-colors duration-300 group-hover:text-champagne sm:text-3xl">
                    {deal.name}
                  </h3>
                  <ArrowUpRight className="h-5 w-5 shrink-0 -translate-x-2 text-champagne opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
                <span className="font-manrope text-sm uppercase tracking-wider text-stone">
                  {deal.sector}
                </span>
                <span className="font-manrope text-sm text-stone">
                  {deal.location} · {deal.year}
                </span>
                <span className="justify-self-start lg:justify-self-end">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] uppercase tracking-wider ${
                      deal.status === "active"
                        ? "border-champagne/30 text-champagne"
                        : "border-white/15 text-stone"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        deal.status === "active"
                          ? "bg-champagne"
                          : "bg-stone-dark"
                      }`}
                    />
                    {deal.status === "active"
                      ? t("statusActive")
                      : t("statusRealized")}
                  </span>
                </span>
              </div>

              {/* detalle revelado */}
              <div className="relative overflow-hidden">
                <p className="max-w-2xl pb-7 font-manrope text-sm leading-relaxed text-stone/80 lg:max-h-0 lg:pb-0 lg:opacity-0 lg:transition-all lg:duration-500 lg:group-hover:max-h-24 lg:group-hover:pb-7 lg:group-hover:opacity-100">
                  <span className="text-champagne/80">{deal.stake}</span>
                  {" — "}
                  {deal.note}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
