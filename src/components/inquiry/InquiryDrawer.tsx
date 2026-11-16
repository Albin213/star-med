"use client";

import { AnimatePresence, motion } from "motion/react";
import { ClipboardList, MessageCircle, Minus, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useInquiry } from "@/context/InquiryContext";
import { basketEnquiry } from "@/lib/whatsapp";

export function InquiryDrawer() {
  const { items, isOpen, closeDrawer, removeItem, setQuantity, clearItems } = useInquiry();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeDrawer]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-void/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Enquiry list"
            data-lenis-prevent
            className="glass-strong fixed inset-y-2 right-2 z-[90] flex w-[calc(100%-1rem)] max-w-md flex-col overflow-hidden rounded-3xl"
            initial={{ x: "110%" }}
            animate={{ x: 0 }}
            exit={{ x: "110%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
          >
            <div className="grid-dots pointer-events-none absolute inset-0 opacity-30" />
            <div className="orb -right-20 -top-20 size-64 bg-cyan/20" />

            <div className="relative flex items-center justify-between border-b border-ink/[0.1] px-6 py-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">B2B · Quote</p>
                <h2 className="mt-1 text-2xl font-semibold">Enquiry list</h2>
                <p className="text-sm text-dim">
                  {items.length} {items.length === 1 ? "product" : "products"}, sent in one message
                </p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close enquiry list"
                className="grid size-11 place-items-center rounded-xl border border-ink/[0.12] bg-surface/70 transition-colors hover:border-cyan/50 hover:text-cyan"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="relative flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <div className="relative grid size-20 place-items-center rounded-3xl border border-cyan/25 bg-cyan/[0.07]">
                  <span className="absolute inset-0 animate-ping rounded-3xl border border-cyan/30" />
                  <ClipboardList className="size-8 text-cyan" aria-hidden />
                </div>
                <p className="text-dim">Add products from the catalogue, then request pricing for all of them at once.</p>
                <Link
                  href="/products"
                  onClick={closeDrawer}
                  className="rounded-full bg-accent hover:bg-accent/90 px-6 py-3 text-sm font-semibold text-on-accent"
                >
                  Browse Full Catalogue
                </Link>
              </div>
            ) : (
              <>
                <ul className="relative flex-1 space-y-3 overflow-y-auto overscroll-contain px-5 py-5">
                  <AnimatePresence initial={false}>
                    {items.map(({ product, quantity }, i) => (
                      <motion.li
                        key={product.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: i * 0.04 } }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-3 rounded-2xl border border-ink/[0.1] bg-surface/70 p-3"
                      >
                        <Image
                          src={product.image}
                          alt=""
                          width={72}
                          height={72}
                          className="size-[4.5rem] rounded-xl bg-surface object-contain p-1"
                        />
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/products/${product.slug}`}
                            onClick={closeDrawer}
                            className="line-clamp-2 text-sm font-semibold leading-snug transition-colors hover:text-cyan"
                          >
                            {product.name}
                          </Link>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-1 rounded-lg border border-ink/[0.12] bg-void/60 p-0.5">
                              <button
                                type="button"
                                aria-label={`Decrease cartons of ${product.name}`}
                                onClick={() => setQuantity(product.id, quantity - 1)}
                                className="grid size-7 place-items-center rounded-md text-dim hover:bg-cyan/15 hover:text-cyan"
                              >
                                <Minus className="size-3.5" aria-hidden />
                              </button>
                              <span className="min-w-14 text-center font-mono text-xs text-cyan">{quantity} CTN</span>
                              <button
                                type="button"
                                aria-label={`Increase cartons of ${product.name}`}
                                onClick={() => setQuantity(product.id, quantity + 1)}
                                className="grid size-7 place-items-center rounded-md text-dim hover:bg-cyan/15 hover:text-cyan"
                              >
                                <Plus className="size-3.5" aria-hidden />
                              </button>
                            </div>
                            <button
                              type="button"
                              aria-label={`Remove ${product.name}`}
                              onClick={() => removeItem(product.id)}
                              className="grid size-8 place-items-center rounded-lg text-faint transition-colors hover:bg-red-500/10 hover:text-red-400"
                            >
                              <Trash2 className="size-4" aria-hidden />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <div className="relative space-y-2 border-t border-ink/[0.1] px-6 py-5">
                  <a
                    href={basketEnquiry(items)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-accent hover:bg-accent/90 py-4 font-semibold text-on-accent shadow-[0_10px_40px_-10px_rgba(23,54,140,0.24)] transition-shadow hover:shadow-[0_14px_60px_-8px_rgba(23,54,140,0.36)]"
                  >
                    <MessageCircle className="size-4" aria-hidden />
                    Enquire on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={clearItems}
                    className="w-full py-2 font-mono text-xs uppercase tracking-wider text-faint transition-colors hover:text-fg"
                  >
                    Clear list
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
