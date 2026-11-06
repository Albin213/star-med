import { Counter } from "@/components/ui/Counter";
import { stats } from "@/data/site";

export function Stats() {
  return (
    <section className="bg-lime text-ink">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-16 sm:px-8 lg:grid-cols-4 lg:py-20">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse gap-2">
            <dt className="text-sm font-medium">{stat.label}</dt>
            <dd className="font-display text-5xl font-semibold tracking-tight sm:text-7xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
