import { TransactionType } from "../../lib/types/Transactions";
import {
  getLoanTransactions,
  getMonthlyExpenses,
  getMonthlyIncomes,
  getTransactionsByCategoryName,
  getTransactionsSummaryByCategory,
} from "./api";
import { transactionKeys } from "./keys";

export const useMonthlyBalance = (pocketId: number, txnType: string) => {
  return {
    queryKey: [transactionKeys.monthlyBalanceByType, pocketId, txnType],
    queryFn: async () => {
      const response =
        txnType === "INCOME"
          ? getMonthlyIncomes(pocketId)
          : getMonthlyExpenses(pocketId);
      return response;
    },
    enabled: !!pocketId && !!txnType,
  };
};

export const useTransactionSummaryByCategory = (
  pocketId: number,
  txnType: string
) => {
  return {
    queryKey: [transactionKeys.transactionSummaryByCategory, pocketId, txnType],
    queryFn: async () => {
      const response = getTransactionsSummaryByCategory(pocketId, txnType);
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
