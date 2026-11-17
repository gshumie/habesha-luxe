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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://atiye-ethiopia.vercel.app")
  ),
  title: "Atiye Ethiopia (አትዬ ኢትዮጵያ) | Royal Ethiopian Couture & Modern Tibeb Fashion",
  description:
    "Atiye Ethiopia (አትዬ ኢትዮጵያ) curates 3,000 years of Ethiopian textile mastery into high-fashion haute couture. Handcrafted in Addis Ababa from organic handspun Shema cotton and 24k gold tilf embroidery. Bespoke Habesha Kemis, royal bridal Melse gowns, and modern Tibeb with seamless Chapa payment integration (Telebirr & CBE Birr).",
  keywords: [
    "Atiye Ethiopia",
    "አትዬ ኢትዮጵያ",
    "Habesha Kemis",
    "Ethiopian Haute Couture",
    "Tibeb Heritage",
    "Royal Leather Craft",
    "Everyday Tibeb",
    "Mekwanint Men Attire",
    "Negestat Royal Bridal",
    "Atiye Signature Couture",
    "Ethiopian Bridal Couture",
    "Melse Dress",
    "Dorze Weaving",
    "Shemane Artisans",
    "Netela",
    "Gabi",
    "Chapa Payment",
    "Telebirr",
    "CBE Birr",
    "Addis Ababa Luxury Fashion",
  ],
  authors: [{ name: "Atiye Ethiopia Couture", url: "mailto:getasewshumie@gmail.com" }],
  creator: "Getasew Shumie",
  publisher: "Atiye Ethiopia (አትዬ ኢትዮጵያ)",
  openGraph: {
    title: "Atiye Ethiopia (አትዬ ኢትዮጵያ) | Royal Ethiopian Haute Couture",
    description:
      "Bespoke Ethiopian traditional attire, imperial Habesha Kemis, and modern runway Tibeb handcrafted from organic Shema cotton with Chapa payment gateway integration.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/hero-bridal.jpg",
        width: 1200,
        height: 630,
        alt: "Atiye Ethiopia Haute Couture",
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
