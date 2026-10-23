import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "hl_admin_session";

function getSecretKey(): string {
  const envSecret = (process.env.ADMIN_JWT_SECRET || process.env.ADMIN_SECRET_KEY)?.trim();
  return envSecret && envSecret.length > 0 ? envSecret : "habesha_luxe_secret_secure_key_2025";
}

export function getAdminCredentials() {
  const envEmail = process.env.ADMIN_EMAIL?.trim();
  const envPassword = process.env.ADMIN_PASSWORD?.trim();

  return {
    email: (envEmail && envEmail.length > 0 ? envEmail : "getasewshumie@gmail.com").toLowerCase(),
    password: envPassword && envPassword.length > 0 ? envPassword : "SetYourStrongPassword2025!",
  };
}

export interface AdminSessionPayload {
  email: string;
  exp: number; // Unix timestamp in seconds
  iat: number;
}

/**
 * Creates a signed HMAC-SHA256 session token.
 */
export function createSessionToken(email: string, rememberMe: boolean = false): string {
  const secret = getSecretKey();
  const now = Math.floor(Date.now() / 1000);
  // 30 days if rememberMe, otherwise 24 hours
  const duration = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
  const exp = now + duration;

  const payload: AdminSessionPayload = {
    email: email.trim().toLowerCase(),
    iat: now,
    exp,
  };

  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payloadBase64)
    .digest("base64url");

  return `${payloadBase64}.${signature}`;
}

/**
 * Verifies a signed session token. Returns the payload if valid and not expired, or null.
 */
export function verifySessionToken(token: string): AdminSessionPayload | null {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadBase64, providedSignature] = parts;
  const secret = getSecretKey();

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payloadBase64)
    .digest("base64url");

  // Constant-time comparison to prevent timing attacks
  const providedBuffer = Buffer.from(providedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    providedBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const jsonStr = Buffer.from(payloadBase64, "base64url").toString("utf-8");
    const payload: AdminSessionPayload = JSON.parse(jsonStr);

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Server-side helper to check if current request has a valid admin session.
 */
export function isAuthenticatedAdmin(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return false;
    return verifySessionToken(token) !== null;
  } catch {
    return false;
  }
}
