'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/skeleton';
import { Loader } from '@/components/ui/loader';
import { productsApi, categoriesApi } from '@/lib/api';
import { useDebounce } from '@/hooks/useDebounce';
import { trackSearch } from '@/lib/fpixel';
import {
  SlidersHorizontal,
  Columns2,
  Columns3,
  Columns4,
  Square,
  X,
} from 'lucide-react';

type GridOption = 2 | 3 | 4;
const LIMIT_OPTIONS = [12, 24, 36] as const;

export function ShopClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get('category') || '';
  const discount = searchParams.get('discount') || '';
  const sort = searchParams.get('sort') || 'newest';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const size = searchParams.get('size') || '';
  const page = Number(searchParams.get('page')) || 1;
  const initialKeyword = searchParams.get('keyword') || '';

  const limitParam = Number(searchParams.get('limit'));
  const gridParam = Number(searchParams.get('grid'));

  // Items per page (default: 12, choices: 12, 24, 36)
  const [limit, setLimit] = useState<number>(() => {
    if (LIMIT_OPTIONS.includes(limitParam as (typeof LIMIT_OPTIONS)[number])) return limitParam;
    return 12;
  });

  // Grid columns (default: 3, choices: 2 [Large], 3 [Standard], 4 [Compact])
  const [gridCols, setGridCols] = useState<GridOption>(() => {
    if (gridParam === 2 || gridParam === 3 || gridParam === 4) return gridParam as GridOption;
    return 3;
  });

  const [searchInput, setSearchInput] = useState(initialKeyword);
  const debouncedSearch = useDebounce(searchInput, 400);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync debounced search to URL query parameter and trigger Meta Pixel Search event
  useEffect(() => {
    if (debouncedSearch !== initialKeyword) {
      updateFilters({ keyword: debouncedSearch || undefined, page: 1 });
      if (debouncedSearch && debouncedSearch.trim().length > 1) {
        trackSearch(debouncedSearch.trim());
      }
    }
  }, [debouncedSearch]);

  // Sync URL changes to local state (for browser history back/forward)
  useEffect(() => {
    if (limitParam && LIMIT_OPTIONS.includes(limitParam as (typeof LIMIT_OPTIONS)[number]) && limitParam !== limit) {
      setLimit(limitParam);
    }
  }, [limitParam]);

  useEffect(() => {
    if (gridParam && (gridParam === 2 || gridParam === 3 || gridParam === 4) && gridParam !== gridCols) {
      setGridCols(gridParam as GridOption);
    }
  }, [gridParam]);

  // Read saved grid & limit from localStorage on initial mount if not in URL
  useEffect(() => {
    if (!searchParams.get('grid')) {
      const savedGrid = localStorage.getItem('jeansloop_shop_grid');
      if (savedGrid) {
        const parsed = Number(savedGrid);
        if (parsed === 2 || parsed === 3 || parsed === 4) {
          setGridCols(parsed as GridOption);
        }
      }
    }
    if (!searchParams.get('limit')) {
      const savedLimit = localStorage.getItem('jeansloop_shop_limit');
      if (savedLimit) {
        const parsed = Number(savedLimit);
        if (LIMIT_OPTIONS.includes(parsed as (typeof LIMIT_OPTIONS)[number])) {
          setLimit(parsed);
        }
      }
    }
  }, []);

  const updateFilters = (updates: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val === undefined || val === '') {
        params.delete(key);
      } else {
        params.set(key, String(val));
      }
    });
    router.push(`/shop?${params.toString()}`);
  };

  const handleGridChange = (cols: GridOption) => {
    setGridCols(cols);
    try {
      localStorage.setItem('jeansloop_shop_grid', String(cols));
    } catch {}
    updateFilters({ grid: cols === 3 ? undefined : cols });
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    try {
      localStorage.setItem('jeansloop_shop_limit', String(newLimit));
    } catch {}
    updateFilters({ limit: newLimit === 12 ? undefined : newLimit, page: 1 });
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageChange = (newPage: number) => {
    updateFilters({ page: newPage });
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products', category, discount, sort, minPrice, maxPrice, size, page, limit, debouncedSearch],
    queryFn: async () => {
      const res = await productsApi.getAll({
        page,
        limit,
        category: category || undefined,
        hasDiscount: discount === 'true' ? true : undefined,
        sort,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        size: size || undefined,
        keyword: debouncedSearch || undefined,
      });
      return res.data;
    },
  });

  const { data: categoriesRes } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await categoriesApi.getAll();
      return res.data.data;
    },
  });

  const products = productsData?.data || [];
  const pagination = productsData?.pagination;
  const categories = categoriesRes || [];

  const totalProducts = pagination?.total || 0;
  const startItem = totalProducts > 0 ? (page - 1) * limit + 1 : 0;
  const endItem = Math.min(page * limit, totalProducts);

  // Responsive Grid CSS according to selected density
  const getGridClass = () => {
    switch (gridCols) {
      case 2:
        // Large Showcase View: 1 column on mobile, 2 columns on tablet/desktop
        return 'grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6';
      case 4:
        // Compact Density View: 2 columns on mobile/tablet, 3 on md, 4 on lg/xl
        return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4';
      case 3:
      default:
        // Standard Catalog View: 2 columns on mobile/tablet, 3 on md/lg
        return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5';
    }
  };

  const hasActiveFilters = Boolean(
    category || discount || minPrice || maxPrice || size || debouncedSearch
  );

  return (
    <div className="container mx-auto px-4 pt-4 md:pt-6 pb-12">
      {/* Top Header - Compact Standard Layout */}
      <div className="border-b border-black/15 pb-3 md:pb-4 mb-4 md:mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase italic tracking-tight text-black leading-none">
            {category ? category.toUpperCase() : 'All Collections'}
          </h1>
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
            {pagination ? `(${pagination.total})` : ''}
          </span>
        </div>

        {/* Search, Sort & Mobile Filters Button */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Input
            placeholder="SEARCH..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full sm:w-48 md:w-56 h-9 text-[10px]"
          />

          <select
            value={sort}
            onChange={(e) => updateFilters({ sort: e.target.value, page: 1 })}
            className="h-9 border-2 border-black bg-white px-2.5 text-[10px] font-black uppercase tracking-wider outline-none cursor-pointer"
          >
            <option value="newest">Latest Releases</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Alphabetical</option>
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden h-9 px-3 text-[10px]"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5" />
            {isSidebarOpen ? 'Close' : 'Filters'}
          </Button>
        </div>
      </div>

      {/* Main Body: Compact Sticky Sidebar + Maximized Products Section */}
      <div className="flex flex-col md:flex-row gap-5 lg:gap-6 items-start">
        {/* Optimized Left Sidebar - Slim & Compact */}
        <aside
          className={`${
            isSidebarOpen ? 'block' : 'hidden'
          } md:block w-full md:w-48 lg:w-52 shrink-0 space-y-4 border-b md:border-b-0 md:border-r border-black/15 pb-5 md:pb-2 md:pr-4 md:sticky md:top-20 bg-white`}
        >
          {/* Active filters clear */}
          {hasActiveFilters && (
            <div className="border-b border-black/15 pb-3">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => router.push('/shop')}
                className="w-full h-8 text-[9px] tracking-wider"
              >
                <X className="w-3 h-3 mr-1" />
                Clear Filters
              </Button>
            </div>
          )}

          {/* Categories Navigation */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black mb-2 flex items-center justify-between">
              <span>Categories</span>
              <span className="text-[9px] text-neutral-400 font-bold">{categories.length}</span>
            </h3>
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => updateFilters({ category: undefined, page: 1 })}
                className={`text-left text-[11px] font-bold uppercase tracking-wider py-1 px-2 transition-all ${
                  !category
                    ? 'bg-black text-white font-black'
                    : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                }`}
              >
                All Products
              </button>
              {categories.map((cat) => {
                const isActive = category.toLowerCase() === cat.slug.toLowerCase();
                return (
                  <button
                    key={cat._id}
                    onClick={() => updateFilters({ category: cat.slug, page: 1 })}
                    className={`text-left text-[11px] font-bold uppercase tracking-wider py-1 px-2 transition-all ${
                      isActive
                        ? 'bg-black text-white font-black'
                        : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Promotions Filter */}
          <div className="border-t border-black/15 pt-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black mb-2">Promotions</h3>
            <label className="flex items-center gap-2 cursor-pointer text-[11px] font-bold uppercase text-neutral-800 hover:text-black">
              <input
                type="checkbox"
                checked={discount === 'true'}
                onChange={(e) => updateFilters({ discount: e.target.checked ? 'true' : undefined, page: 1 })}
                className="w-3.5 h-3.5 rounded-none border-2 border-black accent-black"
              />
              <span>Sale / Discounted</span>
            </label>
          </div>
        </aside>

        {/* Maximized Products Section */}
        <div className="flex-1 min-w-0 w-full">
          {/* Catalog View Controls Toolbar */}
          <div className="bg-white border-2 border-black p-2.5 sm:p-3 mb-4 sm:mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            {/* Left: Product Counter */}
            <div className="flex items-center justify-between sm:justify-start gap-2">
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-black">
                {isLoading ? (
                  <span className="text-neutral-400 flex items-center gap-1.5">
                    <Loader variant="dots" className="text-neutral-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Updating…</span>
                  </span>
                ) : pagination && pagination.total > 0 ? (
                  <>
                    Showing{' '}
                    <span className="bg-neutral-100 px-1.5 py-0.5 border border-black font-black">
                      {startItem}–{endItem}
                    </span>{' '}
                    of <span className="font-black">{pagination.total}</span> Items
                  </>
                ) : (
                  <span>0 Products Found</span>
                )}
              </p>
            </div>

            {/* Right: Grid density & items per page switchers */}
            <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-4 flex-wrap">
              {/* Mobile View Toggle (1 Col vs 2 Cols) */}
              <div className="flex md:hidden items-center gap-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500">
                  VIEW:
                </span>
                <div className="inline-flex border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <button
                    type="button"
                    onClick={() => handleGridChange(2)}
                    title="1 Column (Large Showcase View)"
                    aria-label="Single column view"
                    className={`h-7 px-2 flex items-center gap-1 text-[10px] font-black transition-colors ${
                      gridCols === 2
                        ? 'bg-black text-white'
                        : 'text-black hover:bg-neutral-100'
                    }`}
                  >
                    <Square className="w-3 h-3" />
                    <span>1</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGridChange(3)}
                    title="2 Columns (Grid View)"
                    aria-label="Two column view"
                    className={`h-7 px-2 flex items-center gap-1 text-[10px] font-black transition-colors border-l-2 border-black ${
                      gridCols === 3 || gridCols === 4
                        ? 'bg-black text-white'
                        : 'text-black hover:bg-neutral-100'
                    }`}
                  >
                    <Columns2 className="w-3 h-3" />
                    <span>2</span>
                  </button>
                </div>
              </div>

              {/* Desktop Grid Switcher (2, 3, 4 Columns) */}
              <div className="hidden md:flex items-center gap-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500">
                  GRID:
                </span>
                <div className="inline-flex border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <button
                    type="button"
                    onClick={() => handleGridChange(2)}
                    title="2 Columns (Large Showcase)"
                    aria-label="2 Columns Large"
                    className={`h-7 px-2.5 flex items-center gap-1 text-[10px] font-black transition-colors ${
                      gridCols === 2
                        ? 'bg-black text-white'
                        : 'text-black hover:bg-neutral-100'
                    }`}
                  >
                    <Columns2 className="w-3 h-3" />
                    <span className="hidden xl:inline">2</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGridChange(3)}
                    title="3 Columns (Standard Catalog)"
                    aria-label="3 Columns Standard"
                    className={`h-7 px-2.5 flex items-center gap-1 text-[10px] font-black transition-colors border-l-2 border-black ${
                      gridCols === 3
                        ? 'bg-black text-white'
                        : 'text-black hover:bg-neutral-100'
                    }`}
                  >
                    <Columns3 className="w-3 h-3" />
                    <span className="hidden xl:inline">3</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGridChange(4)}
                    title="4 Columns (Compact Grid)"
                    aria-label="4 Columns Compact"
                    className={`h-7 px-2.5 flex items-center gap-1 text-[10px] font-black transition-colors border-l-2 border-black ${
                      gridCols === 4
                        ? 'bg-black text-white'
                        : 'text-black hover:bg-neutral-100'
                    }`}
                  >
                    <Columns4 className="w-3 h-3" />
                    <span className="hidden xl:inline">4</span>
                  </button>
                </div>
              </div>

              {/* Products Per Page Switcher */}
              <div className="flex items-center gap-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500">
                  SHOW:
                </span>
                <div className="inline-flex border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {LIMIT_OPTIONS.map((num, idx) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleLimitChange(num)}
                      title={`Show ${num} products per page`}
                      aria-label={`Show ${num} products`}
                      className={`h-7 px-2 sm:px-2.5 text-[10px] font-black transition-colors ${
                        idx > 0 ? 'border-l-2 border-black' : ''
                      } ${
                        limit === num
                          ? 'bg-black text-white'
                          : 'text-black hover:bg-neutral-100'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid Content */}
          {isLoading ? (
            <div className={`grid ${getGridClass()} gap-4`}>
              {Array.from({ length: Math.min(limit, 6) }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="border-2 border-black p-8 sm:p-12 text-center bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-xl font-black uppercase italic tracking-tight text-black mb-1.5">
                No Products Found
              </h3>
              <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider mb-5">
                Try modifying your filter options or search term.
              </p>
              <Button size="sm" onClick={() => router.push('/shop')}>Reset Filters</Button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className={`grid ${getGridClass()}`}>
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-6 border-t border-black/15">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pagination.page <= 1}
                    onClick={() => handlePageChange(pagination.page - 1)}
                  >
                    Previous
                  </Button>
                  <span className="text-xs font-black uppercase px-4">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pagination.page >= pagination.pages}
                    onClick={() => handlePageChange(pagination.page + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
