import type { SiteSettings } from './api-types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

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

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch(`${API_URL}/settings`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return DEFAULT_SETTINGS;
    const json = await res.json();
    return {
      ...DEFAULT_SETTINGS,
      ...(json.data || {}),
    };
  } catch (error) {
    return DEFAULT_SETTINGS;
  }
}
