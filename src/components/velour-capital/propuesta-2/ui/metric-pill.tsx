"use client";

import { motion } from "framer-motion";
import { staggerItem } from "../motion/variants";

/** Trust pill de vidrio con punto champagne. Pensada para usarse en stagger. */
export function MetricPill({ label }: { label: string }) {
  return (
    <motion.span
      variants={staggerItem}
      className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wide text-warmwhite/80 transition-colors duration-300 hover:text-warmwhite"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
      {label}
    </motion.span>
  );
}
