import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * Índice de propuestas — punto de entrada del repositorio.
 * Esta copia está dedicada a Belour Capital: solo contiene las rutas que
 * realmente existen aquí. Las propuestas de Balance/Balanz viven en el repo
 * original y se retiraron del índice para no dejar enlaces a 404.
 */

const empresas = [
  {
    id: "01",
    company: "Belour Capital",
    rubro: "Fondo de inversión privado",
    propuestas: [
      {
        label: "Propuesta 3",
        style: "Obsidiana · institucional dark-luxury · ES/EN",
        href: "/velour-capital/propuesta-3",
      },
      {
        label: "Propuesta 2",
        style: "Cinematográfica · editorial · ES/EN (Strategic Capital for Real Assets)",
        href: "/velour-capital/propuesta-2",
      },
    ],
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink-900 text-foreground grain">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-radial-gold" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-24">
        <span className="text-xs uppercase tracking-widest text-gold">
          Lucero Polo · Eduardo Lanao
        </span>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-white sm:text-6xl">
          Propuestas de <span className="text-gold-sheen italic">diseño</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
          Landing pages corporativas con datos de demostración, listas para
          presentar. Selecciona una propuesta para verla en vivo.
        </p>

        <div className="mt-14 space-y-10">
          {empresas.map((empresa) => (
            <section key={empresa.id}>
              <div className="mb-4 flex items-baseline gap-4">
                <span className="font-serif text-2xl text-gold/70">
                  {empresa.id}
                </span>
                <div>
                  <h2 className="font-serif text-xl text-white">
                    {empresa.company}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {empresa.rubro}
                  </p>
                </div>
              </div>

              <div className="space-y-px overflow-hidden rounded-lg border border-border">
                {empresa.propuestas.map((p) => (
                  <Link key={p.href} href={p.href} className="block">
                    <div className="group flex cursor-pointer items-center justify-between gap-6 bg-ink-800 px-6 py-5 transition-colors hover:bg-ink-700 sm:px-8">
                      <div>
                        <h3 className="text-base text-white">{p.label}</h3>
                        <p className="mt-1 text-xs uppercase tracking-wider text-gold/60">
                          {p.style}
                        </p>
                      </div>
                      <ArrowUpRight className="h-6 w-6 shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-12 text-xs text-muted-foreground/60">
          Datos mock · sin backend · © {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}
