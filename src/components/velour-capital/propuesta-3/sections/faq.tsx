"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { SectionHeading } from "../ui/section-heading";
import { EASE_OUT_EXPO } from "../motion/transitions";
import { cn } from "@/lib/utils";

type QA = { q: string; a: string };

/**
 * FAQ / Cómo Invertir — accordion con las preguntas que un inversionista hace
 * antes de comprometer capital: mínimos, acreditación, estructura, liquidez,
 * reporting y proceso. Cierra el vacío de "no hay claridad sobre cómo invertir".
 * Mock CMS-ready ES/EN.
 */
export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as QA[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-velour-coal/40 py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          index="10"
          eyebrow={t("label")}
          title={t("headline")}
          highlight={t("highlight")}
          description={t("subtext")}
        />

        <div className="mx-auto mt-14 max-w-3xl border-t border-white/8">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-white/8">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={cn(
                      "font-garamond text-lg font-light transition-colors duration-300 sm:text-xl",
                      isOpen
                        ? "text-velour-champagne"
                        : "text-velour-white group-hover:text-velour-champagne"
                    )}
                  >
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 text-velour-gold transition-transform duration-300",
                      isOpen && "rotate-45"
                    )}
                  >
                    <Plus className="h-5 w-5" strokeWidth={1.4} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-10 text-sm leading-relaxed text-velour-stone sm:text-base">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-xs text-velour-stone/50">
          {t("note")}
        </p>
      </div>
    </section>
  );
}
