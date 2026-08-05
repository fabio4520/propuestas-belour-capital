"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Magnetic } from "../ui/magnetic";
import { SectionHeading } from "../ui/section-heading";
import { fadeUp, viewportOnce } from "../motion/variants";

/**
 * Propuesta de valor institucional — vivía en el Hero antes de que este se
 * redujera a wordmark + slogan para dejar que la animación de partículas
 * capte la primera atención. Mismo mensaje (headline, subheadline, CTAs),
 * ahora con reveal on-scroll en vez de on-mount.
 */
export function Introduction() {
  const t = useTranslations("introduction");

  return (
    <section id="introduction" className="relative bg-velour-black py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          index="01"
          eyebrow={t("eyebrow")}
          title={t("headline")}
          highlight={t("highlight")}
          description={t("subheadline")}
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 flex flex-wrap items-center gap-8"
        >
          <Magnetic>
            <Button href="#services" variant="primary">
              {t("ctaPrimary")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Magnetic>
          <a
            href="#contact"
            className="group relative text-sm font-medium tracking-wide text-velour-white/85 transition-colors hover:text-velour-white"
          >
            {t("ctaSecondary")}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-velour-gold transition-transform duration-300 group-hover:scale-x-100" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
