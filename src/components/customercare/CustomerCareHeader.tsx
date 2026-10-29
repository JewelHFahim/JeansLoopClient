'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Languages, Globe } from 'lucide-react';
import { CustomerCareLang } from '@/hooks/useCustomerCareLang';

interface CustomerCareHeaderProps {
  badge: { en: string; bn: string };
  title: { en: string; bn: string };
  description: { en: string; bn: string };
  lang: CustomerCareLang;
  setLang: (lang: CustomerCareLang) => void;
}

const PAGES = [
  { href: '/shipping', labelEn: 'Shipping', labelBn: 'শিপিং' },
  { href: '/returns', labelEn: 'Returns', labelBn: 'রিটার্ন' },
  { href: '/privacy', labelEn: 'Privacy', labelBn: 'প্রাইভেসি' },
  { href: '/terms', labelEn: 'Terms', labelBn: 'শর্তাবলী' },
  { href: '/contact', labelEn: 'Contact', labelBn: 'যোগাযোগ' },
];

export function CustomerCareHeader({
  badge,
  title,
  description,
  lang,
  setLang,
}: CustomerCareHeaderProps) {
  const pathname = usePathname();

  return (
    <div>
      {/* Top Breadcrumb & Language Switcher Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
          <Link href="/" className="hover:text-black transition-colors">
            {lang === 'bn' ? 'হোম' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-black">{title[lang]}</span>
        </nav>

        {/* Neo-brutalist Language Switcher */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="inline-flex items-center gap-1.5 border-2 border-black bg-white p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="pl-1.5 pr-0.5 text-neutral-400">
              <Globe className="w-3.5 h-3.5 text-black" />
            </span>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-3 py-1 text-[11px] font-black uppercase tracking-wider transition-all ${
                lang === 'en'
                  ? 'bg-black text-white'
                  : 'text-neutral-500 hover:text-black hover:bg-neutral-100'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang('bn')}
              className={`px-3 py-1 text-[11px] font-bold tracking-wide transition-all ${
                lang === 'bn'
                  ? 'bg-black text-white'
                  : 'text-neutral-500 hover:text-black hover:bg-neutral-100'
              }`}
            >
              বাংলা
            </button>
          </div>
        </div>
      </div>

      {/* Page Title & Badges */}
      <div className="border-b border-black/15 pb-8 mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-block bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
            {badge[lang]}
          </span>
          <span className="inline-flex items-center gap-1 border border-neutral-300 bg-neutral-100 text-neutral-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
            <Languages className="w-3 h-3 text-neutral-500" />
            {lang === 'bn' ? 'বাংলা সংস্করণ' : 'EN & বাংলা Available'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-black leading-none">
          {title[lang]}
        </h1>
        <p className="text-xs md:text-sm text-neutral-600 font-medium mt-3 max-w-2xl leading-relaxed">
          {description[lang]}
        </p>

        {/* Quick Cross-Navigation Pills */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-dashed border-neutral-200">
          <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 self-center mr-1">
            {lang === 'bn' ? 'নীতিমালা লিঙ্ক:' : 'Customer Care:'}
          </span>
          {PAGES.map((page) => {
            const isActive = pathname === page.href;
            return (
              <Link
                key={page.href}
                href={page.href}
                className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 border transition-all ${
                  isActive
                    ? 'border-black bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    : 'border-neutral-300 bg-white text-neutral-600 hover:border-black hover:text-black'
                }`}
              >
                {lang === 'bn' ? page.labelBn : page.labelEn}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
