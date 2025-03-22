import { ApiResponse } from "../../types/ApiResponse";
import { AuthResponse } from "../../types/AuthType";
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
}): Promise<ApiResponse<AuthResponse>> => {
  const response = await axiosConfig.post<ApiResponse<AuthResponse>>("/auth/login", data);

  return response.data;
}