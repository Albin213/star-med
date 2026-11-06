import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";

const reasons = [
  "Strategically located in Abu Dhabi’s industrial hub",
  "Exclusive ownership of reputable, fast-growing product brands",
  "Strong market presence supported by our sister company Dada Drug Store",
  "Wide distribution network across UAE and GCC",
  "Committed to compliance, quality, and customer satisfaction",
];

export function WhyStarmed() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="pattern-cross-dark mask-fade absolute inset-0 -z-10" />
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-32">
        <div>
          <p className="eyebrow text-indigo">Why choose STARMED</p>
          <blockquote className="mt-5">
            <p className="font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              <TextReveal text="STARMED delivers more than products. It delivers healthcare confidence across the UAE." />
            </p>
            <footer className="mt-6 text-sm text-muted">
              STARMED General Trading LLC · Established 2020 · Mussafah M-16, Abu Dhabi
            </footer>
          </blockquote>
        </div>
        <ol>
          {reasons.map((reason, i) => (
            <Reveal key={reason} delay={i * 0.06}>
              <li className="flex gap-5 border-b border-ink/10 py-5 first:pt-0">
                <span className="font-mono text-sm text-indigo">0{i + 1}</span>
                <span className="text-lg leading-snug">{reason}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
