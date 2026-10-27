export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

/**
 * Trigger PageView event
 */
export const pageview = () => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
};

/**
 * Trigger standard Facebook event
 * E.g., ViewContent, AddToCart, InitiateCheckout, Purchase, Search, Contact
 */
export const event = (name: string, options: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', name, options);
  }
};

/**
 * Trigger custom Facebook event
 */
export const customEvent = (name: string, options: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('trackCustom', name, options);
  }
};

// ==========================================
// E-commerce Standard Event Helpers
// ==========================================

export interface ViewContentParams {
  id: string;
  name: string;
  category?: string;
  price: number;
  currency?: string;
}

export const trackViewContent = (params: ViewContentParams) => {
  event('ViewContent', {
    content_name: params.name,
    content_category: params.category || 'Apparel & Accessories > Clothing',
    content_ids: [params.id],
    content_type: 'product',
    value: params.price,
    currency: params.currency || 'BDT',
  });
};

export interface AddToCartParams {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  currency?: string;
}

export const trackAddToCart = (params: AddToCartParams) => {
  const qty = params.quantity || 1;
  event('AddToCart', {
    content_name: params.name,
    content_ids: [params.id],
    content_type: 'product',
    value: params.price * qty,
    currency: params.currency || 'BDT',
  });
};

export interface InitiateCheckoutParams {
  value: number;
  num_items: number;
  content_ids?: string[];
  currency?: string;
}

export const trackInitiateCheckout = (params: InitiateCheckoutParams) => {
  event('InitiateCheckout', {
    content_ids: params.content_ids || [],
    content_type: 'product',
    num_items: params.num_items,
    value: params.value,
    currency: params.currency || 'BDT',
  });
};

export interface PurchaseParams {
  order_id: string;
  value: number;
  num_items?: number;
  content_ids?: string[];
  currency?: string;
}

export const trackPurchase = (params: PurchaseParams) => {
  event('Purchase', {
    order_id: params.order_id,
    content_type: 'product',
    content_ids: params.content_ids || [],
    num_items: params.num_items,
    value: params.value,
    currency: params.currency || 'BDT',
  });
};

export const trackSearch = (query: string) => {
  if (!query || !query.trim()) return;
  event('Search', {
    search_string: query.trim(),
  });
};

export const trackContact = (method: string = 'web_form') => {
  event('Contact', {
    method,
  });
};
