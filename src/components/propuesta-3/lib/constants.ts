/**
 * Datos NO traducibles del sitio Belour Capital (iconos, links, contacto).
 * Los textos viven en messages/{es,en}.json y se resuelven con next-intl.
 */

/* Datos de contacto oficiales (Brochure Belour Capital 2026). */
export const CONTACT = {
  email: "contacto@belourcapital.com",
  phone: "+51 936 699 777",
  phoneHref: "tel:+51936699777",
  address: "Av. Javier Prado Oeste 1068, Oficina 603, San Isidro",
  website: "belourcapital.com",
} as const;

/* Nav del header — curado a lo esencial para no desbordar en desktop. El
   resto de secciones se descubren por scroll y desde el sitemap del footer. */
export const NAV_ITEMS = [
  { key: "about", href: "#about" },
  { key: "services", href: "#services" },
  { key: "process", href: "#process" },
  { key: "sectors", href: "#sectors" },
  { key: "faq", href: "#faq" },
] as const;

/* Sitemap completo del footer — incluye las secciones fuera del nav curado. */
export const FOOTER_LINKS = [
  { key: "about", href: "#about" },
  { key: "value", href: "#value" },
  { key: "services", href: "#services" },
  { key: "process", href: "#process" },
  { key: "evaluation", href: "#evaluation" },
  { key: "sectors", href: "#sectors" },
  { key: "faq", href: "#faq" },
  { key: "contact", href: "#contact" },
] as const;

/* Íconos lucide por pilar de "Quiénes somos" (orden = messages.introduction.pillars) */
export const PILLAR_ICONS = ["Target", "Eye", "Lightbulb"] as const;

/* Íconos lucide por línea de servicio (orden = messages.services.items) */
export const SERVICE_ICONS = ["Landmark", "Layers", "Compass"] as const;

/* Íconos lucide por paso de "Cómo trabajamos" (orden = messages.howWeWork.steps) */
export const PROCESS_ICONS = [
  "Search",
  "PencilRuler",
  "FileCheck2",
  "TrendingUp",
] as const;

/* Íconos lucide por sector (orden = messages.sectors.items) */
export const SECTOR_ICONS = [
  "Pickaxe",
  "Store",
  "Building2",
  "Factory",
  "LineChart",
] as const;
