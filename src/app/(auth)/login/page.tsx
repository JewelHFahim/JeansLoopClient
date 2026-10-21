'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authApi.login({ email, password });
      const { user, token } = res.data.data;
      login(token, user);
      toast.success(`Welcome back, ${user.name}!`);
      router.push('/account');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Invalid email or password';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center">
      <div className="w-full max-w-md border-2 border-black p-8 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] space-y-8">
        <div className="border-b-2 border-black pb-4 text-center">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-400 block mb-1">
            Access Portal
          </span>
          <h1 className="text-3xl font-black uppercase italic tracking-tight text-black leading-none">
            Sign In
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" size="lg" disabled={loading} className="w-full gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Authenticate / Login'}
          </Button>
        </form>

        <div className="border-t-2 border-black pt-4 text-center text-xs font-bold uppercase">
          <p className="text-neutral-500">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-black underline font-black">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
