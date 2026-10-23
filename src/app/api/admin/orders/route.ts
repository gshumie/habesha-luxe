import { NextRequest, NextResponse } from "next/server";
import { orderStore } from "@/lib/storage/orders";
import { DispatchStatus, PaymentStatus } from "@/types/order";

export async function GET(req: NextRequest) {
  try {
    const orders = orderStore.getAll();
    return NextResponse.json({ success: true, count: orders.length, orders });
  } catch (error: any) {
    return NextResponse.json({ message: "Failed to fetch orders", error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
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
    return NextResponse.json({ message: "Failed to update order", error: error.message }, { status: 500 });
  }
}
