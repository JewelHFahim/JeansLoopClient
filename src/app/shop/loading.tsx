import { ProductGridSkeleton } from '@/components/ui/skeleton';

export default function ShopLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header area */}
      <div className="mb-8 space-y-1">
        <div className="skeleton h-3 w-24 rounded-none" />
        <div className="skeleton h-5 w-48 rounded-none mt-2" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar skeleton */}
        <aside className="lg:w-64 shrink-0 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <div className="skeleton h-3 w-20 rounded-none" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="skeleton h-3 w-full rounded-none" />
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <ProductGridSkeleton count={9} gridClass="grid-cols-2 sm:grid-cols-3" />
        </div>
      </div>
    </div>
  );
}
