import { axiosConfig } from "../../lib/helpers/axios/axiosConfig";
import { ApiResponse } from "../../lib/types/ApiResponse";
import { AuthResponse } from "../../lib/types/AuthType";

const API_URL = "/auth";

export const authenticateUser = async (data: {
  email: string;
  password: string;
}): Promise<ApiResponse<AuthResponse>> => {
  const response = await axiosConfig.post<ApiResponse<AuthResponse>>(
    `${API_URL}/login`,
    data
  );

  return response.data;
};

export const signOut = async (data: {
  token: string;
}): Promise<ApiResponse<void>> => {
  const response = await axiosConfig.post<ApiResponse<void>>(
    `${API_URL}/logout`,
    data
  );

  return response.data;
};
