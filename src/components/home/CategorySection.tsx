'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Category, Product } from '@/lib/api-types';
import { useSettings } from '@/hooks/useSettings';

interface CategorySectionProps {
  category: Category;
  products: Product[];
  index: number;
  siteName?: string;
}

// Category-specific high-resolution fashion banner presets
const CATEGORY_DEFAULT_IMAGES: Record<string, string> = {
  jeans: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=1200',
  denim: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=1200',
  shoes: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200',
  sneakers: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200',
  't-shirt': 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1200',
  trouser: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=1200',
  formal: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=1200',
  twill: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&q=80&w=1200',
};

const CATEGORY_TAGLINES: Record<string, string> = {
  jeans: 'Authentic Raw Denim • Engineered for Durability',
  shoes: 'Streetwear Footwear • Built for All-Day Motion',
  't-shirt': 'Heavyweight Cotton • Streetwear Essentials',
  trouser: 'Tailored Cuts • Modern Minimalist Silhouettes',
  formal: 'Tailored Cuts • Modern Minimalist Silhouettes',
  twill: 'Premium Chino & Twill • Clean Contemporary Fit',
};

export function CategorySection({
  category,
  products,
  index,
  siteName: propSiteName,
}: CategorySectionProps) {
  const { siteName: hookSiteName } = useSettings();
  const siteName = propSiteName || hookSiteName;
  const slugKey = category.slug.toLowerCase().trim();
  const bannerImage =
    category.image ||
    CATEGORY_DEFAULT_IMAGES[slugKey] ||
    'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=1200';

  const tagline =
    CATEGORY_TAGLINES[slugKey] ||
    `${category.name} Collection • Premium Quality Craftsmanship`;

  // Strictly display only this category's products (up to 7 items + 1 "VIEW MORE" card)
  const displayProducts = products || [];
  const cards = displayProducts.slice(0, 7);
  const totalCount = products.length;

  return (
    <section className="container mx-auto px-4 my-10 md:my-14">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-black/15 pb-3 mb-6">
        <div className="flex items-baseline gap-2.5">
          <h2 className="text-xl sm:text-2xl font-black uppercase italic tracking-tight text-black">
            {category.name}
          </h2>
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
            // Collection {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <Link
          href={`/shop?category=${encodeURIComponent(category.slug)}`}
          className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-black hover:underline"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main 33% / 67% Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
        {/* 1. Large Promotional Banner — Left Side (approx 33% width / 4 cols) */}
        <div className="lg:col-span-4 h-full">
          <Link
            href={`/shop?category=${encodeURIComponent(category.slug)}`}
            className="group relative flex flex-col justify-between h-full min-h-[460px] lg:min-h-0 w-full border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-black"
          >
            {/* Full-bleed promotional image with object-fit: cover */}
            <Image
              src={bannerImage}
              alt={category.name}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            />

            {/* Dark multi-layer gradient overlay for high contrast typography */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

            {/* Top Campaign Typography & Badge */}
            <div className="relative z-10 p-5 sm:p-7 space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-amber-400 text-black px-2.5 py-1 text-[9px] font-black uppercase tracking-widest border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Sparkles className="w-3 h-3" />
                {category.name.toUpperCase()} COLLECTION
              </div>
              <p className="text-[9px] font-mono font-bold tracking-[0.25em] text-neutral-300 uppercase">
                {siteName.toUpperCase()} // ARCHIVE {String(index + 1).padStart(2, '0')}
              </p>
            </div>

            {/* Bottom Category Title & Campaign Call-To-Action */}
            <div className="relative z-10 p-5 sm:p-7 space-y-3 mt-auto">
              <p className="text-xs font-black uppercase tracking-wider text-amber-300 drop-shadow leading-tight">
                {tagline}
              </p>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase italic tracking-tighter leading-none text-white drop-shadow-md">
                {category.name}
              </h3>

              <div className="pt-2">
                <span className="inline-flex items-center gap-2 bg-white text-black px-4 py-2.5 text-xs font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-amber-400 group-hover:translate-x-1 transition-all">
                  EXPLORE {category.name.toUpperCase()}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* 2. Product Grid — Right Side (approx 67% width / 8 cols) */}
        <div className="lg:col-span-8">
          {/* 4 columns and 2 rows = exactly 8 cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 h-full">
            {cards.map((product) => {
              const hasDiscount = Boolean(
                product.discountedPrice &&
                  product.discountedPrice > 0 &&
                  product.discountedPrice < product.price
              );
              const displayPrice = hasDiscount ? product.discountedPrice! : product.price;
              const originalPrice = hasDiscount
                ? product.price
                : product.comparePrice && product.comparePrice > product.price
                ? product.comparePrice
                : null;

              let discountBadge = '';
              if (product.discountPercentage && product.discountPercentage > 0) {
                discountBadge = `-${product.discountPercentage}%`;
              } else if (product.discountAmount && product.discountAmount > 0) {
                discountBadge = `-৳${product.discountAmount}`;
              }

              const primaryImage = product.images?.[0] || '/images/placeholder.jpg';

              return (
                <Link
                  key={product._id}
                  href={`/product/${product.slug}`}
                  className="group flex flex-col justify-between h-full bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all overflow-hidden"
                >
                  {/* Large Product Image relative to card, minimal whitespace */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 border-b border-black/15">
                    {product.images?.length > 0 ? (
                      <Image
                        src={primaryImage}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] font-bold text-neutral-400 uppercase">
                        No Image
                      </div>
                    )}

                    {/* Discount Badge */}
                    {hasDiscount && discountBadge && (
                      <div className="absolute top-0 left-0 z-10">
                        <span className="bg-amber-400 text-black text-[9px] font-black px-2 py-0.5 uppercase tracking-wider block border-b-2 border-r-2 border-black">
                          {discountBadge}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Compact Product Details */}
                  <div className="p-2 sm:p-2.5 bg-white">
                    <p className="mb-0.5 text-[8px] font-black text-neutral-400 uppercase tracking-widest truncate">
                      {product.category}
                    </p>
                    <h4 className="font-black text-black uppercase text-[11px] sm:text-xs tracking-tight line-clamp-1 mb-1 group-hover:underline">
                      {product.name}
                    </h4>

                    {/* Prices: Current Selling Price + Original Price */}
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span
                        className={`text-xs sm:text-sm font-black ${
                          hasDiscount ? 'text-amber-600' : 'text-black'
                        }`}
                      >
                        {formatPrice(displayPrice)}
                      </span>
                      {originalPrice && (
                        <span className="text-[10px] text-neutral-400 line-through font-bold">
                          {formatPrice(originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* 8th Slot: "VIEW MORE" Overlay Card (2nd row, 4th column) */}
            <Link
              href={`/shop?category=${encodeURIComponent(category.slug)}`}
              className="group relative flex flex-col justify-between p-4 sm:p-5 bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-900 transition-all overflow-hidden h-full min-h-[190px]"
            >
              {/* Subtle background stencil watermark */}
              <div className="absolute -right-3 -bottom-4 text-neutral-800 opacity-40 select-none pointer-events-none text-6xl font-black italic uppercase leading-none">
                +MORE
              </div>

              {/* Card Top */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-400">
                  CATEGORY ARCHIVE
                </span>
                <div className="w-7 h-7 border-2 border-white flex items-center justify-center bg-white text-black group-hover:bg-amber-400 group-hover:border-amber-400 transition-colors">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Card Bottom: "VIEW MORE" Callout */}
              <div className="relative z-10 mt-auto pt-4">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                  {totalCount > 7 ? `+${totalCount - 7} More In Registry` : 'Complete Collection'}
                </p>
                <h4 className="text-xl sm:text-2xl font-black uppercase italic tracking-tighter leading-none text-white group-hover:text-amber-400 transition-colors">
                  VIEW MORE →
                </h4>
                <span className="text-[9px] font-black uppercase tracking-widest text-neutral-300 block mt-2 underline underline-offset-2">
                  BROWSE ALL {category.name.toUpperCase()}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
