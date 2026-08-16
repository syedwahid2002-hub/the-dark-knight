import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Origin", href: "#origin", ocid: "nav.origin" },
  { label: "Rogues", href: "#rogues", ocid: "nav.rogues" },
  { label: "Allies", href: "#allies", ocid: "nav.allies" },
  { label: "Arsenal", href: "#arsenal", ocid: "nav.arsenal" },
] as const;

function BatLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M32 4c-1.6 2.2-2.4 4.6-2.6 7.2-2.4-1.6-5-2.4-7.8-2.4-1.4 0-2.8.2-4.2.6 1.2 1 2 2.2 2.4 3.6-3.2-.4-6.4.4-9 2.2 1.6.6 3 1.6 4 3-2.8.4-5.4 1.8-7.4 4 1.8.2 3.4.8 4.8 1.8-1.6 1-2.8 2.4-3.6 4.2 2.4-.6 4.8-.4 7 .6-1 1.4-1.4 3-1.2 4.8 2-1.6 4.4-2.4 7-2.4.4 1.8 1.4 3.4 3 4.6 1-1.6 1.6-3.4 1.6-5.4 0-.4 0-.8-.1-1.2 1.4.6 3 .9 4.6.9s3.2-.3 4.6-.9c-.1.4-.1.8-.1 1.2 0 2 .6 3.8 1.6 5.4 1.6-1.2 2.6-2.8 3-4.6 2.6 0 5 .8 7 2.4.2-1.8-.2-3.4-1.2-4.8 2.2-1 4.6-1.2 7-.6-.8-1.8-2-3.2-3.6-4.2 1.4-1 3-1.6 4.8-1.8-2-2.2-4.6-3.6-7.4-4 1-1.4 2.4-2.4 4-3-2.6-1.8-5.8-2.6-9-2.2.4-1.4 1.2-2.6 2.4-3.6-1.4-.4-2.8-.6-4.2-.6-2.8 0-5.4.8-7.8 2.4C34.4 8.6 33.6 6.2 32 4z"
      />
    </svg>
  );
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
  };

  const handleLogoClick = () => {
    const target = document.querySelector("#hero");
    if (target) {
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
  };

  return (
    <motion.header
      data-ocid="navbar"
      initial={false}
      animate={{
        backgroundColor: scrolled
          ? "oklch(0.13 0.006 260 / 0.85)"
          : "oklch(0.13 0.006 260 / 0)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        borderColor: scrolled
          ? "oklch(0.26 0.008 260 / 0.8)"
          : "oklch(0.26 0.008 260 / 0)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b"
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <button
          type="button"
          data-ocid="nav.logo"
          onClick={handleLogoClick}
          className="flex items-center gap-3 text-accent transition-smooth hover:text-glow-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          aria-label="The Dark Knight — back to top"
        >
          <BatLogo className="h-6 w-12 md:h-7 md:w-14 animate-bat-glow" />
          <span className="font-display text-sm font-semibold tracking-[0.2em] text-foreground uppercase md:text-base">
            The Dark Knight
          </span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-ocid={link.ocid}
                onClick={(e) => handleNavClick(e, link.href)}
                className="rounded-md px-4 py-2 font-body text-sm text-muted-foreground transition-smooth hover:text-accent hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile: compact anchor list */}
        <ul className="flex items-center gap-0.5 md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-ocid={link.ocid}
                onClick={(e) => handleNavClick(e, link.href)}
                className="rounded-md px-2.5 py-2 font-body text-xs text-muted-foreground transition-smooth hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
