import { type Variants, motion, useReducedMotion } from "motion/react";
import { Children, type ReactNode, isValidElement } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  /** Delay before the container itself begins revealing, in seconds. */
  delay?: number;
  /** Stagger between successive children, in seconds. */
  stagger?: number;
  /** Vertical rise distance in pixels. */
  distance?: number;
  className?: string;
  /** Render as a different element (default: div). */
  as?: "div" | "section" | "ul" | "li" | "article";
}

/**
 * Fades and rises children into view as the container enters the viewport.
 * Honors prefers-reduced-motion by rendering children visible immediately.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  stagger = 0.08,
  distance = 24,
  className,
  as = "div",
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const item: Variants = {
    hidden: reduceMotion ? {} : { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {Array.isArray(children) ? (
        Children.map(children, (child) => {
          const stableKey = isValidElement(child) ? child.key : undefined;
          return (
            <motion.div key={stableKey} variants={item}>
              {child}
            </motion.div>
          );
        })
      ) : (
        <motion.div variants={item}>{children}</motion.div>
      )}
    </MotionTag>
  );
}
