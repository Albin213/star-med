"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, ChevronDown, ClipboardList, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { useInquiry } from "@/context/InquiryContext";
import { categories } from "@/data/categories";
import { nav, site } from "@/data/site";
import { countByCategory } from "@/lib/catalogue";
import { generalEnquiry } from "@/lib/whatsapp";

const pad = (n: number) => String(n).padStart(2, "0");

export function Header() {
  const pathname = usePathname();
  const { items, openDrawer } = useInquiry();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    // Tuck the bar away while reading downwards; bring it back on any upward scroll.
    setHidden(y > 400 && y > prev + 2 && !megaOpen);
    if (y < prev - 2) setHidden(false);
  });

  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-130%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div
          className={`relative mx-auto flex max-w-7xl items-center justify-between rounded-2xl py-2 pl-4 pr-2 transition-all duration-500 ease-premium ${
            scrolled
              ? "glass-strong shadow-[0_20px_60px_-20px_rgba(14,26,54,0.27)]"
              : "border border-ink/[0.09] bg-surface/70 backdrop-blur-md"
          }`}
        >
          {/* Glowing hairline along the bottom edge once scrolled */}
          <span
            aria-hidden
            className={`absolute inset-x-8 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent transition-opacity duration-500 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          />

          <Link href="/" aria-label={`${site.short} home`} className="shrink-0">
            <Logo className="h-8 sm:h-9" priority />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
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
                    className={`group relative inline-flex items-center gap-1 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                      active ? "text-fg" : "text-dim hover:text-fg"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-xl border border-cyan/25 bg-cyan/[0.08] shadow-[0_0_24px_-6px_rgba(23,54,140,0.2)]"
                      />
                    )}
                    {item.label}
                    {isProducts && <ChevronDown className="size-3.5 opacity-60 transition-transform group-hover:rotate-180" aria-hidden />}
                    <span
                      aria-hidden
                      className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-cyan transition-transform duration-500 ease-premium group-hover:scale-x-100"
                    />
                  </Link>

                  {isProducts && (
                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-1/2 top-full w-[40rem] -translate-x-1/2 pt-4"
                        >
                          <div className="glass-strong edge-glow overflow-hidden rounded-3xl p-3 shadow-[0_30px_80px_-20px_rgba(14,26,54,0.27)]">
                            <div className="grid-dots pointer-events-none absolute inset-0 opacity-40" />
                            <p className="eyebrow relative px-3 pb-2 pt-1 text-cyan">Categories · {categories.length}</p>
                            <div className="relative grid grid-cols-2 gap-0.5">
                              {categories.map((c, i) => (
                                <Link
                                  key={c.id}
                                  href={`/products?category=${c.id}`}
                                  className="group/item flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-dim transition-all hover:bg-surface/70 hover:text-fg"
                                >
                                  <span className="font-mono text-[10px] text-faint group-hover/item:text-cyan">{pad(i + 1)}</span>
                                  <span className="flex-1">{c.name}</span>
                                  <span className="rounded-md bg-surface/70 px-1.5 py-0.5 font-mono text-[10px] text-dim group-hover/item:bg-cyan/15 group-hover/item:text-cyan">
                                    {countByCategory(c.id)}
                                  </span>
                                </Link>
                              ))}
                            </div>
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
              className="relative grid size-11 place-items-center rounded-xl text-dim transition-colors hover:bg-surface/70 hover:text-fg"
            >
              <ClipboardList className="size-5" aria-hidden />
              <AnimatePresence>
                {items.length > 0 && (
                  <motion.span
                    key={items.length}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute right-0.5 top-0.5 grid size-5 place-items-center rounded-full bg-accent font-mono text-[10px] font-bold text-on-accent shadow-[0_0_12px_rgba(23,54,140,0.32)]"
                  >
                    {items.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <a
              href={generalEnquiry}
              target="_blank"
              rel="noreferrer"
              className="edge-spin hidden items-center gap-2 rounded-xl bg-surface/70 px-5 py-3 text-sm font-semibold text-fg transition-colors hover:bg-cyan/10 sm:inline-flex"
            >
              <MessageCircle className="size-4 text-cyan" aria-hidden />
              Enquire
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="group grid size-11 place-items-center rounded-xl bg-surface/70 lg:hidden"
            >
              <span className="flex w-5 flex-col items-end gap-1.5" aria-hidden>
                <span className="h-px w-5 bg-fg" />
                <span className="h-px w-3 bg-cyan transition-all group-hover:w-5" />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-cyan via-violet to-lime-bright shadow-[0_0_12px_rgba(23,54,140,0.36)]"
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            data-lenis-prevent
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[70] overflow-y-auto bg-void px-5 pb-10 pt-5 text-fg lg:hidden"
          >
            <div className="grid-lines mask-fade pointer-events-none absolute inset-0" />
            <div className="orb -right-20 top-20 size-80 bg-cyan/20" />
            <div className="orb -left-20 bottom-10 size-72 bg-violet/25" />

            <div className="relative flex items-center justify-between">
              <Logo className="h-9" />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-xl border border-ink/[0.12] bg-surface/70"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <nav aria-label="Mobile" className="relative mt-10 flex flex-col">
              {[{ href: "/", label: "Home" }, ...nav].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 border-b border-ink/[0.1] py-4"
                  >
                    <span className="font-mono text-xs text-cyan">{pad(i + 1)}</span>
                    <span className="flex-1 font-display text-3xl font-semibold tracking-tight">{item.label}</span>
                    <ArrowUpRight className="size-5 text-faint transition-colors group-hover:text-cyan" aria-hidden />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="eyebrow relative mt-8 text-cyan">Categories</p>
            <div className="relative mt-3 flex flex-wrap gap-2">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/products?category=${c.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full border border-ink/[0.12] bg-surface/70 px-3 py-1.5 text-sm text-dim"
                >
                  {c.name}
                </Link>
              ))}
            </div>
            <a
              href={generalEnquiry}
              target="_blank"
              rel="noreferrer"
              className="relative mt-8 flex items-center justify-center gap-2 rounded-2xl bg-accent hover:bg-accent/90 py-4 font-semibold text-on-accent"
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
