import type { Metadata } from "next";
import {
  Playfair_Display,
  Inter,
  Sora,
  Cormorant_Garamond,
  Manrope,
  EB_Garamond,
} from "next/font/google";
import "./globals.css";

/*
 * Tipografías compartidas por todas las propuestas (cargadas como CSS vars):
 *   Velour Capital · P1   → Playfair Display (serif) + Inter (sans)
 *   Balance Consulting    → Sora (display sans) + Inter (sans)
 *   Velour Capital · P2   → Cormorant Garamond (editorial serif) + Manrope (sans)
 *   Balanz Consulting     → EB Garamond (tipografía única del manual de marca)
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Propuestas — Lucero Polo & Eduardo Lanao",
  description:
    "Propuestas de diseño de landing pages corporativas. Datos de demostración.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${sora.variable} ${inter.variable} ${cormorant.variable} ${manrope.variable} ${ebGaramond.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
