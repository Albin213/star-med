import { ArrowUpRight, Building2, Mail, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { GccMap } from "@/components/distribution/GccMap";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { site, territories } from "@/data/site";
import { partnerEnquiry } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "B2B Distribution & Wholesale Network",
  description:
    "Supplying over 2,000 retail pharmacies, hospitals, clinics, and hypermarket chains across the UAE and GCC.",
};

const pillars = [
  {
    title: "2,000+ Outlets Served",
    body: "Supplying community pharmacies, government and private hospitals, and retail supermarkets throughout Abu Dhabi, Dubai, and the Northern Emirates.",
  },
  {
    title: "Dada Drug Store Synergy",
    body: "Seamless operations with sister company Dada Drug Store LLC in Dubai International City, providing integrated fulfillment and volume supply.",
  },
  {
    title: "GCC Regional Expansion",
    body: "Active export channels and sub-distribution partnerships across Saudi Arabia, Oman, Kuwait, Bahrain, and Qatar.",
  },
];

const channels = [
  { name: "Major Pharmacy Chains", note: "Weekly dispatch and batch certification" },
  { name: "Private & Government Hospitals", note: "Weekly dispatch and batch certification" },
  { name: "Specialist Medical Clinics", note: "Weekly dispatch and batch certification" },
  { name: "Supermarket & Hypermarket Retailers", note: "Weekly dispatch and batch certification" },
  { name: "Sub-Distribution Wholesale Partners", note: "Weekly dispatch and batch certification" },
  { name: "Government & Tender Procurement", note: "MOH compliant documentation" },
];

const hubs = [
  {
    title: "Abu Dhabi Primary Hub",
    address: site.headOffice.address,
    body: "Central warehousing in Mussafah 16 equipped for high-throughput healthcare distribution across Abu Dhabi, Al Ain, and Western Region.",
  },
  {
    title: "Dubai Sister Hub",
    address: site.sisterOffice.address,
    body: "Dada Drug Store LLC warehousing in Dubai International City facilitating rapid northern emirates deliveries and GCC transit.",
  },
];

const partners = [
  {
    label: "Retail Pharmacies",
    title: "Pharmacy Chains & Independent Stores",
    body: "Wholesale supply for DADA personal care, condoms, masks, Dr.Care serums, and Mediz thermometers.",
    role: "Pharmacy Chain / Community Pharmacy",
  },
  {
    label: "Institutions",
    title: "Hospitals, Medical Centers & Clinics",
    body: "Bulk PPE, clinical cotton, certified first aid stations, diagnostic medical devices, and diabetic travel cases.",
    role: "Hospital / Healthcare Center / Clinic",
  },
  {
    label: "Regional Trade",
    title: "GCC Sub-Distributors & Wholesalers",
    body: "Container and master carton volume distribution for Saudi Arabia, Oman, Kuwait, Bahrain, and Qatar.",
    role: "GCC Regional Sub-Distributor",
  },
];

