"use client";

import { AnimatePresence, motion } from "motion/react";
import { FileText, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type CatalogueSlideProps = { src: string; page: number; productName: string };

/** Opens the original catalogue page, the source of truth for packaging and specs. */
export function CatalogueSlide({ src, page, productName }: CatalogueSlideProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-sm font-medium text-indigo underline decoration-indigo/30 underline-offset-4 hover:decoration-indigo"
      >
        <FileText className="size-4" aria-hidden />
        View catalogue page {page}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Catalogue page for ${productName}`}
            className="fixed inset-0 z-[90] grid place-items-center bg-ink/85 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-4xl"
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={`Official catalogue page ${page}: ${productName}`}
                width={1240}
                height={874}
                className="h-auto w-full rounded-2xl"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close catalogue page"
                className="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-ink text-white"
              >
                <X className="size-5" aria-hidden />
              </button>
              <p className="mt-3 text-center text-sm text-white/70">
                STARMED General Trading LLC • Official Product Packaging &amp; Technical
                Specifications
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
