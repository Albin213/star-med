import Image from "next/image";
import Link from "next/link";

const logos = [
  { id: "starmed", src: "/images/logos/starmed-official.png", name: "STARMED", w: 724, h: 345 },
  { id: "dada", src: "/images/logos/dada-shield.png", name: "DADA", w: 306, h: 351 },
  { id: "dr-care", src: "/images/logos/drcare-logo.png", name: "Dr.Care", w: 351, h: 345 },
  { id: "mediz", src: "/images/logos/mediz-logo.png", name: "Mediz", w: 477, h: 186 },
];

export function BrandMarquee() {
  // Four sets per half so the loop stays seamless on very wide screens.
  const row = [...logos, ...logos, ...logos, ...logos];

  return (
    <section aria-label="Our brands" className="overflow-hidden bg-white py-10">
      <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
        {[...row, ...row].map((logo, i) => {
          const duplicate = i >= logos.length;
          return (
            <Link
              key={`${logo.id}-${i}`}
              href={`/brands#${logo.id}`}
              aria-hidden={duplicate}
              tabIndex={duplicate ? -1 : undefined}
              className="mx-12 shrink-0 opacity-80 transition-opacity hover:opacity-100"
            >
              <Image
                src={logo.src}
                alt={duplicate ? "" : logo.name}
                width={logo.w}
                height={logo.h}
                className="h-16 w-auto"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
