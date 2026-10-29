import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

/** Single shimmer block */
export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('skeleton rounded-none', className)} />;
}

/** Product card skeleton — matches ProductCard layout */
export function ProductCardSkeleton() {
  return (
    <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      {/* Image */}
      <div className="aspect-[3/4] skeleton relative overflow-hidden sweep-loader" />

      {/* Content */}
      <div className="p-3 space-y-2.5">
        <Skeleton className="h-2 w-16" />
        <Skeleton className="h-3.5 w-3/4" />
        <Skeleton className="h-3 w-2/5" />
        <div className="flex gap-1.5 pt-1">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-6 w-8" />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Row of product card skeletons */
export function ProductGridSkeleton({ count = 6, gridClass = 'grid-cols-2 sm:grid-cols-3' }: { count?: number; gridClass?: string }) {
  return (
    <div className={`grid gap-4 ${gridClass}`}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Order row skeleton */
export function OrderRowSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="border-2 border-black p-4 space-y-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-2.5 w-40" />
          <div className="flex gap-2 pt-1">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
