import type { SiteSettings } from './api-types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const DEFAULT_SETTINGS: SiteSettings = {
  title: 'JeansLoop',
  tagline: 'export clothing zone',
  logo: '',
  email: 'jeansloop21@gmail.com',
  phone: '+8801733572774',
  address: 'Farmgate, Dhaka-1215',
  locationMapUrl: '',
  businessHours: '10:00 AM - 10:00 PM (Daily)',
  announcement: '🔥 Special Offer: Use code FIRST10 for 10% off your first order!',
  announcementEnabled: true,
  announcementLink: '',
  socialLinks: {
    facebook: 'https://www.facebook.com/jeansloop',
    instagram: '',
    youtube: '',
    whatsapp: '+8801733572774',
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
