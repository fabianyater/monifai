import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

export const useCheckSession = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      useAuthStore.getState().login(token);
    }
  }, []);
};
