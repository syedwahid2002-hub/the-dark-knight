import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useRef } from "react";

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  thickness: number;
  opacity: number;
}

/**
 * Fixed full-screen canvas overlay rendering angled rain streaks.
 * Renders behind content (z-index -10) and reduces intensity on mobile.
 */
export default function RainEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let drops: RainDrop[] = [];
    let animationId = 0;

    const dropCount = () => {
      if (reduceMotion) return 0;
      const base = isMobile ? 60 : 180;
      return Math.floor((base * width) / 1200);
    };

    const createDrop = (initial = false): RainDrop => {
      const length = isMobile
        ? 8 + Math.random() * 10
        : 12 + Math.random() * 18;
      return {
        x: Math.random() * (width + 200) - 100,
        y: initial ? Math.random() * height : -length,
        length,
        speed: (isMobile ? 4 : 6) + Math.random() * (isMobile ? 4 : 8),
        thickness: isMobile ? 0.6 : 0.8 + Math.random() * 0.6,
        opacity: 0.08 + Math.random() * (isMobile ? 0.12 : 0.22),
      };
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      drops = Array.from({ length: dropCount() }, () => createDrop(true));
    };

    const angle = isMobile ? 0.18 : 0.28; // radians-ish slant via dx/dy ratio

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";
      for (const drop of drops) {
        ctx.strokeStyle = `oklch(0.7 0.02 260 / ${drop.opacity})`;
        ctx.lineWidth = drop.thickness;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - drop.length * angle, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;
        drop.x -= drop.speed * angle * 0.4;

        if (drop.y > height + drop.length) {
          Object.assign(drop, createDrop());
        }
      }
      animationId = requestAnimationFrame(draw);
    };

    resize();
    if (!reduceMotion) {
      draw();
    } else {
      ctx.clearRect(0, 0, width, height);
    }

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
