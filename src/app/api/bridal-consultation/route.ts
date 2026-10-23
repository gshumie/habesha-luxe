import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("[Bridal Consultation Booked]:", data);

    // In production, this can send an SMS via Ethio Telecom / Twilio or email via Resend/SendGrid
    return NextResponse.json({
      success: true,
      message: "Consultation request recorded successfully",
      receivedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to record consultation", error: error.message },
      { status: 500 }
    );
  }
}
