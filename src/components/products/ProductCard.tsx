import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/data/types";
import { AddToEnquiry } from "./AddToEnquiry";
import { ProductImage } from "./ProductImage";

type ProductCardProps = {
  product: Product;
  layout?: "grid" | "list";
  priority?: boolean;
};

export function ProductCard({ product, layout = "grid", priority }: ProductCardProps) {
  const href = `/products/${product.slug}`;

  if (layout === "list") {
    return (
      <article
        data-spot
        className="glass group flex items-center gap-4 rounded-2xl p-3 transition-all duration-500 hover:border-cyan/30"
      >
        <Link href={href} tabIndex={-1} aria-hidden className="shrink-0">
          <ProductImage src={product.image} alt="" sizes="96px" className="size-20 rounded-xl sm:size-24" />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="eyebrow text-cyan">{product.brandName}</p>
          <h3 className="mt-1 truncate font-sans text-base font-semibold tracking-normal">
            <Link href={href} className="transition-colors hover:text-cyan">
              {product.name}
            </Link>
          </h3>
          <p className="mt-0.5 hidden truncate text-sm text-dim sm:block">{product.shortDescription}</p>
        </div>
        <AddToEnquiry product={product} compact />
      </article>
    );
  }

  return (
    <article
      data-spot
      className="glass edge-glow group flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-700 ease-premium hover:-translate-y-2 hover:shadow-[0_30px_70px_-30px_rgba(23,54,140,0.18)]"
    >
      <Link href={href} tabIndex={-1} aria-hidden className="relative m-2 block overflow-hidden rounded-[1.25rem]">
        <ProductImage
          src={product.image}
          alt=""
          sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
          priority={priority}
          className="aspect-[5/4]"
        />
        <span className="absolute right-3 top-3 rounded-md border border-ink/[0.12] bg-void/70 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-dim backdrop-blur">
          {product.brandName}
        </span>
      </Link>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
        <p className="eyebrow text-cyan/80">{product.categoryName}</p>
        <h3 className="mt-2 font-sans text-lg font-semibold leading-snug tracking-normal">
          <Link href={href} className="transition-colors hover:text-cyan">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-dim">{product.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between border-t border-ink/[0.09] pt-4">
          <Link
            href={href}
            className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-fg transition-colors hover:text-cyan"
          >
            View details
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/link:rotate-45" aria-hidden />
          </Link>
          <AddToEnquiry product={product} compact />
        </div>
      </div>
    </article>
  );
}
