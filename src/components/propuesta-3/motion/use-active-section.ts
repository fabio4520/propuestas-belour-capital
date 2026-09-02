"use client";

import { useEffect, useState } from "react";

/**
 * Id de la sección que el lector tiene delante, para marcarla en el nav.
 *
 * El truco está en el rootMargin: recorta el viewport a una banda de ~1% de
 * alto situada al 42% de la pantalla, así que "activa" significa
 * literalmente "la sección que cruza esa línea". Sin ese recorte habría que
 * comparar ratios de intersección, y aquí eso no funciona: Servicios mide
 * 300vh y Sectores 500vh por el scroll pineado, así que su ratio jamás se
 * acerca al de una sección corta y el nav se quedaría clavado en la primera.
 *
 * Un IntersectionObserver no cuesta nada por frame (el navegador lo resuelve
 * fuera del hilo principal), que es la razón de no hacer esto midiendo
 * rects en un listener de scroll.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  // Las dependencias son los ids en sí, no la identidad del array: NAV_ITEMS
  // es constante, pero cualquier `.map()` en el llamador crearía uno nuevo
  // por render y reinstalaría el observer en bucle.
  const key = ids.join(",");

  useEffect(() => {
    const elements = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-42% 0px -57% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
