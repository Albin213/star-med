import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductCatalogue } from "@/components/products/ProductCatalogue";
import { PageHero } from "@/components/ui/PageHero";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";

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
        accent={["Product"]}
        packshots={[
          { src: "/images/products/dermavia-sun-cream-acne.png", alt: "Dermavia SPF 50+ sun cream", w: 1278, h: 1230 },
          { src: "/images/products/rosemary-mint-masque.png", alt: "Dr.Care Rosemary Mint Hair Masque", w: 1312, h: 1199 },
          { src: "/images/products/dada-cotton-balls.png", alt: "DADA Cotton Balls", w: 1073, h: 1466 },
        ]}
        meta={[
          { value: String(products.length), label: "Products" },
          { value: String(categories.length), label: "Categories" },
          { value: String(brands.length), label: "Brands" },
        ]}
        description="Browse our comprehensive medical, healthcare, and wellness portfolio. All specifications, dimensions, carton quantities, and certifications are sourced directly from the verified company catalogue."
      />
      <Suspense>
        <ProductCatalogue />
      </Suspense>
    </>
  );
}
