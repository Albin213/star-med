import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

const variants = {
  lime: "bg-lime text-ink hover:bg-lime-bright",
  ink: "bg-ink text-white hover:bg-indigo",
  outline: "border border-white/25 text-white hover:border-white hover:bg-white/10",
  outlineDark: "border border-ink/20 text-ink hover:border-ink hover:bg-ink/5",
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  icon?: ReactNode;
  className?: string;
};

export function Button({ href, children, variant = "lime", icon, className = "" }: ButtonProps) {
  const external = !href.startsWith("/");
  const classes = `group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors duration-300 ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      <span className="transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        {icon ?? <ArrowUpRight className="size-4" aria-hidden />}
      </span>
    </>
  );

  if (external) {
    const opensTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(opensTab ? { target: "_blank", rel: "noreferrer" } : {})}
      >
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
