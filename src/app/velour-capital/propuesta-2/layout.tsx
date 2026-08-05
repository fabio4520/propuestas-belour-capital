import { Cormorant_Garamond, Manrope } from "next/font/google";

/*
 * Cormorant Garamond + Manrope son exclusivas de la Propuesta 2. Declararlas
 * en este layout de segmento mantiene sus @font-face fuera del CSS raíz, que
 * es el que bloquea el render de la Propuesta 3 (la propuesta viva de este
 * repositorio).
 *
 * Un layout anidado no puede escribir en <html>, así que las CSS custom
 * properties se aplican en un <div> envolvente: se heredan igual y Tailwind
 * las resuelve sin cambios.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500"],
});

export default function Propuesta2Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${cormorant.variable} ${manrope.variable}`}>{children}</div>
  );
}
