"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "../ui/section-heading";
import { CONTACT } from "../lib/constants";
import { fadeUp, viewportOnce } from "../motion/variants";
import { EASE_OUT_EXPO } from "../motion/transitions";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-belour-white placeholder:text-belour-piedra/50 transition-colors focus:border-belour-perla/50 focus:outline-none focus:ring-1 focus:ring-belour-perla/30";

const labelClass =
  "mb-2 block text-xs font-medium uppercase tracking-wider text-belour-piedra";

/**
 * Contacto — CTA y datos oficiales del Brochure 2026. El formulario no
 * depende de un backend: compone un mailto con los campos y abre el cliente
 * de correo del visitante hacia contacto@belourcapital.com.
 */
export function Contact() {
  const t = useTranslations("contact");
  const fields = t.raw("fields") as Record<string, string>;
  const interestOptions = t.raw("interestOptions") as string[];
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `${t("mailSubject")} — ${data.get("name")}`;
    const body = [
      `${fields.name}: ${data.get("name")}`,
      `${fields.company}: ${data.get("company") || "—"}`,
      `${fields.email}: ${data.get("email")}`,
      `${fields.phone}: ${data.get("phone") || "—"}`,
      `${fields.interest}: ${data.get("interest") || "—"}`,
      "",
      `${data.get("message")}`,
    ].join("\n");

    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  const infoItems = [
    { icon: Mail, label: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: Phone, label: CONTACT.phone, href: CONTACT.phoneHref },
    { icon: MapPin, label: CONTACT.address },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-belour-noir py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(230,227,220,0.06),transparent_65%)]" />

      <div className="relative mx-auto grid max-w-[1400px] gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10">
        <div>
          <SectionHeading
            index="07"
            eyebrow={t("label")}
            title={t("headline")}
            highlight={t("highlight")}
            description={t("subheadline")}
          />

          {/* Datos de contacto oficiales */}
          <motion.ul
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-10 space-y-4"
          >
            {infoItems.map(({ icon: Icon, label, href }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 text-belour-perla">
                  <Icon className="h-4 w-4" strokeWidth={1.4} />
                </span>
                {href ? (
                  <a
                    href={href}
                    className="pt-1.5 text-sm text-belour-white/85 transition-colors hover:text-belour-perla"
                  >
                    {label}
                  </a>
                ) : (
                  <span className="pt-1.5 text-sm leading-relaxed text-belour-white/85">
                    {label}
                  </span>
                )}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          onSubmit={handleSubmit}
          className="glass-belour rounded-2xl p-8 sm:p-10"
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
                className={cn(fieldClass, "cursor-pointer bg-belour-noir")}
              >
                <option value="" disabled className="bg-belour-noir">
                  {t("interestPlaceholder")}
                </option>
                {interestOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-belour-noir">
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
            className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-belour-perla px-7 py-3.5 text-sm font-medium text-belour-noir transition-all duration-300 hover:bg-belour-hueso hover:shadow-[0_10px_40px_-10px_rgba(230,227,220,0.4)] sm:w-auto"
          >
            {t("submit")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <AnimatePresence>
            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                className="mt-5 flex items-center gap-2 text-sm text-belour-hueso"
                role="status"
              >
                <CheckCircle2 className="h-4 w-4 text-belour-perla" strokeWidth={1.6} />
                {t("success")}
              </motion.p>
            )}
          </AnimatePresence>

          <p className="mt-4 text-xs text-belour-piedra/50">{t("note")}</p>
        </motion.form>
      </div>
    </section>
  );
}
