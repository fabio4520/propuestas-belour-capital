"use client";

import { motion } from "framer-motion";
import { Pickaxe, Building2, Zap, type LucideIcon } from "lucide-react";
import { SECTORS } from "./data";
import { Reveal, staggerContainer, staggerItem } from "./reveal";

/* Mapa nombre→icono para resolver el ícono declarado en data.ts */
const ICONS: Record<string, LucideIcon> = { Pickaxe, Building2, Zap };

export function Sectors() {
  return (
    <section id="sectores" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        {/* Encabezado de sección */}
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="font-serif text-sm text-gold/70">01</span>
            <span className="h-px w-8 bg-gold/40" />
            <span className="text-xs uppercase tracking-widest text-gold">
              Sectores de inversión
            </span>
          </div>
          <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-white sm:text-5xl">
            Tesis de inversión enfocada en{" "}
            <span className="italic text-gold-sheen">activos reales</span>
          </h2>
        </Reveal>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border md:grid-cols-3"
        >
          {SECTORS.map((sector, i) => {
            const Icon = ICONS[sector.icon];
            return (
              <motion.article
                key={sector.id}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group relative cursor-pointer bg-ink-800 p-9 transition-colors duration-300 hover:bg-ink-700"
              >
                {/* línea dorada superior que crece en hover */}
                <span className="absolute inset-x-0 top-0 h-0.5 w-0 bg-gold transition-all duration-500 group-hover:w-full" />

                <span className="font-serif text-sm text-gold/40">
                  0{i + 1}
                </span>

                <div className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors duration-300 group-hover:border-gold group-hover:text-gold">
                  {Icon ? <Icon className="h-6 w-6" strokeWidth={1.5} /> : null}
                </div>

                <h3 className="mt-7 font-serif text-2xl text-white transition-colors duration-300 group-hover:text-gold">
                  {sector.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {sector.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
