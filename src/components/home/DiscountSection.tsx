import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import type { Product } from '@/lib/api-types';

interface DiscountSectionProps {
  products: Product[];
}

export function DiscountSection({ products }: DiscountSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="bg-amber-50 py-16 border-y-2 border-black my-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-black pb-6 mb-8 gap-4">
          <div>
            <div className="inline-block bg-amber-400 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 mb-2 border border-black">
              Limited Time Deals
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-black leading-none">
              Special Discounts
            </h2>
          </div>
          <Link href="/shop?discount=true">
            <Button variant="outline" size="sm" className="gap-2">
              View All Offers <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
