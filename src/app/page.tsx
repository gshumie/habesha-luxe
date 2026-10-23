"use client";

import React, { useMemo } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryFilter } from "@/components/home/CategoryFilter";
import { ProductCard } from "@/components/home/ProductCard";
import { ShemaneHeritage } from "@/components/home/ShemaneHeritage";
import { BridalBanner } from "@/components/home/BridalBanner";
import { Testimonials } from "@/components/home/Testimonials";
import { PRODUCTS } from "@/lib/data/products";
import { useUIStore } from "@/lib/store/useUIStore";
import { Sparkles, Package, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export default function HomePage() {
  const { selectedCategory, sortBy, searchQuery } = useUIStore();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesAmharic = product.amharicName?.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription.toLowerCase().includes(query);
        const matchesTag = product.tags.some((t) => t.toLowerCase().includes(query));
        const matchesOrigin = product.origin.toLowerCase().includes(query);

        if (!matchesName && !matchesAmharic && !matchesDesc && !matchesTag && !matchesOrigin) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.priceETB - b.priceETB;
        case "price-desc":
          return b.priceETB - a.priceETB;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case "featured":
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Main Product Catalog Section */}
      <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Imperial Wardrobe</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-ivory-100 tracking-tight">
            Curated Ethiopian Masterpieces
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
            From ceremonial royal Kemis to modern runway Tibeb, each creation is individually handcrafted by Ethiopia&apos;s finest artisans.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="mb-10">
          <CategoryFilter />
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-obsidian-900/40 rounded-2xl border border-zinc-800 space-y-3">
            <Package className="w-12 h-12 text-zinc-600 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-ivory-200">
              No Ethiopian Couture Found
            </h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              We couldn&apos;t find any items matching &quot;{searchQuery}&quot;. Try exploring &quot;Kemis&quot;, &quot;Tibeb&quot;, &quot;Gabi&quot;, or &quot;Netela&quot;.
            </p>
          </div>
        )}
      </section>

      {/* 3. Shemane Artisan Heritage Story */}
      <ShemaneHeritage />

      {/* 4. Bridal Banner & Consultation */}
      <BridalBanner />

      {/* 5. Diaspora & Local Testimonials */}
      <Testimonials />

      {/* 6. Luxury Guarantees Banner */}
      <section className="border-t border-gold-500/20 bg-obsidian-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-ivory-100">Addis White-Glove</h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Complimentary doorstep delivery inside Addis Ababa within 24–48 hours.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-ivory-100">Chapa Secured Gateway</h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Instant encrypted payments via Telebirr, CBE Birr, Awash Birr & Cards.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-ivory-100">Bespoke Made-to-Measure</h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Complimentary custom tailoring on bridal and traditional orders.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-ivory-100">Global Diaspora DHL</h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Tracked express delivery across USA, Canada, Europe, & UAE.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
