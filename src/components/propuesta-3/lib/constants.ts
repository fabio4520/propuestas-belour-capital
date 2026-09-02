/**
 * Datos NO traducibles de la Propuesta 3 (iconos, coordenadas, links).
 * Los textos viven en messages/{es,en}.json y se resuelven con next-intl.
 */

/* Nav del header — curado a lo que importa a un inversionista (evita el
   overflow de 10+ items). El resto de secciones se descubren por scroll y
   desde el sitemap del footer (FOOTER_LINKS). */
export const NAV_ITEMS = [
  { key: "manifesto", href: "#manifesto" },
  { key: "strategy", href: "#strategy" },
  { key: "sectors", href: "#sectors" },
  { key: "trackRecord", href: "#track-record" },
  { key: "leadership", href: "#leadership" },
  { key: "investors", href: "#investors" },
  { key: "contact", href: "#contact" },
] as const;

/* Sitemap completo del footer — incluye las secciones fuera del nav curado. */
export const FOOTER_LINKS = [
  { key: "manifesto", href: "#manifesto" },
  { key: "strategy", href: "#strategy" },
  { key: "sectors", href: "#sectors" },
  { key: "services", href: "#services" },
  { key: "trackRecord", href: "#track-record" },
  { key: "leadership", href: "#leadership" },
  { key: "geography", href: "#geography" },
  { key: "investors", href: "#investors" },
  { key: "faq", href: "#faq" },
  { key: "news", href: "#news" },
  { key: "contact", href: "#contact" },
] as const;

/* Íconos lucide por sector estratégico (orden = messages.sectors.items) */
export const SECTOR_ICONS = ["Pickaxe", "Building2", "Route"] as const;

/* Íconos lucide por línea de servicio (orden = messages.services.items) */
export const SERVICE_ICONS = ["Layers", "LineChart", "Users", "ShieldCheck"] as const;

/* Íconos lucide por paso del Protocolo Velour (orden = messages.protocol.steps) */
export const PROTOCOL_ICONS = ["Search", "FileCheck2", "Handshake", "TrendingUp"] as const;

/*
 * Nodos del globo LATAM + Houston. lat/lng son coordenadas geográficas reales.
 */
export type MapNode = {
  id: string;
  lat: number;
  lng: number;
  primary?: boolean;
};

export const MAP_NODES: MapNode[] = [
  { id: "houston", lat: 29.7604, lng: -95.3698, primary: true },
  { id: "cdmx", lat: 19.4326, lng: -99.1332 },
  { id: "bogota", lat: 4.711, lng: -74.0721 },
  { id: "lima", lat: -12.0464, lng: -77.0428 },
  { id: "santiago", lat: -33.4489, lng: -70.6693 },
  { id: "buenosaires", lat: -34.6037, lng: -58.3816 },
];

export const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "#" },
  { name: "X", href: "#" },
];
