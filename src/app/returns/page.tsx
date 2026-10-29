import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/settings';
import { ReturnsClient } from './ReturnsClient';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings.title || 'Store';
  return {
    title: 'Returns & Exchanges',
    description: `${siteName} 7-day hassle-free return and exchange policy. Size exchange assistance, return conditions, and refund procedures.`,
  };
}

export default async function ReturnsPage() {
  const settings = await getSiteSettings();
  const siteName = settings.title || 'JeansLoop';
  const email = settings.email || 'info@jeansloop.com';
  const phone = settings.phone || '+8801911209322';
  const businessHours = settings.businessHours || '10:00 AM – 08:00 PM';
  const whatsappClean = (settings.socialLinks?.whatsapp || phone).replace(/\D/g, '');

  return (
    <ReturnsClient
      siteName={siteName}
      email={email}
      phone={phone}
      businessHours={businessHours}
      whatsappClean={whatsappClean}
    />
  );
}
