"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import es from "../messages/es.json";
import en from "../messages/en.json";

/*
 * i18n scopeado SOLO a esta propuesta (sin middleware ni routing por locale),
 * para no interferir con el resto del repositorio. El idioma vive en estado de
 * cliente y se cambia desde el selector del header.
 */
export type Locale = "es" | "en";

const MESSAGES: Record<Locale, typeof es> = { es, en };

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocaleSwitch() {
  const ctx = useContext(LocaleContext);
  if (!ctx)
    throw new Error("useLocaleSwitch debe usarse dentro de <LocaleProvider>");
  return ctx;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es");

  const toggle = () => setLocale((prev) => (prev === "es" ? "en" : "es"));

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggle }}>
      <NextIntlClientProvider
        locale={locale}
        messages={MESSAGES[locale]}
        timeZone="America/Lima"
      >
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
