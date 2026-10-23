import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ProductQuickViewModal } from "@/components/product/ProductQuickViewModal";
import { BridalConsultationModal } from "@/components/modals/BridalConsultationModal";

export const viewport: Viewport = {
  themeColor: "#0f0f11",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Habesha Luxe | Royal Ethiopian Couture & Modern Tibeb Fashion",
  description:
    "Authentic high-end Ethiopian couture, traditional Habesha Kemis, bridal Melse attire, and modern Tibeb fashion with seamless Chapa payment integration (Telebirr & CBE Birr).",
  keywords: [
    "Habesha Kemis",
    "Ethiopian Traditional Clothing",
    "Tibeb Dress",
    "Ethiopian Bridal Couture",
    "Melse Dress",
    "Netela",
    "Gabi",
    "Chapa Payment",
    "Telebirr",
    "CBE Birr",
    "Addis Ababa Fashion",
  ],
  authors: [{ name: "Habesha Luxe Couture" }],
  openGraph: {
    title: "Habesha Luxe | Ethiopian Haute Couture",
    description:
      "Handcrafted Ethiopian couture, regal Kemis, and modern Tibeb with Chapa payment integration.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Habesha Luxe Haute Couture",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-obsidian-950 text-ivory-100 flex flex-col antialiased selection:bg-gold-500 selection:text-obsidian-950">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <ProductQuickViewModal />
        <BridalConsultationModal />
      </body>
    </html>
  );
}
