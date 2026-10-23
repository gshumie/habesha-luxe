import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  getAdminCredentials,
  ADMIN_COOKIE_NAME,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, rememberMe } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Both email and password are required" },
        { status: 400 }
      );
    }

    const credentials = getAdminCredentials();
    const normalizedInputEmail = String(email).trim().toLowerCase();

    // Verify credentials
    const isEmailValid = normalizedInputEmail === credentials.email;
    const isPasswordValid = String(password) === credentials.password;

    if (!isEmailValid || !isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid admin email or password. Please check your credentials.",
        },
        { status: 401 }
      );
    }

    // Generate signed session token
    const token = createSessionToken(credentials.email, Boolean(rememberMe));

    // Calculate maxAge (seconds): 30 days if rememberMe, else 24 hours
    const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60;

    const response = NextResponse.json({
      success: true,
      email: credentials.email,
      message: "Authentication successful. Welcome to Habesha Luxe Admin Portal.",
    });

    // Set secure HTTP-only cookie (only require secure flag if https or not localhost)
    const host = req.headers.get("host") || "";
    const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1");
    const isSecure = req.nextUrl.protocol === "https:" || (process.env.NODE_ENV === "production" && !isLocalhost);

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isSecure,
      sameSite: "lax",
      maxAge,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("[Admin Login Error]:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error during authentication" },
      { status: 500 }
    );
  }
}
