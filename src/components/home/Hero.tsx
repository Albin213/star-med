"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { BadgeCheck, Landmark, MessageCircle, Store } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import {
  EcgBackdrop,
  FloatingPackshot,
  heroEase as ease,
  HoloPedestal,
  HudChip,
  OrbitRings,
  ScrollCue,
  TiltPackshot,
  useHeroMotion,
} from "@/components/ui/HeroFx";
import { Magnetic } from "@/components/ui/Magnetic";
import { ParticleField } from "@/components/ui/ParticleField";
import { Scramble } from "@/components/ui/Scramble";
import { introDelay } from "@/lib/boot";
import { generalEnquiry } from "@/lib/whatsapp";

const credentials = [
  { icon: BadgeCheck, label: "CE 0123 & ISO 13485" },
  { icon: Landmark, label: "MOH Registered" },
  { icon: Store, label: "2,000+ Outlets" },
];

/** Headline lines: alternate lines are indented, and each drifts its own way on scroll. */
const lines = [
  { text: "Healthcare that", drift: -60, indent: false, accent: false },
  { text: "protects", drift: 50, indent: true, accent: true },
  { text: "every life.", drift: -24, indent: false, accent: false },
];

const hero = {
  src: "/images/products/drcare-vitamin-serum.png",
  alt: "Dr.Care Vitamin C Serum with its retail box",
  w: 1274,
  h: 1234,
};

const satellites = [
  {
    item: {
      src: "/images/products/rosemary-mint-shampoo.png",
      alt: "Dr.Care Rosemary Mint Strengthening Shampoo",
      w: 1024,
      h: 1536,
    },
    className: "left-[0%] top-[2%] w-[24%] -z-10",
    depth: 0.5,
    lift: -200,
    delay: 0.35,
  },
  {
    item: {
      src: "/images/products/first-aid-kit-50-person.png",
      alt: "STARMED first aid kit for 50 people",
      w: 784,
      h: 664,
    },
    className: "bottom-[4%] right-[-4%] w-[36%] z-10",
    depth: 1.1,
    lift: -320,
    delay: 0.47,
  },
  {
    item: {
      src: "/images/products/dada-gel-pack-eye-mask.png",
      alt: "DADA hot and cold gel bead eye mask",
      w: 1197,
      h: 1315,
    },
    className: "bottom-[8%] left-[-2%] w-[25%] z-10",
    depth: 0.8,
    lift: -260,
    delay: 0.59,
  },
];

