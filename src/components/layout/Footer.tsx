import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { PulseLine } from "@/components/ui/PulseLine";
import { FooterWordmark } from "./FooterWordmark";
import { categories } from "@/data/categories";
import { nav, site } from "@/data/site";
import { generalEnquiry } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-ink/[0.09] bg-void text-fg">
      <div className="grid-lines mask-fade-b absolute inset-0 -z-10 opacity-60" />
      <div className="orb -left-40 top-0 -z-10 size-[34rem] bg-violet/15" />
      <div className="orb -right-40 bottom-0 -z-10 size-[30rem] bg-cyan/10" />
      <PulseLine className="absolute inset-x-0 top-0 -z-10 h-16 w-full opacity-70" beats={6} />

      <div className="mx-auto max-w-7xl px-5 pb-10 pt-24 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="h-14" />
            <p className="mt-6 max-w-sm leading-relaxed text-dim">
              Official B2B healthcare distribution across the UAE and GCC. Sister company of{" "}
              <a
                href={site.sisterOffice.website}
                target="_blank"
                rel="noreferrer"
                className="text-fg underline decoration-cyan/60 underline-offset-4 transition-colors hover:text-cyan"
              >
                Dada Drug Store LLC
              </a>
              , Dubai.
            </p>
            <a
              href={generalEnquiry}
              target="_blank"
              rel="noreferrer"
              className="edge-spin glass mt-8 inline-flex items-center gap-3 rounded-2xl px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-cyan/10"
            >
              <MessageCircle className="size-4 text-cyan" aria-hidden />
              Enquire on WhatsApp
            </a>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow text-cyan">Navigation</p>
            <ul className="mt-5 space-y-3 text-dim">
              {[{ href: "/", label: "Home" }, ...nav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group inline-flex items-center gap-1.5 transition-colors hover:text-fg">
                    <span className="h-px w-0 bg-cyan transition-all duration-300 group-hover:w-3" aria-hidden />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-cyan">Categories</p>
            <ul className="mt-5 grid gap-x-4 gap-y-2.5 text-sm text-dim sm:grid-cols-2 lg:grid-cols-1">
              {categories.slice(0, 7).map((c) => (
                <li key={c.id}>
                  <Link href={`/products?category=${c.id}`} className="transition-colors hover:text-fg">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="inline-flex items-center gap-1 text-lime-bright hover:text-cyan">
                  All {categories.length} categories
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-cyan">Reach us</p>
            <ul className="mt-5 space-y-3 text-dim">
              <li className="glass flex gap-3 rounded-2xl p-4">
                <MapPin className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden />
                <span className="text-sm leading-relaxed">{site.headOffice.address}</span>
              </li>
              <li>
                <a href={site.phoneHref} className="flex items-center gap-3 px-1 transition-colors hover:text-fg">
                  <Phone className="size-4 text-cyan" aria-hidden />
                  <span className="font-mono text-sm">{site.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 px-1 transition-colors hover:text-fg">
                  <Mail className="size-4 text-cyan" aria-hidden />
                  <span className="font-mono text-sm">{site.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <FooterWordmark />

        <div className="mt-6 flex flex-col justify-between gap-2 border-t border-ink/[0.1] pt-6 font-mono text-xs uppercase tracking-wider text-faint sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name} · Mussafah M-16, Abu Dhabi, UAE
          </p>
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-lime-bright shadow-[0_0_8px_#71b204]" aria-hidden />
            UAE &amp; GCC Distribution Network (2,000+ Outlets)
          </p>
        </div>
      </div>
    </footer>
  );
}
