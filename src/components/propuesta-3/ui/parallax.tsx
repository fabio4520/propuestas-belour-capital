"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Desplazamiento diferencial de un bloque respecto al scroll de la página.
 *
 * Se usa entre dos columnas de una misma sección con distancias distintas (o
 * signos opuestos): la página deja de moverse como una lámina rígida y las
 * columnas se separan y reencuentran mientras pasan. La distancia útil es
 * pequeña —12 a 28px—; por encima de eso el texto "flota" y se nota el truco,
 * que es justo lo que un sitio institucional no quiere.
 *
 * No sustituye a los reveals de entrada: esto anima el bloque durante TODO su
 * paso por el viewport, no al aparecer.
 */
export function Parallax({
  children,
  distance = 20,
  axis = "y",
  className,
}: {
  children: ReactNode;
  /** Recorrido total en px. Positivo = se retrasa; negativo = se adelanta. */
  distance?: number;
  /** Eje del desplazamiento. "x" sirve para masthead y textos de gran tamaño. */
  axis?: "x" | "y";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const offset = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  // useScroll no resuelve geometría en SSR (ver sectors.tsx): hasta montar se
  // renderiza en la posición neutra para no romper la hidratación.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={axis === "x" ? { x: mounted ? offset : 0 } : { y: mounted ? offset : 0 }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
