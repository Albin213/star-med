import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ProductImage } from "@/components/products/ProductImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { brands } from "@/data/brands";
import { products } from "@/data/products";
import type { Brand } from "@/data/types";

const pad = (n: number) => String(n).padStart(2, "0");
const plural = (n: number) => `${n} ${n === 1 ? "product" : "products"}`;

const productsOf = (id: string) => products.filter((p) => p.brandId === id);

/** Featured items first, so the stage always leads with the hero packshots. */
const showcaseOf = (id: string, limit: number) =>
  [...productsOf(id)].sort((a, b) => Number(!!b.isFeatured) - Number(!!a.isFeatured)).slice(0, limit);

const categoriesOf = (id: string) => [...new Set(productsOf(id).map((p) => p.categoryName))];

/** Each brand carries its own accent; exposed as --brand for the glows. */
const brandVars = (brand: Brand) => ({ "--brand": brand.color }) as CSSProperties;

export function BrandShowcase() {
  const owned = brands.filter((b) => b.type === "owned");
  const ranges = brands.filter((b) => b.type === "range");

  return (
    <>
      <BrandIndex />

      {/* ───────── Owned brands ───────── */}
      <section className="relative isolate overflow-hidden bg-deep">
        <div className="grid-lines mask-fade absolute inset-0 -z-10 opacity-30" />
        <div className="orb -left-40 top-40 -z-10 size-[28rem] bg-cyan/15" />
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <SectionHead
            index="01"
            label="Owned brands"
            title="Built in-house, trusted across the GCC"
            text={`${owned.length} brands we develop, certify and distribute ourselves — from clinical diagnostics to everyday personal care.`}
          />

          <div className="mt-16 space-y-24 lg:mt-24 lg:space-y-36">
            {owned.map((brand, i) => (
              <OwnedBrand key={brand.id} brand={brand} index={i} flip={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Product ranges ───────── */}
      <section className="relative isolate overflow-hidden border-t border-ink/[0.09]">
        <div className="orb -right-40 top-20 -z-10 size-[30rem] bg-violet/25" />
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <SectionHead
            index="02"
            tone="lime"
            label="Product ranges"
            title="Specialist ranges, curated for the shelf"
            text="Focused lines that complete the portfolio — each chosen for proven quality and steady demand in pharmacies and retail."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {ranges.map((brand, i) => (
              <Reveal key={brand.id} delay={i * 0.08} className="h-full">
                <RangeCard brand={brand} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ───────────────────────── Pieces ───────────────────────── */

function SectionHead({
  index,
  label,
  title,
  text,
  tone,
}: {
  index: string;
  label: string;
  title: string;
  text: string;
  tone?: "cyan" | "lime";
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
      <div>
        <SectionLabel index={index} tone={tone}>
          {label}
        </SectionLabel>
        <h2 className="mt-5 text-4xl font-semibold leading-[1.02] sm:text-6xl">
          <TextReveal text={title} />
        </h2>
      </div>
      <Reveal delay={0.15}>
        <p className="max-w-md leading-relaxed text-dim lg:ml-auto">{text}</p>
      </Reveal>
    </div>
  );
}

/** Jump strip under the hero: every brand at a glance, linking to its section. */
function BrandIndex() {
  return (
    <section aria-label="Brand index" className="relative border-y border-ink/[0.09] bg-void">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ul className="grid grid-cols-3 border-l border-ink/[0.09] lg:grid-cols-9">
          {brands.map((brand, i) => {
            const owned = brand.type === "owned";
            const thumb = owned ? brand.logo : (showcaseOf(brand.id, 1)[0]?.image ?? brand.logo);
            return (
              <li key={brand.id} className="border-b border-r border-ink/[0.09] lg:border-b-0" style={brandVars(brand)}>
                <a
                  href={`#${brand.id}`}
                  className="group relative flex h-full flex-col gap-3 overflow-hidden p-4 transition-colors hover:bg-surface/70"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[var(--brand)] transition-transform duration-500 ease-premium group-hover:scale-x-100"
                  />
                  <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                    {pad(i + 1)}
                    <span className={owned ? "text-cyan" : "text-lime-bright"}>{owned ? "Owned" : "Range"}</span>
                  </span>
                  <span
                    className={`relative grid h-14 place-items-center overflow-hidden rounded-xl transition-transform duration-500 ease-premium group-hover:-translate-y-0.5 ${
                      owned ? "bg-white p-2" : "bg-surface"
                    }`}
                  >
                    <Image
                      src={thumb}
                      alt=""
                      width={120}
                      height={56}
                      className={`h-full w-auto object-contain ${owned ? "" : "p-1 drop-shadow-[0_6px_10px_rgba(14,26,54,0.15)]"}`}
                    />
                  </span>
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="truncate font-display text-sm font-semibold">{brand.name}</span>
                    <span className="font-mono text-[10px] text-faint">{productsOf(brand.id).length}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Editorial spread: a holographic stage with logo + packshots beside the brand story. */
function OwnedBrand({ brand, index, flip }: { brand: Brand; index: number; flip: boolean }) {
  const items = productsOf(brand.id);
  const shots = showcaseOf(brand.id, 3);
  const cats = categoriesOf(brand.id);
  const stats = [
    { value: pad(items.length), label: items.length === 1 ? "Product" : "Products" },
    { value: pad(cats.length), label: cats.length === 1 ? "Category" : "Categories" },
    { value: brand.established ?? "UAE", label: brand.established ? "Established" : "Based in" },
  ];

  return (
    <article id={brand.id} style={brandVars(brand)} className="grid scroll-mt-28 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
      {/* Stage */}
      <Reveal className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
        <div
          data-spot
          className="hud scanline group relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-ink/[0.1] bg-void"
        >
          <div className="grid-dots absolute inset-0 opacity-40" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-60 transition-opacity duration-700 group-hover:opacity-90"
            style={{
              background: `radial-gradient(circle at 50% 50%, color-mix(in srgb, ${brand.color} 45%, transparent), transparent 55%)`,
            }}
          />
          <div aria-hidden className="absolute inset-[18%] rounded-full bg-cyan/10 blur-3xl" />

          {/* Giant outlined index */}
          <span
            aria-hidden
            className="text-outline pointer-events-none absolute -bottom-6 right-4 font-display text-[9rem] font-bold leading-none sm:text-[12rem]"
          >
            {pad(index + 1)}
          </span>

          {/* Logo plate */}
          <div className="absolute left-1/2 top-1/2 w-[46%] -translate-x-1/2 -translate-y-1/2">
            <div className="relative grid aspect-[4/3] place-items-center rounded-3xl bg-white p-[10%] shadow-[0_30px_80px_-20px_rgba(14,26,54,0.24),0_0_60px_-10px_var(--brand)] transition-transform duration-700 ease-premium group-hover:scale-[1.04]">
              <Image src={brand.logo} alt={`${brand.name} logo`} width={320} height={240} className="max-h-full w-auto object-contain" />
            </div>
          </div>

          {/* Floating packshots */}
          {shots.map((p, k) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              aria-label={p.name}
              className={`absolute hidden w-[24%] overflow-hidden rounded-2xl border border-ink/[0.12] shadow-[0_20px_40px_-12px_rgba(14,26,54,0.24)] transition-transform duration-700 ease-premium hover:scale-110 sm:block ${
                ["left-[6%] top-[10%] -rotate-6 animate-float", "bottom-[9%] right-[7%] rotate-6 animate-float [animation-delay:-2.5s]", "bottom-[12%] left-[9%] rotate-3 animate-float [animation-delay:-5s]"][k]
              }`}
            >
              <ProductImage src={p.image} alt="" sizes="200px" className="aspect-square" />
            </Link>
          ))}

          <div className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
            Brand/{pad(index + 1)} · {items.length} SKU
          </div>
          <div className="absolute right-5 top-5 hidden items-center gap-2 font-mono sm:flex text-[10px] uppercase tracking-[0.2em] text-dim">
            <span className="size-1.5 animate-pulse rounded-full bg-[var(--brand)]" />
            {brand.origin ?? "UAE"}
          </div>
        </div>
      </Reveal>

      {/* Story */}
      <div className={`lg:col-span-6 ${flip ? "lg:order-1" : ""}`}>
        <Reveal delay={0.1}>
          <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
            <span className="text-cyan">{pad(index + 1)}</span>
            <span className="h-px w-8 bg-[var(--brand)]" />
            {brand.badge}
          </p>
          <h3 className="mt-4 text-5xl font-semibold leading-[0.95] sm:text-7xl">{brand.name}</h3>
          <p className="mt-4 text-lg font-medium text-cyan">{brand.tagline}</p>
          <p className="mt-4 max-w-xl leading-relaxed text-dim">{brand.description}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <dl className="mt-8 grid max-w-lg grid-cols-3 divide-x divide-ink/[0.1] rounded-2xl border border-ink/[0.1] bg-surface/70">
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">{s.label}</dt>
                <dd className="mt-1 font-display text-2xl font-semibold">{s.value}</dd>
              </div>
            ))}
          </dl>

          {cats.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {cats.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-ink/[0.12] bg-surface/70 px-3 py-1 text-xs font-medium text-dim"
                >
                  {c}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href={`/products?brand=${brand.id}`}
              className="group/link inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent/90 px-5 py-2.5 text-sm font-semibold text-on-accent shadow-[0_10px_40px_-10px_rgba(23,54,140,0.24)] transition-shadow hover:shadow-[0_14px_60px_-8px_rgba(23,54,140,0.34)]"
            >
              Explore {brand.name}
              <ArrowUpRight className="size-4 transition-transform group-hover/link:rotate-45" aria-hidden />
            </Link>
            <span className="font-mono text-xs uppercase tracking-wider text-faint">{plural(items.length)}</span>
          </div>
        </Reveal>
      </div>
    </article>
  );
}

/** Range card: big packshot over the brand's own colour glow. */
function RangeCard({ brand, index }: { brand: Brand; index: number }) {
  const cover = showcaseOf(brand.id, 1)[0];
  const count = productsOf(brand.id).length;

  return (
    <Link
      id={brand.id}
      href={`/products?brand=${brand.id}`}
      data-spot
      style={brandVars(brand)}
      className="glass edge-glow group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-3xl transition-transform duration-700 ease-premium hover:-translate-y-2"
    >
      <div className="relative m-2 overflow-hidden rounded-[1.25rem]">
        <ProductImage src={cover?.image ?? brand.logo} alt="" sizes="(min-width: 1024px) 300px, 45vw" className="aspect-square" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25 transition-opacity duration-700 group-hover:opacity-45"
          style={{
            background: `radial-gradient(circle at 50% 100%, color-mix(in srgb, ${brand.color} 55%, transparent), transparent 60%)`,
          }}
        />
        <span className="absolute left-3 top-3 rounded-md bg-void/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-lime-bright backdrop-blur">
          R/{pad(index + 1)}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
        <span className="h-0.5 w-8 rounded-full bg-[var(--brand)] transition-all duration-500 ease-premium group-hover:w-16" />
        <h3 className="mt-4 text-2xl font-semibold">{brand.name}</h3>
        <p className="mt-1 text-sm font-medium text-cyan">{brand.tagline}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-dim">{brand.description}</p>
        <div className="flex-1" />
        <div className="mt-5 flex items-center justify-between border-t border-ink/[0.1] pt-4">
          <span className="font-mono text-xs uppercase tracking-wider text-faint">{plural(count)}</span>
          <span className="grid size-9 place-items-center rounded-full border border-ink/[0.12] transition-all duration-500 ease-premium group-hover:border-cyan/50 group-hover:bg-cyan/10 group-hover:text-cyan">
            <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
