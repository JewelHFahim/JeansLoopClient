import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jeansloop.com';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    '/shop',
    '/cart',
    '/login',
    '/register',
    '/shipping',
    '/returns',
    '/privacy',
    '/terms',
    '/contact',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    const res = await fetch(`${API_URL}/products?limit=100`, { next: { revalidate: 3600 } });
    if (!res.ok) return staticRoutes;

    const data = await res.json();
    const productRoutes = (data.data || []).map((p: any) => ({
      url: `${SITE_URL}/product/${p.slug}`,
      lastModified: p.updatedAt || new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

    return [...staticRoutes, ...productRoutes];
  } catch {
    return staticRoutes;
  }
}
