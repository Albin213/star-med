import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";

type OfficeCardProps = {
  office: "head" | "sister";
};

export function OfficeCard({ office }: OfficeCardProps) {
  const isHead = office === "head";
  const data = isHead ? site.headOffice : site.sisterOffice;

  return (
    <article className="h-full rounded-3xl bg-white p-7 sm:p-9">
      <p className="eyebrow text-indigo">{data.title}</p>
      <h3 className="mt-3 text-2xl font-semibold">{data.company}</h3>
      <ul className="mt-5 space-y-3 text-muted">
        <li className="flex gap-3">
          <MapPin className="mt-1 size-4 shrink-0 text-indigo" aria-hidden />
          {data.address}
        </li>
        {isHead ? (
          <>
            <li>
              <a href={site.phoneHref} className="flex items-center gap-3 hover:text-ink">
                <Phone className="size-4 text-indigo" aria-hidden />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-ink">
                <Mail className="size-4 text-indigo" aria-hidden />
                {site.email}
              </a>
            </li>
          </>
        ) : (
          <li>
            <a
              href={site.sisterOffice.website}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-ink"
            >
              <Globe className="size-4 text-indigo" aria-hidden />
              dadahealthcare.com
            </a>
          </li>
        )}
      </ul>
    </article>
  );
}
