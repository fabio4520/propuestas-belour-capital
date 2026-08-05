"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { TEAM } from "./data";
import { Reveal, staggerContainer, staggerItem } from "./reveal";

export function Team() {
  return (
    <section id="equipo" className="relative border-t border-border/50 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="font-serif text-sm text-gold/70">02</span>
            <span className="h-px w-8 bg-gold/40" />
            <span className="text-xs uppercase tracking-widest text-gold">
              Equipo
            </span>
          </div>
          <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-white sm:text-5xl">
            Socios con trayectoria en{" "}
            <span className="italic text-gold-sheen">capital privado</span>
          </h2>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TEAM.map((member) => (
            <motion.article
              key={member.name}
              variants={staggerItem}
              className="group"
            >
              {/* Avatar placeholder con iniciales sobre degradado oscuro */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border bg-gradient-to-b from-ink-700 to-ink-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-6xl text-gold/20 transition-colors duration-500 group-hover:text-gold/40">
                    {member.initials}
                  </span>
                </div>
                {/* overlay dorado en hover */}
                <div className="absolute inset-0 bg-gold/0 transition-colors duration-500 group-hover:bg-gold/[0.06]" />
                {/* enlace social que aparece en hover */}
                <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-gold/40 text-gold">
                    <Linkedin className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <h3 className="mt-5 font-serif text-xl text-white">
                {member.name}
              </h3>
              <p className="mt-1 text-sm uppercase tracking-wider text-gold/70">
                {member.role}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
