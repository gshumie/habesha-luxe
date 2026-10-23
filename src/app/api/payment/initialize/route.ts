import { NextRequest, NextResponse } from "next/server";
import { chapaClient } from "@/lib/chapa";
import { orderStore } from "@/lib/storage/orders";
import { generateTxRef } from "@/lib/utils";
import { Order, CustomerDetails } from "@/types/order";
import { CartItem } from "@/types/cart";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customer,
      items,
      subtotalETB,
      deliveryFeeETB,
      grandTotalETB,
    }: {
      customer: CustomerDetails;
      items: CartItem[];
      subtotalETB: number;
      deliveryFeeETB: number;
      grandTotalETB: number;
    } = body;

    // Validate essential inputs
    if (!customer || !customer.email || !customer.firstName || !customer.phoneNumber) {
      return NextResponse.json(
        { message: "Customer details (first name, email, phone number) are required" },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { message: "Cart cannot be empty" },
        { status: 400 }
      );
    }

    // Generate unique transaction reference
    const txRef = generateTxRef();
    const orderId = `ord-${Date.now()}`;

    // Initialize payment with Chapa
    const paymentResult = await chapaClient.initializePayment({
      amount: grandTotalETB,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName || "",
      phoneNumber: customer.phoneNumber,
      txRef,
      customTitle: "Habesha Luxe Order",
      customDescription: `Payment for ${items.length} Ethiopian traditional couture pieces`,
      baseUrl: req.nextUrl.origin,
      meta: {
        orderId,
        deliveryZone: customer.deliveryZone,
      },
    });

    // Create and save pending order in storage
    const newOrder: Order = {
      id: orderId,
      txRef,
      customer,
      items,
      subtotalETB,
      deliveryFeeETB,
      grandTotalETB,
      currency: "ETB",
      paymentStatus: "pending",
      dispatchStatus: "processing",
      chapaCheckoutUrl: paymentResult.checkoutUrl,
      createdAt: new Date().toISOString(),
    };

    orderStore.save(newOrder);

    return NextResponse.json({
      success: true,
      checkoutUrl: paymentResult.checkoutUrl,
      isSimulated: paymentResult.isSimulated,
      txRef,
      orderId,
    });
  } catch (error: any) {
    console.error("[API Payment Initialize Error]:", error);
    return NextResponse.json(
      { message: "Failed to initialize Chapa transaction", error: error.message },
      { status: 500 }
    );
  }
}
