import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      <span className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-2">
        404 — Error
      </span>
      <h1 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter text-black mb-4">
        Page Not Found
      </h1>
      <p className="text-xs sm:text-sm text-neutral-600 font-medium max-w-md mb-8">
        The page or item you are looking for does not exist or may have been relocated.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-xs font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-800 transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Homepage
      </Link>
    </div>
  );
}
