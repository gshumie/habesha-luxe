import { create } from "zustand";
import { Product, ProductCategory } from "@/types/product";

export type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

interface UIState {
  quickViewProduct: Product | null;
  isQuickViewOpen: boolean;
  isBridalModalOpen: boolean;
  searchQuery: string;
  selectedCategory: ProductCategory;
  sortBy: SortOption;
  showUSD: boolean;

  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  openBridalModal: () => void;
  closeBridalModal: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: ProductCategory) => void;
  setSortBy: (sort: SortOption) => void;
  toggleCurrency: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  quickViewProduct: null,
  isQuickViewOpen: false,
  isBridalModalOpen: false,
  searchQuery: "",
  selectedCategory: "all",
  sortBy: "featured",
  showUSD: false,

  openQuickView: (product) => set({ quickViewProduct: product, isQuickViewOpen: true }),
  closeQuickView: () => set({ quickViewProduct: null, isQuickViewOpen: false }),
  openBridalModal: () => set({ isBridalModalOpen: true }),
  closeBridalModal: () => set({ isBridalModalOpen: false }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSortBy: (sortBy) => set({ sortBy }),
  toggleCurrency: () => set((state) => ({ showUSD: !state.showUSD })),
}));
