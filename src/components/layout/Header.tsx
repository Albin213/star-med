"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ChevronDown, ClipboardList, Menu, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { useInquiry } from "@/context/InquiryContext";
import { categories } from "@/data/categories";
import { nav, site } from "@/data/site";
import { countByCategory } from "@/lib/catalogue";
import { generalEnquiry } from "@/lib/whatsapp";

export function Header() {
  const pathname = usePathname();
  const { items, openDrawer } = useInquiry();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // Product pages open on a light surface, so the bar starts solid there.
  const solid = scrolled || /^\/products\/.+/.test(pathname);
  const tone = solid ? "text-ink" : "text-white";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={`relative mx-auto flex max-w-7xl items-center justify-between rounded-full py-2 pl-3 pr-2 transition-all duration-500 ease-premium ${tone} ${
            solid
              ? "bg-white/90 shadow-[0_8px_40px_-12px_rgba(10,14,58,0.25)] backdrop-blur-xl"
              : "bg-white/[0.06] backdrop-blur-md"
          }`}
        >
          <Link href="/" aria-label={`${site.short} home`} className="shrink-0">
            <Logo className="h-9" priority />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              const isProducts = item.href === "/products";
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={isProducts ? () => setMegaOpen(true) : undefined}
                  onMouseLeave={isProducts ? () => setMegaOpen(false) : undefined}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium"
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className={`absolute inset-0 -z-10 rounded-full ${solid ? "bg-ink/[0.07]" : "bg-white/15"}`}
                      />
                    )}
                    {item.label}
                    {isProducts && <ChevronDown className="size-3.5 opacity-60" aria-hidden />}
                  </Link>

                  {isProducts && (
                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-1/2 top-full w-[38rem] -translate-x-1/2 pt-4"
                        >
                          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 rounded-3xl bg-white p-4 text-ink shadow-[0_24px_70px_-20px_rgba(10,14,58,0.4)]">
                            {categories.map((c) => (
                              <Link
                                key={c.id}
                                href={`/products?category=${c.id}`}
                                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors hover:bg-mist"
                              >
                                {c.name}
                                <span className="font-mono text-xs text-muted">
                                  {countByCategory(c.id)}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={openDrawer}
              aria-label={`Open enquiry list, ${items.length} items`}
              className={`relative grid size-11 place-items-center rounded-full transition-colors ${
                solid ? "hover:bg-ink/[0.07]" : "hover:bg-white/15"
              }`}
            >
              <ClipboardList className="size-5" aria-hidden />
              {items.length > 0 && (
                <span className="absolute right-0.5 top-0.5 grid size-5 place-items-center rounded-full bg-lime font-mono text-[10px] font-semibold text-ink">
                  {items.length}
                </span>
              )}
            </button>
            <a
              href={generalEnquiry}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-lime-bright sm:inline-flex"
            >
              <MessageCircle className="size-4" aria-hidden />
              Enquire
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className={`grid size-11 place-items-center rounded-full lg:hidden ${
                solid ? "bg-ink/[0.07]" : "bg-white/15"
              }`}
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-lime"
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            data-lenis-prevent
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] overflow-y-auto bg-ink px-5 pb-10 pt-5 text-white lg:hidden"
          >
            <div className="flex items-center justify-between">
              <Logo className="h-9" />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full bg-white/10"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-10 flex flex-col">
              {[{ href: "/", label: "Home" }, ...nav].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-white/10 py-3.5 font-display text-3xl font-semibold"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="eyebrow mt-8 text-lime-bright">Categories</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/products?category=${c.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/80"
                >
                  {c.name}
                </Link>
              ))}
            </div>
            <a
              href={generalEnquiry}
              target="_blank"
              rel="noreferrer"
              className="mt-8 flex items-center justify-center gap-2 rounded-full bg-lime py-3.5 font-semibold text-ink"
            >
              <MessageCircle className="size-4" aria-hidden />
              Enquire on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
