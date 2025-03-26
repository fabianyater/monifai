import axios from "axios";
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

