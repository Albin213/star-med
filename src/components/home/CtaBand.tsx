import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { PulseLine } from "@/components/ui/PulseLine";
import { TextReveal } from "@/components/ui/TextReveal";
import { generalEnquiry } from "@/lib/whatsapp";

export function CtaBand() {
  return (
    <section className="px-3 py-6 sm:px-5 sm:py-10">
      <div className="theme-navy edge-spin relative isolate mx-auto max-w-[90rem] overflow-hidden rounded-[2.5rem] bg-deep px-6 py-24 text-center sm:py-32">
        <div className="grid-lines mask-fade absolute inset-0 -z-10" />
        <div className="orb -left-20 -top-20 -z-10 size-[28rem] bg-violet/40" />
        <div className="orb -bottom-32 -right-20 -z-10 size-[30rem] bg-cyan/25" style={{ animationDelay: "-5s" }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 overflow-hidden opacity-40" aria-hidden>
          <div className="floor-grid" />
        </div>

        <p className="eyebrow mx-auto inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/[0.06] px-4 py-2 text-cyan">
          <span className="size-1.5 animate-pulse rounded-full bg-cyan" />
          STARMED · B2B
        </p>
        <h2 className="mx-auto mt-7 max-w-4xl text-5xl font-semibold leading-[1] sm:text-7xl">
          <TextReveal text="Ready to order for your facility?" />
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-dim">
          Join hospitals, pharmacies &amp; retail chains that trust STARMED for quality, compliance,
          and scale.
        </p>
        <div className="mt-10 flex justify-center">
          <Magnetic>
            <Button href={generalEnquiry} icon={<MessageCircle className="size-3.5" aria-hidden />}>
              Enquire on WhatsApp
            </Button>
          </Magnetic>
        </div>
        <PulseLine className="absolute inset-x-0 bottom-4 -z-10 h-14 w-full" beats={5} />
      </div>
    </section>
  );
}
