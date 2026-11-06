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
      <article className="group flex items-center gap-4 rounded-2xl bg-white p-3 transition-shadow duration-300 hover:shadow-[0_12px_40px_-20px_rgba(10,14,58,0.35)]">
        <Link href={href} tabIndex={-1} aria-hidden className="shrink-0">
          <ProductImage src={product.image} alt="" sizes="96px" className="size-20 rounded-xl sm:size-24" />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="eyebrow text-indigo">{product.brandName}</p>
          <h3 className="mt-1 truncate font-sans text-base font-semibold tracking-normal">
            <Link href={href} className="hover:text-indigo">
              {product.name}
            </Link>
          </h3>
          <p className="mt-0.5 hidden truncate text-sm text-muted sm:block">
            {product.shortDescription}
          </p>
        </div>
        <AddToEnquiry product={product} compact />
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-28px_rgba(10,14,58,0.4)]">
      <Link href={href} tabIndex={-1} aria-hidden>
        <ProductImage
          src={product.image}
          alt=""
          sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
          priority={priority}
          className="aspect-[5/4]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-indigo">
          {product.brandName} · {product.categoryName}
        </p>
        <h3 className="mt-2 font-sans text-lg font-semibold leading-snug tracking-normal">
          <Link href={href} className="hover:text-indigo">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
          {product.shortDescription}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <Link
            href={href}
            className="text-sm font-semibold underline decoration-lime decoration-2 underline-offset-4"
          >
            View details
          </Link>
          <AddToEnquiry product={product} compact />
        </div>
      </div>
    </article>
  );
}
