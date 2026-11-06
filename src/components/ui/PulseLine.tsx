const beat = "l14 -7 l14 7 l18 0 l8 8 l14 -58 l15 82 l11 -32 l18 0 l16 -11 l16 11";

function tracePath(width: number, beats: number) {
  const gap = (width - beats * 144) / (beats + 1);
  const segments = Array.from({ length: beats }, () => `h${gap} ${beat}`).join(" ");
  return `M0 60 ${segments} h${gap}`;
}

type PulseLineProps = {
  className?: string;
  beats?: number;
  color?: string;
  glow?: string;
};

/** The heartbeat trace from the STARMED logo, with light travelling along it. */
export function PulseLine({
  className,
  beats = 4,
  color = "rgba(255,255,255,0.14)",
  glow = "#b6e65e",
}: PulseLineProps) {
  const d = tracePath(1600, beats);
  return (
    <svg
      viewBox="0 0 1600 120"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
      className={className}
    >
      <path d={d} stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <path
        d={d}
        pathLength={1}
        stroke={glow}
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className="pulse-travel"
      />
    </svg>
  );
}
