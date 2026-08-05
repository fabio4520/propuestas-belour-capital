"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Linkedin } from "lucide-react";
import { SectionLabel } from "../ui/section-label";
import { AnimatedText } from "../ui/animated-text";
import { staggerContainer, staggerItem, viewportOnce } from "../motion/variants";

type Member = { name: string; role: string; bio: string };

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .replace(/[^A-Za-z]/g, "")
    .slice(0, 2)
    .toUpperCase();

export function Leadership() {
  const t = useTranslations("leadership");
  const members = t.raw("members") as Member[];

  return (
    <section id="leadership" className="relative bg-obsidian py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-2xl">
          <SectionLabel index="08">{t("label")}</SectionLabel>
          <AnimatedText
            as="h2"
            text={t("headline")}
            className="mt-7 font-cormorant text-4xl font-light leading-[1.1] text-warmwhite sm:text-5xl"
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {members.map((member) => (
            <motion.article
              key={member.name}
              variants={staggerItem}
              className="group"
            >
              {/* Retrato placeholder sobrio */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/8 bg-gradient-to-b from-graphite to-obsidian-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-cormorant text-6xl italic text-white/12 transition-colors duration-500 group-hover:text-champagne/25">
                    {initials(member.name)}
                  </span>
                </div>
                <div className="absolute inset-0 bg-champagne/0 transition-colors duration-500 group-hover:bg-champagne/[0.04]" />
                <div className="absolute bottom-3 right-3 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-champagne/40 text-champagne">
                    <Linkedin className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <h3 className="mt-5 font-cormorant text-2xl text-warmwhite">
                {member.name}
              </h3>
              <p className="mt-0.5 text-xs uppercase tracking-wider text-champagne/70">
                {member.role}
              </p>
              <p className="mt-2.5 font-manrope text-sm leading-relaxed text-stone">
                {member.bio}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
