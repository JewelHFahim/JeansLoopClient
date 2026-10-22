'use client';

import { X, Package } from 'lucide-react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import type { Order } from '@/lib/api-types';

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
}

export function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white border-4 border-black p-6 md:p-8 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-black/15 pb-4 mb-6">
          <div>
            <span className="text-[10px] font-black uppercase text-neutral-400">Order Inspection</span>
            <h2 className="text-xl font-black uppercase italic tracking-tight text-black">
              Order #{order._id.slice(-6).toUpperCase()}
            </h2>
            <p className="text-[10px] font-mono text-neutral-500 mt-1 select-all">{order._id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 border-2 border-black hover:bg-black hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Status & Delivery Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-2 border-black p-4 mb-6 bg-neutral-50 text-xs">
          <div>
            <p className="text-[9px] font-black uppercase text-neutral-400">Status</p>
            <span className="inline-block bg-black text-white px-2 py-0.5 font-black text-[10px] uppercase mt-1">
              {order.status}
            </span>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase text-neutral-400">Payment</p>
            <p className="font-bold uppercase mt-1">
              {order.paymentMethod.toUpperCase()} — {order.isPaid ? 'PAID' : 'PENDING'}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-[9px] font-black uppercase text-neutral-400">Delivery Address</p>
            <p className="font-bold mt-1">
              {order.shippingAddress.fullName} ({order.shippingAddress.phone})<br />
              {order.shippingAddress.street}, {order.shippingAddress.city}
            </p>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-black">Purchased Items</h3>
          <div className="border-2 border-black divide-y divide-black/15">
            {order.items.map((item, idx) => (
              <div key={idx} className="p-3 flex items-center gap-4 bg-white">
                <div className="relative w-12 h-14 flex-shrink-0 bg-neutral-100 border border-neutral-200">
                  {item.image && (
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black uppercase truncate">{item.name}</p>
                  <p className="text-[10px] text-neutral-400 font-bold uppercase">
                    Size: {item.size}{item.color && item.color !== 'Default' ? ` / Color: ${item.color}` : ''} / Qty: {item.quantity}
                  </p>
                </div>
                <span className="text-xs font-black">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="border-t border-black/15 pt-4 space-y-1.5 text-xs font-bold uppercase">
          <div className="flex justify-between text-neutral-500">
            <span>Items Subtotal:</span>
            <span>{formatPrice(order.itemsPrice)}</span>
          </div>
          <div className="flex justify-between text-neutral-500">
            <span>Shipping Fee:</span>
            <span>{formatPrice(order.shippingPrice)}</span>
          </div>
          {order.discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Coupon Discount:</span>
              <span>-{formatPrice(order.discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm font-black text-black pt-2 border-t border-neutral-200">
            <span>Total:</span>
            <span>{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
