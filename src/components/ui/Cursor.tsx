"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/** A glowing dot with a lagging ring. It swells over links and buttons. Precise pointers only. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setHovering(Boolean(target?.closest?.("a, button, [role='button'], label, select")));
    };
    const leave = () => setVisible(false);
    const press = () => setDown(true);
    const release = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[150]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div
        style={{ x: rx, y: ry }}
        className="absolute left-0 top-0"
      >
        <motion.div
          animate={{ scale: hovering ? 1.9 : down ? 0.7 : 1, opacity: hovering ? 1 : 0.6 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className={`-ml-5 -mt-5 size-10 rounded-full border transition-colors duration-300 ${
            hovering ? "border-lime-bright/80 bg-lime-bright/10" : "border-cyan/60"
          }`}
        />
      </motion.div>
      <motion.div style={{ x, y }} className="absolute left-0 top-0">
        <div className="-ml-[3px] -mt-[3px] size-1.5 rounded-full bg-cyan shadow-[0_0_12px_3px_rgba(23,54,140,0.32)]" />
      </motion.div>
    </div>
  );
}
