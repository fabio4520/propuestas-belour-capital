# Propuestas — Lucero Polo & Eduardo Lanao

Repositorio de **propuestas de landing pages corporativas** con datos de
demostración (mock), listas para presentar a cliente. El repo está organizado
**por empresa**, y cada empresa puede tener una o más propuestas, cada una en su
propia ruta dentro de una única app Next.js.

| Empresa | Ruta | Estilo | Estado |
|---------|------|--------|--------|
| **Velour Capital** — fondo de inversión privado | [`/velour-capital/propuesta-1`](http://localhost:3000/velour-capital/propuesta-1) | Premium · institucional · oscuro (ref. Integra Capital) | ✅ Lista |
| **Velour Capital** — fondo de inversión privado | [`/velour-capital/propuesta-2`](http://localhost:3000/velour-capital/propuesta-2) | Cinematográfica · editorial · **multiidioma ES/EN** | ✅ Lista |
| **Balance Consulting** — consultoría ambiental minera | [`/balance-consulting/propuesta-1`](http://localhost:3000/balance-consulting/propuesta-1) | Corporativo · limpio · claro (ref. Phoenix Capital) | ✅ Lista |
| **Balance Consulting** — consultoría ambiental minera | [`/balance-consulting/propuesta-2`](http://localhost:3000/balance-consulting/propuesta-2) | Premium · técnica · cinematográfica · **multiidioma ES/EN** (Environmental Intelligence) | ✅ Lista |

La ruta raíz (`/`) es un índice que enlaza a todas las propuestas.

---

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v3** (no v4)
- **Framer Motion** — animaciones suaves
- **next-intl** — multiidioma ES/EN (usado en Velour · Propuesta 2)
- **shadcn/ui** — componentes base (Button, Input, Textarea, Label)
- **lucide-react** — iconografía SVG

---

## Requisitos

- **Node.js 18.18+** (recomendado 20 LTS)
- npm (o pnpm / yarn)

---

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre **http://localhost:3000** → verás el índice de propuestas.

- Velour Capital · P1 → **/velour-capital/propuesta-1**
- Velour Capital · P2 → **/velour-capital/propuesta-2** (ES/EN)
- Balance Consulting · P1 → **/balance-consulting/propuesta-1**
- Balance Consulting · P2 → **/balance-consulting/propuesta-2** (ES/EN)

### Scripts

| Comando | Acción |
|---------|--------|
| `npm run dev` | Servidor de desarrollo (hot reload) |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | Linting |

---

## Estructura

```
propuestas/
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Layout raíz: fuentes + metadata
│   │   ├── globals.css              # Tokens base (Velour) + .theme-balance (claro)
│   │   ├── page.tsx                 # Índice de propuestas
│   │   ├── velour-capital/
│   │   │   ├── propuesta-1/page.tsx
│   │   │   └── propuesta-2/page.tsx
│   │   └── balance-consulting/
│   │       └── propuesta-1/page.tsx
│   ├── components/
│   │   ├── velour-capital/
│   │   │   ├── propuesta-1/                # Secciones Velour P1
│   │   │   └── propuesta-2/                # Velour P2 (cinematográfica)
│   │   │       ├── messages/{es,en}.json   # 👈 Textos i18n (next-intl)
│   │   │       ├── providers/              # LocaleProvider (scopeado)
│   │   │       ├── motion/                 # variants.ts · transitions.ts
│   │   │       ├── lib/constants.ts        # nodos, íconos, links
│   │   │       ├── ui · layout · sections · three/investment-orb.tsx
│   │   ├── balance-consulting/propuesta-1/ # Secciones Balance
│   │   │   ├── data.ts              # 👈 Contenido MOCK editable
│   │   │   ├── navbar · hero · services · about · team · contact · footer
│   │   │   ├── logo.tsx · reveal.tsx
│   │   └── ui/                      # Componentes base (shadcn/ui) — compartidos
│   └── lib/utils.ts                 # cn() — merge de clases Tailwind
├── tailwind.config.ts               # Paletas (ink/gold + forest/clay/sand) + fuentes
└── next.config.mjs
```

> **¿Editar textos?** El contenido de cada propuesta está centralizado en su
> `data.ts` (`src/components/<empresa>/propuesta-1/data.ts`).

---

## Diseño

### Velour Capital — premium / oscuro

- **Paleta:** negro `#1a1a1a`, dorado `#d4af37`, blanco.
- **Tipografía:** Playfair Display (serif) + Inter.
- **Vibe:** exclusividad, capital privado, sofisticación.
- **Secciones:** Hero · Sectores · Equipo · Contacto · Footer.

### Velour Capital · Propuesta 2 — cinematográfica / editorial (ES/EN)

- **Concepto:** *Strategic Capital for Real Assets*.
- **Paleta:** obsidian/graphite, champagne gold (poco amarillo), mineral copper,
  warm white, stone, deep navy, glass.
- **Tipografía:** Cormorant Garamond (editorial serif) + Manrope (sans moderna).
- **Secciones:** Hero (orbe + ticker + trust pills) · Investment Thesis ·
  Asset Classes · Geographic Intelligence (mapa de nodos) · Deal Process
  (timeline con progreso) · Market Lens · Leadership · Contact · Footer.
- **Investment Orb:** alternativa premium en **SVG/CSS** (anillos orbitales,
  nodos pulsantes, glow, parallax al mouse) en lugar de React Three Fiber, para
  garantizar performance y build limpio. Aislado en `three/investment-orb.tsx`
  por si se desea migrar a una escena R3F real más adelante.
- **Multiidioma (next-intl):** i18n **scopeado a esta propuesta** mediante
  `NextIntlClientProvider` + estado de idioma en cliente (sin middleware ni
  routing por locale), para no interferir con el resto del repo. Selector ES/EN
  en el header y el footer. Textos en `messages/{es,en}.json`.
- **Motion system reutilizable:** `motion/variants.ts` y `motion/transitions.ts`.

### Balance Consulting — corporativo / claro

- **Paleta:** verde bosque `#1f4d3a`, tierra/clay `#b08454`, blanco/arena, gris.
- **Tipografía:** Sora (display sans) + Inter.
- **Vibe:** confianza, expertise técnico, sostenibilidad, minería responsable.
- **Secciones:** Hero · Servicios · **Nosotros** (sección extra) · Equipo ·
  Contacto · Footer.
- El tema claro se aplica vía la clase **`.theme-balance`**, que redefine los
  tokens de shadcn/ui para que Button/Input/Textarea adopten la paleta verde.

### Balance Consulting · Propuesta 2 — Environmental Intelligence (ES/EN)

- **Concepto:** *Environmental Intelligence for Responsible Mining*.
- **Paleta:** deep forest/pino + grafito mineral (base oscura cinematográfica),
  con **moss green** y **copper earth** como acentos y **water blue** muy sutil
  para gestión hídrica; secciones claras en **warm sand / bone** para ritmo
  editorial. (`pine`, `moss`, `ore`, `aqua`, `bone`, `ash` en `tailwind.config.ts`).
- **Tipografía:** Sora (display técnico) + Cormorant Garamond (titulares editoriales).
- **Secciones:** Hero (Terrain Orb + ticker + trust pills) · Environmental
  Expertise · Core Services · Methodology (timeline con línea que se dibuja al
  scroll) · Responsible Mining (editorial + parallax) · Monitoring Intelligence
  (paneles glass con count-up e índices) · Regulatory Confidence (documento +
  sello "audit ready") · Leadership · Contact · Footer.
- **Environmental Intelligence Layer:** capa topográfica propia — curvas de nivel
  orgánicas generadas matemáticamente (deterministas → sin hydration mismatch),
  con deriva lenta. Reutilizable en `visuals/topographic-overlay.tsx`.
- **Terrain Orb** (`visuals/terrain-orb.tsx`): domo topográfico + nodos de
  monitoreo pulsantes + líneas de flujo de agua animadas + parallax al mouse, en
  **SVG/CSS** (alternativa premium a R3F, sin bundle 3D).
- **Monitoring Grid** (`visuals/monitoring-grid.tsx`): paneles glass con count-up,
  micro-sparklines SVG y barras de índice de cumplimiento. Datos **mock** listos
  para CMS (en `lib/constants.ts`).
- **Multiidioma (next-intl):** i18n **scopeado a esta propuesta** (cliente, sin
  middleware). Textos en `messages/{es,en}.json`. Selector ES/EN en header y footer.
- **Motion system reutilizable:** `motion/variants.ts` y `motion/transitions.ts`.

### Común a ambas

- **Animaciones (Framer Motion):** entrada del hero (fade + zoom/scale con
  stagger), fade-up en scroll (`whileInView`, una sola vez), hover en cards
  (elevación tipo spring), micro-interacciones en botones.
- **Responsive:** desktop (1200px+), tablet (768–1199px), móvil (<768px).
- **Accesibilidad:** focus visible, labels en formularios, `cursor-pointer` en
  elementos clicables, respeta `prefers-reduced-motion`.
- **Formularios de contacto sin backend:** al enviar muestran
  `alert("Gracias, pronto nos contactaremos")`.

---

## Deploy a Vercel

### Opción A — desde el dashboard (recomendada)

1. Sube el repositorio a GitHub.
2. Entra a [vercel.com/new](https://vercel.com/new) e **importa** el repo.
3. Vercel detecta Next.js automáticamente (Build: `next build`). No requiere
   variables de entorno.
4. Pulsa **Deploy**.

Las propuestas quedarán en:
`https://<tu-proyecto>.vercel.app/velour-capital/propuesta-1` y
`.../balance-consulting/propuesta-1`.

### Opción B — desde la CLI

```bash
npm i -g vercel
vercel          # primer deploy (preview)
vercel --prod   # deploy a producción
```

Cada `git push` a la rama principal dispara un nuevo deploy automático.

---

## Notas

- Proyecto de **demostración**: todos los datos (nombres, cifras, contacto) son
  ficticios.
- Pensado para crecer: nuevas propuestas se añaden como
  `src/app/<empresa>/propuesta-N/` reutilizando el mismo sistema de diseño.
