import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '../lib/api';
import type { UserProfile } from '../lib/api-types';

interface AuthStore {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (token: string, user: UserProfile) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isInitialized: false,
      login: (token, user) => {
        try {
          localStorage.setItem('token', token);
        } catch {}
        set({ token, user, isAuthenticated: true, isInitialized: true });
      },
      logout: () => {
        try {
          localStorage.removeItem('token');
        } catch {}
        authApi.logout().catch(() => {});
        set({ token: null, user: null, isAuthenticated: false, isInitialized: true });
      },
      checkAuth: async () => {
        let token: string | null = null;
        try {
          token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        } catch {}
        if (!token) {
          set({ token: null, user: null, isAuthenticated: false, isInitialized: true });
          return;
        }

        try {
          const res = await authApi.getProfile();
          set({ user: res.data.data, token, isAuthenticated: true, isInitialized: true });
        } catch {
          try {
            localStorage.removeItem('token');
          } catch {}
          set({ token: null, user: null, isAuthenticated: false, isInitialized: true });
        }
      },
    }),
    {
      name: 'jeansloop-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
