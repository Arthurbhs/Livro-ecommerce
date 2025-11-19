import { create } from "zustand";

export const useCart = create((set) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      const exists = state.items.find((i) => i.id === product.id);
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...product, qty: 1 }] };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  clear: () => set({ items: [] }),
}));
