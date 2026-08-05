"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "./data";
import { Reveal } from "./reveal";

export function Contact() {
  const [submitting, setSubmitting] = useState(false);

  /** Sin backend: simula el envío y confirma con un alert (datos mock). */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget; // capturar antes del async (React lo limpia luego)
    setSubmitting(true);
    // Pequeño delay para simular envío y mostrar el estado del botón
    setTimeout(() => {
      setSubmitting(false);
      form.reset();
      alert("Gracias, pronto nos contactaremos");
    }, 600);
  }

  return (
    <section
      id="contacto"
      className="relative border-t border-border/50 py-28 sm:py-36"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-24">
        {/* Columna informativa */}
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="font-serif text-sm text-gold/70">03</span>
            <span className="h-px w-8 bg-gold/40" />
            <span className="text-xs uppercase tracking-widest text-gold">
              Contacto
            </span>
          </div>
          <h2 className="mt-6 font-serif text-4xl leading-tight text-white sm:text-5xl">
            Conversemos sobre su próxima{" "}
            <span className="italic text-gold-sheen">oportunidad</span>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            Atendemos a inversores institucionales y privados. Déjenos sus
            datos y nuestro equipo se pondrá en contacto de forma confidencial.
          </p>

          <ul className="mt-12 space-y-6">
            <li className="flex items-center gap-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border text-gold">
                <Mail className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-muted-foreground transition-colors hover:text-gold"
              >
                {CONTACT_INFO.email}
              </a>
            </li>
            <li className="flex items-center gap-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border text-gold">
                <Phone className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="text-muted-foreground">{CONTACT_INFO.phone}</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border text-gold">
                <MapPin className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="text-muted-foreground">
                {CONTACT_INFO.offices.join("  ·  ")}
              </span>
            </li>
          </ul>
        </Reveal>

        {/* Formulario */}
        <Reveal delay={0.15}>
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-border bg-ink-800/60 p-8 sm:p-10"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  placeholder="Su nombre completo"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nombre@empresa.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mensaje">Mensaje</Label>
                <Textarea
                  id="mensaje"
                  name="mensaje"
                  placeholder="Cuéntenos sobre su interés de inversión…"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="group mt-8 w-full bg-gold text-ink-950 hover:bg-gold-light"
            >
              {submitting ? "Enviando…" : "Enviar mensaje"}
              {!submitting && (
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </Button>

            <p className="mt-4 text-center text-xs text-muted-foreground/60">
              Demostración · este formulario no envía datos a ningún servidor.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
