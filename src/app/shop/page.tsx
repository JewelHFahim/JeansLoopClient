import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ShopClient } from './ShopClient';
import ShopLoading from './loading';
import type { PaginatedResponse, Product, Category } from '@/lib/api-types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

interface SearchParams {
  category?: string;
  discount?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
  size?: string;
  stockStatus?: string;
  page?: string;
  limit?: string;
  keyword?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

// Dynamic SEO metadata based on current filter / category / search query
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const category = params.category;
  const keyword = params.keyword;
  const hasDiscount = params.discount === 'true';

  let title = 'Shop All Premium Collections';
  let description = 'Browse our extensive catalog of authentic premium denim jeans, trousers, and export-quality clothing.';

  if (category) {
    const formattedCat = category.charAt(0).toUpperCase() + category.slice(1);
    title = `${formattedCat} Collection | JeansLoop`;
    description = `Explore our premium ${formattedCat} collection with precision fit and authentic craftsmanship.`;
  } else if (hasDiscount) {
    title = 'Exclusive Deals & Discounts | JeansLoop';
    description = 'Limited time special discounts and offers on premium denim jeans and export clothing.';
  } else if (keyword) {
    title = `Search: "${keyword}" | JeansLoop`;
    description = `Search results for "${keyword}" across our premium denim and apparel collection.`;
  }

  return {
    title,
    description,
    openGraph: {
      title: `${title} | JeansLoop`,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | JeansLoop`,
      description,
    },
  };
}

// Server-side prefetch for initial catalog data (SSR)
async function getInitialProducts(params: SearchParams): Promise<PaginatedResponse<Product> | null> {
  try {
    const query = new URLSearchParams();
    if (params.category) query.set('category', params.category);
    if (params.discount === 'true') query.set('hasDiscount', 'true');
    if (params.sort) query.set('sort', params.sort);
    if (params.minPrice) query.set('minPrice', params.minPrice);
    if (params.maxPrice) query.set('maxPrice', params.maxPrice);
    if (params.size) query.set('size', params.size);
    if (params.stockStatus) query.set('stockStatus', params.stockStatus);
    if (params.keyword) query.set('keyword', params.keyword);
    query.set('page', params.page || '1');
    query.set('limit', params.limit || '12');

    const res = await fetch(`${API_URL}/products?${query.toString()}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Server-side prefetch for categories
async function getInitialCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      next: { revalidate: 300 }, // 5 min ISR
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export default async function ShopPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const [initialProducts, initialCategories] = await Promise.all([
    getInitialProducts(params),
    getInitialCategories(),
  ]);

  return (
    <Suspense fallback={<ShopLoading />}>
      <ShopClient
        initialProducts={initialProducts?.data || []}
        initialPagination={initialProducts?.pagination}
        initialCategories={initialCategories}
      />
    </Suspense>
  );
}
