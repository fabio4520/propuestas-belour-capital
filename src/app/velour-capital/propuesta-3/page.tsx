import type { Metadata } from "next";
import { Propuesta3App } from "@/components/velour-capital/propuesta-3/propuesta3-app";

export const metadata: Metadata = {
  title: "Velour Capital — Propuesta 3 · Obsidiana",
  description:
    "Capital privado institucional para minería, real estate e infraestructura en LATAM y Houston. Propuesta de diseño con datos de demostración.",
  robots: { index: false, follow: false },
};

/**
 * PROPUESTA 3 — Velour Capital · "Obsidiana"
 * Estilo: registro institucional dark-luxury. Negro absoluto (#0A0A0A),
 * blanco puro, dorado casi ausente (solo detalle). Garamond editorial + sans limpia.
 * Multiidioma ES/EN (next-intl, scopeado en cliente).
 * Secciones: Hero · Manifiesto · Sectores · Servicios/Protocolo Velour
 *            · Liderazgo · Geografía · Contacto.
 */
export default function Propuesta3Page() {
  return <Propuesta3App />;
}
