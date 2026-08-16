# Design Brief

## Direction

Gotham Nocturne — a cinematic dark showcase landing page for Batman's story, rogues, allies, and arsenal.

## Tone

Brutalist editorial darkness executed with conviction: deep Gotham blacks, sharp 0-4px radii, and a single restrained yellow bat-signal accent — no soft rounded shapes, no rainbow palettes, no purple-gradient cliché.

## Differentiation

A single yellow bat-signal glow piercing layered fog, rain, and skyline silhouettes — one unforgettable atmospheric signature rather than scattered effects.

## Color Palette

| Token      | OKLCH           | Role                          |
| ---------- | --------------- | ----------------------------- |
| background | 0.13 0.006 260  | Gotham night black            |
| foreground | 0.93 0.008 260  | Slate-white body text         |
| card       | 0.17 0.008 260  | Elevated slate panels         |
| primary    | 0.82 0.16 85    | Bat-signal yellow (CTAs)      |
| accent     | 0.82 0.16 85     | Highlights, active states      |
| muted      | 0.2 0.008 260   | Secondary surfaces, captions  |
| secondary  | 0.21 0.008 260  | Tertiary panels, badges        |
| destructive| 0.6 0.2 25      | Joker / villain emphasis      |

## Typography

- Display: Space Grotesk — hero headlines, section titles, bat-symbol labels (geometric, confident)
- Body: General Sans — paragraphs, ally/villain descriptions, UI labels
- Mono: Geist Mono — quotes, timeline dates, section eyebrows
- Scale: hero `text-5xl md:text-8xl font-bold tracking-tight`, h2 `text-3xl md:text-6xl font-bold tracking-tight`, label `text-xs font-mono tracking-[0.3em] uppercase`, body `text-base md:text-lg`

## Elevation & Depth

Layered atmospheric depth: fog gradients, rain canvas, skyline silhouettes, and a bat-signal beam — shadows are deep and cinematic (`shadow-gotham`, `shadow-elevated`), never neon-glow.

## Structural Zones

| Zone    | Background           | Border           | Notes                                              |
| ------- | -------------------- | ---------------- | -------------------------------------------------- |
| Header  | `bg-card/80` + blur  | `border-b`       | Fixed nav, darkens + blurs on scroll               |
| Hero    | `bg-background` + fog| —                | Full-viewport, 3D bat-symbol, mist, scroll cue     |
| Content | `bg-background` / `bg-muted/30` alt | — | Alternating sections for rhythm                    |
| Cards   | `bg-card`            | `border`         | Sharp 4px radius, hover lift + accent glow          |
| Footer  | `bg-muted/40` + skyline | `border-t`    | Skyline silhouette, flickering windows, watermark  |

## Spacing & Rhythm

Generous cinematic spacing — sections `py-24 md:py-32`, hero `min-h-screen`, card grids `gap-6 md:gap-8`, tight `tracking-tight` headings vs. loose `tracking-[0.3em]` mono labels.

## Component Patterns

- Buttons: sharp 4px radius, `bg-primary text-primary-foreground`, hover darkens + `shadow-gotham`
- Cards: 4px radius, `bg-card border border-border`, hover `-translate-y-1` + accent ring
- Badges: mono uppercase `text-xs tracking-[0.3em]`, `bg-secondary` pill
- Joker card: distinct `destructive` accent treatment, larger glow

## Motion

- Entrance: staggered `fade-rise` (0.7s cubic-bezier) on scroll via Framer Motion `whileInView`
- Hover: cards lift `-translate-y-1` + `shadow-gotham`, 0.3s smooth
- Decorative: 3D bat-symbol rotation + `bat-glow` pulse, `fog-drift` 20s, `signal-sweep` 8s, rain canvas, window `flicker`, cursor bat-trail
- Reduced motion: animations gracefully disabled on small screens via `motion-reduce` + breakpoint guards

## Constraints

- Dark-mode-first (`.dark` is the primary theme); light mode is a fallback
- No external images — all bat/villain/ally icons are custom SVG silhouettes
- No audio, no interactive bat-signal projection button (per doNotBuild)
- Yellow accent used sparingly — primary CTAs, active nav, bat-symbol, Joker distinction only
- Max 3-5 colors; sharp radii only (0-4px)

## Signature Detail

A single rotating 3D bat-symbol emitting a pulsing yellow `bat-glow` through drifting fog at the hero — the one moment that anchors the entire Gotham atmosphere.
