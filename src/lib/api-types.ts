export interface ProductVariant {
  sku: string;
  size: string;
  color: string;
  price: number;
  stock: number;
}

export interface SizeChartRow {
  waist: string;
  thigh: string;
  legOpening: string;
  long: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  color?: string;
  description: string;
  highlights: string[];
  price: number;
  comparePrice?: number;
  discountAmount?: number;
  discountPercentage?: number;
  discountedPrice?: number;
  category: string;
  images: string[];
  variants: ProductVariant[];
  sizeChart: SizeChartRow[];
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  order: number;
}

export interface Coupon {
  _id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minAmount: number;
  expiryDate: string;
  isActive: boolean;
}

export interface OrderItem {
  productId: string;
  variantSku: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  color?: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  altPhone?: string;
  street: string;
  city: string;
  country: string;
  note?: string;
}

export interface Order {
  _id: string;
  userId: string | { _id: string; name: string; email: string; phone?: string };
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  discountAmount: number;
  totalAmount: number;
  exchangeAmount?: number;
  paymentMethod: 'cod' | 'bkash' | 'card';
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  status: 'PENDING' | 'ACCEPTED' | 'COURIERED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED' | 'EXCHANGE';
  couponCode?: string;
  bkashNumber?: string;
  bkashTxnId?: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SliderCta {
  text: string;
  href: string;
}

export interface Slider {
  _id: string;
  title: string;
  subtitle?: string;
  image: string;
  primaryCta?: SliderCta;
  secondaryCta?: SliderCta;
  order: number;
  isActive: boolean;
}

export interface SiteSettings {
  title: string;
  tagline: string;
  logo: string;
  email: string;
  phone: string;
  address: string;
  locationMapUrl?: string;
  businessHours?: string;
  announcement?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
    tiktok?: string;
  };
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
  gender?: 'male' | 'female' | 'other';
  birthDate?: string;
}

export interface Review {
  _id: string;
  productId: string;
  name: string;
  email?: string;
  rating: number;
  title: string;
  comment: string;
  fit?: 'true_to_size' | 'runs_small' | 'runs_large';
  verifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewSummary {
  totalReviews: number;
  averageRating: number;
  recommendPercentage: number;
  ratingBreakdown: Record<number, number>;
  fitBreakdown: Record<string, number>;
}

export interface ReviewsResponse {
  summary: ReviewSummary;
  reviews: Review[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
