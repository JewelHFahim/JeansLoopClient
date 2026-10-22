'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Banknote, CreditCard, Smartphone } from 'lucide-react';

interface PaymentSelectorProps {
  paymentMethod: 'cod' | 'bkash' | 'card';
  setPaymentMethod: (method: 'cod' | 'bkash' | 'card') => void;
  bkashSenderNumber: string;
  setBkashSenderNumber: (val: string) => void;
  bkashTransactionId: string;
  setBkashTransactionId: (val: string) => void;
}

const BKASH_NUMBER = process.env.NEXT_PUBLIC_BKASH_NUMBER || '01911209322';

export function PaymentSelector({
  paymentMethod,
  setPaymentMethod,
  bkashSenderNumber,
  setBkashSenderNumber,
  bkashTransactionId,
  setBkashTransactionId,
}: PaymentSelectorProps) {
  return (
    <div className="border-2 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
      <h2 className="text-lg font-black uppercase italic tracking-tight border-b border-black/15 pb-3">
        2. Payment Method
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Cash on Delivery */}
        <button
          type="button"
          onClick={() => setPaymentMethod('cod')}
          className={`p-4 border-2 text-left transition-all flex flex-col justify-between ${
            paymentMethod === 'cod'
              ? 'border-black bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]'
              : 'border-neutral-200 bg-white text-black hover:border-black'
          }`}
        >
          <Banknote className="h-6 w-6 mb-2" />
          <div>
            <p className="text-xs font-black uppercase">Cash on Delivery</p>
            <p className="text-[10px] opacity-75 mt-0.5">Pay when you receive</p>
          </div>
        </button>

        {/* bKash Manual */}
        <button
          type="button"
          onClick={() => setPaymentMethod('bkash')}
          className={`p-4 border-2 text-left transition-all flex flex-col justify-between ${
            paymentMethod === 'bkash'
              ? 'border-black bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]'
              : 'border-neutral-200 bg-white text-black hover:border-black'
          }`}
        >
          <Smartphone className="h-6 w-6 mb-2" />
          <div>
            <p className="text-xs font-black uppercase">bKash Payment</p>
            <p className="text-[10px] opacity-75 mt-0.5">Send Money / Merchant</p>
          </div>
        </button>

        {/* Card via Stripe */}
        <button
          type="button"
          onClick={() => setPaymentMethod('card')}
          className={`p-4 border-2 text-left transition-all flex flex-col justify-between ${
            paymentMethod === 'card'
              ? 'border-black bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]'
              : 'border-neutral-200 bg-white text-black hover:border-black'
          }`}
        >
          <CreditCard className="h-6 w-6 mb-2" />
          <div>
            <p className="text-xs font-black uppercase">Debit / Credit Card</p>
            <p className="text-[10px] opacity-75 mt-0.5">Visa / Mastercard</p>
          </div>
        </button>
      </div>

      {/* bKash Details */}
      {paymentMethod === 'bkash' && (
        <div className="border-2 border-black p-4 bg-amber-50 space-y-4 animate-in fade-in">
          <div className="space-y-1">
            <p className="text-xs font-black uppercase text-black">
              bKash Merchant / Personal Number:
            </p>
            <p className="text-lg font-black text-pink-600 tracking-wider select-all">
              {BKASH_NUMBER}
            </p>
            <p className="text-[10px] font-bold text-neutral-600">
              Please send the total order amount to this number and provide your sender phone number and TrxID below:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="bkashSender">Your bKash Number *</Label>
              <Input
                id="bkashSender"
                placeholder="01XXXXXXXXX"
                value={bkashSenderNumber}
                onChange={(e) => setBkashSenderNumber(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bkashTxn">Transaction ID (TrxID) *</Label>
              <Input
                id="bkashTxn"
                placeholder="e.g. 9B47XKZ..."
                value={bkashTransactionId}
                onChange={(e) => setBkashTransactionId(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
