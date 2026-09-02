import { BelourApp } from "../components/propuesta-3/belour-app";

/**
 * Sitio oficial de Belour Capital — una sola ruta.
 * El title/description/OG globales viven en el layout raíz; aquí no se
 * sobreescribe metadata para no duplicar la fuente de verdad.
 */
export default function Home() {
  return <BelourApp />;
}
