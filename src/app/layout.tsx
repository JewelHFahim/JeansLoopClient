import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FacebookPixel } from '@/components/analytics/FacebookPixel';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jeansloop.com';
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

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
      <head>
        {FB_PIXEL_ID && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${FB_PIXEL_ID}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
      </head>
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
