import ScrollReveal from "@/components/ScrollReveal";
import { originBeats, vowQuote } from "@/data/batman";
import { motion, useReducedMotion } from "motion/react";

/**
 * Training timeline — original prose describing Bruce's global journey.
 * Each entry is a year-range and discipline, presented as a vertical timeline.
 */
const trainingTimeline = [
  {
    year: "Age 14",
    place: "Kyoto, Japan",
    discipline: "The Silent Fist",
    text: "He apprenticed himself to a master who had not spoken a student's praise in thirty years. For two years he learned that a fight is won before the first strike — in the breath, the angle, the decision not to be afraid.",
  },
  {
    year: "Age 16",
    place: "Paris, France",
    discipline: "The Detective's Eye",
    text: "Under a disgraced Sûreté inspector he learned to read a crime scene the way a poet reads a line — for what is missing, not what is there. Every shadow, he was taught, is a sentence left unfinished.",
  },
  {
    year: "Age 18",
    place: "Edinburgh, Scotland",
    discipline: "The Chemistry of Fear",
    text: "A toxicologist who had once poisoned for a government taught him how the body betrays itself — and how a single drop, inhaled, can unmake a man's courage in seconds. He took notes. He never forgot a single one.",
  },
  {
    year: "Age 20",
    place: "The Himalayas",
    discipline: "The Mountain of Pain",
    text: "High in a monastery that did not appear on any map, he knelt before a man who called himself the Demon's Head and learned that justice and vengeance wear the same face until you choose between them. He chose. He left.",
  },
  {
    year: "Age 22",
    place: "Cairo, Egypt",
    discipline: "The Art of Disappearance",
    text: "From a thief who had robbed three kings he learned to move through a room as though he had never been in it — to be the silence between footsteps, the breath no one notices, the shadow no one remembers.",
  },
  {
    year: "Age 25",
    place: "Gotham City",
    discipline: "The Return",
    text: "He came home to a manor that had grown colder in his absence and a city that had grown worse. He stood in the entrance hall and understood, at last, that everything he had learned had been rehearsal for one long night — and the night was about to begin.",
  },
];

/** Animated bat silhouette that flies across a panel on scroll-into-view. */
function BatFlight() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 100 40"
        className="absolute right-6 top-6 h-10 w-24 text-accent/40"
      >
        <path
          fill="currentColor"
          d="M50 8c-2 0-3 1-4 2-3-2-7-3-11-2-2 0-3 1-3 2 1 1 2 1 3 1 2 0 3 1 4 2-3 1-5 3-7 5-2 1-4 2-6 2 2 2 5 3 8 3 3 0 6-1 8-3 1 2 3 3 5 3s4-1 5-3c2 2 5 3 8 3 3 0 6-1 8-3-2 0-4-1-6-2-2-2-4-4-7-5 1-1 2-2 4-2 1 0 2 0 3-1 0-1-1-2-3-2-4-1-8 0-11 2-1-1-2-2-4-2z"
        />
      </svg>
    );
  }

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 100 40"
      className="absolute h-12 w-28 text-accent/50"
      initial={{ x: "-110%", y: 0, opacity: 0 }}
      whileInView={{ x: "120%", opacity: [0, 1, 1, 0] }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 2.4,
        ease: [0.4, 0, 0.2, 1],
        opacity: { times: [0, 0.15, 0.85, 1], duration: 2.4 },
      }}
      style={{ top: "1.5rem" }}
    >
      <path
        fill="currentColor"
        d="M50 8c-2 0-3 1-4 2-3-2-7-3-11-2-2 0-3 1-3 2 1 1 2 1 3 1 2 0 3 1 4 2-3 1-5 3-7 5-2 1-4 2-6 2 2 2 5 3 8 3 3 0 6-1 8-3 1 2 3 3 5 3s4-1 5-3c2 2 5 3 8 3 3 0 6-1 8-3-2 0-4-1-6-2-2-2-4-4-7-5 1-1 2-2 4-2 1 0 2 0 3-1 0-1-1-2-3-2-4-1-8 0-11 2-1-1-2-2-4-2z"
      />
    </motion.svg>
  );
}

