'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { useAuthStore } from '@/store/auth';
import { ordersApi, authApi } from '@/lib/api';
import { ShippingForm } from './components/ShippingForm';
import { PaymentSelector } from './components/PaymentSelector';
import { OrderSummary } from './components/OrderSummary';
import { toast } from 'sonner';
import { trackInitiateCheckout, trackPurchase } from '@/lib/fpixel';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { isAuthenticated, user, login } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    altPhone: '',
    street: user?.address || '',
    city: '',
    note: '',
  });

  const [password, setPassword] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'card'>('cod');
  const [bkashSenderNumber, setBkashSenderNumber] = useState('');
  const [bkashTransactionId, setBkashTransactionId] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);

  // Pre-fill user data
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
        street: prev.street || user.address || '',
      }));
    }
  }, [user]);

  // Track Meta Pixel InitiateCheckout on mount
  useEffect(() => {
    if (items.length > 0) {
      trackInitiateCheckout({
        value: getTotalPrice(),
        num_items: items.reduce((sum, item) => sum + item.quantity, 0),
        content_ids: items.map((item) => item.productId),
        currency: 'BDT',
      });
    }
  }, []);

  // Compute shipping fee based on selected district (Dhaka: ৳70, All other districts: ৳140)
  const shippingFee =
    formData.city?.trim().toLowerCase() === 'dhaka'
      ? 70
      : formData.city
      ? 140
      : 0;

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error('Your bag is empty');
      router.push('/shop');
      return;
    }

    if (!termsAccepted) {
      toast.warning('Please agree to the Terms & Conditions');
      return;
    }

    if (!formData.city) {
      toast.error('Please select your delivery district');
      return;
    }

    if (paymentMethod === 'bkash' && (!bkashSenderNumber || !bkashTransactionId)) {
      toast.error('Please provide your bKash phone number and TrxID');
      return;
    }

    setLoading(true);

    try {
      // 1. If guest, register account seamlessly
      if (!isAuthenticated) {
        if (!password || password.length < 8) {
          toast.error('Please choose a password with at least 8 characters');
          setLoading(false);
          return;
        }

        try {
          const regRes = await authApi.register({
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            password,
          });
          login(regRes.data.data.token, regRes.data.data.user);
        } catch (regErr: any) {
          const message = regErr.response?.data?.message || 'Registration failed';
          toast.error(message);
          setLoading(false);
          return;
        }
      }

      // 2. Prepare payload
      const orderPayload = {
        orderItems: items.map((item) => ({
          productId: item.productId,
          variantSku: item.variantSku,
          name: item.name,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          image: item.image,
        })),
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          altPhone: formData.altPhone || undefined,
          street: formData.street,
          city: formData.city,
          country: 'Bangladesh',
          note: formData.note || undefined,
        },
        paymentMethod,
        couponCode: appliedCoupon?.code,
        bkashNumber: paymentMethod === 'bkash' ? bkashSenderNumber : undefined,
        bkashTxnId: paymentMethod === 'bkash' ? bkashTransactionId : undefined,
      };

      // 3. Dispatch to backend API
      const res = await ordersApi.create(orderPayload);
      const createdOrder = res.data.data.order;

      // Track Meta Pixel Purchase event
      trackPurchase({
        order_id: createdOrder._id,
        value: createdOrder.totalAmount || (getTotalPrice() + shippingFee),
        num_items: items.reduce((sum, item) => sum + item.quantity, 0),
        content_ids: items.map((item) => item.productId),
        currency: 'BDT',
      });

      clearCart();
      toast.success('Order placed successfully!');
      router.push(`/order-success?id=${createdOrder._id}`);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to place order. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-sm font-bold uppercase">Your bag is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="border-b border-black/15 pb-6 mb-8">
        <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-black leading-none">
          Checkout Console
        </h1>
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 mt-2">
          Verify Address & Secure Dispatch
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Cols: Shipping & Payment */}
        <div className="lg:col-span-2 space-y-8">
          <ShippingForm
            formData={formData}
            onChange={handleFieldChange}
            isAuthenticated={isAuthenticated}
            password={password}
            onPasswordChange={setPassword}
          />

          <PaymentSelector
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            bkashSenderNumber={bkashSenderNumber}
            setBkashSenderNumber={setBkashSenderNumber}
            bkashTransactionId={bkashTransactionId}
            setBkashTransactionId={setBkashTransactionId}
          />
        </div>

        {/* Right Col: Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary
            items={items}
            subtotal={getTotalPrice()}
            shippingFee={shippingFee}
            city={formData.city}
            appliedCoupon={appliedCoupon}
            setAppliedCoupon={setAppliedCoupon}
            loading={loading}
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
          />
        </div>
      </form>
    </div>
  );
}
