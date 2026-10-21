# JeansLoop Customer Storefront

Modern, ultra-fast customer-facing e-commerce storefront for JeansLoop built with Next.js 15 App Router, React 18, and Tailwind CSS.

## Features & Improvements
- **Server Component First**: Pre-fetches hero banners, featured collections, and promotional tiers with zero client bundle bloat and automatic fallback on network errors.
- **Dynamic SEO & Metadata**: Dynamically generated OpenGraph and Twitter tags via `generateMetadata`, automatic `sitemap.xml`, and `robots.txt`.
- **Atomic Multi-Attribute Cart**: Local storage cart powered by Zustand with multi-attribute keys (`${productId}-${size}-${color}`) preventing duplicate item collisions.
- **Modular Checkout**: Split into clean single-responsibility subcomponents (`ShippingForm`, `PaymentSelector`, `OrderSummary`) with real-time city-based shipping estimation.
- **Search & Filter with Debounce**: Instant catalog filtering by keyword, price range, stock status, category, and sorting without jitter.
- **Clean Responsive UI**: Mobile-friendly navigation, category bar, slide-out drawer, and Sonner notifications.
- **Brand Consistency**: Fully decoupled from legacy branding; uses dynamic store settings and fallbacks.

---

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Library**: React 18
- **State Management**: Zustand 5 (persistent cart & auth)
- **Styling**: Tailwind CSS + `clsx` + `tailwind-merge`
- **Data Fetching**: Axios API client + TanStack Query 5
- **Carousels**: Embla Carousel React + Autoplay
- **Icons**: Lucide React
- **Notifications**: Sonner

---

## Directory Structure
```
src/
├── app/
│   ├── (auth)/             # Login & Registration pages
│   ├── account/            # Customer profile, orders modal, security
│   ├── cart/               # Cart page with live total calculations
│   ├── checkout/           # Modular multi-step checkout workflow
│   ├── order-success/      # Order receipt confirmation page
│   ├── product/[slug]/     # Server-rendered product detail page with rich specs
│   ├── shop/               # Filterable product catalog with pagination
│   ├── layout.tsx          # Root layout with Navbar and Footer
│   ├── page.tsx            # High-performance SSR Homepage
│   ├── robots.ts           # Dynamic SEO robots directives
│   └── sitemap.ts          # Automated sitemap generation
├── components/
│   ├── home/               # HeroSlider, CategoryBar, DiscountSection, etc.
│   ├── layout/             # Header Navbar, Footer, Mobile Navigation
│   ├── product/            # ProductCard, Badges
│   └── ui/                 # Accessible button, input, label, card, loader
├── lib/                    # API client with token interceptors, helpers, types
└── store/                  # Cart and Auth Zustand stores
```

---

## Setup & Running

### 1. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Development & Build
```bash
# Run in development mode on port 3000
npm run dev

# Type check
npm run typecheck

# Build for production
npm run build

# Start production server
npm start
```

---

## Docker Support
```bash
docker build -t jeansloop-storefront .
docker run -p 3000:3000 --env-file .env.local jeansloop-storefront
```
