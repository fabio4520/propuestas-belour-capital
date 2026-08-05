import type { Config } from "tailwindcss";

/**
 * Tailwind CSS v3 — sistema de diseño compartido por todas las propuestas.
 * Cada propuesta puede usar su propia escala de color vía tokens semánticos.
 *
 * Propuesta 1 — Velour Capital:
 *   ink      → negro corporativo  (#1a1a1a)
 *   gold     → dorado premium     (#d4af37)
 *   blanco   → #ffffff
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
        // Paleta Velour Capital
        ink: {
          DEFAULT: "#1a1a1a",
          950: "#0a0a0a",
          900: "#0e0e0e",
          800: "#141414",
          700: "#1f1f1f",
          600: "#2a2a2a",
        },
        gold: {
          DEFAULT: "#d4af37",
          light: "#e8c873",
          dark: "#a8862a",
          muted: "#8a7233",
        },
        // Paleta Balance Consulting (consultoría ambiental — verde/tierra)
        forest: {
          DEFAULT: "#1f4d3a",
          950: "#0f2a1f",
          900: "#14342b",
          800: "#1b4334",
          700: "#256148",
          600: "#2f7355",
          500: "#3d8a66",
          400: "#5aa982",
        },
        clay: {
          DEFAULT: "#b08454",
          light: "#c8a274",
          dark: "#8c6740",
        },
        sand: {
          DEFAULT: "#f5f2ec",
          dark: "#ebe6da",
        },
        // Paleta Velour Capital · Propuesta 2 (cinematográfica / editorial)
        obsidian: {
          DEFAULT: "#0a0b0d",
          900: "#08090b",
          800: "#0d0f12",
        },
        graphite: {
          DEFAULT: "#15171b",
          700: "#1c1f24",
          600: "#23272d",
        },
        champagne: {
          DEFAULT: "#d8c290", // dorado champagne, poco amarillo
          light: "#e8d8b0",
          dark: "#b8a273",
        },
        copper: {
          DEFAULT: "#b0764f", // mineral copper, desaturado
          light: "#c68f66",
          dark: "#8c5b3b",
        },
        warmwhite: "#f5f3ee",
        stone: {
          DEFAULT: "#9a9da6",
          dark: "#6b6e77",
        },
        navy: {
          DEFAULT: "#0f1622",
          deep: "#0b1019",
        },
        // Paleta Balance Consulting · Propuesta 2
        // (Environmental Intelligence — premium oscuro: territorio, mineral, agua)
        pine: {
          DEFAULT: "#0e2018", // deep forest green base
          950: "#06110c",
          900: "#0a1a12",
          800: "#102619",
          700: "#163322",
          600: "#1f4631",
        },
        moss: {
          DEFAULT: "#4f8f68", // moss green — acento secundario
          light: "#74b08c",
          dark: "#356b4b",
        },
        ore: {
          DEFAULT: "#b5764c", // copper earth — acento mineral
          light: "#cf9269",
          dark: "#8e5a37",
        },
        aqua: {
          DEFAULT: "#6aa0b0", // water blue — gestión hídrica (muy sutil)
          light: "#8fbecb",
          dark: "#4d7a88",
        },
        bone: {
          DEFAULT: "#f1ece1", // warm white / clean
          dark: "#e4dccb",
        },
        ash: {
          DEFAULT: "#9aa39c", // stone gray — neutrales
          dark: "#6b726b",
        },
        // Paleta Balanz Consulting · Propuesta 1
        // (Manual de marca oficial — colibrí dorado, verde bosque, marfil)
        bosque: {
          DEFAULT: "#1F2E25", // Verde Bosque — fondo principal / texto sobre marfil
          950: "#131d17",
          900: "#18251d",
          800: "#263a2e",
          700: "#2e4638",
        },
        marfil: {
          DEFAULT: "#F4F1E9", // Marfil — fondo secundario
          dark: "#EAE5D8",
        },
        salvia: {
          DEFAULT: "#A7B49E", // Salvia
          light: "#CDD5C6", // Salvia Claro
        },
        colibri: {
          DEFAULT: "#C2A15A", // Dorado Colibrí — único acento vivo
          light: "#D4B97E",
          dark: "#A08344",
        },
        // Paleta Velour Capital · Propuesta 3 ("Obsidiana")
        // Registro institucional: negro absoluto, blanco, dorado casi ausente
        // (solo detalle: eyebrows, hairlines, cursor, hover — nunca fondos).
        velour: {
          black: "#0A0A0A",
          coal: "#111111",
          line: "#FFFFFF14",
          white: "#FFFFFF",
          stone: "#A3A3A3",
          gold: "#D4AF37",
          champagne: "#E8D9A0",
        },
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
        // Playfair y Sora se retiraron con la propuesta 1: `serif` ahora
        // comparte familia con `garamond` (el índice era su último consumidor)
        // y `display` desapareció porque no tenía ni un uso en el marcado.
        serif: ["var(--font-eb-garamond)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        manrope: ["var(--font-manrope)", "system-ui", "sans-serif"],
        garamond: ["var(--font-eb-garamond)", "Georgia", "serif"],
      },
      letterSpacing: {
        widest: "0.25em",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(110deg, #a8862a 0%, #d4af37 35%, #f3e3a6 50%, #d4af37 65%, #a8862a 100%)",
        "radial-gold":
          "radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0) 70%)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-node": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.25)" },
        },
        // Balance P2 — flujo de agua sobre líneas (stroke-dash en movimiento)
        "flow-dash": {
          to: { strokeDashoffset: "-200" },
        },
        // Balance P2 — deriva muy lenta de la capa topográfica
        "contour-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(-12px,-8px,0)" },
        },
        // Balance P2 — barrido vertical del haz de monitoreo (scanline)
        scan: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0" },
          "10%, 90%": { opacity: "1" },
          "50%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        shimmer: "shimmer 6s linear infinite",
        marquee: "marquee 32s linear infinite",
        "marquee-slow": "marquee 48s linear infinite",
        "spin-slow": "spin-slow 60s linear infinite",
        "spin-slower": "spin-slow 90s linear infinite reverse",
        float: "float 7s ease-in-out infinite",
        "pulse-node": "pulse-node 3s ease-in-out infinite",
        "flow-dash": "flow-dash 3.5s linear infinite",
        "contour-drift": "contour-drift 18s ease-in-out infinite",
        scan: "scan 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
