'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
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
  Check,
  RotateCcw,
  Search,
} from 'lucide-react';

type GridOption = 2 | 3 | 4;
const LIMIT_OPTIONS = [12, 24, 36] as const;

// Common standard apparel & waist sizes
const WAIST_SIZES = ['30', '32', '34', '36', '38', '40', '42', '44'];
const APPAREL_SIZES = ['S', 'M', 'L', 'XL'];

const PRICE_PRESETS = [
  { label: 'Under ৳1,500', min: undefined, max: 1500 },
  { label: '৳1,500 – ৳2,500', min: 1500, max: 2500 },
  { label: '৳2,500 – ৳4,000', min: 2500, max: 4000 },
  { label: 'Above ৳4,000', min: 4000, max: undefined },
];

export function ShopClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get('category') || '';
  const discount = searchParams.get('discount') || '';
  const sort = searchParams.get('sort') || 'newest';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const sizeParam = searchParams.get('size') || '';
  const stockStatus = searchParams.get('stockStatus') || '';
  const page = Number(searchParams.get('page')) || 1;
  const initialKeyword = searchParams.get('keyword') || '';

  const limitParam = Number(searchParams.get('limit'));
  const gridParam = Number(searchParams.get('grid'));

  // Items per page (default: 12, choices: 12, 24, 36)
  const [limit, setLimit] = useState<number>(() => {
    if (LIMIT_OPTIONS.includes(limitParam as (typeof LIMIT_OPTIONS)[number])) return limitParam;
    return 12;
  });

  // Grid columns (default: 4, choices: 2 [Large], 3 [Standard], 4 [4 Products Grid])
  const [gridCols, setGridCols] = useState<GridOption>(() => {
    if (gridParam === 2 || gridParam === 3 || gridParam === 4) return gridParam as GridOption;
    return 4;
  });

  const [searchInput, setSearchInput] = useState(initialKeyword);
  const debouncedSearch = useDebounce(searchInput, 400);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Price inputs local state
  const [priceMinInput, setPriceMinInput] = useState(minPrice);
  const [priceMaxInput, setPriceMaxInput] = useState(maxPrice);

  // Active selected sizes parsed from comma-separated URL param
  const selectedSizes = useMemo(() => {
    if (!sizeParam) return [];
    return sizeParam
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }, [sizeParam]);

  // Sync debounced search to URL query parameter and trigger Meta Pixel Search event
  useEffect(() => {
    const currentParam = searchParams.get('keyword') || '';
    if (debouncedSearch !== currentParam) {
      updateFilters({ keyword: debouncedSearch || undefined, page: 1 });
      if (debouncedSearch && debouncedSearch.trim().length > 1) {
        trackSearch(debouncedSearch.trim());
      }
    }
  }, [debouncedSearch]);

  // Keep search input in sync if URL changes externally (e.g. navigation, browser back/forward, reset)
  useEffect(() => {
    const urlKeyword = searchParams.get('keyword') || '';
    if (urlKeyword !== searchInput) {
      setSearchInput(urlKeyword);
    }
  }, [searchParams]);

  // Keep price inputs in sync with URL
  useEffect(() => {
    setPriceMinInput(minPrice);
  }, [minPrice]);

  useEffect(() => {
    setPriceMaxInput(maxPrice);
  }, [maxPrice]);

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
    try {
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
    } catch {}
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
    updateFilters({ grid: cols === 4 ? undefined : cols });
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

  // Size filter handler: toggles size in the comma-separated list
  const handleToggleSize = (sizeValue: string) => {
    const clean = sizeValue.trim();
    let nextSizes: string[];
    const exists = selectedSizes.some((s) => s.toLowerCase() === clean.toLowerCase());

    if (exists) {
      nextSizes = selectedSizes.filter((s) => s.toLowerCase() !== clean.toLowerCase());
    } else {
      nextSizes = [...selectedSizes, clean];
    }

    updateFilters({
      size: nextSizes.length > 0 ? nextSizes.join(',') : undefined,
      page: 1,
    });
  };

  const handleClearSizes = () => {
    updateFilters({ size: undefined, page: 1 });
  };

  // Price filters handler
  const handleApplyPrice = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanMin = priceMinInput.trim() ? Number(priceMinInput.trim()) : undefined;
    const cleanMax = priceMaxInput.trim() ? Number(priceMaxInput.trim()) : undefined;
    updateFilters({
      minPrice: cleanMin !== undefined && !isNaN(cleanMin) ? cleanMin : undefined,
      maxPrice: cleanMax !== undefined && !isNaN(cleanMax) ? cleanMax : undefined,
      page: 1,
    });
  };

  const handleClearPrice = () => {
    setPriceMinInput('');
    setPriceMaxInput('');
    updateFilters({ minPrice: undefined, maxPrice: undefined, page: 1 });
  };

  const handleSelectPricePreset = (min?: number, max?: number) => {
    const isCurrentlyActive =
      (min !== undefined ? String(min) : '') === minPrice &&
      (max !== undefined ? String(max) : '') === maxPrice;

    if (isCurrentlyActive) {
      handleClearPrice();
    } else {
      setPriceMinInput(min !== undefined ? String(min) : '');
      setPriceMaxInput(max !== undefined ? String(max) : '');
      updateFilters({
        minPrice: min,
        maxPrice: max,
        page: 1,
      });
    }
  };

  const handleClearAllFilters = () => {
    setSearchInput('');
    setPriceMinInput('');
    setPriceMaxInput('');
    router.push('/shop');
  };

  // Queries
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products', category, discount, sort, minPrice, maxPrice, sizeParam, stockStatus, page, limit, debouncedSearch],
    queryFn: async () => {
      const res = await productsApi.getAll({
        page,
        limit,
        category: category || undefined,
        hasDiscount: discount === 'true' ? true : undefined,
        sort,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        size: sizeParam || undefined,
        stockStatus: stockStatus || undefined,
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

  // Query distinct sizes from backend for the currently selected category (or all)
  const { data: serverSizesRes } = useQuery({
    queryKey: ['productSizes', category],
    queryFn: async () => {
      try {
        const res = await productsApi.getSizes(category || undefined);
        return res.data.data;
      } catch {
        return [];
      }
    },
    staleTime: 60 * 1000,
  });

  const products = productsData?.data || [];
  const pagination = productsData?.pagination;
  const categories = categoriesRes || [];
  const serverSizes = serverSizesRes || [];

  // Merge available sizes intelligently:
  // Identify custom / other sizes present in the database that aren't in preset lists
  const otherSizes = useMemo(() => {
    const standardSet = new Set([
      ...WAIST_SIZES.map((s) => s.toLowerCase()),
      ...APPAREL_SIZES.map((s) => s.toLowerCase()),
      '28',
      'xs',
      '2xl',
      '3xl',
      'xxl',
      'xxxl',
    ]);
    return serverSizes.filter((s) => !standardSet.has(s.toLowerCase()));
  }, [serverSizes]);

  const totalProducts = pagination?.total || 0;
  const startItem = totalProducts > 0 ? (page - 1) * limit + 1 : 0;
  const endItem = Math.min(page * limit, totalProducts);

  // Responsive Grid CSS according to selected density
  const getGridClass = () => {
    switch (gridCols) {
      case 2:
        return 'grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6';
      case 3:
        return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5';
      case 4:
      default:
        return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4';
    }
  };

  const hasActiveFilters = Boolean(
    category || discount || minPrice || maxPrice || sizeParam || stockStatus || debouncedSearch
  );

  const activeFiltersCount = [
    category,
    discount,
    minPrice || maxPrice,
    selectedSizes.length > 0,
    stockStatus,
    debouncedSearch,
  ].filter(Boolean).length;

  return (
    <div className="container mx-auto px-4 pt-4 md:pt-6 pb-12">
      {/* Top Header */}
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
          <div className="relative w-full sm:w-48 md:w-56">
            <Input
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full h-9 pl-8 pr-7 text-[10px]"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput('');
                  updateFilters({ keyword: undefined, page: 1 });
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

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
            variant={activeFiltersCount > 0 ? 'default' : 'outline'}
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden h-9 px-3 text-[10px] flex items-center gap-1.5"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="ml-1 bg-white text-black px-1.5 py-0.2 rounded-full text-[9px] font-black">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Main Body: Sticky Filter Sidebar + Products Section */}
      <div className="flex flex-col md:flex-row gap-5 lg:gap-7 items-start">
        {/* Left Filter Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? 'block' : 'hidden'
          } md:block w-full md:w-60 lg:w-64 shrink-0 space-y-5 border-b md:border-b-0 md:border-r border-black/15 pb-6 md:pb-6 md:pr-5 md:sticky md:top-20 bg-white z-20 max-h-[calc(100vh-6rem)] md:overflow-y-auto`}
        >
          {/* Header of Filters for Mobile / Desktop */}
          <div className="flex items-center justify-between pb-2 border-b border-black/15">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-black" />
              <span className="text-xs font-black uppercase tracking-widest text-black">
                Filters
              </span>
              {activeFiltersCount > 0 && (
                <span className="bg-black text-white text-[9px] font-black px-1.5 py-0.5">
                  {activeFiltersCount}
                </span>
              )}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearAllFilters}
                className="text-[10px] font-black uppercase tracking-wider text-red-600 hover:text-black flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                Reset
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-neutral-500 hover:text-black p-1"
              aria-label="Close filters"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Active Filter Chips Summary (within sidebar) */}
          {hasActiveFilters && (
            <div className="bg-neutral-50 border border-neutral-200 p-2.5 space-y-2">
              <div className="text-[9px] font-black uppercase tracking-widest text-neutral-400">
                Active Selections:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {debouncedSearch && (
                  <span className="inline-flex items-center gap-1 bg-black text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-wider">
                    "{debouncedSearch}"
                    <button
                      type="button"
                      onClick={() => {
                        setSearchInput('');
                        updateFilters({ keyword: undefined, page: 1 });
                      }}
                      className="hover:text-red-400"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                )}

                {category && (
                  <span className="inline-flex items-center gap-1 bg-black text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-wider">
                    {category}
                    <button
                      type="button"
                      onClick={() => updateFilters({ category: undefined, page: 1 })}
                      className="hover:text-red-400"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                )}

                {selectedSizes.map((sz) => (
                  <span
                    key={sz}
                    className="inline-flex items-center gap-1 bg-black text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-wider"
                  >
                    Size {sz}
                    <button
                      type="button"
                      onClick={() => handleToggleSize(sz)}
                      className="hover:text-red-400"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}

                {(minPrice || maxPrice) && (
                  <span className="inline-flex items-center gap-1 bg-black text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-wider">
                    ৳{minPrice || '0'} – {maxPrice ? `৳${maxPrice}` : '∞'}
                    <button
                      type="button"
                      onClick={handleClearPrice}
                      className="hover:text-red-400"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                )}

                {stockStatus === 'inStock' && (
                  <span className="inline-flex items-center gap-1 bg-black text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-wider">
                    In Stock
                    <button
                      type="button"
                      onClick={() => updateFilters({ stockStatus: undefined, page: 1 })}
                      className="hover:text-red-400"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                )}

                {discount === 'true' && (
                  <span className="inline-flex items-center gap-1 bg-black text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-wider">
                    On Sale
                    <button
                      type="button"
                      onClick={() => updateFilters({ discount: undefined, page: 1 })}
                      className="hover:text-red-400"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* 1. SIZE FILTER (Featured Main Addition) */}
          <div className="border-b border-black/15 pb-5">
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black flex items-center gap-1.5">
                <span>Filter By Size</span>
                {selectedSizes.length > 0 && (
                  <span className="bg-black text-white px-1.5 py-0.2 rounded-full text-[8px] font-bold">
                    {selectedSizes.length}
                  </span>
                )}
              </h3>
              {selectedSizes.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearSizes}
                  className="text-[9px] font-black uppercase tracking-wider text-neutral-400 hover:text-black"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Waist / Denim Sizes */}
            <div className="space-y-3">
              <div>
                <p className="text-[9px] font-black uppercase tracking-wider text-neutral-400 mb-1.5">
                  Waist / Pants (Inches):
                </p>
                <div className="grid grid-cols-4 gap-1.5">
                  {WAIST_SIZES.map((sz) => {
                    const isSelected = selectedSizes.some(
                      (s) => s.toLowerCase() === sz.toLowerCase()
                    );
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => handleToggleSize(sz)}
                        title={`Filter size ${sz}`}
                        className={`h-8 border text-[11px] font-black uppercase tracking-wider transition-all flex items-center justify-center ${
                          isSelected
                            ? 'border-black bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                            : 'border-neutral-300 bg-white text-black hover:border-black hover:bg-neutral-50'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Apparel / Tops Sizes */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-wider text-neutral-400 mb-1.5">
                  Standard Apparel:
                </p>
                <div className="grid grid-cols-4 gap-1.5">
                  {APPAREL_SIZES.map((sz) => {
                    const isSelected = selectedSizes.some(
                      (s) => s.toLowerCase() === sz.toLowerCase()
                    );
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => handleToggleSize(sz)}
                        title={`Filter size ${sz}`}
                        className={`h-8 border text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center ${
                          isSelected
                            ? 'border-black bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                            : 'border-neutral-300 bg-white text-black hover:border-black hover:bg-neutral-50'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Any Other Unique Sizes from Store Database */}
              {otherSizes.length > 0 && (
                <div>
                  <p className="text-[9px] font-black uppercase tracking-wider text-neutral-400 mb-1.5">
                    Other Sizes:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {otherSizes.map((sz) => {
                      const isSelected = selectedSizes.some(
                        (s) => s.toLowerCase() === sz.toLowerCase()
                      );
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => handleToggleSize(sz)}
                          className={`h-8 px-2.5 border text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center ${
                            isSelected
                              ? 'border-black bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                              : 'border-neutral-300 bg-white text-black hover:border-black hover:bg-neutral-50'
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. PRICE RANGE FILTER */}
          <div className="border-b border-black/15 pb-5">
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">
                Price (BDT ৳)
              </h3>
              {(minPrice || maxPrice) && (
                <button
                  type="button"
                  onClick={handleClearPrice}
                  className="text-[9px] font-black uppercase tracking-wider text-neutral-400 hover:text-black"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Price Preset Buttons */}
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {PRICE_PRESETS.map((preset) => {
                const isActive =
                  (preset.min !== undefined ? String(preset.min) : '') === minPrice &&
                  (preset.max !== undefined ? String(preset.max) : '') === maxPrice;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleSelectPricePreset(preset.min, preset.max)}
                    className={`h-7 px-1.5 text-[9px] font-black uppercase tracking-wider border text-left truncate transition-all ${
                      isActive
                        ? 'border-black bg-black text-white'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-black hover:bg-neutral-50'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            {/* Custom Min/Max Inputs */}
            <form onSubmit={handleApplyPrice} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Min ৳"
                    value={priceMinInput}
                    onChange={(e) => setPriceMinInput(e.target.value)}
                    className="h-8 text-[11px] px-2 font-mono"
                    min={0}
                  />
                </div>
                <span className="text-neutral-400 text-xs font-bold">–</span>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Max ৳"
                    value={priceMaxInput}
                    onChange={(e) => setPriceMaxInput(e.target.value)}
                    className="h-8 text-[11px] px-2 font-mono"
                    min={0}
                  />
                </div>
              </div>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="w-full h-7 text-[9px] font-black uppercase tracking-wider border-black hover:bg-black hover:text-white"
              >
                Apply Price
              </Button>
            </form>
          </div>

          {/* 3. CATEGORIES FILTER */}
          <div className="border-b border-black/15 pb-5">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black mb-2 flex items-center justify-between">
              <span>Categories</span>
              <span className="text-[9px] text-neutral-400 font-bold">{categories.length}</span>
            </h3>
            <div className="flex flex-col space-y-1">
              <button
                type="button"
                onClick={() => updateFilters({ category: undefined, page: 1 })}
                className={`text-left text-[11px] font-bold uppercase tracking-wider py-1 px-2 transition-all flex items-center justify-between ${
                  !category
                    ? 'bg-black text-white font-black'
                    : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                }`}
              >
                <span>All Collections</span>
                {!category && <Check className="w-3 h-3" />}
              </button>
              {categories.map((cat) => {
                const isActive = category.toLowerCase() === cat.slug.toLowerCase();
                return (
                  <button
                    key={cat._id}
                    type="button"
                    onClick={() => updateFilters({ category: cat.slug, page: 1 })}
                    className={`text-left text-[11px] font-bold uppercase tracking-wider py-1 px-2 transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-black text-white font-black'
                        : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {isActive && <Check className="w-3 h-3" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. AVAILABILITY & PROMOTIONS FILTER */}
          <div className="space-y-3 pt-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">
              Availability & Deals
            </h3>

            <label className="flex items-center gap-2 cursor-pointer text-[11px] font-bold uppercase text-neutral-800 hover:text-black select-none">
              <input
                type="checkbox"
                checked={stockStatus === 'inStock'}
                onChange={(e) =>
                  updateFilters({
                    stockStatus: e.target.checked ? 'inStock' : undefined,
                    page: 1,
                  })
                }
                className="w-3.5 h-3.5 rounded-none border-2 border-black accent-black cursor-pointer"
              />
              <span>In Stock Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-[11px] font-bold uppercase text-neutral-800 hover:text-black select-none">
              <input
                type="checkbox"
                checked={discount === 'true'}
                onChange={(e) =>
                  updateFilters({
                    discount: e.target.checked ? 'true' : undefined,
                    page: 1,
                  })
                }
                className="w-3.5 h-3.5 rounded-none border-2 border-black accent-black cursor-pointer"
              />
              <span>Sale / Discounted</span>
            </label>
          </div>

          {/* Mobile Bottom Action: Apply / View Results */}
          <div className="md:hidden pt-4 border-t border-black/15">
            <Button
              className="w-full h-10 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              onClick={() => setIsSidebarOpen(false)}
            >
              View {totalProducts} Products
            </Button>
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
                    onClick={() => handleGridChange(4)}
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

          {/* Active Filter Tags Bar (Above Grid for quick accessibility) */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-4 bg-neutral-50 border border-neutral-200 p-2.5">
              <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500">
                Active Filters:
              </span>

              {category && (
                <span className="inline-flex items-center gap-1 bg-white border border-black text-black px-2 py-0.5 text-[10px] font-bold uppercase">
                  Category: <strong>{category}</strong>
                  <button
                    type="button"
                    onClick={() => updateFilters({ category: undefined, page: 1 })}
                    className="hover:text-red-500 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedSizes.map((sz) => (
                <span
                  key={sz}
                  className="inline-flex items-center gap-1 bg-white border border-black text-black px-2 py-0.5 text-[10px] font-bold uppercase"
                >
                  Size: <strong>{sz}</strong>
                  <button
                    type="button"
                    onClick={() => handleToggleSize(sz)}
                    className="hover:text-red-500 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {(minPrice || maxPrice) && (
                <span className="inline-flex items-center gap-1 bg-white border border-black text-black px-2 py-0.5 text-[10px] font-bold uppercase">
                  Price: <strong>৳{minPrice || '0'} – {maxPrice ? `৳${maxPrice}` : '∞'}</strong>
                  <button
                    type="button"
                    onClick={handleClearPrice}
                    className="hover:text-red-500 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {stockStatus === 'inStock' && (
                <span className="inline-flex items-center gap-1 bg-white border border-black text-black px-2 py-0.5 text-[10px] font-bold uppercase">
                  <strong>In Stock</strong>
                  <button
                    type="button"
                    onClick={() => updateFilters({ stockStatus: undefined, page: 1 })}
                    className="hover:text-red-500 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {discount === 'true' && (
                <span className="inline-flex items-center gap-1 bg-white border border-black text-black px-2 py-0.5 text-[10px] font-bold uppercase">
                  <strong>On Sale</strong>
                  <button
                    type="button"
                    onClick={() => updateFilters({ discount: undefined, page: 1 })}
                    className="hover:text-red-500 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {debouncedSearch && (
                <span className="inline-flex items-center gap-1 bg-white border border-black text-black px-2 py-0.5 text-[10px] font-bold uppercase">
                  Keyword: <strong>"{debouncedSearch}"</strong>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput('');
                      updateFilters({ keyword: undefined, page: 1 });
                    }}
                    className="hover:text-red-500 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={handleClearAllFilters}
                className="text-[9px] font-black uppercase tracking-wider text-red-600 hover:underline ml-auto"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Products Grid Content */}
          {isLoading ? (
            <div className={`grid ${getGridClass()} gap-4`}>
              {Array.from({ length: Math.min(limit, 8) }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="border-2 border-black p-8 sm:p-12 text-center bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-xl font-black uppercase italic tracking-tight text-black mb-1.5">
                No Products Found
              </h3>
              <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider mb-5">
                No items match your active filters (e.g. Size {sizeParam ? `"${sizeParam}"` : ''}). Try modifying your filter options or search term.
              </p>
              <Button size="sm" onClick={handleClearAllFilters}>
                Reset All Filters
              </Button>
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
