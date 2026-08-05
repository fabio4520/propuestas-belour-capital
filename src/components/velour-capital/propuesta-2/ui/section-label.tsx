"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../motion/variants";

/** Etiqueta de sección: índice + línea champagne + texto en mayúsculas. */
export function SectionLabel({
  index,
  children,
}: {
  index?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="flex items-center gap-3"
    >
      {index && (
        <span className="font-cormorant text-sm italic text-champagne/70">
          {index}
        </span>
      )}
      <span className="h-px w-8 bg-champagne/40" />
      <span className="text-xs font-medium uppercase tracking-[0.25em] text-champagne">
        {children}
      </span>
    </motion.div>
  );
}
