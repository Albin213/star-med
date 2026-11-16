import { Clock, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { OfficeCard } from "@/components/about/OfficeCard";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { generalEnquiry } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the STARMED commercial distribution headquarters in Mussafah, Abu Dhabi, or our sister office at Dada Drug Store LLC in Dubai.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Abu Dhabi & Dubai Commercial Facilities"
        title="Contact STARMED General Trading LLC"
        accent={["Contact"]}
        packshots={[
          { src: "/images/products/first-aid-kit-10-person.png", alt: "First aid kit for 10 people", w: 768, h: 664 },
          { src: "/images/products/just-fever-cooling-patch.png", alt: "Just+ Fever Cooling Patch", w: 1024, h: 1536 },
          { src: "/images/products/v9-nail-clippers.png", alt: "V9 Nail Clippers", w: 1199, h: 1312 },
        ]}
        meta={[
          { value: "Abu Dhabi", label: "Head office, Mussafah 16" },
          { value: "Dubai", label: "Dada Drug Store LLC" },
        ]}
        description="Reach out to our commercial distribution headquarters in Mussafah, Abu Dhabi, or connect with our sister office at Dada Drug Store LLC in Dubai."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={generalEnquiry} icon={<MessageCircle className="size-3.5" aria-hidden />}>
            Chat on WhatsApp
          </Button>
          <Button href={site.phoneHref} variant="glass" icon={<Phone className="size-3.5" aria-hidden />}>
            Call Direct
          </Button>
        </div>
      </PageHero>

      <section className="relative isolate overflow-hidden border-t border-ink/[0.09] bg-deep">
        <div className="grid-lines mask-fade absolute inset-0 -z-10 opacity-40" />
        <div className="orb -right-40 top-40 -z-10 size-[34rem] bg-cyan/15" />
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.35fr] lg:py-28">
          <div className="space-y-5">
            <Reveal>
              <OfficeCard office="head" />
            </Reveal>
            <Reveal delay={0.08}>
              <OfficeCard office="sister" />
            </Reveal>
            <Reveal delay={0.16}>
              <div className="glass flex gap-4 rounded-3xl p-7">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-cyan/25 bg-cyan/[0.07]">
                  <Clock className="size-5 text-cyan" aria-hidden />
                </span>
                <div>
                  <p className="font-semibold">Operating Hours</p>
                  <p className="mt-1 font-mono text-sm text-dim">{site.hours}</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="edge-spin glass-strong rounded-3xl p-7 sm:p-10">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                <span className="size-1.5 animate-pulse rounded-full bg-cyan" />
                Enquiry · WhatsApp
              </div>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Send a Business Enquiry / Quotation Request</h2>
              <p className="mb-9 mt-3 leading-relaxed text-dim">
                Our commercial team in Abu Dhabi responds within 24 hours with certified technical
                specifications and bulk distribution terms.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
