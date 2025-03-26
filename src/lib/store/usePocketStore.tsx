import { create } from "zustand";
import { Pocket } from "../types/Pocket";

type PocketStore = {
  pockets: Pocket[];
  setPockets: (pockets: Pocket[]) => void;
  isLoading: boolean;
};

export const usePocketStore = create<PocketStore>((set) => ({
  pockets: [],
  setPockets: (pockets: Pocket[]) => set({ pockets }),
  isLoading: true,
}));