function HeadlineLine({
  line,
  index,
  progress,
  start,
  still,
}: {
  line: (typeof lines)[number];
  index: number;
  progress: MotionValue<number>;
  start: number;
  still: boolean;
}) {
  const x = useTransform(progress, [0, 1], [0, still ? 0 : line.drift]);
  return (
    <motion.span
      style={{ x }}
      className={`-mb-[0.08em] block overflow-hidden pb-[0.08em] ${line.indent ? "lg:pl-[0.9em]" : ""}`}
    >
      <motion.span
        className={`relative block ${line.accent ? "text-spectrum w-fit pr-[0.12em] italic" : ""}`}
        initial={{ y: "110%", rotate: 4 }}
        animate={{ y: "0%", rotate: 0 }}
        transition={{ duration: 1.3, delay: start + index * 0.1, ease }}
      >
        {line.accent && (
          <span aria-hidden className="absolute -left-[0.9em] top-1/2 hidden h-px w-[0.7em] bg-gradient-to-r from-transparent to-cyan lg:block" />
        )}
        {line.text}
      </motion.span>
    </motion.span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { still, px, py, progress, onPointerMove } = useHeroMotion(ref);
  const start = introDelay();

  const drift = still ? 0 : 1;
  const h1Y = useTransform(progress, [0, 1], ["0%", `${-30 * drift}%`]);
  const subY = useTransform(progress, [0, 0.6], [0, -80 * drift]);
  const subOpacity = useTransform(progress, [0, 0.6], [1, still ? 1 : 0]);
  const stageY = useTransform(progress, [0, 1], [0, -120 * drift]);
  const stageScale = useTransform(progress, [0, 1], [1, still ? 1 : 0.88]);
  const glowX = useTransform(px, (v) => v * 60);
  const glowY = useTransform(py, (v) => v * 40);

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-void text-fg"
    >
      {/* ── Background layers ── */}
      <div className="grid-lines mask-fade absolute inset-0 -z-30 opacity-70" />
      <ParticleField className="-z-20" />
      <motion.div style={{ x: glowX, y: glowY }} className="orb -left-48 -top-48 -z-20 size-[48rem] bg-violet/35" />
      <div className="orb -right-32 top-1/4 -z-20 size-[36rem] bg-cyan/20" style={{ animationDelay: "-6s" }} />
      <div className="orb -bottom-60 left-1/3 -z-20 size-[30rem] bg-lime/15" style={{ animationDelay: "-10s" }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[45%] overflow-hidden opacity-60" aria-hidden>
        <div className="floor-grid" />
      </div>
      <EcgBackdrop progress={progress} start={start} still={still} />

      {/* ── Content ── */}
      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-6 px-5 pt-28 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-[2vw] lg:pt-32">
        <div className="relative z-10">
          <motion.div
            className="glass inline-flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4"
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: start, duration: 0.8, ease }}
          >
            <span className="rounded-full bg-cyan/15 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-cyan">
              B2B
            </span>
            <span className="eyebrow text-fg/80">
              <Scramble text="Official B2B Healthcare Distribution" delay={start} />
            </span>
          </motion.div>

          <motion.h1
            style={{ y: h1Y }}
            className="mt-7 text-[clamp(2.9rem,5.6vw,5.8rem)] font-semibold leading-[0.95] tracking-[-0.045em] lg:whitespace-nowrap"
          >
            {lines.map((line, i) => (
              <HeadlineLine key={line.text} line={line} index={i} progress={progress} start={start} still={still} />
            ))}
          </motion.h1>

          <motion.div style={{ y: subY, opacity: subOpacity }} className="mt-9 flex flex-col gap-8">
            <motion.p
              className="max-w-[40ch] text-lg leading-relaxed text-dim"
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: start + 0.6, duration: 1.1, ease }}
            >
              <span className="font-semibold text-fg">Smart. Certified. Reliable.</span> STARMED supplies
              hospitals, pharmacies &amp; retail chains across the UAE &amp; GCC.
            </motion.p>
            <motion.div
              className="flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: start + 0.7, duration: 1.1, ease }}
            >
              <Magnetic>
                <Button href="/products">Explore Catalogue</Button>
              </Magnetic>
              <Magnetic>
                <Button href={generalEnquiry} variant="glass" icon={<MessageCircle className="size-3.5" aria-hidden />}>
                  Enquire on WhatsApp
                </Button>
              </Magnetic>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Product stage ── */}
        <motion.div
          style={{ y: stageY, scale: stageScale }}
          className="relative mx-auto aspect-[1/0.9] w-full max-w-[38rem] [perspective:1400px] lg:aspect-auto lg:h-[min(72vh,680px)]"
        >
          <OrbitRings px={px} start={start} />
          <HoloPedestal px={px} />
          {satellites.map((s) => (
            <FloatingPackshot
              key={s.item.src}
              {...s}
              className={`hidden sm:block ${s.className}`}
              px={px}
              progress={progress}
              start={start}
              still={still}
            />
          ))}
          <div className="absolute inset-x-[12%] top-1/2 -translate-y-1/2 sm:inset-x-[20%]">
            <TiltPackshot item={hero} px={px} py={py} start={start} still={still} priority />
          </div>

          {credentials.map(({ icon: Icon, label }, i) => (
            <HudChip
              key={label}
              start={start}
              delay={1 + i * 0.15}
              className={
                [
                  "right-[2%] top-[10%] hidden sm:block",
                  "left-[-4%] top-[44%] hidden lg:block",
                  "right-[6%] bottom-[34%] hidden sm:block",
                ][i]
              }
            >
              <span className="grid size-6 place-items-center rounded-full bg-cyan/15">
                <Icon className="size-3.5 text-cyan" aria-hidden />
              </span>
              {label}
            </HudChip>
          ))}
        </motion.div>
      </div>

      {/* ── Foot strip ── */}
      <motion.div
        className="mx-auto w-full max-w-7xl px-5 sm:px-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: start + 0.8, duration: 1.1, ease }}
      >
        <div className="mt-8 grid items-end gap-4 border-t border-ink/[0.11] py-6 text-sm text-dim sm:grid-cols-[1fr_auto] lg:grid-cols-[1fr_1.4fr_auto] lg:gap-6">
          <p>
            <strong className="font-semibold text-fg">STARMED General Trading LLC</strong>
            <br />
            Medical, wellness &amp; personal care — UAE &amp; GCC
          </p>
          <ul className="flex flex-wrap gap-2">
            {credentials.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 rounded-full border border-ink/[0.11] bg-surface/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider">
                <Icon className="size-3.5 text-lime-bright" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
          <ScrollCue href="#brands" />
        </div>
      </motion.div>
    </section>
  );
}
