"use client";

import { AnimatePresence, motion } from "motion/react";
import { FileText, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type CatalogueSlideProps = { src: string; page: number; productName: string };

/** Opens the original catalogue page, the source of truth for packaging and specs. */
export function CatalogueSlide({ src, page, productName }: CatalogueSlideProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const modal = (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Catalogue page for ${productName}`}
          className="fixed inset-0 z-[90] grid place-items-center bg-void/85 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="relative w-full max-w-4xl"
            initial={{ scale: 0.92, y: 30, rotateX: 12, filter: "blur(10px)" }}
            animate={{ scale: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="edge-spin rounded-3xl bg-deep p-2">
              <Image
                src={src}
                alt={`Official catalogue page ${page}: ${productName}`}
                width={1240}
                height={874}
                className="h-auto w-full rounded-2xl"
              />
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close catalogue page"
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-xl border border-ink/[0.16] bg-void/80 text-fg backdrop-blur transition-colors hover:border-cyan/50 hover:text-cyan"
            >
              <X className="size-5" aria-hidden />
            </button>
            <p className="mt-4 text-center font-mono text-xs uppercase tracking-wider text-dim">
              STARMED General Trading LLC • Official Product Packaging &amp; Technical Specifications
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-2 rounded-xl border border-ink/[0.12] bg-surface/70 px-4 py-2.5 text-sm font-medium text-dim transition-colors hover:border-cyan/40 hover:text-cyan"
      >
        <FileText className="size-4 text-cyan" aria-hidden />
        View catalogue page {page}
      </button>
      {mounted && createPortal(modal, document.body)}
    </>
  );
}
