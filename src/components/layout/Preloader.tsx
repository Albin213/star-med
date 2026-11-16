import { Logo } from "@/components/ui/Logo";

/** Boot screen: grid, logo, heartbeat trace and a 0–100% counter. Pure CSS. */
export function Preloader() {
  return (
    <div
      aria-hidden
      className="preloader fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 overflow-hidden bg-void"
    >
      <div className="grid-lines mask-fade absolute inset-0 opacity-60" />
      <div className="orb left-1/2 top-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 bg-cyan/20" />
      <span className="relative"><Logo className="h-16 sm:h-20" priority /></span>
      <svg viewBox="0 0 240 60" className="relative w-64" fill="none">
        <path
          d="M0 34 h70 l8 -6 l8 6 h12 l6 6 l10 -36 l11 50 l8 -20 h14 l10 -7 l10 7 h73"
          pathLength={1}
          stroke="#17368c"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="preloader-trace"
          style={{ filter: "drop-shadow(0 0 1.5px #17368c)" }}
        />
      </svg>
      <div className="relative w-64">
        <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
          <span>Loading</span>
          <span className="preloader-count text-cyan" />
        </div>
        <div className="mt-2 h-px w-full bg-ink/[0.06]">
          <div className="preloader-bar h-full bg-gradient-to-r from-cyan to-lime-bright shadow-[0_0_10px_#17368c]" />
        </div>
      </div>
    </div>
  );
}
