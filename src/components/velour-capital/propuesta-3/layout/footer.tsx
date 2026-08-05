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
    <footer className="relative overflow-hidden border-t border-white/8 bg-velour-black">
      <div className="mx-auto max-w-[1400px] px-6 pt-16 lg:px-10">
        {/* Masthead editorial */}
        <p className="font-garamond text-[13vw] font-light leading-none tracking-tight text-velour-white/[0.06] sm:text-[9vw] lg:text-[6.5vw]">
          Velour Capital
        </p>

        <div className="-mt-6 grid gap-12 pb-16 sm:-mt-10 lg:-mt-16 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-20">
          {/* Marca */}
          <div className="max-w-sm">
            <div className="flex items-baseline gap-2">
              <span className="font-garamond text-2xl tracking-wide text-velour-white">
                VELOUR
              </span>
              <span className="font-garamond text-2xl italic text-velour-gold">
                Capital
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-velour-stone">
              {t("footer.description")}
            </p>
            <div className="mt-6">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Explorar */}
          <nav className="flex flex-col gap-3">
            <span className="mb-1 text-xs uppercase tracking-[0.25em] text-velour-gold/70">
              {t("footer.columns.explore")}
            </span>
            {FOOTER_LINKS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-sm text-velour-stone transition-colors hover:text-velour-white"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </nav>

          {/* Legal + social */}
          <nav className="flex flex-col gap-3">
            <span className="mb-1 text-xs uppercase tracking-[0.25em] text-velour-gold/70">
              {t("footer.columns.legal")}
            </span>
            {legal.map((l) => (
              <a
                key={l}
                href="#legal"
                className="text-sm text-velour-stone transition-colors hover:text-velour-white"
              >
                {l}
              </a>
            ))}
            <div className="mt-2 flex gap-4">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="text-xs uppercase tracking-wider text-velour-stone transition-colors hover:text-velour-gold"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </nav>
        </div>

        <GoldLine />

        <div className="flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center">
          <p className="text-xs text-velour-stone/70">
            © {year} {t("footer.rights")}
          </p>
          <p className="text-xs text-velour-stone/50">{t("footer.demo")}</p>
        </div>
      </div>
    </footer>
  );
}
