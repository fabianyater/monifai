import { create } from "zustand";
import { Category } from "../types/Category";

type CategoryStore = {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}));
