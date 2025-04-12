import {
  getMonthlyExpenses,
  getMonthlyIncomes,
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
