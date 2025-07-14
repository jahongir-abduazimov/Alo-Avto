import { create } from "zustand";

interface FinanceState {
  rentalId: string | null;
  setRentalId: (id: string | null) => void;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  rentalId: null,
  setRentalId: (id) => set({ rentalId: id }),
}));
