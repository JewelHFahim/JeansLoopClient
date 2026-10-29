'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';
import { couponsApi } from '@/lib/api';
import { toast } from 'sonner';
import { Loader2, ShieldCheck, Tag } from 'lucide-react';
import type { CartItem } from '@/store/cart';
import { useSettings } from '@/hooks/useSettings';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  city: string;
  appliedCoupon: { code: string; discountAmount: number } | null;
  setAppliedCoupon: (coupon: { code: string; discountAmount: number } | null) => void;
  loading: boolean;
  termsAccepted: boolean;
  setTermsAccepted: (accepted: boolean) => void;
}

export function OrderSummary({
  items,
  subtotal,
  shippingFee,
  city,
  appliedCoupon,
  setAppliedCoupon,
  loading,
  termsAccepted,
  setTermsAccepted,
}: OrderSummaryProps) {
  const { siteName } = useSettings();
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  const discountAmount = appliedCoupon?.discountAmount || 0;
  const grandTotal = Math.max(0, subtotal + shippingFee - discountAmount);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);

    try {
      const res = await couponsApi.validate(couponCode.trim(), subtotal);
      setAppliedCoupon({
        code: res.data.data.code,
        discountAmount: res.data.data.discountAmount,
      });
      toast.success(`Coupon "${res.data.data.code}" applied!`);
      setCouponCode('');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Invalid or expired coupon code';
      toast.error(message);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    toast.info('Coupon removed');
  };

  return (
    <div className="border-2 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
      <h2 className="text-lg font-black uppercase italic tracking-tight border-b border-black/15 pb-3">
        Order Summary ({items.length})
      </h2>

      {/* Item thumbnails */}
      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {items.map((item) => {
          const itemKey = `${item.productId}_${item.variantSku}_${item.size}_${item.color}`;
          return (
            <div key={itemKey} className="flex items-center gap-3 border-b border-neutral-100 pb-2">
              <div className="relative w-12 h-14 flex-shrink-0 bg-neutral-100 border border-neutral-200">
                {item.image && (
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black uppercase truncate text-black">{item.name}</p>
                <p className="text-[10px] text-neutral-400 font-bold uppercase">
                  {item.size}{item.color && item.color !== 'Default' ? ` • ${item.color}` : ''} × {item.quantity}
                </p>
              </div>
              <span className="text-xs font-black text-black">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Coupon Box */}
      <div className="border-t border-black/15 pt-4">
        {appliedCoupon ? (
          <div className="flex justify-between items-center bg-green-50 border border-green-600 p-2 text-xs">
            <div className="flex items-center gap-2 text-green-700 font-bold">
              <Tag className="h-4 w-4" />
              <span>Coupon: {appliedCoupon.code} (-{formatPrice(appliedCoupon.discountAmount)})</span>
            </div>
            <button
              type="button"
              onClick={handleRemoveCoupon}
              className="text-[10px] font-black uppercase text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              placeholder="COUPON CODE"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              className="h-10 text-[10px]"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={couponLoading || !couponCode.trim()}
              onClick={handleApplyCoupon}
              className="h-10 px-4 text-[10px]"
            >
              {couponLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Apply'}
            </Button>
          </div>
        )}
      </div>

      {/* Breakdown */}
      <div className="border-t border-black/15 pt-4 space-y-2 text-xs font-bold uppercase">
        <div className="flex justify-between">
          <span className="text-neutral-500">Items Subtotal:</span>
          <span className="text-black">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-neutral-500">
            Delivery Fee {city ? `(${city})` : ''}:
          </span>
          <span className="text-black">
            {city ? formatPrice(shippingFee) : 'Select district'}
          </span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Coupon Discount:</span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}
      </div>

      {/* Grand Total */}
      <div className="border-t border-black/15 pt-4 flex justify-between items-baseline">
        <span className="text-sm font-black uppercase">Total Amount</span>
        <span className="text-2xl font-black text-black">{formatPrice(grandTotal)}</span>
      </div>

      {/* Terms checkbox */}
      <div className="border-t border-black/15 pt-4 space-y-4">
        <label className="flex items-start gap-2 cursor-pointer text-[10px] font-bold uppercase text-neutral-600">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="w-4 h-4 rounded-none border-2 border-black mt-0.5"
            required
          />
          <span>
            I agree to the{' '}
            <Link href="/terms" target="_blank" className="underline text-black hover:text-neutral-600">
              Terms of Service
            </Link>{' '}
            &{' '}
            <Link href="/privacy" target="_blank" className="underline text-black hover:text-neutral-600">
              Privacy Policy
            </Link>{' '}
            of {siteName}.
          </span>
        </label>

        <Button type="submit" size="lg" disabled={loading} className="w-full">
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Processing Order...
            </span>
          ) : (
            'Confirm & Complete Order'
          )}
        </Button>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[9px] font-black uppercase text-neutral-400">
        <ShieldCheck className="h-4 w-4 text-black" />
        <span>End-to-end encrypted checkout</span>
      </div>
    </div>
  );
}
