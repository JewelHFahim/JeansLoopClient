import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/settings';
import { PrivacyClient } from './PrivacyClient';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings.title || 'Store';
  return {
    title: 'Privacy Policy',
    description: `${siteName} privacy policy. Learn how we collect, protect, and handle your personal data when you shop on our platform.`,
  };
}

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();
  const siteName = settings.title || 'JeansLoop';
  const email = settings.email || 'info@jeansloop.com';
  const phone = settings.phone || '+8801911209322';
  const whatsappClean = (settings.socialLinks?.whatsapp || phone).replace(/\D/g, '');

  return (
    <PrivacyClient
      siteName={siteName}
      email={email}
      whatsappClean={whatsappClean}
    />
  );
}
