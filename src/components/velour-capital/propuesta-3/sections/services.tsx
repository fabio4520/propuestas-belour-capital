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
import {
  Layers,
  LineChart,
  Users,
  ShieldCheck,
  Search,
  FileCheck2,
  Handshake,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "../ui/section-heading";
import { SERVICE_ICONS, PROTOCOL_ICONS } from "../lib/constants";
import { fadeUp, staggerItem, viewportOnce } from "../motion/variants";

const ICONS: Record<string, LucideIcon> = {
  Layers,
  LineChart,
  Users,
  ShieldCheck,
  Search,
  FileCheck2,
  Handshake,
  TrendingUp,
};

type Item = { title: string; text: string };

/* Cuánto del tramo de cada card se dedica a la transición deslizante.
   Debe ser menor a la mitad del ancho de tramo (1/total items) o los
   keyframes [start, start+FADE, end-FADE, end] dejan de ser crecientes
   y useTransform produce un hueco en blanco entre cards. Con 4 items
   (tramo 0.25) el máximo seguro es 0.125 — se deja margen debajo. */
const FADE = 0.09;
/* Alto de scroll dedicado a cada card dentro del tramo pineado */
const VH_PER_CARD = 100;

function ServiceCardBody({ item, icon: Icon }: { item: Item; icon: LucideIcon }) {
  return (
    <div className="glass-velour w-full max-w-[560px] rounded-3xl border border-white/10 p-8 sm:p-10">
      <h3 className="font-garamond text-2xl font-light text-velour-white sm:text-3xl">
        {item.title}
      </h3>

      <div className="relative mt-7 flex h-52 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-velour-black sm:h-60">
        <div
          aria-hidden
          className="absolute h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.25),transparent_70%)] blur-xl"
        />
        <Icon className="relative h-14 w-14 text-velour-gold" strokeWidth={1} />
      </div>

      <p className="mt-7 text-sm leading-relaxed text-velour-stone sm:text-base">
        {item.text}
      </p>
    </div>
  );
}

/**
 * Card de carrusel: se desliza horizontalmente atada al progreso de scroll
 * del contenedor pineado — entra desde la derecha, queda centrada, sale por
 * la izquierda mientras la siguiente entra. Distinto del mecanismo de
 * Sectores (que encoge y funde in-place): aquí el movimiento es lateral,
 * como un carrusel real. Misma lógica de edges inicial/final que Sectores
 * (la primera card no entra deslizando, la última no sale).
 */
function ServiceCard({
  item,
  index,
  total,
  icon,
  progress,
}: {
  item: Item;
  index: number;
  total: number;
  icon: LucideIcon;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const x = useTransform(
    progress,
    [start, start + FADE, end - FADE, end],
    [isFirst ? "0%" : "70%", "0%", "0%", isLast ? "0%" : "-70%"]
  );
  const opacity = useTransform(
    progress,
    [start, start + FADE, end - FADE, end],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]
  );

  // Gotcha de hydration: useScroll no resuelve geometría real en SSR — se
  // engancha al valor en vivo solo después de montar (ver sectors.tsx).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="absolute inset-0 flex items-center justify-center px-6">
      {/* x/opacity van en un wrapper del ancho de la card (no del ancho
          del contenedor pineado): trasladar el 70% de ~560px es un
          desplazamiento de "un card" — trasladar el 70% de casi todo el
          viewport (como pasaba antes) saca la card tan lejos que deja un
          hueco muerto visible entre transiciones. */}
      <motion.div
        style={{
          x: mounted ? x : isFirst ? "0%" : "70%",
          opacity: mounted ? opacity : isFirst ? 1 : 0,
        }}
        className="w-full max-w-[560px]"
      >
        <ServiceCardBody item={item} icon={icon} />
      </motion.div>
    </div>
  );
}

function CarouselDot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;
  const width = useTransform(progress, [start, mid, end], [8, 22, 8]);
  const opacity = useTransform(progress, [start, mid, end], [0.35, 1, 0.35]);

  return (
    <motion.span
      style={{ width, opacity }}
      className="h-2 rounded-full bg-velour-gold"
    />
  );
}

export function Services() {
  const t = useTranslations("services");
  const tp = useTranslations("protocol");
  const items = t.raw("items") as Item[];
  const steps = tp.raw("steps") as Item[];

  const carouselRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: carouselProgress } = useScroll({
    target: carouselRef,
    offset: ["start start", "end end"],
  });

  const processRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1]);

  // Mismo gotcha de SSR que en sectors.tsx: sin DOM que medir en servidor,
  // el valor de scroll no puede resolverse — se engancha recién al montar.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="services" className="relative bg-velour-coal/40 py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          index="05"
          eyebrow={t("label")}
          title={t("headline")}
          highlight={t("highlight")}
          description={t("subtext")}
          align="center"
        />
      </div>

      {reduce ? (
        <div className="mx-auto mt-16 flex max-w-[1400px] flex-col items-center gap-8 px-6 lg:px-10">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <ServiceCardBody item={item} icon={ICONS[SERVICE_ICONS[i]]} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div
          ref={carouselRef}
          className="relative mt-16"
          style={{ height: `${items.length * VH_PER_CARD}vh` }}
        >
          <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
            <div className="relative h-[420px] w-full sm:h-[460px]">
              {items.map((item, i) => (
                <ServiceCard
                  key={item.title}
                  item={item}
                  index={i}
                  total={items.length}
                  icon={ICONS[SERVICE_ICONS[i]]}
                  progress={carouselProgress}
                />
              ))}
            </div>

            <div className="mt-10 flex items-center gap-2.5">
              {items.map((item, i) => (
                <CarouselDot key={item.title} index={i} total={items.length} progress={carouselProgress} />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Protocolo Velour — proceso disciplinado 01-04 */}
        <div className="mt-20 lg:mt-28">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-velour-gold/50" />
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-velour-gold">
              {tp("label")}
            </span>
          </div>
          <h3 className="mt-6 max-w-2xl font-garamond text-3xl font-light leading-[1.15] text-velour-white sm:text-4xl">
            {tp("headline")}
          </h3>

          <div ref={processRef} className="relative mt-14">
            <div className="absolute left-[19px] top-2 hidden h-[calc(100%-16px)] w-px bg-white/10 sm:block">
              <motion.div
                style={{ scaleY: mounted ? lineScale : 0 }}
                className="h-full w-full origin-top bg-gradient-to-b from-velour-gold to-velour-champagne"
              />
            </div>
            <div className="flex flex-col">
              {steps.map((step, i) => {
                const Icon = ICONS[PROTOCOL_ICONS[i]];
                return (
                  <motion.div
                    key={step.title}
                    variants={staggerItem}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-[auto_1fr] items-start gap-6 border-t border-white/8 py-8 first:border-t-0 sm:grid-cols-[auto_auto_1fr] sm:gap-8"
                  >
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-velour-gold/40 bg-velour-coal text-xs font-medium text-velour-gold">
                      0{i + 1}
                    </span>
                    <span className="hidden text-velour-gold sm:inline-flex sm:h-10 sm:w-10 sm:items-center sm:justify-center">
                      <Icon className="h-5 w-5" strokeWidth={1.4} />
                    </span>
                    <div>
                      <h4 className="font-garamond text-xl text-velour-white sm:text-2xl">
                        {step.title}
                      </h4>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-velour-stone">
                        {step.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
