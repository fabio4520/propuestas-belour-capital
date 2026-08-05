"use client";

import { motion } from "framer-motion";
import { createElement } from "react";
import { cn } from "@/lib/utils";
import { wordContainer, wordItem, viewportOnce } from "../motion/variants";

type Props = {
  text: string;
  /** Subcadena exacta a resaltar con degradado champagne. */
  highlight?: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  animateOnView?: boolean;
};

/**
 * Titular con reveal palabra por palabra (stagger).
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
    highlightWords.some((h) => word.replace(/[.,]/g, "") === h.replace(/[.,]/g, ""));

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
      <span key={i} aria-hidden className="inline-block overflow-hidden">
        <motion.span
          variants={wordItem}
          className={cn(
            "inline-block",
            isHighlighted(word) && "text-champagne-gradient"
          )}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      </span>
    ))
  );
}
