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
    txRef: "HL-MB4419-X8P1",
    chapaTransactionId: "CHAPA-ET-771902",
    customer: {
      firstName: "Dawit",
      lastName: "Hailemariam",
      email: "dawit.haile@telecom.et",
      phoneNumber: "0922891234",
      city: "Addis Ababa",
      subCity: "Kazanchis (ካዛንቺስ)",
      woreda: "Woreda 08",
      houseNumber: "Apt 4B, Sunshine Luxury Apts",
      specificAddress: "Opposite Intercontinental Hotel",
      deliveryZone: "addis-ababa",
      deliveryNotes: "Call when at main gate.",
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
          shortDescription: "Tailored ivory linen shirt with Gabi.",
          description: "",
          fabricDetails: "Highland linen and buluuk",
          craftsmanship: "Mother of pearl buttons",
          images: [
            "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80",
          ],
          availableSizes: ["L"],
          inStock: true,
          stockCount: 10,
          tags: ["Men"],
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
    dispatchStatus: "shipped",
    paymentMethod: "CBE Birr (Chapa Direct)",
    paymentReference: "CHAPA-CBE-771902",
    courierName: "Bole VIP Express (ቦሌ ቪአይፒ ፈጣን ፖስታ)",
    trackingCode: "BVP-ET-8912",
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    paidAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    shippedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
  },
  {
    id: "ord-hl-803",
    txRef: "HL-TG9021-V3W4",
    customer: {
      firstName: "Tigist",
      lastName: "Moges",
      email: "tigist.moges@yahoo.com",
      phoneNumber: "0933567890",
      city: "Hawassa",
      subCity: "Tabor Subcity",
      woreda: "Woreda 02",
      houseNumber: "Villa 12",
      specificAddress: "Near Haile Resort & Lake View Avenue",
      deliveryZone: "regional-ethiopia",
      deliveryNotes: "Call 30 mins before arrival in Hawassa.",
    },
    items: [
      {
        id: "item-4",
        product: {
          id: "hl-prod-002",
          slug: "modern-azure-silk-chiffon-kemis",
          name: "Modern Azure Silk-Chiffon Kemis",
          category: "modern-tibeb",
          priceETB: 16000,
          rating: 4.91,
          reviewCount: 29,
          shortDescription: "Contemporary loose-cut silk-chiffon dress.",
          description: "",
          fabricDetails: "Silk chiffon blend",
          craftsmanship: "Contemporary cut",
          images: [
            "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=1000&q=80",
          ],
          availableSizes: ["M"],
          inStock: true,
          stockCount: 12,
          tags: ["Modern"],
          origin: "Kazanchis",
        },
        selectedSize: "M",
        quantity: 1,
      },
    ],
    subtotalETB: 16000,
    deliveryFeeETB: 500,
    grandTotalETB: 16500,
    currency: "ETB",
    paymentStatus: "pending",
    dispatchStatus: "processing",
    paymentMethod: "Awaiting Chapa Confirmation",
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
  {
    id: "ord-hl-800",
    txRef: "HL-KM1102-R5T9",
    chapaTransactionId: "CHAPA-ET-660123",
    customer: {
      firstName: "Eden",
      lastName: "Tilahun",
      email: "eden.tilahun@gmail.com",
      phoneNumber: "0944123456",
      city: "Addis Ababa",
      subCity: "Old Airport (የድሮ አውሮፕላን ማረፊያ)",
      woreda: "Woreda 04",
      houseNumber: "House 204",
      specificAddress: "Near ICS American School",
      deliveryZone: "addis-ababa",
      deliveryNotes: "Delivered to house security directly.",
    },
    items: [
      {
        id: "item-5",
        product: {
          id: "hl-prod-009",
          slug: "ethiopian-highland-calfskin-handbag",
          name: "Ethiopian Highland Calfskin Handbag",
          category: "accessories",
          priceETB: 7500,
          rating: 4.87,
          reviewCount: 16,
          shortDescription: "Full-grain calfskin with antique brass.",
          description: "",
          fabricDetails: "Vegetable tanned leather",
          craftsmanship: "Hand-stitched",
          images: [
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80",
          ],
          availableSizes: ["Standard"],
          inStock: true,
          stockCount: 8,
          tags: ["Leather"],
          origin: "Merkato",
        },
        selectedSize: "Standard",
        quantity: 1,
      },
    ],
    subtotalETB: 7500,
    deliveryFeeETB: 0,
    grandTotalETB: 7500,
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
  private inMemoryOrders: Order[] = [...INITIAL_ORDERS];

  private ensureFile() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (!fs.existsSync(ORDERS_FILE)) {
        fs.writeFileSync(ORDERS_FILE, JSON.stringify(INITIAL_ORDERS, null, 2), "utf-8");
      }
    } catch (err) {
      // In serverless / read-only environment, silently use in-memory store
      console.warn("OrderStore file initialization notice (using memory fallback):", err);
    }
  }

  public getAll(): Order[] {
    this.ensureFile();
    try {
      if (fs.existsSync(ORDERS_FILE)) {
        const raw = fs.readFileSync(ORDERS_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.inMemoryOrders = parsed;
          return parsed;
        }
      }
    } catch (err) {
      console.warn("Error reading orders file, using in-memory store:", err);
    }
    return this.inMemoryOrders;
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

    this.inMemoryOrders = orders;

    try {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
    } catch (err) {
      console.warn("Error saving orders file, stored in memory:", err);
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
