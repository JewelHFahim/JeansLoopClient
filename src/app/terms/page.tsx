import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/settings';
import { TermsClient } from './TermsClient';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings.title || 'Store';
  return {
    title: 'Terms of Service',
    description: `${siteName} terms of service and purchasing conditions. Review the terms governing orders, deliveries, and use of our platform.`,
  };
}

export default async function TermsPage() {
  const settings = await getSiteSettings();
  const siteName = settings.title || 'Fire Cutter';
  const email = settings.email || 'thefirecutter@gmail.com';

  return (
    <TermsClient
      siteName={siteName}
      email={email}
    />
  );
}
