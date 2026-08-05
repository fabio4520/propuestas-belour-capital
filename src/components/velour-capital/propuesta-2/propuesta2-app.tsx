"use client";

import { LocaleProvider } from "./providers/locale-provider";
import { SmoothScroll } from "./providers/smooth-scroll";
import { Preloader } from "./ui/preloader";
import { CustomCursor } from "./ui/custom-cursor";
import { ReadingProgress } from "./ui/reading-progress";
import { ScrollToTop } from "./ui/scroll-to-top";
import { Header } from "./layout/header";
import { Footer } from "./layout/footer";
import { Hero } from "./sections/hero";
import { InvestmentThesis } from "./sections/investment-thesis";
import { TrackRecord } from "./sections/track-record";
import { AssetClasses } from "./sections/asset-classes";
import { GeographicIntelligence } from "./sections/geographic-intelligence";
import { SelectedInvestments } from "./sections/selected-investments";
import { DealProcess } from "./sections/deal-process";
import { MarketLens } from "./sections/market-lens";
import { Leadership } from "./sections/leadership";
import { Contact } from "./sections/contact";

/**
 * Raíz cliente de la Propuesta 2 — Velour Capital.
 * i18n scopeado + scroll suave (Lenis) + cursor de marca + preloader.
 * Orden cinematográfico: tesis → prueba → activos → alcance → cartera → proceso.
 */
export function Propuesta2App() {
  return (
    <LocaleProvider>
      <Preloader />
      <SmoothScroll />
      <CustomCursor />
      <ReadingProgress />
      <div className="relative min-h-screen bg-obsidian font-manrope text-warmwhite antialiased">
        <Header />
        <main>
          <Hero />
          <InvestmentThesis />
          <TrackRecord />
          <AssetClasses />
          <GeographicIntelligence />
          <SelectedInvestments />
          <DealProcess />
          <MarketLens />
          <Leadership />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </LocaleProvider>
  );
}
