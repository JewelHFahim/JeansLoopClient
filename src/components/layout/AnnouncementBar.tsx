'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Megaphone, ArrowRight, X } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';

interface AnnouncementBarProps {
  initialAnnouncement?: string;
  initialEnabled?: boolean;
  initialLink?: string;
}

export function AnnouncementBar({
  initialAnnouncement,
  initialEnabled = true,
  initialLink = '',
}: AnnouncementBarProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const {
    announcement: clientAnnouncement,
    announcementEnabled: clientEnabled,
    announcementLink: clientLink,
    isLoading,
  } = useSettings();

  // Prefer client settings if available and non-empty, else initial server props
  const rawAnnouncement = (clientAnnouncement?.trim() || initialAnnouncement?.trim() || '');
  const isEnabled = isLoading
    ? (initialEnabled ?? true)
    : (clientEnabled !== undefined ? clientEnabled : (initialEnabled ?? true));
  const linkHref = (clientLink?.trim() || initialLink?.trim() || '');

  // Session dismiss check:
  // 1. Clear legacy permanent session dismissal so users can see the upgraded banner
  // 2. Only dismiss if the dismissed text matches the current announcement
  useEffect(() => {
    try {
      if (sessionStorage.getItem('jl_announcement_dismissed') === 'true') {
        sessionStorage.removeItem('jl_announcement_dismissed');
      }
      const dismissedText = sessionStorage.getItem('jl_announcement_dismissed_text');
      if (dismissedText && dismissedText === rawAnnouncement) {
        setIsDismissed(true);
      }
    } catch {
      // sessionStorage unavailable
    }
  }, [rawAnnouncement]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDismissed(true);
    try {
      sessionStorage.setItem('jl_announcement_dismissed_text', rawAnnouncement);
    } catch {
      // ignore
    }
  };

  // Support multiple rotating messages separated by pipe (|) or single message
  const messages = useMemo(() => {
    if (!rawAnnouncement) return [];
    const parts = rawAnnouncement
      .split('|')
      .map((p) => p.trim())
      .filter(Boolean);
    return parts.length > 0 ? parts : [rawAnnouncement];
  }, [rawAnnouncement]);

  // Repeat items to guarantee continuous ribbon coverage across any viewport width
  const repeatedItems = useMemo(() => {
    if (messages.length === 0) return [];
    const repeatCount = Math.max(4, Math.ceil(8 / messages.length));
    const items: string[] = [];
    for (let i = 0; i < repeatCount; i++) {
      items.push(...messages);
    }
    return items;
  }, [messages]);

  // Hide if disabled in admin, dismissed, or empty
  if (isDismissed || !isEnabled || !rawAnnouncement) {
    return null;
  }

  const hasLink = Boolean(linkHref);

  const renderItem = (text: string, keyPrefix: string, index: number) => (
    <div key={`${keyPrefix}-${index}`} className="inline-flex items-center gap-2.5 px-4 sm:px-6">
      <Megaphone className="h-3.5 w-3.5 flex-shrink-0 text-amber-300 animate-pulse" />
      <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-amber-300 whitespace-nowrap drop-shadow-sm">
        {text}
      </span>
      {hasLink && (
        <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-black underline underline-offset-4 text-white hover:text-amber-200 uppercase tracking-widest transition-colors ml-1">
          <span>Explore</span>
          <ArrowRight className="h-3 w-3" />
        </span>
      )}
      <span className="text-amber-400/50 text-[10px] pl-2 select-none" aria-hidden="true">
        ✦
      </span>
    </div>
  );

  return (
    <aside
      aria-label="Announcement"
      className="announcement-bar-container group relative z-50 w-full bg-black text-white border-b border-neutral-900 select-none overflow-hidden"
    >
      {/* Screen reader only announcement */}
      <span className="sr-only">{rawAnnouncement}</span>

      {/* Subtle edge fade vignettes so ticker smoothly glides in and out */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />

      {/* Marquee ticker wrapper */}
      <div className="relative flex items-center h-8 sm:h-9 overflow-hidden">
        {hasLink ? (
          <Link
            href={linkHref}
            title={`Explore: ${linkHref}`}
            className="flex items-center w-max py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-300"
          >
            <div className="animate-marquee-rtl flex items-center shrink-0">
              <div className="flex items-center shrink-0">
                {repeatedItems.map((text, idx) => renderItem(text, 'track1', idx))}
              </div>
              <div className="flex items-center shrink-0" aria-hidden="true">
                {repeatedItems.map((text, idx) => renderItem(text, 'track2', idx))}
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex items-center w-max py-1">
            <div className="animate-marquee-rtl flex items-center shrink-0">
              <div className="flex items-center shrink-0">
                {repeatedItems.map((text, idx) => renderItem(text, 'track1', idx))}
              </div>
              <div className="flex items-center shrink-0" aria-hidden="true">
                {repeatedItems.map((text, idx) => renderItem(text, 'track2', idx))}
              </div>
            </div>
          </div>
        )}

        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          type="button"
          aria-label="Dismiss announcement"
          title="Dismiss announcement"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors rounded-none"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  );
}
