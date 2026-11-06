export type PackagingSpecs = Partial<
  Record<
    | "bottle"
    | "box"
    | "capacity"
    | "ctn"
    | "dimensions"
    | "lastUpTo"
    | "length"
    | "material"
    | "model"
    | "thickness"
    | "warranty"
    | "weight"
    | "width",
    string
  >
>;

export type Product = {
  id: string;
  slug: string;
  name: string;
  brandId: string;
  brandName: string;
  brandType: string;
  categoryId: string;
  categoryName: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  catalogueSlide?: string;
  cataloguePage?: number;
  sizesVariants: string[];
  packagingSpecs: PackagingSpecs;
  features: string[];
  applications?: string[];
  certifications?: string[];
  hotColdUsage?: { hot: string; cold: string };
  isFeatured?: boolean;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
};

export type Brand = {
  id: string;
  name: string;
  type: string;
  tagline: string;
  description: string;
  logo: string;
  color: string;
  badge: string;
  established?: string;
  origin?: string;
};
