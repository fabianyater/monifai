import { TransactionType } from "../../lib/types/Transactions";
import {
  getLatestTransactions,
  getLoanTransactions,
  getMonthlyExpenses,
  getMonthlyIncomes,
  getTransactions,
  getTransactionsByCategoryName,
  getTransactionsSummaryByCategory,
} from "./api";
import { transactionKeys } from "./keys";

export const useMonthlyBalance = (
  pocketId: number,
  txnType: TransactionType,
  startDate: Date
) => {
  return {
    queryKey: [
      transactionKeys.monthlyBalanceByType,
      pocketId,
      txnType,
      startDate,
    ],
    queryFn: async () => {
      const response =
        txnType === "INCOME"
          ? getMonthlyIncomes(pocketId, startDate)
          : getMonthlyExpenses(pocketId, startDate);
      return response;
    },
    enabled: !!pocketId && !!txnType,
  };
};

export const useTransactionSummaryByCategory = (
  pocketId: number,
  txnType: string,
  startDate: Date
) => {
  return {
    queryKey: [
      transactionKeys.transactionSummaryByCategory,
      pocketId,
      txnType,
      startDate,
    ],
    queryFn: async () => {
      const response = getTransactionsSummaryByCategory(
        pocketId,
        txnType,
        startDate
      );
      return response;
    },
    enabled: !!pocketId && !!txnType,
  };
};

export const useTransactionsByCategoryName = (
  categoryName: string,
  pocketId: number,
  transactionType: TransactionType
) => {
  return {
    queryKey: [
      transactionKeys.transactionsByCategoryName,
      "categoryName",
      categoryName,
    ],
    queryFn: async () =>
      getTransactionsByCategoryName(pocketId, categoryName, transactionType),
  };
};

export const useTransactionsByCategoryNameFilteredByDate = (
  categoryName: string,
  pocketId: number,
  transactionType: TransactionType,
  startDate: Date,
  endDate: Date
) => {
  return {
    queryKey: [
      transactionKeys.transactionsByCategoryName,
      "categoryName",
      categoryName,
    ],
    queryFn: async () =>
      getTransactionsByCategoryName(
        pocketId,
        categoryName,
        transactionType,
        startDate,
        endDate
      ),
  };
};

export const useLoanTransactions = (loanId: number, loanType: string) => {
  return {
    queryKey: [transactionKeys.loanTransactions, loanId],
    queryFn: async () => {
      const response = await getLoanTransactions(loanId, loanType);
      return response;
    },
    enabled: !!loanId,
  };
};

export const useLatestTransactions = (pocketId: number) => {
  return {
    queryKey: [transactionKeys.latestTransactions, pocketId],
    queryFn: async () => {
      const response = await getLatestTransactions(pocketId);
      return response;
    },
    enabled: !!pocketId,
  };
};

export const useTransactions = (pocketId: number, startMonth: Date) => {
  return {
    queryKey: [transactionKeys.transactions, pocketId, startMonth],
    queryFn: async () => {
      const response = await getTransactions(pocketId, startMonth);
      return response;
    },
    enabled: !!pocketId,
  };
};
