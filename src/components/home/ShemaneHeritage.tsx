import React from "react";
import Image from "next/image";
import { Sparkles, Feather, ShieldCheck, HeartHandshake } from "lucide-react";
import { TibebBorder } from "../ui/EthiopianPattern";

export function ShemaneHeritage() {
  const pillars = [
    {
      icon: <Feather className="w-5 h-5 text-gold-400" />,
      title: "Handspun Highland Cotton (ፈትል)",
      description:
        "Every thread begins with raw organic Ethiopian cotton hand-spun on wooden drop spindles by elder women artisans in rural cooperatives.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-gold-400" />,
      title: "Dorze Loom Architecture",
      description:
        "Master Shemane weavers in Dorze and Shiro Meda operate pedal handlooms passed down through five generations of textile masters.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-gold-400" />,
      title: "Royal Tilf & Metallic Borders",
      description:
        "Intricate geometric diamond and cross motifs stitched with metallic bullion thread, symbolizing Ethiopian sovereignty, faith, and royal elegance.",
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-gold-400" />,
      title: "Fair-Trade Artisan Dignity",
      description:
        "We pay 3.5x standard fair-trade wages directly to our 140+ Ethiopian weaver families, preserving indigenous African textile heritage.",
    },
  ];

  return (
    <section className="relative py-20 bg-obsidian-900 border-y border-gold-500/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-gold-500/30 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80"
                alt="Ethiopian Shemane Weaving Craft"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-obsidian-900/90 backdrop-blur-md border border-gold-500/30">
                <span className="text-gold-400 text-xs font-bold uppercase tracking-wider block">
                  Preserving Heritage
                </span>
                <span className="text-ivory-100 font-serif text-sm font-semibold">
                  The Sacred Loom of Chencha & Shiro Meda
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Story & 4 Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-bold">
                Couture Ethio-Craftsmanship • የሸማኔ ጥበብ
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-ivory-100 leading-tight">
                Woven from the Soul of Ancient Ethiopia
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Before mass production and synthetic fast-fashion existed, Ethiopian Shemane artisans were already weaving world-renowned cotton garments for royal courts of Aksum and Gondar. Habesha Luxe preserves this unbroken lineage, celebrating the human hand behind every stitch.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-obsidian-950/70 border border-gold-500/15 hover:border-gold-500/40 transition-colors space-y-2"
                >
                  <div className="p-2 rounded-lg bg-obsidian-900 w-fit border border-gold-500/20">
                    {pillar.icon}
                  </div>
                  <h3 className="font-serif font-bold text-sm text-ivory-100">{pillar.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <TibebBorder />
      </div>
    </section>
  );
}
