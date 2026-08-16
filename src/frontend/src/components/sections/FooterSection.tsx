import ScrollReveal from "@/components/ScrollReveal";
import { type Variants, motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";

/**
 * Footer section — Gotham atmosphere, closing quote, and attribution.
 * Renders a skyline silhouette with randomly flickering lit windows,
 * a closing original Batman quote in mono with accent emphasis,
 * and a small bat-symbol SVG watermark.
 */

// Original closing quote — written for this experience, not copied.
const closingQuote =
  "The legend does not end because the night does. It endures in the spaces between the streetlights, in the courage of those who refuse to look away, in the quiet certainty that somewhere above the rooftops a shadow still keeps its vow. The Dark Knight is not a man who cannot fall — he is a promise that someone will always rise.";

// Deterministic pseudo-random flicker schedule per window so SSR and CSR
// agree and the layout is stable. Each entry: { x%, width, delay, duration }.
const SKYLINE_WINDOWS = [
  { x: 4, w: 2, delay: 0.0, duration: 5.5 },
  { x: 9, w: 1.5, delay: 1.2, duration: 7.0 },
  { x: 14, w: 2, delay: 0.6, duration: 6.0 },
  { x: 19, w: 1.5, delay: 2.1, duration: 8.0 },
  { x: 24, w: 2, delay: 0.3, duration: 5.0 },
  { x: 30, w: 1.5, delay: 1.8, duration: 6.5 },
  { x: 36, w: 2, delay: 0.9, duration: 7.5 },
  { x: 42, w: 1.5, delay: 2.4, duration: 5.5 },
  { x: 48, w: 2, delay: 0.4, duration: 6.0 },
  { x: 54, w: 1.5, delay: 1.5, duration: 7.0 },
  { x: 60, w: 2, delay: 0.7, duration: 8.5 },
  { x: 66, w: 1.5, delay: 2.0, duration: 5.0 },
  { x: 72, w: 2, delay: 1.1, duration: 6.5 },
  { x: 78, w: 1.5, delay: 0.2, duration: 7.5 },
  { x: 84, w: 2, delay: 1.7, duration: 6.0 },
  { x: 90, w: 1.5, delay: 0.5, duration: 5.5 },
  { x: 95, w: 2, delay: 2.2, duration: 7.0 },
];

// Skyline building silhouettes — varied heights for a jagged Gotham roofline.
const SKYLINE_BUILDINGS = [
  { x: 0, w: 8, h: 38 },
  { x: 7, w: 6, h: 52 },
  { x: 12, w: 9, h: 30 },
  { x: 20, w: 7, h: 60 },
  { x: 26, w: 8, h: 44 },
  { x: 33, w: 6, h: 70 },
  { x: 38, w: 10, h: 36 },
  { x: 47, w: 7, h: 58 },
  { x: 53, w: 9, h: 48 },
  { x: 61, w: 6, h: 64 },
  { x: 66, w: 8, h: 40 },
  { x: 73, w: 7, h: 56 },
  { x: 79, w: 9, h: 34 },
  { x: 87, w: 6, h: 50 },
  { x: 92, w: 8, h: 42 },
];

const windowFlicker: Variants = {
  animate: (flickers: boolean) => ({
    opacity: flickers ? [0.15, 0.9, 0.3, 0.85, 0.2, 0.7, 0.15] : 0.5,
    transition: {
      duration: flickers ? 6 : 0,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    },
  }),
};

const watermarkGlow: Variants = {
  animate: (glows: boolean) => ({
    opacity: glows ? [0.06, 0.14, 0.06] : 0.1,
    transition: {
      duration: glows ? 6 : 0,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }),
};

/**
 * Small bat-symbol SVG watermark — matches the silhouette style of BatSymbol3D.
 */
function BatWatermark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 40"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <path
        fill="currentColor"
        d="M50 6
           C46 8, 44 11, 43 14
           C38 11, 32 12, 27 15
           C22 13, 16 14, 10 18
           C6 16, 2 18, 0 22
           C4 22, 8 23, 11 25
           C9 28, 7 32, 8 36
           C12 33, 17 31, 22 30
           C20 33, 19 36, 21 39
           C25 35, 30 33, 36 33
           C38 36, 42 38, 46 38
           C47 35, 48 32, 50 30
           C52 32, 53 35, 54 38
           C58 38, 62 36, 64 33
           C70 33, 75 35, 79 39
           C81 36, 80 33, 78 30
           C83 31, 88 33, 92 36
           C93 32, 91 28, 89 25
           C92 23, 96 22, 100 22
           C98 18, 94 16, 90 18
           C84 14, 78 13, 73 15
           C68 12, 62 11, 57 14
           C56 11, 54 8, 50 6 Z"
      />
    </svg>
  );
}

