'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { Slider } from '@/lib/api-types';

const defaultSlides: Slider[] = [
  {
    _id: 'default-1',
    title: 'Elevate Your Everyday',
    subtitle: 'Premium menswear designed for the modern gentleman. Discover quality craftsmanship and contemporary style.',
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1920&auto=format&fit=crop',
    primaryCta: { text: 'Browse Denim', href: '/shop?category=jeans' },
    secondaryCta: { text: 'All Collections', href: '/shop' },
    order: 1,
    isActive: true,
  },
  {
    _id: 'default-2',
    title: 'Precision Tailoring',
    subtitle: 'Sharp silhouettes and premium fabrics designed for professionals who demand excellence in every detail.',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1920&auto=format&fit=crop',
    primaryCta: { text: 'Explore Trousers', href: '/shop?category=trouser' },
    secondaryCta: { text: 'View Catalog', href: '/shop' },
    order: 2,
    isActive: true,
  },
];

interface HeroSliderProps {
  initialSliders?: Slider[];
}

export function HeroSlider({ initialSliders = [] }: HeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const slides = initialSliders.length > 0 ? initialSliders : defaultSlides;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="relative overflow-hidden bg-black text-white">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={slide._id || index} className="relative min-w-full flex-[0_0_100%] h-[500px] md:h-[650px]">
              {/* Background image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover opacity-60"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Slide Content */}
              <div className="relative container mx-auto h-full px-6 flex flex-col justify-end pb-16 md:pb-24 max-w-4xl">
                <div className="inline-block bg-white text-black text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1 mb-4 w-fit">
                  New Season Arrival
                </div>
                <h1 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-4 drop-shadow-md">
                  {slide.title}
                </h1>
                {slide.subtitle && (
                  <p className="text-xs md:text-sm font-medium text-neutral-300 max-w-xl mb-8 leading-relaxed">
                    {slide.subtitle}
                  </p>
                )}

                <div className="flex flex-wrap gap-4">
                  {slide.primaryCta && (
                    <Link href={slide.primaryCta.href}>
                      <Button className="h-12 px-8 bg-white text-black hover:bg-neutral-200">
                        {slide.primaryCta.text} <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  {slide.secondaryCta && (
                    <Link href={slide.secondaryCta.href}>
                      <Button variant="outline" className="h-12 px-8 border-white text-white hover:bg-white hover:text-black">
                        {slide.secondaryCta.text}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1.5 transition-all rounded-none ${
              selectedIndex === i ? 'w-8 bg-white' : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