export default function DistributionPage() {
  return (
    <>
      <PageHero
        eyebrow="Regional Healthcare Supply Chain • UAE & GCC"
        title="B2B Distribution & Wholesale Network"
        accent={["Distribution"]}
        packshots={[
          { src: "/images/products/dada-protective-mask-black.png", alt: "DADA Disposable Protective Mask box", w: 1536, h: 1024 },
          { src: "/images/products/first-aid-kit-25-person.png", alt: "First aid kit for 25 people", w: 800, h: 666 },
          { src: "/images/products/dada-cotton-tissue.png", alt: "DADA Cotton Tissue packs", w: 1315, h: 1197 },
        ]}
        meta={[
          { value: "2,000+", label: "Pharmacies, hospitals & retailers" },
          { value: "UAE & GCC", label: "Regional coverage" },
          { value: "Direct", label: "Warehouse fulfilment" },
        ]}
        description="Supplying over 2,000 retail pharmacies, hospitals, clinics, and hypermarket chains across the UAE and GCC through direct warehouse fulfillment and sub-distribution partner networks."
      />

      {/* Pillars */}
      <section className="relative isolate overflow-hidden border-t border-ink/[0.09] bg-deep">
        <div className="grid-lines mask-fade absolute inset-0 -z-10 opacity-40" />
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.08}>
                <div data-spot className="glass edge-glow h-full overflow-hidden rounded-3xl p-8">
                  <span className="font-mono text-xs text-cyan">0{i + 1}</span>
                  <h2 className="mt-10 text-2xl font-semibold">{pillar.title}</h2>
                  <p className="mt-3 leading-relaxed text-dim">{pillar.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="relative isolate overflow-hidden">
        <div className="orb left-1/2 top-1/2 -z-10 size-[40rem] -translate-x-1/2 -translate-y-1/2 bg-cyan/10" />
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-28">
          <Reveal>
            <div className="hud relative rounded-3xl border border-ink/[0.1] bg-deep/70 p-4 sm:p-8">
              <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                <span className="flex items-center gap-2 text-cyan">
                  <span className="size-1.5 animate-pulse rounded-full bg-cyan" />
                  Network
                </span>
                <span>UAE · GCC</span>
              </div>
              <GccMap />
            </div>
          </Reveal>
          <ul className="mt-6 flex flex-wrap justify-center gap-2 sm:hidden">
            {territories.map((t) => (
              <li key={t} className="rounded-lg border border-ink/[0.12] bg-surface/70 px-3 py-1 font-mono text-xs uppercase text-dim">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Channels */}
      <section className="relative isolate overflow-hidden border-y border-ink/[0.09] bg-deep">
        <div className="grid-dots mask-fade absolute inset-0 -z-10 opacity-40" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-28 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-36">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionLabel index="01">Direct & Sub-Distribution</SectionLabel>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.02] sm:text-6xl">
              <TextReveal text="Supply channels we serve" />
            </h2>
            <p className="mt-5 text-lg text-dim">Reliable weekly replenishments and certified batch compliance.</p>
          </div>
          <ul className="space-y-3">
            {channels.map((channel, i) => (
              <Reveal key={channel.name} delay={i * 0.05}>
                <li data-spot className="glass group flex items-center gap-5 overflow-hidden rounded-2xl p-5 transition-colors hover:border-cyan/30">
                  <span className="font-mono text-xs text-faint transition-colors group-hover:text-cyan">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <p className="text-lg font-semibold">{channel.name}</p>
                    <p className="font-mono text-xs uppercase tracking-wider text-dim">{channel.note}</p>
                  </div>
                  <span className="size-2 rounded-full bg-lime-bright/70 shadow-[0_0_10px_#71b204]" aria-hidden />
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Hubs */}
      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-24 sm:px-8 md:grid-cols-2 lg:py-28">
        {hubs.map((hub, i) => (
          <Reveal key={hub.title} delay={i * 0.1}>
            <article data-spot className="glass edge-glow h-full overflow-hidden rounded-3xl p-8 sm:p-10">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl border border-cyan/25 bg-cyan/[0.07]">
                  <Building2 className="size-5 text-cyan" aria-hidden />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-lime-bright">Hub · 0{i + 1}</span>
              </div>
              <h2 className="mt-6 text-2xl font-semibold">{hub.title}</h2>
              <p className="mt-2 font-mono text-xs leading-relaxed text-cyan/80">{hub.address}</p>
              <p className="mt-4 leading-relaxed text-dim">{hub.body}</p>
            </article>
          </Reveal>
        ))}
      </section>

      {/* Partner onboarding */}
      <section className="relative isolate overflow-hidden border-t border-ink/[0.09] bg-deep">
        <div className="grid-lines mask-fade absolute inset-0 -z-10 opacity-40" />
        <div className="orb -left-40 bottom-0 -z-10 size-[34rem] bg-violet/25" />
        <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 lg:py-36">
          <SectionLabel index="02" tone="lime">Immediate B2B Onboarding</SectionLabel>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] sm:text-6xl">
            <TextReveal text="Partner with STARMED General Trading LLC" />
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-dim">
            Connect directly with our commercial team on WhatsApp. Select your organization type below
            to initiate wholesale pricing, carton counts, and account registration instantly.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {partners.map((partner, i) => (
              <Reveal key={partner.role} delay={i * 0.08}>
                <a
                  href={partnerEnquiry(partner.role)}
                  target="_blank"
                  rel="noreferrer"
                  data-spot
                  className="glass edge-glow group flex h-full flex-col overflow-hidden rounded-3xl p-8 transition-transform duration-700 ease-premium hover:-translate-y-2"
                >
                  <p className="eyebrow text-cyan">{partner.label}</p>
                  <h3 className="mt-4 text-2xl font-semibold">{partner.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-dim">{partner.body}</p>
                  <span className="mt-8 inline-flex items-center justify-between rounded-2xl border border-ink/[0.12] bg-surface/70 px-4 py-3 font-semibold transition-colors group-hover:border-cyan/40 group-hover:bg-cyan/10 group-hover:text-cyan">
                    <span className="inline-flex items-center gap-2">
                      <MessageCircle className="size-4" aria-hidden />
                      Enquire via WhatsApp
                    </span>
                    <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" aria-hidden />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm text-dim">
            <a href={site.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-cyan">
              <Phone className="size-4 text-cyan" aria-hidden />
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-cyan">
              <Mail className="size-4 text-cyan" aria-hidden />
              {site.email}
            </a>
            <span>Head Office: Mussafah M-16, Abu Dhabi, UAE</span>
          </div>
        </div>
      </section>
    </>
  );
}
