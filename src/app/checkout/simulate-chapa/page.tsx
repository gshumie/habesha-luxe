"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, Smartphone, CreditCard, Building2 } from "lucide-react";
import { formatETB } from "@/lib/utils";

function ChapaSimulatorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const txRef = searchParams.get("tx_ref") || `HL-${Date.now()}`;
  const amountStr = searchParams.get("amount") || "18500";
  const email = searchParams.get("email") || "getasewshumie@gmail.com";
  const name = searchParams.get("name") || "Valued Client";
  const amount = parseFloat(amountStr) || 18500;

  const [selectedMethod, setSelectedMethod] = useState<"telebirr" | "cbe" | "awash" | "card">("telebirr");
  const [phoneOrCard, setPhoneOrCard] = useState("0998164025");
  const [pin, setPin] = useState("1234");
  const [processing, setProcessing] = useState(false);

  const handleAuthorize = async (shouldFail = false) => {
    setProcessing(true);

    // Simulate 1.2s network authorization
    setTimeout(async () => {
      if (shouldFail) {
        alert("Payment simulated as failed. You will be redirected.");
        router.push(`/checkout?error=payment_failed`);
        return;
      }

      // Call verification endpoint or redirect directly to success return_url
      router.push(`/checkout/success?tx_ref=${encodeURIComponent(txRef)}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden text-slate-800">
        {/* Chapa Header */}
        <div className="bg-emerald-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-serif font-black tracking-wider text-xl px-2 py-0.5 rounded bg-emerald-800 border border-emerald-500/50">
              CHAPA
            </span>
            <div>
              <h2 className="text-sm font-bold leading-tight">Chapa Secure Gateway</h2>
              <p className="text-[10px] text-emerald-200">Ethiopian Payment Switch (Sandbox Simulator)</p>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-800/80 px-2 py-1 rounded font-bold uppercase tracking-wider text-emerald-200">
            TEST MODE
          </span>
        </div>

        {/* Merchant & Amount Box */}
        <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
              Paying Merchant
            </div>
            <div className="text-sm font-bold text-slate-800">Habesha Luxe Couture</div>
            <div className="text-[11px] text-slate-500">{name} ({email})</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
              Total Amount
            </div>
            <div className="text-xl font-black text-emerald-700">{formatETB(amount)}</div>
          </div>
        </div>

        {/* Payment Methods Tabs */}
        <div className="p-5 space-y-4">
          <div className="text-xs font-semibold text-slate-600">Select Ethiopian Payment Method:</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => setSelectedMethod("telebirr")}
              className={`p-3 rounded-xl border flex items-center space-x-2 transition-all ${
                selectedMethod === "telebirr"
                  ? "border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-sm"
                  : "border-slate-200 hover:bg-slate-50 text-slate-700"
              }`}
            >
              <Smartphone className="w-4 h-4 text-blue-600" />
              <span>Telebirr</span>
            </button>

            <button
              onClick={() => setSelectedMethod("cbe")}
              className={`p-3 rounded-xl border flex items-center space-x-2 transition-all ${
                selectedMethod === "cbe"
                  ? "border-purple-600 bg-purple-50 text-purple-900 font-bold shadow-sm"
                  : "border-slate-200 hover:bg-slate-50 text-slate-700"
              }`}
            >
              <Building2 className="w-4 h-4 text-purple-600" />
              <span>CBE Birr</span>
            </button>

            <button
              onClick={() => setSelectedMethod("awash")}
              className={`p-3 rounded-xl border flex items-center space-x-2 transition-all ${
                selectedMethod === "awash"
                  ? "border-amber-600 bg-amber-50 text-amber-900 font-bold shadow-sm"
                  : "border-slate-200 hover:bg-slate-50 text-slate-700"
              }`}
            >
              <Building2 className="w-4 h-4 text-amber-600" />
              <span>Awash Birr</span>
            </button>

            <button
              onClick={() => setSelectedMethod("card")}
              className={`p-3 rounded-xl border flex items-center space-x-2 transition-all ${
                selectedMethod === "card"
                  ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-sm"
                  : "border-slate-200 hover:bg-slate-50 text-slate-700"
              }`}
            >
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>Card / Visa</span>
            </button>
          </div>

          {/* Simulated Input Fields */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <div>
              <label className="block text-slate-600 font-medium mb-1">
                {selectedMethod === "card" ? "Card Number" : "Registered Mobile Number"}
              </label>
              <input
                type="text"
                value={phoneOrCard}
                onChange={(e) => setPhoneOrCard(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-medium mb-1">
                {selectedMethod === "card" ? "CVV / Expiry" : "Wallet PIN / USSD Code"}
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-emerald-600 tracking-widest"
              />
            </div>
            <div className="text-[10px] text-slate-500">
              Transaction Reference: <code className="font-mono text-emerald-700 font-bold">{txRef}</code>
            </div>
          </div>

          {/* Action buttons */}
          <button
            onClick={() => handleAuthorize(false)}
            disabled={processing}
            className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-emerald-700/20 transition-all disabled:opacity-50"
          >
            {processing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Authorizing with {selectedMethod.toUpperCase()}...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Authorize {formatETB(amount)} Payment</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => handleAuthorize(true)}
              className="text-[11px] text-red-600 hover:underline"
            >
              Simulate Failure Test
            </button>
            <div className="flex items-center space-x-1 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>PCI-DSS Level 1 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChapaSimulatorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading Chapa Simulator...</div>}>
      <ChapaSimulatorContent />
    </Suspense>
  );
}
