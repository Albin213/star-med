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
            className="fixed inset-0 z-[80] bg-ink/50 backdrop-blur-sm"
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
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col bg-paper"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <div>
                <h2 className="text-2xl font-semibold">Enquiry list</h2>
                <p className="text-sm text-muted">
                  {items.length} {items.length === 1 ? "product" : "products"}, sent in one message
                </p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close enquiry list"
                className="grid size-11 place-items-center rounded-full bg-ink/[0.06] hover:bg-ink/10"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <ClipboardList className="size-10 text-indigo" aria-hidden />
                <p className="text-muted">
                  Add products from the catalogue, then request pricing for all of them at once.
                </p>
                <Link
                  href="/products"
                  onClick={closeDrawer}
                  className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
                >
                  Browse Full Catalogue
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-6 py-5">
                  <AnimatePresence initial={false}>
                    {items.map(({ product, quantity }) => (
                      <motion.li
                        key={product.id}
                        layout
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-3 rounded-2xl bg-white p-3"
                      >
                        <Image
                          src={product.image}
                          alt=""
                          width={72}
                          height={72}
                          className="size-[4.5rem] rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/products/${product.slug}`}
                            onClick={closeDrawer}
                            className="line-clamp-2 text-sm font-semibold leading-snug hover:text-indigo"
                          >
                            {product.name}
                          </Link>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-1 rounded-full bg-mist p-0.5">
                              <button
                                type="button"
                                aria-label={`Decrease cartons of ${product.name}`}
                                onClick={() => setQuantity(product.id, quantity - 1)}
                                className="grid size-7 place-items-center rounded-full hover:bg-white"
                              >
                                <Minus className="size-3.5" aria-hidden />
                              </button>
                              <span className="min-w-14 text-center font-mono text-xs">
                                {quantity} CTN
                              </span>
                              <button
                                type="button"
                                aria-label={`Increase cartons of ${product.name}`}
                                onClick={() => setQuantity(product.id, quantity + 1)}
                                className="grid size-7 place-items-center rounded-full hover:bg-white"
                              >
                                <Plus className="size-3.5" aria-hidden />
                              </button>
                            </div>
                            <button
                              type="button"
                              aria-label={`Remove ${product.name}`}
                              onClick={() => removeItem(product.id)}
                              className="grid size-8 place-items-center rounded-full text-muted hover:bg-mist hover:text-ink"
                            >
                              <Trash2 className="size-4" aria-hidden />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <div className="space-y-2 border-t border-ink/10 px-6 py-5">
                  <a
                    href={basketEnquiry(items)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full bg-lime py-3.5 font-semibold text-ink transition-colors hover:bg-lime-bright"
                  >
                    <MessageCircle className="size-4" aria-hidden />
                    Enquire on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={clearItems}
                    className="w-full py-2 text-sm text-muted hover:text-ink"
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
