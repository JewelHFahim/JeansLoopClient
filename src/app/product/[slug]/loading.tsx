import { Skeleton } from '@/components/ui/skeleton';
import { ProductGridSkeleton } from '@/components/ui/skeleton';

export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Image column */}
        <div className="space-y-3">
          <div className="aspect-square border-2 border-black skeleton sweep-loader overflow-hidden relative" />
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square border-2 border-black/20 skeleton" />
            ))}
          </div>
        </div>

        {/* Details column */}
        <div className="space-y-5 py-2">
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-5 w-24 mt-1" />
          </div>

          <div className="space-y-2 pt-2">
            <Skeleton className="h-2.5 w-full" />
            <Skeleton className="h-2.5 w-5/6" />
            <Skeleton className="h-2.5 w-4/6" />
          </div>

          {/* Size buttons */}
          <div className="space-y-2 pt-2">
            <Skeleton className="h-2.5 w-16" />
            <div className="flex gap-2 flex-wrap">
              {[28, 30, 32, 34, 36, 38].map((s) => (
                <div key={s} className="skeleton h-9 w-12 border-2 border-black/10" />
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <div className="pt-2 space-y-2">
            <Skeleton className="h-12 w-full border-2 border-black/10" />
            <Skeleton className="h-10 w-full border-2 border-black/10" />
          </div>
        </div>
      </div>

      {/* Related products */}
      <div className="mt-16 space-y-5">
        <Skeleton className="h-5 w-48" />
        <ProductGridSkeleton count={4} gridClass="grid-cols-2 sm:grid-cols-4" />
      </div>
    </div>
  );
}
