import { NextRequest } from "next/server";
import { GET as verifyGet, POST as verifyPost } from "@/app/api/payment/verify/route";

/**
 * Chapa Payment Verification Endpoint:
 * GET /api/payment/chapa/verify?tx_ref={tx_ref}
 * POST /api/payment/chapa/verify (body: { tx_ref })
 * Verifies transaction with Chapa API (GET https://api.chapa.co/v1/transaction/verify/{tx_ref})
 */
export async function GET(req: NextRequest) {
  return verifyGet(req);
}

export async function POST(req: NextRequest) {
  return verifyPost(req);
}
