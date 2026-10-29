import * as React from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  className?: string;
  text?: string;
  variant?: 'inline' | 'page' | 'overlay' | 'dots';
}

/** Three bouncing dots */
function DotLoader({ className }: { className?: string }) {
  return (
    <span className={cn('dot-loader inline-flex items-end gap-[5px]', className)}>
      <span />
      <span />
      <span />
    </span>
  );
}

/**
 * Unified Loader component.
 *
 * variant="inline"  → compact spinner + label (buttons, small contexts)
 * variant="dots"    → minimal three-dot bounce (inline, no text)
 * variant="page"    → centered full-section loader (route transitions)
 * variant="overlay" → fixed full-screen backdrop (blocking actions)
 */
export function Loader({ className, text, variant = 'inline' }: LoaderProps) {
  /* ── Full-screen overlay ───────────────────────────────── */
  if (variant === 'overlay') {
    return (
      <div className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-white/80 backdrop-blur-[2px]">
        <div className="flex flex-col items-center gap-5">
          {/* Animated square */}
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-[3px] border-black animate-[spin_1s_linear_infinite]" />
            <div className="absolute inset-[4px] bg-black animate-pulse" />
          </div>
          {text && (
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black">
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }

  /* ── Centered page section loader ─────────────────────── */
  if (variant === 'page') {
    return (
      <div className={cn('min-h-[55vh] flex flex-col items-center justify-center gap-6 bg-white', className)}>
        {/* Brand wordmark pulse */}
        <div className="flex flex-col items-center gap-4">
          {/* Animated horizontal line + square combo */}
          <div className="relative flex items-center gap-3">
            <div className="w-8 h-[2px] bg-black origin-right animate-[scaleX_1s_ease-in-out_infinite_alternate]" />
            <div
              className="w-4 h-4 border-[2.5px] border-black animate-[spin_0.9s_linear_infinite]"
              style={{ borderTopColor: 'transparent' }}
            />
            <div className="w-8 h-[2px] bg-black origin-left animate-[scaleX_1s_ease-in-out_infinite_alternate_reverse]" />
          </div>

          {text && (
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-black/50">
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }

  /* ── Three bouncing dots ───────────────────────────────── */
  if (variant === 'dots') {
    return <DotLoader className={cn('text-black', className)} />;
  }

  /* ── Inline spinner (default) ─────────────────────────── */
  return (
    <span className={cn('inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-current', className)}>
      <span
        className="inline-block w-3.5 h-3.5 border-[2px] border-current animate-[spin_0.75s_linear_infinite]"
        style={{ borderTopColor: 'transparent' }}
        aria-hidden="true"
      />
      {text && <span>{text}</span>}
    </span>
  );
}

export { DotLoader };
