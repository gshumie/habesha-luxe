import { Product, ProductSize, CustomMeasurements } from "./product";

export interface CartItem {
  id: string; // unique item cart id: `${productId}-${selectedSize}-${timestamp/hash}`
  product: Product;
  selectedSize: ProductSize;
  customMeasurements?: CustomMeasurements;
  quantity: number;
}

export type DeliveryZone = "addis-ababa" | "ethiopia-regions" | "international";

export interface DeliveryOption {
  id: DeliveryZone;
  name: string;
  description: string;
  feeETB: number;
  estimatedDays: string;
}

export interface CartTotals {
  itemCount: number;
  subtotalETB: number;
  deliveryFeeETB: number;
  discountETB: number;
  grandTotalETB: number;
}
