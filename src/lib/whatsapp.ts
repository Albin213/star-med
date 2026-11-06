import { site } from "@/data/site";
import type { Product } from "@/data/types";

const GREETING = `Hello ${site.name},`;

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const generalEnquiry = waLink(`${GREETING} I would like to make a B2B wholesale enquiry.`);

export function productEnquiry(product: Product) {
  const { box, ctn } = product.packagingSpecs;
  const lines = [
    GREETING,
    "",
    "I would like to enquire about:",
    `- Product: ${product.name}`,
    `- Brand: ${product.brandName}`,
    `- Category: ${product.categoryName}`,
  ];
  if (box || ctn) lines.push(`- Packaging: Box: ${box ?? "N/A"}, CTN: ${ctn ?? "N/A"}`);
  if (product.cataloguePage) lines.push(`- Catalogue Slide: #${product.cataloguePage}`);
  lines.push("", "Please share wholesale pricing and availability.");
  return waLink(lines.join("\n"));
}

export function basketEnquiry(items: { product: Product; quantity: number }[]) {
  const lines = items.map(
    ({ product, quantity }, i) =>
      `${i + 1}. ${product.name} (${product.brandName}) × ${quantity} CTN`,
  );
  return waLink(
    [
      GREETING,
      "",
      "*B2B Product Enquiry:*",
      ...lines,
      "",
      "Please share wholesale pricing and availability.",
    ].join("\n"),
  );
}

export const partnerEnquiry = (role: string) =>
  waLink(
    [
      GREETING,
      "",
      "I would like to enquire about a B2B Distribution Partnership:",
      `*Role:* ${role}`,
      "*Territory:* UAE / GCC",
      "",
      "Please share your commercial terms and catalogue wholesale pricing.",
    ].join("\n"),
  );

export type ContactForm = {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export const contactEnquiry = (f: ContactForm) =>
  waLink(
    [
      GREETING,
      "",
      "*New B2B Business Enquiry:*",
      `• *Name:* ${f.name}`,
      `• *Company:* ${f.company}`,
      `• *Email:* ${f.email}`,
      `• *Phone:* ${f.phone}`,
      `• *Enquiry Type:* ${f.subject}`,
      "",
      "*Message:*",
      f.message,
    ].join("\n"),
  );
