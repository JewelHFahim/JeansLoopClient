'use client';

import { useState } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { X } from 'lucide-react';

export function WhatsAppButton() {
  const { whatsappClean, phone, siteName } = useSettings();
  const [isBubbleDismissed, setIsBubbleDismissed] = useState(false);

  // Determine active contact number
  let targetNumber = whatsappClean;
  if (!targetNumber && phone) {
    targetNumber = phone.replace(/\D/g, '');
  }
  if (!targetNumber) {
    targetNumber = '8801911209322';
  }
  if (targetNumber.startsWith('01') && targetNumber.length === 11) {
    targetNumber = '88' + targetNumber;
  }

  const message = encodeURIComponent(
    `Hello ${siteName || 'JeansLoop'}, I would like to inquire about your products.`
  );
  const whatsappUrl = `https://wa.me/${targetNumber}?text=${message}`;

  return (
    <aside
      aria-label="WhatsApp Customer Support"
      className="fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8 print:hidden flex items-center gap-3"
    >
      {/* Creative Interactive Chat Prompt Bubble (Desktop) */}
      {!isBubbleDismissed && (
        <div className="hidden md:flex items-center gap-2 bg-white text-black border-2 border-black px-3.5 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-in fade-in slide-in-from-right-4 duration-300 relative select-none group">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-black uppercase tracking-wider text-black hover:text-emerald-700 transition-colors"
          >
            Need Help? Chat with us 👋
          </a>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsBubbleDismissed(true);
            }}
            className="text-neutral-400 hover:text-black p-0.5 ml-1 transition-colors cursor-pointer"
            title="Dismiss message"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          {/* Arrow pointing to the circular button */}
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-l-[8px] border-l-black" />
        </div>
      )}

      {/* Round Circular Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:scale-105 active:scale-95 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-pointer select-none"
      >
        {/* Soft Radiant Halo Pulse */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none group-hover:opacity-50" />

        {/* Live Support Online Notification Badge */}
        <span className="absolute top-0 right-0 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-black border-2 border-white items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
          </span>
        </span>

        {/* Official WhatsApp SVG Vector Icon in Pure White */}
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 fill-white drop-shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.979-.276-.1-.477-.15-.678.15-.201.3-.778.979-.954 1.18-.176.2-.352.226-.653.075s-1.27-.468-2.42-1.493c-.894-.798-1.498-1.784-1.674-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.101-.2.05-.376-.025-.527-.075-.15-.678-1.634-.929-2.239-.245-.588-.493-.508-.678-.518l-.578-.01c-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.511 1.079 2.912 1.23 3.113c.15.201 2.123 3.242 5.143 4.547.719.311 1.28.497 1.718.636.723.23 1.381.197 1.901.12.579-.087 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351zM12.04 2C6.54 2 2.08 6.46 2.08 11.96c0 1.99.59 3.84 1.61 5.39L2 22l4.82-1.57c1.49.92 3.23 1.45 5.22 1.45 5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm0 18.23c-1.75 0-3.37-.53-4.73-1.44l-.34-.23-2.86.93.95-2.79-.22-.35a8.17 8.17 0 0 1-1.26-4.39c0-4.52 3.68-8.2 8.2-8.2s8.2 3.68 8.2 8.2-3.68 8.2-8.2 8.2z" />
        </svg>
      </a>
    </aside>
  );
}
