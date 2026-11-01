export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

/**
 * Generate a unique event ID for deduplication between Pixel & Conversions API
 */
export const generateEventId = (prefix: string = 'evt'): string => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

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
 * Supports 4th parameter { eventID } for Meta Conversions API deduplication
 */
export const event = (
  name: string,
  options: Record<string, any> = {},
  eventId?: string
) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    if (eventId) {
      window.fbq('track', name, options, { eventID: eventId });
    } else {
      window.fbq('track', name, options);
    }
  }
};

/**
 * Trigger custom Facebook event
 */
export const customEvent = (
  name: string,
  options: Record<string, any> = {},
  eventId?: string
) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    if (eventId) {
      window.fbq('trackCustom', name, options, { eventID: eventId });
    } else {
      window.fbq('trackCustom', name, options);
    }
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

export const trackViewContent = (params: ViewContentParams, eventId?: string) => {
  const safePrice = Number(Number(params.price || 0).toFixed(2));
  event(
    'ViewContent',
    {
      content_name: params.name,
      content_category: params.category || 'Apparel & Accessories > Clothing',
      content_ids: [params.id],
      content_type: 'product',
      contents: [{ id: params.id, quantity: 1, item_price: safePrice }],
      value: safePrice,
      currency: params.currency || 'BDT',
    },
    eventId
  );
};

export interface AddToCartParams {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  currency?: string;
}

export const trackAddToCart = (params: AddToCartParams, eventId?: string) => {
  const qty = params.quantity || 1;
  const unitPrice = Number(Number(params.price || 0).toFixed(2));
  const totalValue = Number((unitPrice * qty).toFixed(2));
  event(
    'AddToCart',
    {
      content_name: params.name,
      content_ids: [params.id],
      content_type: 'product',
      contents: [{ id: params.id, quantity: qty, item_price: unitPrice }],
      value: totalValue,
      currency: params.currency || 'BDT',
    },
    eventId
  );
};

export interface InitiateCheckoutParams {
  value: number;
  num_items: number;
  content_ids?: string[];
  contents?: Array<{ id: string; quantity: number; item_price?: number }>;
  currency?: string;
}

export const trackInitiateCheckout = (
  params: InitiateCheckoutParams,
  eventId?: string
) => {
  const safeValue = Number(Number(params.value || 0).toFixed(2));
  event(
    'InitiateCheckout',
    {
      content_ids: params.content_ids || [],
      contents: params.contents || [],
      content_type: 'product',
      num_items: params.num_items,
      value: safeValue,
      currency: params.currency || 'BDT',
    },
    eventId
  );
};

export interface PurchaseParams {
  order_id: string;
  value: number;
  num_items?: number;
  content_ids?: string[];
  contents?: Array<{ id: string; quantity: number; item_price?: number }>;
  currency?: string;
}

export const trackPurchase = (params: PurchaseParams, eventId?: string) => {
  const safeValue = Number(Number(params.value || 0).toFixed(2));
  const dedupId = eventId || params.order_id;
  event(
    'Purchase',
    {
      order_id: params.order_id,
      content_type: 'product',
      content_ids: params.content_ids || [],
      contents: params.contents || [],
      num_items: params.num_items,
      value: safeValue,
      currency: params.currency || 'BDT',
    },
    dedupId
  );
};

export const trackSearch = (query: string, eventId?: string) => {
  if (!query || !query.trim()) return;
  event(
    'Search',
    {
      search_string: query.trim(),
    },
    eventId
  );
};

export const trackContact = (method: string = 'web_form', eventId?: string) => {
  event(
    'Contact',
    {
      method,
    },
    eventId
  );
};
