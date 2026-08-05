"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { SectionLabel } from "../ui/section-label";
import { AnimatedText } from "../ui/animated-text";
import { MAP_NODES, MAP_EDGES } from "../lib/constants";
import { fadeUp, viewportOnce } from "../motion/variants";
import { EASE_OUT_EXPO } from "../motion/transitions";

const coord = (id: string) => {
  const n = MAP_NODES.find((m) => m.id === id)!;
  return { x: n.x, y: n.y };
};

export function GeographicIntelligence() {
  const t = useTranslations("geographic");
  const locations = t.raw("locations") as Record<string, string>;
  const markets = t.raw("markets") as Record<string, string>;

  const primaryId = MAP_NODES.find((n) => n.primary)?.id ?? MAP_NODES[0].id;
  const [active, setActive] = useState(primaryId);

  return (
    <section
      id="geographic"
      className="relative overflow-hidden bg-navy-deep py-28 sm:py-36"
    >
      {/* Backdrop: red de las Américas, muy tenue (sugiere, no compite) */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/velour/asset-velour-bg-4.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.18]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep/70 to-navy-deep" />
      </div>

      {/* glow ambiental */}
      <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(216,194,144,0.08),transparent_65%)]" />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        {/* Texto */}
        <div>
          <SectionLabel index="04">{t("label")}</SectionLabel>
          <AnimatedText
            as="h2"
            text={t("headline")}
            highlight="Houston."
            className="mt-7 font-cormorant text-4xl font-light leading-[1.1] text-warmwhite sm:text-5xl"
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-6 max-w-md font-manrope text-lg leading-relaxed text-stone"
          >
            {t("text")}
          </motion.p>

          {/* Lista de mercados (interactiva) */}
          <motion.ul
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
          >
            {MAP_NODES.map((node) => {
              const isActive = active === node.id;
              return (
                <li key={node.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(node.id)}
                    onFocus={() => setActive(node.id)}
                    onClick={() => setActive(node.id)}
                    className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                      isActive
                        ? "text-champagne"
                        : "text-warmwhite/70 hover:text-warmwhite"
                    }`}
                  >
                    <MapPin
                      className={`h-4 w-4 transition-colors duration-300 ${
                        isActive ? "text-champagne" : "text-champagne/60"
                      }`}
                      strokeWidth={1.5}
                    />
                    {locations[node.id]}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        </div>

        {/* Mapa abstracto */}
        <div className="relative aspect-[4/5] w-full">
          {/* Conexiones */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {MAP_EDGES.map(([a, b], i) => {
              const pa = coord(a);
              const pb = coord(b);
              const lit = a === active || b === active;
              return (
                <motion.line
                  key={i}
                  x1={pa.x}
                  y1={pa.y}
                  x2={pb.x}
                  y2={pb.y}
                  stroke={
                    lit ? "rgba(216,194,144,0.7)" : "rgba(216,194,144,0.25)"
                  }
                  strokeWidth={lit ? 0.4 : 0.25}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    ease: EASE_OUT_EXPO,
                    delay: 0.3 + i * 0.15,
                  }}
                />
              );
            })}
          </svg>

          {/* Nodos */}
          {MAP_NODES.map((node, i) => {
            const isActive = active === node.id;
            return (
              <motion.button
                type="button"
                key={node.id}
                onMouseEnter={() => setActive(node.id)}
                onFocus={() => setActive(node.id)}
                onClick={() => setActive(node.id)}
                aria-label={locations[node.id]}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.5 + i * 0.15,
                }}
              >
                <div className="relative flex flex-col items-center">
                  {/* halo */}
                  <span
                    className={`absolute rounded-full transition-all duration-300 ${
                      isActive
                        ? "h-10 w-10 bg-champagne/25"
                        : "h-8 w-8 bg-champagne/10"
                    } animate-pulse-node`}
                  />
                  <span
                    className={`relative rounded-full transition-all duration-300 ${
                      isActive
                        ? "h-3 w-3 bg-champagne shadow-[0_0_16px_rgba(216,194,144,0.9)]"
                        : node.primary
                          ? "h-2.5 w-2.5 bg-champagne shadow-[0_0_12px_rgba(216,194,144,0.7)]"
                          : "h-2.5 w-2.5 bg-copper-light"
                    }`}
                  />
                  <span
                    className={`mt-2 whitespace-nowrap text-[11px] uppercase tracking-wider transition-colors duration-300 ${
                      isActive ? "text-champagne" : "text-warmwhite/70"
                    }`}
                  >
                    {locations[node.id]}
                  </span>
                </div>
              </motion.button>
            );
          })}

          {/* Card flotante (refleja el mercado activo) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 1.4 }}
            className="glass absolute bottom-2 right-0 w-60 rounded-xl p-5"
          >
            <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-champagne/70">
              <span className="h-1 w-1 rounded-full bg-champagne" />
              {t("hint")}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
              >
                <p className="mt-2 font-cormorant text-xl text-warmwhite">
                  {locations[active]}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-stone">
                  {markets[active]}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
