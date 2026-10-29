import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ProductClient } from './ProductClient';
import type { Product } from '@/lib/api-types';
import { getSiteSettings } from '@/lib/settings';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

async function getRelatedProducts(category: string | undefined, currentProductId: string): Promise<Product[]> {
  try {
    let items: Product[] = [];
    if (category) {
      const res = await fetch(
        `${API_URL}/products?category=${encodeURIComponent(category)}&limit=10`,
        { next: { revalidate: 60 } }
      );
      if (res.ok) {
        const json = await res.json();
        items = (json.data || []).filter(
          (p: Product) => p._id !== currentProductId && p.slug !== currentProductId
        );
      }
    }

    if (items.length < 4) {
      const fallbackRes = await fetch(`${API_URL}/products?limit=10`, {
        next: { revalidate: 60 },
      });
      if (fallbackRes.ok) {
        const fbJson = await fallbackRes.json();
        const fallbackItems = (fbJson.data || []).filter(
          (p: Product) =>
            p._id !== currentProductId &&
            p.slug !== currentProductId &&
            !items.some((existing) => existing._id === p._id)
        );
        items = [...items, ...fallbackItems];
      }
    }

    return items.slice(0, 4);
  } catch {
    return [];
  }
}

// Generate dynamic metadata for Googlebot & OpenGraph
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const primaryImage = product.images?.[0] || '';
  const pageUrl = `/product/${product.slug}`;
  const settings = await getSiteSettings();
  const siteTitle = settings.title || 'Store';

  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      type: 'website',
      url: pageUrl,
      title: `${product.name} | ${siteTitle}`,
      description: product.description.slice(0, 160),
      images: primaryImage
        ? [
            {
              url: primaryImage,
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | ${siteTitle}`,
      description: product.description.slice(0, 160),
      images: primaryImage ? [primaryImage] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, product._id);

  return <ProductClient product={product} relatedProducts={relatedProducts} />;
}
