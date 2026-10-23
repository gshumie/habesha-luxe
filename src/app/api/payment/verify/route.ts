import { NextRequest, NextResponse } from "next/server";
import { chapaClient } from "@/lib/chapa";
import { orderStore } from "@/lib/storage/orders";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const txRef = searchParams.get("tx_ref");

    if (!txRef) {
      return NextResponse.json({ message: "Transaction reference (tx_ref) is required" }, { status: 400 });
    }

    const order = orderStore.getByTxRef(txRef);
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    // If order is already paid, return it immediately
    if (order.paymentStatus === "paid") {
      return NextResponse.json({
        success: true,
        verified: true,
        order,
      });
    }

    // Verify with Chapa API
    const verifyResult = await chapaClient.verifyTransaction(txRef);

    if (verifyResult.success) {
      const updatedOrder = orderStore.updatePaymentStatus(txRef, "paid", {
        chapaTransactionId: verifyResult.data?.reference || `CHAPA-${Date.now()}`,
        paymentMethod: verifyResult.data?.method || "Chapa (Telebirr / CBE Birr)",
        paymentReference: verifyResult.data?.reference,
      });

      return NextResponse.json({
        success: true,
        verified: true,
        order: updatedOrder,
        chapaData: verifyResult.data,
      });
    } else {
      orderStore.updatePaymentStatus(txRef, "failed");
      return NextResponse.json({
        success: false,
        verified: false,
        message: verifyResult.message || "Payment verification failed",
        order,
      });
    }
  } catch (error: any) {
    console.error("[API Payment Verify Error]:", error);
    return NextResponse.json(
      { message: "Internal verification error", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const txRef = body.tx_ref;

  if (!txRef) {
    return NextResponse.json({ message: "Transaction reference is required" }, { status: 400 });
  }

  // Reuse same verification logic
  const dummyUrl = new URL(`http://localhost:3000/api/payment/verify?tx_ref=${encodeURIComponent(txRef)}`);
  return GET(new NextRequest(dummyUrl));
}
