import Image from "next/image";
import { site } from "@/data/site";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

/** The logo file is transparent inside the oval, so it always sits on a white chip. */
export function Logo({ className = "h-10", priority }: LogoProps) {
  return (
    <span className="inline-flex rounded-full bg-white px-2.5 py-1">
      <Image
        src="/images/logos/starmed-official.png"
        alt={site.name}
        width={724}
        height={345}
        priority={priority}
        className={`w-auto ${className}`}
      />
    </span>
  );
}
