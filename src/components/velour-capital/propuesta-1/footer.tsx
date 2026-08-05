import { LEGAL_LINKS, COVERAGE } from "./data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-ink-950">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          {/* Marca */}
          <div className="max-w-sm">
            <a href="#top" className="flex items-baseline gap-2">
              <span className="font-serif text-2xl tracking-wide text-white">
                VELOUR
              </span>
              <span className="font-serif text-2xl italic text-gold-sheen">
                Capital
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Capital privado para sectores estratégicos en LATAM y Estados
              Unidos.
            </p>
            <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground/60">
              {COVERAGE.join("  ·  ")}
            </p>
          </div>

          {/* Enlaces legales */}
          <nav className="flex flex-col gap-3">
            <span className="mb-1 text-xs uppercase tracking-widest text-gold/70">
              Legal
            </span>
            {LEGAL_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground/60">
            © {year} Velour Capital. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground/40">
            Sitio de demostración · datos ficticios
          </p>
        </div>
      </div>
    </footer>
  );
}
