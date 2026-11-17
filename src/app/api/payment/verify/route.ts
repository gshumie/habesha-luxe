import { NextRequest, NextResponse } from "next/server";
import { chapaClient } from "@/lib/chapa";
import { orderStore } from "@/lib/storage/orders";
import { Order } from "@/types/order";

async function processVerification(txRef: string, fallbackOrder?: Partial<Order>) {
  let order = orderStore.getByTxRef(txRef);

  // If order is missing on this serverless instance, reconstruct and persist from client snapshot
  if (!order && fallbackOrder) {
    const reconstructed: Order = {
      id: fallbackOrder.id || `ord-${Date.now()}`,
      txRef,
      customer: fallbackOrder.customer || {
        firstName: "Valued",
        lastName: "Client",
        email: "getasewshumie@gmail.com",
        phoneNumber: "0998164025",
        city: "Addis Ababa",
        subCity: "Bole",
        deliveryZone: "addis-ababa",
      },
      items: fallbackOrder.items || [],
      subtotalETB: fallbackOrder.subtotalETB || 0,
      deliveryFeeETB: fallbackOrder.deliveryFeeETB || 0,
      grandTotalETB: fallbackOrder.grandTotalETB || 0,
      currency: "ETB",
      paymentStatus: "pending",
      dispatchStatus: "processing",
      createdAt: fallbackOrder.createdAt || new Date().toISOString(),
    };
    order = orderStore.save(reconstructed);
  }

  if (!order) {
    return {
      status: 404,
      body: {
        success: false,
        message: "Order not found on server instance",
        code: "ORDER_NOT_FOUND",
      },
    };
  }

  // If order is already paid, return it immediately
  if (order.paymentStatus === "paid") {
    return {
      status: 200,
      body: {
        success: true,
        verified: true,
        order,
      },
    };
  }

  // Verify with Chapa API
  const verifyResult = await chapaClient.verifyTransaction(txRef);

  if (verifyResult.success) {
    const updatedOrder = orderStore.updatePaymentStatus(txRef, "paid", {
      chapaTransactionId: verifyResult.data?.reference || `CHAPA-VERIFIED-${Date.now()}`,
      paymentMethod: verifyResult.data?.method || "Telebirr / CBE Birr (Chapa Direct)",
      paymentReference: verifyResult.data?.reference,
    });

    return {
      status: 200,
      body: {
        success: true,
        verified: true,
        order: updatedOrder || order,
        chapaData: verifyResult.data,
      },
    };
  } else {
    orderStore.updatePaymentStatus(txRef, "failed");
    return {
      status: 400,
      body: {
        success: false,
        verified: false,
        message: verifyResult.message || "Payment verification failed with Chapa",
        order,
      },
    };
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const txRef = searchParams.get("tx_ref");

    if (!txRef) {
      return NextResponse.json({ message: "Transaction reference (tx_ref) is required" }, { status: 400 });
    }

    const result = await processVerification(txRef);
    return NextResponse.json(result.body, { status: result.status });
  } catch (error: any) {
    console.error("[API Payment Verify GET Error]:", error);
    return NextResponse.json(
      { message: "Internal verification error", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const txRef = body.tx_ref || body.txRef;
    const fallbackOrder = body.fallbackOrder || body.order;

    const targetTxRef = txRef || fallbackOrder?.txRef;

    if (!targetTxRef) {
      return NextResponse.json({ message: "Transaction reference is required" }, { status: 400 });
    }

    const result = await processVerification(targetTxRef, fallbackOrder);
    return NextResponse.json(result.body, { status: result.status });
  } catch (error: any) {
    console.error("[API Payment Verify POST Error]:", error);
    return NextResponse.json(
      { message: "Internal verification error", error: error.message },
      { status: 500 }
    );
  }
}
