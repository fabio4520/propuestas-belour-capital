"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "../ui/section-heading";
import { staggerContainer, staggerItem, viewportOnce } from "../motion/variants";
import { cn } from "@/lib/utils";

type Deal = {
  year: string;
  sector: string;
  location: string;
  size: string;
  role: string;
  status: string;
};

/* Rejilla de columnas del ledger — compartida por el encabezado y cada fila */
const GRID = "lg:grid-cols-[4.5rem_1.6fr_1.1fr_6.5rem_1.5fr_8.5rem]";

/**
 * Track Record — el activo de credibilidad #1 de un fondo. Formato "ledger"
 * institucional: tabla alineada en desktop, ficha de datos label/valor en
 * móvil. Data-driven desde i18n (CMS-ready). Registro Obsidiana: tamaños en
 * dorado, estatus como pill discreto, hairlines blancas.
 */
export function TrackRecord() {
  const t = useTranslations("trackRecord");
  const deals = t.raw("deals") as Deal[];
  const cols = t.raw("columns") as Record<string, string>;

  const Field = ({
    label,
    children,
    className,
  }: {
    label: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={cn("flex items-baseline justify-between gap-3 lg:block", className)}>
      <span className="text-[10px] uppercase tracking-wider text-velour-stone/40 lg:hidden">
        {label}
      </span>
      {children}
    </div>
  );

  return (
    <section id="track-record" className="relative bg-velour-black py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          index="06"
          eyebrow={t("label")}
          title={t("headline")}
          highlight={t("highlight")}
          description={t("subtext")}
        />

        <div className="mt-16">
          {/* Encabezado de columnas (solo desktop) */}
          <div
            className={cn(
              "hidden gap-6 border-b border-white/8 pb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-velour-gold/70 lg:grid",
              GRID
            )}
          >
            <span>{cols.year}</span>
            <span>{cols.sector}</span>
            <span>{cols.location}</span>
            <span>{cols.size}</span>
            <span>{cols.role}</span>
            <span className="text-right">{cols.status}</span>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col"
          >
            {deals.map((deal) => (
              <motion.div
                key={`${deal.year}-${deal.sector}`}
                variants={staggerItem}
                className={cn(
                  "group grid gap-3 border-b border-white/8 py-6 transition-colors duration-300 hover:bg-white/[0.02] lg:items-center lg:gap-6 lg:py-5",
                  GRID
                )}
              >
                <Field label={cols.year}>
                  <span className="font-garamond text-xl text-velour-champagne">
                    {deal.year}
                  </span>
                </Field>
                <Field label={cols.sector}>
                  <span className="font-garamond text-lg text-velour-white transition-colors duration-300 group-hover:text-velour-champagne">
                    {deal.sector}
                  </span>
                </Field>
                <Field label={cols.location}>
                  <span className="text-sm text-velour-stone">{deal.location}</span>
                </Field>
                <Field label={cols.size}>
                  <span className="font-garamond text-lg text-velour-gold">
                    {deal.size}
                  </span>
                </Field>
                <Field label={cols.role}>
                  <span className="text-sm text-velour-stone">{deal.role}</span>
                </Field>
                <Field label={cols.status} className="lg:justify-self-end">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-velour-gold/25 px-3 py-1 text-[11px] uppercase tracking-wider text-velour-champagne/90">
                    <span className="h-1 w-1 rounded-full bg-velour-gold" />
                    {deal.status}
                  </span>
                </Field>
              </motion.div>
            ))}
          </motion.div>

          <p className="mt-8 max-w-2xl text-xs leading-relaxed text-velour-stone/50">
            {t("note")}
          </p>
        </div>
      </div>
    </section>
  );
}
