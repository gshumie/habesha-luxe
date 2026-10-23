"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, ShoppingBag, Star, Sparkles, Check } from "lucide-react";
import { Product } from "@/types/product";
import { useUIStore } from "@/lib/store/useUIStore";
import { useCartStore } from "@/lib/store/useCartStore";
import { formatETB, formatUSD } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { openQuickView, showUSD } = useUIStore();
  const addItem = useCartStore((s) => s.addItem);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to first available size
    const defaultSize = product.availableSizes[0] || "M";
    addItem(product, defaultSize);

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 900);
  };

  return (
    <div
      onClick={() => openQuickView(product)}
      className="group relative bg-obsidian-900/90 rounded-2xl overflow-hidden border border-gold-500/20 hover:border-gold-500/60 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold-500/10 cursor-pointer flex flex-col"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-obsidian-950">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Gradient Overlay for luxury depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-black/20" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 items-start">
          {product.badge && (
            <span className="bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-md">
              {product.badge}
            </span>
          )}
          {product.originalPriceETB && product.originalPriceETB > product.priceETB && (
            <span className="bg-crimsonGlow text-white font-black text-[10px] uppercase tracking-wider px-2 py-0.5 rounded shadow-md border border-red-500/30">
              -{Math.round(((product.originalPriceETB - product.priceETB) / product.originalPriceETB) * 100)}% OFF
            </span>
          )}
          {product.isBestSeller && !product.badge && (
            <span className="bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-md">
              Imperial Choice
            </span>
          )}
          {product.isNew && (
            <span className="bg-emerald-900/80 text-emerald-200 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
              New Season
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="flex-1 mr-2 py-2.5 px-3 rounded-xl bg-obsidian-950/90 backdrop-blur-md border border-gold-500/40 text-ivory-100 font-serif font-semibold text-xs tracking-wider flex items-center justify-center space-x-1.5 hover:bg-gold-500 hover:text-obsidian-950 transition-colors shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            disabled={justAdded}
            className={`p-2.5 rounded-xl border font-bold text-xs flex items-center justify-center shadow-lg transition-all ${
              justAdded
                ? "bg-emerald-600 text-white border-emerald-500"
                : "bg-gold-500 text-obsidian-950 border-gold-400 hover:brightness-110 active:scale-95"
            }`}
            title="Instant Add to Bag"
          >
            {justAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-zinc-400">
            <span className="text-gold-400/90 font-medium">{product.origin}</span>
            <div className="flex items-center space-x-1 text-gold-400">
              <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
              <span className="font-semibold text-ivory-100">{product.rating}</span>
            </div>
          </div>

          <h3 className="font-serif font-bold text-sm sm:text-base text-ivory-100 line-clamp-1 group-hover:text-gold-300 transition-colors">
            {product.name}
          </h3>

          {product.amharicName && (
            <p className="text-xs text-gold-400/80 font-serif line-clamp-1">
              {product.amharicName}
            </p>
          )}

          <p className="text-xs text-zinc-400 line-clamp-2 pt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & CTA footer */}
        <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-base sm:text-lg font-serif font-black text-gold-400">
                {formatETB(product.priceETB)}
              </span>
              {product.originalPriceETB && product.originalPriceETB > product.priceETB && (
                <span className="text-xs text-zinc-500 line-through">
                  {formatETB(product.originalPriceETB)}
                </span>
              )}
            </div>
            {showUSD && (
              <div className="text-[11px] text-zinc-400 font-medium">
                ≈ {formatUSD(product.priceETB)}
              </div>
            )}
          </div>

          <span className="text-[11px] text-zinc-400 font-medium group-hover:text-gold-400 flex items-center space-x-1 transition-colors">
            <span>Explore</span>
            <span>&rarr;</span>
          </span>
        </div>
      </div>
    </div>
  );
}
