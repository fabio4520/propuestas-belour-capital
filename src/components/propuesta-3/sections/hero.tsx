"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowDown } from "lucide-react";
import { AnimatedText } from "../ui/animated-text";
import { EASE_OUT_EXPO } from "../motion/transitions";

/* three.js pesa ~600 KB minificado. Importado de forma estática viajaba en el
   chunk inicial de la página aunque el canvas sea puro efecto de cliente que no
   aporta una sola etiqueta al HTML. Con dynamic/ssr:false sale del camino
   crítico y llega en paralelo, sin retrasar el wordmark (que es el LCP real de
   esta pantalla). El fondo negro de la sección cubre el hueco mientras carga. */
const WovenCanvas = dynamic(
  () => import("../ui/woven-canvas").then((m) => m.WovenCanvas),
  { ssr: false }
);

/**
 * Hero de impacto: solo el wordmark de marca + slogan, centrados sobre el
 * campo de partículas — la animación es la protagonista, no hay eyebrow ni
 * CTA compitiendo por la atención en la primera pantalla. El resto del
 * mensaje (propuesta de valor, CTAs) vive en la sección "Introduction"
 * inmediatamente debajo.
 *
 * Fondo: campo de partículas Three.js sobre un torus-knot ("tejido de luz"),
 * 100% generativo — no depende de un asset de video pendiente. Reacciona
 * sutilmente al cursor y respeta la regla de marca (≥90% negro, dorado solo
 * como acento escaso). Wrapper del canvas SIN z-index negativo (nunca -z-10
 * con ancestro de fondo sólido: lo tapa), primero en el DOM; el contenido va
 * relative z-10 encima.
 */
export function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  /* Salida del hero atada al scroll: en vez de desplazarse en bloque hasta
     desaparecer por el borde, el hero se DISUELVE mientras la siguiente
     sección lo empuja — el wordmark sube un poco más rápido que la página y
     se apaga, y el tejido de partículas se aleja ganando escala. Es el gesto
     que separa un scroll de documento de uno dirigido, y cuesta lo mismo que
     no hacer nada: solo transform y opacity, sobre elementos que ya existen. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  /* Todo termina en 0.75 y no en 1: el último cuarto del recorrido ya está
     fuera de pantalla, y estirar el fundido hasta ahí lo vuelve imperceptible
     justo cuando debería haber acabado. */
  const contentY = useTransform(scrollYProgress, [0, 0.75], [0, -110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const canvasScale = useTransform(scrollYProgress, [0, 0.75], [1, 1.18]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.25]);

  // useScroll no mide geometría en SSR (mismo guard que sectors/services).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const live = mounted && !reduce;

  return (
    <section
      id="top"
      ref={ref}
      /* 100svh y no 100vh: en móvil, vh se mide con la barra de URL retraída,
         así que al cargar (con la barra visible) el hero queda más alto que el
         área visible y empuja el indicador de scroll fuera de pantalla. */
      className="grain-belour surface-noir relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-surface"
    >
      {/* Fondo cinematográfico */}
      <motion.div
        style={{
          scale: live ? canvasScale : 1,
          opacity: live ? canvasOpacity : 1,
        }}
        className="absolute inset-0 will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
          className="absolute inset-0"
        >
          <WovenCanvas />
        </motion.div>

        {/* Viñeta radial: oscurece los bordes, mantiene el centro despejado
            para el wordmark sin tapar el tejido de partículas con un bloque */}
        <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_50%_50%,transparent_0%,rgba(10,10,10,0.55)_65%,rgba(10,10,10,0.95)_100%)]" />
        {/* Viñeta vertical: funde el header arriba y el indicador de scroll abajo */}
        <div className="absolute inset-0 bg-gradient-to-b from-belour-noir/70 via-transparent to-belour-noir" />
      </motion.div>

      <motion.div
        style={{ y: live ? contentY : 0, opacity: live ? contentOpacity : 1 }}
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center will-change-transform"
      >
        <AnimatedText
          as="h1"
          animateOnView={false}
          text="BELOUR Capital"
          highlight="Capital"
          className="font-sans text-6xl font-light leading-[1.05] tracking-[0.03em] text-ink drop-shadow-[0_0_40px_rgba(10,10,10,0.9)] sm:text-7xl lg:text-8xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.65 }}
          className="mt-7 max-w-lg text-lg tracking-wide text-ink-muted drop-shadow-[0_0_20px_rgba(10,10,10,0.9)] sm:text-xl"
        >
          {t("slogan")}
        </motion.p>
      </motion.div>

      {/* Indicador de scroll. Va en dos capas a propósito: la exterior lleva la
          opacidad ligada al scroll y la interior su fade-in de entrada. En un
          mismo elemento, el `style` inline del motion value pisaría al
          `animate`, y el indicador aparecería de golpe al cargar. */}
      <motion.div
        style={{ opacity: live ? contentOpacity : 1 }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col items-center gap-2 text-ink-muted"
        >
          <span className="text-[10px] uppercase tracking-[0.35em]">
            {t("scroll")}
          </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-4 w-4 text-brand" />
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
