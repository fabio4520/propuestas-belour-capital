import { Propuesta3App } from '../components/propuesta-3/propuesta3-app';
import type { Metadata } from "next";

/**
 * Índice de propuestas — punto de entrada del repositorio.
 * Esta copia está dedicada a Belour Capital: solo contiene las rutas que
 * realmente existen aquí. Las propuestas de Balance/Balanz viven en el repo
 * original y se retiraron del índice para no dejar enlaces a 404.
 */
export const metadata: Metadata = {
  title: "Velour Capital — Propuesta 3 · Obsidiana",
  description:
    "Capital privado institucional para minería, real estate e infraestructura en LATAM y Houston. Propuesta de diseño con datos de demostración.",
  robots: { index: false, follow: false },
};

export default function Home() {
  return <Propuesta3App />;
}
