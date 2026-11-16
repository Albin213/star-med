"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import type { PointerEvent, ReactNode, RefObject } from "react";

export const heroEase = [0.22, 1, 0.36, 1] as const;

/** Same heartbeat shape as the STARMED logo, stretched across a hero. */
const ecgPath =
  "M0 220 H520 L548 204 L576 236 L604 220 L628 236 L664 40 L712 380 L744 160 L780 220 H1440";

/**
 * Pointer position across an element (-0.5 … 0.5, smoothed) and the element's scroll
 * progress as it leaves the top of the viewport. Both stay at rest for reduced motion.
 */
export function useHeroMotion(ref: RefObject<HTMLElement | null>) {
  const still = useReducedMotion() ?? false;
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 70, damping: 20 });
  const py = useSpring(rawY, { stiffness: 70, damping: 20 });

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (still || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return { still, px, py, progress, onPointerMove };
}

/** ECG line that draws itself in, then carries a travelling pulse. Lifts and fades on scroll. */
export function EcgBackdrop({
  progress,
  start,
  still,
  className = "top-[82%] lg:top-1/2",
}: {
  progress: MotionValue<number>;
  start: number;
  still: boolean;
  className?: string;
}) {
  const y = useTransform(progress, [0, 1], ["-44%", `${still ? -44 : -74}%`]);
  const opacity = useTransform(progress, [0, 1], [0.9, 0.1]);

  return (
    <motion.div
      style={{ y, opacity }}
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 -z-10 h-[clamp(160px,42vh,440px)] ${className}`}
    >
      <svg viewBox="0 0 1440 400" preserveAspectRatio="none" fill="none" className="size-full overflow-visible">
        <defs>
          <linearGradient id="ecg-grad" x1="0" x2="1">
            <stop offset="0" stopColor="#17368c" stopOpacity="0" />
            <stop offset="0.4" stopColor="#17368c" stopOpacity="0.2" />
            <stop offset="0.6" stopColor="#71b204" stopOpacity="0.2" />
            <stop offset="1" stopColor="#71b204" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={ecgPath}
          stroke="url(#ecg-grad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: start + 0.2, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.path
          d={ecgPath}
          pathLength={1}
          stroke="#17368c"
          strokeOpacity={0.4}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className="pulse-travel"
          style={{ filter: "drop-shadow(0 0 1.5px #17368c)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: start + 2.2 }}
        />
      </svg>
    </motion.div>
  );
}

export type Packshot = { src: string; alt: string; w: number; h: number };

/** A packshot that drifts with the pointer (`depth`) and lifts on scroll (`lift`). */
export function FloatingPackshot({
  item,
  className,
  depth,
  lift,
  delay,
  px,
  progress,
  start,
  still,
  sizes = "(min-width: 1024px) 220px, 30vw",
}: {
  item: Packshot;
  className: string;
  depth: number;
  lift: number;
  delay: number;
  px: MotionValue<number>;
  progress: MotionValue<number>;
  start: number;
  still: boolean;
  sizes?: string;
}) {
  const x = useTransform(px, (v) => v * 40 * depth);
  const y = useTransform(progress, [0, 1], [0, still ? 0 : lift]);
  return (
    <motion.div style={{ x, y }} className={`absolute ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 80, filter: "blur(16px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.5, delay: start + delay, ease: heroEase }}
      >
        <motion.div
          animate={still ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 5 + depth * 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={item.w}
            height={item.h}
            sizes={sizes}
            className="h-auto w-full drop-shadow-[0_24px_30px_rgba(14,26,54,0.18)]"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** The hero product: enters with a 3D turn, floats, and tilts toward the pointer. */
export function TiltPackshot({
  item,
  px,
  py,
  start,
  still,
  priority,
  sizes = "(min-width: 1024px) 420px, 80vw",
}: {
  item: Packshot;
  px: MotionValue<number>;
  py: MotionValue<number>;
  start: number;
  still: boolean;
  priority?: boolean;
  sizes?: string;
}) {
  const rotateY = useTransform(px, (v) => v * 20);
  const rotateX = useTransform(py, (v) => -v * 14);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 60, rotateY: -30, filter: "blur(20px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.8, delay: start + 0.1, ease: heroEase }}
    >
      <motion.div
        animate={still ? undefined : { y: [0, -16, 0] }}
        transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut", delay: start + 2 }}
      >
        <motion.div style={{ rotateX, rotateY }} className="[transform-style:preserve-3d]">
          <Image
            src={item.src}
            alt={item.alt}
            width={item.w}
            height={item.h}
            priority={priority}
            sizes={sizes}
            className="h-auto w-full drop-shadow-[0_40px_50px_rgba(14,26,54,0.195)]"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** Tilted orbital rings with travelling nodes, behind the hero product. */
export function OrbitRings({ px, start }: { px: MotionValue<number>; start: number }) {
  const rotate = useTransform(px, (v) => v * 10);
  const rings = [
    { size: "100%", tilt: 74, spin: "animate-spin-slow", node: "bg-cyan shadow-[0_0_14px_4px_rgba(23,54,140,0.32)]", border: "border-cyan/30" },
    { size: "80%", tilt: 66, spin: "animate-spin-slower", node: "bg-lime-bright shadow-[0_0_14px_4px_rgba(77,138,11,0.4)]", border: "border-ink/[0.16]" },
    { size: "118%", tilt: 80, spin: "animate-[spin_26s_linear_infinite]", node: "bg-violet shadow-[0_0_14px_4px_rgba(23,54,140,0.27)]", border: "border-violet/25 border-dashed" },
  ];
  return (
    <motion.div
      aria-hidden
      style={{ rotate }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.8, delay: start + 0.3, ease: heroEase }}
      className="pointer-events-none absolute inset-0 -z-10 grid place-items-center [perspective:900px]"
    >
      {rings.map((r) => (
        <div
          key={r.size}
          className="absolute aspect-square"
          style={{ width: r.size, transform: `rotateX(${r.tilt}deg)` }}
        >
          <div className={`relative size-full rounded-full border ${r.border} ${r.spin}`}>
            <span className={`absolute left-1/2 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${r.node}`} />
            <span className={`absolute bottom-0 left-1/2 size-1.5 -translate-x-1/2 translate-y-1/2 rounded-full ${r.node} opacity-60`} />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

/** Glowing holographic disc under a product; slides opposite the pointer. */
export function HoloPedestal({ px }: { px: MotionValue<number> }) {
  const x = useTransform(px, (v) => -v * 30);
  return (
    <motion.div aria-hidden style={{ x }} className="pointer-events-none absolute inset-x-[8%] bottom-[2%] -z-10 h-[22%]">
      <div className="absolute inset-0 rounded-[50%] bg-[radial-gradient(closest-side,rgba(23,54,140,0.14),rgba(23,54,140,0.036)_60%,transparent)] blur-md" />
      <div className="absolute inset-[18%] rounded-[50%] border border-cyan/40 shadow-[0_0_40px_rgba(23,54,140,0.16)_inset]" />
      <div className="absolute inset-[34%] rounded-[50%] border border-lime-bright/30" />
      <div className="absolute inset-x-[30%] top-1/2 h-[120%] -translate-y-full bg-gradient-to-t from-cyan/20 to-transparent blur-xl" />
    </motion.div>
  );
}

/** Small floating glass readout used around product stages. */
export function HudChip({
  children,
  className = "",
  delay = 0,
  start,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  start: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: start + delay, ease: heroEase }}
      className={`absolute z-20 ${className}`}
    >
      <div className="glass-strong animate-float flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5 font-mono text-[11px] uppercase tracking-wider text-fg shadow-[0_10px_40px_-10px_rgba(14,26,54,0.24)]">
        {children}
      </div>
    </motion.div>
  );
}

/** Hairline with a light running down it, for "scroll to explore" links. */
export function ScrollCue({ href, label = "Scroll to explore" }: { href: string; label?: string }) {
  return (
    <a href={href} className="hidden items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] transition-colors hover:text-cyan lg:flex">
      <i className="scroll-cue relative h-10 w-px overflow-hidden bg-ink/[0.06]" aria-hidden />
      {label}
    </a>
  );
}
