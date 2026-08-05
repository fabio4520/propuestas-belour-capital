"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

/**
 * HummingbirdHero — hero con animación scroll-scrubbed sobre <canvas>.
 *
 * Los 12 frames del colibrí (/public/balanz/frame-0.png … frame-11.png) se
 * precargan y se dibujan en un canvas 16:9. El aleteo NO se reproduce solo:
 * el progreso de scroll de la sección (useScroll 0→1) se mapea al índice de
 * frame (0→11), así el colibrí avanza cuadro a cuadro sincronizado con el
 * scroll. La sección mide ~350vh y el canvas va sticky top-0, de modo que el
 * recorrido de scroll dentro del hero controla por completo el aleteo; al
 * pasar la sección, el resto de la página fluye normalmente.
 *
 * Paleta del manual Balanz: fondo Verde Bosque #1F2E25, texto Marfil,
 * CTA Dorado Colibrí en outline. Tipografía EB Garamond (font-garamond).
 */

const FRAME_COUNT = 12;
const BOSQUE = "#1F2E25";
const frameSrc = (i: number) => `/balanz/frame-${i}.png`;

const EASE_SOFT = [0.25, 0.1, 0.25, 1] as const;
const HEADLINE = "Equilibrio que avanza";

export function HummingbirdHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Progreso de scroll de la sección: 0 cuando su borde superior toca el tope
  // del viewport, 1 cuando su borde inferior lo abandona.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // La copa de texto se desvanece en el último tramo para un relevo limpio
  // hacia la siguiente sección (sin corte brusco al soltar el sticky).
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0]);
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Dibuja un frame en el canvas con encuadre "cover" (centrado, sin deformar).
  const render = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = BOSQUE;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let dw: number;
    let dh: number;
    let dx: number;
    let dy: number;
    if (imgRatio > canvasRatio) {
      dh = ch;
      dw = ch * imgRatio;
      dx = (cw - dw) / 2;
      dy = 0;
    } else {
      dw = cw;
      dh = cw / imgRatio;
      dx = 0;
      dy = (ch - dh) / 2;
    }
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  // Precarga de los 12 frames + primer render en cuanto llega el frame 0.
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i += 1) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        if (i === currentFrameRef.current) render(currentFrameRef.current);
      };
      img.onerror = () => {
        console.error(
          `[HummingbirdHero] no se pudo cargar el frame ${i}: ${frameSrc(i)}`
        );
      };
      images[i] = img;
    }
    imagesRef.current = images;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dimensiona el canvas al viewport (con devicePixelRatio) y redibuja.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      render(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll → índice de frame. Coalesce con rAF para no redibujar de más.
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const clamped = Math.min(1, Math.max(0, value));
    const index = Math.round(clamped * (FRAME_COUNT - 1));
    if (index === currentFrameRef.current) return;
    currentFrameRef.current = index;
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        render(currentFrameRef.current);
      });
    }
  });

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-bosque"
      style={{ height: "350vh" }}
    >
      {/* Lienzo fijo: ocupa el viewport mientras se recorre la sección alta. */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ backgroundColor: BOSQUE }}
          aria-hidden="true"
        />

        {/* Escrim direccional: legibilidad abajo-izquierda sin apagar la imagen. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bosque via-bosque/25 to-bosque/10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bosque/70 via-transparent to-transparent" />

        {/* Copy del hero, anclado al viewport sticky. */}
        <motion.div
          style={{ opacity: overlayOpacity, y: overlayY }}
          className="absolute inset-x-0 bottom-0 z-10"
        >
          <div className="mx-auto w-full max-w-6xl px-6 pb-24">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE_SOFT }}
              className="mb-6 font-garamond text-sm uppercase tracking-[0.4em] text-colibri"
            >
              Consultoría ambiental · Minería
            </motion.p>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.3 },
                },
              }}
              className="max-w-3xl font-garamond text-6xl font-medium leading-[1.05] text-marfil md:text-8xl"
              aria-label={HEADLINE}
            >
              {HEADLINE.split(" ").map((word, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-bottom"
                >
                  <motion.span
                    variants={{
                      hidden: { opacity: 0, y: "0.4em" },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.8, ease: EASE_SOFT },
                      },
                    }}
                    className="inline-block"
                    style={{ marginRight: "0.28em" }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: EASE_SOFT }}
              className="mt-8 max-w-xl font-garamond text-xl italic leading-relaxed text-marfil/85 md:text-2xl"
            >
              Asesoría ambiental experta para el sector minero
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.95, ease: EASE_SOFT }}
              className="mt-10"
            >
              <a
                href="#contacto"
                className="inline-block rounded-sm border border-colibri px-8 py-3.5 font-garamond text-lg text-colibri transition-colors duration-300 hover:bg-colibri hover:text-bosque"
              >
                Conversemos
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Indicador de scroll: se desvanece apenas empieza el recorrido. */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-marfil/60"
        >
          <span className="font-garamond text-xs uppercase tracking-[0.3em]">
            Desliza para explorar
          </span>
          <span className="h-8 w-px bg-marfil/40" />
        </motion.div>
      </div>
    </section>
  );
}
