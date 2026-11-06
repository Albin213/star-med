"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
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

/** On desktop, vertical scrolling drives the row sideways; on touch it is a native swipe rail. */
export function ProductShowcase() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

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

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const pinned = distance > 0;

  return (
    <section
      ref={section}
      className="relative bg-ink text-white"
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div
        className={`pattern-cross flex flex-col justify-center overflow-hidden py-16 ${
          pinned ? "sticky top-0 h-screen" : ""
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-end justify-between gap-6 px-5 sm:px-8">
          <div>
            <p className="eyebrow text-lime-bright">Explore our</p>
            <h2 className="mt-3 text-4xl font-semibold sm:text-6xl">Top products</h2>
          </div>
          <Button href="/products" variant="outline">
            View all {products.length} products
          </Button>
        </div>

        <div className={pinned ? "mt-10" : "mt-10 overflow-x-auto"}>
          <motion.div
            ref={track}
            style={pinned ? { x } : undefined}
            className="flex w-max gap-5 px-5 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
          >
            {featured.map((product) => (
              <div key={product.id} className="w-72 shrink-0 text-ink lg:w-80">
                <ProductCard product={product} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
