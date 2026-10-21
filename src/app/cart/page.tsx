'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-md mx-auto border-2 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-black" />
          <h1 className="text-2xl font-black uppercase italic tracking-tight mb-2">
            Your Bag Is Empty
          </h1>
          <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-6">
            Explore our collections and add your favourite pieces.
          </p>
          <Link href="/shop">
            <Button size="lg" className="w-full">
              Explore Collections
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="border-b-2 border-black pb-6 mb-8">
        <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-black leading-none">
          Shopping Bag
        </h1>
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 mt-2">
          {items.length} {items.length === 1 ? 'Item' : 'Items'} Selected
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const itemKey = `${item.productId}_${item.variantSku}_${item.size}_${item.color}`;

            return (
              <div
                key={itemKey}
                className="border-2 border-black p-4 sm:p-6 bg-white flex flex-col sm:flex-row gap-6 items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                {/* Image */}
                <div className="relative w-24 h-32 flex-shrink-0 bg-neutral-100 border border-neutral-200">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400">
                    SKU: {item.variantSku}
                  </p>
                  <h3 className="text-sm font-black uppercase tracking-tight text-black">
                    {item.name}
                  </h3>
                  <p className="text-[10px] font-bold uppercase text-neutral-500">
                    Size: {item.size} / Color: {item.color}
                  </p>
                  <p className="text-base font-black text-black">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>

                {/* Quantity Controls & Delete */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                  <div className="flex items-center border-2 border-black bg-white">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.variantSku,
                          item.size,
                          item.color,
                          item.quantity - 1
                        )
                      }
                      className="w-8 h-8 flex items-center justify-center font-black hover:bg-neutral-100"
                    >
                      -
                    </button>
                    <span className="w-10 h-8 flex items-center justify-center font-black text-xs border-x-2 border-black bg-black text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.variantSku,
                          item.size,
                          item.color,
                          item.quantity + 1
                        )
                      }
                      className="w-8 h-8 flex items-center justify-center font-black hover:bg-neutral-100"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      removeItem(item.productId, item.variantSku, item.size, item.color)
                    }
                    className="text-red-500 hover:text-red-700 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider"
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border-2 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
            <h2 className="text-lg font-black uppercase italic tracking-tight border-b-2 border-black pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs font-bold uppercase">
              <div className="flex justify-between">
                <span className="text-neutral-500">Subtotal:</span>
                <span className="font-black text-black">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Estimated Delivery:</span>
                <span className="text-[10px] text-neutral-400">Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t-2 border-black pt-4 flex justify-between items-baseline">
              <span className="text-sm font-black uppercase">Subtotal</span>
              <span className="text-xl font-black text-black">{formatPrice(subtotal)}</span>
            </div>

            <Link href="/checkout" className="block">
              <Button size="lg" className="w-full gap-2">
                Proceed To Checkout <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <p className="text-[9px] text-neutral-400 font-bold text-center uppercase tracking-wider">
              Taxes & delivery fees calculated at next step.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
