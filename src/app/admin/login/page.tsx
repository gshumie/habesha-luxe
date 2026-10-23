"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Crown,
  Sparkles,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { ImperialSeal, TibebBorder } from "@/components/ui/EthiopianPattern";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("getasewshumie@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Auto-redirect if already authenticated
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/admin/auth/check");
        const data = await res.json();
        if (data.authenticated) {
          router.replace("/admin");
          return;
        }
      } catch (err) {
        console.warn("Auth check error:", err);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both your admin email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          rememberMe,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || "Invalid email or password. Please try again.");
        setLoading(false);
        return;
      }

      setSuccessMessage("Authentication successful. Redirecting to Admin Dashboard...");

      // Short delay to display luxury success indicator
      setTimeout(() => {
        router.push("/admin");
      }, 600);
    } catch (err: any) {
      setErrorMessage(err.message || "Network error. Please try again.");
      setLoading(false);
    }
  };

  const handleFillDemoCredentials = () => {
    setEmail("getasewshumie@gmail.com");
    setPassword("SetYourStrongPassword2025!");
    setErrorMessage(null);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex flex-col items-center justify-center text-ivory-100">
        <div className="w-12 h-12 border-3 border-gold-500/20 border-t-gold-400 rounded-full animate-spin mb-4" />
        <p className="text-xs font-serif tracking-widest text-gold-400 uppercase">
          Verifying Secure Admin Session...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian-950 flex flex-col justify-between relative overflow-hidden selection:bg-gold-500 selection:text-obsidian-950">
      {/* Background Decorative Radial Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Bar */}
      <div className="py-6 px-4 sm:px-8 border-b border-gold-500/15 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-serif font-black text-lg tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-ivory-100 via-gold-300 to-gold-500">
            HABESHA LUXE
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.25em] text-gold-400 font-medium border-l border-zinc-700 pl-2">
            Store Portal
          </span>
        </Link>

        <Link
          href="/"
          className="text-xs text-zinc-400 hover:text-gold-400 transition-colors flex items-center space-x-1"
        >
          <span>&larr; Back to Boutique</span>
        </Link>
      </div>

      {/* Main Login Card Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md bg-obsidian-900 border-2 border-gold-500/30 rounded-3xl shadow-2xl p-6 sm:p-10 space-y-6 relative overflow-hidden backdrop-blur-md">
          {/* Subtle Top Tibeb Accent Line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600" />

          {/* Header & Crest */}
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 mb-1">
              <Crown className="w-7 h-7" />
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-black text-ivory-100 tracking-tight">
              Admin Portal Login
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] text-gold-400 font-serif">
              የአስተዳዳሪ መግቢያ • Secured Session
            </p>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto pt-1 leading-relaxed">
              Sign in with your verified store email and password to manage orders, customer dispatches, and Chapa settlements.
            </p>
          </div>

          {/* Error Message Toast */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs flex items-start space-x-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1 leading-snug">{errorMessage}</div>
            </div>
          )}

          {/* Success Message Toast */}
          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs flex items-center space-x-2.5 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Email Field */}
            <div>
              <label className="block text-zinc-300 font-semibold mb-1.5">
                Admin Email Address <span className="text-gold-400">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gold-400" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="getasewshumie@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-obsidian-950 border border-gold-500/25 rounded-xl pl-10 pr-3.5 py-3 text-ivory-100 placeholder-zinc-500 focus:outline-none focus:border-gold-400 text-xs transition-colors"
                />
              </div>
              <span className="text-[10px] text-zinc-500 mt-1 block">
                Official store administrator address
              </span>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-zinc-300 font-semibold mb-1.5">
                Admin Password <span className="text-gold-400">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gold-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-obsidian-950 border border-gold-500/25 rounded-xl pl-10 pr-10 py-3 text-ivory-100 placeholder-zinc-500 focus:outline-none focus:border-gold-400 text-xs tracking-wider transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-zinc-400 hover:text-ivory-100 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-700 bg-obsidian-950 text-gold-500 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-gold-500"
                />
                <span className="text-xs text-zinc-300">Remember Me (30 Days)</span>
              </label>

              <span className="text-[11px] text-gold-400/80">
                Encrypted Session
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 text-obsidian-950 font-serif font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-gold-500/20 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-obsidian-950 border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4 text-obsidian-950" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="pt-4 border-t border-zinc-800 text-center space-y-2">
            <button
              onClick={handleFillDemoCredentials}
              className="text-[11px] text-gold-400 hover:text-gold-300 hover:underline transition-colors font-medium"
            >
              ⚡ Fill Default Admin Credentials (1-Click QA)
            </button>
            <div className="text-[10px] text-zinc-500">
              Passcode protected & configurable in <code>.env.local</code>
            </div>
          </div>

          {/* Bottom Security Info */}
          <div className="flex items-center justify-center space-x-1.5 text-[11px] text-zinc-500 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Habesha Luxe 256-Bit SSL HMAC-SHA256 Protected</span>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Pattern */}
      <TibebBorder className="border-t border-gold-500/15" />
    </div>
  );
}
