"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Printer,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Calendar,
  AlertCircle,
  Share2,
  ArrowRight,
  Crown,
} from "lucide-react";
import { Order } from "@/types/order";
import { formatETB, formatDate } from "@/lib/utils";
import { TibebBorder, ImperialSeal } from "@/components/ui/EthiopianPattern";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const txRef = searchParams.get("tx_ref");

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!txRef) {
      setError("No transaction reference provided.");
      setLoading(false);
      return;
    }

    // Verify transaction with server
    const verifyPayment = async () => {
      try {
        const response = await fetch(`/api/payment/verify?tx_ref=${encodeURIComponent(txRef)}`);
        const data = await response.json();

        if (response.ok && data.success && data.order) {
          setOrder(data.order);
          // Trigger luxury celebration confetti
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#c59b27", "#e5b842", "#1b4332", "#faf9f6"],
            });
          } catch (e) {
            // Ignore if canvas-confetti is not loaded
          }
        } else {
          setError(data.message || "Could not verify transaction with Chapa.");
        }
      } catch (err: any) {
        console.error("Verification error:", err);
        setError("Error contacting verification server.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [txRef]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 border-4 border-gold-500/20 border-t-gold-400 rounded-full animate-spin mb-4" />
        <h2 className="font-serif text-2xl font-bold text-ivory-100">
          Verifying Payment with Chapa Gateway...
        </h2>
        <p className="text-xs text-zinc-400 max-w-sm mt-1">
          Validating Telebirr / CBE Birr transaction reference: <span className="text-gold-400 font-mono">{txRef}</span>
        </p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-ivory-100 mb-2">
          Payment Verification Issue
        </h2>
        <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
          {error || "We could not find the specified order or payment was declined."}
        </p>
        <div className="flex space-x-3">
          <Link
            href="/checkout"
            className="px-5 py-2.5 rounded-xl bg-gold-500 text-obsidian-950 font-bold text-xs uppercase"
          >
            Retry Checkout
          </Link>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-obsidian-850 border border-zinc-700 text-ivory-100 text-xs"
          >
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 sm:py-16 bg-obsidian-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Action Bar (Hidden in Print) */}
        <div className="no-print flex flex-col sm:flex-row items-center justify-between gap-4 bg-obsidian-900/90 p-5 rounded-2xl border border-gold-500/30 backdrop-blur-md">
          <div className="flex items-center space-x-3 text-left">
            <div className="w-10 h-10 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif text-base sm:text-lg font-bold text-ivory-100">
                Payment Confirmed & Verified!
              </h1>
              <p className="text-[11px] text-zinc-400">
                Receipt generated • Chapa Transaction Ref: <span className="text-gold-400 font-mono">{order.txRef}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-gold-500/15"
            >
              <Printer className="w-4 h-4" />
              <span>Print Tax Invoice</span>
            </button>
            <Link
              href="/"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-gold-500/30 text-ivory-100 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-gold-400" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Official Printable Tax Invoice Document */}
        <div className="printable-invoice bg-obsidian-900 border-2 border-gold-500/30 rounded-3xl p-6 sm:p-12 shadow-2xl text-ivory-100 space-y-8 relative overflow-hidden">
          {/* Watermark Crest */}
          <div className="absolute right-6 top-6 opacity-10 pointer-events-none">
            <ImperialSeal className="w-48 h-48" />
          </div>

          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-gold-500/20 pb-8">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl sm:text-3xl font-serif font-black tracking-[0.2em] text-gold-400">
                  HABESHA LUXE
                </span>
              </div>
              <p className="text-xs text-gold-400/90 uppercase tracking-widest font-serif mt-0.5">
                የኢትዮጵያ ንጉሣዊ ልብስ • Official Tax Invoice
              </p>
              <div className="text-[11px] text-zinc-400 mt-2 space-y-0.5">
                <div>Habesha Luxe Couture Private Limited Co.</div>
                <div>TIN: 0048192841 | VAT Reg: 78923410</div>
                <div>Bole Sub-City, Woreda 03, Edna Plaza 4th Floor, Addis Ababa</div>
                <div>Contact: +251 99 816 4025 (0998164025) | getasewshumie@gmail.com</div>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                PAID & VERIFIED (CHAPA)
              </span>
              <div className="text-xs text-zinc-400">
                Invoice No: <strong className="text-ivory-100 font-mono">HL-INV-{order.id.slice(-6)}</strong>
              </div>
              <div className="text-xs text-zinc-400">
                Date: <strong className="text-ivory-100">{formatDate(order.createdAt)}</strong>
              </div>
              <div className="text-xs text-zinc-400">
                Chapa Ref: <strong className="text-gold-400 font-mono">{order.txRef}</strong>
              </div>
              {order.chapaTransactionId && (
                <div className="text-[11px] text-zinc-500">
                  Gateway Ref: {order.chapaTransactionId}
                </div>
              )}
            </div>
          </div>

          {/* Billed To & Delivery Address Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs">
            <div className="bg-obsidian-950/60 p-4 rounded-xl border border-zinc-800 space-y-1.5">
              <div className="text-gold-400 font-bold uppercase tracking-wider text-[11px]">
                Customer & Bill To:
              </div>
              <div className="text-sm font-bold text-ivory-100">
                {order.customer.firstName} {order.customer.lastName}
              </div>
              <div className="text-zinc-300">Phone: {order.customer.phoneNumber}</div>
              <div className="text-zinc-300">Email: {order.customer.email}</div>
              <div className="text-zinc-400">Payment: {order.paymentMethod || "Telebirr via Chapa"}</div>
            </div>

            <div className="bg-obsidian-950/60 p-4 rounded-xl border border-zinc-800 space-y-1.5">
              <div className="text-gold-400 font-bold uppercase tracking-wider text-[11px]">
                Courier Dispatch Destination:
              </div>
              <div className="text-sm font-semibold text-ivory-100">
                {order.customer.deliveryZone === "addis-ababa"
                  ? "Addis Ababa Doorstep Courier"
                  : order.customer.deliveryZone === "ethiopia-regions"
                  ? "Ethiopian Regional Express"
                  : "DHL Global Diaspora Courier"}
              </div>
              {order.customer.subCity && (
                <div className="text-zinc-300">Sub-city: {order.customer.subCity}</div>
              )}
              {order.customer.houseNumber && (
                <div className="text-zinc-300">House: {order.customer.houseNumber}</div>
              )}
              {order.customer.specificAddress && (
                <div className="text-zinc-300">Address / Landmark: {order.customer.specificAddress}</div>
              )}
              {order.customer.deliveryNotes && (
                <div className="text-zinc-400 italic">Notes: &ldquo;{order.customer.deliveryNotes}&rdquo;</div>
              )}
            </div>
          </div>

          {/* Line Items Table */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-wider font-bold text-gold-400">
              Purchased Ethiopian Attire & Couture Pieces
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gold-500/20 text-zinc-400 font-semibold uppercase text-[10px]">
                    <th className="py-2.5 pr-4">Description</th>
                    <th className="py-2.5 px-3">Size & Fit</th>
                    <th className="py-2.5 px-3 text-center">Qty</th>
                    <th className="py-2.5 px-3 text-right">Unit Price</th>
                    <th className="py-2.5 pl-3 text-right">Amount (ETB)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80">
                  {order.items.map((item, idx) => (
                    <tr key={idx} className="text-zinc-300">
                      <td className="py-3 pr-4">
                        <div className="font-serif font-bold text-ivory-100">{item.product.name}</div>
                        <div className="text-[11px] text-zinc-400">{item.product.origin}</div>
                        {item.customMeasurements && (
                          <div className="text-[10px] text-emerald-400 mt-0.5">
                            Tailoring: B: {item.customMeasurements.bust || "-"} | W: {item.customMeasurements.waist || "-"} | H: {item.customMeasurements.hips || "-"}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-obsidian-950 text-gold-300 border border-zinc-800">
                          {item.selectedSize}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-ivory-100">{item.quantity}</td>
                      <td className="py-3 px-3 text-right">{formatETB(item.product.priceETB)}</td>
                      <td className="py-3 pl-3 text-right font-bold text-gold-400">
                        {formatETB(item.product.priceETB * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Subtotals & Delivery Calculation */}
          <div className="flex justify-end pt-4 border-t border-gold-500/20">
            <div className="w-full sm:w-72 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="text-ivory-100">{formatETB(order.subtotalETB)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Delivery Fee</span>
                <span>
                  {order.deliveryFeeETB === 0 ? (
                    <span className="text-emerald-400 font-semibold">FREE (Addis Ababa)</span>
                  ) : (
                    <span className="text-ivory-100">{formatETB(order.deliveryFeeETB)}</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>VAT (Included @ 15%)</span>
                <span className="text-zinc-500">{formatETB(Math.round(order.grandTotalETB * 0.15))}</span>
              </div>
              <div className="flex justify-between text-base font-serif font-black pt-2 border-t border-zinc-800 text-ivory-100">
                <span>Grand Total Paid</span>
                <span className="text-gold-400">{formatETB(order.grandTotalETB)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Timeline Guarantee */}
          <div className="bg-obsidian-950/80 p-4 rounded-xl border border-gold-500/20 flex items-start space-x-3 text-xs">
            <Truck className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="font-bold text-ivory-100">Estimated Delivery Timeline</div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Your order is currently queued for artisan inspection and tailoring. 
                Doorstep courier delivery inside Addis Ababa will arrive within 24 to 48 hours. 
                Regional & Diaspora tracking details will be sent via SMS / WhatsApp to <strong className="text-gold-400">{order.customer.phoneNumber}</strong>.
              </p>
            </div>
          </div>

          {/* Official Bottom Stamp */}
          <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center text-[10px] text-zinc-500 gap-2">
            <div>This is a computer-generated tax invoice verified by the Chapa Payment API.</div>
            <div className="text-gold-400/80 font-serif">Habesha Luxe • Authentic Ethiopian Couture</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-obsidian-950 flex items-center justify-center text-ivory-100">Loading Order Invoice...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
