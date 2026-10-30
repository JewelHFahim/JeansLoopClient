import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  variantSku: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size: string;
  color: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantSku: string, size: string, color: string) => void;
  updateQuantity: (
    productId: string,
    variantSku: string,
    size: string,
    color: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

function getItemKey(productId: string, variantSku: string, size: string, color: string) {
  return `${productId}_${variantSku}_${size}_${color}`;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const targetKey = getItemKey(item.productId, item.variantSku, item.size, item.color);
          const existingIndex = state.items.findIndex(
            (i) => getItemKey(i.productId, i.variantSku, i.size, i.color) === targetKey
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + item.quantity,
            };
            return { items: updated };
          }

          return { items: [...state.items, item] };
        }),

      removeItem: (productId, variantSku, size, color) =>
        set((state) => {
          const targetKey = getItemKey(productId, variantSku, size, color);
          return {
            items: state.items.filter(
              (i) => getItemKey(i.productId, i.variantSku, i.size, i.color) !== targetKey
            ),
          };
        }),

      updateQuantity: (productId, variantSku, size, color, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            const targetKey = getItemKey(productId, variantSku, size, color);
            return {
              items: state.items.filter(
                (i) => getItemKey(i.productId, i.variantSku, i.size, i.color) !== targetKey
              ),
            };
          }

          const targetKey = getItemKey(productId, variantSku, size, color);
          return {
            items: state.items.map((i) =>
              getItemKey(i.productId, i.variantSku, i.size, i.color) === targetKey
                ? { ...i, quantity }
                : i
            ),
          };
        }),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return (get().items || []).reduce((total, i) => total + (i?.quantity || 0), 0);
      },

      getTotalPrice: () => {
        return (get().items || []).reduce((total, i) => total + (i?.price || 0) * (i?.quantity || 0), 0);
      },
    }),
    {
      name: 'jeansloop-cart',
    }
  )
);
