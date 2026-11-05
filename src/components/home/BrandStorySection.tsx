"use client";

import React from "react";
import Image from "next/image";
import { Crown, Sparkles, Award, ShieldCheck, HeartHandshake, Feather } from "lucide-react";
import { ImperialSeal, TibebBorder } from "../ui/EthiopianPattern";

export function BrandStorySection() {
  return (
    <section id="about-habesha-luxe" className="relative py-20 bg-obsidian-950 border-t border-gold-500/20 overflow-hidden">
      {/* Background Subtle Luxury Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Eyebrow & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-[0.25em]">
            <Crown className="w-3.5 h-3.5 text-gold-400" />
            <span>The Maison & Heritage • የክብር እና የጥበብ ቤት</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-ivory-100 tracking-tight leading-tight">
            About Habesha Luxe
          </h2>
          <p className="font-serif text-sm sm:text-base text-gold-400/90 tracking-[0.2em] uppercase font-semibold">
            Where Three Millennia of Sovereign Majesty Meet Contemporary Haute Couture
          </p>
        </div>

        {/* Narrative & Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Column: Visual Showcase with Imperial Seal */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden border-2 border-gold-500/35 shadow-2xl shadow-gold-500/10 group">
              <Image
                src="/images/hero-bridal.jpg?v=20261025"
                alt="Habesha Luxe Haute Couture Bridal Gala Kemis"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/30 to-transparent" />

              {/* Watermark Crest */}
              <div className="absolute top-4 right-4 bg-obsidian-950/80 backdrop-blur-md p-2 rounded-full border border-gold-500/40 shadow-xl">
                <ImperialSeal className="w-12 h-12" />
              </div>

              {/* Card Plaque */}
              <div className="absolute bottom-6 inset-x-6 p-4 rounded-2xl bg-obsidian-900/95 backdrop-blur-md border border-gold-500/30 space-y-1 shadow-2xl">
                <div className="flex items-center space-x-1.5 text-gold-400 text-[10px] font-bold uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 text-gold-400" />
                  <span>The Habesha Luxe Charter</span>
                </div>
                <h4 className="font-serif text-sm font-bold text-ivory-100">
                  Haute Couture Born in Addis Ababa
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Woven on traditional Chencha & Dorze pedal looms; tailored bespoke at Edna Plaza, Bole.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: In-depth Brand Description & Philosophy */}
          <div className="lg:col-span-7 space-y-6 text-zinc-300 leading-relaxed text-sm sm:text-base">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-serif font-black text-ivory-100">
                A Living Celebration of Ethiopian Royalty
              </h3>
              <p className="text-zinc-300 font-normal leading-relaxed">
                <strong className="text-gold-400 font-serif">Habesha Luxe</strong> was founded on a singular conviction: that 
                Ethiopia’s 3,000-year textile heritage stands shoulder-to-shoulder with the finest couture houses of Paris, Milan, and London. 
                Rooted in the royal courts of Aksum, Lalibela, and Gondar, our maison curates the sacred craft of the Ethiopian 
                <span className="text-gold-300 font-semibold italic"> Shemane</span> into modern runway elegance and bespoke ceremonial attire.
              </p>
              <p className="text-zinc-300 font-normal leading-relaxed">
                Every Habesha Luxe creation begins with raw organic highland cotton (ፈትል), meticulously handspun on traditional drop spindles by elder women artisans. 
                It is then hand-woven over four to eight weeks on ancient wooden pedal looms by generational master weavers in Dorze and Shiro Meda. 
                Adorned with pure 24-karat gold dipped bullion thread, geometric star tilf motifs (ኮከብ ጥልፍ), and ancient Ge&apos;ez cross borders, our garments are not seasonal fast-fashion—they are sacred, wearable heirlooms passed from one generation to the next.
              </p>
              <p className="text-zinc-300 font-normal leading-relaxed">
                Whether creating bespoke royal bridal gowns for grand <span className="text-gold-300 font-semibold">Serg (ሰርግ)</span> weddings, coordinating matching sets for intimate <span className="text-gold-300 font-semibold">Melse (መልስ)</span> festivities, or crafting featherlight caftans for diplomatic galas and diaspora celebrations in North America, Europe, and the Middle East, Habesha Luxe ensures every stitch embodies dignity, grace, and unmatched artisanal authenticity.
              </p>
            </div>

            {/* Founder / Maison Philosophy Quote */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-obsidian-900 to-obsidian-850 border-l-4 border-gold-500 border-y border-r border-gold-500/20 shadow-xl space-y-2">
              <p className="font-serif italic text-ivory-100 text-sm sm:text-base leading-relaxed">
                &ldquo;We do not merely tailor cloth; we weave three millennia of sovereign African dignity, spiritual symbolism, and artisan soul into every garment you wear.&rdquo;
              </p>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-gold-400 font-semibold tracking-wider uppercase">
                  Maison Habesha Luxe • Atelier Manifesto
                </span>
                <span className="text-zinc-500 text-[11px]">Bole Medhanialem, Addis Ababa</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars of Habesha Luxe */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-6 rounded-2xl bg-obsidian-900/80 border border-gold-500/20 space-y-3 hover:border-gold-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Feather className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-ivory-100">
              100% Organic Highland Shema
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Breathable, chemical-free Ethiopian cotton spun with natural mountain spring washing, offering sublime skin comfort that improves with age.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-obsidian-900/80 border border-gold-500/20 space-y-3 hover:border-gold-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-ivory-100">
              Bespoke Silhouette Sculpting
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every ceremonial dress is tailored made-to-measure by master Ethiopian cutters, matching your exact bust, waist, and length measurements with millimeter precision.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-obsidian-900/80 border border-gold-500/20 space-y-3 hover:border-gold-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-ivory-100">
              Seamless Modern Chapa Checkout
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Instant domestic checkout via Telebirr, CBE Birr, and Awash Birr, paired with rapid doorstep delivery in Addis Ababa and DHL Express to the global diaspora.
            </p>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="mt-16">
          <TibebBorder />
        </div>
      </div>
    </section>
  );
}
