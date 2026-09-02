"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { SectionHeading } from "../ui/section-heading";
import { SurfaceWipe } from "../ui/surface-wipe";
import { EASE_SOFT } from "../motion/transitions";
import { cn } from "@/lib/utils";

type QA = { q: string; a: string };

/**
 * Preguntas frecuentes — accordion con lo que un cliente pregunta antes de
 * iniciar una operación: tipos de financiamiento, garantías aceptadas,
 * criterios de evaluación, sectores, plazos y cómo empieza el proceso.
 */
export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as QA[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="grain-belour surface-hueso relative bg-surface py-28 sm:py-36">
      <SurfaceWipe from="#0A0A0A" />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          index="06"
          eyebrow={t("label")}
          title={t("headline")}
          highlight={t("highlight")}
          description={t("subtext")}
        />

        <div className="mx-auto mt-14 max-w-3xl border-t border-rule/10">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-rule/10">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  {/* El estado activo se marca con OPACIDAD de tinta, no con
                      otro pigmento: `brand` es más claro que `ink` sobre noir
                      pero más oscuro sobre papel, así que usarlo aquí invertía
                      la jerarquía al cambiar de superficie. */}
                  <span
                    className={cn(
                      "font-sans text-lg font-light transition-colors duration-300 sm:text-xl",
                      isOpen ? "text-ink" : "text-ink/65 group-hover:text-ink"
                    )}
                  >
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 text-brand transition-transform duration-200",
                      isOpen && "rotate-45"
                    )}
                  >
                    <Plus className="h-5 w-5" strokeWidth={1.4} />
                  </span>
                </button>
                {/* Timing: EASE_OUT_EXPO —la curva del resto del sitio— aquí
                    estaba mal elegida. Alcanza el 95% del recorrido en el
                    primer tercio del tiempo y arrastra los últimos píxeles
                    durante el resto: en un fundido es elegante, pero en una
                    altura se lee como si el panel se hubiera colgado a medio
                    abrir. Curva con final decidido, más corta, y la opacidad
                    resuelta antes que la altura para que el texto ya esté ahí
                    cuando el panel termina de crecer. */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.22, ease: EASE_SOFT },
                          opacity: { duration: 0.14 },
                        },
                      }}
                      transition={{
                        height: { duration: 0.26, ease: EASE_SOFT },
                        opacity: { duration: 0.18, ease: "linear" },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-10 text-sm leading-relaxed text-ink-muted sm:text-base">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-xs text-ink-muted/60">
          {t("note")}
        </p>
      </div>
    </section>
  );
}
