"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, Menu, X, Crown, Sparkles, ShieldCheck, Phone, Mail } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { useUIStore } from "@/lib/store/useUIStore";
import { TibebBorder } from "../ui/EthiopianPattern";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const openCart = useCartStore((s) => s.openCart);
  const items = useCartStore((s) => s.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const {
    openBridalModal,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    showUSD,
    toggleCurrency,
  } = useUIStore();

  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-obsidian-950/90 backdrop-blur-md border-b border-gold-500/20 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border-b border-gold-500/15 py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="hidden sm:flex items-center space-x-2 text-gold-400 font-medium">
            <Crown className="w-3.5 h-3.5 text-gold-400" />
            <span>Addis Ababa Free White-Glove Delivery</span>
            <span className="text-zinc-600">•</span>
            <a href="tel:+251998164025" className="hover:text-gold-300 transition-colors flex items-center space-x-1">
              <Phone className="w-3 h-3" />
              <span>0998164025 (+251998164025)</span>
            </a>
            <span className="text-zinc-600">•</span>
            <a href="mailto:getasewshumie@gmail.com" className="hover:text-gold-300 transition-colors flex items-center space-x-1">
              <Mail className="w-3 h-3" />
              <span>getasewshumie@gmail.com</span>
            </a>
          </div>
          <div className="mx-auto sm:mx-0 flex items-center space-x-3">
            <span className="text-ivory-200/80 hidden md:inline">
              Instant Chapa Integration: Telebirr & CBE Birr Accepted
            </span>
            <button
              onClick={toggleCurrency}
              className="px-2 py-0.5 rounded border border-gold-500/30 text-[11px] font-semibold text-gold-400 hover:bg-gold-500/10 transition-colors"
              title="Toggle ETB / USD estimation for Diaspora shoppers"
            >
              Currency: <span className="text-ivory-100">{showUSD ? "USD ($)" : "ETB (ብር)"}</span>
            </button>
            <Link
              href="/admin"
              className="text-zinc-400 hover:text-gold-400 transition-colors text-[11px] flex items-center space-x-1"
            >
              <ShieldCheck className="w-3 h-3 text-gold-400" />
              <span>Admin Order Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu trigger */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-ivory-200 hover:text-gold-400 hover:bg-obsidian-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo & Brand Identity */}
          <div className="flex-1 md:flex-none flex items-center justify-center md:justify-start">
            <Link href="/" className="group flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2">
                <span className="text-2xl sm:text-3xl font-serif font-black tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-ivory-100 via-gold-300 to-gold-500">
                  HABESHA LUXE
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-[9px] uppercase tracking-[0.35em] text-gold-400/90 font-medium">
                <span>የኢትዮጵያ ንጉሣዊ ልብስ</span>
                <span>•</span>
                <span>Haute Couture</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7">
            <Link
              href="/"
              onClick={() => setSelectedCategory("all")}
              className={`text-sm tracking-wide font-medium transition-colors hover:text-gold-400 ${
                pathname === "/" && selectedCategory === "all"
                  ? "text-gold-400 font-semibold border-b-2 border-gold-400 pb-1"
                  : "text-ivory-200/90"
              }`}
            >
              All Collections
            </Link>
            <button
              onClick={() => {
                setSelectedCategory("traditional-kemis");
                const el = document.getElementById("catalog-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`text-sm tracking-wide font-medium transition-colors hover:text-gold-400 ${
                selectedCategory === "traditional-kemis" ? "text-gold-400 font-semibold" : "text-ivory-200/90"
              }`}
            >
              Habesha Kemis
            </button>
            <button
              onClick={() => {
                setSelectedCategory("modern-tibeb");
                const el = document.getElementById("catalog-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`text-sm tracking-wide font-medium transition-colors hover:text-gold-400 ${
                selectedCategory === "modern-tibeb" ? "text-gold-400 font-semibold" : "text-ivory-200/90"
              }`}
            >
              Modern Tibeb
            </button>
            <button
              onClick={() => {
                setSelectedCategory("mens-attire");
                const el = document.getElementById("catalog-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`text-sm tracking-wide font-medium transition-colors hover:text-gold-400 ${
                selectedCategory === "mens-attire" ? "text-gold-400 font-semibold" : "text-ivory-200/90"
              }`}
            >
              Men&apos;s Attire
            </button>
            <button
              onClick={openBridalModal}
              className="group flex items-center space-x-1.5 text-sm tracking-wide font-medium text-gold-300 hover:text-gold-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400 group-hover:rotate-12 transition-transform" />
              <span>Bridal Couture</span>
            </button>
          </nav>

          {/* Right Action Icons (Search, Bag) */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Toggle */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-obsidian-800 border border-gold-500/40 rounded-full px-3 py-1.5 shadow-lg">
                  <Search className="w-4 h-4 text-gold-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Kemis, Tibeb, Gabi..."
                    className="w-36 sm:w-56 bg-transparent text-xs text-ivory-100 placeholder-zinc-500 focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSearchOpen(false);
                    }}
                    className="text-zinc-400 hover:text-ivory-100 ml-1.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-full text-ivory-200 hover:text-gold-400 hover:bg-obsidian-800 transition-colors"
                  aria-label="Search items"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Shopping Bag Button with Live Counter */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full text-ivory-100 bg-obsidian-800/80 border border-gold-500/30 hover:border-gold-500 hover:bg-gold-500/10 transition-all duration-200 group"
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="w-5 h-5 text-gold-400 group-hover:scale-105 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulseSlow">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Gold Tibeb Border Sub-line */}
      <TibebBorder className="border-t border-gold-500/10" />

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-obsidian-900 border-b border-gold-500/30 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => {
                setSelectedCategory("all");
                setMobileMenuOpen(false);
              }}
              className="block px-3 py-2 text-base font-medium text-ivory-100 hover:text-gold-400 rounded-md"
            >
              All Collections
            </Link>
            <button
              onClick={() => {
                setSelectedCategory("traditional-kemis");
                setMobileMenuOpen(false);
                document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-ivory-100 hover:text-gold-400 rounded-md"
            >
              Traditional Habesha Kemis
            </button>
            <button
              onClick={() => {
                setSelectedCategory("modern-tibeb");
                setMobileMenuOpen(false);
                document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-ivory-100 hover:text-gold-400 rounded-md"
            >
              Modern Tibeb & Ready-to-Wear
            </button>
            <button
              onClick={() => {
                setSelectedCategory("mens-attire");
                setMobileMenuOpen(false);
                document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-ivory-100 hover:text-gold-400 rounded-md"
            >
              Men&apos;s Traditional Attire
            </button>
            <button
              onClick={() => {
                setSelectedCategory("accessories");
                setMobileMenuOpen(false);
                document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-ivory-100 hover:text-gold-400 rounded-md"
            >
              Handwoven Netela & Accessories
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBridalModal();
              }}
              className="block w-full text-left px-3 py-2 text-base font-semibold text-gold-400 hover:text-gold-300 rounded-md"
            >
              ✨ Bridal Consultation & Bespoke Tailoring
            </button>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-zinc-400 hover:text-gold-400"
            >
              🛡️ Admin Order Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
