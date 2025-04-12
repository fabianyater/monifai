import { axiosConfig } from "../../lib/helpers/axios/axiosConfig";
import { ApiResponse } from "../../lib/types/ApiResponse";
import {
  ClassifiedTransaction,
  TransactionRequest,
  TransactionSummaryByCategories,
} from "../../lib/types/Transactions";

export const classifyTransaction = async (
  prompt: string
): Promise<ClassifiedTransaction> => {
  const response = await axiosConfig.get<ApiResponse<ClassifiedTransaction>>(
    `/classify`,
    {
      params: {
        prompt,
      },
    }
  );

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

export const createTransaction = async (
  transaction: TransactionRequest
): Promise<void> => {
  const response = await axiosConfig.post<ApiResponse<void>>(
    `/transactions/`,
    transaction
  );

  return response.data.data;
};

export const getTransactionsSummaryByCategory = async (
  pocketId: number,
  transactionType: string
): Promise<TransactionSummaryByCategories[]> => {
  const response = await axiosConfig.get<
    ApiResponse<TransactionSummaryByCategories[]>
  >("/transactions", {
    params: {
      pocketId,
      transactionType,
    },
  });

  return response.data.data;
};
