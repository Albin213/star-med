"use client";

import { motion } from "motion/react";
import { Counter } from "@/components/ui/Counter";
import { stats } from "@/data/site";

const TICKS = 48;

/** Decorative dial: ticks light up in sequence once in view, an outer dashed ring turns. */
function Dial({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className="absolute inset-0 size-full">
      <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(23,54,140,0.1)" strokeDasharray="2 6" className="radar" style={{ animationDuration: `${24 + index * 6}s` }} />
      {Array.from({ length: TICKS }, (_, i) => {
        const a = (i / TICKS) * Math.PI * 2 - Math.PI / 2;
        const long = i % 4 === 0;
        const r1 = long ? 74 : 78;
        const r2 = 86;
        return (
          <motion.line
            key={i}
            x1={(100 + Math.cos(a) * r1).toFixed(3)}
            y1={(100 + Math.sin(a) * r1).toFixed(3)}
            x2={(100 + Math.cos(a) * r2).toFixed(3)}
            y2={(100 + Math.sin(a) * r2).toFixed(3)}
            strokeWidth={long ? 2 : 1.2}
            strokeLinecap="round"
            initial={{ stroke: "rgba(14,26,54,0.1)" }}
            whileInView={{ stroke: i / TICKS < 0.5 ? "#17368c" : "#71b204" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.2, delay: 0.2 + i * 0.03 + index * 0.1 }}
          />
        );
      })}
    </svg>
  );
}

export function Stats() {
  return (
    <section className="relative isolate overflow-hidden border-y border-ink/[0.09] bg-deep">
      <div className="grid-dots mask-fade absolute inset-0 -z-10 opacity-40" />
      <div className="orb left-1/2 top-1/2 -z-10 size-[40rem] -translate-x-1/2 -translate-y-1/2 bg-cyan/10" />
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-10 px-5 py-20 sm:px-8 lg:grid-cols-4 lg:py-24">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <div className="relative grid aspect-square w-full max-w-[13rem] place-items-center">
              <Dial index={i} />
              <dd className="relative font-display text-[clamp(1.5rem,2.6vw,2.4rem)] font-semibold tracking-tight">
                <span className="text-spectrum">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
              </dd>
            </div>
            <dt className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-dim">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
