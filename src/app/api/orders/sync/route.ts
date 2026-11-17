import { NextRequest, NextResponse } from "next/server";
import { orderStore } from "@/lib/storage/orders";
import { Order } from "@/types/order";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { order, orders }: { order?: Order; orders?: Order[] } = body;

    let savedCount = 0;

    if (order && order.txRef) {
      orderStore.save(order);
      savedCount++;
    }

    if (Array.isArray(orders)) {
      for (const ord of orders) {
        if (ord && ord.txRef) {
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
