"use client";

import { MotionConfig } from "framer-motion";
import { LocaleProvider } from "./providers/locale-provider";
import { SmoothScroll } from "./providers/smooth-scroll";
import { Preloader } from "./ui/preloader";
import { CustomCursor } from "./ui/custom-cursor";
import { ReadingProgress } from "./ui/reading-progress";
import { ScrollToTop } from "./ui/scroll-to-top";
import { Header } from "./layout/header";
import { Footer } from "./layout/footer";
import { Hero } from "./sections/hero";
import { Introduction } from "./sections/introduction";
import { Manifesto } from "./sections/manifesto";
import { Sectors } from "./sections/sectors";
import { Strategy } from "./sections/strategy";
import { Services } from "./sections/services";
import { TrackRecord } from "./sections/track-record";
import { Leadership } from "./sections/leadership";
import { Geography } from "./sections/geography";
import { Investors } from "./sections/investors";
import { Faq } from "./sections/faq";
import { Contact } from "./sections/contact";
import { News } from "./sections/news";
import { Legal } from "./sections/legal";

/**
 * Raíz cliente de la Propuesta 3 — Velour Capital · "Obsidiana".
 * i18n scopeado + scroll suave (Lenis) + cursor de marca + preloader.
 * MotionConfig reducedMotion="user" degrada toda animación a fades cuando el
 * usuario prefiere movimiento reducido, sin tocar cada componente individual.
 * Orden institucional: introducción → manifiesto → sectores → estrategia →
 * servicios/protocolo → track record → equipo → alcance → inversionistas →
 * cómo invertir (FAQ) → prensa → contacto → banda legal → footer.
 */
export function Propuesta3App() {
  return (
    <MotionConfig reducedMotion="user">
      <LocaleProvider>
        <Preloader />
        <SmoothScroll />
        <CustomCursor />
        <ReadingProgress />
        <div className="relative min-h-screen bg-velour-black font-sans text-velour-white antialiased">
          <Header />
          <main>
            <Hero />
            <Introduction />
            <Manifesto />
            <Sectors />
            <Strategy />
            <Services />
            <TrackRecord />
            <Leadership />
            <Geography />
            <Investors />
            <Faq />
            <News />
            <Contact />
            <Legal />
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </LocaleProvider>
    </MotionConfig>
  );
}
