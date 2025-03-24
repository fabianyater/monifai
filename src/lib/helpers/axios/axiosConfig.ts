import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";

export const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
