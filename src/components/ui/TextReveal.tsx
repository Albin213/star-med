"use client";

import { motion } from "motion/react";
import { introDelay } from "@/lib/boot";

type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  /** Play on mount (page heroes) instead of when scrolled into view. */
  immediate?: boolean;
};

/**
 * Word-by-word mask reveal. The in-view observer sits on the outer span: the words
 * start clipped out of their masks, so observing them directly would never fire.
 */
export function TextReveal({ text, className, delay = 0, immediate = false }: TextRevealProps) {
  const start = immediate ? introDelay() + delay : delay;
  const trigger = immediate
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, amount: 0.3 } };

  return (
    <motion.span className={className} aria-label={text} initial="hidden" {...trigger}>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="-my-[0.12em] inline-block overflow-hidden py-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "115%" },
              show: {
                y: "0%",
                transition: { duration: 1, delay: start + i * 0.07, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
            {" "}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
