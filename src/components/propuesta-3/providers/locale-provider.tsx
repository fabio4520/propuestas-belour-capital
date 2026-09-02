"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { NextIntlClientProvider } from "next-intl";
import es from "../messages/es.json";

/*
 * i18n scopeado SOLO a esta propuesta (sin middleware ni routing por locale),
 * para no interferir con el resto del repositorio. El idioma vive en estado de
 * cliente y se cambia desde el selector del header.
 *
 * Solo el español —idioma inicial— se importa de forma estática. El inglés
 * (17 KB de JSON que la inmensa mayoría de visitas nunca abre) se carga con
 * import() al pulsar el switch: sale del bundle inicial y de su parseo. Una vez
 * traído queda en caché en memoria, así que alternar ES/EN es instantáneo.
 */
export type Locale = "es" | "en";

type Messages = typeof es;

const LOADED: Partial<Record<Locale, Messages>> = { es };

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
  const [locale, setLocaleState] = useState<Locale>("es");
  const [messages, setMessages] = useState<Messages>(es);

  const setLocale = useCallback((next: Locale) => {
    const cached = LOADED[next];
    if (cached) {
      setMessages(cached);
      setLocaleState(next);
      return;
    }
    // El cambio se aplica cuando el diccionario está disponible: cambiar el
    // locale antes dejaría a next-intl resolviendo claves con los mensajes del
    // idioma anterior durante un frame.
    import("../messages/en.json").then((mod) => {
      LOADED.en = mod.default;
      setMessages(mod.default);
      setLocaleState(next);
    });
  }, []);

  const toggle = useCallback(
    () => setLocale(locale === "es" ? "en" : "es"),
    [locale, setLocale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggle }}>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone="America/Lima"
      >
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
