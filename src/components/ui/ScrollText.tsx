"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

type ScrollTextProps = {
  text: string;
  /** Words to light up in lime, matched case-insensitively without punctuation. */
  accent?: string[];
  className?: string;
};

const clean = (w: string) => w.toLowerCase().replace(/[^a-z0-9-]/g, "");

function Word({
  word,
  range,
  progress,
  accent,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, ["0.18em", "0em"]);
  return (
    <motion.span style={{ opacity, y }} className={`inline-block ${accent ? "text-cyan" : ""}`}>
      {word}&nbsp;
    </motion.span>
  );
}

/** Paragraph whose words brighten one by one as it scrolls through the viewport. */
export function ScrollText({ text, accent = [], className }: ScrollTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const words = text.split(" ");
  const accents = new Set(accent.map(clean));

  if (still) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => {
        const start = i / words.length;
        return (
          <span key={`${word}-${i}`} aria-hidden>
            <Word
              word={word}
              range={[start, Math.min(1, start + 2.5 / words.length)]}
              progress={scrollYProgress}
              accent={accents.has(clean(word))}
            />
          </span>
        );
      })}
    </p>
  );
}
