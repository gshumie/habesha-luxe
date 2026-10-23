# Habesha Luxe (ሀበሻ ሉክስ)
### High-End Ethiopian Couture & Authentic Apparel Platform with Chapa Payment Integration

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Chapa](https://img.shields.io/badge/Payment-Chapa_API_v1-00875A?style=for-the-badge)](https://chapa.co)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**Habesha Luxe** is a production-ready, fully responsive e-commerce web platform for authentic Ethiopian traditional and modern clothing (Habesha Kemis, Modern Tibeb fashion, Men's Imperial linen attire, and handspun Netela accessories) integrated directly with Ethiopia's leading payment gateway, **Chapa** (supporting **Telebirr**, **CBE Birr**, **Awash Birr**, and **Visa / Mastercard**).

### 📞 Official Store Contact Information
- **Store Email**: [getasewshumie@gmail.com](mailto:getasewshumie@gmail.com)
- **Store Phone**: `0998164025` / `+251998164025`
- **Atelier Location**: Bole Medhanialem, Edna Plaza, 4th Floor, Addis Ababa, Ethiopia
- **GitHub Repository**: [https://github.com/gshumie/habesha-luxe.git](https://github.com/gshumie/habesha-luxe.git)

---

## 🌟 Brand & Visual Architecture

- **Brand Aesthetic**: High-End Ethiopian Couture, Traditional Kemis, Wedding & Melse Attire, and Modern Runway Tibeb.
- **Color Palette**:
  - **Luxury Dark Slate & Obsidian**: `#0f0f11`, `#161619`, `#1f1f24`
  - **Warm Ethiopian Gold & Brass**: `#c59b27`, `#e5b842`, `#d4af37`
  - **Crisp Off-White / Ivory Typography**: `#faf9f6`, `#f4f2ea`
  - **Accents**: Deep Emerald Glow (`#0f2e22`) and Imperial Crimson (`#381116`)
- **Typography**:
  - Serif Headers: **Cinzel** & **Playfair Display**
  - Sans-Serif Body: **Plus Jakarta Sans** & **Inter**
- **Cultural Design Motifs**:
  - Handcrafted SVG **Tibeb Borders** & **Meskel Cross** patterns
  - Imperial Seal of Ethiopia badge
  - Dual English & Amharic script typography (e.g. `እቴጌ መነን የንጉሥ ጥበብ ቀሚስ`)

---

## 💎 Core Features & Architecture

### 1. High-Impact Hero & Dynamic Catalog
- **Hero Showcase**: Luxury imagery, stats counter (100% Handspun Shema, 160+ hours per gown, Chapa verified).
- **Dynamic Category Filtering**:
  1. *All Collections*
  2. *Couples & Bridal (የጥንዶች እና የሰርግ)*
  3. *Traditional Kemis (ሀበሻ ቀሚስ)*
  4. *Modern Tibeb & Ready-to-Wear (ዘመናዊ ጥበብ)*
  5. *Men's Traditional Attire (የወንዶች ባህላዊ ልብስ)*
  6. *Handwoven Netela & Accessories (ነጠላ እና መለዋወጫዎች)*
- **Instant Search & Multi-Sort**: Search by item name, origin (Dorze, Gondar, Shiro Meda), or Amharic title; sort by Price (Low to High, High to Low), Rating, or Newest.
- **Pre-populated Authentic Catalog (Wedding Season Edition - Up to 55% OFF)**:
  - **Royal Purple & Gold Star Tilf Habesha Kemis** (24,500 ETB - 50% Off Best Seller)
  - **Alluring Crimson & Gold Couples Matching Cultural Attire** (34,800 ETB - 35% Off Wedding Collection)
  - **Modern Chic White Habesha Tunic with Yellow-Gold Embroidery** (14,000 ETB - 55% Off Trending)
  - **Imperial Royal Sheba Bridal Gala Kemis** (42,000 ETB - Haute Couture Bespoke)
  - Queen Menen Imperial Tibeb Kemis (18,500 ETB)
  - Gondar Heritage Tilf Wedding Kemis (22,000 ETB)
  - Classic Hand-Embroidered Bridal Kemis (26,500 ETB)
  - Modern Cut-Out Tibeb Dress (9,800 ETB)
  - Oromo Heritage Traditional Dress & Saddeeta (16,000 ETB)
  - Men's Imperial Linen Shirt & Gabi (8,900 ETB)
  - Handspun Pure Cotton Netela & Shawl (3,400 ETB)
  - Ethiopian Highland Calfskin Handbag (7,500 ETB)

### 2. Product Quick View & Made-to-Measure Custom Tailoring
- Interactive gallery modal with size selector (`S`, `M`, `L`, `XL`, `Custom Measurement`).
- **Bespoke Measurement Form**: Captures Bust (ደረት), Waist (ወገብ), Hips (ዳሌ), Shoulder to Floor (ርዝመት), and fitting notes for custom Addis Ababa tailoring.
- Detailed fabric composition and heritage Shemane weaving story.

### 3. Slide-Over Shopping Bag Drawer
- Live quantity adjuster (`+` / `-`) and instant item removal.
- Real-time subtotal, delivery calculation, and grand total.
- **Delivery Zone Switcher**:
  - *Addis Ababa Doorstep Courier*: **FREE** (1–2 days)
  - *Ethiopian Regional Express*: **450 ETB** (2–4 days)
  - *Global Diaspora Priority (DHL Express)*: **3,500 ETB** (4–7 days)
- Live currency estimate toggle: **ETB (Primary)** vs **USD ($)**.
- Persistent state using `localStorage` via Zustand.

### 4. Production Chapa Payment Gateway Flow
1. **Checkout Form**:
   - Captures customer name, phone number, email, delivery zone, Addis Ababa sub-city dropdown (Bole, Kazanchis, Yeka, Sarbet, Old Airport, etc.), and house/landmark number.
2. **Payment Initialization (Server-Side)**:
   - Routes: `POST /api/payment/chapa/initialize` and `POST /api/payment/initialize`
   - Invokes: `POST https://api.chapa.co/v1/transaction/initialize`
   - Authorization: `Bearer CHAPA_SECRET_KEY`
   - Passes exact parameters: `amount`, `currency: "ETB"`, `tx_ref`, `callback_url`, `return_url`, and custom metadata.
3. **Chapa Checkout & Embedded Sandbox Simulator**:
   - If a live key is present, redirects to Chapa's hosted checkout.
   - For local QA or test keys, seamlessly routes through the integrated **Chapa Sandbox Gateway** (`/checkout/simulate-chapa`) allowing one-click authorization via Telebirr, CBE Birr, Awash Birr, or Card.
4. **Transaction Verification**:
   - Routes: `GET /api/payment/chapa/verify?tx_ref=...` and `GET /api/payment/verify?tx_ref=...` (also supports route parameter `/api/payment/chapa/verify/{tx_ref}`)
   - Invokes: `GET https://api.chapa.co/v1/transaction/verify/{tx_ref}`
   - Confirms transaction validity, extracts Chapa transaction ID, payment method, and marks order as `paid`.
5. **Printable Official Tax Invoice / Receipt**:
   - Route: `/checkout/success?tx_ref=...`
   - Displays verified Chapa Transaction reference, ERCA TIN Number (`0048192841`), itemized breakdown, customer delivery address, and estimated timeline.
   - Includes one-click **Print Tax Invoice** button with print CSS formatting.
6. **Asynchronous Webhooks**:
   - Route: `POST /api/payment/webhook`
   - Processes asynchronous payment notifications and updates orders.

### 5. Admin Order & Dispatch Management Dashboard
- Route: `/admin` & `/admin/login`
- **Secure Email & Password Authentication**:
  - Official Administrator Email: `getasewshumie@gmail.com`
  - Default Production Fallback Password: `SetYourStrongPassword2025!` (customizable via `ADMIN_PASSWORD` env variable)
  - Password input with show/hide toggle, Remember Me (30 days), and HMAC-SHA256 encrypted session cookies.
  - Auto-redirect protection: unauthenticated users are redirected to `/admin/login`.
- Live KPIs: Total Chapa Revenue in ETB, Total Orders, Paid vs. Pending orders.
- Search & filter by customer, phone, or `tx_ref`.
- Live status updater: `Processing`, `Tailoring`, `Out for Delivery`, `Delivered`, `Cancelled`.
- Order modal with customer phone link, delivery notes, and direct link to printable tax invoice.
- One-click Sign Out button with session revocation.

### 6. Private Bridal & Melse Concierge
- Route: `/api/bridal-consultation` & interactive modal
- Custom consultation booking for Ethiopian brides planning Serg, Melse, Kelkel, or diaspora ceremonies.

---

## 📁 Repository Structure

```
habesha-luxe/
├── .data/
│   └── orders.json                    # Persistent order database
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── page.tsx               # Store admin dashboard
│   │   ├── api/
│   │   │   ├── admin/orders/          # Admin orders GET & PATCH
│   │   │   ├── bridal-consultation/   # Bridal fitting booking API
│   │   │   └── payment/
│   │   │       ├── initialize/        # Chapa transaction initialize
│   │   │       ├── verify/            # Chapa transaction verify
│   │   │       └── webhook/           # Chapa webhook listener
│   │   ├── checkout/
│   │   │   ├── page.tsx               # Checkout form & payment summary
│   │   │   ├── simulate-chapa/        # Embedded Chapa sandbox simulator
│   │   │   └── success/               # Verified official tax receipt & invoice
│   │   ├── globals.css                # Luxury dark styling & print CSS
│   │   ├── layout.tsx                 # Root layout & font declarations
│   │   └── page.tsx                   # Storefront landing page
│   ├── components/
│   │   ├── cart/
│   │   │   └── CartDrawer.tsx         # Slide-over shopping cart drawer
│   │   ├── checkout/
│   │   │   └── PaymentBadgeList.tsx   # Telebirr, CBE, Awash, Chapa badges
│   │   ├── home/
│   │   │   ├── BridalBanner.tsx       # Melse/Serg consultation CTA
│   │   │   ├── CategoryFilter.tsx     # Filter pills & search toolbar
│   │   │   ├── HeroSection.tsx        # High-impact luxury hero
│   │   │   ├── ProductCard.tsx        # Product card with hover actions
│   │   │   ├── ShemaneHeritage.tsx    # Artisan weaving story
│   │   │   └── Testimonials.tsx       # Local & diaspora reviews
│   │   ├── layout/
│   │   │   ├── Footer.tsx             # Couture footer & newsletter
│   │   │   └── Navbar.tsx             # Luxury sticky header & currency switcher
│   │   ├── modals/
│   │   │   └── BridalConsultationModal.tsx # Bridal booking modal
│   │   ├── product/
│   │   │   └── ProductQuickViewModal.tsx   # Quick view & custom measurements
│   │   └── ui/
│   │       └── EthiopianPattern.tsx   # SVG Tibeb motifs & imperial seal
│   ├── lib/
│   │   ├── chapa.ts                   # Chapa API integration client
│   │   ├── data/
│   │   │   ├── delivery.ts            # Sub-cities & shipping zones
│   │   │   └── products.ts            # 9 authentic luxury Ethiopian products
│   │   ├── storage/
│   │   │   └── orders.ts              # Persistent file-based order store
│   │   ├── store/
│   │   │   ├── useCartStore.ts        # Zustand cart store with localStorage
│   │   │   └── useUIStore.ts          # Zustand UI state
│   │   └── utils.ts                   # ETB formatting & tx_ref generator
│   └── types/
│       ├── cart.ts                    # Cart types
│       ├── order.ts                   # Chapa & order interfaces
│       └── product.ts                 # Product & measurement interfaces
├── .env.example                       # Environment template
├── .env.local                         # Local environment settings
├── next.config.mjs                    # Next.js configuration
├── package.json                       # Dependencies & scripts
├── tailwind.config.ts                 # Custom Ethiopian gold palette
└── tsconfig.json                      # TypeScript configuration
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.17+ or v20+ (Tested on v24.21.0)
- **npm** or **pnpm** or **yarn**

### 1. Clone & Install
```bash
git clone <repository-url>
cd "habesha luxe"
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your keys in `.env.local`:
```env
# Chapa API Credentials (https://dashboard.chapa.co)
CHAPA_SECRET_KEY=CHASECK_TEST-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CHAPA_PUBLIC_KEY=CHAPUBK_TEST-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_CHAPA_PUBLIC_KEY=CHAPUBK_TEST-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CHAPA_WEBHOOK_SECRET=your_chapa_webhook_secret

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Secure Admin Portal Credentials
ADMIN_EMAIL=getasewshumie@gmail.com
ADMIN_PASSWORD=SetYourStrongPassword2025!
ADMIN_JWT_SECRET=habesha_luxe_secret_secure_key_2025

# Legacy Passcode (fallback)
ADMIN_SECRET_KEY=habesha-luxe-admin-2025

# Simulation Mode (fallback for offline or test demo)
NEXT_PUBLIC_ENABLE_SIMULATED_PAYMENT=true
```

> **Note on Testing**: If you leave the default keys as `CHASECK_TEST-...` or if Chapa test credentials are unverified, Habesha Luxe will automatically activate the **Chapa Sandbox Gateway** (`/checkout/simulate-chapa`), enabling complete end-to-end checkout, Telebirr authorization, and verified invoice generation without requiring a bank account! When a valid live key is added, it connects to `https://api.chapa.co/v1` automatically.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 💳 Testing the Chapa Payment Flow

1. Browse the collection on the home page and click **Quick View** on any Kemis (e.g. *Queen Menen Imperial Tibeb Kemis*).
2. Choose a size or select **Custom Measurement** to enter bespoke Bust, Waist, and Length dimensions.
3. Click **Add to Bag** &rarr; open the **Slide-over Shopping Cart**.
4. Review delivery rates (complimentary for Addis Ababa) and click **Proceed to Chapa Checkout**.
5. Fill out the Ethiopian delivery form (Select sub-city such as *Bole*, *Kazanchis*, or *Yeka*).
6. Click **Pay with Chapa**:
   - With real keys: Redirects to `https://checkout.chapa.co/...`
   - With test/demo configuration: Seamlessly redirects to `/checkout/simulate-chapa`
7. Click **Authorize Payment** with Telebirr or CBE Birr.
8. You will be redirected back to the verified **Official Tax Invoice / Receipt** (`/checkout/success?tx_ref=...`).
9. Click **Print Tax Invoice** to preview or save the document as PDF.
10. Head to `/admin` (Passcode: `habesha-luxe-admin-2025`) to inspect the newly recorded order and update dispatch status to `Tailoring` or `Out for Delivery`.

---

## 🌐 Production Deployment

### Option A: Deploy to Vercel (Recommended)
1. Push your repository to GitHub or GitLab.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. In **Environment Variables**, add:
   - `CHAPA_SECRET_KEY` = your live Chapa Secret Key
   - `CHAPA_PUBLIC_KEY` = your live Chapa Public Key
   - `NEXT_PUBLIC_BASE_URL` = `https://your-domain.vercel.app`
   - `ADMIN_SECRET_KEY` = strong custom passphrase
4. Click **Deploy**. Vercel will automatically build the Next.js App Router project.
5. In your [Chapa Dashboard](https://dashboard.chapa.co), set your Webhook URL to:
   `https://your-domain.vercel.app/api/payment/webhook`

### Option B: Deploy to VPS / Docker / Ubuntu Server
Using PM2:
```bash
npm run build
pm2 start npm --name "habesha-luxe" -- start
pm2 save
```
Configure Nginx as a reverse proxy pointing to `http://127.0.0.1:3000` with SSL via Let's Encrypt Certbot.

---

## 🛡️ Security & Compliance
- **PCI-DSS Compliance**: Sensitive card details are processed directly through Chapa's encrypted tokenization.
- **Server-Side API Secrets**: Secret keys (`CHAPA_SECRET_KEY`) never touch client-side bundles.
- **Idempotency**: Transaction references (`txRef`) are generated using high-entropy unique identifiers to prevent duplicate billing.
- **Admin Authentication**: Store management portal protected with session-based passphrase checks.

---

## 🇪🇹 Cultural Stewardship
Habesha Luxe is dedicated to preserving indigenous Ethiopian handloom heritage. A percentage of all proceeds goes toward the **Chencha & Shiro Meda Master Shemane Apprenticeship Program**, training the next generation of Ethiopian weavers.
