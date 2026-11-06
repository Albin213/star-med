import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PulseLine } from "@/components/ui/PulseLine";
import { TextReveal } from "@/components/ui/TextReveal";
import { generalEnquiry } from "@/lib/whatsapp";

export function CtaBand() {
  return (
    <section className="px-3 py-3 sm:px-5 sm:py-5">
      <div className="relative isolate mx-auto max-w-[90rem] overflow-hidden rounded-[2.5rem] bg-indigo px-6 py-20 text-center text-white sm:py-28">
        <div className="pattern-cross absolute inset-0 -z-10" />
        <h2 className="mx-auto max-w-3xl text-5xl font-semibold leading-[1.02] sm:text-7xl">
          <TextReveal text="Ready to order for your facility?" />
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
          Join hospitals, pharmacies &amp; retail chains that trust STARMED for quality, compliance,
          and scale.
        </p>
        <div className="mt-9 flex justify-center">
          <Button href={generalEnquiry} icon={<MessageCircle className="size-4" aria-hidden />}>
            Enquire on WhatsApp
          </Button>
        </div>
        <PulseLine className="absolute inset-x-0 bottom-2 -z-10 h-14 w-full" beats={5} />
      </div>
    </section>
  );
}
