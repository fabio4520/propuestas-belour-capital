"use client";

import { useTranslations } from "next-intl";
import { FOOTER_LINKS, SOCIAL_LINKS } from "../lib/constants";
import { LanguageSwitcher } from "../ui/language-switcher";
import { GoldLine } from "../ui/gold-line";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();
  const legal = t.raw("footer.legal") as string[];

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-belour-noir">
      <div className="mx-auto max-w-[1400px] px-6 pt-16 lg:px-10">
        {/* Masthead editorial. "Belour Capital" son 14 caracteres: a 13vw se
            desbordaba del contenedor en móvil (px-6 se come 48 px del ancho) y
            la palabra quedaba cortada. El tamaño se calcula ahora sobre el
            ancho útil y se limita para que la línea entre completa. */}
        <p className="font-sans text-[min(11vw,3.5rem)] font-light leading-none tracking-tight text-belour-white/[0.06] sm:text-[9vw] lg:text-[6.5vw]">
          Belour Capital
        </p>

        <div className="-mt-6 grid gap-12 pb-16 sm:-mt-10 lg:-mt-16 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-20">
          {/* Marca */}
          <div className="max-w-sm">
            <div className="flex items-baseline gap-2">
              <span className="font-sans text-2xl font-light tracking-[0.12em] text-belour-white">
                BELOUR
              </span>
              <span className="font-cormorant text-2xl italic text-belour-perla">
                Capital
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-belour-piedra">
              {t("footer.description")}
            </p>
            <div className="mt-6">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Explorar */}
          <nav className="flex flex-col gap-3">
            <span className="mb-1 text-xs uppercase tracking-[0.25em] text-belour-perla/70">
              {t("footer.columns.explore")}
            </span>
            {FOOTER_LINKS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-sm text-belour-piedra transition-colors hover:text-belour-white"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </nav>

          {/* Legal + social */}
          <nav className="flex flex-col gap-3">
            <span className="mb-1 text-xs uppercase tracking-[0.25em] text-belour-perla/70">
              {t("footer.columns.legal")}
            </span>
            {legal.map((l) => (
              <a
                key={l}
                href="#legal"
                className="text-sm text-belour-piedra transition-colors hover:text-belour-white"
              >
                {l}
              </a>
            ))}
            <div className="mt-2 flex gap-4">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="text-xs uppercase tracking-wider text-belour-piedra transition-colors hover:text-belour-perla"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </nav>
        </div>

        <GoldLine />

        <div className="flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center">
          <p className="text-xs text-belour-piedra/70">
            © {year} {t("footer.rights")}
          </p>
          <p className="text-xs text-belour-piedra/50">{t("footer.demo")}</p>
        </div>
      </div>
    </footer>
  );
}
