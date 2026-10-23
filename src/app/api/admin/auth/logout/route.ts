import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  const host = req.headers.get("host") || "";
  const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1");
  const isSecure = req.nextUrl.protocol === "https:" || (process.env.NODE_ENV === "production" && !isLocalhost);

  // Expire/clear session cookie completely
  response.cookies.delete(ADMIN_COOKIE_NAME);
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: isSecure,
    sameSite: "lax",
    maxAge: 0,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
