'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export function ProfileForm() {
  const { user, login, token } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authApi.updateProfile(formData);
      if (token) {
        login(token, res.data.data);
      }
      toast.success('Profile updated successfully!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-2 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
      <h2 className="text-lg font-black uppercase italic tracking-tight border-b-2 border-black pb-3">
        Profile Settings
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="profName">Full Name</Label>
          <Input
            id="profName"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="profEmail">Email (Non-editable)</Label>
          <Input id="profEmail" value={user?.email || ''} disabled className="bg-neutral-100 text-neutral-400" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="profPhone">Phone Number</Label>
          <Input
            id="profPhone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="profAddress">Default Delivery Address</Label>
          <Input
            id="profAddress"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Street, City, Postal Code"
          />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="gap-2">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Profile Changes'}
      </Button>
    </form>
  );
}
