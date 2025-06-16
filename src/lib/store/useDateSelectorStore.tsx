import { create } from "zustand";

type DateSelectorStore = {
  date: Date;
  setDate: (date: Date) => void;
};

export const useDateSelectorStore = create<DateSelectorStore>((set) => {
  const now = new Date();
  const initalDate = new Date(now.getFullYear(), now.getMonth(), 1);

  return {
    date: initalDate,
    setDate: (date: Date) => set({ date }),
  };
});
