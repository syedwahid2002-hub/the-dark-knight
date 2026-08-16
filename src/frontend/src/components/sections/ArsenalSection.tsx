import ScrollReveal from "@/components/ScrollReveal";
import { type ArsenalItem, arsenal } from "@/data/batman";
import { type Variants, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Custom SVG silhouettes — one per arsenal item, no external assets. */
/* Each icon is a stylized bat-silhouette interpretation drawn from    */
/* the item's function rather than a literal photograph.              */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string };

function BatsuitIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M32 6c-7 0-12 4-13 9-3-1-6-1-8 0-1 4 1 7 4 9-2 2-3 5-3 8 0 6 4 11 9 13 1 3 4 5 7 5h8c3 0 6-2 7-5 5-2 9-7 9-13 0-3-1-6-3-8 3-2 5-5 4-9-2-1-5-1-8 0-1-5-6-9-13-9Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M26 22c-2 4-2 8 0 12M38 22c2 4 2 8 0 12M32 18v28"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M28 14c2-2 8-2 10 0"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* cowl ears */}
      <path d="M24 10l-2 6 4-2ZM40 10l2 6-4-2Z" fill="currentColor" />
      {/* cape hint */}
      <path
        d="M14 24c-2 8-2 18 2 26 4-6 6-14 6-22M50 24c2 8 2 18-2 26-4-6-6-14-6-22"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

function GrappleGunIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* launcher body */}
      <rect
        x="14"
        y="34"
        width="28"
        height="10"
        rx="2"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* grip */}
      <path
        d="M22 44v8c0 2 2 4 4 4h2c2 0 4-2 4-4v-8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* barrel tip */}
      <path
        d="M42 36h6l4-2v8l-4-2h-6"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* fired line + hook arcing up */}
      <path
        d="M48 34c4-6 8-14 4-22-2-4-6-4-8 0-2 4 0 8 4 8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="2 3"
        opacity="0.8"
      />
      <path
        d="M44 12c-2-2-2-6 0-8 2 2 2 6 0 8Z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}

function BatarangIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* bat-shaped throwing blade, symmetric */}
      <path
        d="M32 14c-3 4-7 6-12 6 2 3 2 7 0 10 5-1 9 1 12 5 3-4 7-6 12-5-2-3-2-7 0-10-5 0-9-2-12-6Z"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* wing notches */}
      <path
        d="M20 20l-4-2M20 30l-4 2M44 20l4-2M44 30l4 2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* center grip */}
      <circle cx="32" cy="22" r="2.5" fill="currentColor" opacity="0.8" />
      <path
        d="M32 24v6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

function BatmobileIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 80 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* low slung armored body */}
      <path
        d="M6 26c0-3 2-5 5-6l8-2c4-6 10-9 18-9s14 3 18 9l8 2c3 1 5 3 5 6 0 3-2 5-5 5l-3-1c-1 3-4 5-7 5H21c-3 0-6-2-7-5l-3 1c-3 0-5-2-5-5Z"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* cockpit canopy */}
      <path
        d="M30 12c4-2 16-2 20 0 2 2 2 5 0 7-4 2-16 2-20 0-2-2-2-5 0-7Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {/* front turbine intake */}
      <circle cx="12" cy="24" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="12" cy="24" r="1.2" fill="currentColor" />
      {/* wheels */}
      <circle
        cx="22"
        cy="30"
        r="5"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="22" cy="30" r="1.8" fill="currentColor" />
      <circle
        cx="58"
        cy="30"
        r="5"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="58" cy="30" r="1.8" fill="currentColor" />
      {/* rear jet exhaust glow */}
      <path
        d="M70 22h6M70 26h6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* fin */}
      <path d="M40 12l-2-6h4l-2 6Z" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function UtilityBeltIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* belt strap */}
      <rect
        x="8"
        y="26"
        width="48"
        height="12"
        rx="2"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* buckle */}
      <rect
        x="26"
        y="22"
        width="12"
        height="20"
        rx="2"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M30 28h4M30 32h4M30 36h4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* canisters */}
      <circle
        cx="14"
        cy="32"
        r="3"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle
        cx="50"
        cy="32"
        r="3"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect
        x="19"
        y="29"
        width="3"
        height="6"
        rx="1"
        fill="currentColor"
        opacity="0.5"
      />
      <rect
        x="42"
        y="29"
        width="3"
        height="6"
        rx="1"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}

function BatcomputerIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* mainframe tower */}
      <rect
        x="14"
        y="10"
        width="36"
        height="44"
        rx="2"
        fill="currentColor"
        fillOpacity="0.10"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* screen */}
      <rect
        x="20"
        y="16"
        width="24"
        height="14"
        rx="1"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {/* screen content lines */}
      <path
        d="M23 20h10M23 23h14M23 26h8"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.8"
      />
      {/* drive bays */}
      <rect
        x="20"
        y="34"
        width="24"
        height="3"
        rx="1"
        fill="currentColor"
        opacity="0.4"
      />
      <rect
        x="20"
        y="40"
        width="24"
        height="3"
        rx="1"
        fill="currentColor"
        opacity="0.4"
      />
      <rect
        x="20"
        y="46"
        width="24"
        height="3"
        rx="1"
        fill="currentColor"
        opacity="0.4"
      />
      {/* status lights */}
      <circle cx="46" cy="22" r="1.2" fill="currentColor" />
    </svg>
  );
}

function CapeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* shoulders */}
      <path
        d="M20 14c4-3 20-3 24 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* flowing cape — scalloped bat-wing edge */}
      <path
        d="M20 14c-2 8-4 18-2 30 2-4 4-6 6-6 2 4 2 8 2 12 2-4 4-6 6-6 2 4 2 8 2 12 2-4 4-6 6-6 2-12 0-24-2-30"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* inner fold lines */}
      <path
        d="M26 18c-1 8-1 16 1 24M38 18c1 8 1 16-1 24"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

function SmokePelletIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* capsule */}
      <rect
        x="24"
        y="22"
        width="16"
        height="20"
        rx="8"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M24 30h16"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.6"
      />
      {/* bloom — expanding smoke */}
      <path
        d="M32 22c0-4-2-6-6-6-2 0-4 2-4 4 0 2 2 4 4 4M32 22c0-4 2-6 6-6 2 0 4 2 4 4 0 2-2 4-4 4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M20 14c-2-2-2-4 0-6M44 14c2-2 2-4 0-6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Map each arsenal item name to its silhouette icon.                  */
/* ------------------------------------------------------------------ */

const ICONS: Record<string, (props: IconProps) => ReactNode> = {
  "The Batsuit": BatsuitIcon,
  "The Grapple Gun": GrappleGunIcon,
  "The Batarang": BatarangIcon,
  "The Batmobile": BatmobileIcon,
  "The Utility Belt": UtilityBeltIcon,
  "The Batcomputer": BatcomputerIcon,
  "The Cape": CapeIcon,
  "The Smoke Pellet": SmokePelletIcon,
};

/* The signature vehicle — gets the featured card treatment. */
const FEATURED = "The Batmobile";

/* ------------------------------------------------------------------ */
/* Arsenal card                                                        */
/* ------------------------------------------------------------------ */

interface ArsenalCardProps {
  item: ArsenalItem;
  index: number;
  featured?: boolean;
}

function ArsenalCard({ item, index, featured = false }: ArsenalCardProps) {
  const reduceMotion = useReducedMotion();
  const Icon = ICONS[item.name] ?? BatarangIcon;

  const cardVariants: Variants = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.article
      data-ocid={`arsenal.card.${index}`}
      variants={cardVariants}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-lg border bg-card/60 backdrop-blur-sm",
        "border-border shadow-subtle transition-smooth",
        "hover:border-accent/40 hover:shadow-gotham",
        featured ? "md:col-span-2 md:row-span-2" : "",
      ].join(" ")}
    >
      {/* hover glow — radial accent that fades in on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(var(--accent) / 0.18) 0%, transparent 65%)",
        }}
      />
      {/* top hairline accent that lights up on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex flex-1 flex-col p-6 md:p-8">
        {/* icon */}
        <div
          className={[
            "flex items-center justify-center rounded-md border border-border/60 bg-background/40",
            "text-accent transition-smooth group-hover:text-accent group-hover:[filter:drop-shadow(0_0_16px_oklch(var(--accent)/0.5))]",
            featured ? "h-32 w-32" : "h-20 w-20",
          ].join(" ")}
        >
          <Icon className={featured ? "h-20 w-20" : "h-12 w-12"} />
        </div>

        {/* name */}
        <h3
          className={[
            "mt-6 font-display font-bold tracking-tight text-foreground",
            featured ? "text-2xl md:text-3xl" : "text-xl",
          ].join(" ")}
        >
          {item.name}
        </h3>

        {/* featured badge */}
        {featured && (
          <span className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_oklch(var(--accent))]" />
            Signature Vehicle
          </span>
        )}

        {/* description */}
        <p
          className={[
            "mt-4 font-body text-muted-foreground",
            featured
              ? "text-base md:text-lg leading-relaxed"
              : "text-sm leading-relaxed",
          ].join(" ")}
        >
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Arsenal section                                                     */
/* ------------------------------------------------------------------ */

export default function ArsenalSection() {
  const reduceMotion = useReducedMotion();

  const gridVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
        delayChildren: 0.05,
      },
    },
  };

  return (
    <section
      id="arsenal"
      data-ocid="section.arsenal"
      className="relative w-full overflow-hidden bg-card/40 px-4 py-24 md:py-32"
    >
      {/* atmospheric fog layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-fog opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-vignette opacity-40"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* header */}
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent/80">
            Chapter IV
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            The Arsenal
          </h2>
          <p className="mt-6 max-w-2xl font-body text-base text-muted-foreground md:text-lg">
            Fear is a tool. So is everything else in the cave.
          </p>
        </ScrollReveal>

        {/* grid — 1 col mobile, 2 tablet, 4 desktop; featured spans 2x2 */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 md:gap-6"
          data-ocid="arsenal.grid"
        >
          {arsenal.map((item, i) => (
            <ArsenalCard
              key={item.name}
              item={item}
              index={i}
              featured={item.name === FEATURED}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
