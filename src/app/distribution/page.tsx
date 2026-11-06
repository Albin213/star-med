import { Building2, MessageCircle, Phone, Mail } from "lucide-react";
import type { Metadata } from "next";
import { GccMap } from "@/components/distribution/GccMap";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
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
        description="Supplying over 2,000 retail pharmacies, hospitals, clinics, and hypermarket chains across the UAE and GCC through direct warehouse fulfillment and sub-distribution partner networks."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl bg-white p-7">
                <h2 className="text-2xl font-semibold">{pillar.title}</h2>
                <p className="mt-3 leading-relaxed text-muted">{pillar.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="pattern-cross mask-fade absolute inset-0 -z-10" />
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-24">
          <GccMap />
          <ul className="mt-6 flex flex-wrap justify-center gap-2 sm:hidden">
            {territories.map((t) => (
              <li key={t} className="rounded-full border border-white/20 px-3 py-1 text-sm">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-32">
        <div>
          <p className="eyebrow text-indigo">Direct &amp; Sub-Distribution</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-6xl">
            <TextReveal text="Supply channels we serve" />
          </h2>
          <p className="mt-5 text-lg text-muted">
            Reliable weekly replenishments and certified batch compliance.
          </p>
        </div>
        <ul className="border-t border-ink/10">
          {channels.map((channel, i) => (
            <Reveal key={channel.name} delay={i * 0.05}>
              <li className="border-b border-ink/10 py-4">
                <p className="text-lg font-semibold">{channel.name}</p>
                <p className="text-sm text-muted">{channel.note}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-20 sm:px-8 md:grid-cols-2 lg:py-24">
          {hubs.map((hub, i) => (
            <Reveal key={hub.title} delay={i * 0.1}>
              <article className="h-full rounded-3xl bg-paper p-7 sm:p-9">
                <Building2 className="size-6 text-indigo" aria-hidden />
                <h2 className="mt-5 text-2xl font-semibold">{hub.title}</h2>
                <p className="mt-2 text-sm font-medium">{hub.address}</p>
                <p className="mt-3 leading-relaxed text-muted">{hub.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <p className="eyebrow text-indigo">Immediate B2B Onboarding</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-6xl">
          <TextReveal text="Partner with STARMED General Trading LLC" />
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Connect directly with our commercial team on WhatsApp. Select your organization type below
          to initiate wholesale pricing, carton counts, and account registration instantly.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {partners.map((partner, i) => (
            <Reveal key={partner.role} delay={i * 0.08}>
              <a
                href={partnerEnquiry(partner.role)}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-3xl bg-white p-7 transition-colors duration-500 hover:bg-ink hover:text-white"
              >
                <p className="eyebrow text-indigo transition-colors group-hover:text-lime-bright">
                  {partner.label}
                </p>
                <h3 className="mt-3 text-2xl font-semibold">{partner.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted transition-colors group-hover:text-white/70">
                  {partner.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold">
                  <MessageCircle className="size-4" aria-hidden />
                  Enquire via WhatsApp
                </span>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-muted">
          <a href={site.phoneHref} className="inline-flex items-center gap-2 hover:text-ink">
            <Phone className="size-4" aria-hidden />
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-ink">
            <Mail className="size-4" aria-hidden />
            {site.email}
          </a>
          <span>Head Office: Mussafah M-16, Abu Dhabi, UAE</span>
        </div>
      </section>
    </>
  );
}
