import { create } from "zustand";

interface FilterState {
  search: string;
  brand: string;
  model: string;
  gost_number: string;
  setFilters: (filters: Partial<FilterState>) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  search: "",
  brand: "",
  model: "",
  gost_number: "",
  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
}));
