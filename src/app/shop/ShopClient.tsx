'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/product/ProductCard';
import { productsApi, categoriesApi } from '@/lib/api';
import { useDebounce } from '@/hooks/useDebounce';
import { SlidersHorizontal, ArrowUpDown, X, Loader2 } from 'lucide-react';

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

  const [searchInput, setSearchInput] = useState(initialKeyword);
  const debouncedSearch = useDebounce(searchInput, 400);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync debounced search to URL query parameter
  useEffect(() => {
    if (debouncedSearch !== initialKeyword) {
      updateFilters({ keyword: debouncedSearch || undefined, page: 1 });
    }
  }, [debouncedSearch]);

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

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products', category, discount, sort, minPrice, maxPrice, size, page, debouncedSearch],
    queryFn: async () => {
      const res = await productsApi.getAll({
        page,
        limit: 12,
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

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Top Header */}
      <div className="border-b-2 border-black pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-black leading-none">
            {category ? category.toUpperCase() : 'All Collections'}
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 mt-2">
            {pagination ? `${pagination.total} Available Items` : 'Browsing Registry'}
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <Input
            placeholder="SEARCH PRODUCTS..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full sm:w-60 h-10 text-[10px]"
          />

          <select
            value={sort}
            onChange={(e) => updateFilters({ sort: e.target.value, page: 1 })}
            className="h-10 border-2 border-black bg-white px-3 text-[10px] font-black uppercase tracking-wider outline-none"
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
            className="md:hidden h-10"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? 'block' : 'hidden'
          } md:block md:col-span-1 space-y-6 border-b-2 md:border-b-0 md:border-r-2 border-black pb-8 md:pb-0 md:pr-6`}
        >
          {/* Active filters clear */}
          {(category || discount || minPrice || maxPrice || size || debouncedSearch) && (
            <div className="border-b-2 border-black pb-4">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => router.push('/shop')}
                className="w-full text-[9px]"
              >
                Clear All Filters
              </Button>
            </div>
          )}

          {/* Categories */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-black mb-3">Categories</h3>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => updateFilters({ category: undefined, page: 1 })}
                className={`text-left text-xs font-bold uppercase tracking-wider py-1 ${
                  !category ? 'font-black underline text-black' : 'text-neutral-500 hover:text-black'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => updateFilters({ category: cat.slug, page: 1 })}
                  className={`text-left text-xs font-bold uppercase tracking-wider py-1 ${
                    category.toLowerCase() === cat.slug.toLowerCase()
                      ? 'font-black underline text-black'
                      : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Special Offers Filter */}
          <div className="border-t-2 border-black pt-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-black mb-3">Promotions</h3>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold uppercase">
              <input
                type="checkbox"
                checked={discount === 'true'}
                onChange={(e) => updateFilters({ discount: e.target.checked ? 'true' : undefined, page: 1 })}
                className="w-4 h-4 rounded-none border-2 border-black"
              />
              <span>Discounted Items Only</span>
            </label>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="md:col-span-3">
          {isLoading ? (
            <div className="min-h-[40vh] flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-black" />
            </div>
          ) : products.length === 0 ? (
            <div className="border-2 border-black p-12 text-center bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-black uppercase italic tracking-tight text-black mb-2">
                No Products Found
              </h3>
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-6">
                Try modifying your filter options or search term.
              </p>
              <Button onClick={() => router.push('/shop')}>Reset Filters</Button>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-8 border-t-2 border-black">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pagination.page <= 1}
                    onClick={() => updateFilters({ page: pagination.page - 1 })}
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
                    onClick={() => updateFilters({ page: pagination.page + 1 })}
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
