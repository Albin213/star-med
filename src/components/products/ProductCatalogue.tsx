"use client";

import { AnimatePresence, motion } from "motion/react";
import { LayoutGrid, List, Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { countByBrand, countByCategory, matchesSearch } from "@/lib/catalogue";
import { ProductCard } from "./ProductCard";

type FilterButtonProps = {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
};

function FilterButton({ label, count, active, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex shrink-0 items-center justify-between gap-3 rounded-full px-3.5 py-2 text-left text-sm transition-colors lg:w-full lg:rounded-xl ${
        active ? "bg-ink font-semibold text-white" : "bg-white text-ink hover:bg-mist lg:bg-transparent"
      }`}
    >
      {label}
      <span className={`font-mono text-xs ${active ? "text-lime-bright" : "text-muted"}`}>
        {count}
      </span>
    </button>
  );
}

export function ProductCatalogue() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const category = params.get("category") ?? "all";
  const brand = params.get("brand") ?? "all";
  const [search, setSearch] = useState(params.get("search") ?? "");
  const [view, setView] = useState<"grid" | "list">("grid");

  const setFilter = (key: "category" | "brand", value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === "all") next.delete(key);
    else next.set(key, value);

    // A brand and category with no products in common would show an empty page: drop the other.
    const other = key === "category" ? "brand" : "category";
    const otherValue = next.get(other);
    if (value !== "all" && otherValue) {
      const overlap = products.some((p) =>
        key === "category"
          ? p.categoryId === value && p.brandId === otherValue
          : p.brandId === value && p.categoryId === otherValue,
      );
      if (!overlap) next.delete(other);
    }

    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const results = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === "all" || p.categoryId === category) &&
          (brand === "all" || p.brandId === brand) &&
          matchesSearch(p, search),
      ),
    [category, brand, search],
  );

  const filtered = category !== "all" || brand !== "all" || search.trim() !== "";
  const clear = () => {
    setSearch("");
    router.replace(pathname, { scroll: false });
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[17rem_1fr]">
        <aside data-lenis-prevent className="min-w-0 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto">
          <div className="space-y-6">
            <div>
              <p className="eyebrow mb-3 text-muted">Category</p>
              <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0">
                <FilterButton
                  label="All products"
                  count={products.length}
                  active={category === "all"}
                  onClick={() => setFilter("category", "all")}
                />
                {categories.map((c) => (
                  <FilterButton
                    key={c.id}
                    label={c.name}
                    count={countByCategory(c.id)}
                    active={category === c.id}
                    onClick={() => setFilter("category", c.id)}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-3 text-muted">Brand</p>
              <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0">
                <FilterButton
                  label="All brands"
                  count={products.length}
                  active={brand === "all"}
                  onClick={() => setFilter("brand", "all")}
                />
                {brands.map((b) => (
                  <FilterButton
                    key={b.id}
                    label={b.name}
                    count={countByBrand(b.id)}
                    active={brand === b.id}
                    onClick={() => setFilter("brand", b.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <label className="relative flex-1">
              <span className="sr-only">Search products</span>
              <Search
                className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
                aria-hidden
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, brands, features"
                className="w-full rounded-full bg-white py-3.5 pl-11 pr-4 text-sm outline-none ring-1 ring-ink/10 transition-shadow placeholder:text-muted focus:ring-2 focus:ring-indigo"
              />
            </label>
            <div className="flex rounded-full bg-white p-1 ring-1 ring-ink/10">
              {(
                [
                  ["grid", LayoutGrid, "Grid view"],
                  ["list", List, "Compact view"],
                ] as const
              ).map(([mode, Icon, label]) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setView(mode)}
                  aria-label={label}
                  aria-pressed={view === mode}
                  className={`grid size-10 place-items-center rounded-full transition-colors ${
                    view === mode ? "bg-ink text-white" : "text-muted hover:text-ink"
                  }`}
                >
                  <Icon className="size-4" aria-hidden />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex h-8 items-center justify-between" aria-live="polite">
            <p className="text-sm text-muted">
              Showing <strong className="font-semibold text-ink">{results.length}</strong> of{" "}
              {products.length} products
            </p>
            {filtered && (
              <button
                type="button"
                onClick={clear}
                className="inline-flex items-center gap-1 text-sm font-medium text-indigo"
              >
                <X className="size-3.5" aria-hidden />
                Clear filters
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="mt-6 rounded-3xl bg-white px-6 py-20 text-center">
              <p className="font-display text-2xl font-semibold">No products match that search</p>
              <p className="mt-2 text-muted">Try a different term, or clear the filters.</p>
            </div>
          ) : (
            <motion.div
              layout
              className={
                view === "grid" ? "mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3" : "mt-6 space-y-3"
              }
            >
              <AnimatePresence mode="popLayout">
                {results.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout="position"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ProductCard product={product} layout={view} priority={i < 3} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
