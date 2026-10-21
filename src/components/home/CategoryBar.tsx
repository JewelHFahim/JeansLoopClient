'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import type { Category } from '@/lib/api-types';

interface CategoryBarProps {
  categories?: Category[] | { data?: Category[] };
  isLoading?: boolean;
  className?: string;
}

// Curated high-resolution fashion fallbacks for menswear & denim
function getCategoryFallback(name: string = ''): string {
  const lower = name.toLowerCase();
  if (lower.includes('jean') || lower.includes('denim')) {
    return 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=300&auto=format&fit=crop';
  }
  if (lower.includes('twill') || lower.includes('chino')) {
    return 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=300&auto=format&fit=crop';
  }
  if (lower.includes('trouser') || lower.includes('pant') || lower.includes('formal')) {
    return 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=300&auto=format&fit=crop';
  }
  if (lower.includes('shirt') || lower.includes('polo')) {
    return 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=300&auto=format&fit=crop';
  }
  if (lower.includes('jacket') || lower.includes('outerwear') || lower.includes('blazer')) {
    return 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=300&auto=format&fit=crop';
  }
  return 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=300&auto=format&fit=crop';
}

const ALL_PRODUCTS_IMAGE = 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=300&auto=format&fit=crop';

export function CategoryBar({ categories, isLoading = false, className = '' }: CategoryBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Normalize categories whether array or nested response object
  const rawList: Category[] = Array.isArray(categories)
    ? categories
    : Array.isArray((categories as any)?.data)
      ? (categories as any).data
      : [];

  const categoryList = rawList;

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [categoryList]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -280 : 280;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Skeleton state
  if (isLoading) {
    return (
      <div className={`container bg-red-500 mx-auto px-4 relative z-30 -mt-6 sm:-mt-8 md:-mt-10 mb-8 md:mb-12 ${className}`}>
        <div className="max-w-4xl mx-auto bg-white/65 backdrop-blur-2xl border border-white/60 rounded-3xl p-3 sm:p-4 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.7)] ring-1 ring-black/5">
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 overflow-hidden py-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2.5 shrink-0 animate-pulse">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] rounded-2xl bg-gray-200/70" />
                <div className="h-3 w-12 sm:w-14 bg-gray-200/70 rounded-md" />
                <div className="h-2 w-8 bg-gray-100/70 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (categoryList.length === 0) return null;

  return (
    <div className={`container mx-auto px-4 relative z-30 -mt-6 sm:-mt-8 md:-mt-10 mb-8 md:mb-12 ${className}`}>
      <div className="relative max-w-4xl mx-auto">
        {/* Floating Capsule Container with Frosted Glass Effect */}
        <div className="relative bg-transparent backdrop-blur-md border border-white/60 rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 md:p-4 shad ow-[0_16px_45px_-12px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.8)] ring-1 ring-black/5 transition-all duration-300">
          
          {/* Subtle Desktop Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => handleScroll('left')}
              className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/85 backdrop-blur-md shadow-md border border-white/60 items-center justify-center text-gray-700 hover:text-black hover:bg-white hover:scale-105 active:scale-95 transition-all"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Subtle Desktop Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => handleScroll('right')}
              className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/85 backdrop-blur-md shadow-md border border-white/60 items-center justify-center text-gray-700 hover:text-black hover:bg-white hover:scale-105 active:scale-95 transition-all"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* Scrollable Container with Hidden Scrollbar */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="bg-transparent flex items-center gap-3 sm:gap-5 md:gap-8 overflow-x-auto scroll-smooth py-1 px-1 sm:px-2 [&::-webkit-scrollbar]:hidden justify-start sm:justify-center"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* 1. All Products Entry */}
            <Link
              href="/shop"
              className="group flex flex-col items-center gap-1.5 sm:gap-2 shrink-0 select-none cursor-pointer"
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] rounded-2xl p-[3px] bg-white/70 backdrop-blur-sm shadow-xs border border-white/80 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-md group-hover:border-black/30 group-hover:ring-2 group-hover:ring-black/10 overflow-hidden">
                <div className="w-full h-full rounded-xl overflow-hidden relative bg-black">
                  <img
                    src={ALL_PRODUCTS_IMAGE}
                    alt="All Products"
                    className="w-full h-full object-cover opacity-75 transition-transform duration-700 ease-out group-hover:scale-115 group-hover:opacity-60"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-amber-300 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-neutral-800 group-hover:text-black transition-colors text-center whitespace-nowrap">
                  All Items
                </span>
                <span className="text-[9px] font-bold tracking-widest text-neutral-500 uppercase group-hover:text-black transition-colors hidden sm:block">
                  Shop All
                </span>
              </div>
            </Link>

            {/* Subtle Glass Divider */}
            <div className="h-10 w-px bg-neutral-300/60 shrink-0 hidden sm:block" />

            {/* Dynamic Category Items */}
            {categoryList.map((c) => {
              const fallback = getCategoryFallback(c.name);
              const imageUrl = c.image && c.image.trim() !== '' ? c.image : fallback;
              const targetSlug = c.slug || c.name.toLowerCase();

              return (
                <Link
                  key={c._id || c.name}
                  href={`/shop?category=${encodeURIComponent(targetSlug)}`}
                  className="group flex flex-col items-center gap-1.5 sm:gap-2 shrink-0 select-none cursor-pointer"
                >
                  {/* Squircle Glass Thumbnail Badge */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] rounded-2xl p-[3px] bg-white/70 backdrop-blur-sm shadow-xs border border-white/80 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-md group-hover:border-black/30 group-hover:ring-2 group-hover:ring-black/10 overflow-hidden">
                    <div className="w-full h-full rounded-xl overflow-hidden relative bg-gray-100">
                      <img
                        src={imageUrl}
                        alt={c.name}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== fallback) {
                            target.src = fallback;
                          }
                        }}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-115"
                      />
                      {/* Gradient overlay for contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Category Title & Micro Tag */}
                  <div className="flex flex-col items-center max-w-[80px] sm:max-w-[96px]">
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-800 group-hover:text-black transition-colors text-center truncate w-full">
                      {c.name}
                    </span>
                    <span className="text-[9px] font-semibold tracking-wider text-neutral-600 group-hover:text-black uppercase transition-colors hidden sm:flex items-center gap-0.5">
                      View <ArrowRight className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
