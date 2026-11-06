import type { SiteSettings } from './api-types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const DEFAULT_SETTINGS: SiteSettings = {
  title: 'Fire Cutter',
  tagline: 'Export Mens clothing',
  logo: '',
  email: 'thefirecutter@gmail.com',
  phone: '+8801911209322',
  address: 'Border Bazar, South Monipur, Mirpur, Dhaka',
  locationMapUrl: '',
  businessHours: '10:00 AM - 10:00 PM',
  announcement: '',
  announcementEnabled: false,
  announcementLink: '',
  socialLinks: {
    facebook: 'https://www.facebook.com/firecutter',
    instagram: '',
    youtube: '',
    whatsapp: '+8801911209322',
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
