import { CartItem, DeliveryZone } from "./cart";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type DispatchStatus = "processing" | "tailoring" | "out_for_delivery" | "delivered" | "cancelled";

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string; // e.g., 0998164025 or +251998164025
  city: string; // e.g. Addis Ababa, Bahir Dar, Hawassa, etc.
  subCity?: string; // Bole, Kazanchis, Kirkos, Yeka, Nifas Silk, etc.
  woreda?: string;
  houseNumber?: string;
  specificAddress?: string; // Landmark, e.g. "Behind Edna Mall, near Edna Hotel"
  deliveryNotes?: string;
  deliveryZone: DeliveryZone;
}

export interface Order {
  id: string;
  txRef: string;
  chapaTransactionId?: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotalETB: number;
  deliveryFeeETB: number;
  grandTotalETB: number;
  currency: string;
  paymentStatus: PaymentStatus;
  dispatchStatus: DispatchStatus;
  paymentMethod?: string; // e.g. "Telebirr", "CBE Birr", "Card", "Awash Birr"
  paymentReference?: string;
  chapaCheckoutUrl?: string;
  createdAt: string;
  paidAt?: string;
  deliveredAt?: string;
}

export interface ChapaInitializePayload {
  amount: string;
  currency: "ETB" | "USD";
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  tx_ref: string;
  callback_url: string;
  return_url: string;
  "customization[title]"?: string;
  "customization[description]"?: string;
  "customization[logo]"?: string;
  meta?: Record<string, string | number>;
}

export interface ChapaInitializeResponse {
  message: string;
  status: "success" | "failed";
  data?: {
    checkout_url: string;
  };
}

export interface ChapaVerifyResponse {
  message: string;
  status: "success" | "failed";
  data?: {
    first_name: string;
    last_name: string;
    email: string;
    currency: string;
    amount: number | string;
    charge: number;
    mode: string;
    method: string;
    type: string;
    status: string;
    reference: string;
    tx_ref: string;
    customization?: {
      title?: string;
      description?: string;
    };
    meta?: Record<string, any>;
    created_at: string;
    updated_at: string;
  };
}
