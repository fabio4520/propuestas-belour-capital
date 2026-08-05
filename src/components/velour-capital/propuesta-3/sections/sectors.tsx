"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Pickaxe, Building2, Route, type LucideIcon } from "lucide-react";
import { SectionHeading } from "../ui/section-heading";
import { GoldLine } from "../ui/gold-line";
import { SECTOR_ICONS } from "../lib/constants";
import { fadeUp, viewportOnce } from "../motion/variants";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = { Pickaxe, Building2, Route };

/* Imagen editorial por sector (generadas — dirección de arte Obsidiana:
   monocromo negro/dorado, sin texto, sin personas). Orden = messages.sectors.items */
const SECTOR_IMAGES = [
  "/velour/p3/sectors/mineria.jpg",
  "/velour/p3/sectors/real-estate.jpg",
  "/velour/p3/sectors/infraestructura.jpg",
] as const;

type Item = { title: string; text: string };

/* Cuánto del tramo de cada card se dedica al cross-fade con la siguiente */
const FADE = 0.14;
/* Alto de scroll dedicado a cada card dentro del tramo pineado */
const VH_PER_CARD = 120;

function SectorCardBody({
  item,
  index,
  icon: Icon,
  image,
  imageY,
  priority,
}: {
  item: Item;
  index: number;
  icon: LucideIcon;
  image: string;
  imageY?: MotionValue<string>;
  priority?: boolean;
}) {
  const reversed = index % 2 === 1;

  return (
    <div className="grid w-full max-w-[1200px] items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-16">
      {/* En móvil la card vive dentro de un contenedor pineado de una pantalla y
          se apila en una sola columna: imagen + título + párrafo tienen que
          caber en 100svh. Con aspect-[4/5] a ancho completo la imagen sola se
          comía la pantalla, así que aquí manda max-h y el aspect solo entra
          desde sm, donde ya hay altura de sobra. */}
      <div
        className={cn(
          "relative max-h-[34svh] w-full overflow-hidden rounded-3xl border border-white/8 [aspect-ratio:4/5] sm:max-h-[62vh]",
          reversed && "lg:order-2"
        )}
      >
        <motion.div
          style={{ y: imageY ?? 0 }}
          className="absolute inset-x-0 -top-[6%] h-[112%] will-change-transform"
        >
          <Image
            src={image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
            priority={priority}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-velour-black/70 via-transparent to-transparent" />
        <div className="absolute inset-0 rounded-3xl border border-white/8" />
      </div>

      <div className={cn(reversed && "lg:order-1")}>
        <div className="flex items-center gap-4">
          <span className="font-garamond text-2xl italic text-velour-champagne/60">
            0{index + 1}
          </span>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-velour-gold">
            <Icon className="h-5 w-5" strokeWidth={1.4} />
          </span>
        </div>
        <h3 className="mt-4 font-garamond text-3xl font-light leading-[1.1] text-velour-white sm:mt-6 sm:text-4xl lg:text-5xl">
          {item.title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-velour-stone sm:mt-5 sm:text-base lg:text-lg">
          {item.text}
        </p>
      </div>
    </div>
  );
}

/**
 * Card pineada: su opacidad/escala están atadas al progreso de scroll del
 * contenedor padre (no a whileInView — todas las cards están montadas a la
 * vez, superpuestas). La card activa domina el tramo central de su rango;
 * en el 14% final se encoge y funde mientras la siguiente entra. La primera
 * card empieza ya visible (edge inicial) y la última no hace fade-out
 * (edge final) — si no, ambas arrancarían/terminarían en opacidad 0.
 */
function SectorCard({
  item,
  index,
  total,
  icon,
  image,
  progress,
}: {
  item: Item;
  index: number;
  total: number;
  icon: LucideIcon;
  image: string;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const opacity = useTransform(
    progress,
    [start, start + FADE, end - FADE, end],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]
  );
  const scale = useTransform(
    progress,
    [start, start + FADE, end - FADE, end],
    [isFirst ? 1 : 0.94, 1, 1, isLast ? 1 : 0.88]
  );
  const imageY = useTransform(progress, [start, end], ["-6%", "6%"]);

  // useScroll no puede resolver la geometría real durante SSR; renderizar
  // con el valor neutro (card activa=1, inactiva=valor de reposo) hasta
  // montar evita un hydration mismatch entre servidor y primera pintura.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const restOpacity = isFirst ? 1 : 0;
  const restScale = isFirst ? 1 : 0.94;

  return (
    <motion.div
      style={{
        opacity: mounted ? opacity : restOpacity,
        scale: mounted ? scale : restScale,
      }}
      className="absolute inset-0 flex items-center justify-center px-6 lg:px-10"
    >
      <SectorCardBody
        item={item}
        index={index}
        icon={icon}
        image={image}
        imageY={mounted ? imageY : undefined}
        priority={isFirst}
      />
    </motion.div>
  );
}

export function Sectors() {
  const t = useTranslations("sectors");
  const items = t.raw("items") as Item[];
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="sectors" className="relative bg-velour-black">
      <div className="mx-auto max-w-[1400px] px-6 pt-28 sm:pt-36 lg:px-10">
        <SectionHeading
          index="03"
          eyebrow={t("label")}
          title={t("headline")}
          highlight={t("highlight")}
          description={t("subtext")}
          align="center"
        />
      </div>

      {reduce ? (
        // Movimiento reducido: lista estática apilada, sin scroll pineado.
        <div className="mx-auto mt-20 flex max-w-[1400px] flex-col gap-24 px-6 pb-28 lg:px-10">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex justify-center"
            >
              <SectorCardBody
                item={item}
                index={i}
                icon={ICONS[SECTOR_ICONS[i]]}
                image={SECTOR_IMAGES[i]}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div
          ref={sectionRef}
          className="relative mt-16"
          style={{ height: `${items.length * VH_PER_CARD}vh` }}
        >
          {/* svh: con 100vh el contenedor pineado supera el área visible en
              móvil mientras la barra de URL está desplegada, y overflow-hidden
              recorta la card por abajo. */}
          <div className="sticky top-0 h-[100svh] overflow-hidden">
            {items.map((item, i) => (
              <SectorCard
                key={item.title}
                item={item}
                index={i}
                total={items.length}
                icon={ICONS[SECTOR_ICONS[i]]}
                image={SECTOR_IMAGES[i]}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1400px] px-6 pb-20 lg:px-10">
        <GoldLine />
      </div>
    </section>
  );
}
