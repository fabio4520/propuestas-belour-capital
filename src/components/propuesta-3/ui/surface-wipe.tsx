"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Corte de acto: la sección se descubre retirando una cortina del tono de la
 * sección anterior, atada al scroll.
 *
 * Con la paleta alternada, pasar de negro a papel es el momento más fuerte de
 * la página y en scroll continuo se resolvía en un corte instantáneo — el
 * cambio ocurría fuera de pantalla y el lector solo veía "otra sección". Aquí
 * el corte dura lo que el lector tarde en cruzarlo: la cortina cubre la
 * primera franja de la sección y se recoge hacia arriba conforme entra,
 * dejando el papel debajo.
 *
 * Va montado como primer hijo de una sección `relative` (la sección necesita
 * `overflow-hidden` solo si su contenido se sale por arriba). El borde inferior
 * es un degradado, no un canto: una línea dura barriendo la pantalla se lee
 * como un fallo de render, y difuminada se lee como una transición.
 *
 * `from` es el color de la sección anterior en sintaxis CSS (normalmente
 * `rgb(var(--…))` no sirve: la variable la define ESTA sección, no la de
 * arriba, así que se pasa el valor literal).
 */
export function SurfaceWipe({ from, height = "32vh" }: { from: string; height?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  /* El progreso se mide sobre el propio panel, que está pegado al borde
     superior de la sección: 0 cuando ese borde asoma por abajo del viewport,
     1 cuando ha subido hasta el 45% de la pantalla. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 45%"],
  });

  /* Se retira desplazándose, no encogiendo: `scaleY` deforma también el
     degradado del canto y lo va comprimiendo hasta convertirlo en la línea
     dura que precisamente queremos evitar. Trasladar deja el difuminado
     intacto durante todo el recorrido. */
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  // Mismo gotcha de hidratación que en sectors/services: useScroll no puede
  // medir geometría en el servidor, así que hasta montar se renderiza el
  // valor de reposo (cortina puesta) en vez de un motion value sin resolver.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (reduce) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{ height, y: mounted ? y : "0%" }}
      className="pointer-events-none absolute inset-x-0 top-0 z-20 will-change-transform"
    >
      <div className="h-full w-full" style={{ backgroundColor: from }} />
      {/* Difuminado del canto inferior, en el mismo tono. Corto (56px) a
          propósito: estirado, el degradado entre negro y papel pasa por una
          franja ancha de grises que no están en la paleta y se lee como
          suciedad en vez de como transición. */}
      <div
        className="absolute inset-x-0 top-full h-14"
        style={{ backgroundImage: `linear-gradient(to bottom, ${from}, transparent)` }}
      />
    </motion.div>
  );
}
