import axios from "axios";

const baseURL = "http://localhost:8080/api/v1";

export const axiosConfig = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});