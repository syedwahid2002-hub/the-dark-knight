import BatSymbol3D from "@/components/BatSymbol3D";
import ScrollReveal from "@/components/ScrollReveal";
import { vowQuote } from "@/data/batman";
import { type Variants, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

// Timing for the bat-symbol entrance — the vow reveals after this completes.
const BAT_ANIMATION_DURATION = 2.4;

const headlineContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const headlineWord: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const eyebrowVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const vowVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const scrollIndicatorVariant: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const batEntrance: Variants = {
  hidden: { opacity: 0, scale: 0.6, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: BAT_ANIMATION_DURATION, ease: [0.16, 1, 0.3, 1] },
  },
};

const fogLayer: Variants = {
  animate: (drifts: boolean) => ({
    x: drifts ? ["-10%", "10%", "-10%"] : "0%",
    opacity: [0.35, 0.55, 0.35],
    transition: {
      x: { duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
      opacity: {
        duration: 24,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }),
};

const fogLayerSecondary: Variants = {
  animate: (drifts: boolean) => ({
    x: drifts ? ["8%", "-12%", "8%"] : "0%",
    opacity: [0.25, 0.45, 0.25],
    transition: {
      x: { duration: 32, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
      opacity: {
        duration: 32,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }),
};

const bounceArrow: Variants = {
  animate: (bounces: boolean) => ({
    y: bounces ? [0, 8, 0] : 0,
    transition: {
      y: { duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
    },
  }),
};

/**
 * Hero section — full-viewport cinematic opener for The Dark Knight.
 * Integrates the 3D bat-symbol, staggered headline reveal, vow tagline,
 * drifting fog overlay, and a bouncing scroll-down indicator.
 */
export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [vowReady, setVowReady] = useState(false);

  // Reveal the vow after the bat-symbol entrance completes.
  useEffect(() => {
    if (reduceMotion) {
      setVowReady(true);
      return;
    }
    const t = setTimeout(
      () => setVowReady(true),
      BAT_ANIMATION_DURATION * 1000,
    );
    return () => clearTimeout(t);
  }, [reduceMotion]);

  const headlineWords = ["The", "Dark", "Knight"];

  return (
    <section
      id="hero"
      data-ocid="section.hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-fog px-4 py-24"
    >
      {/* Drifting fog / mist overlays for atmospheric depth */}
      <motion.div
        aria-hidden="true"
        variants={fogLayer}
        custom={!reduceMotion}
        initial="animate"
        animate="animate"
        className="pointer-events-none absolute inset-y-0 -left-1/4 w-[150%] opacity-40 mix-blend-screen"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, oklch(0.55 0.02 260 / 0.5) 0%, transparent 55%)",
        }}
      />
      <motion.div
        aria-hidden="true"
        variants={fogLayerSecondary}
        custom={!reduceMotion}
        initial="animate"
        animate="animate"
        className="pointer-events-none absolute inset-y-0 -right-1/4 w-[150%] opacity-30 mix-blend-screen"
        style={{
          background:
            "radial-gradient(ellipse at 70% 60%, oklch(0.45 0.015 260 / 0.45) 0%, transparent 60%)",
        }}
      />

      {/* Vignette to focus the center */}
      <div className="absolute inset-0 bg-vignette pointer-events-none" />

      {/* Content layer */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        {/* 3D bat-symbol — rotates and glows on load */}
        <motion.div
          variants={batEntrance}
          initial="hidden"
          animate="visible"
          className="relative mb-8 h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64"
        >
          {/* Glow halo behind the symbol */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle at center, oklch(0.82 0.16 85 / 0.35) 0%, transparent 70%)",
            }}
          />
          <BatSymbol3D className="relative h-full w-full" />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          variants={eyebrowVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-accent/80 md:text-sm"
          data-ocid="hero.eyebrow"
        >
          Gotham City
        </motion.p>

        {/* Headline — staggered word-by-word cinematic reveal */}
        <motion.h1
          variants={headlineContainer}
          initial="hidden"
          animate="visible"
          className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-8xl"
          data-ocid="hero.headline"
        >
          {headlineWords.map((word) => (
            <motion.span
              key={word}
              variants={headlineWord}
              className="inline-block text-glow-accent"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Vow tagline — revealed after the bat-symbol animation completes */}
        <motion.div
          variants={vowVariant}
          initial="hidden"
          animate={vowReady ? "visible" : "hidden"}
          className="mx-auto mt-8 max-w-2xl"
          data-ocid="hero.vow"
        >
          <ScrollReveal stagger={0.04} distance={16}>
            <p className="font-body text-base leading-relaxed text-muted-foreground md:text-lg">
              {vowQuote}
            </p>
          </ScrollReveal>
        </motion.div>

        {/* Scroll-down indicator with subtle bounce */}
        <motion.a
          href="#origin"
          variants={scrollIndicatorVariant}
          initial="hidden"
          animate={vowReady ? "visible" : "hidden"}
          aria-label="Scroll to explore the story"
          data-ocid="hero.scroll_indicator"
          className="group mt-12 flex flex-col items-center gap-2 text-muted-foreground transition-smooth hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em]">
            Descend
          </span>
          <motion.span
            variants={bounceArrow}
            custom={!reduceMotion}
            initial="animate"
            animate="animate"
            className="flex h-10 w-6 items-start justify-center rounded-full border border-border/60 p-1.5"
          >
            <span className="h-2 w-1 rounded-full bg-current opacity-70 transition-smooth group-hover:bg-accent" />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
