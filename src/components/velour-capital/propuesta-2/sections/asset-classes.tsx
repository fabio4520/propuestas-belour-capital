"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Pickaxe, Building2, Compass, Globe2, ArrowUpRight, type LucideIcon } from "lucide-react";
import { SectionLabel } from "../ui/section-label";
import { AnimatedText } from "../ui/animated-text";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../motion/variants";

const ICONS: LucideIcon[] = [Pickaxe, Building2, Compass, Globe2];

/* Imagen cinematográfica por clase de activo (orden = messages.assets.items) */
const IMAGES = [
  "/velour/asset-velour-bg-1.png", // mining → mina a tajo abierto
  "/velour/asset-velour-bg-2.png", // real estate → skyline financiero
  "/velour/thumbnail-3.png", // advisory → mármol negro + oro
  "/velour/thumbnail-5.png", // strategic → valle minero + skyline
];

/* Tinte de marca por clase (preserva identidad cromática sobre la foto) */
const BG = [
  "from-[#2a1c12] via-graphite to-obsidian", // mining → cobre/tierra
  "from-navy via-graphite to-obsidian", // real estate → navy
  "from-graphite-600 via-graphite to-obsidian", // advisory → grafito
  "from-[#2a2418] via-graphite to-obsidian", // strategic → champagne tenue
];

type Item = { title: string; text: string };

export function AssetClasses() {
  const t = useTranslations("assets");
  const items = t.raw("items") as Item[];

  return (
    <section id="assets" className="relative bg-obsidian-900 py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-2xl">
          <SectionLabel index="03">{t("label")}</SectionLabel>
          <AnimatedText
            as="h2"
            text={t("headline")}
            className="mt-7 font-cormorant text-4xl font-light leading-[1.1] text-warmwhite sm:text-5xl"
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-5 font-manrope text-lg text-stone"
          >
            {t("subtext")}
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-5 md:grid-cols-2"
        >
          {items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <motion.article
                key={item.title}
                variants={staggerItem}
                className="group relative min-h-[340px] cursor-pointer overflow-hidden rounded-2xl border border-white/8 lg:min-h-[420px]"
              >
                {/* Imagen de fondo con zoom en hover */}
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                  <Image
                    src={IMAGES[i]}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                {/* Tinte de marca por clase (mantiene identidad cromática) */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${BG[i]} opacity-50 mix-blend-multiply`}
                />
                {/* Patrón de líneas sutil */}
                <svg
                  className="absolute inset-0 h-full w-full opacity-[0.06]"
                  preserveAspectRatio="none"
                  viewBox="0 0 400 400"
                  aria-hidden
                >
                  {[0, 1, 2, 3, 4, 5].map((k) => (
                    <line
                      key={k}
                      x1="0"
                      y1={k * 70}
                      x2="400"
                      y2={k * 70 - 80}
                      stroke="#d8c290"
                      strokeWidth="1"
                    />
                  ))}
                </svg>
                {/* Overlay para legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-transparent" />
                {/* Borde champagne en hover */}
                <div className="absolute inset-0 rounded-2xl border border-transparent transition-colors duration-500 group-hover:border-champagne/40" />

                {/* Contenido */}
                <div className="relative flex h-full flex-col justify-between p-8 lg:p-10">
                  <div className="flex items-start justify-between">
                    <span className="font-cormorant text-6xl italic text-white/15">
                      0{i + 1}
                    </span>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 text-champagne transition-colors duration-300 group-hover:border-champagne/50 group-hover:bg-champagne/10">
                      <Icon className="h-6 w-6" strokeWidth={1.4} />
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-cormorant text-3xl text-warmwhite">
                        {item.title}
                      </h3>
                      <ArrowUpRight className="h-5 w-5 text-champagne opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                    </div>
                    {/* Descripción con reveal */}
                    <p className="mt-3 max-w-md font-manrope text-sm leading-relaxed text-stone transition-all duration-500 lg:translate-y-2 lg:opacity-70 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
