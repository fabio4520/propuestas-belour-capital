/**
 * Datos MOCK de Velour Capital.
 * Centralizados aquí para que el contenido sea fácil de revisar/editar
 * (en producción vendrían del CMS — Payload).
 */

export const COVERAGE = [
  "Argentina",
  "Colombia",
  "Chile",
  "Perú",
  "Houston, USA",
];

export const STATS = [
  { value: "US$ 480M+", label: "Capital gestionado" },
  { value: "24", label: "Operaciones cerradas" },
  { value: "5", label: "Mercados activos" },
  { value: "18%", label: "TIR objetivo promedio" },
];

export const SECTORS = [
  {
    id: "mineria",
    icon: "Pickaxe",
    title: "Minería",
    description:
      "Capital para exploración y desarrollo de proyectos de cobre, oro y polimetálicos en etapas de alto potencial.",
  },
  {
    id: "inmobiliario",
    icon: "Building2",
    title: "Inmobiliario",
    description:
      "Inversiones en activos residenciales y comerciales de alto estándar, con foco en plusvalía y flujo estable.",
  },
  {
    id: "energia",
    icon: "Zap",
    title: "Energía",
    description:
      "Posicionamiento en infraestructura y transición energética para mercados estratégicos de LATAM.",
  },
] as const;

export const TEAM = [
  {
    name: "Lucero Polo",
    role: "Managing Partner",
    initials: "LP",
  },
  {
    name: "Eduardo Lanao",
    role: "Partner · Inversiones",
    initials: "EL",
  },
  {
    name: "Marco Antúnez",
    role: "Director de Minería",
    initials: "MA",
  },
  {
    name: "Valentina Ríos",
    role: "Head de Real Estate",
    initials: "VR",
  },
];

export const CONTACT_INFO = {
  email: "inversiones@velourcapital.com",
  phone: "+51 961 032 467",
  offices: ["Lima · Perú", "Houston · USA"],
};

export const LEGAL_LINKS = [
  { label: "Aviso Legal", href: "#" },
  { label: "Política de Privacidad", href: "#" },
  { label: "Términos de Uso", href: "#" },
];
