import type { Metadata } from "next";
import Image from "next/image";
import { Check, HeartPulse, ShieldCheck } from "lucide-react";
import { OfficeCard } from "@/components/about/OfficeCard";
import { CtaBand } from "@/components/home/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollText } from "@/components/ui/ScrollText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "STARMED General Trading LLC, established in 2020 in Mussafah, Abu Dhabi, specialises in pharmaceutical and healthcare distribution across the UAE and GCC.",
};

const values = [
  {
    icon: HeartPulse,
    title: "Healthcare Accessibility",
    body: "Ensuring uninterrupted supply chains for essential medical accessories and everyday hygiene needs across all emirates.",
  },
  {
    icon: ShieldCheck,
    title: "Ethical Practices & Quality",
    body: "Strict adherence to international CE 0123, ISO 13485, and UAE Ministry of Health compliance mandates.",
  },
];

const range = [
  "Personal care products",
  "Cosmetics",
  "Hair & skin care solutions",
  "GSL & OTC medications",
  "Wheelchairs and rehabilitation equipment",
  "Home care devices",
  "Medical devices",
  "Self-test kits",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Established 2020 • Abu Dhabi, UAE"
        title="About STARMED General Trading LLC"
        accent={["STARMED"]}
        packshots={[
          { src: "/images/products/drcare-hyaluronic-acid-serum.png", alt: "Dr.Care Hyaluronic Acid Serum", w: 1199, h: 1312 },
          { src: "/images/products/rosemary-mint-oil.png", alt: "Dr.Care Rosemary Mint Hair Oil", w: 1024, h: 1536 },
          { src: "/images/products/dada-cotton-pads.png", alt: "DADA Cotton Pads", w: 1312, h: 1199 },
        ]}
        meta={[
          { value: "2020", label: "Established" },
          { value: "Abu Dhabi", label: "Mussafah 16 headquarters" },
          { value: "2,000+", label: "Outlets supplied" },
        ]}
        description="Dynamic and fast-growing pharmaceutical and healthcare distribution company specializing in medical devices, clinical personal care, and therapeutic wellness supplies across the UAE and GCC region."
      />

      {/* Story */}
      <section className="relative isolate overflow-hidden border-t border-ink/[0.09] bg-deep">
        <div className="grid-lines mask-fade absolute inset-0 -z-10 opacity-40" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-28 sm:px-8 lg:grid-cols-[1fr_1.3fr] lg:gap-20 lg:py-36">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionLabel index="01">Since 2020</SectionLabel>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.02] sm:text-6xl">
              <TextReveal text="Our corporate story" />
            </h2>
          </div>
          <Reveal className="space-y-6 text-lg leading-relaxed text-dim">
            <p>
              STARMED General Trading LLC was established in 2020 and is based in Mussafah 16, Abu
              Dhabi. The company specializes in pharmaceutical distribution and high-quality healthcare
              and personal care products across the UAE and GCC region.
            </p>
            <p>
              We are proud to be a sister company of{" "}
              <strong className="font-semibold text-cyan">Dada Drug Store LLC</strong>, a
              well-established pharmaceutical distributor based in Dubai International City. Together,
              our combined logistics and distribution infrastructure serves a robust network of over{" "}
              <strong className="font-semibold text-lime-bright">2,000 outlets</strong> across the UAE,
              including major hospital institutions, leading pharmacy chains, and retail supermarkets
              through direct and sub-distribution channels.
            </p>
            <p>
              The company is committed to promoting health and wellness by offering innovative,
              effective, and trusted products under our own brands and verified global partners.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Range */}
      <section className="relative isolate overflow-hidden">
        <div className="orb -left-40 top-20 -z-10 size-[30rem] bg-violet/25" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-28 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-32">
          <Reveal>
            <div className="hud scanline relative overflow-hidden rounded-3xl border border-ink/[0.12] p-2">
              <Image
                src="/images/banners/product-range-showcase.jpg"
                alt="STARMED product range on display shelves with mobility equipment"
                width={1240}
                height={874}
                sizes="(min-width: 1024px) 600px, 92vw"
                className="h-auto w-full rounded-[1.25rem]"
              />
              <div className="pointer-events-none absolute inset-2 rounded-[1.25rem] bg-gradient-to-t from-void/70 via-transparent to-cyan/10" />
            </div>
          </Reveal>
          <div>
            <SectionLabel index="02">Full-spectrum healthcare distribution</SectionLabel>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl">
              Direct distribution to 2,000+ pharmacies, hospitals, and clinical partners
            </h2>
            <ul className="mt-9 grid gap-2.5 sm:grid-cols-2">
              {range.map((item, i) => (
                <Reveal key={item} delay={i * 0.04}>
                  <li className="glass flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-dim transition-colors hover:border-cyan/30 hover:text-fg">
                    <span className="grid size-5 shrink-0 place-items-center rounded-md bg-cyan/15">
                      <Check className="size-3 text-cyan" aria-hidden />
                    </span>
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="relative isolate overflow-hidden border-y border-ink/[0.09] bg-deep">
        <div className="grid-dots mask-fade absolute inset-0 -z-10 opacity-50" />
        <div className="orb right-0 top-0 -z-10 size-[36rem] bg-cyan/15" />
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-28 sm:px-8 md:grid-cols-2 lg:py-36">
          <div>
            <SectionLabel tone="lime">Our vision</SectionLabel>
            <ScrollText
              text="To be the most respected and customer-centric pharmaceutical distributor in the region, offering comprehensive healthcare solutions through owned brands and long-term partnerships."
              accent={["respected", "customer-centric"]}
              className="mt-6 font-display text-3xl font-medium leading-[1.2] tracking-tight sm:text-4xl"
            />
          </div>
          <div>
            <SectionLabel tone="lime">Our mission</SectionLabel>
            <ScrollText
              text="To enhance the accessibility and availability of innovative, safe, and reliable health and wellness products throughout the UAE and the GCC, with a commitment to service excellence and ethical practices."
              accent={["accessibility", "availability"]}
              className="mt-6 font-display text-3xl font-medium leading-[1.2] tracking-tight sm:text-4xl"
            />
          </div>
        </div>
      </section>

      {/* Values & offices */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8 lg:py-36">
        <div className="grid gap-5 md:grid-cols-2">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <Reveal key={value.title} delay={i * 0.1}>
                <div data-spot className="glass edge-glow group h-full overflow-hidden rounded-3xl p-8 sm:p-10">
                  <span className="grid size-14 place-items-center rounded-2xl border border-cyan/25 bg-cyan/[0.07]">
                    <Icon className="size-6 text-cyan transition-transform duration-500 group-hover:scale-110" aria-hidden />
                  </span>
                  <h3 className="mt-8 text-2xl font-semibold">{value.title}</h3>
                  <p className="mt-3 leading-relaxed text-dim">{value.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-28">
          <SectionLabel index="03">Facilities</SectionLabel>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl">
            Distribution footprint &amp; corporate facilities
          </h2>
          <p className="mt-3 text-lg text-dim">Dual headquarters and fulfillment operations across the UAE.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Reveal>
            <OfficeCard office="head" />
          </Reveal>
          <Reveal delay={0.1}>
            <OfficeCard office="sister" />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
