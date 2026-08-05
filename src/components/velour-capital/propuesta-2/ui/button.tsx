"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

const BASE =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/50 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-champagne text-obsidian hover:bg-champagne-light hover:shadow-[0_10px_40px_-10px_rgba(216,194,144,0.55)] hover:-translate-y-0.5",
  outline:
    "border border-white/15 text-warmwhite hover:border-champagne/60 hover:text-champagne",
  ghost: "text-stone hover:text-warmwhite",
};

/**
 * Botón premium de la Propuesta 2.
 * Renderiza directamente un <a> o <button> (el elemento interactivo lleva los
 * estilos y el foco), con glow champagne en hover.
 */
export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  className,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  className?: string;
}) {
  const classes = cn(BASE, VARIANTS[variant], className);

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        whileTap={{ scale: 0.97 }}
        className={classes}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
