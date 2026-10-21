import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/lib/api-types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = Boolean(
    product.discountedPrice &&
      product.discountedPrice > 0 &&
      product.discountedPrice < product.price
  );
  const displayPrice = hasDiscount ? product.discountedPrice! : product.price;

  let badgeText = '';
  if (product.discountPercentage && product.discountPercentage > 0) {
    badgeText = `-${product.discountPercentage}%`;
  } else if (product.discountAmount && product.discountAmount > 0) {
    badgeText = `-৳${product.discountAmount}`;
  }

  const primaryImage = product.images?.[0] || '/images/placeholder.jpg';

  return (
    <Link href={`/product/${product.slug}`} className="group h-full block">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-none hover:translate-x-1 hover:translate-y-1 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 border-b-2 border-black">
          {product.images?.length > 0 ? (
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs font-bold text-neutral-400 uppercase">
              No Image
            </div>
          )}

          {/* Discount Badge */}
          {hasDiscount && badgeText && (
            <div className="absolute top-0 left-0 z-10">
              <span className="bg-amber-400 text-black text-[9px] font-black px-3 py-1 uppercase tracking-widest block border-b-2 border-r-2 border-black">
                {badgeText}
              </span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="bg-white border-2 border-black px-4 py-2 text-[10px] font-black uppercase tracking-widest text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              View Product
            </span>
          </div>
        </div>

        <CardContent className="p-4 bg-white">
          <p className="mb-1 text-[9px] font-black text-neutral-400 uppercase tracking-widest">
            {product.category}
          </p>
          <h3 className="mb-2 line-clamp-1 font-black text-black uppercase text-xs tracking-tight">
            {product.name}
          </h3>

          <div className="flex items-center gap-2">
            <span className={`text-sm font-black ${hasDiscount ? 'text-amber-600' : 'text-black'}`}>
              {formatPrice(displayPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-neutral-400 line-through font-bold">
                {formatPrice(product.price)}
              </span>
            )}
            {!hasDiscount && product.comparePrice && product.comparePrice > product.price && (
              <span className="text-xs text-neutral-400 line-through font-bold">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
