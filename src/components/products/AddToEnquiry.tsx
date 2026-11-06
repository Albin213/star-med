"use client";

import { Check, Plus } from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";
import type { Product } from "@/data/types";

type AddToEnquiryProps = {
  product: Product;
  /** Compact icon-only form used on product cards. */
  compact?: boolean;
};

export function AddToEnquiry({ product, compact = false }: AddToEnquiryProps) {
  const { addItem, isInBasket, openDrawer } = useInquiry();
  const added = isInBasket(product.id);
  const onClick = () => (added ? openDrawer() : addItem(product));
  const Icon = added ? Check : Plus;

  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={added ? `${product.name} is in your enquiry list` : `Add ${product.name} to enquiry list`}
        className={`grid size-10 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
          added ? "bg-lime text-ink" : "bg-ink text-white hover:bg-indigo"
        }`}
      >
        <Icon className="size-4" aria-hidden />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-ink hover:bg-ink/5"
    >
      <Icon className="size-4" aria-hidden />
      {added ? "In enquiry list" : "Add to enquiry list"}
    </button>
  );
}
