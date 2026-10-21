'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ShoppingCart, User, Menu, LogOut, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart';
import { useAuthStore } from '@/store/auth';
import { useQuery } from '@tanstack/react-query';
import { settingsApi } from '@/lib/api';

function DesktopNavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const links = [
    {
      href: '/shop?category=jeans',
      label: 'Jeans',
      isActive: pathname === '/shop' && category?.toLowerCase() === 'jeans',
    },
    {
      href: '/shop?category=twill',
      label: 'Twill',
      isActive: pathname === '/shop' && category?.toLowerCase() === 'twill',
    },
    {
      href: '/shop?category=trouser',
      label: 'Trouser',
      isActive: pathname === '/shop' && category?.toLowerCase() === 'trouser',
    },
    {
      href: '/shop',
      label: 'Shop All',
      isActive: pathname === '/shop' && !category,
    },
  ];

  return (
    <div className="hidden items-center gap-8 md:flex">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`uppercase tracking-widest text-[11px] transition-colors pb-0.5 border-b-2 ${
            link.isActive
              ? 'font-black border-black text-black'
              : 'font-bold border-transparent text-black hover:text-neutral-500'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

function DesktopNavLinksFallback() {
  const links = [
    { href: '/shop?category=jeans', label: 'Jeans' },
    { href: '/shop?category=twill', label: 'Twill' },
    { href: '/shop?category=trouser', label: 'Trouser' },
    { href: '/shop', label: 'Shop All' },
  ];

  return (
    <div className="hidden items-center gap-8 md:flex">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-black font-bold uppercase tracking-widest text-[11px] hover:text-neutral-500 transition-colors pb-0.5 border-b-2 border-transparent"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalItems = useCartStore((state) => state.getTotalItems());
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: settingsRes } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const res = await settingsApi.get();
      return res.data.data;
    },
  });

  const settings = settingsRes;
  const brandTitle = settings?.title || 'JeansLoop';
  const brandTagline = settings?.tagline || 'Premium Denim';

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-black bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand */}
        <Link href="/" className="flex flex-col items-start justify-center group gap-0.5">
          {settings?.logo ? (
            <div className="h-8 w-auto">
              <img src={settings.logo} alt={brandTitle} className="h-full w-auto object-contain" />
            </div>
          ) : (
            <>
              <div className="text-2xl font-black tracking-tighter uppercase leading-none text-black">
                {brandTitle}
              </div>
              <span className="hidden sm:block text-[8px] font-medium italic tracking-[0.3em] text-neutral-400 uppercase leading-none mt-1">
                {brandTagline}
              </span>
            </>
          )}
        </Link>

        {/* Desktop Navigation Links */}
        <Suspense fallback={<DesktopNavLinksFallback />}>
          <DesktopNavLinks />
        </Suspense>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {mounted && (
            <>
              {isAuthenticated ? (
                <>
                  <Link href="/account">
                    <Button variant="ghost" size="icon" title="My Account" className="rounded-none">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Sign Out"
                    onClick={logout}
                    className="hidden sm:flex text-neutral-500 hover:text-red-600 rounded-none"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </>
              ) : (
                <Link href="/login" className="hidden sm:block">
                  <Button variant="outline" size="sm" className="text-[10px]">
                    Sign In
                  </Button>
                </Link>
              )}

              {/* Cart Button */}
              <Link href="/cart" className="relative">
                <Button variant="default" size="icon" className="rounded-none relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-none bg-amber-400 text-[10px] font-black text-black border-2 border-black shadow-sm">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-black hover:bg-neutral-100 border-2 border-black ml-1"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden border-t-2 border-black bg-white p-6 space-y-4">
          <div className="flex flex-col space-y-3">
            <Link
              href="/shop?category=jeans"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-black uppercase tracking-wider text-black py-2 border-b border-neutral-100"
            >
              Jeans
            </Link>
            <Link
              href="/shop?category=twill"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-black uppercase tracking-wider text-black py-2 border-b border-neutral-100"
            >
              Twill
            </Link>
            <Link
              href="/shop?category=trouser"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-black uppercase tracking-wider text-black py-2 border-b border-neutral-100"
            >
              Trouser
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-black uppercase tracking-wider text-black py-2 border-b border-neutral-100"
            >
              Shop All
            </Link>
            {isAuthenticated ? (
              <Link
                href="/account"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-black uppercase tracking-wider text-black py-2"
              >
                My Account
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-black uppercase tracking-wider text-black py-2"
              >
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
