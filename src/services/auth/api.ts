import { axiosConfig } from "../../lib/helpers/axios/axiosConfig";
import { ApiResponse } from "../../lib/types/ApiResponse";
import { AuthResponse } from "../../lib/types/AuthType";

const API_URL = "/auth";

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<ApiResponse<AuthResponse>> => {
  const response = await axiosConfig.post<ApiResponse<AuthResponse>>(
    `${API_URL}/login`,
    data
  );

  return response.data;
};
