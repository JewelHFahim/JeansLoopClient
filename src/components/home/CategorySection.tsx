import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import type { Category, Product } from '@/lib/api-types';

interface CategorySectionProps {
  category: Category;
  products: Product[];
  index: number;
}

export function CategorySection({ category, products, index }: CategorySectionProps) {
  if (!products || products.length === 0) return null;

  const isAlt = index % 2 === 1;

  return (
    <section className={`py-16 ${isAlt ? 'bg-neutral-50 border-b-2 border-black' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-black pb-6 mb-8 gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-1">
              Collection
            </p>
            <h2 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-black leading-none">
              {category.name}
            </h2>
          </div>
          <Link href={`/shop?category=${category.slug}`}>
            <Button variant="outline" size="sm" className="gap-2">
              Browse {category.name} <ArrowRight className="h-3.5 w-3.5" />
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
