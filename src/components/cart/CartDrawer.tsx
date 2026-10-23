"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { useUIStore } from "@/lib/store/useUIStore";
import { formatETB, formatUSD } from "@/lib/utils";
import { DELIVERY_OPTIONS } from "@/lib/data/delivery";
import { DeliveryZone } from "@/types/cart";
import { PaymentBadgeList } from "../checkout/PaymentBadgeList";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    deliveryZone,
    setDeliveryZone,
    getTotals,
  } = useCartStore();

  const showUSD = useUIStore((s) => s.showUSD);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totals = getTotals();

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Slide-over Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-obsidian-900 border-l border-gold-500/25 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-gold-500/20 flex items-center justify-between bg-obsidian-950/60">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-gold-400" />
            <h2 className="font-serif font-bold text-lg text-ivory-100 tracking-wide">
              Your Shopping Bag
            </h2>
            <span className="text-xs bg-gold-500/20 text-gold-300 border border-gold-500/30 px-2 py-0.5 rounded-full font-medium">
              {totals.itemCount} {totals.itemCount === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-full text-zinc-400 hover:text-ivory-100 hover:bg-obsidian-800 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-zinc-800/80">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-16 h-16 rounded-full bg-obsidian-800/80 border border-gold-500/20 flex items-center justify-center mb-4 text-gold-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-ivory-100 mb-1">
                Your bag is empty
              </h3>
              <p className="text-xs text-zinc-400 max-w-xs mb-6">
                Explore our authentic royal Kemis, modern Tibeb, and handspun shawls.
              </p>
              <button
                onClick={closeCart}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-gold-500/10"
              >
                Discover Collections
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex space-x-3.5 group">
                {/* Product Thumbnail */}
                <div className="relative w-20 h-24 rounded-md overflow-hidden bg-obsidian-800 shrink-0 border border-gold-500/20">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="font-serif text-sm font-semibold text-ivory-100 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-zinc-500 hover:text-red-400 transition-colors ml-2 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-obsidian-800 text-gold-300 border border-gold-500/20 font-medium">
                        Size: {item.selectedSize}
                      </span>
                      {item.customMeasurements && (
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-700/30 px-1.5 py-0.5 rounded">
                          Tailored
                        </span>
                      )}
                    </div>

                    {item.customMeasurements && (
                      <div className="mt-1 text-[10px] text-zinc-400 bg-obsidian-950/60 p-1.5 rounded border border-zinc-800">
                        {item.customMeasurements.bust && `Bust: ${item.customMeasurements.bust} | `}
                        {item.customMeasurements.waist && `Waist: ${item.customMeasurements.waist} | `}
                        {item.customMeasurements.hips && `Hips: ${item.customMeasurements.hips}`}
                      </div>
                    )}
                  </div>

                  {/* Quantity & Unit Price */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/60">
                    <div className="flex items-center border border-zinc-700 rounded-md bg-obsidian-950">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:text-gold-400 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-ivory-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:text-gold-400 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-gold-400">
                        {formatETB(item.product.priceETB * item.quantity)}
                      </span>
                      {showUSD && (
                        <div className="text-[10px] text-zinc-400">
                          ≈ {formatUSD(item.product.priceETB * item.quantity)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-gold-500/20 bg-obsidian-950/90 space-y-4">
            {/* Delivery Zone Selector */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center space-x-1">
                  <Truck className="w-3.5 h-3.5 text-gold-400" />
                  <span className="text-ivory-200 font-medium">Delivery Destination</span>
                </span>
                <span className="text-[11px] text-gold-400 font-semibold">
                  {totals.deliveryFeeETB === 0 ? "FREE in Addis" : formatETB(totals.deliveryFeeETB)}
                </span>
              </div>
              <select
                value={deliveryZone}
                onChange={(e) => setDeliveryZone(e.target.value as DeliveryZone)}
                className="w-full bg-obsidian-850 border border-gold-500/30 rounded-lg px-3 py-2 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
              >
                {DELIVERY_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name} ({opt.feeETB === 0 ? "FREE" : `${opt.feeETB} ETB`})
                  </option>
                ))}
              </select>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="text-ivory-200">{formatETB(totals.subtotalETB)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Delivery</span>
                <span>
                  {totals.deliveryFeeETB === 0 ? (
                    <span className="text-emerald-400 font-medium">FREE (Addis Ababa)</span>
                  ) : (
                    <span className="text-ivory-200">{formatETB(totals.deliveryFeeETB)}</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t border-zinc-800 text-ivory-100">
                <span className="font-serif">Grand Total</span>
                <div className="text-right">
                  <span className="text-gold-400">{formatETB(totals.grandTotalETB)}</span>
                  {showUSD && (
                    <div className="text-[11px] font-normal text-zinc-400">
                      ≈ {formatUSD(totals.grandTotalETB)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Supported Payment Badges */}
            <PaymentBadgeList compact />

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 text-obsidian-950 font-serif font-black text-sm uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg shadow-gold-500/20 hover:brightness-110 active:scale-[0.99] transition-all"
            >
              <span>Proceed to Chapa Checkout</span>
              <ArrowRight className="w-4 h-4 text-obsidian-950" />
            </Link>

            <div className="flex items-center justify-center space-x-1.5 text-[11px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Chapa Bank-Grade Encrypted 256-Bit SSL</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
