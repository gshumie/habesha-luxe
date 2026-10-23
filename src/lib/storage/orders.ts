import { Order, PaymentStatus, DispatchStatus } from "@/types/order";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

// Initial Seed Orders for realistic luxury store demonstration
const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-hl-801",
    txRef: "HL-LZ8912-K9Q2",
    chapaTransactionId: "CHAPA-ET-894120",
    customer: {
      firstName: "Selamawit",
      lastName: "Desta",
      email: "selam.desta@ethionet.et",
      phoneNumber: "0911245678",
      city: "Addis Ababa",
      subCity: "Bole (ቦሌ)",
      woreda: "Woreda 03",
      houseNumber: "House 458",
      specificAddress: "Near Edna Mall, Behind Medhanialem Church",
      deliveryZone: "addis-ababa",
      deliveryNotes: "Call when arriving at the security gate.",
    },
    items: [
      {
        id: "item-1",
        product: {
          id: "hl-prod-004",
          slug: "classic-hand-embroidered-bridal-kemis",
          name: "Classic Hand-Embroidered Bridal Kemis",
          category: "traditional-kemis",
          priceETB: 26500,
          rating: 5.0,
          reviewCount: 52,
          shortDescription: "Our crown jewel bridal kemis with cascading royal gold tilf.",
          description: "",
          fabricDetails: "100% Shemane cotton",
          craftsmanship: "160 hours hand-stitched",
          images: [
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
          ],
          availableSizes: ["Custom Measurement"],
          inStock: true,
          stockCount: 3,
          tags: ["Bridal"],
          origin: "Addis Ababa",
        },
        selectedSize: "Custom Measurement",
        customMeasurements: {
          bust: "88 cm",
          waist: "70 cm",
          hips: "96 cm",
          shoulderToFloor: "145 cm",
          armLength: "58 cm",
          notes: "Wedding date is next month on Tir 25. Please prioritize tilf finish.",
        },
        quantity: 1,
      },
      {
        id: "item-2",
        product: {
          id: "hl-prod-008",
          slug: "handspun-pure-cotton-netela-and-shawl",
          name: "Handspun Pure Cotton Netela & Shawl",
          category: "accessories",
          priceETB: 3400,
          rating: 4.93,
          reviewCount: 67,
          shortDescription: "Gossamer-soft Ethiopian Netela shawl.",
          description: "",
          fabricDetails: "Carded organic cotton",
          craftsmanship: "Double-bordered loom",
          images: [
            "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1000&q=80",
          ],
          availableSizes: ["Custom Measurement"],
          inStock: true,
          stockCount: 25,
          tags: ["Netela"],
          origin: "Shiro Meda",
        },
        selectedSize: "Custom Measurement",
        quantity: 2,
      },
    ],
    subtotalETB: 33300,
    deliveryFeeETB: 0,
    grandTotalETB: 33300,
    currency: "ETB",
    paymentStatus: "paid",
    dispatchStatus: "tailoring",
    paymentMethod: "Telebirr (Chapa Direct)",
    paymentReference: "CHAPA-TLB-894120",
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    paidAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
  },
  {
    id: "ord-hl-802",
    txRef: "HL-LZ7721-M8X1",
    chapaTransactionId: "CHAPA-CBE-771904",
    customer: {
      firstName: "Tewodros",
      lastName: "Kassahun",
      email: "tewodros.k@gmail.com",
      phoneNumber: "0923889900",
      city: "Addis Ababa",
      subCity: "Kirkos / Kazanchis (ቂርቆስ / ካዛንቺስ)",
      woreda: "Woreda 08",
      houseNumber: "Apt 4B, UNECA Residences",
      deliveryZone: "addis-ababa",
      deliveryNotes: "Ring apartment bell 4B.",
    },
    items: [
      {
        id: "item-3",
        product: {
          id: "hl-prod-007",
          slug: "mens-imperial-linen-shirt-and-gabi",
          name: "Men's Imperial Linen Shirt & Gabi",
          category: "mens-attire",
          priceETB: 8900,
          rating: 4.89,
          reviewCount: 19,
          shortDescription: "Tailored ivory linen shirt & gabi.",
          description: "",
          fabricDetails: "Flax linen & cotton buluuk",
          craftsmanship: "Embroidered collar",
          images: [
            "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80",
          ],
          availableSizes: ["L"],
          inStock: true,
          stockCount: 10,
          tags: ["Men's"],
          origin: "Wollo",
        },
        selectedSize: "L",
        quantity: 1,
      },
    ],
    subtotalETB: 8900,
    deliveryFeeETB: 0,
    grandTotalETB: 8900,
    currency: "ETB",
    paymentStatus: "paid",
    dispatchStatus: "out_for_delivery",
    paymentMethod: "CBE Birr (Chapa)",
    paymentReference: "CHAPA-CBE-771904",
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    paidAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
  },
  {
    id: "ord-hl-803",
    txRef: "HL-LZ6610-P4A9",
    chapaTransactionId: "CHAPA-AWB-660123",
    customer: {
      firstName: "Helen",
      lastName: "Berhanu",
      email: "helen.berhanu@diaspora.org",
      phoneNumber: "+12025550199",
      city: "Silver Spring, MD (USA)",
      specificAddress: "8401 Colesville Rd, Suite 300",
      deliveryZone: "international",
      deliveryNotes: "DHL Express international courier delivery.",
    },
    items: [
      {
        id: "item-4",
        product: {
          id: "hl-prod-001",
          slug: "queen-menen-imperial-tibeb-kemis",
          name: "Queen Menen Imperial Tibeb Kemis",
          category: "traditional-kemis",
          priceETB: 18500,
          rating: 4.95,
          reviewCount: 38,
          shortDescription: "Regal two-piece kemis woven with pure Dorze cotton.",
          description: "",
          fabricDetails: "Highland cotton",
          craftsmanship: "Dorze handloom",
          images: [
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
          ],
          availableSizes: ["M"],
          inStock: true,
          stockCount: 6,
          tags: ["Kemis"],
          origin: "Dorze Highlands",
        },
        selectedSize: "M",
        quantity: 1,
      },
    ],
    subtotalETB: 18500,
    deliveryFeeETB: 3500,
    grandTotalETB: 22000,
    currency: "ETB",
    paymentStatus: "paid",
    dispatchStatus: "delivered",
    paymentMethod: "Visa / Mastercard (Chapa)",
    paymentReference: "CHAPA-VSA-660123",
    createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    paidAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    deliveredAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
  },
];

