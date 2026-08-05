/**
 * Datos NO traducibles de la Propuesta 2 (coordenadas, claves de íconos, links).
 * Los textos viven en messages/{es,en}.json y se resuelven con next-intl.
 */

export const NAV_ITEMS = [
  { key: "thesis", href: "#thesis" },
  { key: "assets", href: "#assets" },
  { key: "geographic", href: "#geographic" },
  { key: "process", href: "#process" },
  { key: "market", href: "#market" },
  { key: "leadership", href: "#leadership" },
  { key: "contact", href: "#contact" },
] as const;

/* Íconos lucide por pilar de la tesis (orden = messages.thesis.pillars) */
export const THESIS_ICONS = ["Crosshair", "BrainCircuit", "TrendingUp"] as const;

/* Íconos lucide por clase de activo (orden = messages.assets.items) */
export const ASSET_ICONS = [
  "Pickaxe",
  "Building2",
  "Compass",
  "Globe2",
] as const;

/* Íconos lucide por card de mercado (orden = messages.market.cards) */
export const MARKET_ICONS = [
  "CircleDot",
  "Gem",
  "Building",
  "Network",
] as const;

/*
 * Nodos del mapa abstracto LATAM + Houston.
 * x/y son porcentajes sobre el lienzo del mapa (no un mapa real, es editorial).
 */
export type MapNode = {
  id: string;
  x: number;
  y: number;
  primary?: boolean;
};

export const MAP_NODES: MapNode[] = [
  { id: "houston", x: 30, y: 16, primary: true },
  { id: "colombia", x: 45, y: 47 },
  { id: "peru", x: 39, y: 63 },
  { id: "chile", x: 45, y: 83 },
  { id: "argentina", x: 56, y: 85 },
];

/* Conexiones entre nodos (ids) */
export const MAP_EDGES: [string, string][] = [
  ["houston", "colombia"],
  ["colombia", "peru"],
  ["peru", "chile"],
  ["peru", "argentina"],
  ["chile", "argentina"],
  ["houston", "peru"],
];

export const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "#" },
  { name: "X", href: "#" },
  { name: "Instagram", href: "#" },
];
