import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";

const pillars = [
  {
    title: "Certified Products",
    body: "Every product CE 0123 & ISO 13485 certified for clinical-grade confidence.",
  },
  {
    title: "Fast B2B Supply",
    body: "Abu Dhabi & Dubai dual-hub fulfilment with same-region dispatch.",
  },
  {
    title: "UAE & GCC Reach",
    body: "Direct distribution across 2,000+ outlets in the UAE and wider GCC.",
  },
  {
    title: "Owned Brands",
    body: "Four proprietary brands: STARMED, DADA, Mediz & Dr.Care.",
  },
];

export function Pillars() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-6xl">
        <TextReveal text="Built for the healthcare supply chain" />
      </h2>
      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 0.08} className="bg-paper">
            <div className="group h-full p-7 transition-colors duration-500 hover:bg-ink hover:text-white">
              <p className="font-mono text-sm text-indigo transition-colors duration-500 group-hover:text-lime-bright">
                0{i + 1}
              </p>
              <h3 className="mt-14 text-2xl font-semibold">{pillar.title}</h3>
              <p className="mt-3 leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/70">
                {pillar.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
