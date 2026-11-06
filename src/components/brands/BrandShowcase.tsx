import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductImage } from "@/components/products/ProductImage";
import { Reveal } from "@/components/ui/Reveal";
import { brands } from "@/data/brands";
import { products } from "@/data/products";
import { countByBrand } from "@/lib/catalogue";

const plural = (n: number) => `${n} ${n === 1 ? "product" : "products"}`;

export function BrandShowcase() {
  const owned = brands.filter((b) => b.type === "owned");
  const ranges = brands.filter((b) => b.type === "range");

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <p className="eyebrow text-indigo">Owned brands</p>
        <div className="mt-8 space-y-5">
          {owned.map((brand) => {
            const samples = products.filter((p) => p.brandId === brand.id).slice(0, 2);
            return (
              <Reveal key={brand.id}>
                <article
                  id={brand.id}
                  className="grid scroll-mt-28 gap-8 overflow-hidden rounded-[2rem] bg-white p-6 sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center"
                >
                  <div className="grid h-28 w-44 place-items-center">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      width={176}
                      height={112}
                      className="max-h-28 w-auto object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-semibold sm:text-4xl">{brand.name}</h2>
                    <p className="mt-1 font-medium text-indigo">{brand.tagline}</p>
                    <p className="mt-3 max-w-2xl leading-relaxed text-muted">{brand.description}</p>
                    <Link
                      href={`/products?brand=${brand.id}`}
                      className="mt-5 inline-flex items-center gap-1.5 font-semibold underline decoration-lime decoration-2 underline-offset-4"
                    >
                      View {plural(countByBrand(brand.id))}
                      <ArrowUpRight className="size-4" aria-hidden />
                    </Link>
                  </div>
                  <div className="hidden gap-3 xl:flex">
                    {samples.map((p) => (
                      <ProductImage
                        key={p.id}
                        src={p.image}
                        alt=""
                        sizes="144px"
                        className="size-36 rounded-2xl"
                      />
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <p className="eyebrow text-indigo">Product ranges</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ranges.map((brand, i) => (
              <Reveal key={brand.id} delay={i * 0.07}>
                <Link
                  href={`/products?brand=${brand.id}`}
                  className="group block h-full overflow-hidden rounded-3xl bg-paper"
                >
                  <ProductImage
                    src={brand.logo}
                    alt=""
                    sizes="(min-width: 1024px) 300px, 45vw"
                    className="aspect-[5/4]"
                  />
                  <div className="p-5">
                    <h3 className="text-2xl font-semibold">{brand.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{brand.tagline}</p>
                    <p className="mt-4 font-mono text-xs text-indigo">
                      {plural(countByBrand(brand.id))}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
