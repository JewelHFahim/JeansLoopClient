'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Package, User, ShieldCheck, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { OrderHistory } from './components/OrderHistory';
import { ProfileForm } from './components/ProfileForm';
import { SecurityTab } from './components/SecurityTab';

type Tab = 'orders' | 'profile' | 'security';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, isInitialized, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Tab>('orders');

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push('/login');
    }
  }, [isInitialized, isAuthenticated, router]);

  if (!isInitialized || !isAuthenticated) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center font-bold uppercase text-xs">
        Checking Authentication...
      </div>
    );
  }

  const tabs = [
    { id: 'orders' as Tab, label: 'My Orders', icon: Package },
    { id: 'profile' as Tab, label: 'Profile Details', icon: User },
    { id: 'security' as Tab, label: 'Security & Password', icon: ShieldCheck },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Top Banner */}
      <div className="border-b border-black/15 pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-400 block mb-1">
            Personal Registry
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-black leading-none">
            {user?.name || 'My Account'}
          </h1>
          <p className="text-[10px] font-mono text-neutral-500 mt-2">{user?.email}</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            logout();
            router.push('/');
          }}
          className="gap-2 text-[10px]"
        >
          <LogOut className="h-3.5 w-3.5" /> Sign Out
        </Button>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-black/15 gap-2 mb-8 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-wider transition-all border-t-2 border-x-2 -mb-[2px] ${
                isActive
                  ? 'border-black bg-black text-white shadow-[4px_0_0_0_rgba(0,0,0,1)]'
                  : 'border-transparent text-neutral-500 hover:text-black'
              }`}
            >
              <Icon className="h-4 w-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel */}
      <div>
        {activeTab === 'orders' && <OrderHistory />}
        {activeTab === 'profile' && <ProfileForm />}
        {activeTab === 'security' && <SecurityTab />}
      </div>
    </div>
  );
}
