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
        localStorage.setItem('token', token);
        set({ token, user, isAuthenticated: true, isInitialized: true });
      },
      logout: () => {
        localStorage.removeItem('token');
        authApi.logout().catch(() => {});
        set({ token: null, user: null, isAuthenticated: false, isInitialized: true });
      },
      checkAuth: async () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (!token) {
          set({ token: null, user: null, isAuthenticated: false, isInitialized: true });
          return;
        }

        try {
          const res = await authApi.getProfile();
          set({ user: res.data.data, token, isAuthenticated: true, isInitialized: true });
        } catch {
          localStorage.removeItem('token');
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
