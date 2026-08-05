"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Linkedin } from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "../ui/section-heading";
import { fadeUp, viewportOnce } from "../motion/variants";
import { cn } from "@/lib/utils";

type Member = { name: string; role: string; bio: string };

/* Retratos generados (orden = messages.leadership.members) */
const MEMBER_IMAGES = [
  "/velour/p3/leadership/lucero-polo.jpg",
  "/velour/p3/leadership/eduardo-lanao.jpg",
  "/velour/p3/leadership/m-antunez.jpg",
  "/velour/p3/leadership/v-rios.jpg",
] as const;

/**
 * Team Showcase: un solo retrato grande que hace cross-fade al miembro activo,
 * con la lista de nombres a su lado. Recorrer la lista —con el mouse, con el
 * teclado o con un toque— cambia el retrato.
 *
 * El collage 2×2 anterior medía ~950 px de alto y llevaba la sección a ~1450 px:
 * no cabía entera en ninguna pantalla. Con un único retrato la altura pasa a ser
 * una variable que controlamos, así que en desktop la sección se ancla a una
 * pantalla exacta (lg:h-[100svh]); en móvil no hay tope y todo apila con scroll
 * natural, porque forzar 100vh en un teléfono deja los retratos ilegibles.
 *
 * Los cuatro retratos quedan montados y solo se cruza su opacidad: el cambio es
 * instantáneo al recorrer la lista, sin el parpadeo de una carga en caliente.
 *
 * No hay estado "ninguno activo" (el panel no puede quedar vacío) ni guard de
 * matchMedia: los tres handlers —enter, focus y click— cubren puntero, teclado
 * y touch por igual, el mismo trío que usa la lista de plazas en geography.tsx.
 */
export function Leadership() {
  const t = useTranslations("leadership");
  const members = t.raw("members") as Member[];
  const [active, setActive] = useState(0);

  return (
    <section
      id="leadership"
      className="relative bg-velour-black py-24 sm:py-28 lg:flex lg:h-[100svh] lg:flex-col lg:overflow-hidden lg:pb-12 lg:pt-24"
    >
      {/* pt-24 en desktop deja el eyebrow por debajo del header fijo (h-20)
          cuando se llega a la sección por ancla o por scroll. */}
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:px-10">
        <SectionHeading
          index="07"
          eyebrow={t("label")}
          title={t("headline")}
          className="lg:shrink-0"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-10 lg:mt-10 lg:min-h-0 lg:flex-1 lg:grid-cols-[auto_1fr] lg:items-stretch lg:gap-16"
        >
          {/* Retrato activo. En desktop toma exactamente el alto que sobra tras
              el encabezado (h-full dentro de la fila flexible) y el ancho se
              deriva de la proporción 3/4 — así se adapta a cualquier altura de
              pantalla sin volverse apaisado ni desbordar. */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl border border-white/8 lg:mx-0 lg:h-full lg:w-auto lg:max-w-none">
            {members.map((member, i) => (
              <Image
                key={member.name}
                src={MEMBER_IMAGES[i]}
                alt={member.name}
                fill
                sizes="(min-width: 1024px) 450px, (min-width: 640px) 384px, 90vw"
                priority={i === 0}
                className={cn(
                  "object-cover transition-opacity duration-500 ease-out",
                  i === active ? "opacity-100" : "opacity-0"
                )}
              />
            ))}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-velour-black/50 via-transparent to-transparent" />
          </div>

          {/* Lista vinculada. self-center la mantiene ópticamente alineada con
              el retrato en vez de estirarse a toda la altura de la fila. */}
          <ul className="flex flex-col divide-y divide-white/8 border-t border-white/8 lg:max-w-xl lg:self-center">
            {members.map((member, i) => {
              const isActive = i === active;
              return (
                <li key={member.name}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className="flex w-full items-center gap-4 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "h-px shrink-0 bg-velour-gold transition-all duration-300",
                        isActive ? "w-8" : "w-0"
                      )}
                    />
                    <span className="flex-1">
                      <span
                        className={cn(
                          "block font-garamond text-2xl transition-colors duration-300 sm:text-3xl",
                          isActive ? "text-velour-white" : "text-velour-stone/70"
                        )}
                      >
                        {member.name}
                      </span>
                      <span
                        className={cn(
                          "mt-1 block text-xs uppercase tracking-[0.2em] transition-colors duration-300",
                          isActive ? "text-velour-gold" : "text-velour-stone/40"
                        )}
                      >
                        {member.role}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "text-velour-gold transition-all duration-300",
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "translate-x-2 opacity-0"
                      )}
                    >
                      <Linkedin className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
