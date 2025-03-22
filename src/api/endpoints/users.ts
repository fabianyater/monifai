import { ApiResponse } from "../../types/ApiResponse";
import { axiosConfig } from "../axiosConfig";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiResponse<void>> => {
  const response = await axiosConfig.post<ApiResponse<void>>("/users/", data);

  return response.data;
}

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<ApiResponse<void>> => {
  const response = await axiosConfig.post<ApiResponse<void>>("/auth/login", data);

  return response.data;
}