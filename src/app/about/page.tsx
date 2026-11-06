import type { Metadata } from "next";
import Image from "next/image";
import { OfficeCard } from "@/components/about/OfficeCard";
import { CtaBand } from "@/components/home/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "STARMED General Trading LLC, established in 2020 in Mussafah, Abu Dhabi, specialises in pharmaceutical and healthcare distribution across the UAE and GCC.",
};

const values = [
  {
    title: "Healthcare Accessibility",
    body: "Ensuring uninterrupted supply chains for essential medical accessories and everyday hygiene needs across all emirates.",
  },
  {
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
        description="Dynamic and fast-growing pharmaceutical and healthcare distribution company specializing in medical devices, clinical personal care, and therapeutic wellness supplies across the UAE and GCC region."
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_1.3fr] lg:gap-20 lg:py-32">
        <h2 className="text-4xl font-semibold leading-[1.05] sm:text-6xl">
          <TextReveal text="Our corporate story" />
        </h2>
        <Reveal className="space-y-6 text-lg leading-relaxed text-muted">
          <p>
            STARMED General Trading LLC was established in 2020 and is based in Mussafah 16, Abu
            Dhabi. The company specializes in pharmaceutical distribution and high-quality healthcare
            and personal care products across the UAE and GCC region.
          </p>
          <p>
            We are proud to be a sister company of{" "}
            <strong className="font-semibold text-ink">Dada Drug Store LLC</strong>, a
            well-established pharmaceutical distributor based in Dubai International City. Together,
            our combined logistics and distribution infrastructure serves a robust network of over{" "}
            <strong className="font-semibold text-ink">2,000 outlets</strong> across the UAE,
            including major hospital institutions, leading pharmacy chains, and retail supermarkets
            through direct and sub-distribution channels.
          </p>
          <p>
            The company is committed to promoting health and wellness by offering innovative,
            effective, and trusted products under our own brands and verified global partners.
          </p>
        </Reveal>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-28">
          <Reveal>
            <Image
              src="/images/banners/product-range-showcase.jpg"
              alt="STARMED product range on display shelves with mobility equipment"
              width={1240}
              height={874}
              sizes="(min-width: 1024px) 600px, 92vw"
              className="h-auto w-full rounded-3xl"
            />
          </Reveal>
          <div>
            <p className="eyebrow text-indigo">Full-spectrum healthcare distribution</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl">
              Direct distribution to 2,000+ pharmacies, hospitals, and clinical partners
            </h2>
            <ul className="mt-8 grid gap-x-6 sm:grid-cols-2">
              {range.map((item) => (
                <li key={item} className="border-b border-ink/10 py-3 text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="pattern-cross mask-fade absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:grid-cols-2 lg:py-32">
          <Reveal>
            <p className="eyebrow text-lime-bright">Our vision</p>
            <p className="mt-5 font-display text-3xl font-medium leading-[1.2] tracking-tight sm:text-4xl">
              To be the most respected and customer-centric pharmaceutical distributor in the region,
              offering comprehensive healthcare solutions through owned brands and long-term
              partnerships.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="eyebrow text-lime-bright">Our mission</p>
            <p className="mt-5 font-display text-3xl font-medium leading-[1.2] tracking-tight sm:text-4xl">
              To enhance the accessibility and availability of innovative, safe, and reliable health
              and wellness products throughout the UAE and the GCC, with a commitment to service
              excellence and ethical practices.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-5 md:grid-cols-2">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.1}>
              <div className="h-full rounded-3xl bg-mist p-7 sm:p-9">
                <h3 className="text-2xl font-semibold">{value.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{value.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <h2 className="mt-24 text-4xl font-semibold leading-[1.05] sm:text-5xl">
          Distribution footprint &amp; corporate facilities
        </h2>
        <p className="mt-3 text-lg text-muted">Dual headquarters and fulfillment operations across the UAE.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
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
