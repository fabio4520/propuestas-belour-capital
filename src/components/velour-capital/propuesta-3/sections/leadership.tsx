"use client";

import { useEffect, useState } from "react";
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

/* Offsets editoriales del collage — asimetría deliberada, no un grid parejo */
const TILE_OFFSET = ["", "mt-10", "-mt-6", "mt-4"];
const TILE_ASPECT = ["aspect-[3/4]", "aspect-[3/4]", "aspect-[4/5]", "aspect-[3/4]"];

/**
 * Team Showcase: lista de nombres y collage de retratos comparten un mismo
 * estado "activo" — hover en cualquiera de los dos ilumina ambos a la vez.
 * Estado inicial: todo en escala de grises (ninguno activo). En touch/sin
 * hover fino no hay forma de "pasar el mouse", así que se muestran todos
 * los retratos ya en color (el filtro grayscale solo tiene sentido como
 * estado de reposo cuando existe hover real) — check vía matchMedia,
 * gateado con mounted por el mismo motivo de SSR que el resto del sitio.
 */
export function Leadership() {
  const t = useTranslations("leadership");
  const members = t.raw("members") as Member[];
  const [activeId, setActiveId] = useState<number | null>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const isActive = (i: number) => (canHover ? activeId === i : true);
  const enter = (i: number) => canHover && setActiveId(i);
  const leave = () => canHover && setActiveId(null);

  return (
    <section id="leadership" className="relative bg-velour-black py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading index="07" eyebrow={t("label")} title={t("headline")} />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20"
        >
          {/* Collage de retratos */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {members.map((member, i) => (
              <div
                key={member.name}
                onMouseEnter={() => enter(i)}
                onMouseLeave={leave}
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-white/8",
                  TILE_ASPECT[i],
                  TILE_OFFSET[i]
                )}
              >
                <Image
                  src={MEMBER_IMAGES[i]}
                  alt={member.name}
                  fill
                  sizes="(min-width: 1024px) 30vw, 45vw"
                  className={cn(
                    "object-cover transition-all duration-500 ease-out",
                    isActive(i) ? "grayscale-0 scale-100" : "grayscale scale-[1.03]"
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-velour-black/50 via-transparent to-transparent" />
              </div>
            ))}
          </div>

          {/* Lista vinculada */}
          <ul className="flex flex-col divide-y divide-white/8 border-t border-white/8 lg:justify-center">
            {members.map((member, i) => {
              const active = isActive(i);
              return (
                <li
                  key={member.name}
                  onMouseEnter={() => enter(i)}
                  onMouseLeave={leave}
                  className="flex cursor-default items-center gap-4 py-5"
                >
                  <span
                    className={cn(
                      "h-px shrink-0 bg-velour-gold transition-all duration-300",
                      active ? "w-8" : "w-0"
                    )}
                  />
                  <div className="flex-1">
                    <p
                      className={cn(
                        "font-garamond text-2xl transition-colors duration-300 sm:text-3xl",
                        active ? "text-velour-white" : "text-velour-stone/70"
                      )}
                    >
                      {member.name}
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-xs uppercase tracking-[0.2em] transition-colors duration-300",
                        active ? "text-velour-gold" : "text-velour-stone/40"
                      )}
                    >
                      {member.role}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "text-velour-gold transition-all duration-300",
                      active ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
                    )}
                  >
                    <Linkedin className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
