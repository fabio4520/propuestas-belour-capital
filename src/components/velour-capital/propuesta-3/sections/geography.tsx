"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { SectionHeading } from "../ui/section-heading";
import { MAP_NODES } from "../lib/constants";
import { fadeUp, viewportOnce } from "../motion/variants";
import { EASE_OUT_EXPO } from "../motion/transitions";

const Globe = dynamic(() => import("../ui/globe"), { ssr: false });

const GLOBE_DOTS = { color: "#E8D9A0", size: 3, density: 6, allDots: false };
const GLOBE_MARKERS = {
  markers: MAP_NODES.map((n) => ({ lat: n.lat, lng: n.lng })),
  color: "#D4AF37",
  size: 32,
};

export function Geography() {
  const t = useTranslations("geography");
  const locations = t.raw("locations") as Record<string, string>;
  const markets = t.raw("markets") as Record<string, string>;

  const primaryId = MAP_NODES.find((n) => n.primary)?.id ?? MAP_NODES[0].id;
  const [active, setActive] = useState(primaryId);

  // Performance: montar el globo (2º contexto WebGL) solo cuando la sección se
  // acerca al viewport — no corre durante el hero ni el scroll superior.
  const globeRef = useRef<HTMLDivElement>(null);
  const [showGlobe, setShowGlobe] = useState(false);
  useEffect(() => {
    const el = globeRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowGlobe(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="geography" className="relative overflow-hidden bg-velour-coal/40 py-28 sm:py-36">
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08),transparent_65%)]" />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <div>
          <SectionHeading
            index="08"
            eyebrow={t("label")}
            title={t("headline")}
            highlight={t("highlight")}
            description={t("text")}
          />

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
                      isActive ? "text-velour-gold" : "text-velour-white/70 hover:text-velour-white"
                    }`}
                  >
                    <MapPin
                      className={`h-4 w-4 transition-colors duration-300 ${
                        isActive ? "text-velour-gold" : "text-velour-gold/50"
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

        {/* Globo 3D — hub Houston + presencia LATAM */}
        <div ref={globeRef} className="relative aspect-square w-full">
          <p className="sr-only">
            {t("headline")} — {Object.values(locations).join(", ")}
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
            className="absolute inset-0"
            aria-hidden
          >
            {showGlobe && (
            <Globe
              speed={0.6}
              smoothing={8}
              scale={9}
              initialLatitude={3}
              initialLongitude={76}
              dots={GLOBE_DOTS}
              oceanColor="#0A0A0A"
              outlineColor="rgba(212,175,55,0.45)"
              outlineWidth={1}
              showOutline
              showGrid={false}
              dragSpeed={4}
              detail={6}
              stopOnHover
              markerConfig={GLOBE_MARKERS}
            />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 1.4 }}
            className="glass-velour absolute bottom-2 right-0 w-60 rounded-xl p-5"
          >
            <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-velour-gold/70">
              <span className="h-1 w-1 rounded-full bg-velour-gold" />
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
                <p className="mt-2 font-garamond text-xl text-velour-white">{locations[active]}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-velour-stone">{markets[active]}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