export default function OriginSection() {
  return (
    <section
      id="origin"
      data-ocid="section.origin"
      className="relative w-full overflow-hidden bg-background px-4 py-24 md:py-32"
    >
      {/* Atmospheric fog layer */}
      <div
        className="pointer-events-none absolute inset-0 bg-fog opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-vignette opacity-40"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Section header */}
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent/80">
            Chapter I
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            The Origin
          </h2>
          <p className="mt-6 max-w-2xl font-body text-base text-muted-foreground md:text-lg">
            Every legend has a wound where it began. This one started in an
            alley and a vow — and it ended, twelve thousand nights later, with a
            shape that the wicked would learn to fear.
          </p>
        </ScrollReveal>

        {/* Sequential story beats — revealed one at a time on scroll */}
        <div className="mt-16 space-y-12 md:mt-24 md:space-y-20">
          {originBeats.map((beat, i) => {
            const isBatBeat = beat.title === "The Bat";
            return (
              <ScrollReveal
                key={beat.title}
                delay={0.05}
                stagger={0.12}
                distance={28}
              >
                <article
                  data-ocid={`section.origin.beat.${i + 1}`}
                  className="group relative overflow-hidden rounded-lg border border-border bg-card/60 p-6 shadow-subtle backdrop-blur-sm transition-smooth hover:border-accent/40 md:p-10"
                >
                  {/* Beat index marker */}
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-xs text-accent/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="h-px w-12 bg-accent/30"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Bat silhouette flies across the "The Bat" panel */}
                  {isBatBeat && <BatFlight />}

                  <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                    {beat.title}
                  </h3>
                  <p className="mt-4 max-w-3xl font-body text-base leading-relaxed text-muted-foreground md:text-lg">
                    {beat.text}
                  </p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Vow quote card — mono font, accent styling */}
        <ScrollReveal delay={0.1} distance={32}>
          <figure
            data-ocid="section.origin.vow"
            className="relative mt-16 overflow-hidden rounded-lg border border-accent/30 bg-card/80 p-8 shadow-gotham md:mt-24 md:p-14"
          >
            {/* Accent corner glow */}
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent/5 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent">
                The Vow
              </p>
              <blockquote className="mt-6 font-mono text-base leading-relaxed text-foreground md:text-xl md:leading-relaxed">
                <span className="text-glow-accent text-accent">&ldquo;</span>
                {vowQuote}
                <span className="text-glow-accent text-accent">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-6 font-body text-sm text-muted-foreground">
                — sworn in Crime Alley, beneath a sky that offered no witness
              </figcaption>
            </div>
          </figure>
        </ScrollReveal>

        {/* Training timeline — vertical, scroll-revealed */}
        <div className="mt-16 md:mt-24">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent/80">
              Chapter II
            </p>
            <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground md:text-4xl">
              The Long Apprenticeship
            </h3>
            <p className="mt-4 max-w-2xl font-body text-base text-muted-foreground md:text-lg">
              For twelve years he walked the world as a student of every dark
              discipline a city like Gotham would one day demand. He returned at
              twenty-five — not yet the Bat, but no longer the boy.
            </p>
          </ScrollReveal>

          <ol
            className="relative mt-12 ml-4 border-l border-border md:ml-8"
            data-ocid="section.origin.timeline"
          >
            {trainingTimeline.map((entry, i) => (
              <ScrollReveal
                key={entry.year}
                as="li"
                delay={0.05}
                stagger={0.1}
                distance={24}
              >
                <div
                  data-ocid={`section.origin.timeline.item.${i + 1}`}
                  className="relative mb-10 pl-8 md:mb-12 md:pl-12"
                >
                  {/* Timeline node */}
                  <span
                    className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-background transition-smooth group-hover:scale-125"
                    aria-hidden="true"
                  />
                  {/* Pulse ring on the node */}
                  <span
                    className="absolute -left-[11px] top-0.5 h-5 w-5 rounded-full border border-accent/40 opacity-0 transition-smooth duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-4">
                    <span className="font-mono text-sm font-semibold text-accent">
                      {entry.year}
                    </span>
                    <span className="font-display text-lg font-semibold text-foreground">
                      {entry.place}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {entry.discipline}
                  </p>
                  <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-muted-foreground md:text-base">
                    {entry.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
