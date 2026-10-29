'use client';

import { useState, useEffect } from 'react';
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
  } = useSettings();

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem('jl_announcement_dismissed');
      if (dismissed === 'true') {
        setIsDismissed(true);
      }
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDismissed(true);
    try {
      sessionStorage.setItem('jl_announcement_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  if (isDismissed) {
    return null;
  }

  // Use client settings if available, else initial server props
  const announcementText = (clientAnnouncement ?? initialAnnouncement ?? '').trim();
  const isEnabled = clientEnabled !== undefined ? clientEnabled : initialEnabled;
  const linkHref = (clientLink ?? initialLink ?? '').trim();

  // Hide if disabled in admin or empty text
  if (!isEnabled || !announcementText) {
    return null;
  }

  const hasLink = Boolean(linkHref);

  const Content = (
    <div className="flex items-center justify-center gap-2 px-6 py-2 text-center">
      <Megaphone className="h-3.5 w-3.5 flex-shrink-0 text-amber-300 animate-pulse" />
      <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-amber-300 drop-shadow-sm">
        {announcementText}
      </span>
      {hasLink && (
        <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-black underline underline-offset-4 text-white hover:text-amber-200 uppercase tracking-widest ml-1 transition-colors">
          <span>Explore</span>
          <ArrowRight className="h-3 w-3" />
        </span>
      )}
    </div>
  );

  return (
    <div className="relative z-50 w-full bg-black text-white border-b-2 border-black transition-all duration-300">
      <div className="container mx-auto relative flex items-center justify-center">
        {hasLink ? (
          <Link
            href={linkHref}
            className="w-full flex items-center justify-center group hover:bg-neutral-900 transition-colors"
          >
            {Content}
          </Link>
        ) : (
          <div className="w-full">{Content}</div>
        )}

        {/* Optional Dismiss button */}
        <button
          onClick={handleDismiss}
          type="button"
          aria-label="Dismiss announcement"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors rounded-none"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
