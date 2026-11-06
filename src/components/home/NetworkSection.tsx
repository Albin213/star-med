import { GccMap } from "@/components/distribution/GccMap";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { territories } from "@/data/site";

export function NetworkSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div className="aurora absolute -right-40 top-0 -z-10 size-[40rem] rounded-full bg-indigo/70 blur-[130px]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:py-32">
        <div>
          <p className="eyebrow text-lime-bright">Regional supply chain</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-6xl">
            <TextReveal text="Two hubs. One network across the Gulf." />
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
            Direct warehouse fulfilment from Abu Dhabi and Dubai, with sub-distribution partners
            across the GCC.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {territories.map((t) => (
              <li key={t} className="rounded-full border border-white/20 px-3 py-1 text-sm text-white/80">
                {t}
              </li>
            ))}
          </ul>
          <Button href="/distribution" className="mt-8">
            See the distribution network
          </Button>
        </div>
        <Reveal>
          <GccMap />
        </Reveal>
      </div>
    </section>
  );
}
