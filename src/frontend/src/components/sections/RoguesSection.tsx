import ScrollReveal from "@/components/ScrollReveal";
import { type Villain, villains } from "@/data/batman";
import { motion, useReducedMotion } from "motion/react";

/**
 * Rogues Gallery section — the villains of Gotham.
 * Grid of 12 villain cards with custom inline SVG silhouettes,
 * staggered scroll reveal, hover lift + glow, and a distinct
 * accent treatment for the archenemy (The Jester).
 */

/* ------------------------------------------------------------------ */
/* Custom inline SVG icons — one silhouette per villain motif.        */
/* No external image dependencies. Each icon is a 64x64 viewBox.       */
/* ------------------------------------------------------------------ */

interface IconProps {
  className?: string;
}

function JesterIcon({ className }: IconProps) {
  // Jester hat with bells — the archenemy.
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 40c0-10 6-18 16-18s16 8 16 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M14 40h36"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M20 40c-2-8-6-12-6-12 4 2 6 6 6 12Z" fill="currentColor" />
      <path d="M44 40c2-8 6-12 6-12-4 2-6 6-6 12Z" fill="currentColor" />
      <path
        d="M32 40c0-10 0-18 0-18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="14" cy="26" r="3" fill="currentColor" />
      <circle cx="50" cy="26" r="3" fill="currentColor" />
      <circle cx="32" cy="20" r="3" fill="currentColor" />
      <path
        d="M24 48c2 3 5 4 8 4s6-1 8-4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CoinIcon({ className }: IconProps) {
  // Two-faced coin — one side scarred.
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2.5" />
      <path d="M32 12v40" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="22" cy="32" r="3" fill="currentColor" />
      <path
        d="M18 38l4-2 4 2 4-2 4 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M40 26l8-2M40 32l8 0M40 38l8 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SnowflakeIcon({ className }: IconProps) {
  // Mr. Freeze — six-armed snowflake.
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M32 8v48M32 8l-6 6M32 8l6 6M32 56l-6-6M32 56l6-6" />
        <path d="M8 32h48M8 32l6-6M8 32l6 6M56 32l-6-6M56 32l-6 6" />
        <path d="M15 15l34 34M15 15l8 0M15 15l0 8M49 49l-8 0M49 49l0-8" />
        <path d="M49 15L15 49M49 15l-8 0M49 15l0 8M15 49l8 0M15 49l0-8" />
      </g>
    </svg>
  );
}

function QuestionIcon({ className }: IconProps) {
  // Riddler — question mark in a diamond.
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M32 6l26 26-26 26L6 32z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M26 24c0-4 3-7 6-7s6 3 6 6c0 5-6 5-6 9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="40" r="2.5" fill="currentColor" />
    </svg>
  );
}

