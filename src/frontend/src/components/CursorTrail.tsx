import { useEffect, useRef, useState } from "react";

interface TrailParticle {
  x: number;
  y: number;
  life: number;
  rotation: number;
}

const MAX_PARTICLES = 14;
const PARTICLE_LIFE = 0.6; // seconds
const SPAWN_INTERVAL = 45; // ms

/**
 * Renders a faint bat-shaped particle following the cursor on desktop only.
 * Disabled on touch devices and when prefers-reduced-motion is set.
 */
export default function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    setEnabled(!isTouch && !reduceMotion && desktop);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return;

    const particles: TrailParticle[] = [];
    let lastSpawn = 0;
    let frame = 0;
    let lastTime = performance.now();

    const handleMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawn > SPAWN_INTERVAL) {
        lastSpawn = now;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          life: PARTICLE_LIFE,
          rotation: Math.random() * 30 - 15,
        });
        if (particles.length > MAX_PARTICLES) particles.shift();
      }
    };

    const tick = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      // Render particles
      container.innerHTML = "";
      for (const p of particles) {
        p.life -= dt;
        if (p.life <= 0) continue;
        const el = document.createElement("div");
        el.style.position = "fixed";
        el.style.left = `${p.x - 10}px`;
        el.style.top = `${p.y - 6}px`;
        el.style.transform = `rotate(${p.rotation}deg) scale(${0.6 + p.life})`;
        el.style.opacity = `${p.life * 0.5}`;
        el.style.pointerEvents = "none";
        el.innerHTML = batSvg;
        container.appendChild(el);
      }
      // Cull dead particles
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].life <= 0) particles.splice(i, 1);
      }
      frame = requestAnimationFrame(tick);
    };

    const batSvg =
      '<svg width="20" height="12" viewBox="0 0 64 32" style="filter: drop-shadow(0 0 4px oklch(0.82 0.16 85 / 0.6))"><path fill="oklch(0.82 0.16 85 / 0.8)" d="M32 4c-1.6 2.2-2.4 4.6-2.6 7.2-2.4-1.6-5-2.4-7.8-2.4-1.4 0-2.8.2-4.2.6 1.2 1 2 2.2 2.4 3.6-3.2-.4-6.4.4-9 2.2 1.6.6 3 1.6 4 3-2.8.4-5.4 1.8-7.4 4 1.8.2 3.4.8 4.8 1.8-1.6 1-2.8 2.4-3.6 4.2 2.4-.6 4.8-.4 7 .6-1 1.4-1.4 3-1.2 4.8 2-1.6 4.4-2.4 7-2.4.4 1.8 1.4 3.4 3 4.6 1-1.6 1.6-3.4 1.6-5.4 0-.4 0-.8-.1-1.2 1.4.6 3 .9 4.6.9s3.2-.3 4.6-.9c-.1.4-.1.8-.1 1.2 0 2 .6 3.8 1.6 5.4 1.6-1.2 2.6-2.8 3-4.6 2.6 0 5 .8 7 2.4.2-1.8-.2-3.4-1.2-4.8 2.2-1 4.6-1.2 7-.6-.8-1.8-2-3.2-3.6-4.2 1.4-1 3-1.6 4.8-1.8-2-2.2-4.6-3.6-7.4-4 1-1.4 2.4-2.4 4-3-2.6-1.8-5.8-2.6-9-2.2.4-1.4 1.2-2.6 2.4-3.6-1.4-.4-2.8-.6-4.2-.6-2.8 0-5.4.8-7.8 2.4C34.4 8.6 33.6 6.2 32 4z"/></svg>';

    window.addEventListener("mousemove", handleMove);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40"
    />
  );
}
