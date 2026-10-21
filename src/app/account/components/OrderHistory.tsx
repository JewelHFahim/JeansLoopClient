'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Eye, Package, Loader2 } from 'lucide-react';
import { OrderDetailsModal } from './OrderDetailsModal';
import type { Order } from '@/lib/api-types';

export function OrderHistory() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { data: orders, isLoading } = useQuery({
    queryKey: ['my-orders'],
    queryFn: async () => {
      const res = await ordersApi.getMyOrders();
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-black" />
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="border-2 border-black p-8 text-center bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <Package className="w-10 h-10 mx-auto text-neutral-400 mb-2" />
        <h3 className="text-lg font-black uppercase italic tracking-tight text-black mb-1">
          No Orders Placed Yet
        </h3>
        <p className="text-xs text-neutral-400 font-bold uppercase">
          Your purchase history will appear here once you place an order.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border-2 border-black p-4 md:p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-black uppercase font-mono">
                  #{order._id.slice(-6).toUpperCase()}
                </span>
                <span className="bg-black text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-wider">
                  {order.status}
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 font-bold uppercase">
                {new Date(order.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })} — {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
              </p>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-6">
              <span className="text-base font-black text-black">
                {formatPrice(order.totalAmount)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedOrder(order)}
                className="gap-2 text-[10px]"
              >
                <Eye className="h-3.5 w-3.5" /> Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </>
  );
}
