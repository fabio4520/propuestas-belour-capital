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
import { ValueProposition } from "./sections/value-proposition";
import { Services } from "./sections/services";
import { Evaluation } from "./sections/evaluation";
import { Sectors } from "./sections/sectors";
import { Faq } from "./sections/faq";
import { Contact } from "./sections/contact";
import { Legal } from "./sections/legal";

/**
 * Raíz cliente del sitio Belour Capital.
 * i18n scopeado + scroll suave (Lenis) + cursor de marca + preloader.
 * MotionConfig reducedMotion="user" degrada toda animación a fades cuando el
 * usuario prefiere movimiento reducido, sin tocar cada componente individual.
 *
 * El orden sigue la estructura del Brochure Belour Capital 2026:
 * quiénes somos → propuesta de valor → servicios/cómo trabajamos →
 * enfoque de evaluación → sectores → preguntas frecuentes → contacto →
 * banda legal → footer.
 */
export function BelourApp() {
  return (
    <MotionConfig reducedMotion="user">
      <LocaleProvider>
        <Preloader />
        <SmoothScroll />
        <CustomCursor />
        <ReadingProgress />
        <div className="relative min-h-screen bg-belour-noir font-sans text-belour-white antialiased">
          <Header />
          <main>
            <Hero />
            <Introduction />
            <ValueProposition />
            <Services />
            <Evaluation />
            <Sectors />
            <Faq />
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
