"use client";

import { AnimatePresence, motion } from "motion/react";
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

  const icon = (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={added ? "added" : "add"}
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 90 }}
        transition={{ duration: 0.25 }}
        className="grid place-items-center"
      >
        <Icon className="size-4" aria-hidden />
      </motion.span>
    </AnimatePresence>
  );

  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={added ? `${product.name} is in your enquiry list` : `Add ${product.name} to enquiry list`}
        className={`grid size-10 shrink-0 place-items-center rounded-xl border transition-all duration-300 ${
          added
            ? "border-lime-bright/50 bg-lime-bright/15 text-lime-bright shadow-[0_0_20px_-4px_rgba(77,138,11,0.3)]"
            : "border-ink/[0.12] bg-surface/70 text-fg hover:border-cyan/50 hover:bg-cyan/15 hover:text-cyan hover:shadow-[0_0_20px_-4px_rgba(23,54,140,0.28)]"
        }`}
      >
        {icon}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${
        added
          ? "border-lime-bright/40 bg-lime-bright/10 text-lime-bright"
          : "border-ink/[0.16] text-fg hover:border-cyan/50 hover:bg-cyan/10"
      }`}
    >
      {icon}
      {added ? "In enquiry list" : "Add to enquiry list"}
    </button>
  );
}
