"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { BadgeCheck, Landmark, MessageCircle, Store } from "lucide-react";
import Image from "next/image";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/Button";
import { PulseLine } from "@/components/ui/PulseLine";
import { TextReveal } from "@/components/ui/TextReveal";
import { introDelay } from "@/lib/boot";
import { generalEnquiry } from "@/lib/whatsapp";

const credentials = [
  { icon: BadgeCheck, label: "CE 0123 & ISO 13485" },
  { icon: Landmark, label: "Ministry of Health Registered" },
  { icon: Store, label: "2,000+ Outlets" },
];

const cards = [
  {
    src: "/images/products/first-aid-kit-50-person.jpg",
    alt: "First aid kit for 50 people",
    w: 440,
    h: 380,
    className: "left-0 top-[12%] w-[56%] -rotate-6",
    depth: 26,
    float: 0,
  },
  {
    src: "/images/products/drcare-hyaluronic-acid-serum.jpg",
    alt: "Dr.Care Hyaluronic Acid Serum",
    w: 440,
    h: 600,
    className: "right-0 top-0 w-[46%] rotate-3",
    depth: 48,
    float: 0.8,
  },
  {
    src: "/images/products/dermavia-sun-cream-acne.jpg",
    alt: "Dermavia SPF 50+ sun cream",
    w: 449,
    h: 620,
    className: "bottom-0 left-[28%] w-[42%] rotate-2",
    depth: 70,
    float: 1.6,
  },
];

function FloatingCard({
  card,
  mx,
  my,
}: {
  card: (typeof cards)[number];
  mx: ReturnType<typeof useSpring>;
  my: ReturnType<typeof useSpring>;
}) {
  const x = useTransform(mx, (v) => v * card.depth);
  const y = useTransform(my, (v) => v * card.depth);
  const delay = introDelay() + 0.3 + card.float * 0.15;

  return (
    <motion.div style={{ x, y }} className={`absolute ${card.className}`}>
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        animate={{ opacity: 1, y: [0, -12, 0], scale: 1 }}
        transition={{
          opacity: { duration: 1, delay },
          scale: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: card.float },
        }}
      >
        <Image
          src={card.src}
          alt={card.alt}
          width={card.w}
          height={card.h}
          priority
          sizes="(min-width: 1024px) 300px, 45vw"
          className="w-full rounded-3xl shadow-[0_40px_80px_-24px_rgba(0,0,0,0.65)] ring-1 ring-white/15"
        />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const start = introDelay();

  return (
    <section
      onMouseMove={onMove}
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-ink text-white"
    >
      <div className="pattern-cross mask-fade absolute inset-0 -z-10" />
      <div className="aurora absolute -left-40 -top-40 -z-10 size-[46rem] rounded-full bg-indigo blur-[130px]" />
      <div
        className="aurora absolute -bottom-52 right-0 -z-10 size-[34rem] rounded-full bg-lime/25 blur-[130px]"
        style={{ animationDelay: "-8s" }}
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-28 pt-32 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:pb-32 lg:pt-36">
        <div>
          <motion.p
            className="eyebrow text-lime-bright"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: start, duration: 0.8 }}
          >
            Official B2B Healthcare Distribution
          </motion.p>

          <h1 className="mt-5 text-[clamp(3.2rem,7.2vw,6rem)] font-semibold leading-[0.98]">
            <TextReveal text="Healthcare That" immediate />
            <br />
            <TextReveal text="Protects" immediate delay={0.16} className="text-lime-bright" />
            <br />
            <TextReveal text="Every Life" immediate delay={0.24} />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: start + 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/75">
              <span className="font-semibold text-white">Smart. Certified. Reliable.</span> STARMED
              General Trading LLC supplies hospitals, pharmacies &amp; retail chains across UAE
              &amp; GCC.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/products">Explore Catalogue</Button>
              <Button
                href={generalEnquiry}
                variant="outline"
                icon={<MessageCircle className="size-4" aria-hidden />}
              >
                Enquire on WhatsApp
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/75">
              {credentials.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon className="size-4 text-lime-bright" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
          {cards.map((card) => (
            <FloatingCard key={card.src} card={card} mx={mx} my={my} />
          ))}
        </div>
      </div>

      <PulseLine className="absolute inset-x-0 bottom-3 h-20 w-full" beats={4} />
    </section>
  );
}
