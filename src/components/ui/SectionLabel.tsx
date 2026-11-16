import { Scramble } from "./Scramble";

type SectionLabelProps = {
  children: string;
  index?: string;
  className?: string;
  tone?: "cyan" | "lime";
};

/** Mono HUD label: `[02] ── LABEL` with a live indicator. */
export function SectionLabel({ children, index, className = "", tone = "cyan" }: SectionLabelProps) {
  const color = tone === "cyan" ? "text-cyan" : "text-lime-bright";
  const dot = tone === "cyan" ? "bg-cyan" : "bg-lime-bright";
  return (
    <p className={`eyebrow flex items-center gap-3 ${color} ${className}`}>
      <span className="relative flex size-1.5 shrink-0">
        <span className={`absolute inset-0 animate-ping rounded-full ${dot} opacity-70`} />
        <span className={`relative size-1.5 rounded-full ${dot}`} />
      </span>
      {index && <span className="text-faint">[{index}]</span>}
      <span className="h-px w-8 bg-current opacity-40" aria-hidden />
      <Scramble text={children} />
    </p>
  );
}
