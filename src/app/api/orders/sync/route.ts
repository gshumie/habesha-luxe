import { NextRequest, NextResponse } from "next/server";
import { orderStore } from "@/lib/storage/orders";
import { Order } from "@/types/order";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { order, orders }: { order?: Order; orders?: Order[] } = body;

    const isDemoOrder = (o: any) => {
      const name = `${o?.customer?.firstName || ""} ${o?.customer?.lastName || ""}`.toLowerCase();
      const id = `${o?.id || ""} ${o?.txRef || ""}`.toLowerCase();
      return (
        name.includes("selamawit") ||
        name.includes("bereket") ||
        name.includes("tigist") ||
        name.includes("tilahun") ||
        id.includes("ord-hl-801") ||
        id.includes("ord-hl-802") ||
        id.includes("ord-hl-803") ||
        id.includes("ord-hl-800")
      );
    };

    let savedCount = 0;

    if (order && order.txRef && !isDemoOrder(order)) {
      orderStore.save(order);
      savedCount++;
    }

    if (Array.isArray(orders)) {
      for (const ord of orders) {
        if (ord && ord.txRef && !isDemoOrder(ord)) {
          orderStore.save(ord);
          savedCount++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Synced ${savedCount} order(s) successfully`,
      count: savedCount,
    });
  } catch (error: any) {
    console.error("[API Orders Sync Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to sync orders", error: error.message },
      { status: 500 }
    );
  }
}
