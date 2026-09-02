import type { Config } from "tailwindcss";

/**
 * Tailwind CSS v3 — sistema de diseño de Belour Capital.
 *
 * Paleta oficial del Manual de Marca Belour 2026: monocromática y atemporal.
 * El negro y el blanco definen la marca; los grises y el hueso aportan matiz
 * y calidez sin romper la sobriedad. El acento (perla/hueso) ocupa el rol que
 * antes tenía el dorado: detalle escaso —eyebrows, hairlines, cursor, hover—
 * nunca fondos grandes.
 *
 * SUPERFICIES (surface/ink/brand/rule): la paleta de arriba son pigmentos
 * fijos; estos son roles. Cada sección declara su superficie con una clase
 * `.surface-*` (ver globals.css) y todo lo que hay dentro —texto, hairlines,
 * bordes, acentos— se resuelve solo, sea la sección noir o papel. Por eso los
 * componentes usan `text-ink` / `border-rule/10` y no `text-belour-white` /
 * `border-white/8`: una misma card es legible sobre negro y sobre hueso.
 * Formato `rgb(var(--x) / <alpha-value>)` para conservar el modificador de
 * opacidad de Tailwind (`text-ink/80`).
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Paleta oficial Belour (Manual de Marca 2026)
        belour: {
          noir: "#0A0A0A", // NOIR — fondo principal de marca
          coal: "#111111", // variación de superficie sobre noir
          line: "#FFFFFF14", // hairlines sobre fondo oscuro
          white: "#FFFFFF", // BLANCO
          piedra: "#8A8880", // GRIS PIEDRA — texto secundario
          perla: "#E6E3DC", // GRIS PERLA — acento principal
          hueso: "#F4F2ED", // GRIS PERLA claro / hueso — acento alto
        },

        // Roles de superficie — resueltos por la clase `.surface-*` de la sección
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          raised: "rgb(var(--surface-raised) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          muted: "rgb(var(--ink-muted) / <alpha-value>)",
        },
        brand: {
          DEFAULT: "rgb(var(--brand) / <alpha-value>)",
          on: "rgb(var(--brand-on) / <alpha-value>)",
        },
        rule: "rgb(var(--rule) / <alpha-value>)",

        // tokens shadcn/ui (mapeados a variables CSS en globals.css)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      fontFamily: {
        // Manual de marca: Josefin Sans (primaria) + Cormorant Garamond (secundaria)
        sans: ["var(--font-josefin)", "system-ui", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      letterSpacing: {
        widest: "0.25em",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
