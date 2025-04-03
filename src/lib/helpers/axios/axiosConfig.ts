import axios from "axios";
import { toast } from "sonner";
import { ABI_BASE_URL } from "../../constants";

export const axiosConfig = axios.create({
  baseURL: ABI_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message || "Ocurrió un error inesperado.";

    // Puedes personalizar los mensajes por código de estado si quieres
    if (status) {
      const errorMessages: Record<number, string> = {
        401: "No autorizado. Por favor, inicia sesión nuevamente.",
        403: "Acceso denegado. No tienes permisos para realizar esta acción.",
        404: "Recurso no encontrado. Verifica la URL o intenta más tarde.",
        500: "Error interno del servidor. Por favor, intenta más tarde.",
        502: "Puerta de enlace no válida. Intenta nuevamente más tarde.",
        503: "Servicio no disponible. Por favor, intenta más tarde.",
        504: "Tiempo de espera agotado. Intenta nuevamente más tarde.",
      };

      const errorMessage = message || errorMessages[status];
      toast.error(errorMessage);
    } else {
      toast.error("Ocurrió un error inesperado. Por favor, intenta más tarde.");
    }

    return Promise.reject(
      error instanceof Error
        ? error
        : new Error(error?.message || "Unknown error")
    );
  }
);
