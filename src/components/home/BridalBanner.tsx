"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";
import { useUIStore } from "@/lib/store/useUIStore";

export function BridalBanner() {
  const openBridalModal = useUIStore((s) => s.openBridalModal);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <div className="relative rounded-3xl overflow-hidden border-2 border-gold-500/40 bg-gradient-to-r from-obsidian-950 via-obsidian-900 to-obsidian-950 shadow-2xl p-8 sm:p-14">
        {/* Background glow and decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Bridal & Melse Studio</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-black text-ivory-100 tracking-tight leading-tight">
            Your Dream Ethiopian Wedding Couture
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Planning your Serg or Melse celebration? Whether you reside in Addis Ababa, Washington DC, London, Stockholm, or Dubai, our private atelier creates custom royal matching couples&apos; attire, bridal party Netelas, and bespoke heirloom gowns tailored to perfection.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={openBridalModal}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 text-obsidian-950 font-serif font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-gold-500/20 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4 text-obsidian-950" />
              <span>Book A Bespoke Fitting</span>
            </button>
            <span className="text-xs text-zinc-400">
              Personalized design sketches delivered in 48 hours
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
