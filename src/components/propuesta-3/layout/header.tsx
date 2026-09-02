"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "../lib/constants";
import { LanguageSwitcher } from "../ui/language-switcher";

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
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/8 bg-belour-noir/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-cormorant text-2xl tracking-wide text-belour-white">
            BELOUR
          </span>
          <span className="font-cormorant text-2xl italic text-belour-perla">
            Capital
          </span>
        </a>

        {/* Nav desktop */}
        <div className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="group relative text-sm text-belour-piedra transition-colors hover:text-belour-white"
            >
              {t(item.key)}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-belour-perla transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <a
            href="#contact"
            className="rounded-full border border-belour-perla/40 px-5 py-2 text-sm font-medium text-belour-perla transition-all duration-300 hover:bg-belour-perla hover:text-belour-noir"
          >
            {t("cta")}
          </a>
        </div>

        {/* Toggle móvil */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="cursor-pointer p-2 text-belour-white lg:hidden"
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
            className="overflow-hidden border-t border-white/8 bg-belour-noir/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base text-belour-piedra transition-colors hover:text-belour-perla"
                >
                  {t(item.key)}
                </a>
              ))}
              <div className="mt-4 flex items-center justify-between">
                <LanguageSwitcher />
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-belour-perla px-5 py-2.5 text-sm font-medium text-belour-noir"
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
