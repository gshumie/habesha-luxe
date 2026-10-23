import { NextRequest, NextResponse } from "next/server";
import { orderStore } from "@/lib/storage/orders";

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("x-chapa-signature");
    const secret = process.env.CHAPA_WEBHOOK_SECRET;

    // Optional signature check if secret is configured
    const payload = await req.json();
    console.log("[Chapa Webhook Received]:", payload);

    const txRef = payload.tx_ref || payload.trx_ref;
    const status = payload.status;

    if (!txRef) {
      return NextResponse.json({ message: "No tx_ref in webhook payload" }, { status: 400 });
    }

    if (status === "success") {
      orderStore.updatePaymentStatus(txRef, "paid", {
        chapaTransactionId: payload.reference || payload.id,
        paymentMethod: payload.payment_method || "Chapa Webhook Direct",
        paymentReference: payload.reference,
      });
    } else if (status === "failed") {
      orderStore.updatePaymentStatus(txRef, "failed");
    }

    return NextResponse.json({ status: "success", received: true });
  } catch (error: any) {
    console.error("[Chapa Webhook Error]:", error);
    return NextResponse.json({ message: "Webhook processing error", error: error.message }, { status: 500 });
  }
}
