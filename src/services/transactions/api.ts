import { axiosConfig } from "../../lib/helpers/axios/axiosConfig";
import { ApiResponse } from "../../lib/types/ApiResponse";

export const getMonthlyIncomes = async (pocketId: number): Promise<number> => {
  const response = await axiosConfig.get<ApiResponse<number>>(
    `/transactions/monthly-income`,
    {
      params: {
        pocketId,
      },
    }
  );

  return response.data.data;
};

export const getMonthlyExpenses = async (pocketId: number): Promise<number> => {
  const response = await axiosConfig.get<ApiResponse<number>>(
    `/transactions/monthly-expense`,
    {
      params: {
        pocketId,
      },
    }
  );

  return response.data.data;
};
