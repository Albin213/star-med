"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { contactEnquiry } from "@/lib/whatsapp";
import type { ContactForm as ContactFormValues } from "@/lib/whatsapp";

const subjects = [
  "Wholesale Quotation Request",
  "Hospital & Clinic Procurement",
  "Pharmacy Chain Distribution Agreement",
  "GCC Export / Cross-Border Inquiry",
  "General Product Specification Query",
];

const fields = [
  { name: "name", label: "Full Name", type: "text", autoComplete: "name" },
  { name: "company", label: "Company / Organization", type: "text", autoComplete: "organization" },
  { name: "email", label: "Email Address", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone / Mobile", type: "tel", autoComplete: "tel" },
] as const;

const inputClass =
  "peer mt-2 w-full rounded-xl border border-ink/[0.12] bg-void/60 px-4 py-3.5 text-fg outline-none transition-all duration-300 placeholder:text-faint hover:border-ink/25 focus:border-cyan/60 focus:bg-cyan/[0.04] focus:shadow-[0_0_0_4px_rgba(23,54,140,0.048),0_0_30px_-8px_rgba(23,54,140,0.2)]";

const labelClass = "font-mono text-[11px] uppercase tracking-[0.14em] text-dim";

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: subjects[0],
    message: "",
  });

  const update = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((current) => ({ ...current, [e.target.name]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    window.open(contactEnquiry(values), "_blank", "noopener");
  };

  return (
    <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
      {fields.map((field) => (
        <label key={field.name} className={labelClass}>
          {field.label} <span className="text-cyan">*</span>
          <input
            required
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            value={values[field.name]}
            onChange={update}
            className={`${inputClass} font-sans text-base normal-case tracking-normal`}
          />
        </label>
      ))}
      <label className={`${labelClass} sm:col-span-2`}>
        Enquiry Type
        <select
          name="subject"
          value={values.subject}
          onChange={update}
          className={`${inputClass} font-sans text-base normal-case tracking-normal [&>option]:bg-deep`}
        >
          {subjects.map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </select>
      </label>
      <label className={`${labelClass} sm:col-span-2`}>
        Message / Product Requirements <span className="text-cyan">*</span>
        <textarea
          required
          name="message"
          rows={5}
          value={values.message}
          onChange={update}
          className={`${inputClass} resize-none font-sans text-base normal-case tracking-normal`}
        />
      </label>
      <button
        type="submit"
        className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-accent hover:bg-accent/90 px-7 py-4 font-semibold text-on-accent shadow-[0_10px_40px_-10px_rgba(23,54,140,0.24)] transition-shadow duration-500 hover:shadow-[0_14px_60px_-8px_rgba(23,54,140,0.36)] sm:col-span-2 sm:justify-self-start"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/40 blur-md transition-all duration-700 group-hover:left-[120%]"
        />
        <MessageCircle className="relative size-4" aria-hidden />
        <span className="relative">Submit &amp; Send to WhatsApp</span>
      </button>
    </form>
  );
}
