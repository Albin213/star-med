import { products } from "@/data/products";
import type { PackagingSpecs, Product } from "@/data/types";

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const pickProducts = (slugs: string[]) =>
  slugs.flatMap((slug) => {
    const product = getProduct(slug);
    return product ? [product] : [];
  });

export const countByCategory = (id: string) => products.filter((p) => p.categoryId === id).length;
export const countByBrand = (id: string) => products.filter((p) => p.brandId === id).length;

/** Same category first, then same brand: the closest alternatives lead. */
export function relatedProducts(product: Product, limit = 4) {
  const others = products.filter((p) => p.id !== product.id);
  const sameCategory = others.filter((p) => p.categoryId === product.categoryId);
  const sameBrand = others.filter(
    (p) => p.brandId === product.brandId && p.categoryId !== product.categoryId,
  );
  return [...sameCategory, ...sameBrand].slice(0, limit);
}

const SPEC_LABELS: [keyof PackagingSpecs, string][] = [
  ["model", "Model"],
  ["box", "Box / Pack Quantity"],
  ["ctn", "Carton (CTN) Packing"],
  ["bottle", "Bottle Packing"],
  ["capacity", "Volume / Capacity"],
  ["dimensions", "Dimensions / Specification"],
  ["weight", "Weight"],
  ["material", "Primary Material"],
  ["thickness", "Nominal Thickness"],
  ["width", "Nominal Width"],
  ["length", "Nominal Length"],
  ["warranty", "Manufacturer Warranty"],
  ["lastUpTo", "Therapeutic Duration"],
];

export const specRows = (specs: PackagingSpecs) =>
  SPEC_LABELS.flatMap(([key, label]) => {
    const value = specs[key];
    return value ? [{ label, value }] : [];
  });

export function matchesSearch(product: Product, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [
    product.name,
    product.brandName,
    product.categoryName,
    product.shortDescription,
    ...product.features,
  ].some((text) => text.toLowerCase().includes(q));
}
