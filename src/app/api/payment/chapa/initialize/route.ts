import { NextRequest } from "next/server";
import { POST as initializePost } from "@/app/api/payment/initialize/route";

/**
 * Chapa Payment Initialization Endpoint:
 * POST /api/payment/chapa/initialize
 * Initializes transaction with Chapa API (POST https://api.chapa.co/v1/transaction/initialize)
 */
export async function POST(req: NextRequest) {
  return initializePost(req);
}
