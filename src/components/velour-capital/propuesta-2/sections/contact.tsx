"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "../ui/section-label";
import { AnimatedText } from "../ui/animated-text";
import { fadeUp, viewportOnce } from "../motion/variants";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 font-manrope text-warmwhite placeholder:text-stone-dark transition-colors focus:border-champagne/50 focus:outline-none focus:ring-1 focus:ring-champagne/30";

const labelClass =
  "mb-2 block text-xs font-medium uppercase tracking-wider text-stone";

export function Contact() {
  const t = useTranslations("contact");
  const fields = t.raw("fields") as Record<string, string>;
  const interestOptions = t.raw("interestOptions") as string[];
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      form.reset();
      alert(t("success"));
    }, 600);
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-obsidian-900 py-28 sm:py-36">
      <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(216,194,144,0.07),transparent_65%)]" />

      <div className="relative mx-auto grid max-w-[1400px] gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10">
        {/* Texto */}
        <div>
          <SectionLabel index="09">{t("label")}</SectionLabel>
          <AnimatedText
            as="h2"
            text={t("headline")}
            highlight="estratégicas."
            className="mt-7 font-cormorant text-4xl font-light leading-[1.1] text-warmwhite sm:text-5xl"
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-6 max-w-md font-manrope text-lg leading-relaxed text-stone"
          >
            {t("subheadline")}
          </motion.p>
        </div>

        {/* Formulario */}
        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 sm:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="c-name" className={labelClass}>
                {fields.name}
              </label>
              <input id="c-name" name="name" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor="c-company" className={labelClass}>
                {fields.company}
              </label>
              <input id="c-company" name="company" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="c-email" className={labelClass}>
                {fields.email}
              </label>
              <input
                id="c-email"
                name="email"
                type="email"
                required
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="c-phone" className={labelClass}>
                {fields.phone}
              </label>
              <input
                id="c-phone"
                name="phone"
                type="tel"
                className={fieldClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="c-interest" className={labelClass}>
                {fields.interest}
              </label>
              <select
                id="c-interest"
                name="interest"
                defaultValue=""
                className={cn(fieldClass, "cursor-pointer bg-obsidian")}
              >
                <option value="" disabled className="bg-obsidian">
                  {t("interestPlaceholder")}
                </option>
                {interestOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-obsidian">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="c-message" className={labelClass}>
                {fields.message}
              </label>
              <textarea
                id="c-message"
                name="message"
                rows={4}
                required
                placeholder={t("messagePlaceholder")}
                className={cn(fieldClass, "resize-none")}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-champagne px-7 py-3.5 text-sm font-medium text-obsidian transition-all duration-300 hover:bg-champagne-light hover:shadow-[0_10px_40px_-10px_rgba(216,194,144,0.55)] disabled:opacity-60 sm:w-auto"
          >
            {submitting ? "…" : t("submit")}
            {!submitting && (
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </button>

          <p className="mt-4 text-xs text-stone-dark">{t("note")}</p>
        </motion.form>
      </div>
    </section>
  );
}
