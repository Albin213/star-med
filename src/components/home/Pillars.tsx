import { BadgeCheck, Crown, Globe2, Zap } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";

const pillars = [
  {
    icon: BadgeCheck,
    title: "Certified Products",
    body: "Every product CE 0123 & ISO 13485 certified for clinical-grade confidence.",
  },
  {
    icon: Zap,
    title: "Fast B2B Supply",
    body: "Abu Dhabi & Dubai dual-hub fulfilment with same-region dispatch.",
  },
  {
    icon: Globe2,
    title: "UAE & GCC Reach",
    body: "Direct distribution across 2,000+ outlets in the UAE and wider GCC.",
  },
  {
    icon: Crown,
    title: "Owned Brands",
    body: "Four proprietary brands: STARMED, DADA, Mediz & Dr.Care.",
  },
];

export function Pillars() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="orb -right-40 top-20 -z-10 size-[32rem] bg-violet/20" />
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 lg:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="01">Pillars</SectionLabel>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] sm:text-6xl">
              <TextReveal text="Built for the healthcare supply chain" />
            </h2>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={i * 0.1} className={i % 2 ? "lg:translate-y-10" : ""}>
                <div
                  data-spot
                  className="glass edge-glow group h-full overflow-hidden rounded-3xl p-7 transition-transform duration-700 ease-premium hover:-translate-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="relative grid size-14 place-items-center rounded-2xl border border-cyan/25 bg-cyan/[0.07]">
                      <span className="absolute inset-0 rounded-2xl bg-cyan/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                      <Icon className="relative size-6 text-cyan transition-transform duration-500 group-hover:scale-110" aria-hidden />
                    </div>
                    <span className="font-mono text-xs text-faint transition-colors group-hover:text-lime-bright">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-14 text-2xl font-semibold">{pillar.title}</h3>
                  <p className="mt-3 leading-relaxed text-dim">{pillar.body}</p>
                  <div className="mt-8 h-px w-full overflow-hidden bg-surface/70">
                    <div className="h-full w-0 bg-gradient-to-r from-cyan to-lime-bright transition-all duration-700 ease-premium group-hover:w-full" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
