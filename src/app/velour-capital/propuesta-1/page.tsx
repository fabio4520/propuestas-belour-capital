import type { Metadata } from "next";
import { Navbar } from "@/components/velour-capital/propuesta-1/navbar";
import { Hero } from "@/components/velour-capital/propuesta-1/hero";
import { Sectors } from "@/components/velour-capital/propuesta-1/sectors";
import { Team } from "@/components/velour-capital/propuesta-1/team";
import { Contact } from "@/components/velour-capital/propuesta-1/contact";
import { Footer } from "@/components/velour-capital/propuesta-1/footer";

export const metadata: Metadata = {
  title: "Velour Capital — Capital Privado para Sectores Estratégicos",
  description:
    "Fondo de inversión privado. Inversiones mineras e inmobiliarias en LATAM. Propuesta de diseño con datos de demostración.",
};

/**
 * PROPUESTA 1 — Velour Capital
 * Estilo: premium / institucional (referencia: Integra Capital).
 * Secciones: Hero · Sectores · Equipo · Contacto · Footer.
 */
export default function Propuesta1() {
  return (
    <main className="relative min-h-screen bg-ink-900 text-foreground grain">
      <Navbar />
      <Hero />
      <Sectors />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}
