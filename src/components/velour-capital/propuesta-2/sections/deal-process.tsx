"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionLabel } from "../ui/section-label";
import { AnimatedText } from "../ui/animated-text";
import { staggerContainer, staggerItem, viewportOnce } from "../motion/variants";

type Step = { title: string; text: string };

export function DealProcess() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Step[];

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 70%"],
  });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative bg-obsidian py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-2xl">
          <SectionLabel index="06">{t("label")}</SectionLabel>
          <AnimatedText
            as="h2"
            text={t("headline")}
            highlight="ejecución."
            className="mt-7 font-cormorant text-4xl font-light leading-[1.1] text-warmwhite sm:text-5xl"
          />
        </div>

        <div ref={ref} className="relative mt-20">
          {/* Línea base + progreso (desktop) */}
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-white/10 lg:block">
            <motion.div
              style={{ width: progress }}
              className="h-full bg-gradient-to-r from-champagne to-copper"
            />
          </div>

          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid gap-12 lg:grid-cols-4 lg:gap-8"
          >
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                variants={staggerItem}
                className="group relative"
              >
                {/* Marcador */}
                <div className="flex items-center gap-4 lg:block">
                  <span className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-champagne/40 bg-obsidian font-cormorant text-lg text-champagne transition-colors duration-300 group-hover:bg-champagne group-hover:text-obsidian">
                    {i + 1}
                  </span>
                </div>

                <div className="mt-5 lg:pr-6">
                  <h3 className="font-cormorant text-2xl text-warmwhite">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 font-manrope text-sm leading-relaxed text-stone">
                    {step.text}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
