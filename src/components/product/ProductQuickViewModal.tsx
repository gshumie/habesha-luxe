"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Check, Star, Shield, Sparkles, ShoppingBag, Ruler, Award } from "lucide-react";
import { useUIStore } from "@/lib/store/useUIStore";
import { useCartStore } from "@/lib/store/useCartStore";
import { ProductSize, CustomMeasurements } from "@/types/product";
import { formatETB, formatUSD } from "@/lib/utils";

export function ProductQuickViewModal() {
  const { quickViewProduct, isQuickViewOpen, closeQuickView, showUSD } = useUIStore();
  const addItem = useCartStore((s) => s.addItem);

  const [selectedSize, setSelectedSize] = useState<ProductSize>("M");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showMeasurementsForm, setShowMeasurementsForm] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const [measurements, setMeasurements] = useState<CustomMeasurements>({
    bust: "",
    waist: "",
    hips: "",
    shoulderToFloor: "",
    armLength: "",
    notes: "",
  });

  React.useEffect(() => {
    if (quickViewProduct) {
      const initialSize = quickViewProduct.availableSizes[0] || "M";
      setSelectedSize(initialSize);
      setSelectedImageIndex(0);
      setQuantity(1);
      const isCustom =
        initialSize === "Custom Measurement" ||
        initialSize === "Custom Fit" ||
        initialSize === "Custom Tailored" ||
        initialSize.toLowerCase().includes("custom") ||
        initialSize.toLowerCase().includes("tailor");
      setShowMeasurementsForm(isCustom);
    }
  }, [quickViewProduct]);

  if (!isQuickViewOpen || !quickViewProduct) return null;

  const handleSizeSelect = (size: ProductSize) => {
    setSelectedSize(size);
    const isCustom =
      size === "Custom Measurement" ||
      size === "Custom Fit" ||
      size === "Custom Tailored" ||
      size.toLowerCase().includes("custom") ||
      size.toLowerCase().includes("tailor");
    setShowMeasurementsForm(isCustom);
  };

  const isCustomSize =
    selectedSize === "Custom Measurement" ||
    selectedSize === "Custom Fit" ||
    selectedSize === "Custom Tailored" ||
    selectedSize.toLowerCase().includes("custom") ||
    selectedSize.toLowerCase().includes("tailor");

  const handleAddToCart = () => {
    addItem(
      quickViewProduct,
      selectedSize,
      isCustomSize ? measurements : undefined,
      quantity
    );

    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      closeQuickView();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-obsidian-900 border border-gold-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-obsidian-950/80 border border-gold-500/20 text-zinc-400 hover:text-ivory-100 hover:bg-obsidian-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery & Photography */}
        <div className="w-full md:w-1/2 flex flex-col bg-obsidian-950 p-6 border-b md:border-b-0 md:border-r border-gold-500/15">
          <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-gold-500/20 bg-obsidian-900 mb-4">
            <Image
              src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 items-start">
              {quickViewProduct.badge ? (
                <span className="bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-md">
                  {quickViewProduct.badge}
                </span>
              ) : quickViewProduct.featured ? (
                <span className="bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-md">
                  Imperial Couture
                </span>
              ) : null}
              {quickViewProduct.originalPriceETB && quickViewProduct.originalPriceETB > quickViewProduct.priceETB && (
                <span className="bg-crimsonGlow text-white font-black text-[10px] uppercase tracking-wider px-2 py-0.5 rounded shadow-md border border-red-500/30">
                  -{Math.round(((quickViewProduct.originalPriceETB - quickViewProduct.priceETB) / quickViewProduct.originalPriceETB) * 100)}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {quickViewProduct.images.length > 1 && (
            <div className="flex space-x-2.5 overflow-x-auto pb-1">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-16 h-20 rounded-md overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx
                      ? "border-gold-400 scale-105"
                      : "border-zinc-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`View ${idx + 1}`} fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Specifications & Add to Cart */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto space-y-5">
          <div>
            <div className="flex items-center space-x-2 text-xs text-gold-400 font-medium mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>{quickViewProduct.origin}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-ivory-100 tracking-wide">
              {quickViewProduct.name}
            </h2>
            {quickViewProduct.amharicName && (
              <p className="text-sm text-gold-400/90 font-serif tracking-widest mt-0.5">
                {quickViewProduct.amharicName}
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex text-gold-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <span className="text-xs text-ivory-200 font-semibold">{quickViewProduct.rating}</span>
              <span className="text-xs text-zinc-500">
                ({quickViewProduct.reviewCount} verified bridal reviews)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline space-x-3 pb-3 border-b border-zinc-800">
            <span className="text-2xl font-bold font-serif text-gold-400">
              {formatETB(quickViewProduct.priceETB)}
            </span>
            {quickViewProduct.originalPriceETB && (
              <span className="text-sm text-zinc-500 line-through">
                {formatETB(quickViewProduct.originalPriceETB)}
              </span>
            )}
            {showUSD && (
              <span className="text-xs text-zinc-400 font-medium">
                (≈ {formatUSD(quickViewProduct.priceETB)})
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {quickViewProduct.description || quickViewProduct.shortDescription}
          </p>

          {/* Fabric Details & Craftsmanship Box */}
          <div className="bg-obsidian-950/80 p-3.5 rounded-xl border border-gold-500/15 space-y-2 text-xs">
            <div className="flex items-start space-x-2 text-zinc-300">
              <Sparkles className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-ivory-100">Fabric Composition: </strong>
                {quickViewProduct.fabricDetails}
              </div>
            </div>
            <div className="flex items-start space-x-2 text-zinc-300">
              <Shield className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-ivory-100">Heritage Weave: </strong>
                {quickViewProduct.craftsmanship}
              </div>
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-ivory-100 flex items-center space-x-1.5">
                <Ruler className="w-3.5 h-3.5 text-gold-400" />
                <span>Select Size or Custom Tailoring</span>
              </span>
              <span className="text-zinc-400">Authentic Habesha Cut</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {quickViewProduct.availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedSize === size
                      ? "bg-gold-500 text-obsidian-950 shadow-md font-bold"
                      : "bg-obsidian-800 text-zinc-300 hover:text-ivory-100 border border-zinc-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Measurement Form Accordion */}
          {showMeasurementsForm && (
            <div className="bg-obsidian-950 p-4 rounded-xl border border-gold-500/30 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                  Bespoke Ethiopian Couture Measurements
                </h4>
                <span className="text-[10px] text-zinc-400">Unit: cm or inches</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Our master Addis Ababa Shemane tailors will custom-craft this gown to your exact silhouette.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[10px] text-zinc-400 block mb-0.5">Bust (ደረት)</label>
                  <input
                    type="text"
                    placeholder="e.g. 90 cm"
                    value={measurements.bust}
                    onChange={(e) => setMeasurements({ ...measurements, bust: e.target.value })}
                    className="w-full bg-obsidian-850 border border-zinc-700 rounded px-2.5 py-1 text-ivory-100 text-xs focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400 block mb-0.5">Waist (ወገብ)</label>
                  <input
                    type="text"
                    placeholder="e.g. 72 cm"
                    value={measurements.waist}
                    onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                    className="w-full bg-obsidian-850 border border-zinc-700 rounded px-2.5 py-1 text-ivory-100 text-xs focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400 block mb-0.5">Hips (ዳሌ)</label>
                  <input
                    type="text"
                    placeholder="e.g. 98 cm"
                    value={measurements.hips}
                    onChange={(e) => setMeasurements({ ...measurements, hips: e.target.value })}
                    className="w-full bg-obsidian-850 border border-zinc-700 rounded px-2.5 py-1 text-ivory-100 text-xs focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400 block mb-0.5">Shoulder to Floor (ርዝመት)</label>
                  <input
                    type="text"
                    placeholder="e.g. 145 cm"
                    value={measurements.shoulderToFloor}
                    onChange={(e) =>
                      setMeasurements({ ...measurements, shoulderToFloor: e.target.value })
                    }
                    className="w-full bg-obsidian-850 border border-zinc-700 rounded px-2.5 py-1 text-ivory-100 text-xs focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-zinc-400 block mb-0.5">Special Tailoring Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Wedding date, sleeve preference, extra Netela length..."
                  value={measurements.notes}
                  onChange={(e) => setMeasurements({ ...measurements, notes: e.target.value })}
                  className="w-full bg-obsidian-850 border border-zinc-700 rounded px-2.5 py-1 text-ivory-100 text-xs focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>
          )}

          {/* Quantity and Add to Bag Button */}
          <div className="pt-2 flex items-center space-x-3">
            <div className="flex items-center border border-zinc-700 rounded-lg bg-obsidian-950 p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-gold-400 text-base"
              >
                -
              </button>
              <span className="w-8 text-center text-sm font-semibold text-ivory-100">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-gold-400 text-base"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={addedAnimation}
              className={`flex-1 py-3 px-6 rounded-xl font-serif font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-lg ${
                addedAnimation
                  ? "bg-emerald-600 text-white"
                  : "bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 text-obsidian-950 hover:brightness-110 shadow-gold-500/20 active:scale-[0.99]"
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-obsidian-950" />
                  <span>Add to Bag ({formatETB(quickViewProduct.priceETB * quantity)})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
