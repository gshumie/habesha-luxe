"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  ArrowLeft,
  Truck,
  CreditCard,
  ShoppingBag,
  AlertCircle,
  Sparkles,
  Phone,
  Mail,
  User,
  Home,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { useUIStore } from "@/lib/store/useUIStore";
import { formatETB, formatUSD } from "@/lib/utils";
import { ADDIS_SUB_CITIES, REGIONAL_CITIES, DELIVERY_OPTIONS } from "@/lib/data/delivery";
import { DeliveryZone } from "@/types/cart";
import { PaymentBadgeList } from "@/components/checkout/PaymentBadgeList";
import { TibebBorder } from "@/components/ui/EthiopianPattern";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, deliveryZone, setDeliveryZone, getTotals, clearCart } = useCartStore();
  const showUSD = useUIStore((s) => s.showUSD);

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Customer form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "Addis Ababa",
    subCity: ADDIS_SUB_CITIES[0],
    woreda: "",
    houseNumber: "",
    specificAddress: "",
    deliveryNotes: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totals = getTotals();

  // If bag is empty, guide user back
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-obsidian-900 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-ivory-100 mb-2">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-xs text-zinc-400 max-w-sm mb-6">
          Please select from our authentic imperial Ethiopian collections before proceeding to checkout.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 font-serif font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-gold-500/20"
        >
          Return to Collections
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.firstName.trim()) {
      setErrorMessage("Please enter your First Name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 9) {
      setErrorMessage("Please enter an Ethiopian phone number (e.g. 0912345678 or +251...).");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/payment/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            ...formData,
            deliveryZone,
          },
          items,
          subtotalETB: totals.subtotalETB,
          deliveryFeeETB: totals.deliveryFeeETB,
          grandTotalETB: totals.grandTotalETB,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.message || "Failed to initialize Chapa payment gateway");
      }

      // Order initialized successfully. Clear cart from localStorage before redirecting to Chapa.
      clearCart();

      // Redirect client to Chapa's checkout URL (or simulated sandbox)
      window.location.href = data.checkoutUrl;
    } catch (err: any) {
      console.error("[Checkout Submission Error]:", err);
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 bg-obsidian-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-medium text-zinc-400 hover:text-gold-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
          <div className="flex items-center space-x-1.5 text-xs text-gold-400">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted Chapa Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Customer & Delivery Details Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-obsidian-900 border border-gold-500/25 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="border-b border-gold-500/20 pb-4">
                <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-bold block mb-1">
                  Step 1 of 2 • የደንበኛ መረጃ
                </span>
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-ivory-100">
                  Customer & Delivery Details
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Enter your address for swift delivery inside Addis Ababa or across Ethiopian regions.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center space-x-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} id="checkout-form" className="space-y-5 text-xs">
                {/* Name fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      First Name (ስም) <span className="text-gold-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-gold-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Almaz"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-obsidian-950 border border-gold-500/20 rounded-xl pl-9 pr-3 py-2.5 text-ivory-100 focus:outline-none focus:border-gold-400 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      Last Name (የአባት ስም) <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bekele"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-obsidian-950 border border-gold-500/20 rounded-xl px-3 py-2.5 text-ivory-100 focus:outline-none focus:border-gold-400 text-xs"
                    />
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      Email (ኢሜይል) <span className="text-gold-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gold-400" />
                      <input
                        type="email"
                        required
                        placeholder="almaz.bekele@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-obsidian-950 border border-gold-500/20 rounded-xl pl-9 pr-3 py-2.5 text-ivory-100 focus:outline-none focus:border-gold-400 text-xs"
                      />
                    </div>
                    <span className="text-[10px] text-zinc-500 mt-0.5 block">
                      Chapa payment receipt will be sent here
                    </span>
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      Phone Number (ስልክ ቁጥር) <span className="text-gold-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gold-400" />
                      <input
                        type="tel"
                        required
                        placeholder="0911234567 or +251..."
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        className="w-full bg-obsidian-950 border border-gold-500/20 rounded-xl pl-9 pr-3 py-2.5 text-ivory-100 focus:outline-none focus:border-gold-400 text-xs"
                      />
                    </div>
                    <span className="text-[10px] text-zinc-500 mt-0.5 block">
                      Required for courier dispatch & Telebirr push
                    </span>
                  </div>
                </div>

                {/* Delivery Zone Selector Cards */}
                <div className="space-y-2 pt-2">
                  <label className="block text-zinc-300 font-semibold">
                    Delivery Destination Zone
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {DELIVERY_OPTIONS.map((opt) => {
                      const isSelected = deliveryZone === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setDeliveryZone(opt.id as DeliveryZone)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? "bg-gold-500/10 border-gold-400 text-ivory-100 shadow-md"
                              : "bg-obsidian-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-ivory-100">{opt.name.split(" ")[0]}</span>
                            <span className="text-[11px] font-bold text-gold-400">
                              {opt.feeETB === 0 ? "FREE" : `${opt.feeETB} ETB`}
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-400 line-clamp-2">{opt.description}</p>
                          <span className="text-[10px] text-zinc-500 mt-1 block">Est: {opt.estimatedDays}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sub-city / City Selection */}
                {deliveryZone === "addis-ababa" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">
                        Addis Ababa Sub-City (ክፍለ ከተማ)
                      </label>
                      <select
                        value={formData.subCity}
                        onChange={(e) => setFormData({ ...formData, subCity: e.target.value })}
                        className="w-full bg-obsidian-950 border border-gold-500/20 rounded-xl px-3 py-2.5 text-ivory-100 focus:outline-none focus:border-gold-400 text-xs"
                      >
                        {ADDIS_SUB_CITIES.map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">
                        Woreda / Kebele (ወረዳ)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Woreda 03"
                        value={formData.woreda}
                        onChange={(e) => setFormData({ ...formData, woreda: e.target.value })}
                        className="w-full bg-obsidian-950 border border-gold-500/20 rounded-xl px-3 py-2.5 text-ivory-100 focus:outline-none focus:border-gold-400 text-xs"
                      />
                    </div>
                  </div>
                ) : deliveryZone === "ethiopia-regions" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">
                        Regional City (የክልል ከተማ)
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-obsidian-950 border border-gold-500/20 rounded-xl px-3 py-2.5 text-ivory-100 focus:outline-none focus:border-gold-400 text-xs"
                      >
                        {REGIONAL_CITIES.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">
                        Local Landmark or Neighborhood
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Near Lake Tana Hotel"
                        value={formData.specificAddress}
                        onChange={(e) => setFormData({ ...formData, specificAddress: e.target.value })}
                        className="w-full bg-obsidian-950 border border-gold-500/20 rounded-xl px-3 py-2.5 text-ivory-100 focus:outline-none focus:border-gold-400 text-xs"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      International Country, City & Full Postal Address
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. 1200 K Street NW, Washington, DC 20005, United States"
                      value={formData.specificAddress}
                      onChange={(e) => setFormData({ ...formData, specificAddress: e.target.value })}
                      className="w-full bg-obsidian-950 border border-gold-500/20 rounded-xl p-2.5 text-ivory-100 focus:outline-none focus:border-gold-400 text-xs"
                    />
                  </div>
                )}

                {/* Specific House Number / Landmark */}
                {deliveryZone === "addis-ababa" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">
                        House / Building Number (የቤት ቁጥር)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. House 452 / Apt 3B"
                        value={formData.houseNumber}
                        onChange={(e) => setFormData({ ...formData, houseNumber: e.target.value })}
                        className="w-full bg-obsidian-950 border border-gold-500/20 rounded-xl px-3 py-2.5 text-ivory-100 focus:outline-none focus:border-gold-400 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">
                        Nearby Landmark / Street
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Behind Edna Mall, Next to Ramada"
                        value={formData.specificAddress}
                        onChange={(e) => setFormData({ ...formData, specificAddress: e.target.value })}
                        className="w-full bg-obsidian-950 border border-gold-500/20 rounded-xl px-3 py-2.5 text-ivory-100 focus:outline-none focus:border-gold-400 text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Delivery Notes */}
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Special Delivery / Fitting Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Gate code, call 10 mins before arrival, preferred delivery time..."
                    value={formData.deliveryNotes}
                    onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                    className="w-full bg-obsidian-950 border border-gold-500/20 rounded-xl p-2.5 text-ivory-100 focus:outline-none focus:border-gold-400 text-xs"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Order Summary & Chapa Payment CTA (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-obsidian-900 border border-gold-500/25 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 sticky top-28">
              <div className="border-b border-gold-500/20 pb-4">
                <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-bold block mb-1">
                  Order Summary
                </span>
                <h2 className="text-xl font-serif font-black text-ivory-100">
                  {totals.itemCount} {totals.itemCount === 1 ? "Item Selected" : "Items Selected"}
                </h2>
              </div>

              {/* Items List Mini */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-zinc-800/60">
                {items.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex space-x-3">
                    <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-obsidian-800 shrink-0 border border-gold-500/20">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between text-xs">
                      <div>
                        <h4 className="font-serif font-semibold text-ivory-100 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-zinc-400">
                          Size: <span className="text-gold-300 font-medium">{item.selectedSize}</span> • Qty: {item.quantity}
                        </div>
                        {item.customMeasurements && (
                          <div className="text-[10px] text-emerald-400">Custom Tailored Cut</div>
                        )}
                      </div>
                      <div className="font-bold text-gold-400 text-right">
                        {formatETB(item.product.priceETB * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Calculation */}
              <div className="space-y-2 pt-4 border-t border-zinc-800 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-ivory-100 font-medium">{formatETB(totals.subtotalETB)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Delivery ({deliveryZone === "addis-ababa" ? "Addis Ababa" : "Regional/Intl"})</span>
                  <span>
                    {totals.deliveryFeeETB === 0 ? (
                      <span className="text-emerald-400 font-semibold">FREE (Addis)</span>
                    ) : (
                      <span className="text-ivory-100 font-medium">{formatETB(totals.deliveryFeeETB)}</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-serif font-black pt-3 border-t border-zinc-800 text-ivory-100">
                  <span>Grand Total</span>
                  <div className="text-right">
                    <span className="text-gold-400">{formatETB(totals.grandTotalETB)}</span>
                    {showUSD && (
                      <div className="text-xs font-normal text-zinc-400">
                        ≈ {formatUSD(totals.grandTotalETB)}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Chapa Payment Badges */}
              <div className="pt-2 space-y-2">
                <div className="text-xs text-zinc-300 font-medium">
                  Accepted Chapa Payment Methods:
                </div>
                <PaymentBadgeList />
              </div>

              {/* Main Pay Now CTA button */}
              <button
                type="submit"
                form="checkout-form"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 text-obsidian-950 font-serif font-black text-sm uppercase tracking-[0.15em] shadow-xl shadow-gold-500/25 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-obsidian-950 border-t-transparent rounded-full animate-spin" />
                    <span>Connecting to Chapa...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 text-obsidian-950" />
                    <span>Pay {formatETB(totals.grandTotalETB)} with Chapa</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Redirecting to Chapa&apos;s PCI-DSS compliant checkout portal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
