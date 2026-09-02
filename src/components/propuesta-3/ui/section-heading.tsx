"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "./animated-text";
import { fadeUp, viewportOnce } from "../motion/variants";
import { cn } from "@/lib/utils";

/**
 * Cabecera de sección reutilizable: eyebrow dorado (índice + hairline +
 * texto uppercase) + titular Garamond font-light con reveal palabra a
 * palabra + descripción opcional.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  className,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center"
        )}
      >
        {index && (
          <span className="font-cormorant text-sm italic text-belour-hueso/80">
            {index}
          </span>
        )}
        <span className="h-px w-8 bg-belour-perla/50" />
        <span className="text-xs font-medium uppercase tracking-[0.35em] text-belour-perla">
          {eyebrow}
        </span>
      </motion.div>

      <AnimatedText
        as="h2"
        text={title}
        highlight={highlight}
        className="mt-6 font-sans text-4xl font-light leading-[1.12] tracking-[0.01em] text-belour-white sm:text-5xl"
      />

      {description && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-5 max-w-xl text-base leading-relaxed text-belour-piedra sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
