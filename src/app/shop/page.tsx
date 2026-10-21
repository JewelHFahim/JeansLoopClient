import { Suspense } from 'react';
import { ShopClient } from './ShopClient';
import { Loader } from '@/components/ui/loader';

export const metadata = {
  title: 'Catalog',
  description: 'Explore all premium denim, twill, and trouser collections from JeansLoop.',
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center bg-white">
          <Loader variant="page" text="Loading Collections..." />
        </div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}
