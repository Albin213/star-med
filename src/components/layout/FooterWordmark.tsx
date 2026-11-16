"use client";

import { motion } from "motion/react";

const text = {
  x: "50%",
  y: "50%",
  textAnchor: "middle" as const,
  dominantBaseline: "central" as const,
  textLength: 1160,
  lengthAdjust: "spacingAndGlyphs" as const,
  style: { fontSize: 236, fontWeight: 700, letterSpacing: "-0.04em" },
};

/**
 * The big footer "STARMED": a spectrum outline draws itself in when the footer scrolls
 * into view, then a short cyan light keeps running around the letters. Hover fills it.
 *
 * The display font has overlapping contours, so strokes are drawn at double width and
 * a background-coloured fill is laid on top: only the outer half of each stroke shows.
 */
export function FooterWordmark() {
  return (
    <svg aria-hidden viewBox="0 0 1200 250" className="group mt-20 block w-full select-none overflow-visible">
      <defs>
        <linearGradient id="wm-grad" x1="0" x2="1">
          <stop offset="0" stopColor="#17368c" />
          <stop offset="0.5" stopColor="#3d5fb8" />
          <stop offset="1" stopColor="#71b204" />
        </linearGradient>
        <linearGradient id="wm-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#17368c" stopOpacity="0.18" />
          <stop offset="1" stopColor="#17368c" stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.text
        {...text}
        className="font-display"
        fill="none"
        stroke="url(#wm-grad)"
        strokeOpacity={0.7}
        strokeWidth={3}
        strokeLinejoin="round"
        strokeDasharray="1400"
        initial={{ strokeDashoffset: 1400 }}
        whileInView={{ strokeDashoffset: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 3, ease: [0.65, 0, 0.35, 1] }}
      >
        STARMED
      </motion.text>

      <text
        {...text}
        className="font-display wordmark-run"
        fill="none"
        stroke="#17368c"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        STARMED
      </text>

      <text {...text} className="font-display fill-void">
        STARMED
      </text>

      <text
        {...text}
        fill="url(#wm-fill)"
        className="font-display opacity-30 transition-opacity duration-700 group-hover:opacity-100"
      >
        STARMED
      </text>
    </svg>
  );
}
