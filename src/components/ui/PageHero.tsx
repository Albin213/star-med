"use client";

import { motion, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { introDelay } from "@/lib/boot";
import {
  EcgBackdrop,
  FloatingPackshot,
  heroEase as ease,
  HoloPedestal,
  OrbitRings,
  ScrollCue,
  TiltPackshot,
  useHeroMotion,
  type Packshot,
} from "./HeroFx";
import { ParticleField } from "./ParticleField";
import { Scramble } from "./Scramble";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  /** Words of the title to light up, matched case-insensitively. */
  accent?: string[];
  description?: string;
  children?: ReactNode;
  /** Up to three packshots: the first tilts centre stage, the others float behind and in front. */
  packshots?: Packshot[];
  /** Short facts for the strip along the bottom of the hero. */
  meta?: { value: string; label: string }[];
};

const satelliteSlots = [
  { className: "left-[0%] top-[4%] w-[32%] -z-10", depth: 0.5, lift: -180, delay: 0.35 },
  { className: "bottom-[4%] right-[-2%] w-[36%] z-10", depth: 1.1, lift: -280, delay: 0.47 },
];

const clean = (word: string) => word.toLowerCase().replace(/[^a-z0-9&+.-]/g, "").replace(/\.$/, "");

export function PageHero({ eyebrow, title, accent = [], description, children, packshots = [], meta }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { still, px, py, progress, onPointerMove } = useHeroMotion(ref);
  const start = introDelay();
  const accentSet = new Set(accent.map(clean));
  const [main, ...satellites] = packshots;

  const drift = still ? 0 : 1;
  const titleY = useTransform(progress, [0, 1], [0, -90 * drift]);
  const bodyY = useTransform(progress, [0, 0.7], [0, -60 * drift]);
  const bodyOpacity = useTransform(progress, [0, 0.7], [1, still ? 1 : 0]);
  const stageY = useTransform(progress, [0, 1], [0, -110 * drift]);
  const glowX = useTransform(px, (v) => v * 50);

  return (
    <>
      <section
        ref={ref}
        onPointerMove={onPointerMove}
        className={`relative isolate flex flex-col overflow-hidden bg-void text-fg ${main ? "lg:min-h-[88svh]" : "min-h-[70svh]"}`}
      >
        <div className="grid-lines mask-fade absolute inset-0 -z-30 opacity-70" />
        <ParticleField className="-z-20" density={0.4} />
        <motion.div style={{ x: glowX }} className="orb -top-1/3 right-0 -z-20 size-[42rem] bg-violet/35" />
        <div className="orb -bottom-60 -left-40 -z-20 size-[30rem] bg-cyan/20" style={{ animationDelay: "-6s" }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[40%] overflow-hidden opacity-50" aria-hidden>
          <div className="floor-grid" />
        </div>
        <EcgBackdrop
          progress={progress}
          start={start}
          still={still}
          className={main ? "top-[86%] lg:top-[55%]" : "top-[70%] lg:top-[62%]"}
        />

        <div
          className={`mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-5 pb-10 pt-36 sm:px-8 lg:pt-40 ${
            main ? "lg:grid-cols-[1.2fr_1fr] lg:gap-[3vw]" : ""
          }`}
        >
          <div className="relative z-10">
            <motion.div
              className="glass inline-flex items-center gap-3 rounded-full py-1.5 pl-3 pr-4"
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: start, duration: 0.8, ease }}
            >
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inset-0 animate-ping rounded-full bg-cyan/70" />
                <span className="relative size-2 rounded-full bg-cyan" />
              </span>
              <span className="eyebrow text-fg/80">
                <Scramble text={eyebrow} delay={start} />
              </span>
            </motion.div>

            <motion.h1
              style={{ y: titleY }}
              aria-label={title}
              className="mt-7 max-w-4xl text-[clamp(2.6rem,5.4vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
            >
              {title.split(" ").map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  aria-hidden
                  className="-my-[0.12em] inline-block overflow-hidden py-[0.12em] align-bottom"
                >
                  <motion.span
                    className={`inline-block ${accentSet.has(clean(word)) ? "text-spectrum" : ""}`}
                    initial={{ y: "115%", rotate: 6 }}
                    animate={{ y: "0%", rotate: 0 }}
                    transition={{ duration: 1.1, delay: start + 0.05 + i * 0.06, ease }}
                  >
                    {word}&nbsp;
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.div style={{ y: bodyY, opacity: bodyOpacity }}>
              <motion.div
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: start + 0.5, duration: 1.1, ease }}
              >
                {description && <p className="mt-7 max-w-2xl text-lg leading-relaxed text-dim">{description}</p>}
                {children}
              </motion.div>
            </motion.div>
          </div>

          {main && (
            <motion.div
              style={{ y: stageY }}
              className="relative mx-auto aspect-[1/0.85] w-full max-w-[22rem] [perspective:1400px] sm:max-w-[30rem] lg:max-w-[34rem]"
            >
              <OrbitRings px={px} start={start} />
              <HoloPedestal px={px} />
              {satellites.slice(0, 2).map((item, i) => (
                <FloatingPackshot
                  key={item.src}
                  item={item}
                  {...satelliteSlots[i]}
                  className={`hidden sm:block ${satelliteSlots[i].className}`}
                  px={px}
                  progress={progress}
                  start={start}
                  still={still}
                />
              ))}
              <div className="absolute inset-x-[14%] top-1/2 -translate-y-1/2 sm:inset-x-[20%]">
                <TiltPackshot item={main} px={px} py={py} start={start} still={still} priority />
              </div>
            </motion.div>
          )}
        </div>

        <motion.div
          className="mx-auto w-full max-w-7xl px-5 sm:px-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: start + 0.75, duration: 1.1, ease }}
        >
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5 border-t border-ink/[0.11] py-6 text-sm text-dim">
            {meta && meta.length > 0 ? (
              <dl className="flex flex-wrap gap-3">
                {meta.map((m) => (
                  <div key={m.label} className="glass flex flex-col-reverse rounded-2xl px-4 py-3">
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-dim">{m.label}</dt>
                    <dd className="font-display text-xl font-semibold text-fg">{m.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="font-mono text-xs uppercase tracking-wider">
                <strong className="font-semibold text-fg">STARMED General Trading LLC</strong>
                <span className="mx-2 text-cyan">/</span>
                UAE &amp; GCC
              </p>
            )}
            {main && <ScrollCue href="#page-content" />}
          </div>
        </motion.div>
      </section>
      <div id="page-content" aria-hidden />
    </>
  );
}