class OrderStore {
  private ensureFile() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (!fs.existsSync(ORDERS_FILE)) {
        fs.writeFileSync(ORDERS_FILE, JSON.stringify(INITIAL_ORDERS, null, 2), "utf-8");
      }
    } catch (err) {
      console.warn("OrderStore file initialization warning:", err);
    }
  }

  public getAll(): Order[] {
    this.ensureFile();
    try {
      if (fs.existsSync(ORDERS_FILE)) {
        const raw = fs.readFileSync(ORDERS_FILE, "utf-8");
        return JSON.parse(raw);
      }
    } catch (err) {
      console.error("Error reading orders file:", err);
    }
    return INITIAL_ORDERS;
  }

  public getByTxRef(txRef: string): Order | undefined {
    const orders = this.getAll();
    return orders.find((o) => o.txRef === txRef);
  }

  public getById(id: string): Order | undefined {
    const orders = this.getAll();
    return orders.find((o) => o.id === id);
  }

  public save(order: Order): Order {
    this.ensureFile();
    const orders = this.getAll();
    const index = orders.findIndex((o) => o.id === order.id || o.txRef === order.txRef);

    if (index >= 0) {
      orders[index] = { ...orders[index], ...order };
    } else {
      orders.unshift(order);
    }

    try {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
    } catch (err) {
      console.error("Error saving orders file:", err);
    }

    return order;
  }

  public updatePaymentStatus(
    txRef: string,
    paymentStatus: PaymentStatus,
    meta?: {
      chapaTransactionId?: string;
      paymentMethod?: string;
      paymentReference?: string;
    }
  ): Order | undefined {
    const order = this.getByTxRef(txRef);
    if (!order) return undefined;

    order.paymentStatus = paymentStatus;
    if (paymentStatus === "paid") {
      order.paidAt = new Date().toISOString();
      if (order.dispatchStatus === "processing") {
        order.dispatchStatus = "tailoring";
      }
    }

    if (meta?.chapaTransactionId) order.chapaTransactionId = meta.chapaTransactionId;
    if (meta?.paymentMethod) order.paymentMethod = meta.paymentMethod;
    if (meta?.paymentReference) order.paymentReference = meta.paymentReference;

    return this.save(order);
  }

  public updateDispatchStatus(id: string, dispatchStatus: DispatchStatus): Order | undefined {
    const order = this.getById(id);
    if (!order) return undefined;

    order.dispatchStatus = dispatchStatus;
    if (dispatchStatus === "delivered") {
      order.deliveredAt = new Date().toISOString();
    }

    return this.save(order);
  }
}

export const orderStore = new OrderStore();
