'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const BANGLADESH_DISTRICTS = [
  'Bagerhat', 'Bandarban', 'Barguna', 'Barishal', 'Bhola', 'Bogura', 'Brahmanbaria', 'Chandpur',
  'Chapai Nawabganj', 'Chattogram', 'Chuadanga', 'Cox\'s Bazar', 'Cumilla', 'Dhaka', 'Dinajpur',
  'Faridpur', 'Feni', 'Gaibandha', 'Gazipur', 'Gopalganj', 'Habiganj', 'Jamalpur', 'Jashore',
  'Jhalokati', 'Jhenaidah', 'Joypurhat', 'Khagrachhari', 'Khulna', 'Kishoreganj', 'Kurigram',
  'Kushtia', 'Lakshmipur', 'Lalmonirhat', 'Madaripur', 'Magura', 'Manikganj', 'Meherpur',
  'Moulvibazar', 'Munshiganj', 'Mymensingh', 'Naogaon', 'Narail', 'Narayanganj', 'Narsingdi',
  'Natore', 'Netrokona', 'Nilphamari', 'Noakhali', 'Pabna', 'Panchagarh', 'Patuakhali', 'Pirojpur',
  'Rajbari', 'Rajshahi', 'Rangamati', 'Rangpur', 'Satkhira', 'Shariatpur', 'Sherpur', 'Sirajganj',
  'Sunamganj', 'Sylhet', 'Tangail', 'Thakurgaon',
].sort();

interface ShippingFormProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    altPhone: string;
    street: string;
    city: string;
    note: string;
  };
  onChange: (field: string, value: string) => void;
  isAuthenticated: boolean;
  password?: string;
  onPasswordChange?: (value: string) => void;
}

export function ShippingForm({
  formData,
  onChange,
  isAuthenticated,
  password,
  onPasswordChange,
}: ShippingFormProps) {
  return (
    <div className="border-2 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
      <h2 className="text-lg font-black uppercase italic tracking-tight border-b border-black/15 pb-3">
        1. Shipping Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            placeholder="Recipient's Name"
            value={formData.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            required
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone Number (11 digits) *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="01XXXXXXXXX"
            value={formData.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@domain.com"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            required
          />
        </div>

        {/* Alternative Phone */}
        <div className="space-y-1.5">
          <Label htmlFor="altPhone">Alternate Phone (Optional)</Label>
          <Input
            id="altPhone"
            type="tel"
            placeholder="Optional backup phone"
            value={formData.altPhone}
            onChange={(e) => onChange('altPhone', e.target.value)}
          />
        </div>

        {/* City/District dropdown */}
        <div className="space-y-1.5">
          <Label htmlFor="city">City / District *</Label>
          <select
            id="city"
            value={formData.city}
            onChange={(e) => onChange('city', e.target.value)}
            required
            className="flex h-12 w-full rounded-none border-2 border-black bg-white px-4 py-2 text-xs font-bold uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
          >
            <option value="">Select District</option>
            {BANGLADESH_DISTRICTS.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Password field if not authenticated */}
        {!isAuthenticated && onPasswordChange && (
          <div className="space-y-1.5">
            <Label htmlFor="password">Create Password (For tracking) *</Label>
            <Input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              value={password || ''}
              onChange={(e) => onPasswordChange(e.target.value)}
              required
            />
          </div>
        )}
      </div>

      {/* Street / Address */}
      <div className="space-y-1.5">
        <Label htmlFor="street">Detailed Delivery Address *</Label>
        <Input
          id="street"
          placeholder="House #, Road #, Area, Landmark"
          value={formData.street}
          onChange={(e) => onChange('street', e.target.value)}
          required
        />
      </div>

      {/* Delivery Note */}
      <div className="space-y-1.5">
        <Label htmlFor="note">Delivery Instructions (Optional)</Label>
        <Input
          id="note"
          placeholder="e.g. Please call before arriving"
          value={formData.note}
          onChange={(e) => onChange('note', e.target.value)}
        />
      </div>
    </div>
  );
}