function ScarecrowIcon({ className }: IconProps) {
  // Scarecrow — stitched burlap mask.
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 22c0-8 5-14 12-14s12 6 12 14v18c0 4-3 8-12 8s-12-4-12-8z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M20 30c4-2 8-2 12 0s8 2 12 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M26 26l4 4M30 26l-4 4M38 26l-4 4M34 26l4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M28 38c2 2 6 2 8 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 44l2 4M40 44l-2 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PenguinIcon({ className }: IconProps) {
  // Penguin — monocle and beak silhouette.
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <ellipse
        cx="32"
        cy="36"
        rx="14"
        ry="20"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M24 22c2-4 6-6 8-6s6 2 8 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M28 24l4 4 4-4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="40" cy="26" r="5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M22 50c-2 2-2 4 0 4M42 50c2 2 2 4 0 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CatIcon({ className }: IconProps) {
  // Catwoman — cat silhouette with pointed ears.
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 24c0-6 4-10 4-10l6 8h12l6-8s4 4 4 10c0 14-8 24-16 24s-16-10-16-24z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M24 30l4 2M40 30l-4 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M32 36l-2 4h4z" fill="currentColor" />
      <path
        d="M28 42c2 2 6 2 8 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClayIcon({ className }: IconProps) {
  // Clayface — dripping amorphous form.
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14 40c0-12 8-22 18-22s18 10 18 22c0 4-2 8-6 10-2 4-6 6-12 6s-10-2-12-6c-4-2-6-6-6-10z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M18 48c0 3 2 5 4 4M28 52c0 3 2 5 4 4M38 50c0 3 2 5 4 4M46 46c0 3 2 5 4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M26 36c2-2 4-2 6 0M36 36c2-2 4-2 6 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M30 42c1 1 3 1 4 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LeafIcon({ className }: IconProps) {
  // Poison Ivy — vine with thorns and leaf.
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M32 56c0-16 0-30 0-40"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M32 24c-8-2-12-8-12-14 6 0 10 4 12 10zM32 24c8-2 12-8 12-14-6 0-10 4-12 10z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M32 36l-4-2M32 44l4-2M32 30l-4-2M32 50l4-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function KnifeIcon({ className }: IconProps) {
  // Zsasz — blade with tally marks.
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 52L48 16l4 4L16 56z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M48 16l4-4 4 4-4 4z" fill="currentColor" />
      <path
        d="M22 42v4M26 38v4M30 34v4M34 30v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DemonIcon({ className }: IconProps) {
  // Ra's al Ghul — hooded demon head silhouette.
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 24c0-10 8-16 16-16s16 6 16 16c0 8-4 14-8 18-2 4-4 8-8 8s-6-4-8-8c-4-4-8-10-8-18z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M24 28l4 2M40 28l-4 2"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M28 38c2 2 6 2 8 0"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M20 18c4-2 8-2 12 0M44 18c-4-2-8-2-12 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MaskIcon({ className }: IconProps) {
  // Bane — wrestling mask with straps.
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 28c0-8 7-14 16-14s16 6 16 14v8c0 8-7 14-16 14s-16-6-16-14z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M16 32h32M32 14v36"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 28c4-2 8-2 16 0M48 28c-4-2-8-2-16 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 40c4 2 12 2 16 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 36c-2 0-4 2-4 4s2 4 4 4M52 36c2 0 4 2 4 4s-2 4-4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Icon registry — index-aligned to the villains array.               */
/* ------------------------------------------------------------------ */

const villainIcons = [
  JesterIcon,
  CoinIcon,
  SnowflakeIcon,
  QuestionIcon,
  ScarecrowIcon,
  PenguinIcon,
  CatIcon,
  ClayIcon,
  LeafIcon,
  KnifeIcon,
  DemonIcon,
  MaskIcon,
];

/* ------------------------------------------------------------------ */
/* Villain card                                                        */
/* ------------------------------------------------------------------ */

interface VillainCardProps {
  villain: Villain;
  index: number;
  isArchenemy: boolean;
}

function VillainCard({ villain, index, isArchenemy }: VillainCardProps) {
  const reduceMotion = useReducedMotion();
  const Icon = villainIcons[index] ?? JesterIcon;

  const baseClasses =
    "group relative flex h-full flex-col overflow-hidden rounded-lg border p-6 transition-smooth will-change-transform";

  const cardClasses = isArchenemy
    ? `${baseClasses} border-accent/60 bg-card shadow-[0_0_0_1px_oklch(var(--accent)/0.3),0_18px_40px_-12px_oklch(var(--accent)/0.35)]`
    : `${baseClasses} border-border bg-card shadow-[0_12px_30px_-12px_oklch(0.05_0.005_260/0.8)]`;

  const hoverProps = reduceMotion
    ? {}
    : {
        whileHover: {
          y: -8,
          scale: 1.02,
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
        },
      };

  return (
    <motion.article
      data-ocid={`rogues.card.${index + 1}`}
      className={cardClasses}
      variants={{
        hidden: reduceMotion ? {} : { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
        },
      }}
      {...hoverProps}
    >
      {/* Accent glow ring for the archenemy */}
      {isArchenemy && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-lg opacity-60 transition-smooth group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, oklch(var(--accent) / 0.18) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Hover glow layer — subtle accent bloom on lift */}
      <div
        aria-hidden="true"
        className={
          isArchenemy
            ? "pointer-events-none absolute inset-0 rounded-lg opacity-100"
            : "pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-smooth group-hover:opacity-100"
        }
        style={{
          background: isArchenemy
            ? "radial-gradient(ellipse at 50% 100%, oklch(var(--accent) / 0.12) 0%, transparent 65%)"
            : "radial-gradient(ellipse at 50% 100%, oklch(var(--accent) / 0.08) 0%, transparent 65%)",
        }}
      />

      {/* Icon */}
      <div className="relative z-10 mb-5 flex items-center justify-between">
        <Icon
          className={
            isArchenemy
              ? "h-14 w-14 text-accent transition-smooth group-hover:text-glow-accent"
              : "h-14 w-14 text-muted-foreground transition-smooth group-hover:text-accent"
          }
        />
        {isArchenemy && (
          <span
            data-ocid={`rogues.badge.archenemy.${index + 1}`}
            className="rounded-full border border-accent/50 bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-accent"
          >
            Archenemy
          </span>
        )}
      </div>

      {/* Name + alias */}
      <div className="relative z-10 flex-1">
        <h3
          className={
            isArchenemy
              ? "font-display text-xl font-bold tracking-tight text-foreground md:text-2xl"
              : "font-display text-lg font-bold tracking-tight text-foreground md:text-xl"
          }
        >
          {villain.name}
        </h3>
        <p
          className={
            isArchenemy
              ? "mt-1 font-mono text-xs uppercase tracking-[0.2em] text-accent/90"
              : "mt-1 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
          }
        >
          {villain.alias}
        </p>
        <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
          {villain.description}
        </p>
      </div>

      {/* Bottom accent line — grows on hover */}
      <div
        aria-hidden="true"
        className={
          isArchenemy
            ? "relative z-10 mt-6 h-px w-full bg-accent/50"
            : "relative z-10 mt-6 h-px w-0 bg-accent/60 transition-all duration-500 group-hover:w-full"
        }
      />
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function RoguesSection() {
  // The first villain in the data file is the archenemy (The Jester / Joker).
  const archenemyIndex = 0;

  return (
    <section
      id="rogues"
      data-ocid="section.rogues"
      className="relative w-full overflow-hidden bg-card/40 px-4 py-24 md:py-32"
    >
      {/* Atmospheric fog layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-fog opacity-40"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent/80">
            Chapter II
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            The Rogues Gallery
          </h2>
          <p className="mt-6 max-w-2xl font-body text-base text-muted-foreground md:text-lg">
            The city that made the Bat also made his enemies. Each one a mirror,
            each one a question he has to answer.
          </p>
        </ScrollReveal>

        {/* Grid of villain cards */}
        <ScrollReveal
          stagger={0.07}
          distance={28}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {villains.map((villain, index) => (
            <VillainCard
              key={villain.name}
              villain={villain}
              index={index}
              isArchenemy={index === archenemyIndex}
            />
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
