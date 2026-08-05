"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Fondo generativo del Hero: un torus-knot "tejido" en partículas que
 * reacciona sutilmente al cursor. Técnica adaptada a la paleta Obsidiana
 * (regla dura: ≥90% negro, ~8% blanco, ≤2% dorado — nunca un fondo dorado
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

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const timer = new THREE.Timer();

    // Torus-knot "tejido" — geometría fuente que se dispersa en partículas.
    // Degradación en móvil: la mitad de partículas reduce a la mitad el coste
    // del loop por frame en pantallas pequeñas (menos GPU/CPU, menos calor).
    const particleCount = mount.clientWidth < 768 ? 3500 : 7000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);
    const sourcePositions = torusKnot.attributes.position;

    // Paleta de marca — blanco/stone dominante, dorado como acento escaso
    // (nunca HSL aleatorio, para no romper la regla ≤2% dorado del sitio).
    const WHITE = new THREE.Color("#FFFFFF");
    const STONE = new THREE.Color("#A3A3A3");
    const GOLD = new THREE.Color("#D4AF37");
    const CHAMPAGNE = new THREE.Color("#E8D9A0");

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
      const color = roll < 0.08 ? GOLD : roll < 0.12 ? CHAMPAGNE : roll < 0.55 ? WHITE : STONE;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    torusKnot.dispose();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.018,
      vertexColors: true,
      blending: THREE.NormalBlending,
      transparent: true,
      opacity: 0.75,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Vectores "scratch" reutilizados — evita ~28k allocations/frame.
    const mouseWorld = new THREE.Vector3();
    const scratchDir = new THREE.Vector3();
    let frameId = 0;
    let inView = true;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      timer.update();
      const elapsedTime = timer.getElapsed();

      if (!prefersReducedMotion) {
        mouseWorld.set(mouse.x * 3, mouse.y * 3, 0);

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
          vx += (originalPositions[ix] - px) * 0.001;
          vy += (originalPositions[iy] - py) * 0.001;
          vz += (originalPositions[iz] - pz) * 0.001;

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
        }
        geometry.attributes.position.needsUpdate = true;
        points.rotation.y = elapsedTime * 0.05;
      } else {
        points.rotation.y = elapsedTime * 0.02;
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
