import { create } from "zustand";
import { User } from "../types/User";

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
  isLoading: boolean;
};

export const useUserStore = create<UserStore>((set) => ({
  user:  null,
  setUser: (user: User) => set({ user }),
  resetUser: () => set({ user: { name: "", email: "", color: "" } }),
  isLoading: true,
}));