"use client";

import { useEffect, useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import { testimonials, type Testimonial } from "@/data/testimonials";

const SWIPE_THRESHOLD = 60;

type StackSlot = "previous" | "active" | "next" | "hidden";

function getSlot(index: number, activeIndex: number, total: number): StackSlot {
  if (index === activeIndex) return "active";
  if (index === (activeIndex - 1 + total) % total) return "previous";
  if (index === (activeIndex + 1) % total) return "next";
  return "hidden";
}

function getZIndex(slot: StackSlot) {
  if (slot === "active") return 30;
  if (slot === "previous" || slot === "next") return 20;
  return 0;
}

function useDesktopStack() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export function TestimonialStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isDesktop = useDesktopStack();
  const total = testimonials.length;

  const previous = () => setActiveIndex((index) => (index - 1 + total) % total);
  const next = () => setActiveIndex((index) => (index + 1) % total);
  const goTo = (index: number) => setActiveIndex(index);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) previous();
    if (info.offset.x < -SWIPE_THRESHOLD) next();
  };

  return (
    <section className="relative overflow-hidden bg-bosque px-6 py-20 sm:py-24 md:px-12 md:py-32">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <p className="font-garamond text-[10px] uppercase tracking-[0.28em] text-colibri sm:text-xs sm:tracking-[0.35em]">
          LO QUE DICEN NUESTROS CLIENTES
        </p>
        <h2 className="mt-5 max-w-3xl font-garamond text-3xl font-medium leading-tight text-marfil sm:text-4xl md:text-5xl">
          Confianza que se construye expediente a expediente.
        </h2>

        <div className="relative mt-10 flex h-[430px] w-full items-center justify-center sm:mt-12 md:mt-16 md:h-[390px]">
          <button
            type="button"
            aria-label="Testimonio anterior"
            onClick={previous}
            className="absolute bottom-[-56px] left-1/2 z-40 flex h-12 w-12 -translate-x-[calc(100%+10px)] items-center justify-center font-garamond text-4xl text-marfil/50 transition-colors hover:text-colibri hover:opacity-100 md:bottom-auto md:left-0 md:top-1/2 md:-translate-x-0 md:-translate-y-1/2"
          >
            ←
          </button>

          <div className="relative h-full w-full max-w-3xl">
            {testimonials.map((testimonial, index) => {
              const slot = getSlot(index, activeIndex, total);
              return (
                <StackCard
                  key={testimonial.name}
                  testimonial={testimonial}
                  slot={slot}
                  zIndex={getZIndex(slot)}
                  isDesktop={isDesktop}
                  onClick={() => goTo(index)}
                  onDragEnd={handleDragEnd}
                />
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Siguiente testimonio"
            onClick={next}
            className="absolute bottom-[-56px] left-1/2 z-40 flex h-12 w-12 translate-x-[10px] items-center justify-center font-garamond text-4xl text-marfil/50 transition-colors hover:text-colibri hover:opacity-100 md:bottom-auto md:left-auto md:right-0 md:top-1/2 md:translate-x-0 md:-translate-y-1/2"
          >
            →
          </button>
        </div>

        <div className="mt-20 flex items-center gap-3 md:mt-8" aria-label="Selector de testimonios">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              aria-label={`Ver testimonio ${index + 1}`}
              onClick={() => goTo(index)}
              className={`h-3 w-3 rounded-full transition-colors sm:h-2 sm:w-2 ${
                index === activeIndex ? "bg-colibri" : "bg-salvia/40 hover:bg-colibri/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackCard({
  testimonial,
  slot,
  zIndex,
  isDesktop,
  onClick,
  onDragEnd,
}: {
  testimonial: Testimonial;
  slot: StackSlot;
  zIndex: number;
  isDesktop: boolean;
  onClick: () => void;
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}) {
  const isActive = slot === "active";
  const variants = isDesktop
    ? {
        active: { x: 0, y: "-50%", rotate: 0, scale: 1, opacity: 1 },
        previous: { x: "-34%", y: "calc(-50% + 18px)", rotate: -15, scale: 0.85, opacity: 0.4 },
        next: { x: "34%", y: "calc(-50% + 18px)", rotate: 15, scale: 0.85, opacity: 0.4 },
        hidden: { x: 0, y: "calc(-50% + 38px)", rotate: 0, scale: 0.78, opacity: 0 },
      }
    : {
        active: { x: 0, y: "-50%", rotate: 0, scale: 1, opacity: 1 },
        previous: { x: "-8%", y: "-50%", rotate: 0, scale: 0.98, opacity: 0 },
        next: { x: "8%", y: "-50%", rotate: 0, scale: 0.98, opacity: 0 },
        hidden: { x: 0, y: "-50%", rotate: 0, scale: 0.98, opacity: 0 },
      };

  return (
    <motion.article
      animate={slot}
      variants={variants}
      initial={false}
      transition={{ type: "spring", stiffness: 170, damping: 24 }}
      drag={isActive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.16}
      onDragEnd={onDragEnd}
      onClick={onClick}
      style={{ zIndex, pointerEvents: isActive ? "auto" : "none" }}
      className="absolute inset-x-0 top-1/2 mx-auto flex min-h-[390px] w-[min(92vw,680px)] cursor-pointer flex-col justify-center rounded-[4px] border border-[rgba(196,161,90,0.2)] bg-[rgba(244,241,233,0.05)] px-6 py-8 text-left shadow-2xl shadow-black/15 backdrop-blur-sm sm:px-8 sm:py-10 md:min-h-[350px] md:px-12"
      aria-hidden={!isActive}
    >
      <span
        aria-hidden
        className="absolute left-5 top-3 font-garamond text-[64px] leading-none text-colibri/30 sm:left-7 sm:text-[80px]"
      >
        &ldquo;
      </span>
      <p className="relative z-10 mt-8 font-garamond text-base leading-[1.65] text-marfil sm:text-lg sm:leading-[1.7]">
        {testimonial.quote}
      </p>
      <span className="relative z-10 my-5 h-px w-8 bg-colibri sm:my-6" />
      <p className="relative z-10 font-garamond text-[15px] font-semibold text-marfil">
        {testimonial.name}
      </p>
      <p className="relative z-10 mt-1 font-garamond text-[13px] text-salvia">
        {testimonial.role} · {testimonial.company}
      </p>
      <p className="relative z-10 mt-2 font-garamond text-xs italic text-colibri/70">
        {testimonial.region}
      </p>
    </motion.article>
  );
}
