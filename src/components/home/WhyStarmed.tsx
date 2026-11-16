"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";

const reasons = [
  "Strategically located in Abu Dhabi’s industrial hub",
  "Exclusive ownership of reputable, fast-growing product brands",
  "Strong market presence supported by our sister company Dada Drug Store",
  "Wide distribution network across UAE and GCC",
  "Committed to compliance, quality, and customer satisfaction",
];

export function WhyStarmed() {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="relative isolate overflow-hidden">
      <div className="grid-lines mask-fade absolute inset-0 -z-10 opacity-40" />
      <div className="orb -left-40 top-1/3 -z-10 size-[30rem] bg-violet/20" />
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-28 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-36">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionLabel index="04">Why choose STARMED</SectionLabel>
          <blockquote className="mt-6">
            <p className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              <TextReveal text="STARMED delivers more than products. It delivers healthcare confidence across the UAE." />
            </p>
            <footer className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-dim">
              <span className="h-px w-10 bg-cyan" aria-hidden />
              STARMED General Trading LLC · Established 2020 · Mussafah M-16, Abu Dhabi
            </footer>
          </blockquote>
        </div>

        <ol ref={list} className="relative pl-12">
          {/* Timeline rail that fills with light as the list scrolls past */}
          <span aria-hidden className="absolute bottom-6 left-[15px] top-6 w-px bg-ink/[0.06]" />
          <motion.span
            aria-hidden
            style={{ scaleY: fill }}
            className="absolute bottom-6 left-[15px] top-6 w-px origin-top bg-gradient-to-b from-cyan via-violet to-lime-bright shadow-[0_0_10px_rgba(23,54,140,0.32)]"
          />
          {reasons.map((reason, i) => (
            <Reveal key={reason} delay={i * 0.06}>
              <li data-spot className="glass group relative mb-4 rounded-2xl p-6 transition-colors duration-500 hover:border-cyan/30">
                <span className="absolute -left-[41px] top-1/2 grid size-[18px] -translate-y-1/2 place-items-center rounded-full border border-cyan/50 bg-void">
                  <span className="size-1.5 rounded-full bg-cyan shadow-[0_0_10px_#17368c]" />
                </span>
                <span className="font-mono text-xs text-cyan">0{i + 1}</span>
                <p className="mt-2 text-lg leading-snug text-fg">{reason}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
