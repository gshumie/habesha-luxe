import { Order, PaymentStatus, DispatchStatus } from "@/types/order";
import fs from "fs";
import path from "path";
import os from "os";

const DATA_DIR = path.join(process.cwd(), ".data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const TMP_ORDERS_FILE = path.join(os.tmpdir(), "atiye_orders.json");

// Store starts with an empty array - only real customer orders placed via checkout appear
const INITIAL_ORDERS: Order[] = [];

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
      // In serverless / read-only environment, silently use /tmp or in-memory fallback
      try {
        if (!fs.existsSync(TMP_ORDERS_FILE)) {
          fs.writeFileSync(TMP_ORDERS_FILE, JSON.stringify(INITIAL_ORDERS, null, 2), "utf-8");
        }
      } catch (_) {}
    }
  }

  public getAll(): Order[] {
    this.ensureFile();
    const orderMap = new Map<string, Order>();

    // 1. Seed with in-memory orders
    for (const order of this.inMemoryOrders) {
      if (order && order.txRef) {
        orderMap.set(order.txRef, order);
      }
    }

    // 2. Read from primary ORDERS_FILE if accessible
    try {
      if (fs.existsSync(ORDERS_FILE)) {
        const raw = fs.readFileSync(ORDERS_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          for (const order of parsed) {
            if (order && order.txRef) {
              orderMap.set(order.txRef, { ...(orderMap.get(order.txRef) || {}), ...order });
            }
          }
        }
      }
    } catch (_) {}

    // 3. Read from writable TMP_ORDERS_FILE on serverless environments
    try {
      if (fs.existsSync(TMP_ORDERS_FILE)) {
        const raw = fs.readFileSync(TMP_ORDERS_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          for (const order of parsed) {
            if (order && order.txRef) {
              orderMap.set(order.txRef, { ...(orderMap.get(order.txRef) || {}), ...order });
            }
          }
        }
      }
    } catch (_) {}

    const merged = Array.from(orderMap.values());
    this.inMemoryOrders = merged;
    return merged;
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

    // Try saving to primary file
    try {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
    } catch (_) {}

    // Also persist to /tmp fallback file for serverless cold-start resilience
    try {
      fs.writeFileSync(TMP_ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
    } catch (_) {}

    return order;
  }

  public delete(idOrTxRef: string): boolean {
    this.ensureFile();
    const orders = this.getAll();
    const initialLen = orders.length;
    const filtered = orders.filter((o) => o.id !== idOrTxRef && o.txRef !== idOrTxRef);

    if (filtered.length !== initialLen) {
      this.inMemoryOrders = filtered;
      try {
        fs.writeFileSync(ORDERS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
      } catch (_) {}
      try {
        fs.writeFileSync(TMP_ORDERS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
      } catch (_) {}
      return true;
    }
    return false;
  }

  public syncOrders(incomingOrders: Order[]): Order[] {
    for (const order of incomingOrders) {
      if (order && order.txRef) {
        this.save(order);
      }
    }
    return this.getAll();
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
