import { create } from "zustand";
import { Pocket } from "../types/Pocket";

type PocketStore = {
  pockets: Pocket[];
  setPockets: (pockets: Pocket[]) => void;
  selectedPocket: Pocket | null;
  setSelectedPocket: (pocket: Pocket | null) => void;
  isLoading: boolean;
};

export const usePocketStore = create<PocketStore>((set) => ({
  pockets: [],
  setPockets: (pockets: Pocket[]) => set({ pockets }),
  selectedPocket: null,
  setSelectedPocket: (pocket: Pocket | null) => set({ selectedPocket: pocket }),
  isLoading: true,
}));
