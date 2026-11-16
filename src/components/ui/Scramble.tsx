"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&+/<>*";

type ScrambleProps = {
  text: string;
  className?: string;
  /** Seconds before decoding starts. */
  delay?: number;
};

/** Text that decodes from random glyphs, left to right, the first time it is seen. */
export function Scramble({ text, className, delay = 0 }: ScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!inView || reduced) return;
    let frame = 0;
    let raf = 0;
    const total = Math.max(18, text.length * 1.6);
    const timer = window.setTimeout(() => {
      const tick = () => {
        frame++;
        const solved = Math.floor((frame / total) * text.length);
        setOut(
          text
            .split("")
            .map((ch, i) => {
              if (ch === " " || i < solved) return ch;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join(""),
        );
        if (solved < text.length) raf = requestAnimationFrame(tick);
        else setOut(text);
      };
      tick();
    }, delay * 1000);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [inView, reduced, text, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
}
