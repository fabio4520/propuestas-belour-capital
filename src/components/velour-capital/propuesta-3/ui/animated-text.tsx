"use client";

import { motion } from "framer-motion";
import { createElement } from "react";
import { cn } from "@/lib/utils";
import { wordContainer, wordItem, viewportOnce } from "../motion/variants";

type Props = {
  text: string;
  /** Subcadena exacta a resaltar con degradado dorado. */
  highlight?: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  animateOnView?: boolean;
};

/**
 * Titular con reveal palabra por palabra (stagger).
 * Cada palabra vive en un span.inline-block.overflow-hidden (permite animar
 * translateY sin ver el overflow). El espaciado se da con marginRight en el
 * wrapper — NUNCA con un carácter " " literal: un espacio de texto colocado
 * al final de un inline-block se colapsa visualmente cuando el siguiente
 * inline-block empieza sin espacio en el HTML (palabras quedan pegadas).
 * Mantiene el texto accesible (aria-label) mientras las palabras son aria-hidden.
 */
export function AnimatedText({
  text,
  highlight,
  className,
  as = "h2",
  animateOnView = true,
}: Props) {
  const words = text.split(" ");
  const highlightWords = highlight ? highlight.split(" ") : [];

  const isHighlighted = (word: string) =>
    highlightWords.some(
      (h) => word.replace(/[.,]/g, "") === h.replace(/[.,]/g, "")
    );

  const MotionTag = motion[as];

  return createElement(
    MotionTag,
    {
      "aria-label": text,
      className: cn(className),
      variants: wordContainer,
      initial: "hidden",
      ...(animateOnView
        ? { whileInView: "visible", viewport: viewportOnce }
        : { animate: "visible" }),
    },
    words.map((word, i) => (
      <span
        key={i}
        aria-hidden
        className="inline-block overflow-hidden"
        style={i < words.length - 1 ? { marginRight: "0.25em" } : undefined}
      >
        <motion.span
          variants={wordItem}
          className={cn(
            "inline-block",
            isHighlighted(word) && "text-velour-gold-gradient"
          )}
        >
          {word}
        </motion.span>
      </span>
    ))
  );
}
