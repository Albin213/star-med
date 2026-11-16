import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";

type OfficeCardProps = {
  office: "head" | "sister";
};

export function OfficeCard({ office }: OfficeCardProps) {
  const isHead = office === "head";
  const data = isHead ? site.headOffice : site.sisterOffice;
  const row = "flex items-center gap-3 rounded-xl border border-ink/[0.09] bg-surface/70 px-3 py-2.5 transition-colors hover:border-cyan/40 hover:text-fg";

  return (
    <article data-spot className="glass edge-glow h-full overflow-hidden rounded-3xl p-7 sm:p-9">
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow text-cyan">{data.title}</p>
        <span className={`font-mono text-[10px] uppercase tracking-widest ${isHead ? "text-lime-bright" : "text-dim"}`}>
          {isHead ? "HQ · 01" : "HUB · 02"}
        </span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold">{data.company}</h3>
      <ul className="mt-6 space-y-2.5 text-sm text-dim">
        <li className="flex gap-3 px-3 py-1">
          <MapPin className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden />
          {data.address}
        </li>
        {isHead ? (
          <>
            <li>
              <a href={site.phoneHref} className={row}>
                <Phone className="size-4 text-cyan" aria-hidden />
                <span className="font-mono">{site.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={row}>
                <Mail className="size-4 text-cyan" aria-hidden />
                <span className="font-mono">{site.email}</span>
              </a>
            </li>
          </>
        ) : (
          <li>
            <a href={site.sisterOffice.website} target="_blank" rel="noreferrer" className={row}>
              <Globe className="size-4 text-cyan" aria-hidden />
              <span className="font-mono">dadahealthcare.com</span>
            </a>
          </li>
        )}
      </ul>
    </article>
  );
}
