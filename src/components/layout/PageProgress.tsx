'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Thin top-of-page progress bar that fires on every route change.
 * Pure CSS — no library dependency.
 */
export function PageProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const barRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  const start = useCallback(() => {
    const bar = barRef.current;
    if (!bar) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    bar.style.transition = 'none';
    bar.style.width = '0%';
    bar.style.opacity = '1';

    // Micro-tick so the browser registers the width reset
    rafRef.current = requestAnimationFrame(() => {
      bar.style.transition = 'width 0.6s cubic-bezier(0.1,0.9,0.2,1)';
      bar.style.width = '72%';
    });
  }, []);

  const finish = useCallback(() => {
    const bar = barRef.current;
    if (!bar) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    bar.style.transition = 'width 0.2s ease';
    bar.style.width = '100%';

    timerRef.current = setTimeout(() => {
      bar.style.transition = 'opacity 0.35s ease';
      bar.style.opacity = '0';
      setTimeout(() => {
        if (barRef.current) barRef.current.style.width = '0%';
      }, 350);
    }, 160);
  }, []);

  useEffect(() => {
    start();
    // Finish after a short settle — Next.js doesn't expose a "navigation complete" event in App Router
    const done = setTimeout(finish, 350);
    return () => clearTimeout(done);
  }, [pathname, searchParams, start, finish]);

  return (
    <div
      id="jl-progress"
      ref={barRef}
      style={{ width: '0%', opacity: '0' }}
    />
  );
}
