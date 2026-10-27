'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, Suspense } from 'react';
import { FB_PIXEL_ID, pageview } from '@/lib/fpixel';

function FacebookPixelTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Avoid duplicate PageView on initial page load (base script in <head> fires it)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (FB_PIXEL_ID) {
      pageview();
    }
  }, [pathname, searchParams]);

  return null;
}

export function FacebookPixel() {
  if (!FB_PIXEL_ID) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <FacebookPixelTracking />
    </Suspense>
  );
}
