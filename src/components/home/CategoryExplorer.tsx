"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { countByCategory } from "@/lib/catalogue";

const coverFor = (categoryId: string) =>
  (products.find((p) => p.categoryId === categoryId && p.isFeatured) ??
    products.find((p) => p.categoryId === categoryId))!;

const pad = (n: number) => String(n).padStart(2, "0");

export function CategoryExplorer() {
  const [activeId, setActiveId] = useState(categories[3].id);
  const activeIndex = Math.max(0, categories.findIndex((c) => c.id === activeId));
  const active = categories[activeIndex];
  const cover = coverFor(active.id);

  return (
    <section className="relative isolate border-t border-ink/[0.09] bg-deep">
      <div className="grid-lines mask-fade absolute inset-0 -z-10 opacity-40" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-28 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-36">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionLabel index="02">{`${categories.length} categories`}</SectionLabel>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.02] sm:text-6xl">
            <TextReveal text="One supplier, the complete shelf" />
          </h2>

          {/* Holographic preview frame */}
          <div className="hud scanline relative mt-10 hidden aspect-[5/4] overflow-hidden rounded-3xl border border-ink/[0.1] bg-void lg:block">
            <div className="grid-dots absolute inset-0 opacity-40" />
            <div className="absolute inset-[15%] rounded-full bg-cyan/20 blur-3xl" />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={cover.image}
                className="absolute inset-6"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(14px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={cover.image}
                  alt={cover.name}
                  fill
                  sizes="560px"
                  className="object-contain drop-shadow-[0_30px_40px_rgba(14,26,54,0.18)]"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
              CAT/{pad(activeIndex + 1)} · {countByCategory(active.id)} SKU
            </div>
            <div className="absolute bottom-5 right-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
              <span className="size-1.5 animate-pulse rounded-full bg-lime-bright" />
              Live preview
            </div>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mt-5 hidden min-h-12 leading-relaxed text-dim lg:block"
            >
              {active.description}
            </motion.p>
          </AnimatePresence>
        </div>

        <ul className="relative border-t border-ink/[0.1]">
          {categories.map((category, i) => {
            const isActive = category.id === activeId;
            return (
              <li key={category.id} className="relative border-b border-ink/[0.1]">
                {isActive && (
                  <motion.span
                    layoutId="cat-active"
                    transition={{ type: "spring", stiffness: 300, damping: 32 }}
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan/[0.1] via-cyan/[0.03] to-transparent"
                  >
                    <span className="absolute inset-y-0 left-0 w-px bg-cyan shadow-[0_0_12px_2px_rgba(23,54,140,0.32)]" />
                  </motion.span>
                )}
                <Link
                  href={`/products?category=${category.id}`}
                  onMouseEnter={() => setActiveId(category.id)}
                  onFocus={() => setActiveId(category.id)}
                  className="group flex items-center gap-4 py-4 pl-4 pr-2 sm:py-5"
                >
                  <span className={`w-7 font-mono text-xs transition-colors ${isActive ? "text-cyan" : "text-faint"}`}>
                    {pad(i + 1)}
                  </span>
                  <span
                    className={`flex-1 font-display text-2xl font-medium tracking-tight transition-all duration-500 ease-premium sm:text-3xl ${
                      isActive ? "text-fg lg:translate-x-2" : "text-dim"
                    }`}
                  >
                    {category.name}
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 font-mono text-xs transition-colors ${
                      isActive ? "bg-cyan/15 text-cyan" : "bg-surface/70 text-faint"
                    }`}
                  >
                    {countByCategory(category.id)}
                  </span>
                  <ArrowUpRight
                    className={`size-5 transition-all duration-500 ease-premium ${
                      isActive ? "rotate-45 text-cyan" : "text-faint"
                    }`}
                    aria-hidden
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
