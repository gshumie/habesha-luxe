import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      quote:
        "The Classic Hand-Embroidered Bridal Kemis was the crowning highlight of our wedding in Bole. The pure Shema cotton is featherweight yet royal, and Chapa payment via Telebirr was instantaneous.",
      author: "Sara Haile-Selassie",
      title: "Bride & Architect",
      location: "Addis Ababa, Ethiopia",
      rating: 5,
      date: "Meskerem 2025",
    },
    {
      quote:
        "Living in Silver Spring, Maryland, finding authentic handwoven Gondar Tilf of this caliber was impossible until Habesha Luxe. The made-to-measure custom measurements fit me like a glove!",
      author: "Meron Woldegiorgis",
      title: "Diaspora Cultural Curator",
      location: "Washington, D.C., USA",
      rating: 5,
      date: "Tikimt 2025",
    },
    {
      quote:
        "I purchased the Men's Imperial Linen Shirt & Gabi for our family Melse celebration. The craftsmanship of the Shemane weavers is unmistakable. Unrivaled luxury and swift DHL delivery.",
      author: "Dr. Henok Tadesse",
      title: "Cardiologist",
      location: "London, United Kingdom",
      rating: 5,
      date: "Hidar 2025",
    },
  ];

  return (
    <section className="py-20 bg-obsidian-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-bold">
            Clientele Accolades • ምስክርነት
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-ivory-100">
            Adored by Royalty Across the Globe
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Celebrated by Habesha brides, diaspora families, and cultural luminaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-obsidian-900/80 border border-gold-500/20 hover:border-gold-500/50 shadow-xl flex flex-col justify-between space-y-4 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-gold-400">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-gold-500/20" />
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/80">
                <div className="flex items-center space-x-1.5">
                  <h4 className="font-serif font-bold text-sm text-ivory-100">{r.author}</h4>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-[11px] text-gold-400/90 font-medium">{r.title}</div>
                <div className="text-[10px] text-zinc-500">{r.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
