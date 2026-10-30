import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { FacebookPixel } from '@/components/analytics/FacebookPixel';
import { PageProgress } from '@/components/layout/PageProgress';
import { getSiteSettings } from '@/lib/settings';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jeansloop.com';
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.title || 'Store';
  const tagline = settings.tagline || 'Modern Fashion & Apparel';
  const description = `Shop high-quality collections at ${title}. Precision craftsmanship and exceptional comfort.`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${title} | ${tagline}`,
      template: `%s | ${title}`,
    },
    description,
    keywords: ['clothing', 'mens clothing', 'fashion', 'apparel', title.toLowerCase()],
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.png', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      siteName: title,
      title: `${title} | ${tagline}`,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${tagline}`,
      description,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

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
          <PageProgress />
          <AnnouncementBar
            initialAnnouncement={settings.announcement}
            initialEnabled={settings.announcementEnabled !== false}
            initialLink={settings.announcementLink || ''}
          />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
