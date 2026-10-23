export type ProductCategory =
  | "all"
  | "traditional-kemis"
  | "modern-tibeb"
  | "mens-attire"
  | "accessories";

export type ProductSize = "S" | "M" | "L" | "XL" | "Custom Measurement";

export interface CustomMeasurements {
  bust?: string; // in cm or inches
  waist?: string;
  hips?: string;
  shoulderToFloor?: string;
  armLength?: string;
  notes?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  amharicName?: string;
  category: ProductCategory;
  priceETB: number;
  originalPriceETB?: number;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  shortDescription: string;
  description: string;
  fabricDetails: string;
  craftsmanship: string;
  images: string[];
  availableSizes: ProductSize[];
  inStock: boolean;
  stockCount: number;
  tags: string[];
  origin: string; // e.g., "Addis Ababa / Dorze Handloom"
}
