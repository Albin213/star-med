"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { TextReveal } from "@/components/ui/TextReveal";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { countByCategory } from "@/lib/catalogue";

const coverFor = (categoryId: string) =>
  (products.find((p) => p.categoryId === categoryId && p.isFeatured) ??
    products.find((p) => p.categoryId === categoryId))!;

export function CategoryExplorer() {
  const [activeId, setActiveId] = useState(categories[3].id);
  const active = categories.find((c) => c.id === activeId) ?? categories[0];
  const cover = coverFor(active.id);

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-32">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-indigo">{categories.length} categories</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-6xl">
            <TextReveal text="One supplier, the complete shelf" />
          </h2>
          <div className="relative mt-10 hidden aspect-[5/4] overflow-hidden rounded-3xl bg-mist lg:block">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={cover.image}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src={cover.image} alt="" fill sizes="96px" className="scale-110 object-cover blur-2xl" />
                <Image src={cover.image} alt={cover.name} fill sizes="560px" className="object-contain" />
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="mt-4 hidden min-h-12 leading-relaxed text-muted lg:block">
            {active.description}
          </p>
        </div>

        <ul className="border-t border-ink/10">
          {categories.map((category, i) => {
            const isActive = category.id === activeId;
            return (
              <li key={category.id} className="border-b border-ink/10">
                <Link
                  href={`/products?category=${category.id}`}
                  onMouseEnter={() => setActiveId(category.id)}
                  onFocus={() => setActiveId(category.id)}
                  className="group flex items-center gap-4 py-4 sm:py-5"
                >
                  <span className="w-7 font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 font-display text-2xl font-medium tracking-tight transition-all duration-500 ease-premium sm:text-3xl ${
                      isActive ? "text-indigo lg:translate-x-2" : ""
                    }`}
                  >
                    {category.name}
                  </span>
                  <span className="font-mono text-xs text-muted">{countByCategory(category.id)}</span>
                  <ArrowUpRight
                    className={`size-5 transition-all duration-300 ${
                      isActive ? "text-indigo" : "text-ink/25"
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
