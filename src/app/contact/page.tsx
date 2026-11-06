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
        description="Reach out to our commercial distribution headquarters in Mussafah, Abu Dhabi, or connect with our sister office at Dada Drug Store LLC in Dubai."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={generalEnquiry} icon={<MessageCircle className="size-4" aria-hidden />}>
            Chat on WhatsApp
          </Button>
          <Button
            href={site.phoneHref}
            variant="outline"
            icon={<Phone className="size-4" aria-hidden />}
          >
            Call Direct
          </Button>
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.35fr] lg:py-28">
        <div className="space-y-5">
          <Reveal>
            <OfficeCard office="head" />
          </Reveal>
          <Reveal delay={0.08}>
            <OfficeCard office="sister" />
          </Reveal>
          <Reveal delay={0.16}>
            <div className="flex gap-3 rounded-3xl bg-mist p-7">
              <Clock className="mt-0.5 size-5 shrink-0 text-indigo" aria-hidden />
              <div>
                <p className="font-semibold">Operating Hours</p>
                <p className="mt-1 text-muted">{site.hours}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="rounded-3xl bg-white p-7 sm:p-10">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Send a Business Enquiry / Quotation Request
            </h2>
            <p className="mb-8 mt-3 leading-relaxed text-muted">
              Our commercial team in Abu Dhabi responds within 24 hours with certified technical
              specifications and bulk distribution terms.
            </p>
            <ContactForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}
