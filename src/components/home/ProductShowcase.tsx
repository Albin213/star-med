"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import type { Product } from "@/data/types";
import { products } from "@/data/products";
import { pickProducts } from "@/lib/catalogue";

const featured = pickProducts([
  "drcare-hyaluronic-acid-serum",
  "mediz-digital-thermometer",
  "dada-cotton-tissue",
  "dada-protective-mask-blue",
  "dermavia-sun-cream-acne",
  "rosemary-mint-shampoo",
  "dada-gel-pack-joint-knee",
  "starmed-diabetic-travel-case",
  "just-fever-cooling-patch",
]);

const pad = (n: number) => String(n).padStart(2, "0");

function ShowcaseCard({
  product,
  index,
  progress,
  still,
}: {
  product: Product;
  index: number;
  progress: MotionValue<number>;
  still: boolean;
}) {
  // Neighbouring cards ride a gentle wave as the row travels.
  const amp = still ? 0 : index % 2 === 0 ? 18 : -18;
  const y = useTransform(progress, [0, 1], [amp, -amp]);

  return (
    <motion.div style={{ y }} className="w-72 shrink-0 [perspective:1200px] lg:w-80">
      <motion.div
        className="relative h-full"
        initial={still ? false : { opacity: 0, y: 90, rotateY: -25, scale: 0.9, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1, delay: Math.min(index, 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-md border border-cyan/30 bg-void/80 px-2 py-1 font-mono text-[10px] font-medium tracking-widest text-cyan backdrop-blur">
          {pad(index + 1)}
        </span>
        <ProductCard product={product} />
      </motion.div>
    </motion.div>
  );
}

/** On desktop, vertical scrolling drives the row sideways; on touch it is a native swipe rail. */
export function ProductShowcase() {
  const section = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [current, setCurrent] = useState(1);
  const still = useReducedMotion() ?? false;

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px) and (min-height: 640px)");
    const measure = () => {
      const width = track.current?.scrollWidth ?? 0;
      setDistance(desktop.matches ? Math.max(0, width - window.innerWidth) : 0);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (track.current) observer.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const pinned = distance > 0;

  // Desktop: progress through the pinned section. Touch: progress along the swipe rail.
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const { scrollXProgress } = useScroll({ container: rail });
  const pinnedRef = useRef(pinned);
  pinnedRef.current = pinned;
  // One stable motion value, so springs and listeners never stay bound to the wrong source.
  const raw = useTransform(() => (pinnedRef.current ? scrollYProgress.get() : scrollXProgress.get()));
  const progress = useSpring(raw, { stiffness: 140, damping: 30, mass: 0.4 });

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  // Lean the cards into fast scrolling, then settle.
  const velocity = useVelocity(progress);
  const skew = useSpring(useTransform(velocity, [-0.6, 0, 0.6], still ? [0, 0, 0] : [5, 0, -5], { clamp: true }), {
    stiffness: 200,
    damping: 30,
  });

  const wordX = useTransform(progress, [0, 1], still ? ["0%", "0%"] : ["8%", "-28%"]);

  useMotionValueEvent(raw, "change", (v) => {
    setCurrent(Math.min(featured.length, Math.max(1, Math.round(v * (featured.length - 1)) + 1)));
  });

  return (
    <section
      ref={section}
      className="relative bg-void text-fg"
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div
        className={`relative isolate flex flex-col justify-center overflow-hidden py-16 ${
          pinned ? "sticky top-0 h-screen" : ""
        }`}
      >
        {/* Oversized outline wordmark drifting against the row */}
        <motion.p
          aria-hidden
          style={{ x: wordX }}
          className="text-outline pointer-events-none absolute bottom-[4%] left-0 -z-10 whitespace-nowrap font-display text-[clamp(6rem,16vw,15rem)] font-bold leading-none"
        >
          Dr.Care · DADA · Mediz · Dermavia · Just+
        </motion.p>
        <div className="grid-lines mask-fade absolute inset-0 -z-20 opacity-50" />
        <div className="orb -right-40 top-0 -z-10 size-[34rem] bg-violet/30" />
        <div className="orb -left-40 bottom-0 -z-10 size-[28rem] bg-cyan/15" style={{ animationDelay: "-7s" }} />

        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-end justify-between gap-6 px-5 sm:px-8">
          <div>
            <SectionLabel index="03">Explore our</SectionLabel>
            <h2 className="mt-5 text-4xl font-semibold sm:text-6xl">
              <TextReveal text="Top products" />
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-4 sm:flex" aria-hidden>
              <span className="font-mono text-sm tabular-nums text-fg">
                <span className="text-cyan">{pad(current)}</span>
                <span className="text-faint"> / {pad(featured.length)}</span>
              </span>
              <span className="relative h-px w-28 overflow-hidden bg-ink/[0.06]">
                <motion.span
                  style={{ scaleX: progress }}
                  className="absolute inset-0 origin-left bg-gradient-to-r from-cyan to-lime-bright shadow-[0_0_8px_#17368c]"
                />
              </span>
            </div>
            <Magnetic>
              <Button href="/products" variant="glass">
                View all {products.length} products
              </Button>
            </Magnetic>
          </div>
        </div>

        <div
          ref={rail}
          className={pinned ? "mt-12" : "mt-10 snap-x snap-mandatory overflow-x-auto pb-6 [scrollbar-width:none]"}
        >
          <motion.div
            ref={track}
            style={pinned ? { x, skewX: skew } : { skewX: skew }}
            className="flex w-max gap-5 px-5 py-6 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] [&>*]:snap-start"
          >
            {featured.map((product, i) => (
              <ShowcaseCard key={product.id} product={product} index={i} progress={progress} still={still} />
            ))}
          </motion.div>
        </div>

        <p className="mx-auto mt-4 w-full max-w-7xl px-5 font-mono text-xs uppercase tracking-[0.14em] text-faint sm:px-8 lg:hidden">
          Swipe to explore · <span className="text-cyan">{pad(current)}</span> / {pad(featured.length)}
        </p>
      </div>
    </section>
  );
}
