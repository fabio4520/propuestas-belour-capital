"use client";

import { cn } from "@/lib/utils";

/**
 * Marquee infinito (CSS, sin JS de scroll). Duplica el contenido para un loop
 * continuo. `items` se repite; el ancho se anima -50% para empalmar.
 */
export function Marquee({
  items,
  className,
  speed = "normal",
}: {
  items: string[];
  className?: string;
  speed?: "normal" | "slow";
}) {
  const track = [...items, ...items];
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 items-center",
          speed === "slow" ? "animate-marquee-slow" : "animate-marquee"
        )}
      >
        {track.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 text-sm uppercase tracking-[0.2em] text-stone">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-champagne/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
