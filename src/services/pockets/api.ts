import { axiosConfig } from "../../lib/helpers/axios/axiosConfig";
import { ApiResponse } from "../../lib/types/ApiResponse";
import { Pocket } from "../../lib/types/Pocket";

export const getPockets = async (userId: number): Promise<Pocket[]> => {
  const response = await axiosConfig.get<ApiResponse<Pocket[]>>(
    `/pockets/user/${userId}`
  );

  return response.data.data;
};

export const getPocketBalance = async (pocketId: number): Promise<number> => {
  const response = await axiosConfig.get<ApiResponse<number>>(
    `/pockets/${pocketId}/balance`
  );

  return response.data.data;
};
