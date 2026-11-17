import { NextRequest, NextResponse } from "next/server";
import { orderStore } from "@/lib/storage/orders";
import { DispatchStatus, PaymentStatus, Order } from "@/types/order";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

function checkAuth(req: NextRequest): boolean {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token) !== null;
}

export async function GET(req: NextRequest) {
  try {
    if (!checkAuth(req)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Admin authentication required" },
        { status: 401 }
      );
    }

    const orders = orderStore.getAll();
    return NextResponse.json({ success: true, count: orders.length, orders });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch orders", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!checkAuth(req)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Admin authentication required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { order, orders }: { order?: Order; orders?: Order[] } = body;

    if (order && order.txRef) {
      orderStore.save(order);
    }

    if (Array.isArray(orders)) {
      for (const ord of orders) {
        if (ord && ord.txRef) {
          orderStore.save(ord);
        }
      }
    }

    const allOrders = orderStore.getAll();
    return NextResponse.json({ success: true, count: allOrders.length, orders: allOrders });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to save order", error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    if (!checkAuth(req)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Admin authentication required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id, dispatchStatus, paymentStatus, txRef } = body;

    if (!id && !txRef) {
      return NextResponse.json({ message: "Order id or txRef is required" }, { status: 400 });
    }

    let updatedOrder;
    if (id && dispatchStatus) {
      updatedOrder = orderStore.updateDispatchStatus(id, dispatchStatus as DispatchStatus);
    }

    if (txRef && paymentStatus) {
      updatedOrder = orderStore.updatePaymentStatus(txRef, paymentStatus as PaymentStatus);
    }

    if (!updatedOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to update order", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!checkAuth(req)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Admin authentication required" },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { searchParams } = new URL(req.url);
    const id = body.id || body.txRef || searchParams.get("id") || searchParams.get("tx_ref");

    if (!id) {
      return NextResponse.json({ message: "Order id or tx_ref is required to delete" }, { status: 400 });
    }

    const deleted = orderStore.delete(id);
    return NextResponse.json({ success: deleted, message: deleted ? "Order deleted successfully" : "Order not found" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to delete order", error: error.message },
      { status: 500 }
    );
  }
}
