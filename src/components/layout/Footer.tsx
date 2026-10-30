'use client';

import Link from 'next/link';
import { Facebook, Instagram, Youtube, MessageCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';

export function Footer() {
  const { siteName: brandTitle, tagline, address, phone, email, businessHours, logo, socialLinks } = useSettings();

  return (
    <footer className="bg-black text-neutral-300 border-t-4 border-black">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & About */}
          <div>
            <div className="flex flex-col items-start gap-2 mb-6">
              {logo ? (
                <img src={logo} alt={brandTitle} className="h-8 w-auto brightness-0 invert" />
              ) : (
                <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">
                  {brandTitle}
                </h3>
              )}
              <p className="text-xs text-neutral-400 font-medium leading-relaxed mt-2">{tagline}</p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.facebook && (
                <Link href={socialLinks.facebook} target="_blank" className="hover:text-white transition-colors">
                  <Facebook className="h-4 w-4" />
                </Link>
              )}
              {socialLinks.instagram && (
                <Link href={socialLinks.instagram} target="_blank" className="hover:text-white transition-colors">
                  <Instagram className="h-4 w-4" />
                </Link>
              )}
              {socialLinks.youtube && (
                <Link href={socialLinks.youtube} target="_blank" className="hover:text-white transition-colors">
                  <Youtube className="h-4 w-4" />
                </Link>
              )}
              {socialLinks.whatsapp && (
                <Link href={`https://wa.me/${socialLinks.whatsapp.replace(/\D/g, '')}`} target="_blank" className="hover:text-white transition-colors">
                  <MessageCircle className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="mb-6 text-[10px] font-black uppercase tracking-[0.25em] text-white">Catalog</h4>
            <ul className="space-y-3 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/shop?category=jeans" className="hover:text-white transition-colors">
                  Denim Jeans
                </Link>
              </li>
              <li>
                <Link href="/shop?category=twill" className="hover:text-white transition-colors">
                  Twill Pants
                </Link>
              </li>
              <li>
                <Link href="/shop?category=formal" className="hover:text-white transition-colors">
                  Formal
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="mb-6 text-[10px] font-black uppercase tracking-[0.25em] text-white">Customer Care</h4>
            <ul className="space-y-3 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Track Orders
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="mb-6 text-[10px] font-black uppercase tracking-[0.25em] text-white">Contact</h4>
            <ul className="space-y-4 text-xs font-medium text-neutral-400">
              {address && (
                <li className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-white" />
                  <span>{address}</span>
                </li>
              )}
              {phone && (
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-white" />
                  <span>{phone}</span>
                </li>
              )}
              {email && (
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-white" />
                  <span className="break-all">{email}</span>
                </li>
              )}
              {businessHours && (
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 shrink-0 text-white" />
                  <span>{businessHours}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
          <p>&copy; {new Date().getFullYear()} {brandTitle}. All rights reserved.</p>
          <div className="hidden md:flex items-center gap-6">
            <span>Fast Nationwide Delivery</span>
            <span>Cash on Delivery Available</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
