"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Crown, Mail, Phone, MapPin, CheckCircle2, ShieldCheck } from "lucide-react";
import { PaymentBadgeList } from "../checkout/PaymentBadgeList";
import { TibebBorder } from "../ui/EthiopianPattern";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-obsidian-950 border-t border-gold-500/20 text-zinc-400 text-xs">
      {/* Decorative Golden Pattern Ribbon */}
      <TibebBorder className="border-b border-gold-500/15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-serif font-black tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-ivory-100 via-gold-300 to-gold-500">
                HABESHA LUXE
              </span>
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold-400 font-medium mt-0.5">
                የኢትዮጵያ ንጉሣዊ ልብስ • Haute Couture
              </div>
            </Link>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Curating 3,000 years of Ethiopian textile mastery into high-fashion couture. 
              Handcrafted in Addis Ababa with pure organic Shema cotton and regal gold tilf embroidery. 
              Integrated with Chapa payment gateway for effortless local & international checkout.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>Bole Medhanialem, Edna Plaza, 4th Floor, Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center space-x-2 text-zinc-300">
                <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <a href="tel:+251998164025" className="hover:text-gold-400 transition-colors">
                  0998164025 (+251998164025)
                </a>
              </div>
              <div className="flex items-center space-x-2 text-zinc-300">
                <Mail className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <a href="mailto:getasewshumie@gmail.com" className="hover:text-gold-400 transition-colors">
                  getasewshumie@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-ivory-100 uppercase tracking-wider">
              Haute Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors">
                  Traditional Kemis (የባህል ቀሚስ)
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors">
                  Modern Tibeb & Evening Gowns
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors">
                  Men&apos;s Attire & Imperial Gabi
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors">
                  Handspun Netela & Shawls
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors">
                  Highland Calfskin Bags
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gold-400 hover:underline">
                  Admin Order Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Bridal & Service */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-ivory-100 uppercase tracking-wider">
              Services & Craft
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-ivory-200">Bridal Melse Concierge</span>
              </li>
              <li>
                <span className="text-ivory-200">Bespoke Custom Measurements</span>
              </li>
              <li>
                <span className="text-ivory-200">Dorze Weaver Cooperative</span>
              </li>
              <li>
                <span className="text-ivory-200">Complimentary Addis Delivery</span>
              </li>
              <li>
                <span className="text-ivory-200">DHL Global Diaspora Priority</span>
              </li>
              <li>
                <span className="text-ivory-200">Chapa Merchant Verification</span>
              </li>
            </ul>
          </div>

          {/* Newsletter & Club */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-ivory-100 uppercase tracking-wider">
              The Imperial Gazette
            </h4>
            <p className="text-xs text-zinc-400">
              Receive private bridal lookbooks, runway debuts, and exclusive couture releases.
            </p>

            {subscribed ? (
              <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-lg text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You are subscribed to the Imperial Circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-obsidian-900 border border-gold-500/30 rounded-lg px-3 py-2 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-lg bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Join Circle
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Payment Gateways Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Chapa Certified Ethiopian Payment Gateway:</span>
            </div>
            <PaymentBadgeList compact />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-zinc-500 text-[11px] pt-4">
            <div>
              &copy; {new Date().getFullYear()} Habesha Luxe Couture Inc. All rights reserved.
            </div>
            <div className="flex space-x-4 mt-2 sm:mt-0">
              <span className="hover:text-zinc-300 cursor-pointer">Privacy Charter</span>
              <span>•</span>
              <span className="hover:text-zinc-300 cursor-pointer">Terms of Couture</span>
              <span>•</span>
              <span className="hover:text-zinc-300 cursor-pointer">Chapa Security Verification</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
