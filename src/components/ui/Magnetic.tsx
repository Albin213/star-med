"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  /** How far the element follows the pointer, as a share of the pointer's offset. */
  strength?: number;
  className?: string;
};

/** Pulls its child gently toward the pointer, then springs back on leave. Mouse only. */
export function Magnetic({ children, strength = 0.3, className = "" }: MagneticProps) {
  const reduced = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.6 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength * 1.3);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
}
