import type { Metadata } from "next";
import { Propuesta2App } from "@/components/velour-capital/propuesta-2/propuesta2-app";

export const metadata: Metadata = {
  title: "Velour Capital — Strategic Capital for Real Assets",
  description:
    "Firma privada de inversión en minería, real estate y sectores estratégicos a través de LATAM y Houston. Propuesta de diseño con datos de demostración.",
};

/**
 * PROPUESTA 2 — Velour Capital
 * Estilo: cinematográfico / editorial / institucional premium.
 * Multiidioma ES/EN (next-intl, scopeado en cliente).
 * Secciones: Hero · Investment Thesis · Asset Classes · Geographic Intelligence
 *            · Deal Process · Market Lens · Leadership · Contact · Footer.
 */
export default function Propuesta2Page() {
  return <Propuesta2App />;
}
