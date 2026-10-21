'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id') || 'Unknown';

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-lg mx-auto border-2 border-black p-8 md:p-12 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center space-y-6">
        <div className="w-16 h-16 bg-green-500 border-2 border-black rounded-none flex items-center justify-center mx-auto text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-400 block mb-2">
            Transmission Confirmed
          </span>
          <h1 className="text-3xl font-black uppercase italic tracking-tight text-black leading-none mb-3">
            Order Received!
          </h1>
          <p className="text-xs text-neutral-600 font-medium leading-relaxed">
            Thank you for shopping with JeansLoop. Our dispatch team is preparing your package for shipment.
          </p>
        </div>

        <div className="border-2 border-black p-4 bg-neutral-50 text-left space-y-1">
          <p className="text-[10px] font-black uppercase text-neutral-500">Order Reference ID:</p>
          <p className="text-sm font-black font-mono select-all text-black break-all">
            {orderId}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link href="/account" className="flex-1">
            <Button variant="default" size="lg" className="w-full gap-2 text-xs">
              View In Account <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/shop" className="flex-1">
            <Button variant="outline" size="lg" className="w-full gap-2 text-xs">
              <ShoppingBag className="h-4 w-4" /> Keep Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-bold">Loading confirmation...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
