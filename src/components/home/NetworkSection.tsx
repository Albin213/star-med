import { GccMap } from "@/components/distribution/GccMap";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { territories } from "@/data/site";

export function NetworkSection() {
  return (
    <section className="relative isolate overflow-hidden border-t border-ink/[0.09] bg-deep">
      <div className="grid-lines mask-fade absolute inset-0 -z-10 opacity-50" />
      <div className="orb -right-40 top-0 -z-10 size-[40rem] bg-cyan/15" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-28 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:py-36">
        <div>
          <SectionLabel index="05" tone="lime">Regional supply chain</SectionLabel>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.02] sm:text-6xl">
            <TextReveal text="Two hubs. One network across the Gulf." />
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-dim">
            Direct warehouse fulfilment from Abu Dhabi and Dubai, with sub-distribution partners
            across the GCC.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2">
            {territories.map((t, i) => (
              <li
                key={t}
                className="flex items-center gap-2 rounded-lg border border-ink/[0.12] bg-surface/70 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-dim"
              >
                <span
                  className={`size-1.5 rounded-full ${i === 0 ? "bg-lime-bright shadow-[0_0_8px_#71b204]" : "bg-cyan/70"}`}
                  aria-hidden
                />
                {t}
              </li>
            ))}
          </ul>
          <Button href="/distribution" className="mt-9">
            See the distribution network
          </Button>
        </div>
        <Reveal>
          <div className="hud relative rounded-3xl border border-ink/[0.1] bg-void/60 p-4 sm:p-6">
            <GccMap />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
