"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "../lib/constants";
import { LanguageSwitcher } from "../ui/language-switcher";
import logo from "../../../../public/belour/logo.png";

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  // Togglea una clase por cruce de umbral (no estado por frame/píxel).
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 120;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      /* El header conserva superficie noir aunque la sección de debajo sea
         papel: es una barra sobre el documento, no parte de él, y mantenerla
         oscura da un anclaje constante mientras el fondo alterna de tono. */
      className={cn(
        "surface-noir fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-rule/10 bg-surface/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        {/* Logotipo oficial (manual de marca: primera opción en aplicaciones
            institucionales). El PNG es negro sobre transparente: brightness-0
            + invert lo vuelve blanco sobre el fondo noir sin un asset extra. */}
        <a href="#top" aria-label="Belour Capital — inicio">
          <Image
            src={logo}
            alt="Belour Capital"
            priority
            sizes="150px"
            className="h-9 w-auto brightness-0 invert sm:h-10"
          />
        </a>

        {/* Nav desktop */}
        <div className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="group relative text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {t(item.key)}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <a
            href="#contact"
            className="rounded-full border border-brand/40 px-5 py-2 text-sm font-medium text-brand transition-all duration-300 hover:bg-brand hover:text-brand-on"
          >
            {t("cta")}
          </a>
        </div>

        {/* Toggle móvil */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="cursor-pointer p-2 text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-rule/10 bg-surface/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base text-ink-muted transition-colors hover:text-brand"
                >
                  {t(item.key)}
                </a>
              ))}
              <div className="mt-4 flex items-center justify-between">
                <LanguageSwitcher />
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-on"
                >
                  {t("cta")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
