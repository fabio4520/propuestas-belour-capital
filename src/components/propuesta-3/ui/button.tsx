"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

const BASE =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand text-brand-on hover:brightness-110 hover:shadow-[0_10px_40px_-10px_rgb(var(--brand)/0.5)] hover:-translate-y-0.5",
  outline:
    "border border-rule/15 text-ink hover:border-brand/60 hover:text-brand",
  ghost: "text-ink-muted hover:text-ink",
};

/**
 * Botón institucional de la Propuesta 3.
 * Renderiza directamente un <a> o <button> (el elemento interactivo lleva los
 * estilos y el foco); único relleno de acento permitido en toda la UI. El
 * relleno es `brand` y su tinta `brand-on`, así que se invierte solo cuando la
 * sección pasa de noir a papel.
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
