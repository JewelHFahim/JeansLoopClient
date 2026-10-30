'use client';

import { useQuery } from '@tanstack/react-query';
import { settingsApi } from '@/lib/api';
import type { SiteSettings } from '@/lib/api-types';

export const DEFAULT_SETTINGS: SiteSettings = {
  title: 'JeansLoop',
  tagline: 'Premium Denim & Modern Menswear',
  logo: '',
  email: 'info@jeansloop.com',
  phone: '+8801911209322',
  address: 'Dhaka, Bangladesh',
  locationMapUrl: '',
  businessHours: '10:00 AM - 08:00 PM',
  announcement: 'Welcome to our store — Premium Quality Guaranteed',
  announcementEnabled: true,
  announcementLink: '',
  socialLinks: {
    facebook: '',
    instagram: '',
    youtube: '',
    whatsapp: '',
    tiktok: '',
  },
};

export function useSettings() {
  const { data: settingsRes, isLoading } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const res = await settingsApi.get();
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const settings: SiteSettings = {
    ...DEFAULT_SETTINGS,
    ...(settingsRes || {}),
  };

  const siteName = settings.title || DEFAULT_SETTINGS.title;
  const tagline = settings.tagline || DEFAULT_SETTINGS.tagline;
  const email = settings.email || DEFAULT_SETTINGS.email;
  const phone = settings.phone || DEFAULT_SETTINGS.phone;
  const address = settings.address || DEFAULT_SETTINGS.address;
  const businessHours = settings.businessHours || DEFAULT_SETTINGS.businessHours;
  const logo = settings.logo || '';
  const announcement = settings.announcement || '';
  const announcementEnabled = settings.announcementEnabled !== false;
  const announcementLink = settings.announcementLink || '';
  const locationMapUrl = settings.locationMapUrl || '';

  // Clean WhatsApp number (e.g. 8801911209322)
  const rawWhatsapp = settings.socialLinks?.whatsapp || phone || '';
  let whatsappClean = (rawWhatsapp ? String(rawWhatsapp) : '').replace(/\D/g, '');
  if (whatsappClean.startsWith('01') && whatsappClean.length === 11) {
    whatsappClean = '88' + whatsappClean;
  }

  const socialLinks = {
    facebook: settings.socialLinks?.facebook || '',
    instagram: settings.socialLinks?.instagram || '',
    youtube: settings.socialLinks?.youtube || '',
    whatsapp: settings.socialLinks?.whatsapp || '',
    tiktok: settings.socialLinks?.tiktok || '',
  };

  return {
    settings,
    isLoading,
    siteName,
    tagline,
    email,
    phone,
    address,
    businessHours,
    logo,
    announcement,
    announcementEnabled,
    announcementLink,
    locationMapUrl,
    whatsapp: rawWhatsapp,
    whatsappClean,
    socialLinks,
  };
}
