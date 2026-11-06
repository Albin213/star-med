import { BadgeCheck, Check, Flame, MessageCircle, Phone, Snowflake } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import type { Product } from "@/data/types";
import { relatedProducts, specRows } from "@/lib/catalogue";
import { productEnquiry } from "@/lib/whatsapp";
import { AddToEnquiry } from "./AddToEnquiry";
import { CatalogueSlide } from "./CatalogueSlide";
import { ProductCard } from "./ProductCard";
import { ProductImage } from "./ProductImage";

export function ProductDetail({ product }: { product: Product }) {
  const specs = specRows(product.packagingSpecs);
  const related = relatedProducts(product);

  return (
    <div className="bg-paper">
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-8 lg:pt-36">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/products" className="hover:text-ink">
            Catalogue
          </Link>
          <span aria-hidden>/</span>
          <Link href={`/products?category=${product.categoryId}`} className="hover:text-ink">
            {product.categoryName}
          </Link>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <ProductImage
                src={product.image}
                alt={product.name}
                sizes="(min-width: 1024px) 600px, 92vw"
                priority
                className="aspect-square rounded-[2rem]"
              />
            </Reveal>
            {product.catalogueSlide && product.cataloguePage && (
              <div className="mt-4">
                <CatalogueSlide
                  src={product.catalogueSlide}
                  page={product.cataloguePage}
                  productName={product.name}
                />
              </div>
            )}
          </div>

          <div>
            <p className="eyebrow text-indigo">
              {product.brandName} · {product.categoryName}
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.05] sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{product.fullDescription}</p>

            {product.certifications && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {product.certifications.map((cert) => (
                  <li
                    key={cert}
                    className="inline-flex items-center gap-1.5 rounded-full bg-lime/20 px-3 py-1.5 text-xs font-semibold"
                  >
                    <BadgeCheck className="size-3.5 text-indigo" aria-hidden />
                    {cert}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={productEnquiry(product)}
                icon={<MessageCircle className="size-4" aria-hidden />}
              >
                Enquire on WhatsApp
              </Button>
              <AddToEnquiry product={product} />
            </div>
            <a
              href={site.phoneHref}
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
            >
              <Phone className="size-4" aria-hidden />
              Call {site.phone}
            </a>

            <h2 className="eyebrow mt-10 text-muted">Available Sizes &amp; Variants</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {product.sizesVariants.map((variant) => (
                <li key={variant} className="rounded-full bg-white px-4 py-2 text-sm font-medium">
                  {variant}
                </li>
              ))}
            </ul>

            {specs.length > 0 && (
              <>
                <h2 className="eyebrow mt-10 text-muted">Verified Packaging Specifications</h2>
                <dl className="mt-3 divide-y divide-ink/10 rounded-2xl bg-white px-5">
                  {specs.map((row) => (
                    <div key={row.label} className="flex justify-between gap-6 py-3.5 text-sm">
                      <dt className="text-muted">{row.label}</dt>
                      <dd className="text-right font-mono text-[0.8rem] font-medium">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}

            {product.hotColdUsage && (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-5">
                  <p className="flex items-center gap-2 font-semibold">
                    <Flame className="size-4 text-orange-600" aria-hidden />
                    Hot Usage
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {product.hotColdUsage.hot}
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5">
                  <p className="flex items-center gap-2 font-semibold">
                    <Snowflake className="size-4 text-sky-600" aria-hidden />
                    Cold Usage
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {product.hotColdUsage.cold}
                  </p>
                </div>
              </div>
            )}

            <h2 className="eyebrow mt-10 text-muted">Verified Product Attributes</h2>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-2.5 text-sm leading-snug">
                  <Check className="mt-0.5 size-4 shrink-0 text-lime" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>

            {product.applications && (
              <>
                <h2 className="eyebrow mt-10 text-muted">Applications</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {product.applications.map((application) => (
                    <li
                      key={application}
                      className="rounded-full border border-ink/15 px-3 py-1.5 text-sm"
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
        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold sm:text-4xl">Related products</h2>
            <Link
              href="/products"
              className="shrink-0 text-sm font-semibold underline decoration-lime decoration-2 underline-offset-4"
            >
              View full catalogue
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