export default function FooterSection() {
  const year = new Date().getFullYear();
  const reduceMotion = useReducedMotion();
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "localhost",
  )}`;

  // Memoize window config so the randomization is stable across renders.
  const windows = useMemo(() => SKYLINE_WINDOWS, []);

  return (
    <footer
      data-ocid="section.footer"
      className="relative w-full overflow-hidden border-t border-border bg-background"
    >
      {/* Gotham skyline silhouette with flickering windows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-40 md:h-48"
      >
        {/* Skyline gradient backdrop — deep night above the rooftops */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, oklch(0.1 0.005 260 / 0.6) 60%, oklch(0.08 0.004 260 / 0.9) 100%)",
          }}
        />
        {/* Building silhouettes */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          role="img"
          aria-label="Gotham skyline silhouette at night"
          className="absolute inset-x-0 bottom-0 h-full w-full"
        >
          <defs>
            <linearGradient id="skyline-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.06 0.004 260)" />
              <stop offset="100%" stopColor="oklch(0.04 0.003 260)" />
            </linearGradient>
          </defs>
          {SKYLINE_BUILDINGS.map((b) => (
            <rect
              key={`building-${b.x}-${b.w}`}
              x={b.x}
              y={100 - b.h}
              width={b.w}
              height={b.h}
              fill="url(#skyline-fade)"
            />
          ))}
        </svg>
        {/* Lit windows — flicker independently */}
        <div className="absolute inset-0">
          {windows.map((win, i) => (
            <motion.span
              key={`window-${win.x}-${i}`}
              data-ocid={`footer.window.${i + 1}`}
              variants={windowFlicker}
              custom={!reduceMotion}
              initial="animate"
              animate="animate"
              transition={{
                delay: win.delay,
                duration: win.duration,
                repeat: Number.POSITIVE_INFINITY,
              }}
              className="absolute rounded-[1px] bg-accent"
              style={{
                left: `${win.x}%`,
                bottom: "18%",
                width: `${win.w}px`,
                height: "3px",
                boxShadow: "0 0 6px oklch(0.82 0.16 85 / 0.6)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Bat-symbol watermark — large, faint, centered behind content */}
      <motion.div
        aria-hidden="true"
        variants={watermarkGlow}
        custom={!reduceMotion}
        initial="animate"
        animate="animate"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 hidden -translate-x-1/2 -translate-y-1/2 sm:block"
      >
        <BatWatermark className="h-40 w-40 text-accent md:h-56 md:w-56" />
      </motion.div>

      {/* Content layer */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 pb-40 pt-16 sm:pb-44 md:pb-52 md:pt-20">
        {/* Small bat-symbol watermark above the quote */}
        <ScrollReveal distance={20}>
          <BatWatermark className="h-10 w-10 text-accent/70 animate-bat-glow" />
        </ScrollReveal>

        {/* Eyebrow */}
        <ScrollReveal delay={0.05} distance={16}>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent/80">
            Epilogue
          </p>
        </ScrollReveal>

        {/* Closing quote — mono font with accent emphasis */}
        <ScrollReveal delay={0.1} distance={24}>
          <blockquote
            data-ocid="footer.quote"
            className="relative mx-auto max-w-2xl text-center"
          >
            <p className="font-mono text-sm leading-relaxed text-muted-foreground md:text-base md:leading-relaxed">
              <span className="text-accent">"</span>
              {closingQuote}
              <span className="text-accent">"</span>
            </p>
            <footer className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-accent/60">
              — The Dark Knight
            </footer>
          </blockquote>
        </ScrollReveal>

        {/* Divider */}
        <ScrollReveal delay={0.15} distance={12}>
          <div
            aria-hidden="true"
            className="h-px w-24 bg-gradient-to-r from-transparent via-accent/40 to-transparent"
          />
        </ScrollReveal>

        {/* Attribution */}
        <ScrollReveal delay={0.2} distance={12}>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="footer.attribution"
            className="font-body text-xs text-muted-foreground/70 transition-smooth hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            © {year}. Built with love using caffeine.ai
          </a>
        </ScrollReveal>
      </div>
    </footer>
  );
}
