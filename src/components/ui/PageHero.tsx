import type { ReactNode } from "react";
import { PulseLine } from "./PulseLine";
import { TextReveal } from "./TextReveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div className="pattern-cross mask-fade absolute inset-0 -z-10" />
      <div className="aurora absolute -top-1/3 right-0 -z-10 size-[42rem] rounded-full bg-indigo/70 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-40 sm:px-8 lg:pb-28 lg:pt-48">
        <p className="eyebrow text-lime-bright">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
          <TextReveal text={title} immediate />
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{description}</p>
        )}
        {children}
      </div>
      <PulseLine className="absolute inset-x-0 bottom-0 h-16 w-full" beats={3} />
    </section>
  );
}
