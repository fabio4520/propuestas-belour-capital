"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/*
 * Investment Orb — alternativa premium en SVG/CSS a una escena 3D (R3F).
 * Esfera metálica + anillos orbitales + nodos conectados + glow champagne/copper.
 * Parallax sutil al mouse (desktop). Respeta prefers-reduced-motion.
 * Coste de render mínimo → excelente performance y sin bundle 3D.
 */

const CENTER = 200;

/* Nodos sobre las órbitas (coordenadas en el viewBox 0..400) */
const NODES = [
  { x: 200, y: 50, r: 4, delay: 0 },
  { x: 330, y: 150, r: 3, delay: 0.6 },
  { x: 300, y: 320, r: 3.5, delay: 1.1 },
  { x: 90, y: 300, r: 3, delay: 0.3 },
  { x: 60, y: 170, r: 4, delay: 0.9 },
];

export function InvestmentOrb() {
  const reduce = useReducedMotion();

  // Parallax: posición del mouse → desplazamiento suave del orbe
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 60, damping: 18 });
  const y = useSpring(my, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reduce) return;
    // Solo en dispositivos con puntero fino (desktop)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mx.set(nx * 26);
      my.set(ny * 26);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  return (
    <motion.div
      style={{ x, y }}
      className="relative aspect-square w-full max-w-[520px]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      aria-hidden
    >
      <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id="orbSphere" cx="38%" cy="34%" r="75%">
            <stop offset="0%" stopColor="#3a3326" />
            <stop offset="38%" stopColor="#1c1a16" />
            <stop offset="100%" stopColor="#0a0b0d" />
          </radialGradient>
          <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(216,194,144,0.28)" />
            <stop offset="60%" stopColor="rgba(176,118,79,0.10)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <linearGradient id="orbRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(216,194,144,0.0)" />
            <stop offset="50%" stopColor="rgba(216,194,144,0.55)" />
            <stop offset="100%" stopColor="rgba(176,118,79,0.0)" />
          </linearGradient>
        </defs>

        {/* Glow de fondo */}
        <circle cx={CENTER} cy={CENTER} r="190" fill="url(#orbGlow)" />

        {/* Líneas de conexión nodo → centro */}
        <g stroke="rgba(216,194,144,0.18)" strokeWidth="0.75">
          {NODES.map((n, i) => (
            <line key={i} x1={CENTER} y1={CENTER} x2={n.x} y2={n.y} />
          ))}
        </g>

        {/* Anillos orbitales (rotan a distinta velocidad/sentido) */}
        <g
          className={reduce ? "" : "animate-spin-slow"}
          style={{ transformBox: "view-box", transformOrigin: "200px 200px" }}
        >
          <ellipse
            cx={CENTER}
            cy={CENTER}
            rx="150"
            ry="150"
            fill="none"
            stroke="url(#orbRing)"
            strokeWidth="1"
          />
        </g>
        <g
          className={reduce ? "" : "animate-spin-slower"}
          style={{ transformBox: "view-box", transformOrigin: "200px 200px" }}
        >
          <ellipse
            cx={CENTER}
            cy={CENTER}
            rx="150"
            ry="62"
            fill="none"
            stroke="rgba(216,194,144,0.22)"
            strokeWidth="0.75"
          />
          <ellipse
            cx={CENTER}
            cy={CENTER}
            rx="62"
            ry="150"
            fill="none"
            stroke="rgba(176,118,79,0.20)"
            strokeWidth="0.75"
          />
        </g>

        {/* Esfera central metálica */}
        <circle cx={CENTER} cy={CENTER} r="72" fill="url(#orbSphere)" />
        <circle
          cx={CENTER}
          cy={CENTER}
          r="72"
          fill="none"
          stroke="rgba(216,194,144,0.35)"
          strokeWidth="0.75"
        />
        {/* brillo especular */}
        <ellipse
          cx="178"
          cy="172"
          rx="26"
          ry="16"
          fill="rgba(245,243,238,0.10)"
        />

        {/* Nodos pulsantes */}
        {NODES.map((n, i) => (
          <circle
            key={`node-${i}`}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="#d8c290"
            className={reduce ? "" : "animate-pulse-node"}
            style={{ animationDelay: `${n.delay}s`, transformOrigin: `${n.x}px ${n.y}px`, transformBox: "view-box" }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
