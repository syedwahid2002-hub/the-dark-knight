import ScrollReveal from "@/components/ScrollReveal";
import { type Ally, allies } from "@/data/batman";
import { motion, useReducedMotion } from "motion/react";

/** The two foundational human allies — emphasized with distinct accent treatment. */
const FOUNDATIONAL_ALLIES = new Set<string>([
  "Alfred Pennyworth",
  "Commissioner Barbara Gordon",
]);

function isFoundational(ally: Ally): boolean {
  return FOUNDATIONAL_ALLIES.has(ally.name);
}

function AllyCard({ ally, index }: { ally: Ally; index: number }) {
  const reduceMotion = useReducedMotion();
  const foundational = isFoundational(ally);

  return (
    <motion.article
      data-ocid={`allies.card.${index + 1}`}
      variants={{
        hidden: reduceMotion ? {} : { opacity: 0, y: 28, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }
      }
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-lg border p-6",
        "transition-smooth",
        foundational
          ? "border-accent/40 bg-card shadow-[0_0_32px_-8px_oklch(var(--accent)/0.35)] md:p-8"
          : "border-border bg-card hover:border-accent/30 hover:shadow-[0_0_24px_-12px_oklch(var(--accent)/0.4)]",
      ].join(" ")}
    >
      {/* Accent corner mark — stronger on foundational cards */}
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute right-0 top-0 h-16 w-16",
          "bg-gradient-to-bl from-accent/15 to-transparent",
          "opacity-60 transition-smooth group-hover:opacity-100",
          foundational ? "h-24 w-24 from-accent/25" : "",
        ].join(" ")}
      />

      {/* Foundational sigil — a small bat-mark in the accent color */}
      {foundational && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -top-2 font-mono text-[10px] uppercase tracking-[0.3em] text-accent/70"
        >
          ◆ Founding
        </span>
      )}

      <div className="relative flex flex-1 flex-col">
        <p
          className={[
            "font-mono text-[11px] uppercase tracking-[0.3em]",
            foundational ? "text-accent" : "text-muted-foreground",
          ].join(" ")}
        >
          {ally.role}
        </p>

        <h3
          className={[
            "mt-3 font-display font-bold tracking-tight text-foreground",
            foundational ? "text-2xl md:text-3xl" : "text-xl md:text-2xl",
          ].join(" ")}
        >
          {ally.name}
        </h3>

        {/* Divider — accent for foundational, muted otherwise */}
        <span
          aria-hidden="true"
          className={[
            "mt-4 h-px w-12 transition-smooth group-hover:w-20",
            foundational
              ? "bg-accent/60"
              : "bg-border group-hover:bg-accent/50",
          ].join(" ")}
        />

        <p
          className={[
            "mt-4 font-body text-sm leading-relaxed text-muted-foreground",
            foundational ? "md:text-base" : "md:text-[15px]",
          ].join(" ")}
        >
          {ally.description}
        </p>
      </div>

      {/* Bottom glow line on hover */}
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-x-6 bottom-0 h-px",
          "origin-left scale-x-0 bg-accent/60 transition-smooth group-hover:scale-x-100",
          foundational ? "scale-x-100" : "",
        ].join(" ")}
      />
    </motion.article>
  );
}

/**
 * Allies section — the people who keep the Bat human.
 * Foundational allies (Alfred, Commissioner Gordon) receive distinct accent
 * treatment and larger card styling. Cards reveal with stagger on scroll and
 * lift on hover.
 */
export default function AlliesSection() {
  return (
    <section
      id="allies"
      data-ocid="section.allies"
      className="relative w-full overflow-hidden bg-background px-4 py-24 md:px-6 md:py-32"
    >
      {/* Atmospheric fog layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-fog opacity-70"
      />

      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent/80">
            Chapter IV
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            The Allies
          </h2>
          <p className="mt-6 max-w-2xl font-body text-base text-muted-foreground md:text-lg">
            No one walks the night alone for long. These are the few who hold
            the line beside him — two of them the human bedrock without which
            the rest could not stand.
          </p>
        </ScrollReveal>

        {/* Foundational pair — emphasized, full-width row */}
        <ScrollReveal
          className="mt-14 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2"
          stagger={0.12}
          distance={32}
        >
          {allies
            .filter((ally) => isFoundational(ally))
            .map((ally, i) => (
              <AllyCard key={ally.name} ally={ally} index={i} />
            ))}
        </ScrollReveal>

        {/* The rest of the family — denser responsive grid */}
        <ScrollReveal
          className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          stagger={0.08}
          distance={24}
        >
          {allies
            .filter((ally) => !isFoundational(ally))
            .map((ally, i) => (
              <AllyCard
                key={ally.name}
                ally={ally}
                index={i + 2 /* after the two foundational cards */}
              />
            ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
