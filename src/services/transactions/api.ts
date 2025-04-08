import { axiosConfig } from "../../lib/helpers/axios/axiosConfig";
import { ApiResponse } from "../../lib/types/ApiResponse";
import { ClassifyTransactionResponse } from "../../lib/types/Transactions";

export const classifyTransaction = async (
  prompt: string
): Promise<ClassifyTransactionResponse> => {
  const response = await axiosConfig.get<
    ApiResponse<ClassifyTransactionResponse>
  >(`/classify/`, {
    params: {
      prompt,
    },
  });

  return response.data.data;
};

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
