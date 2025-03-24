import { axiosConfig } from "../../lib/helpers/axios/axiosConfig";
import { ApiResponse } from "../../lib/types/ApiResponse";

const API_URL = "/users";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiResponse<void>> => {
  const response = await axiosConfig.post<ApiResponse<void>>(`${API_URL}/`, data);

  return response.data;
};
