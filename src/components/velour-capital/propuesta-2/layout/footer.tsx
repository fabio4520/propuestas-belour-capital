"use client";

import { useTranslations } from "next-intl";
import { NAV_ITEMS, SOCIAL_LINKS } from "../lib/constants";
import { LanguageSwitcher } from "./language-switcher";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();
  const legal = t.raw("footer.legal") as string[];

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-obsidian-900">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Marca */}
          <div className="max-w-sm">
            <div className="flex items-baseline gap-2">
              <span className="font-cormorant text-2xl tracking-wide text-warmwhite">
                VELOUR
              </span>
              <span className="font-cormorant text-2xl italic text-champagne-gradient">
                Capital
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-stone">
              {t("footer.description")}
            </p>
            <div className="mt-6">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Explorar */}
          <nav className="flex flex-col gap-3">
            <span className="mb-1 text-xs uppercase tracking-[0.2em] text-champagne/70">
              {t("footer.columns.explore")}
            </span>
            {NAV_ITEMS.slice(0, 5).map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-sm text-stone transition-colors hover:text-warmwhite"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </nav>

          {/* Social */}
          <nav className="flex flex-col gap-3">
            <span className="mb-1 text-xs uppercase tracking-[0.2em] text-champagne/70">
              Social
            </span>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                className="text-sm text-stone transition-colors hover:text-warmwhite"
              >
                {s.name}
              </a>
            ))}
          </nav>

          {/* Legal */}
          <nav className="flex flex-col gap-3">
            <span className="mb-1 text-xs uppercase tracking-[0.2em] text-champagne/70">
              {t("footer.columns.legal")}
            </span>
            {legal.map((l) => (
              <a
                key={l}
                href="#"
                className="text-sm text-stone transition-colors hover:text-warmwhite"
              >
                {l}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-stone-dark">
            © {year} {t("footer.rights")}
          </p>
          <p className="text-xs text-stone-dark/70">{t("footer.demo")}</p>
        </div>
      </div>
    </footer>
  );
}
