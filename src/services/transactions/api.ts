import { axiosConfig } from "../../lib/helpers/axios/axiosConfig";
import { ApiResponse } from "../../lib/types/ApiResponse";
import {
  ClassifiedTransaction,
  LoanTransactionsResponse,
  TransactionRequest,
  TransactionResponse,
  TransactionSummaryByCategories,
  TransactionType,
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

export const getTransactionsByCategoryName = async (
  pocketId: number,
  categoryName: string,
  type: TransactionType,
  startDate?: Date,
  endDate?: Date
): Promise<TransactionResponse[]> => {
  const startDateString = startDate?.toISOString().split("T")[0];
  const endDateString = endDate?.toISOString().split("T")[0];

  const response = await axiosConfig.get<ApiResponse<TransactionResponse[]>>(
    "/transactions/category",
    {
      params: {
        pocketId,
        categoryName,
        type,
        startDate: startDateString,
        endDate: endDateString,
      },
    }
  );

  return response.data.data;
};

export const getLoanTransactions = async (
  loanId: number,
  loanType: string
): Promise<LoanTransactionsResponse[]> => {
  const response = await axiosConfig.get<
    ApiResponse<LoanTransactionsResponse[]>
  >(`/loans/${loanId}/type/${loanType}/transactions`);

  return response.data.data;
};

export const getLatestTransactions = async (
  pocketId: number
): Promise<TransactionResponse[]> => {
  const response = await axiosConfig.get<ApiResponse<TransactionResponse[]>>(
    `/transactions/latest`,
    {
      params: {
        pocketId,
      },
    }
  );

  return response.data.data;
};
