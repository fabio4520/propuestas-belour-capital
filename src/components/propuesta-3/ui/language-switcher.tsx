"use client";

import { motion } from "framer-motion";
import { useLocaleSwitch, type Locale } from "../providers/locale-provider";
import { cn } from "@/lib/utils";

const LOCALES: Locale[] = ["es", "en"];

/** Selector ES/EN con indicador deslizante (layoutId). */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocaleSwitch();

  return (
    <div
      className={cn(
        "relative inline-flex items-center rounded-full border border-rule/12 p-0.5",
        className
      )}
    >
      {LOCALES.map((l) => {
        const active = locale === l;
        return (
          <button
            key={l}
            onClick={() => setLocale(l)}
            className={cn(
              "relative z-10 cursor-pointer rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider transition-colors duration-300",
              active ? "text-brand-on" : "text-ink-muted hover:text-ink"
            )}
            aria-pressed={active}
          >
            {active && (
              <motion.span
                layoutId="lang-active-p3"
                className="absolute inset-0 -z-10 rounded-full bg-brand"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {l}
          </button>
        );
      })}
    </div>
  );
}
