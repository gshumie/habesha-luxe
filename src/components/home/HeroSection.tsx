"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck, Flame, Award, HeartHandshake } from "lucide-react";
import { useUIStore } from "@/lib/store/useUIStore";
import { ImperialSeal } from "../ui/EthiopianPattern";

export function HeroSection() {
  const { openBridalModal } = useUIStore();

  const scrollToCatalog = () => {
    const el = document.getElementById("catalog-section");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-obsidian-950">
      {/* Background Subtle Luxury Ambience & Radial Glow */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Golden Geometry Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2415_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2415_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline, Brand Story, & CTAs */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left z-10">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-crimsonGlow to-obsidian-850 border border-gold-500/40 backdrop-blur-sm shadow-md animate-in fade-in duration-500">
            <Sparkles className="w-4 h-4 text-gold-400 animate-spin-slow" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-300 font-bold">
              💍 Wedding Season Exclusive • የሰርግ ወቅት ልዩ ቅናሽ
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-serif font-black tracking-tight text-ivory-100 leading-[1.12]">
              Up To 55% OFF — <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-300 via-gold-500 to-amber-600">
                The Wedding Season is Here 💍
              </span>
            </h1>
            <p className="font-serif text-base sm:text-xl text-gold-400/95 tracking-[0.2em] uppercase font-semibold">
              Royal Ethiopian Haute Couture & Bespoke Bridal Kemis
            </p>
          </div>

          {/* Subtitle Description */}
          <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
            Celebrate your Serg, Melse, and ceremonial festivities in authentic Ethiopian grandeur. 
            Featuring our newly unveiled Royal Purple & Gold Star Tilf, Crimson Couples Sets, and Modern Yellow-Gold Tunics handspun by master Shemane artisans.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={scrollToCatalog}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 text-obsidian-950 font-serif font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-gold-500/20 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 group"
            >
              <span>Shop The Collection</span>
              <ArrowRight className="w-4 h-4 text-obsidian-950 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={openBridalModal}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-obsidian-850/80 hover:bg-obsidian-800 text-ivory-100 font-serif font-bold text-xs uppercase tracking-[0.2em] border border-gold-500/40 hover:border-gold-400 transition-all flex items-center justify-center space-x-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>Bridal Consultation (መልስ / ሰርግ)</span>
            </button>
          </div>

          {/* Trust Metric Badges */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-gold-500/20 max-w-lg mx-auto lg:mx-0">
            <div className="space-y-0.5">
              <div className="text-lg sm:text-xl font-bold font-serif text-gold-400">100%</div>
              <div className="text-[11px] text-zinc-400">Pure Organic Shema</div>
            </div>
            <div className="space-y-0.5 border-x border-zinc-800 px-3">
              <div className="text-lg sm:text-xl font-bold font-serif text-gold-400">160+ Hrs</div>
              <div className="text-[11px] text-zinc-400">Master Handloom</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-lg sm:text-xl font-bold font-serif text-gold-400">Chapa</div>
              <div className="text-[11px] text-zinc-400">Telebirr & CBE Birr</div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Masterpiece */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Circular Gold Halo */}
          <div className="absolute w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full border border-gold-500/30 animate-pulse-slow pointer-events-none" />
          <div className="absolute w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] rounded-full border border-gold-500/10 pointer-events-none" />

          {/* Central Featured Image Card */}
          <div className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[3/4] rounded-2xl overflow-hidden border-2 border-gold-500/40 shadow-2xl shadow-gold-500/15 group">
            <Image
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85"
              alt="Haute Couture Ethiopian Bridal Kemis with Traditional Gold Jewelry"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-90" />

            {/* Overlaid Card Info */}
            <div className="absolute bottom-5 inset-x-5 p-4 rounded-xl bg-obsidian-900/90 backdrop-blur-md border border-gold-500/30 shadow-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gold-400 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-gold-400" />
                  Wedding Season Exclusive
                </span>
                <span className="text-xs font-bold text-gold-400 font-serif">Up to 55% OFF</span>
              </div>
              <h3 className="text-sm font-serif font-bold text-ivory-100">
                Imperial Royal Sheba Bridal Gala Kemis
              </h3>
              <p className="text-[11px] text-zinc-400 line-clamp-1">
                Albo/Koda-style royal gold filigree with hand-embroidered corset bodice.
              </p>
            </div>

            {/* Floating Royal Seal */}
            <div className="absolute top-4 right-4 bg-obsidian-950/80 backdrop-blur-sm p-1.5 rounded-full border border-gold-500/40 shadow-lg">
              <ImperialSeal className="w-12 h-12" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
