import { Suspense } from 'react';
import { ShopClient } from './ShopClient';
import ShopLoading from './loading';

export const metadata = {
  title: 'Catalog',
  description: 'Explore all premium collections and new arrivals from our store catalog.',
};

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopLoading />}>
      <ShopClient />
    </Suspense>
  );
}
