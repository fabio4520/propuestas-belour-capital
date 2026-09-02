import type { Metadata } from "next";
import { Josefin_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

/*
 * Tipografías del Manual de Marca Belour 2026:
 * — Josefin Sans (primaria): titulares, UI y cuerpo.
 * — Cormorant Garamond (secundaria): acentos editoriales e itálicas.
 *
 * Cada @font-face declarado aquí viaja en el CSS raíz, que bloquea el render.
 * Los pesos son los que realmente aparecen en el marcado: 300 (font-light),
 * 400 y 500 (font-medium). No hay un solo font-semibold/bold en el proyecto,
 * y cada peso extra es un archivo woff2 más por subrango unicode.
 */
const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  display: "swap",
  weight: ["300", "400", "500"],
});

/* font-light (300) sobre Cormorant resuelve al 400 más cercano: declararlo
   no cambiaría nada visualmente y sí añadiría archivos woff2. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://belourcapital.com"),
  title: "Belour Capital — Your Strategic Partner for Business Development",
  description:
    "Firma boutique especializada en estructuración de capital e inversión privada. Financiamiento con garantía, estructuración de capital y asesoría estratégica para empresas y proyectos.",
  openGraph: {
    title: "Belour Capital",
    description:
      "Your Strategic Partner for Business Development. Financiamiento con garantía, estructuración de capital y asesoría estratégica.",
    url: "https://belourcapital.com",
    siteName: "Belour Capital",
    locale: "es_PE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${josefin.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
