"use client";

import { motion } from "framer-motion";
import { viewportOnce } from "../motion/variants";
import { EASE_OUT_EXPO } from "../motion/transitions";
import { cn } from "@/lib/utils";

/** Hairline dorada animada (scaleX 0→1 on view) — firma visual recurrente. */
export function GoldLine({ className }: { className?: string }) {
  return (
    <motion.span
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
      aria-hidden
      className={cn(
        "block h-px w-full origin-left bg-gradient-to-r from-belour-perla/70 via-belour-perla/25 to-transparent",
        className
      )}
    />
  );
}
