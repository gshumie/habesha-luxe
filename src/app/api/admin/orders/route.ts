import { NextRequest, NextResponse } from "next/server";
import { orderStore } from "@/lib/storage/orders";
import { DispatchStatus, PaymentStatus } from "@/types/order";
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
