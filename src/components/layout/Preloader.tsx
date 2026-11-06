import { Logo } from "@/components/ui/Logo";

export function Preloader() {
  return (
    <div
      aria-hidden
      className="preloader fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-ink"
    >
      <Logo className="h-20" priority />
      <svg viewBox="0 0 240 60" className="w-60" fill="none">
        <path
          d="M0 34 h70 l8 -6 l8 6 h12 l6 6 l10 -36 l11 50 l8 -20 h14 l10 -7 l10 7 h73"
          pathLength={1}
          stroke="#b6e65e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="preloader-trace"
        />
      </svg>
    </div>
  );
}
