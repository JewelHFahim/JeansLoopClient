import { HeroSlider } from '@/components/home/HeroSlider';
import { CategoryBar } from '@/components/home/CategoryBar';
import { DiscountSection } from '@/components/home/DiscountSection';
import { CategorySection } from '@/components/home/CategorySection';
import type { Category, Product, Slider } from '@/lib/api-types';
import { getSiteSettings } from '@/lib/settings';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

async function getHomeData() {
  try {
    const [categoriesRes, slidersRes, discountRes, productsRes] = await Promise.all([
      fetch(`${API_URL}/categories`, { next: { revalidate: 60 } }),
      fetch(`${API_URL}/sliders/active`, { next: { revalidate: 60 } }),
      fetch(`${API_URL}/products?hasDiscount=true&limit=8`, { next: { revalidate: 60 } }),
      fetch(`${API_URL}/products?limit=50`, { next: { revalidate: 60 } }),
    ]);

    const categories = categoriesRes.ok ? (await categoriesRes.json()).data : [];
    const sliders = slidersRes.ok ? (await slidersRes.json()).data : [];
    const discountProducts = discountRes.ok ? (await discountRes.json()).data : [];
    const allProducts: Product[] = productsRes.ok ? (await productsRes.json()).data : [];

    return {
      categories: (categories || []) as Category[],
      sliders: (sliders || []) as Slider[],
      discountProducts: (discountProducts || []) as Product[],
      allProducts: allProducts || [],
    };
  } catch (err) {
    console.error('Failed to pre-fetch homepage data:', err);
    return {
      categories: [],
      sliders: [],
      discountProducts: [],
      allProducts: [],
    };
  }
}

export default async function HomePage() {
  const [homeData, settings] = await Promise.all([
    getHomeData(),
    getSiteSettings(),
  ]);
  const { categories, sliders, discountProducts, allProducts } = homeData;
  const siteName = settings.title || 'JeansLoop';

  return (
    <div className="pb-16 bg-white">
      {/* 1. Hero Slider */}
      <HeroSlider initialSliders={sliders} />

      {/* 2. Quick Category Bar */}
      <CategoryBar categories={categories} />

      {/* 3. Discount Offers Section */}
      {discountProducts.length > 0 && <DiscountSection products={discountProducts} />}

      {/* 4. Categorized Collections (All categories rendered in the 33% / 67% showcase layout) */}
      <div className="space-y-6">
        {categories.map((category, index) => {
          const categoryProducts = allProducts.filter(
            (p) =>
              p.category.toLowerCase() === category.name.toLowerCase() ||
              p.category.toLowerCase() === category.slug.toLowerCase()
          );

          return (
            <CategorySection
              key={category._id}
              category={category}
              products={categoryProducts}
              fallbackProducts={allProducts}
              index={index}
              siteName={siteName}
            />
          );
        })}
      </div>
    </div>
  );
}
