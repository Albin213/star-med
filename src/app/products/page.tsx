import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductCatalogue } from "@/components/products/ProductCatalogue";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Product Catalogue",
  description:
    "Browse the STARMED medical, healthcare, and wellness portfolio with verified specifications, carton quantities, and certifications.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Official STARMED General Trading LLC Catalogue"
        title="Searchable Product Catalogue"
        description="Browse our comprehensive medical, healthcare, and wellness portfolio. All specifications, dimensions, carton quantities, and certifications are sourced directly from the verified company catalogue."
      />
      <Suspense>
        <ProductCatalogue />
      </Suspense>
    </>
  );
}
