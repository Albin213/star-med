import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

const variants = {
  /** Primary: solid brand navy with a soft, grounded shadow. */
  primary:
    "bg-accent text-on-accent shadow-[0_1px_2px_rgba(14,26,54,0.12),0_8px_24px_-12px_rgba(23,54,140,0.45)] hover:bg-accent/90 hover:shadow-[0_2px_4px_rgba(14,26,54,0.12),0_14px_32px_-14px_rgba(23,54,140,0.55)]",
  /** Glass: frosted white with a quiet light running around its border. */
  glass: "edge-spin glass text-fg hover:bg-ink/[0.04]",
  ghost: "border border-ink/[0.16] text-fg hover:border-cyan/60 hover:bg-cyan/[0.06]",
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants | "lime" | "outline" | "ink" | "outlineDark";
  icon?: ReactNode;
  className?: string;
};

const legacy: Record<string, keyof typeof variants> = {
  lime: "primary",
  ink: "primary",
  outline: "glass",
  outlineDark: "ghost",
};

export function Button({ href, children, variant = "primary", icon, className = "" }: ButtonProps) {
  const external = !href.startsWith("/");
  const v = variants[(legacy[variant] ?? variant) as keyof typeof variants];
  const classes = `group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full py-3.5 pl-6 pr-3.5 text-sm font-semibold tracking-tight transition-all duration-500 ease-premium ${v} ${className}`;
  const content = (
    <>
      {/* Sheen that sweeps across on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 opacity-0 blur-md transition-all duration-700 ease-premium group-hover:left-[120%] group-hover:opacity-100"
      />
      <span className="relative">{children}</span>
      <span
        className={`relative grid size-7 place-items-center rounded-full transition-transform duration-500 ease-premium group-hover:rotate-45 ${
          v === variants.primary ? "bg-on-accent/15 text-on-accent" : "bg-ink/[0.06] text-cyan"
        }`}
      >
        {icon ?? <ArrowUpRight className="size-3.5" aria-hidden />}
      </span>
    </>
  );

  if (external) {
    const opensTab = href.startsWith("http");
    return (
      <a href={href} className={classes} {...(opensTab ? { target: "_blank", rel: "noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
