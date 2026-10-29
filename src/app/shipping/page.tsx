import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/settings';
import { ShippingClient } from './ShippingClient';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings.title || 'Store';
  return {
    title: 'Shipping & Delivery',
    description: `${siteName} nationwide delivery coverage across Bangladesh, delivery fees, timelines, courier partners, and parcel tracking.`,
  };
}

export default async function ShippingPage() {
  const settings = await getSiteSettings();
  const siteName = settings.title || 'JeansLoop';
  const phone = settings.phone || '+8801911209322';
  const whatsappClean = (settings.socialLinks?.whatsapp || phone).replace(/\D/g, '');

  return (
    <ShippingClient
      siteName={siteName}
      phone={phone}
      whatsappClean={whatsappClean}
    />
  );
}
