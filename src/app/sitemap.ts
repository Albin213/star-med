import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/products", "/brands", "/about", "/distribution", "/contact"];
  return [
    ...routes.map((route) => ({ url: `${site.url}${route}` })),
    ...products.map((product) => ({ url: `${site.url}/products/${product.slug}` })),
  ];
}
