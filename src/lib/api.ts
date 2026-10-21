import axios from 'axios';
import type {
  Product,
  Category,
  Order,
  UserProfile,
  Slider,
  SiteSettings,
  ApiResponse,
  PaginatedResponse,
  Review,
  ReviewsResponse,
} from './api-types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Attach access token
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Automatic token refresh on 401
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (typeof window === 'undefined') {
        return Promise.reject(error);
      }

      // If the 401 came from login/refresh itself, do not loop
      if (originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/refresh')) {
        localStorage.removeItem('token');
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post<ApiResponse<{ token: string }>>(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = data.data.token;
        localStorage.setItem('token', newToken);
        apiClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('token');
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// ─── Typed API Client Endpoints ─────────────────────────

export const authApi = {
  login: (data: { email: string; password: string }) =>
    apiClient.post<ApiResponse<{ user: UserProfile; token: string }>>('/auth/login', data),
  register: (data: { name: string; email: string; phone: string; password: string }) =>
    apiClient.post<ApiResponse<{ user: UserProfile; token: string }>>('/auth/register', data),
  logout: () => apiClient.post<ApiResponse<null>>('/auth/logout'),
  getProfile: () => apiClient.get<ApiResponse<UserProfile>>('/auth/profile'),
  updateProfile: (data: Partial<UserProfile>) =>
    apiClient.put<ApiResponse<UserProfile>>('/auth/profile', data),
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    apiClient.put<ApiResponse<null>>('/auth/password', data),
};

export const productsApi = {
  getAll: (params?: Record<string, unknown>) =>
    apiClient.get<PaginatedResponse<Product>>('/products', { params }),
  getBySlug: (slug: string) => apiClient.get<ApiResponse<Product>>(`/products/${slug}`),
};

export const categoriesApi = {
  getAll: () => apiClient.get<ApiResponse<Category[]>>('/categories'),
};

export const ordersApi = {
  create: (data: Record<string, unknown>) =>
    apiClient.post<ApiResponse<{ order: Order }>>('/orders', data),
  getMyOrders: () => apiClient.get<ApiResponse<Order[]>>('/orders/myorders'),
  getById: (id: string) => apiClient.get<ApiResponse<Order>>(`/orders/${id}`),
};

export const couponsApi = {
  validate: (code: string, amount: number) =>
    apiClient.post<ApiResponse<{ id: string; code: string; type: string; value: number; discountAmount: number }>>(
      '/coupons/validate',
      { code, amount }
    ),
};

export const slidersApi = {
  getActive: () => apiClient.get<ApiResponse<Slider[]>>('/sliders/active'),
};

export const settingsApi = {
  get: () => apiClient.get<ApiResponse<SiteSettings>>('/settings'),
};

export const reviewsApi = {
  getByProduct: (
    productIdOrSlug: string,
    params?: { rating?: number; sort?: string; page?: number; limit?: number }
  ) =>
    apiClient.get<ApiResponse<ReviewsResponse>>(`/reviews/product/${productIdOrSlug}`, { params }),
  create: (data: {
    productId: string;
    name: string;
    email?: string;
    rating: number;
    title: string;
    comment: string;
    fit?: 'true_to_size' | 'runs_small' | 'runs_large';
  }) => apiClient.post<ApiResponse<Review>>('/reviews', data),
  voteHelpful: (reviewId: string) =>
    apiClient.post<ApiResponse<Review>>(`/reviews/${reviewId}/helpful`),
};
