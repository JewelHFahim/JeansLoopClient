import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FacebookPixel } from '@/components/analytics/FacebookPixel';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jeansloop.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'JeansLoop | Premium Denim & Modern Menswear',
    template: '%s | JeansLoop',
  },
  description:
    'Shop high-quality denim jeans, twill pants, and tailored trousers at JeansLoop. Precision craftsmanship and exceptional comfort.',
  keywords: ['denim jeans', 'mens clothing', 'premium jeans bangladesh', 'twill trousers'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'JeansLoop',
    title: 'JeansLoop | Premium Denim & Modern Menswear',
    description: 'Shop high-quality denim jeans, twill pants, and tailored trousers at JeansLoop.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JeansLoop | Premium Denim & Modern Menswear',
    description: 'Shop high-quality denim jeans, twill pants, and tailored trousers at JeansLoop.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white" suppressHydrationWarning>
        <FacebookPixel />
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
