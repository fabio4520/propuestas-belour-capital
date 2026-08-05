"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CircleDot, Gem, Building, Network, type LucideIcon } from "lucide-react";
import { SectionLabel } from "../ui/section-label";
import { AnimatedText } from "../ui/animated-text";
import { staggerContainer, staggerItem, viewportOnce } from "../motion/variants";

const ICONS: LucideIcon[] = [CircleDot, Gem, Building, Network];

/* Sparklines abstractas (placeholder; el módulo queda listo para API real) */
const SPARKS = [
  "M0 30 L15 26 L30 28 L45 18 L60 20 L75 10 L90 6",
  "M0 22 L15 24 L30 20 L45 22 L60 18 L75 20 L90 16",
  "M0 28 L15 22 L30 26 L45 20 L60 24 L75 16 L90 18",
  "M0 32 L15 24 L30 26 L45 16 L60 18 L75 12 L90 8",
];

type Card = { title: string; metric: string; note: string };

export function MarketLens() {
  const t = useTranslations("market");
  const cards = t.raw("cards") as Card[];

  return (
    <section id="market" className="relative bg-obsidian-900 py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <SectionLabel index="07">{t("label")}</SectionLabel>
            <AnimatedText
              as="h2"
              text={t("headline")}
              className="mt-7 font-cormorant text-4xl font-light leading-[1.1] text-warmwhite sm:text-5xl"
            />
          </div>
          <p className="max-w-xs font-manrope text-xs leading-relaxed text-stone-dark">
            {t("disclaimer")}
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {cards.map((card, i) => {
            const Icon = ICONS[i];
            return (
              <motion.article
                key={card.title}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group glass flex flex-col rounded-2xl p-6 transition-colors duration-300 hover:border-champagne/30"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-champagne">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className="font-manrope text-sm font-medium text-copper-light">
                    {card.metric}
                  </span>
                </div>

                <h3 className="mt-5 font-cormorant text-xl text-warmwhite">
                  {card.title}
                </h3>
                <p className="mt-2 flex-1 font-manrope text-xs leading-relaxed text-stone">
                  {card.note}
                </p>

                {/* Mini chart abstracto */}
                <svg
                  viewBox="0 0 90 40"
                  className="mt-5 h-10 w-full overflow-visible"
                  fill="none"
                  aria-hidden
                >
                  <motion.path
                    d={SPARKS[i]}
                    stroke={`url(#sparkGrad-${i})`}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.1 }}
                  />
                  <defs>
                    <linearGradient id={`sparkGrad-${i}`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#b0764f" />
                      <stop offset="100%" stopColor="#d8c290" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
