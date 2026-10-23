import { NextRequest, NextResponse } from "next/server";
import { chapaClient } from "@/lib/chapa";
import { orderStore } from "@/lib/storage/orders";

/**
 * Chapa Payment Verification Endpoint with Route Param:
 * GET /api/payment/chapa/verify/{tx_ref}
 * Official Chapa API equivalent: GET https://api.chapa.co/v1/transaction/verify/{tx_ref}
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { tx_ref: string } }
) {
  try {
    const txRef = params.tx_ref;

    if (!txRef) {
      return NextResponse.json(
        { message: "Transaction reference (tx_ref) is required in URL" },
        { status: 400 }
      );
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
    console.error("[API Payment Verify (Param) Error]:", error);
    return NextResponse.json(
      { message: "Internal verification error", error: error.message },
      { status: 500 }
    );
  }
}
