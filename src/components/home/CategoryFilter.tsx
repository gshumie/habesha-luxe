"use client";

import React from "react";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { useUIStore, SortOption } from "@/lib/store/useUIStore";
import { CATEGORIES, PRODUCTS } from "@/lib/data/products";
import { ProductCategory } from "@/types/product";

export function CategoryFilter() {
  const {
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
  } = useUIStore();

  const getCount = (catId: ProductCategory) => {
    if (catId === "all") return PRODUCTS.length;
    return PRODUCTS.filter((p) => p.category === catId).length;
  };

  return (
    <div className="space-y-6">
      {/* Search & Sort Controls Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-obsidian-900/70 p-4 rounded-2xl border border-gold-500/20 backdrop-blur-sm">
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gold-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Ethiopian couture, kemis, tilf, netela..."
            className="w-full bg-obsidian-950 border border-gold-500/25 rounded-xl pl-10 pr-4 py-2.5 text-xs text-ivory-100 placeholder-zinc-500 focus:outline-none focus:border-gold-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-xs text-zinc-400 hover:text-ivory-100"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center space-x-2.5 w-full md:w-auto justify-end">
          <span className="text-xs text-zinc-400 flex items-center space-x-1 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-gold-400" />
            <span className="hidden sm:inline">Sort by:</span>
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-obsidian-950 border border-gold-500/25 rounded-xl px-3 py-2 text-xs text-ivory-100 focus:outline-none focus:border-gold-400 font-medium"
          >
            <option value="featured">Featured Curations</option>
            <option value="price-asc">Price: Low to High (ETB)</option>
            <option value="price-desc">Price: High to Low (ETB)</option>
            <option value="rating">Top Rated Bridal</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = getCount(cat.id as ProductCategory);

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as ProductCategory)}
              className={`shrink-0 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 flex items-center space-x-2 border ${
                isActive
                  ? "bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 border-gold-400 shadow-lg shadow-gold-500/15"
                  : "bg-obsidian-900/80 text-zinc-300 border-zinc-800 hover:border-gold-500/40 hover:text-ivory-100"
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isActive ? "bg-obsidian-950/20 text-obsidian-950" : "bg-obsidian-950 text-gold-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
