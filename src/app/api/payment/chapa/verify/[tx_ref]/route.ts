import { NextRequest, NextResponse } from "next/server";
import { POST as verifyPost, GET as verifyGet } from "@/app/api/payment/verify/route";

/**
 * Chapa Payment Verification Endpoint with Route Param:
 * GET /api/payment/chapa/verify/{tx_ref}
 * POST /api/payment/chapa/verify/{tx_ref}
 * Official Chapa API equivalent: GET https://api.chapa.co/v1/transaction/verify/{tx_ref}
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { tx_ref: string } }
) {
  const url = new URL(req.url);
  url.searchParams.set("tx_ref", params.tx_ref);
  return verifyGet(new NextRequest(url));
}

export async function POST(
  req: NextRequest,
  { params }: { params: { tx_ref: string } }
) {
  const body = await req.json().catch(() => ({}));
  body.tx_ref = params.tx_ref;

  const url = new URL(req.url);
  return verifyPost(
    new NextRequest(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  );
}
