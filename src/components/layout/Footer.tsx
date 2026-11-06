import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { categories } from "@/data/categories";
import { nav, site } from "@/data/site";
import { generalEnquiry } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-white">
      <div className="pattern-cross absolute inset-0 -z-10 opacity-40" />
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="h-16" />
            <p className="mt-6 max-w-sm leading-relaxed text-white/65">
              Official B2B healthcare distribution across the UAE and GCC. Sister company of{" "}
              <a
                href={site.sisterOffice.website}
                target="_blank"
                rel="noreferrer"
                className="text-white underline decoration-lime underline-offset-4"
              >
                Dada Drug Store LLC
              </a>
              , Dubai.
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow text-lime-bright">Navigation</p>
            <ul className="mt-5 space-y-3 text-white/75">
              {[{ href: "/", label: "Home" }, ...nav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-lime-bright">Categories</p>
            <ul className="mt-5 grid gap-x-4 gap-y-2.5 text-sm text-white/75 sm:grid-cols-2 lg:grid-cols-1">
              {categories.slice(0, 7).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/products?category=${c.id}`}
                    className="transition-colors hover:text-white"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="text-lime-bright">
                  All {categories.length} categories →
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-lime-bright">Reach us</p>
            <ul className="mt-5 space-y-4 text-white/75">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-lime-bright" aria-hidden />
                <span className="text-sm leading-relaxed">{site.headOffice.address}</span>
              </li>
              <li>
                <a href={site.phoneHref} className="flex items-center gap-3 hover:text-white">
                  <Phone className="size-4 text-lime-bright" aria-hidden />
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-white">
                  <Mail className="size-4 text-lime-bright" aria-hidden />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={generalEnquiry}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 hover:text-white"
                >
                  <MessageCircle className="size-4 text-lime-bright" aria-hidden />
                  Enquire on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-16 select-none whitespace-nowrap text-center font-display text-[17vw] font-semibold leading-none tracking-tighter text-white/[0.06] xl:text-[15rem]"
        >
          STARMED
        </p>

        <div className="mt-6 flex flex-col justify-between gap-2 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name} · Mussafah M-16, Abu Dhabi, UAE
          </p>
          <p>UAE &amp; GCC Distribution Network (2,000+ Outlets)</p>
        </div>
      </div>
    </footer>
  );
}
