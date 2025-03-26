import { toast } from "sonner";
import { create } from "zustand";
import { getUserInfo } from "../../services/users/api";
import { ERROR_MESSAGES } from "../constants";
import { parseToken } from "../helpers/axios/auth";
import { useUserStore } from "./useUserStore";

type AuthStore = {
  isLoggedIn: boolean;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  checkSession: () => Promise<void>;
  isLoading: boolean;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoading: true,
  isLoggedIn: false,
  token: null,
  login: async (token) => {
    localStorage.setItem("token", token);
    set({ isLoggedIn: true, token });
  
    const { decoded, isExpired } = parseToken(token);
    const userId = Number(decoded?.userId);
  
    if (isExpired || !userId) {
      useAuthStore.getState().logout();
      toast.error("Token inválido o expirado");
      return;
    }
  
    try {
      const response = await getUserInfo(userId);
      useUserStore.getState().setUser(response.data);
      useUserStore.getState().setUserId(userId);
    } catch {
      useAuthStore.getState().logout();
      toast.error("No se pudo obtener la información del usuario");
    }
  },  
  logout: () => {
    localStorage.removeItem("token");
    set({ isLoggedIn: false, token: null });
    useUserStore.getState().resetUser();
  },
  checkSession: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ isLoggedIn: false, token: null, isLoading: false });
      return;
    }

    const { decoded, isExpired } = parseToken(token);
    const userId = Number(decoded?.userId);

    if (isExpired || !userId) {
      toast.error(ERROR_MESSAGES.EXPIRED_SESSION);
      useAuthStore.getState().logout();
      set({ isLoading: false });
      return;
    }

    set({ token, isLoggedIn: true });

    try {
      const response = await getUserInfo(userId);
      useUserStore.getState().setUser(response.data);
      useUserStore.getState().setUserId(userId);
    } catch {
      toast.error("Error al cargar la información del usuario");
      useAuthStore.getState().logout();
    } finally {
      set({ isLoading: false });
    }
  },
}));
