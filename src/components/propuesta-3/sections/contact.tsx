"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "../ui/section-heading";
import { fadeUp, viewportOnce } from "../motion/variants";
import { EASE_OUT_EXPO } from "../motion/transitions";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-velour-white placeholder:text-velour-stone/50 transition-colors focus:border-velour-gold/50 focus:outline-none focus:ring-1 focus:ring-velour-gold/30";

const labelClass =
  "mb-2 block text-xs font-medium uppercase tracking-wider text-velour-stone";

export function Contact() {
  const t = useTranslations("contact");
  const fields = t.raw("fields") as Record<string, string>;
  const interestOptions = t.raw("interestOptions") as string[];
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      form.reset();
      setSubmitted(true);
    }, 600);
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-velour-black py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.06),transparent_65%)]" />

      <div className="relative mx-auto grid max-w-[1400px] gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10">
        <SectionHeading
          index="12"
          eyebrow={t("label")}
          title={t("headline")}
          highlight={t("highlight")}
          description={t("subheadline")}
        />

        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          onSubmit={handleSubmit}
          className="glass-velour rounded-2xl p-8 sm:p-10"
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
              <input id="c-email" name="email" type="email" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor="c-phone" className={labelClass}>
                {fields.phone}
              </label>
              <input id="c-phone" name="phone" type="tel" className={fieldClass} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="c-interest" className={labelClass}>
                {fields.interest}
              </label>
              <select
                id="c-interest"
                name="interest"
                defaultValue=""
                className={cn(fieldClass, "cursor-pointer bg-velour-black")}
              >
                <option value="" disabled className="bg-velour-black">
                  {t("interestPlaceholder")}
                </option>
                {interestOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-velour-black">
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
            disabled={submitting || submitted}
            className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-velour-gold px-7 py-3.5 text-sm font-medium text-velour-black transition-all duration-300 hover:bg-velour-champagne hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.5)] disabled:opacity-60 sm:w-auto"
          >
            {submitting ? "…" : t("submit")}
            {!submitting && (
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </button>

          <AnimatePresence>
            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                className="mt-5 flex items-center gap-2 text-sm text-velour-champagne"
                role="status"
              >
                <CheckCircle2 className="h-4 w-4 text-velour-gold" strokeWidth={1.6} />
                {t("success")}
              </motion.p>
            )}
          </AnimatePresence>

          <p className="mt-4 text-xs text-velour-stone/50">{t("note")}</p>
        </motion.form>
      </div>
    </section>
  );
}
