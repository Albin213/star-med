import type { Metadata } from "next";
import { BrandShowcase } from "@/components/brands/BrandShowcase";
import { CtaBand } from "@/components/home/CtaBand";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";

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
        description="Explore the trusted healthcare and wellness ranges distributed by STARMED across the UAE and GCC."
      >
        <Button href="/products" className="mt-8">
          Browse all products
        </Button>
      </PageHero>
      <BrandShowcase />
      <CtaBand />
    </>
  );
}
