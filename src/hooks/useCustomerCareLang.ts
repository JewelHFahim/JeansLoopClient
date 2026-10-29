'use client';

import { useState, useEffect } from 'react';

export type CustomerCareLang = 'en' | 'bn';

const STORAGE_KEY = 'customer_care_lang';

export function useCustomerCareLang() {
  const [lang, setLangState] = useState<CustomerCareLang>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as CustomerCareLang | null;
      if (saved === 'en' || saved === 'bn') {
        setLangState(saved);
      }
    } catch {}

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === 'en' || e.newValue === 'bn')) {
        setLangState(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const setLang = (newLang: CustomerCareLang) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      // Dispatch custom event so other components in the same window update immediately
      window.dispatchEvent(new Event('customer_care_lang_change'));
    } catch {}
  };

  useEffect(() => {
    const handleCustomChange = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY) as CustomerCareLang | null;
        if (saved && (saved === 'en' || saved === 'bn')) {
          setLangState(saved);
        }
      } catch {}
    };

    window.addEventListener('customer_care_lang_change', handleCustomChange);
    return () => window.removeEventListener('customer_care_lang_change', handleCustomChange);
  }, []);

  return { lang, setLang };
}
