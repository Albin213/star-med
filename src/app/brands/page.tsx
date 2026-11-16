import type { Metadata } from "next";
import { BrandShowcase } from "@/components/brands/BrandShowcase";
import { CtaBand } from "@/components/home/CtaBand";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { brands } from "@/data/brands";

export const metadata: Metadata = {
  title: "Our Brands",
  description:
    "Explore the trusted healthcare and wellness ranges distributed by STARMED across the UAE and GCC.",
};

export default function BrandsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our portfolio"
        title="Brands that care for everyday life."
        accent={["care"]}
        packshots={[
          { src: "/images/products/drcare-niacinamide-serum.png", alt: "Dr.Care Niacinamide Serum", w: 1199, h: 1312 },
          { src: "/images/products/mediz-digital-thermometer.png", alt: "Mediz Digital Thermometer", w: 900, h: 1748 },
          { src: "/images/products/dada-gel-pack-eye-mask.png", alt: "DADA Gel Bead Eye Mask", w: 1197, h: 1315 },
        ]}
        meta={[
          { value: String(brands.length), label: "Brands in portfolio" },
          { value: String(brands.filter((b) => b.type === "owned").length), label: "Owned brands" },
          { value: "UAE & GCC", label: "Distribution reach" },
        ]}
        description="Explore the trusted healthcare and wellness ranges distributed by STARMED across the UAE and GCC."
      >
        <Button href="/products" className="mt-9">
          Browse all products
        </Button>
      </PageHero>
      <BrandShowcase />
      <CtaBand />
    </>
  );
}
