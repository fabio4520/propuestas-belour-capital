import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import "./globals.css";

/*
 * Tipografías del tronco común — solo las que necesita Belour Capital (P3),
 * que es la propuesta de este repositorio, más el índice.
 *
 * Cada @font-face que se declara aquí viaja en el CSS raíz, que bloquea el
 * render de TODA ruta. Por eso las familias exclusivas de otra propuesta se
 * declaran en el layout de su propio segmento (ver
 * app/velour-capital/propuesta-2/layout.tsx) y no aquí.
 *
 * Los pesos son los que realmente aparecen en el marcado: 300 (font-light),
 * 400 y 500 (font-medium). No hay un solo font-semibold/bold en el proyecto,
 * y cada peso extra es un archivo woff2 más por subrango unicode.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500"],
});

/* EB Garamond arranca en 400: font-light sobre esta familia ya resolvía a 400,
   declararlo no cambiaría nada visualmente y sí añadiría archivos. */
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
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
    <html lang="es" className={`${inter.variable} ${ebGaramond.variable}`}>
      <body>{children}</body>
    </html>
  );
}
