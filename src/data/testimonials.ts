export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  region: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Balanz nos acompañó en la obtención del EIA en tiempo récord, con un nivel técnico que nos dio confianza ante SENACE desde la primera presentación.",
    name: "Carlos Mendoza",
    role: "Gerente de Operaciones",
    company: "Compañía Minera Andina S.A.",
    region: "Cajamarca",
  },
  {
    quote:
      "La gestión de permisos ANA fue impecable. Su equipo conoce el proceso desde adentro y eso marca la diferencia cuando cada semana cuenta.",
    name: "Patricia Quispe",
    role: "Directora de Sostenibilidad",
    company: "Minera Sur Perú",
    region: "Arequipa",
  },
  {
    quote:
      "El modelamiento de dispersión que entregaron superó las exigencias de OEFA. Rigurosos, rápidos y con criterio técnico sólido.",
    name: "Ing. Roberto Flores",
    role: "Jefe de Medio Ambiente",
    company: "Exploraciones del Norte SAC",
    region: "Ancash",
  },
];
