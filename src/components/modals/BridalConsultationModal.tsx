"use client";

import React, { useState } from "react";
import { X, Sparkles, CheckCircle2, Calendar, Phone, Mail, User, Crown } from "lucide-react";
import { useUIStore } from "@/lib/store/useUIStore";

export function BridalConsultationModal() {
  const { isBridalModalOpen, closeBridalModal } = useUIStore();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    weddingDate: "",
    ceremonyType: "Serg (ሰርግ) - Main Wedding",
    preferredStyle: "Gondar Tilf Imperial Gown",
    guestCount: "",
    notes: "",
  });

  if (!isBridalModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/bridal-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.warn("Consultation request logged:", err);
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-obsidian-900 border border-gold-500/30 rounded-2xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeBridalModal}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-ivory-100 bg-obsidian-850 border border-zinc-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex p-3 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 mb-3">
                <Crown className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-black text-ivory-100 tracking-wide">
                Bridal & Melse Consultation
              </h3>
              <p className="text-xs text-gold-400/90 uppercase tracking-widest mt-1">
                የሰርግ እና መልስ ንጉሣዊ ቀሚስ ማማከር
              </p>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-2 leading-relaxed">
                Schedule a private 1-on-1 bespoke fitting with our master Addis Ababa couture designers. We ship worldwide via DHL.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  Bride&apos;s Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-gold-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bethlehem Tadesse"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-obsidian-950 border border-gold-500/20 rounded-lg pl-9 pr-3 py-2 text-ivory-100 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gold-400" />
                    <input
                      type="tel"
                      required
                      placeholder="0998164025 or +251998164025"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-obsidian-950 border border-gold-500/20 rounded-lg pl-9 pr-3 py-2 text-ivory-100 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gold-400" />
                    <input
                      type="email"
                      required
                      placeholder="getasewshumie@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-obsidian-950 border border-gold-500/20 rounded-lg pl-9 pr-3 py-2 text-ivory-100 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Wedding / Ceremony Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-gold-400" />
                    <input
                      type="date"
                      required
                      value={formData.weddingDate}
                      onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                      className="w-full bg-obsidian-950 border border-gold-500/20 rounded-lg pl-9 pr-3 py-2 text-ivory-100 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Ceremony Type</label>
                  <select
                    value={formData.ceremonyType}
                    onChange={(e) => setFormData({ ...formData, ceremonyType: e.target.value })}
                    className="w-full bg-obsidian-950 border border-gold-500/20 rounded-lg px-3 py-2 text-ivory-100 focus:outline-none focus:border-gold-400"
                  >
                    <option>Serg (ሰርግ) - Main Wedding</option>
                    <option>Melse (መልስ) - Post-Wedding Feast</option>
                    <option>Kelkel (መልመል / ቅልቅል)</option>
                    <option>Shimgelina (ሽምግልና) - Engagement</option>
                    <option>Diaspora Gala / Red Carpet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  Design Aesthetics & Custom Vision
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your theme, color palette (e.g. Gold & Burgundy, Pure Royal Gold, Emerald Tilf), and matching groom/bridesmaid attire..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-obsidian-950 border border-gold-500/20 rounded-lg p-2.5 text-ivory-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 text-obsidian-950 font-serif font-black text-xs uppercase tracking-widest shadow-lg shadow-gold-500/20 hover:brightness-110 transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-obsidian-950" />
                <span>{loading ? "Submitting..." : "Request Private Fitting"}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-ivory-100">
              Consultation Requested!
            </h3>
            <p className="text-xs text-zinc-300 max-w-xs mx-auto leading-relaxed">
              Thank you, <strong className="text-gold-400">{formData.fullName}</strong>. Our senior bridal consultant will contact you via WhatsApp / Phone within 12 hours.
            </p>
            <div className="bg-obsidian-950 p-4 rounded-xl border border-gold-500/20 text-xs text-left space-y-1.5 max-w-sm mx-auto">
              <div className="text-gold-400 font-semibold">VIP Bridal Concierge:</div>
              <div className="text-zinc-400">Addis Ababa Atelier: Bole Medhanialem, Edna Plaza</div>
              <div className="text-zinc-400">
                Direct WhatsApp / Phone:{" "}
                <a
                  href="https://wa.me/251998164025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:text-gold-300 underline underline-offset-2 transition-colors font-medium"
                >
                  +251 99 816 4025 (0998164025)
                </a>
              </div>
              <div className="text-zinc-400">
                Official Email:{" "}
                <a
                  href="mailto:getasewshumie@gmail.com"
                  className="text-gold-400 hover:text-gold-300 underline underline-offset-2 transition-colors font-medium"
                >
                  getasewshumie@gmail.com
                </a>
              </div>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                closeBridalModal();
              }}
              className="px-6 py-2 rounded-lg bg-obsidian-800 border border-gold-500/30 text-xs text-ivory-100 hover:bg-obsidian-700 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
