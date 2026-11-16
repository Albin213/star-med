import Image from "next/image";
import { site } from "@/data/site";

type LogoProps = {
  className?: string;
  priority?: boolean;
  /** Kept for existing call sites; the official logo is always shown in its original colours. */
  variant?: "dark" | "light";
  /** Kept for existing call sites; on the light theme the logo needs no halo. */
  glow?: boolean;
};

/** The official logo, never recoloured or filtered. */
export function Logo({ className = "h-10", priority }: LogoProps) {
  return (
    <Image
      src="/images/logos/starmed-logo-main.png"
      alt={site.name}
      width={1910}
      height={558}
      priority={priority}
      className={`w-auto ${className}`}
    />
  );
}
