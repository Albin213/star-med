import { ArrowUpRight, BadgeCheck, Check, ChevronRight, Flame, MessageCircle, Phone, Snowflake } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site } from "@/data/site";
import type { Product } from "@/data/types";
import { relatedProducts, specRows } from "@/lib/catalogue";
import { productEnquiry } from "@/lib/whatsapp";
import { AddToEnquiry } from "./AddToEnquiry";
import { CatalogueSlide } from "./CatalogueSlide";
import { ProductCard } from "./ProductCard";
import { ProductImage } from "./ProductImage";

function BlockTitle({ children }: { children: string }) {
  return (
    <h2 className="eyebrow mt-12 flex items-center gap-3 text-cyan">
      {children}
      <span className="h-px flex-1 bg-gradient-to-r from-cyan/40 to-transparent" aria-hidden />
    </h2>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const specs = specRows(product.packagingSpecs);
  const related = relatedProducts(product);

  return (
    <div className="relative isolate overflow-hidden bg-void">
      <div className="grid-lines mask-fade-b absolute inset-x-0 top-0 -z-10 h-[80vh] opacity-50" />
      <div className="orb -left-40 top-0 -z-10 size-[40rem] bg-violet/25" />
      <div className="orb -right-40 top-[40vh] -z-10 size-[34rem] bg-cyan/15" />

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-8 lg:pt-36">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-dim">
          <Link href="/" className="transition-colors hover:text-cyan">
            Home
          </Link>
          <ChevronRight className="size-3 text-faint" aria-hidden />
          <Link href="/products" className="transition-colors hover:text-cyan">
            Catalogue
          </Link>
          <ChevronRight className="size-3 text-faint" aria-hidden />
          <Link href={`/products?category=${product.categoryId}`} className="text-cyan">
            {product.categoryName}
          </Link>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="hud relative rounded-[2rem] border border-cyan/15 bg-deep p-3 shadow-[0_40px_100px_-40px_rgba(23,54,140,0.18)]">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  sizes="(min-width: 1024px) 600px, 92vw"
                  priority
                  className="scanline aspect-square rounded-[1.5rem]"
                />
                <div className="pointer-events-none absolute left-7 top-7 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                  {product.brandName}
                </div>
                {product.cataloguePage && (
                  <div className="pointer-events-none absolute bottom-7 right-7 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                    p.{product.cataloguePage}
                  </div>
                )}
              </div>
            </Reveal>
            {product.catalogueSlide && product.cataloguePage && (
              <div className="mt-4">
                <CatalogueSlide src={product.catalogueSlide} page={product.cataloguePage} productName={product.name} />
              </div>
            )}
          </div>

          <div>
            <SectionLabel>{`${product.brandName} · ${product.categoryName}`}</SectionLabel>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.02] sm:text-5xl">{product.name}</h1>
            <p className="mt-5 text-lg leading-relaxed text-dim">{product.fullDescription}</p>

            {product.certifications && (
              <ul className="mt-7 flex flex-wrap gap-2">
                {product.certifications.map((cert) => (
                  <li
                    key={cert}
                    className="inline-flex items-center gap-1.5 rounded-full border border-lime-bright/30 bg-lime-bright/[0.08] px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-lime-bright"
                  >
                    <BadgeCheck className="size-3.5" aria-hidden />
                    {cert}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={productEnquiry(product)} icon={<MessageCircle className="size-3.5" aria-hidden />}>
                Enquire on WhatsApp
              </Button>
              <AddToEnquiry product={product} />
            </div>
            <a
              href={site.phoneHref}
              className="mt-5 inline-flex items-center gap-2 font-mono text-sm text-dim transition-colors hover:text-cyan"
            >
              <Phone className="size-4 text-cyan" aria-hidden />
              Call {site.phone}
            </a>

            <BlockTitle>Available Sizes &amp; Variants</BlockTitle>
            <ul className="mt-4 flex flex-wrap gap-2">
              {product.sizesVariants.map((variant) => (
                <li key={variant} className="glass rounded-xl px-4 py-2 text-sm font-medium">
                  {variant}
                </li>
              ))}
            </ul>

            {specs.length > 0 && (
              <>
                <BlockTitle>Verified Packaging Specifications</BlockTitle>
                <dl className="glass mt-4 divide-y divide-ink/[0.09] overflow-hidden rounded-2xl">
                  {specs.map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between gap-6 px-5 py-3.5 text-sm transition-colors hover:bg-cyan/[0.05]"
                    >
                      <dt className="text-dim">{row.label}</dt>
                      <dd className="text-right font-mono text-[0.8rem] font-medium text-cyan">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}

            {product.hotColdUsage && (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="glass rounded-2xl border-ember/25 p-5">
                  <p className="flex items-center gap-2 font-semibold">
                    <Flame className="size-4 text-ember" aria-hidden />
                    Hot Usage
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-dim">{product.hotColdUsage.hot}</p>
                </div>
                <div className="glass rounded-2xl border-cyan/25 p-5">
                  <p className="flex items-center gap-2 font-semibold">
                    <Snowflake className="size-4 text-cyan" aria-hidden />
                    Cold Usage
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-dim">{product.hotColdUsage.cold}</p>
                </div>
              </div>
            )}

            <BlockTitle>Verified Product Attributes</BlockTitle>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm leading-snug text-fg/90">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md bg-cyan/15">
                    <Check className="size-3 text-cyan" aria-hidden />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            {product.applications && (
              <>
                <BlockTitle>Applications</BlockTitle>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {product.applications.map((application) => (
                    <li
                      key={application}
                      className="rounded-full border border-ink/[0.12] bg-surface/70 px-3 py-1.5 text-sm text-dim"
                    >
                      {application}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-ink/[0.09] bg-deep">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-3xl font-semibold sm:text-4xl">Related products</h2>
              <Link
                href="/products"
                className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-cyan"
              >
                View full catalogue
                <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" aria-hidden />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item, i) => (
                <Reveal key={item.id} delay={i * 0.06}>
                  <ProductCard product={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
