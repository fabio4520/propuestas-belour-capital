"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Scroll suave con inercia (Lenis), scopeado a la Propuesta 3 de Velour.
 * Expone la instancia en window.__lenis: cualquier scroll programático
 * (botón "volver arriba", navegación por ancla) debe pasar por
 * window.__lenis.scrollTo(...) en vez de window.scrollTo nativo, porque Lenis
 * reafirma su propio modelo de scroll en cada frame y "gana" la carrera contra
 * la API nativa, dejando animaciones de scroll cortadas a mitad de camino.
 * Se desactiva por completo si el usuario prefiere movimiento reducido.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.__lenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Navegación ancla fluida
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
