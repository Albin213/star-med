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
  "mt-1.5 w-full rounded-xl bg-paper px-4 py-3 text-ink outline-none ring-1 ring-ink/10 transition-shadow focus:ring-2 focus:ring-indigo";

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
        <label key={field.name} className="text-sm font-medium">
          {field.label} *
          <input
            required
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            value={values[field.name]}
            onChange={update}
            className={inputClass}
          />
        </label>
      ))}
      <label className="text-sm font-medium sm:col-span-2">
        Enquiry Type
        <select name="subject" value={values.subject} onChange={update} className={inputClass}>
          {subjects.map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </select>
      </label>
      <label className="text-sm font-medium sm:col-span-2">
        Message / Product Requirements *
        <textarea
          required
          name="message"
          rows={5}
          value={values.message}
          onChange={update}
          className={inputClass}
        />
      </label>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-white transition-colors hover:bg-indigo sm:col-span-2 sm:justify-self-start"
      >
        <MessageCircle className="size-4" aria-hidden />
        Submit &amp; Send to WhatsApp
      </button>
    </form>
  );
}
