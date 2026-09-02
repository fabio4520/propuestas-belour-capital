"use client";

import { useEffect, useRef } from "react";
// Named imports en vez de `import * as THREE`: el namespace completo obliga al
// bundler a conservar módulos de three que esta escena nunca toca.
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Vector2,
  Vector3,
  Timer,
  TorusKnotGeometry,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points,
  Color,
  NormalBlending,
} from "three";

/**
 * Fondo generativo del Hero: un torus-knot "tejido" en partículas que
 * reacciona sutilmente al cursor. Adaptado a la paleta monocroma Belour
 * (regla dura: ≥90% negro, ~8% blanco, ≤2% perla — nunca un fondo claro
 * grande), no al arcoíris HSL del componente de referencia.
 *
 * Todo el trabajo de Three.js vive en un único useEffect imperativo que
 * monta/desmonta el canvas fuera del árbol de React — el <div ref> que sí
 * pasa por SSR es idéntico en servidor y cliente, así que no aplica el
 * guard "mounted" del gotcha de useScroll+hydration (ese es específico de
 * motion values usados como style inline).
 */
export function WovenCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // antialias:false — son puntos de 0.018 de tamaño, el MSAA no aporta nada
    // visible y sí cuesta fill-rate sobre un canvas a pantalla completa.
    const renderer = new WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    const mouse = new Vector2(0, 0);
    const timer = new Timer();

    // Torus-knot "tejido" — geometría fuente que se dispersa en partículas.
    // Degradación en móvil: la mitad de partículas reduce a la mitad el coste
    // del loop por frame en pantallas pequeñas (menos GPU/CPU, menos calor).
    const particleCount = mount.clientWidth < 768 ? 2000 : 4000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const torusKnot = new TorusKnotGeometry(1.5, 0.5, 200, 32);
    const sourcePositions = torusKnot.attributes.position;

    // Paleta de marca (Manual Belour 2026) — blanco/piedra dominante, perla y
    // hueso como acento escaso (nunca HSL aleatorio: la paleta es monocroma).
    const WHITE = new Color("#FFFFFF");
    const PIEDRA = new Color("#8A8880");
    const PERLA = new Color("#E6E3DC");
    const HUESO = new Color("#F4F2ED");

    for (let i = 0; i < particleCount; i++) {
      const vertexIndex = i % sourcePositions.count;
      const x = sourcePositions.getX(vertexIndex);
      const y = sourcePositions.getY(vertexIndex);
      const z = sourcePositions.getZ(vertexIndex);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      const roll = Math.random();
      const color = roll < 0.08 ? PERLA : roll < 0.12 ? HUESO : roll < 0.55 ? WHITE : PIEDRA;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    torusKnot.dispose();

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("color", new BufferAttribute(colors, 3));

    const material = new PointsMaterial({
      size: 0.018,
      vertexColors: true,
      blending: NormalBlending,
      transparent: true,
      opacity: 0.75,
    });

    const points = new Points(geometry, material);
    scene.add(points);

    // El sistema se marca "sucio" al mover el mouse; ver el bucle de animación.
    let settled = true;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      settled = false;
    };
    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Vectores "scratch" reutilizados — evita ~28k allocations/frame.
    const mouseWorld = new Vector3();
    const scratchDir = new Vector3();
    let frameId = 0;
    let inView = true;

    // Por debajo de este umbral (suma de velocidad y de desplazamiento respecto
    // al torus-knot original) el movimiento residual es sub-píxel: el sistema se
    // declara en reposo y se deja de simular hasta el próximo movimiento de
    // mouse. Sin esto, el bucle de N partículas seguía corriendo a 60 fps para
    // siempre resolviendo un retorno que ya había convergido.
    const SETTLE_EPSILON = 1e-3;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      timer.update();
      const elapsedTime = timer.getElapsed();

      if (!prefersReducedMotion && !settled) {
        mouseWorld.set(mouse.x * 3, mouse.y * 3, 0);
        let maxMotion = 0;

        for (let i = 0; i < particleCount; i++) {
          const ix = i * 3;
          const iy = ix + 1;
          const iz = ix + 2;

          const px = positions[ix];
          const py = positions[iy];
          const pz = positions[iz];

          const dx = px - mouseWorld.x;
          const dy = py - mouseWorld.y;
          const dz = pz - mouseWorld.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          let vx = velocities[ix];
          let vy = velocities[iy];
          let vz = velocities[iz];

          if (dist < 1.5 && dist > 0.0001) {
            const force = (1.5 - dist) * 0.01;
            scratchDir.set(dx / dist, dy / dist, dz / dist);
            vx += scratchDir.x * force;
            vy += scratchDir.y * force;
            vz += scratchDir.z * force;
          }

          // Retorno a la posición original del torus-knot.
          const ox = originalPositions[ix] - px;
          const oy = originalPositions[iy] - py;
          const oz = originalPositions[iz] - pz;
          vx += ox * 0.001;
          vy += oy * 0.001;
          vz += oz * 0.001;

          // Damping.
          vx *= 0.95;
          vy *= 0.95;
          vz *= 0.95;

          positions[ix] = px + vx;
          positions[iy] = py + vy;
          positions[iz] = pz + vz;

          velocities[ix] = vx;
          velocities[iy] = vy;
          velocities[iz] = vz;

          // El desplazamiento cuenta además de la velocidad: una partícula
          // lejos de su sitio con velocidad momentáneamente baja no debe
          // congelarse fuera de posición.
          const motion =
            Math.abs(vx) + Math.abs(vy) + Math.abs(vz) +
            Math.abs(ox) + Math.abs(oy) + Math.abs(oz);
          if (motion > maxMotion) maxMotion = motion;
        }
        if (maxMotion < SETTLE_EPSILON) settled = true;
        geometry.attributes.position.needsUpdate = true;
        points.rotation.y = elapsedTime * 0.05;
      } else {
        // En reposo (o con movimiento reducido) solo queda la rotación: un
        // cambio de matriz y un draw call, sin recorrer el buffer.
        points.rotation.y = elapsedTime * (prefersReducedMotion ? 0.02 : 0.05);
      }

      renderer.render(scene, camera);
    };
    animate();

    // Performance: detener el loop WebGL cuando el hero sale del viewport —
    // sin esto el canvas de partículas seguiría renderizando bajo todas las
    // secciones inferiores (y compitiendo con el globo 3D de Alcance).
    const io = new IntersectionObserver(
      ([entry]) => {
        const nowInView = entry.isIntersecting;
        if (nowInView && !inView) {
          inView = true;
          if (!frameId) animate();
        } else if (!nowInView && inView) {
          inView = false;
          cancelAnimationFrame(frameId);
          frameId = 0;
        }
      },
      { threshold: 0 }
    );
    io.observe(mount);

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      io.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" />;
}
