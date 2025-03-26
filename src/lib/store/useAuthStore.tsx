import { create } from "zustand";

type AuthStore = {
  isLoggedIn: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  checkSession: () => Promise<void>;
  isLoading: boolean;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoading: true,
  isLoggedIn: false,
  token: null,
  login: (token) => {
    localStorage.setItem("token", token);
    set({ isLoggedIn: true, token });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ isLoggedIn: false, token: null });
  },
  checkSession: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ isLoggedIn: true, token, isLoading: false });
    } else {
      set({ isLoggedIn: false, token: null, isLoading: false });
    }
  },
}));
