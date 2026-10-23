import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, DeliveryZone, CartTotals } from "@/types/cart";
import { Product, ProductSize, CustomMeasurements } from "@/types/product";
import { DELIVERY_OPTIONS } from "@/lib/data/delivery";

interface CartState {
  items: CartItem[];
  deliveryZone: DeliveryZone;
  isCartOpen: boolean;
  
  // Actions
  addItem: (
    product: Product,
    size: ProductSize,
    customMeasurements?: CustomMeasurements,
    quantity?: number
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  setDeliveryZone: (zone: DeliveryZone) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed getters
  getTotals: () => CartTotals;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      deliveryZone: "addis-ababa",
      isCartOpen: false,

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      setDeliveryZone: (zone: DeliveryZone) => set({ deliveryZone: zone }),

      addItem: (product, selectedSize, customMeasurements, quantity = 1) => {
        set((state) => {
          // Identify unique item by product id and size + whether it has custom measurements
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedSize === selectedSize &&
              JSON.stringify(item.customMeasurements || {}) ===
                JSON.stringify(customMeasurements || {})
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += quantity;
            return { items: updatedItems, isCartOpen: true };
          }

          const newItem: CartItem = {
            id: `${product.id}-${selectedSize}-${Date.now()}`,
            product,
            selectedSize,
            customMeasurements,
            quantity,
          };

          return { items: [...state.items, newItem], isCartOpen: true };
        });
      },

      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id: string, delta: number) => {
        set((state) => {
          const updatedItems = state.items
            .map((item) => {
              if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter((item): item is CartItem => item !== null);

          return { items: updatedItems };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotals: () => {
        const { items, deliveryZone } = get();
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
        const subtotalETB = items.reduce(
          (sum, item) => sum + item.product.priceETB * item.quantity,
          0
        );

        const currentOption = DELIVERY_OPTIONS.find((opt) => opt.id === deliveryZone);
        const deliveryFeeETB = itemCount > 0 && currentOption ? currentOption.feeETB : 0;
        const discountETB = 0;
        const grandTotalETB = subtotalETB + deliveryFeeETB - discountETB;

        return {
          itemCount,
          subtotalETB,
          deliveryFeeETB,
          discountETB,
          grandTotalETB,
        };
      },
    }),
    {
      name: "habesha-luxe-cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        deliveryZone: state.deliveryZone,
      }),
    }
  )
);
